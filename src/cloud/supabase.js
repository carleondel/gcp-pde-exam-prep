import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Null when the env vars are absent. The app then runs exactly as before —
 * local-only, no login — which is what tests, Docker and plain `npm run dev`
 * without a .env.local get.
 */
export const supabase =
  url && publishableKey ? createClient(url, publishableKey, { auth: { flowType: "pkce" } }) : null;

/** Where OAuth and email links send the user back: this page, same cert. */
export function authRedirectUrl() {
  const cert = new URLSearchParams(window.location.search).get("cert");
  const query = cert ? `?cert=${encodeURIComponent(cert)}` : "";
  return `${window.location.origin}${window.location.pathname}${query}`;
}
