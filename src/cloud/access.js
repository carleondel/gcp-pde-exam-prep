export const REDEEM_PARAM = "redeem";
export const PENDING_CODE_KEY = "cloud.redeemCode";

/**
 * Moves a `?redeem=CODE` link parameter into storage and out of the URL.
 *
 * The code has to survive signing in: OAuth and email links come back to a
 * clean URL, so it is parked until there is a user to redeem it for. Not
 * `?code=`, which Supabase uses for its own sign-in callback.
 */
export function captureRedeemCode(storage = window.localStorage, location = window.location) {
  const url = new URL(location.href);
  const code = url.searchParams.get(REDEEM_PARAM);
  if (code) {
    storage.setItem(PENDING_CODE_KEY, code.trim().toUpperCase());
    url.searchParams.delete(REDEEM_PARAM);
    window.history.replaceState(null, "", url);
  }
  return storage.getItem(PENDING_CODE_KEY);
}

/**
 * Redeems the parked code, if any. Resolves to a message for the user, or
 * null when there was nothing to redeem. The code is dropped either way so a
 * bad one does not nag on every visit.
 */
export async function redeemPendingCode(client, storage = window.localStorage) {
  const code = storage.getItem(PENDING_CODE_KEY);
  if (!code) return null;
  const { error } = await client.rpc("redeem_access_code", { p_code: code });
  storage.removeItem(PENDING_CODE_KEY);
  if (error) return { ok: false, text: `${error.message} (${code}).` };
  return { ok: true, text: "Code applied: you have free Pro access. Enjoy!" };
}

/**
 * The best complimentary plan this user holds, or null. Paid plans will
 * join this once billing exists; the app will check one place for both.
 */
export async function loadAccess(client, userId) {
  const { data, error } = await client
    .from("access_grants")
    .select("plan, expires_at")
    .eq("redeemed_by", userId);
  if (error || !data?.length) return null;
  const now = Date.now();
  const active = data.filter((g) => !g.expires_at || new Date(g.expires_at).getTime() > now);
  const rank = { exam_pass: 1, pro: 2, teams: 3 };
  return active.sort((a, b) => rank[b.plan] - rank[a.plan])[0] ?? null;
}
