import CaseStudyPanel from "../components/CaseStudyPanel.jsx";
import { getCorrectOptionIndexes } from "../engine/quiz-engine";
import { formatDuration } from "../ui/formatting.js";

/**
 * The question itself: what is being asked, the options, and — in practice
 * and blocks — the answer once it has been checked.
 *
 * Shared by all three kinds of session, which is why so much arrives at once.
 * The inputs are grouped by who owns them rather than flattened into a call
 * of thirty arguments:
 *
 * - `answer` is the state of this one question on screen. It is a
 *   presentation contract: indexes rather than the Set the caller keeps, no
 *   setters, and the derived flags already worked out.
 * - `session` is a narrow summary of the run, not the session object.
 * - `inventory` is what the player can spend here.
 *
 * Every control reports an intent. Picking an option says which index was
 * clicked; the caller decides whether that adds to a set, replaces a single
 * choice, or is ignored because the answer is already showing.
 */
export default function QuizView({
  question,
  caseStudies,
  bookmarked,
  answer,
  session,
  inventory,
  canUsePowerUps,
  scrollRef,
  onSelectOption,
  onSubmit,
  onAdvance,
  onToggleDiscussion,
  onToggleRationales,
  onToggleBookmark,
  onUseHint,
  onUse5050,
  onUseSkip,
  onConsumeReward,
  onCancelMock,
}) {
  return (
    <div ref={scrollRef} style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 40px" }}>
      {session.mode !== "mock" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "var(--space-md)",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              background: "var(--surface-panel)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--surface-line)",
              padding: 14,
            }}
          >
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
              {session.mode === "blocks"
                ? `Bloque ${session.blockMeta.label} • orden fijo • vuelta ${session.blockMeta.roundNumber}`
                : "Feedback inmediato • recompensas activas • ayudas disponibles"}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--primary-soft)",
                  color: "var(--primary-400)",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Correctas {session.score}/{session.answered}
              </span>
              {session.pendingRewards > 0 && (
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent-soft)",
                    color: "var(--accent-300)",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Pendientes {session.pendingRewards}
                </span>
              )}
              {inventory.shields > 0 && (
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--correct-soft)",
                    color: "var(--signal-correct)",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  🛡️ {inventory.shields}
                </span>
              )}
            </div>
          </div>
          {canUsePowerUps && (
            <div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {inventory.fiftyFifty > 0 && (
                <button
                  onClick={onUse5050}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--signal-info)",
                    background: "var(--info-soft)",
                    color: "var(--signal-info)",
                    cursor: "pointer",
                  }}
                >
                  ✂️
                </button>
              )}
              {inventory.hints > 0 && (
                <button
                  onClick={onUseHint}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--accent-300)",
                    background: "var(--accent-soft)",
                    color: "var(--accent-300)",
                    cursor: "pointer",
                  }}
                >
                  💡
                </button>
              )}
              {inventory.skips > 0 && (
                <button
                  onClick={onUseSkip}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--primary-400)",
                    background: "var(--primary-soft)",
                    color: "var(--primary-400)",
                    cursor: "pointer",
                  }}
                >
                  ⏭️
                </button>
              )}
              {inventory.wheelSpins > 0 && (
                <button
                  onClick={() => onConsumeReward("wheel")}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--accent-300)",
                    background: "var(--accent-soft)",
                    color: "var(--accent-300)",
                    cursor: "pointer",
                  }}
                >
                  🎰
                </button>
              )}
              {inventory.scratchCards > 0 && (
                <button
                  onClick={() => onConsumeReward("scratch")}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--primary-400)",
                    background: "var(--primary-soft)",
                    color: "var(--primary-400)",
                    cursor: "pointer",
                  }}
                >
                  🎫
                </button>
              )}
              {inventory.chestKeys > 0 && (
                <button
                  onClick={() => onConsumeReward("chest")}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--accent-300)",
                    background: "var(--accent-soft)",
                    color: "var(--accent-300)",
                    cursor: "pointer",
                  }}
                >
                  📦
                </button>
              )}
              {inventory.bossKeys > 0 && (
                <button
                  onClick={() => onConsumeReward("boss")}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--signal-wrong)",
                    background: "var(--wrong-soft)",
                    color: "var(--signal-wrong)",
                    cursor: "pointer",
                  }}
                >
                  🗝️
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {session.mode === "mock" && (
        <div
          style={{
            background: "var(--surface-panel)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--surface-line)",
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
            Sin ayudas ni feedback inmediato. Las no respondidas al acabar el tiempo cuentan como
            incorrectas.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-sm)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>
              Objetivo mínimo: {session.passPercent}% • Apto/No apto
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
              <span
                style={{
                  fontSize: 13,
                  color:
                    session.mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--accent-300)",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {formatDuration(session.mockRemainingSec)} restantes
              </span>
              <button
                onClick={onCancelMock}
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--wrong-soft)",
                  background: "transparent",
                  color: "var(--signal-wrong)",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "var(--radius-pill)",
            background: "var(--primary-soft)",
            color: "var(--primary-400)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
          }}
        >
          {question.topic}
        </span>
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "var(--radius-pill)",
            background: question.difficulty === 3 ? "var(--wrong-soft)" : "var(--accent-soft)",
            color: question.difficulty === 3 ? "var(--signal-wrong)" : "var(--accent-300)",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
          }}
        >
          {"★".repeat(question.difficulty)}
        </span>
        {session.mode === "blocks" && session.blockMeta && (
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "var(--radius-pill)",
              background: "var(--surface-panel-muted)",
              color: "var(--text-secondary)",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {session.blockMeta.label}
          </span>
        )}
        {question.isRecent && (
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent-soft)",
              color: "var(--accent-300)",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            Reciente #{question.sourceQuestionNumber || question.id}
          </span>
        )}
        {answer.isMulti && (
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "var(--radius-pill)",
              background: "var(--surface-panel-muted)",
              color: "var(--text-secondary)",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            Multi respuesta
          </span>
        )}
        {session.mode !== "mock" && (
          <button
            onClick={onToggleBookmark}
            style={{
              marginLeft: "auto",
              border: "none",
              background: "transparent",
              color: bookmarked ? "var(--accent-300)" : "var(--text-tertiary)",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {bookmarked ? "★" : "☆"}
          </button>
        )}
      </div>

      {answer.showHint && session.mode !== "mock" && (
        <div
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-medium)",
            borderRadius: "var(--radius-lg)",
            padding: "12px 16px",
            marginBottom: 14,
            color: "var(--accent-300)",
            fontSize: 13,
          }}
        >
          💡 Pista: {question.explanation.split(".")[0]}.
        </div>
      )}

      <div
        style={{
          background: "var(--gradient-panel)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--surface-line)",
          padding: 24,
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {question.legacyNote && (
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginBottom: 18,
              padding: "12px 14px",
              borderRadius: "var(--radius-lg)",
              background: "var(--warning-soft)",
              border: "1px solid var(--signal-warning)",
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1.35, flexShrink: 0 }}>⚠️</span>
            <span
              style={{
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--text-secondary)",
                fontWeight: 400,
              }}
            >
              <strong
                style={{
                  color: "var(--signal-warning)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Desactualizado
              </strong>
              {" — "}
              {question.legacyNote}
            </span>
          </div>
        )}

        {question.caseStudy && (
          <CaseStudyPanel caseStudyId={question.caseStudy} caseStudies={caseStudies} />
        )}

        <div
          style={{
            marginBottom: 18,
            fontSize: 19,
            fontWeight: 700,
            lineHeight: 1.6,
            color: "var(--text-primary)",
            whiteSpace: "pre-line",
          }}
        >
          {question.question}
        </div>

        {question.images?.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {question.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt || ""}
                loading="lazy"
                style={{
                  maxWidth: "100%",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--surface-line)",
                }}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {question.options.map((option, index) => {
            if (answer.hiddenOptions.includes(index)) {
              return (
                <div
                  key={index}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px dashed var(--surface-line)",
                    background: "var(--surface-panel-muted)",
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                  }}
                >
                  Opción eliminada
                </div>
              );
            }

            const isSelected = answer.selectedIndexes.includes(index);
            const isCorrectOption = getCorrectOptionIndexes(question).includes(index);
            const selectedIndexes = answer.evaluation?.selectedIndexes || [];
            const selectedHasOption = selectedIndexes.includes(index);
            let background = "var(--surface-panel-muted)";
            let border = "1px solid var(--surface-line)";
            let color = "var(--text-primary)";
            let animation = "";

            if (session.mode !== "mock" && answer.showResult) {
              if (isCorrectOption) {
                background = "var(--correct-soft)";
                border = "2px solid var(--signal-correct)";
                color = "var(--signal-correct)";
              } else if (selectedHasOption) {
                background = "var(--wrong-soft)";
                border = "2px solid var(--signal-wrong)";
                color = "var(--signal-wrong)";
                animation = "shake 0.4s";
              }
            } else if (isSelected) {
              background = session.mode === "mock" ? "var(--accent-soft)" : "var(--info-soft)";
              border =
                session.mode === "mock"
                  ? "2px solid var(--accent-300)"
                  : "2px solid var(--signal-info)";
              color = session.mode === "mock" ? "var(--accent-300)" : "var(--signal-info)";
            }

            return (
              <button
                key={index}
                onClick={() => onSelectOption(index)}
                style={{
                  padding: "15px 16px",
                  borderRadius: "var(--radius-lg)",
                  border,
                  background,
                  color,
                  fontSize: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  lineHeight: 1.45,
                  animation,
                  transition: "all 0.18s ease",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {answer.isMulti && (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        border: isSelected
                          ? "2px solid currentColor"
                          : "2px solid var(--surface-line-strong)",
                        background: isSelected ? "currentColor" : "transparent",
                        color: "var(--bg-primary)",
                        fontSize: 10,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                  )}
                  <span style={{ flex: 1, whiteSpace: "pre-line" }}>{option}</span>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: "1px solid var(--surface-line-strong)",
                      background: "var(--surface-panel-muted)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--text-tertiary)",
                      flexShrink: 0,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {index + 1}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {session.mode !== "mock" && answer.showResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                background: answer.evaluation?.isCorrect
                  ? "var(--correct-soft)"
                  : "var(--wrong-soft)",
                border: `1px solid ${answer.evaluation?.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)"}`,
                borderRadius: "var(--radius-lg)",
                padding: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-md)",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: answer.evaluation?.isCorrect
                      ? "var(--signal-correct)"
                      : "var(--signal-wrong)",
                  }}
                >
                  {answer.evaluation?.isCorrect ? "Correcto" : "Incorrecto"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--accent-300)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  +{session.lastXp} XP
                </div>
              </div>
              {question.conceptSummary && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {question.conceptSummary}
                </div>
              )}
              <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>
                {question.correctRationale || question.explanation}
              </div>
            </div>
            {!answer.evaluation?.isCorrect &&
              question.optionRationales &&
              (() => {
                const wrongPicks = answer.evaluation?.extraIndexes || [];
                const missed = answer.evaluation?.missingIndexes || [];
                const highlights = [...wrongPicks, ...missed].filter(
                  (value, i, arr) => arr.indexOf(value) === i,
                );
                return highlights.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {wrongPicks.map((optIdx) =>
                      question.optionRationales[optIdx] ? (
                        <div
                          key={`w-${optIdx}`}
                          style={{
                            background: "var(--wrong-soft)",
                            border: "1px solid var(--signal-wrong)",
                            borderRadius: "var(--radius-md)",
                            padding: "10px 14px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--signal-wrong)",
                              marginBottom: 4,
                            }}
                          >
                            {question.options[optIdx]?.split(".")[0]}: tu respuesta
                          </div>
                          <div
                            style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.55 }}
                          >
                            {question.optionRationales[optIdx]}
                          </div>
                        </div>
                      ) : null,
                    )}
                    {missed.map((optIdx) =>
                      question.optionRationales[optIdx] ? (
                        <div
                          key={`m-${optIdx}`}
                          style={{
                            background: "var(--correct-soft)",
                            border: "1px solid var(--signal-correct)",
                            borderRadius: "var(--radius-md)",
                            padding: "10px 14px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--signal-correct)",
                              marginBottom: 4,
                            }}
                          >
                            {question.options[optIdx]?.split(".")[0]}: respuesta correcta
                          </div>
                          <div
                            style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.55 }}
                          >
                            {question.optionRationales[optIdx]}
                          </div>
                        </div>
                      ) : null,
                    )}
                  </div>
                ) : null;
              })()}
            {question.optionRationales && (
              <button
                onClick={onToggleRationales}
                style={{
                  border: "1px solid var(--surface-line-strong)",
                  background: "var(--surface-panel-muted)",
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {answer.showAllRationales ? "Ocultar" : "Ver"} todas las justificaciones
              </button>
            )}
            {answer.showAllRationales && question.optionRationales && (
              <div
                style={{
                  background: "var(--surface-panel)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--surface-line)",
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {question.optionRationales.map((rationale, optIdx) => {
                  const isCorrectOpt = getCorrectOptionIndexes(question).includes(optIdx);
                  return (
                    <div
                      key={optIdx}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "var(--radius-md)",
                        background: isCorrectOpt
                          ? "var(--correct-soft)"
                          : "var(--surface-panel-muted)",
                        border: `1px solid ${isCorrectOpt ? "var(--signal-correct)" : "var(--surface-line)"}`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: isCorrectOpt ? "var(--signal-correct)" : "var(--text-tertiary)",
                          marginBottom: 3,
                        }}
                      >
                        {question.options[optIdx]?.split(".")[0]}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.55 }}>
                        {rationale}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <button
              onClick={onToggleDiscussion}
              style={{
                border: "1px solid var(--primary-medium)",
                background: "var(--primary-soft)",
                color: "var(--primary-400)",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {answer.showDiscussion ? "Ocultar" : "Ver"} discusión (
              {question.discussion?.length ?? 0})
            </button>
            {answer.showDiscussion && (
              <div
                style={{
                  background: "var(--surface-panel)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--surface-line)",
                  padding: 14,
                }}
              >
                {(question.discussion ?? []).map((entry, index) => (
                  <div
                    key={`${entry.user}-${index}`}
                    style={{
                      paddingBottom: index < (question.discussion?.length ?? 0) - 1 ? 12 : 0,
                      marginBottom: index < (question.discussion?.length ?? 0) - 1 ? 12 : 0,
                      borderBottom:
                        index < (question.discussion?.length ?? 0) - 1
                          ? "1px solid var(--surface-line)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: `hsl(${index * 110 + 210},65%,38%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      >
                        {entry.user[0]}
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 700 }}>
                        {entry.user}
                      </span>
                    </div>
                    <div
                      style={{
                        marginLeft: 34,
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        lineHeight: 1.55,
                      }}
                    >
                      {entry.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={onAdvance}
              style={{
                padding: "14px 16px",
                border: "none",
                borderRadius: "var(--radius-lg)",
                background: session.pendingRewards
                  ? "var(--gradient-mock)"
                  : "var(--gradient-success)",
                color: "white",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              {session.pendingRewards
                ? `Reclamar recompensa (${session.pendingRewards})`
                : session.isLast
                  ? "Ver resultados"
                  : "Siguiente"}{" "}
              <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!answer.canSubmit}
            style={{
              width: "100%",
              padding: "15px 16px",
              border: "none",
              borderRadius: "var(--radius-lg)",
              background: answer.canSubmit
                ? session?.mode === "mock"
                  ? "var(--gradient-mock)"
                  : "var(--gradient-practice)"
                : "var(--text-muted)",
              color: "white",
              fontSize: 14,
              fontWeight: 800,
              cursor: answer.canSubmit ? "pointer" : "not-allowed",
              opacity: answer.canSubmit ? 1 : 0.55,
              fontFamily: "var(--font-mono)",
            }}
          >
            {session.mode === "mock"
              ? "Guardar y continuar"
              : answer.isMulti
                ? `Comprobar (${answer.evaluation?.selectedIndexes.length || 0}/${getCorrectOptionIndexes(question).length})`
                : "Comprobar"}{" "}
            {answer.canSubmit && <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>}
          </button>
        )}
      </div>
    </div>
  );
}
