import { setStorageWriteListener } from "../engine/storage.js";

export const USER_STATE_TABLE = "user_state";
export const OWNER_KEY = "cloud.owner";
export const PENDING_KEY = "cloud.pending";
const FLUSH_DELAY_MS = 1500;

export function isSyncedKey(key, certIds) {
  return certIds.some((certId) => key.startsWith(`${certId}.`));
}

function listSyncedKeys(storage, certIds) {
  const keys = [];
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (key && isSyncedKey(key, certIds)) keys.push(key);
  }
  return keys;
}

function readJson(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Mirrors every cert-namespaced localStorage key into the user_state table,
 * one row per key.
 *
 * On start the server is the source of truth: its rows overwrite the local
 * cache. The exception is data that belongs to nobody yet — progress made
 * before the account existed, or during the trial — which is uploaded for
 * any key the account does not have, so signing up keeps it.
 *
 * Writes are batched and debounced. Until a batch is confirmed it is kept
 * in localStorage too, so closing the tab straight after answering loses
 * nothing: the next start pushes it before pulling.
 */
export function createCloudSync({
  client,
  userId,
  certIds,
  storage = window.localStorage,
  delayMs = FLUSH_DELAY_MS,
}) {
  let pending = new Map(Object.entries(readJson(storage, PENDING_KEY) || {}));
  let timer = null;
  let inFlight = null;
  let running = false;

  const persistPending = () => {
    if (pending.size) storage.setItem(PENDING_KEY, JSON.stringify(Object.fromEntries(pending)));
    else storage.removeItem(PENDING_KEY);
  };

  async function push(entries) {
    const upserts = entries
      .filter(([, value]) => value !== null)
      .map(([key, value]) => ({ user_id: userId, key, value }));
    const deletes = entries.filter(([, value]) => value === null).map(([key]) => key);
    if (upserts.length) {
      const { error } = await client
        .from(USER_STATE_TABLE)
        .upsert(upserts, { onConflict: "user_id,key" });
      if (error) throw error;
    }
    if (deletes.length) {
      const { error } = await client
        .from(USER_STATE_TABLE)
        .delete()
        .eq("user_id", userId)
        .in("key", deletes);
      if (error) throw error;
    }
  }

  async function flush() {
    clearTimeout(timer);
    timer = null;
    while (inFlight) await inFlight.catch(() => {});
    if (!pending.size) return;

    const batch = new Map(pending);
    inFlight = push([...batch]);
    try {
      await inFlight;
      for (const [key, value] of batch) {
        if (pending.get(key) === value) pending.delete(key);
      }
      persistPending();
    } finally {
      inFlight = null;
    }
  }

  const flushQuietly = () =>
    flush().catch((error) => console.warn("Cloud sync failed, will retry:", error));

  function record(key, value) {
    if (!isSyncedKey(key, certIds)) return;
    pending.set(key, value);
    persistPending();
    clearTimeout(timer);
    timer = setTimeout(flushQuietly, delayMs);
  }

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") flushQuietly();
  };

  function clearLocal() {
    listSyncedKeys(storage, certIds).forEach((key) => storage.removeItem(key));
    storage.removeItem(OWNER_KEY);
    storage.removeItem(PENDING_KEY);
    pending = new Map();
  }

  async function start() {
    const owner = storage.getItem(OWNER_KEY);
    const ownsCache = owner === userId;
    if (owner && !ownsCache) clearLocal();
    if (!ownsCache) pending = new Map();
    if (ownsCache && pending.size) await flush();

    const { data, error } = await client
      .from(USER_STATE_TABLE)
      .select("key, value")
      .eq("user_id", userId);
    if (error) throw error;

    const remote = new Map(data.map((row) => [row.key, row.value]));
    for (const key of listSyncedKeys(storage, certIds)) {
      if (remote.has(key)) continue;
      if (ownsCache) storage.removeItem(key);
      else pending.set(key, readJson(storage, key));
    }
    for (const [key, value] of remote) storage.setItem(key, JSON.stringify(value));
    storage.setItem(OWNER_KEY, userId);
    persistPending();
    if (pending.size) await flush();

    running = true;
    setStorageWriteListener(record);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("online", flushQuietly);
  }

  async function stop({ clear = false } = {}) {
    if (running) {
      running = false;
      setStorageWriteListener(null);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("online", flushQuietly);
      await flushQuietly();
    }
    if (clear) clearLocal();
  }

  return { start, stop, flush };
}
