import { useCallback, useEffect, useRef, useState } from "react";

import { getFeedbackContext } from "./feedback-context.js";

export const FEEDBACK_EMAIL = "carleondel@gmail.com";

const KINDS = [
  ["bug", "Bug"],
  ["question", "Wrong question or answer"],
  ["idea", "Idea"],
  ["other", "Other"],
];

const fieldStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--surface-line-strong)",
  background: "var(--bg-deep)",
  color: "var(--text-primary)",
  fontSize: 14,
};

const labelStyle = {
  display: "grid",
  gap: 6,
  fontSize: 12,
  color: "var(--text-secondary)",
  fontFamily: "var(--font-mono)",
};

function mailtoHref(kind, message, context) {
  const about = context.questionId ? ` (${context.certId} #${context.questionId})` : "";
  const subject = encodeURIComponent(`DataForge feedback: ${kind}${about}`);
  return `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
}

export function FeedbackDialog({ client, user, onClose }) {
  const [context] = useState(getFeedbackContext);
  const [kind, setKind] = useState(context.questionId ? "question" : "bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [attachQuestion, setAttachQuestion] = useState(Boolean(context.questionId));
  const [status, setStatus] = useState("idle");
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(event) {
    event.preventDefault();
    if (message.trim().length < 3) return;
    setStatus("sending");
    const { error } = await client.from("feedback").insert({
      kind,
      message: message.trim(),
      email: email.trim() || null,
      cert_id: context.certId,
      question_id: attachQuestion ? context.questionId : null,
      page: window.location.pathname + window.location.search,
      user_agent: navigator.userAgent.slice(0, 500),
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div
      role="presentation"
      onClick={(event) => event.target === event.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        padding: "var(--space-lg)",
        background: "var(--bg-overlay)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        style={{
          width: "100%",
          maxWidth: 440,
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
          padding: "var(--pad-card)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--surface-line-strong)",
          background: "var(--gradient-panel-strong)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-lg)",
          }}
        >
          <h2
            id="feedback-title"
            style={{ margin: 0, fontSize: 20, fontFamily: "var(--font-heading)" }}
          >
            Send feedback
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--text-secondary)",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {status === "sent" ? (
          <div style={{ display: "grid", gap: "var(--space-lg)" }}>
            <p style={{ margin: 0, color: "var(--signal-correct)", fontSize: 14 }}>
              Thanks! Your feedback was sent.
            </p>
            <button type="button" onClick={onClose} style={{ ...fieldStyle, cursor: "pointer" }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: "var(--space-md)" }}>
            <label style={labelStyle}>
              What is it about?
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value)}
                style={fieldStyle}
              >
                {KINDS.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label style={labelStyle}>
              Message
              <textarea
                ref={textRef}
                required
                minLength={3}
                maxLength={5000}
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What happened, or what would make DataForge better?"
                style={{ ...fieldStyle, resize: "vertical", fontFamily: "var(--font-body)" }}
              />
            </label>
            {context.questionId && (
              <label
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                <input
                  type="checkbox"
                  checked={attachQuestion}
                  onChange={(event) => setAttachQuestion(event.target.checked)}
                />
                About the current question (#{context.questionId})
              </label>
            )}
            <label style={labelStyle}>
              Email for a reply (optional)
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                style={fieldStyle}
              />
            </label>
            {status === "error" && (
              <p role="alert" style={{ margin: 0, fontSize: 13, color: "var(--signal-wrong)" }}>
                Could not send it.{" "}
                <a href={mailtoHref(kind, message, context)} style={{ color: "inherit" }}>
                  Email it instead
                </a>
                .
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending" || message.trim().length < 3}
              style={{
                ...fieldStyle,
                border: "none",
                background: "var(--gradient-practice)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                opacity: message.trim().length < 3 ? 0.6 : 1,
              }}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function FeedbackButton({ client, user, style }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button type="button" style={style} onClick={() => setOpen(true)}>
        Feedback
      </button>
      {open && <FeedbackDialog client={client} user={user} onClose={close} />}
    </>
  );
}
