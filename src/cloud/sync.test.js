import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createStorage, EMPTY_PROGRESS, setStorageWriteListener } from "../engine/storage.js";
import { createCloudSync, OWNER_KEY, PENDING_KEY } from "./sync.js";

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

/** Just enough of the supabase-js query builder, backed by a Map. */
function fakeClient(rows = new Map()) {
  const calls = [];
  return {
    rows,
    calls,
    from() {
      return {
        select: () => ({
          eq: async (_col, userId) => ({
            data: [...rows.entries()]
              .filter(([k]) => k.startsWith(`${userId}|`))
              .map(([k, value]) => ({ key: k.split("|")[1], value })),
            error: null,
          }),
        }),
        upsert: async (records) => {
          calls.push(["upsert", records.map((r) => r.key)]);
          records.forEach((r) => rows.set(`${r.user_id}|${r.key}`, r.value));
          return { error: null };
        },
        delete: () => ({
          eq: (_col, userId) => ({
            in: async (_c, keys) => {
              calls.push(["delete", keys]);
              keys.forEach((k) => rows.delete(`${userId}|${k}`));
              return { error: null };
            },
          }),
        }),
      };
    },
  };
}

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
    expect(client.calls).toEqual([]);
  });

  it("drops its own stale keys that the account no longer has", async () => {
    store.set(OWNER_KEY, USER);
    store.set("gcp-pde.activeMock.v2", JSON.stringify({ id: "old" }));
    const client = fakeClient();

    await createCloudSync({ client, userId: USER, certIds: CERT_IDS }).start();

    expect(store.has("gcp-pde.activeMock.v2")).toBe(false);
    expect(client.calls).toEqual([]);
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
    expect(client.calls).toEqual([["upsert", ["gcp-pca.progress.v2", "gcp-pca.activeMock.v2"]]]);
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
    const realFrom = client.from.bind(client);
    client.from = () => ({ ...realFrom(), upsert: async () => ({ error: new Error("offline") }) });

    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 5 });
    await expect(sync.flush()).rejects.toThrow("offline");
    expect(store.has(PENDING_KEY)).toBe(true);

    client.from = realFrom;
    await sync.flush();
    expect(client.rows.get(`${USER}|gcp-pde.progress.v2`).xp).toBe(5);
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
