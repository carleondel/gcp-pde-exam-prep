import { useState } from "react";

/**
 * One achievement in the inventory grid, with a tooltip on hover and on
 * keyboard focus. A secret achievement hides its name and condition until
 * it is earned; the platinum passes a progress label instead.
 */
export default function AchievementBadge({ achievement, unlocked, progressLabel = null }) {
  const [showTip, setShowTip] = useState(false);

  const show = () => setShowTip(true);
  const hide = () => setShowTip(false);

  // Un logro secreto no revela ni nombre ni condición mientras esté
  // bloqueado; al conseguirlo se comporta como cualquier otro.
  const hidden = achievement.secret && !unlocked;
  const title = hidden ? "Logro oculto" : achievement.name;
  const body = hidden ? "Sigue jugando para descubrirlo." : achievement.desc;
  const face = hidden ? "❓" : unlocked ? achievement.icon : "🔒";

  const accent = achievement.platinum ? "var(--signal-info)" : "var(--accent-300)";
  const accentSoft = achievement.platinum ? "var(--info-soft)" : "var(--accent-soft)";
  const accentLine = achievement.platinum ? "var(--signal-info)" : "var(--accent-medium)";

  const status = unlocked
    ? "Conseguido"
    : progressLabel
      ? `${progressLabel} conseguidos`
      : "Bloqueado";

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      aria-label={`${title}: ${body}${unlocked ? "" : " (bloqueado)"}`}
      style={{
        position: "relative",
        width: 34,
        height: 34,
        borderRadius: "var(--radius-sm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        cursor: "help",
        background: unlocked ? accentSoft : "rgba(139,149,168,0.06)",
        border: unlocked ? `1px solid ${accentLine}` : "1px solid var(--surface-line)",
      }}
    >
      {/* La opacidad va en el icono, no en el contenedor: si atenuásemos el
          contenedor, el tooltip de un logro bloqueado heredaría la opacidad
          y sería ilegible justo cuando más falta hace leerlo. */}
      <span aria-hidden="true" style={{ opacity: unlocked ? 1 : 0.3, lineHeight: 1 }}>
        {face}
      </span>

      {showTip && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            width: "max-content",
            maxWidth: "min(210px, 60vw)",
            padding: "9px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-deep)",
            border: `1px solid ${unlocked ? accentLine : "var(--surface-line-strong)"}`,
            boxShadow: "var(--shadow-elevated)",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: unlocked ? accent : "var(--text-secondary)",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 11.5,
              color: "var(--text-secondary)",
              marginTop: 3,
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            {body}
          </div>
          <div
            style={{
              fontSize: 9.5,
              marginTop: 5,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: unlocked ? "var(--signal-correct)" : "var(--text-muted)",
            }}
          >
            {status}
          </div>
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              marginLeft: -5,
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `5px solid ${unlocked ? accentLine : "var(--surface-line-strong)"}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
