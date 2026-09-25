import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createStorage, EMPTY_PROGRESS, setStorageWriteListener } from "../engine/storage.js";
import { createCloudSync, isSyncedKey, OWNER_KEY, PENDING_KEY } from "./sync.js";

const CERT_IDS = ["gcp-pde", "gcp-pca"];
const USER = "user-1";

function installStorage() {
  const store = new Map();
  const api = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
  globalThis.window = { localStorage: api, addEventListener() {}, removeEventListener() {} };
  globalThis.document = {
    visibilityState: "visible",
    addEventListener() {},
    removeEventListener() {},
  };
  return { store, api };
}

/**
 * Just enough of the supabase-js query builder, backed by a Map. Each write
 * bumps a fake updated_at so change detection has something to compare.
 */
function fakeClient(rows = new Map()) {
  const calls = [];
  const stamps = new Map();
  let clock = 0;
  const stamp = (id) => stamps.get(id) ?? stamps.set(id, `t${++clock}`).get(id);
  const client = {
    rows,
    calls,
    offline: false,
    /** Simulates another device writing a key. */
    remoteWrite(key, value) {
      rows.set(`${USER}|${key}`, value);
      stamps.set(`${USER}|${key}`, `t${++clock}`);
    },
    from() {
      const fail = async () => ({ data: null, error: new Error("offline") });
      return {
        select: (cols) => ({
          eq: (_col, userId) => {
            const run = (keys) => {
              if (client.offline) return { data: null, error: new Error("offline") };
              calls.push(["select", cols]);
              return {
                data: [...rows.entries()]
                  .filter(([k]) => k.startsWith(`${userId}|`))
                  .map(([k, value]) => ({ key: k.split("|")[1], value, updated_at: stamp(k) }))
                  .filter((row) => !keys || keys.includes(row.key)),
                error: null,
              };
            };
            return {
              then: (resolve, reject) => Promise.resolve(run(null)).then(resolve, reject),
              in: async (_c, keys) => run(keys),
            };
          },
        }),
        upsert: (records) => ({
          select: async () => {
            if (client.offline) return fail();
            calls.push(["upsert", records.map((r) => r.key)]);
            return {
              data: records.map((r) => {
                const id = `${r.user_id}|${r.key}`;
                rows.set(id, r.value);
                stamps.set(id, `t${++clock}`);
                return { key: r.key, updated_at: stamps.get(id) };
              }),
              error: null,
            };
          },
        }),
        delete: () => ({
          eq: (_col, userId) => ({
            in: async (_c, keys) => {
              if (client.offline) return fail();
              calls.push(["delete", keys]);
              keys.forEach((k) => rows.delete(`${userId}|${k}`));
              return { error: null };
            },
          }),
        }),
      };
    },
  };
  return client;
}

const writes = (client) => client.calls.filter(([op]) => op !== "select");

describe("isSyncedKey", () => {
  it("syncs per-cert keys and the app-wide settings, nothing else", () => {
    expect(isSyncedKey("gcp-pde.progress.v2", ["gcp-pde"])).toBe(true);
    expect(isSyncedKey("app.settings.v1", ["gcp-pde"])).toBe(true);
    expect(isSyncedKey("cloud.owner", ["gcp-pde"])).toBe(false);
    expect(isSyncedKey("gcp-pca.progress.v2", ["gcp-pde"])).toBe(false);
  });
});

