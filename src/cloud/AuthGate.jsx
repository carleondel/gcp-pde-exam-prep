import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CERT_LIST } from "../certs/index.js";
import { AuthContext, LOCAL_AUTH, TRIAL_QUESTION_COUNT } from "./auth-context.js";
import FeedbackButton from "./FeedbackButton.jsx";
import LoginScreen, { AuthShell, NewPasswordScreen } from "./LoginScreen.jsx";
import { supabase } from "./supabase.js";
import { captureRedeemCode, loadAccess, redeemPendingCode } from "./access.js";
import { createCloudSync } from "./sync.js";

const CERT_IDS = CERT_LIST.map((cert) => cert.id);
const TRIAL_FLAG_KEY = "cloud.trial";

const barStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "var(--space-md)",
  flexWrap: "wrap",
  padding: "6px var(--space-lg)",
  borderBottom: "1px solid var(--surface-line)",
  background: "var(--surface-panel-muted)",
  fontSize: 12,
  fontFamily: "var(--font-mono)",
  color: "var(--text-secondary)",
};

const barButtonStyle = {
  padding: "4px 10px",
  borderRadius: "var(--radius-pill)",
  border: "1px solid var(--surface-line-strong)",
  background: "transparent",
  color: "var(--text-primary)",
  fontSize: 12,
  cursor: "pointer",
};

function StatusScreen({ text, onRetry }) {
  return (
    <AuthShell subtitle={text}>
      {onRetry && (
        <button type="button" style={{ ...barButtonStyle, width: "100%" }} onClick={onRetry}>
          Retry
        </button>
      )}
    </AuthShell>
  );
}

/**
 * Puts login in front of the app when a Supabase project is configured, and
 * otherwise renders the app untouched. The app mounts only once the user's
 * progress has been pulled into localStorage, so its hooks hydrate from the
 * account rather than from whatever the browser held before.
 */
export default function AuthGate({ children }) {
  if (!supabase) {
    return <AuthContext.Provider value={LOCAL_AUTH}>{children}</AuthContext.Provider>;
  }
  return <CloudAuthGate client={supabase}>{children}</CloudAuthGate>;
}

