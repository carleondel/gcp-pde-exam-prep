import { Confetti } from "../components/rewards/index.js";
import { BLOCK_MASTERY_PERCENT } from "../engine/block-study";
import { getCorrectOptionIndexes } from "../engine/quiz-engine";
import { formatDuration } from "../ui/formatting.js";

/**
 * The screen shown after a practice session, a study block, a daily challenge
 * or a mock exam. Purely presentational: everything on it comes out of the
 * `result` payload the finished session left behind, and the four actions are
 * resolved by the caller.
 *
 * `onNextBlock` is null unless the block just finished has one after it. That
 * is how this view knows whether to offer the button without knowing anything
 * about the block catalogue.
 */
export default function ResultView({
  result,
  onGoToMenu,
  onReviewMockMistakes,
  onRepeat,
  onNextBlock,
}) {
  const summary = result.summary;
  const history = result.history;
  const isBlockResult = result.mode === "blocks";
  const blockResult = result.blockStudy;
  const topicStats =
    result.mode === "mock"
      ? summary.byTopic
      : history.reduce((acc, entry) => {
          const topic = entry.question.topic;
          if (!acc[topic]) acc[topic] = { correct: 0, total: 0 };
          acc[topic].total += 1;
          if (entry.correct) acc[topic].correct += 1;
          return acc;
        }, {});
  const headline =
    result.mode === "mock"
      ? summary.passed
        ? "Simulacro superado"
        : "Simulacro completado"
      : result.mode === "daily"
        ? summary.percent >= 80
          ? "Reto diario superado"
          : "Reto diario completado"
        : isBlockResult
          ? summary.percent >= BLOCK_MASTERY_PERCENT
            ? "Bloque consolidado"
            : "Bloque completado"
          : summary.percent >= 80
            ? "Sesión excelente"
            : summary.percent >= 60
              ? "Buen entrenamiento"
              : "Seguimos iterando";

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        animation: "fadeIn var(--duration-fast) var(--ease-out)",
      }}
    >
      <Confetti active={result.mode === "mock" ? summary.passed : summary.percent >= 80} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              gap: "var(--space-sm)",
              alignItems: "center",
              marginBottom: 12,
              padding: "8px 14px",
              borderRadius: "var(--radius-pill)",
              background:
                result.mode === "mock"
                  ? "var(--accent-soft)"
                  : result.mode === "daily"
                    ? "var(--correct-soft)"
                    : isBlockResult
                      ? "var(--info-soft)"
                      : "var(--primary-soft)",
              color:
                result.mode === "mock"
                  ? "var(--accent-300)"
                  : result.mode === "daily"
                    ? "var(--signal-correct)"
                    : isBlockResult
                      ? "var(--signal-info)"
                      : "var(--primary-400)",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            {result.mode === "mock"
              ? "Simulacro"
              : result.mode === "daily"
                ? "Reto diario"
                : isBlockResult
                  ? "Bloques"
                  : "Practicar"}
          </div>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 34,
              fontWeight: 900,
              fontFamily: "var(--font-heading)",
            }}
          >
            {headline}
          </h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 15 }}>
            {result.mode === "mock"
              ? `${summary.score}/${summary.questionCount} correctas • ${summary.percent}% • ${summary.passed ? "Apto" : "No apto"}`
              : isBlockResult
                ? `${summary.score}/${summary.answered} correctas • ${summary.percent}% • vuelta ${blockResult?.roundSummary?.roundNumber ?? "?"} • +${summary.xpGained} XP`
                : `${summary.score}/${summary.answered} correctas • ${summary.percent}% • +${summary.xpGained} XP${summary.dailyBonus ? ` (incluye +${summary.dailyBonus} bonus reto)` : ""}`}
          </p>
          {isBlockResult && blockResult && (
            <p
              style={{
                margin: "10px 0 0",
                color: "var(--signal-info)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
              }}
            >
              Bloque {blockResult.blockIndex + 1} · {blockResult.label}
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              border: "1px solid var(--surface-line)",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color:
                  result.mode === "mock"
                    ? summary.passed
                      ? "var(--signal-correct)"
                      : "var(--signal-wrong)"
                    : "var(--primary-400)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {summary.percent}%
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Puntuación
            </div>
          </div>
          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              border: "1px solid var(--surface-line)",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "var(--accent-300)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock"
                ? formatDuration(summary.elapsedSec)
                : isBlockResult
                  ? formatDuration(blockResult?.roundSummary?.elapsedSec || 0)
                  : `+${summary.xpGained}`}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock"
                ? "Tiempo usado"
                : isBlockResult
                  ? "Tiempo bloque"
                  : "XP ganada"}
            </div>
          </div>
          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              border: "1px solid var(--surface-line)",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "var(--primary-400)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock"
                ? summary.questionCount
                : isBlockResult
                  ? `V${blockResult?.roundSummary?.roundNumber ?? "-"}`
                  : `x${summary.maxStreak}`}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock" ? "Preguntas" : isBlockResult ? "Vuelta" : "Racha máxima"}
            </div>
          </div>
          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              border: "1px solid var(--surface-line)",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color:
                  result.mode === "mock"
                    ? summary.passed
                      ? "var(--signal-correct)"
                      : "var(--signal-wrong)"
                    : "var(--accent-300)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock"
                ? summary.passed
                  ? "Apto"
                  : "No apto"
                : isBlockResult
                  ? `${blockResult?.roundSummary?.correctCount ?? 0}/${blockResult?.roundSummary?.questionCount ?? history.length}`
                  : history.length}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {result.mode === "mock" ? "Estado" : isBlockResult ? "Aciertos" : "Preguntas vistas"}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
              border: "1px solid var(--surface-line)",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "var(--font-heading)",
              }}
            >
              Rendimiento por tema
            </div>
            {Object.entries(topicStats)
              .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
              .map(([topic, stats]) => {
                const percent = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={topic} style={{ marginBottom: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: "var(--text-primary)" }}>{topic}</span>
                      <span
                        style={{
                          color: percent >= 70 ? "var(--signal-correct)" : "var(--signal-wrong)",
                          fontWeight: 700,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {stats.correct}/{stats.total}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "var(--surface-line)",
                        borderRadius: "var(--radius-pill)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${percent}%`,
                          background: percent >= 70 ? "var(--signal-correct)" : "var(--accent-300)",
                          borderRadius: "var(--radius-pill)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            style={{
              background: "var(--gradient-panel)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
              border: "1px solid var(--surface-line)",
              maxHeight: 420,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "var(--font-heading)",
              }}
            >
              Revisión
            </div>
            {history.map((entry, index) => {
              const correctLabels = getCorrectOptionIndexes(entry.question)
                .map((optionIndex) => entry.question.options[optionIndex].slice(0, 2))
                .join(", ");
              return (
                <div
                  key={`${entry.question.id}-${index}`}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom:
                      index < history.length - 1 ? "1px solid var(--surface-line)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: entry.correct ? "var(--correct-soft)" : "var(--wrong-soft)",
                      color: entry.correct ? "var(--signal-correct)" : "var(--signal-wrong)",
                      fontWeight: 800,
                    }}
                  >
                    {entry.correct ? "✓" : "✗"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        color: "var(--text-primary)",
                        fontSize: 12,
                        lineHeight: 1.45,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {entry.question.question}
                    </div>
                    <div style={{ color: "var(--text-tertiary)", fontSize: 11, marginTop: 4 }}>
                      {entry.question.topic}
                      {!entry.correct && (
                        <span style={{ color: "var(--signal-correct)", marginLeft: 8 }}>
                          Resp: {correctLabels}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onGoToMenu}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "none",
              borderRadius: "var(--radius-lg)",
              background: "var(--gradient-practice)",
              color: "white",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            Volver al menú
          </button>
          {result.mode === "mock" && history.some((entry) => !entry.correct) && (
            <button
              onClick={onReviewMockMistakes}
              style={{
                flex: 1,
                padding: "14px 16px",
                border: "1px solid var(--signal-wrong)",
                borderRadius: "var(--radius-lg)",
                background: "var(--wrong-soft)",
                color: "var(--signal-wrong)",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              Repasar errores ({history.filter((entry) => !entry.correct).length})
            </button>
          )}
          <button
            onClick={onRepeat}
            style={{
              flex: 1,
              padding: "14px 16px",
              border: "none",
              borderRadius: "var(--radius-lg)",
              background:
                result.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-success)",
              color: "white",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            {result.mode === "mock"
              ? "Nuevo simulacro"
              : isBlockResult
                ? `Repetir vuelta ${blockResult?.roundSummary?.roundNumber + 1 || ""}`
                : "Seguir practicando"}
          </button>
          {onNextBlock && (
            <button
              onClick={onNextBlock}
              style={{
                flex: 1,
                padding: "14px 16px",
                border: "1px solid var(--surface-line)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface-panel-muted)",
                color: "var(--text-primary)",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              Siguiente bloque
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
