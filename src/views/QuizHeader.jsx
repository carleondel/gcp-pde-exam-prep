import { formatDuration } from "../ui/formatting.js";

/**
 * The bar pinned to the top of a running session: how to get out, what kind
 * of session it is, the clock, and how far along it is.
 *
 * One `mode` covers the three kinds. A block is a practice session that has
 * been tagged as one, so whatever the two share is keyed off "not mock"
 * rather than off a second flag.
 */
export default function QuizHeader({
  mode,
  blockMeta,
  streak,
  multiplier,
  rank,
  xp,
  questionNumber,
  questionTotal,
  mockRemainingSec,
  blockElapsedSec,
  onGoToMenu,
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(10, 14, 23, 0.88)",
        borderBottom: "1px solid var(--surface-line)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "12px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-md)",
            marginBottom: 8,
          }}
        >
          <button
            onClick={onGoToMenu}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--surface-line)",
              background: "var(--surface-panel-muted)",
              color: "var(--text-primary)",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            ← Menú
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                padding: "6px 10px",
                borderRadius: "var(--radius-pill)",
                background: mode === "mock" ? "var(--accent-soft)" : "var(--primary-soft)",
                color: mode === "mock" ? "var(--accent-300)" : "var(--primary-400)",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "var(--font-mono)",
              }}
            >
              {mode === "mock" ? "Simulacro" : mode === "blocks" ? "Bloques" : "Practicar"}
            </span>
            {mode === "blocks" && blockMeta && (
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--info-soft)",
                  color: "var(--signal-info)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1,
                  fontFamily: "var(--font-mono)",
                }}
              >
                B{blockMeta.blockIndex + 1} · V{blockMeta.roundNumber}
              </span>
            )}
            {mode !== "mock" && streak >= 2 && (
              <span
                style={{
                  fontSize: 12,
                  color: streak >= 5 ? "var(--accent-300)" : "var(--primary-400)",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                x{streak}
              </span>
            )}
            {mode !== "mock" && multiplier.value > 1 && (
              <span
                style={{
                  fontSize: 12,
                  color: "var(--signal-correct)",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                mult x{multiplier.value} ({multiplier.rounds})
              </span>
            )}
            {mode === "mock" && (
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md)",
                  background: mockRemainingSec < 300 ? "var(--wrong-soft)" : "var(--surface-line)",
                  color: mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {formatDuration(mockRemainingSec)}
              </span>
            )}
            {mode === "blocks" && (
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface-line)",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                ⏱ {formatDuration(blockElapsedSec)}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", minWidth: 132 }}
          >
            <span style={{ fontSize: 20 }}>{rank.current.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                {rank.current.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--accent-300)",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {xp} XP
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              height: 8,
              background: "var(--surface-line)",
              borderRadius: "var(--radius-pill)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(questionNumber / questionTotal) * 100}%`,
                background: mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-practice)",
                borderRadius: "var(--radius-pill)",
                transition: "width 0.25s",
              }}
            />
          </div>
          <div
            style={{
              minWidth: 100,
              textAlign: "right",
              fontSize: 12,
              color: "var(--text-primary)",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {questionNumber}/{questionTotal}
          </div>
        </div>
      </div>
    </div>
  );
}