function CloudAuthGate({ client, children }) {
  const [session, setSession] = useState(undefined);
  const [recovering, setRecovering] = useState(false);
  const [syncState, setSyncState] = useState("idle");
  const [appVersion, setAppVersion] = useState(0);
  const [trial, setTrial] = useState(() => {
    if (new URLSearchParams(window.location.search).get("trial") === "1") {
      window.sessionStorage.setItem(TRIAL_FLAG_KEY, "1");
    }
    return window.sessionStorage.getItem(TRIAL_FLAG_KEY) === "1";
  });
  const syncRef = useRef(null);
  const [pendingCode] = useState(() => captureRedeemCode());
  const [access, setAccess] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    client.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = client.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, [client]);

  const user = session?.user ?? null;
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return undefined;
    let cancelled = false;
    // Another device, or an import, changed the account while this tab was
    // open: re-mount on the fresh data instead of overwriting it.
    const remount = () => {
      if (cancelled) return;
      setSyncState("ready");
      setAppVersion((version) => version + 1);
    };
    const sync = createCloudSync({ client, userId, certIds: CERT_IDS, onRemoteChange: remount });
    syncRef.current = sync;
    setSyncState("syncing");
    sync
      .start()
      .then(({ offline }) => !cancelled && setSyncState(offline ? "offline" : "ready"))
      .catch((error) => {
        console.error("Could not load your progress:", error);
        if (!cancelled) setSyncState("error");
      });

    // Coming back to the tab: pick up what was studied on another device,
    // and re-mount the app so it hydrates from it instead of saving over it.
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      sync.refresh().then((changed) => changed && remount());
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
      sync.stop();
      if (syncRef.current === sync) syncRef.current = null;
    };
  }, [client, userId]);

  const synced = syncState === "ready" || syncState === "offline";
  useEffect(() => {
    if (!userId || !synced) return undefined;
    let cancelled = false;
    redeemPendingCode(client)
      .then((message) => !cancelled && message && setNotice(message))
      .catch(() => {})
      .then(() => loadAccess(client, userId))
      .then((grant) => !cancelled && setAccess(grant));
    return () => {
      cancelled = true;
    };
  }, [client, userId, synced]);

  const startTrial = useCallback(() => {
    window.sessionStorage.setItem(TRIAL_FLAG_KEY, "1");
    setTrial(true);
  }, []);

  const exitTrial = useCallback(() => {
    window.sessionStorage.removeItem(TRIAL_FLAG_KEY);
    const url = new URL(window.location.href);
    url.searchParams.delete("trial");
    window.history.replaceState(null, "", url);
    setTrial(false);
  }, []);

  const signOut = useCallback(async () => {
    await syncRef.current?.stop({ clear: true });
    await client.auth.signOut();
    window.sessionStorage.removeItem(TRIAL_FLAG_KEY);
    window.location.reload();
  }, [client]);

  const auth = useMemo(() => {
    if (user) return { mode: "cloud", user, trial: false, access, signOut };
    return { mode: "trial", user: null, trial: true, access: null, exitTrial };
  }, [user, access, signOut, exitTrial]);

  if (session === undefined) return <StatusScreen text="Loading…" />;
  if (recovering) {
    return <NewPasswordScreen client={client} onDone={() => setRecovering(false)} />;
  }

  if (user) {
    if (syncState === "error") {
      return (
        <StatusScreen
          text="Could not load your progress"
          onRetry={() => window.location.reload()}
        />
      );
    }
    if (!synced) {
      return <StatusScreen text="Syncing your progress…" />;
    }
    return (
      <AuthContext.Provider value={auth}>
        <div style={barStyle}>
          <span
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </span>
          {access && (
            <span
              title={
                access.expires_at
                  ? `Free access until ${new Date(access.expires_at).toLocaleDateString("en-US")}`
                  : "Free access"
              }
              style={{
                padding: "2px 8px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent-soft)",
                color: "var(--accent-300)",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {access.plan === "exam_pass" ? "Exam Pass" : access.plan}
            </span>
          )}
          {syncState === "offline" && (
            <span title="Changes are saved on this device and sync when you are back online.">
              · offline
            </span>
          )}
          <FeedbackButton client={client} user={user} style={barButtonStyle} />
          <button type="button" style={barButtonStyle} onClick={signOut}>
            Sign out
          </button>
        </div>
        {notice && (
          <div
            role="status"
            style={{
              ...barStyle,
              justifyContent: "center",
              color: notice.ok ? "var(--signal-correct)" : "var(--signal-wrong)",
            }}
          >
            <span>{notice.text}</span>
            <button type="button" style={barButtonStyle} onClick={() => setNotice(null)}>
              Dismiss
            </button>
          </div>
        )}
        <Fragment key={appVersion}>{children}</Fragment>
      </AuthContext.Provider>
    );
  }

  // A redeem link needs an account, so it skips the trial and asks to sign in.
  if (trial && !pendingCode) {
    return (
      <AuthContext.Provider value={auth}>
        <div style={{ ...barStyle, justifyContent: "center", color: "var(--accent-300)" }}>
          <span>
            Trial mode · {TRIAL_QUESTION_COUNT} questions per certification. Create an account to
            unlock every question and keep your progress.
          </span>
          <FeedbackButton client={client} user={null} style={barButtonStyle} />
          <button type="button" style={barButtonStyle} onClick={exitTrial}>
            Sign up
          </button>
        </div>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <LoginScreen
      client={client}
      onStartTrial={startTrial}
      subtitle={pendingCode ? "Sign in or create an account to redeem your code" : undefined}
    />
  );
}
