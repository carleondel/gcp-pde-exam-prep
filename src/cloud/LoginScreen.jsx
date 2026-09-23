import { useState } from "react";

import { TRIAL_QUESTION_COUNT } from "./auth-context.js";
import { authRedirectUrl } from "./supabase.js";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--surface-line-strong)",
  background: "var(--bg-deep)",
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--surface-line-strong)",
  background: "var(--bg-tertiary)",
  color: "var(--text-primary)",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

const primaryButtonStyle = {
  ...buttonStyle,
  border: "none",
  background: "var(--gradient-practice)",
  color: "#fff",
};

const linkStyle = {
  background: "none",
  border: "none",
  padding: 0,
  color: "var(--primary-400)",
  fontSize: 12,
  cursor: "pointer",
};

export function AuthShell({ subtitle, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "var(--space-3xl) var(--space-2xl)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--surface-line)",
          background: "var(--gradient-panel)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: -1,
              fontFamily: "var(--font-heading)",
            }}
          >
            DataForge
          </h1>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {subtitle}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Message({ message }) {
  if (!message) return null;
  return (
    <div
      role={message.error ? "alert" : "status"}
      style={{
        marginBottom: "var(--space-lg)",
        padding: "10px 12px",
        borderRadius: "var(--radius-md)",
        fontSize: 13,
        lineHeight: 1.5,
        background: message.error ? "var(--wrong-soft)" : "var(--correct-soft)",
        color: message.error ? "var(--signal-wrong)" : "var(--signal-correct)",
      }}
    >
      {message.text}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        margin: "var(--space-xl) 0",
        color: "var(--text-muted)",
        fontSize: 11,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
      }}
    >
      <span style={{ flex: 1, height: 1, background: "var(--surface-line)" }} />
      {label}
      <span style={{ flex: 1, height: 1, background: "var(--surface-line)" }} />
    </div>
  );
}

export default function LoginScreen({ client, onStartTrial }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  async function run(action) {
    setBusy(true);
    setMessage(null);
    try {
      const { error, info } = await action();
      if (error) setMessage({ error: true, text: error.message });
      else if (info) setMessage({ text: info });
    } finally {
      setBusy(false);
    }
  }

  const needEmail = () => ({ error: { message: "Enter your email first." } });

  const signInWithProvider = (provider) =>
    run(() =>
      client.auth.signInWithOAuth({
        provider,
        options: { redirectTo: authRedirectUrl() },
      }),
    );

  const signInWithPassword = (event) => {
    event.preventDefault();
    run(() => client.auth.signInWithPassword({ email, password }));
  };

  const signUp = () =>
    run(async () => {
      if (!email || password.length < 8) {
        return { error: { message: "Use a valid email and a password of 8+ characters." } };
      }
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: authRedirectUrl() },
      });
      if (error) return { error };
      return data.session ? {} : { info: "Check your inbox to confirm your account." };
    });

  const sendMagicLink = () =>
    run(async () => {
      if (!email) return needEmail();
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: authRedirectUrl() },
      });
      return error ? { error } : { info: "Magic link sent. Check your inbox." };
    });

  const resetPassword = () =>
    run(async () => {
      if (!email) return needEmail();
      const { error } = await client.auth.resetPasswordForEmail(email, {
        redirectTo: authRedirectUrl(),
      });
      return error ? { error } : { info: "Password reset email sent." };
    });

  return (
    <AuthShell subtitle="Sign in to save your progress">
      <Message message={message} />

      <div style={{ display: "grid", gap: "var(--space-md)" }}>
        <button
          type="button"
          style={buttonStyle}
          disabled={busy}
          onClick={() => signInWithProvider("google")}
        >
          Continue with Google
        </button>
        <button
          type="button"
          style={buttonStyle}
          disabled={busy}
          onClick={() => signInWithProvider("github")}
        >
          Continue with GitHub
        </button>
      </div>

      <Divider label="or with email" />

      <form onSubmit={signInWithPassword} style={{ display: "grid", gap: "var(--space-md)" }}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={primaryButtonStyle} disabled={busy}>
          Sign in
        </button>
        <button type="button" style={buttonStyle} disabled={busy} onClick={signUp}>
          Create account
        </button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "var(--space-md)",
        }}
      >
        <button type="button" style={linkStyle} disabled={busy} onClick={sendMagicLink}>
          Email me a magic link
        </button>
        <button type="button" style={linkStyle} disabled={busy} onClick={resetPassword}>
          Forgot password?
        </button>
      </div>

      <Divider label="not ready yet?" />

      <button type="button" style={buttonStyle} onClick={onStartTrial}>
        Try {TRIAL_QUESTION_COUNT} questions without an account
      </button>
    </AuthShell>
  );
}

export function NewPasswordScreen({ client, onDone }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  async function submit(event) {
    event.preventDefault();
    if (password.length < 8) {
      setMessage({ error: true, text: "Use at least 8 characters." });
      return;
    }
    setBusy(true);
    const { error } = await client.auth.updateUser({ password });
    setBusy(false);
    if (error) setMessage({ error: true, text: error.message });
    else onDone();
  }

  return (
    <AuthShell subtitle="Choose a new password">
      <Message message={message} />
      <form onSubmit={submit} style={{ display: "grid", gap: "var(--space-md)" }}>
        <input
          type="password"
          autoComplete="new-password"
          placeholder="New password"
          aria-label="New password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={primaryButtonStyle} disabled={busy}>
          Save password
        </button>
      </form>
    </AuthShell>
  );
}
