import { setStorageWriteListener } from "../engine/storage.js";

export const USER_STATE_TABLE = "user_state";
export const OWNER_KEY = "cloud.owner";
export const PENDING_KEY = "cloud.pending";
const FLUSH_DELAY_MS = 1500;

// Cert-independent state (settings) lives under this prefix.
export const APP_KEY_PREFIX = "app.";

export function isSyncedKey(key, certIds) {
  return key.startsWith(APP_KEY_PREFIX) || certIds.some((certId) => key.startsWith(`${certId}.`));
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
 * Mirrors every cert-namespaced localStorage key, plus the "app." settings,
 * into the user_state table, one row per key.
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
  onRemoteChange,
}) {
  let pending = new Map(Object.entries(readJson(storage, PENDING_KEY) || {}));
  let timer = null;
  let inFlight = null;
  let running = false;
  let seen = new Map();

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
      const { data, error } = await client
        .from(USER_STATE_TABLE)
        .upsert(upserts, { onConflict: "user_id,key" })
        .select("key, updated_at");
      if (error) throw error;
      data.forEach((row) => seen.set(row.key, row.updated_at));
    }
    if (deletes.length) {
      const { error } = await client
        .from(USER_STATE_TABLE)
        .delete()
        .eq("user_id", userId)
        .in("key", deletes);
      if (error) throw error;
      deletes.forEach((key) => seen.delete(key));
    }
  }

  async function pull() {
    const { data, error } = await client
      .from(USER_STATE_TABLE)
      .select("key, value, updated_at")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  }

  /** Makes the local cache match the account, and remembers what it saw. */
  function applyRemote(rows) {
    const remote = new Map(rows.map((row) => [row.key, row]));
    for (const key of listSyncedKeys(storage, certIds)) {
      if (!remote.has(key)) storage.removeItem(key);
    }
    seen = new Map();
    for (const [key, row] of remote) {
      storage.setItem(key, JSON.stringify(row.value));
      seen.set(key, row.updated_at);
    }
  }

  /** Keys another writer (a device, an admin import) changed since we last synced them. */
  async function findStaleKeys(keys) {
    const { data, error } = await client
      .from(USER_STATE_TABLE)
      .select("key, updated_at")
      .eq("user_id", userId)
      .in("key", keys);
    if (error) throw error;
    return data.filter((row) => seen.has(row.key) && seen.get(row.key) !== row.updated_at);
  }

  /**
   * Pushes the batch, unless the account moved on underneath this tab. Then
   * the local changes were made on stale data: pushing them would silently
   * throw away the newer version, so they are dropped instead and the
   * account's state is adopted and announced for the app to re-mount on.
   */
  async function pushUnlessStale(batch) {
    if (running && seen.size) {
      const stale = await findStaleKeys([...batch.keys()]);
      if (stale.length) {
        const rows = await pull();
        pending = new Map();
        persistPending();
        applyRemote(rows);
        onRemoteChange?.();
        return;
      }
    }
    await push([...batch]);
  }

  async function flush() {
    clearTimeout(timer);
    timer = null;
    while (inFlight) await inFlight.catch(() => {});
    if (!pending.size) return;

    const batch = new Map(pending);
    inFlight = pushUnlessStale(batch);
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

  function listen() {
    running = true;
    setStorageWriteListener(record);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("online", flushQuietly);
  }

  /**
   * Resolves to { offline: true } when the account could not be reached but
   * this browser already holds the user's own cache: the app runs on it and
   * pushes the changes once the connection is back. Rejects only when there
   * is nothing trustworthy to show.
   */
  async function start() {
    const owner = storage.getItem(OWNER_KEY);
    const ownsCache = owner === userId;
    if (owner && !ownsCache) clearLocal();
    if (!ownsCache) pending = new Map();

    let rows;
    try {
      if (ownsCache && pending.size) await flush();
      rows = await pull();
    } catch (error) {
      if (!ownsCache) throw error;
      listen();
      return { offline: true };
    }

    const remoteKeys = new Set(rows.map((row) => row.key));
    if (!ownsCache) {
      for (const key of listSyncedKeys(storage, certIds)) {
        if (!remoteKeys.has(key)) pending.set(key, readJson(storage, key));
      }
    }
    const imported = new Map(pending);
    applyRemote(rows);
    for (const [key, value] of imported) storage.setItem(key, JSON.stringify(value));
    storage.setItem(OWNER_KEY, userId);
    persistPending();
    listen();
    if (pending.size) await flushQuietly();
    return { offline: false };
  }

  /**
   * Checks whether another device changed the account since this one last
   * synced, and if so pulls it into the local cache. Resolves to true when
   * the cache changed, so the caller can re-mount the app on fresh data.
   *
   * Without this, a tab left open on a phone keeps its old progress in
   * memory, and its next save would overwrite what was studied elsewhere.
   * Local changes not yet pushed win: the check is skipped while any are
   * pending.
   */
  async function refresh() {
    if (!running || pending.size || inFlight) return false;
    try {
      const { data, error } = await client
        .from(USER_STATE_TABLE)
        .select("key, updated_at")
        .eq("user_id", userId);
      if (error) throw error;
      const changed =
        data.length !== seen.size || data.some((row) => seen.get(row.key) !== row.updated_at);
      if (!changed) return false;
      const rows = await pull();
      if (pending.size || inFlight) return false;
      applyRemote(rows);
      return true;
    } catch (error) {
      console.warn("Could not check for changes from other devices:", error);
      return false;
    }
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

  return { start, stop, flush, refresh };
}