describe("createCloudSync", () => {
  let store;

  beforeEach(() => {
    ({ store } = installStorage());
  });

  afterEach(() => {
    setStorageWriteListener(null);
  });

  it("uploads progress made before the account existed", async () => {
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 500 }));
    store.set("unrelated", "1");
    const client = fakeClient();

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`)).toEqual({ xp: 500 });
    expect(client.rows.has(`${USER}|unrelated`)).toBe(false);
    expect(store.get(OWNER_KEY)).toBe(USER);
  });

  it("lets the account win over guest progress for the same key", async () => {
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 10 }));
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 9000 }]]));

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(JSON.parse(store.get("gcp-pde.progress.v2"))).toEqual({ xp: 9000 });
    expect(writes(client)).toEqual([]);
  });

  it("drops its own stale keys that the account no longer has", async () => {
    store.set(OWNER_KEY, USER);
    store.set("gcp-pde.activeMock.v2", JSON.stringify({ id: "old" }));
    const client = fakeClient();

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(store.has("gcp-pde.activeMock.v2")).toBe(false);
    expect(writes(client)).toEqual([]);
  });

  it("never hands another user's cache to the account signing in", async () => {
    store.set(OWNER_KEY, "someone-else");
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 777 }));
    const client = fakeClient();

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(client.rows.size).toBe(0);
    expect(store.has("gcp-pde.progress.v2")).toBe(false);
  });

  it("debounces writes from storage into one upsert, and mirrors removals", async () => {
    vi.useFakeTimers();
    const client = fakeClient();
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS, delayMs: 100 });
    await sync.start();

    const storage = createStorage("gcp-pca");
    storage.saveProgress({ ...EMPTY_PROGRESS, xp: 1 });
    storage.saveProgress({ ...EMPTY_PROGRESS, xp: 2 });
    storage.saveActiveMock({ id: "m" });
    expect(JSON.parse(store.get(PENDING_KEY))["gcp-pca.progress.v2"].xp).toBe(2);

    await vi.advanceTimersByTimeAsync(150);
    expect(writes(client)).toEqual([["upsert", ["gcp-pca.progress.v2", "gcp-pca.activeMock.v2"]]]);
    expect(client.rows.get(`${USER}|gcp-pca.progress.v2`).xp).toBe(2);
    expect(store.has(PENDING_KEY)).toBe(false);

    storage.clearActiveMock();
    await sync.flush();
    expect(client.rows.has(`${USER}|gcp-pca.activeMock.v2`)).toBe(false);
    vi.useRealTimers();
  });

  it("pushes writes left pending by a closed tab before pulling", async () => {
    store.set(OWNER_KEY, USER);
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 42 }));
    store.set(PENDING_KEY, JSON.stringify({ "gcp-pde.progress.v2": { xp: 42 } }));
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 1 }]]));

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`)).toEqual({ xp: 42 });
    expect(JSON.parse(store.get("gcp-pde.progress.v2"))).toEqual({ xp: 42 });
  });

  it("keeps a failed batch pending so a later flush retries it", async () => {
    const client = fakeClient();
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS, delayMs: 10_000 });
    await sync.start();
    client.offline = true;

    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 5 });
    await expect(sync.flush()).rejects.toThrow("offline");
    expect(store.has(PENDING_KEY)).toBe(true);

    client.offline = false;
    await sync.flush();
    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`).xp).toBe(5);
    await sync.stop();
  });

  it("picks up progress saved on another device when asked to refresh", async () => {
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 10 }]]));
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS });
    await sync.start();

    expect(await sync.refresh()).toBe(false);

    client.remoteWrite("gcp-pde.progress.v2", { xp: 99 });
    expect(await sync.refresh()).toBe(true);
    expect(JSON.parse(store.get("gcp-pde.progress.v2"))).toEqual({ xp: 99 });
    expect(await sync.refresh()).toBe(false);
    await sync.stop();
  });

  it("does not count its own writes as changes from elsewhere", async () => {
    const client = fakeClient();
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS, delayMs: 10_000 });
    await sync.start();

    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 7 });
    expect(await sync.refresh()).toBe(false);
    await sync.flush();

    expect(await sync.refresh()).toBe(false);
    expect(JSON.parse(store.get("gcp-pde.progress.v2")).xp).toBe(7);
    await sync.stop();
  });

  it("keeps unsent local changes instead of refreshing over them", async () => {
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 1 }]]));
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS, delayMs: 10_000 });
    await sync.start();

    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 50 });
    client.remoteWrite("gcp-pde.progress.v2", { xp: 2 });

    expect(await sync.refresh()).toBe(false);
    expect(JSON.parse(store.get("gcp-pde.progress.v2")).xp).toBe(50);
    await sync.stop();
  });

  it("runs on its own cache when the account cannot be reached", async () => {
    store.set(OWNER_KEY, USER);
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 30 }));
    const client = fakeClient();
    client.offline = true;
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS, delayMs: 10_000 });

    expect(await sync.start()).toEqual({ offline: true });
    expect(JSON.parse(store.get("gcp-pde.progress.v2"))).toEqual({ xp: 30 });

    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 31 });
    client.offline = false;
    await sync.flush();
    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`).xp).toBe(31);
    await sync.stop();
  });

  it("refuses to start offline without a cache of its own", async () => {
    store.set("gcp-pde.progress.v2", JSON.stringify({ xp: 30 }));
    const client = fakeClient();
    client.offline = true;

    await expect(
      createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start(),
    ).rejects.toThrow("offline");
  });

  it("never overwrites a change made elsewhere while this tab stayed open", async () => {
    const onRemoteChange = vi.fn();
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 0 }]]));
    const sync = createCloudSync({
      client,
      userId: USER,
      certIds: CERT_IDS,
      delayMs: 10_000,
      onRemoteChange,
    });
    await sync.start();

    // An admin import lands while the tab is open and visible...
    client.remoteWrite("gcp-pde.progress.v2", { xp: 5738 });
    // ...and the stale tab then saves its in-memory progress.
    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 8 });
    await sync.flush();

    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`)).toEqual({ xp: 5738 });
    expect(JSON.parse(store.get("gcp-pde.progress.v2"))).toEqual({ xp: 5738 });
    expect(store.has(PENDING_KEY)).toBe(false);
    expect(onRemoteChange).toHaveBeenCalledTimes(1);

    // Once adopted, normal saves go through again.
    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 5746 });
    await sync.flush();
    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`).xp).toBe(5746);
    await sync.stop();
  });

  it("clears the local cache on sign out", async () => {
    const client = fakeClient(new Map([[`${USER}|gcp-pde.progress.v2`, { xp: 3 }]]));
    const sync = createCloudSync({ client, userId: USER, certIds: CERT_IDS });
    await sync.start();

    await sync.stop({ clear: true });

    expect(store.has("gcp-pde.progress.v2")).toBe(false);
    expect(store.has(OWNER_KEY)).toBe(false);
  });
});
