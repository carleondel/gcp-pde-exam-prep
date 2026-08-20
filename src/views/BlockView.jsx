import {
  BLOCK_MASTERY_PERCENT,
  BLOCK_SIZE_PRESETS,
  hasBlockChanged,
  isBlockMastered,
} from "../engine/block-study";
import { formatDuration, getPercentTone } from "../ui/formatting.js";

/**
 * The "Bloques de estudio" tab: the whole track at a glance, the selected
 * block in detail, and the per-round history.
 *
 * It never sees progress. Whatever a block has scored is asked for through
 * `getBlockRecord`, so the only source of truth for progress stays in the
 * hook that owns it.
 *
 * Two nullable indexes rather than one, because they mean different things.
 * `savedBlockIndex` is whatever attempt was left unfinished, and drives the
 * header shortcut; `activeBlockIndex` is that same attempt only when it
 * belongs to the track currently on screen, and is what marks a block "In
 * progress". Change the block size and the first survives while the second
 * disappears — which is the existing behaviour, kept deliberately.
 */
export default function BlockView({
  blocks,
  trackSize,
  selectedBlock,
  selectedBlockProgress,
  roundStats,
  suggestedBlock,
  savedBlockIndex,
  activeBlockIndex,
  message,
  getBlockRecord,
  onContinueSaved,
  onStart,
  onSelectSize,
  onSelectIndex,
  onPickBlock,
}) {
  const selectedBlockRounds = selectedBlockProgress?.rounds || [];
  const selectedBlockChanged = selectedBlock
    ? hasBlockChanged(selectedBlock, selectedBlockProgress)
    : false;
  const selectedBlockMastered = isBlockMastered(selectedBlockProgress);
  const selectedBlockLastTone = getPercentTone(selectedBlockProgress?.lastPercent);
  const selectedBlockBestTone = getPercentTone(selectedBlockProgress?.bestPercent);
  const selectedBlockStatus =
    activeBlockIndex === selectedBlock?.blockIndex
      ? "In progress"
      : selectedBlockChanged
        ? "Updated"
        : !selectedBlockProgress?.rounds?.length
          ? "Not started"
          : selectedBlockMastered
            ? `Mastered (${BLOCK_MASTERY_PERCENT}%+)`
            : `Reviewed ${selectedBlockProgress.rounds.length}x`;

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(15, 191, 163, 0.14), rgba(6, 15, 25, 0.92))",
        border: "1px solid var(--primary-medium)",
        borderRadius: "var(--radius-2xl)",
        padding: 24,
        marginBottom: 18,
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "var(--primary-400)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            Bloques
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              marginTop: 4,
              fontFamily: "var(--font-heading)",
            }}
          >
            Rondas fijas de estudio
          </div>
          <div
            style={{ marginTop: 6, fontSize: 14, color: "var(--text-secondary)", maxWidth: 720 }}
          >
            Orden descendente estable, vueltas por bloque y continuidad aunque recargues la página.
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          {savedBlockIndex !== null && (
            <button
              onClick={onContinueSaved}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--signal-info)",
                background: "var(--info-soft)",
                color: "var(--signal-info)",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              Continuar B{savedBlockIndex + 1}
            </button>
          )}
          {BLOCK_SIZE_PRESETS.map((size) => (
            <button
              key={size}
              onClick={() => onSelectSize(size)}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border:
                  trackSize === size
                    ? "1px solid var(--primary-medium)"
                    : "1px solid var(--surface-line)",
                background:
                  trackSize === size ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                color: trackSize === size ? "var(--primary-400)" : "var(--text-secondary)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              {size} preguntas
            </button>
          ))}
        </div>
      </div>

      {selectedBlock && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.9fr)",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: "var(--gradient-panel-strong)",
              border: "1px solid var(--surface-line)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-md)",
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {selectedBlock.blockIndex === suggestedBlock?.blockIndex
                    ? "Bloque sugerido"
                    : "Bloque seleccionado"}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 26,
                    fontWeight: 900,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Bloque {selectedBlock.blockIndex + 1}{" "}
                  <span style={{ color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>
                    {selectedBlock.label}
                  </span>
                </div>
              </div>
              <span
                style={{
                  padding: "6px 10px",
                  borderRadius: "var(--radius-pill)",
                  background: selectedBlockChanged
                    ? "var(--accent-soft)"
                    : selectedBlockMastered
                      ? "var(--correct-soft)"
                      : "var(--surface-panel-muted)",
                  color: selectedBlockChanged
                    ? "var(--accent-300)"
                    : selectedBlockMastered
                      ? "var(--signal-correct)"
                      : "var(--text-primary)",
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {selectedBlockStatus}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Preguntas</div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {selectedBlock.questionIds.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Vueltas</div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {selectedBlockRounds.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Último %</div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 18,
                    fontWeight: 800,
                    color: selectedBlockLastTone.text,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {selectedBlockProgress ? `${selectedBlockProgress.lastPercent}%` : "-"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Mejor %</div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 18,
                    fontWeight: 800,
                    color: selectedBlockBestTone.text,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {selectedBlockProgress ? `${selectedBlockProgress.bestPercent}%` : "-"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {activeBlockIndex === selectedBlock.blockIndex ? (
                <button
                  onClick={onContinueSaved}
                  style={{
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
                  Continuar
                </button>
              ) : (
                <button
                  onClick={() => onStart(selectedBlock)}
                  style={{
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
                  {selectedBlockRounds.length
                    ? `Repetir vuelta ${selectedBlockRounds.length + 1}`
                    : "Empezar bloque"}
                </button>
              )}
              {selectedBlock.blockIndex < blocks.length - 1 && (
                <button
                  onClick={() => onSelectIndex(selectedBlock.blockIndex + 1)}
                  style={{
                    padding: "14px 16px",
                    border: "1px solid var(--surface-line)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--surface-panel-muted)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Siguiente bloque
                </button>
              )}
              {selectedBlock.blockIndex > 0 && (
                <button
                  onClick={() => onSelectIndex(selectedBlock.blockIndex - 1)}
                  style={{
                    padding: "14px 16px",
                    border: "1px solid var(--surface-line)",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--surface-panel-muted)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Bloque anterior
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              background: "var(--gradient-panel)",
              border: "1px solid var(--surface-line)",
              borderRadius: "var(--radius-xl)",
              padding: 20,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: "var(--font-mono)",
                  marginBottom: 10,
                }}
              >
                Global por vuelta
              </div>
              {roundStats.length ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                    gap: 8,
                  }}
                >
                  {roundStats.map((roundStat) => {
                    const tone = getPercentTone(roundStat.percent);
                    return (
                      <div
                        key={roundStat.roundNumber}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "var(--radius-md)",
                          border: `1px solid ${tone.border}`,
                          background: tone.gradient,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-tertiary)",
                            textTransform: "uppercase",
                            letterSpacing: 0.8,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          Vuelta {roundStat.roundNumber}
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 18,
                            fontWeight: 900,
                            color: tone.text,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {roundStat.percent}%
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 11,
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {roundStat.completedBlocks}/{blocks.length} bloques
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  El % global por vuelta aparecerá en cuanto completes bloques de este track.
                </div>
              )}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              Últimas vueltas
            </div>
            {selectedBlockRounds.length ? (
              selectedBlockRounds
                .slice(-3)
                .reverse()
                .map((round, index, rounds) =>
                  (() => {
                    const roundTone = getPercentTone(round.percent);
                    return (
                      <div
                        key={round.roundNumber}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 10,
                          padding: "10px 0",
                          borderBottom:
                            index < rounds.length - 1 ? "1px solid var(--surface-line)" : "none",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 800,
                              color: "var(--text-primary)",
                              fontFamily: "var(--font-heading)",
                            }}
                          >
                            Vuelta {round.roundNumber}
                          </div>
                          <div
                            style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}
                          >
                            {new Date(round.finishedAt).toLocaleString("es-ES")}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 900,
                              color: roundTone.text,
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {round.percent}%
                          </div>
                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 12,
                              color: "var(--text-secondary)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {round.correctCount}/{round.questionCount} ·{" "}
                            {round.elapsedSec ? formatDuration(round.elapsedSec) : "-"}
                          </div>
                        </div>
                      </div>
                    );
                  })(),
                )
            ) : (
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Todavía no hay vueltas registradas para este bloque.
              </div>
            )}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10,
        }}
      >
        {blocks.map((block) => {
          const blockProgress = getBlockRecord(block);
          const blockRounds = blockProgress?.rounds || [];
          const blockTone = getPercentTone(blockProgress?.lastPercent);
          const isActive = activeBlockIndex === block.blockIndex;
          const isSelected = selectedBlock?.blockIndex === block.blockIndex;
          const isUpdated = hasBlockChanged(block, blockProgress);
          const isMastered = isBlockMastered(blockProgress);
          const label = isActive
            ? "In progress"
            : isUpdated
              ? "Updated"
              : !blockRounds.length
                ? "Not started"
                : isMastered
                  ? "Mastered"
                  : `Reviewed ${blockRounds.length}x`;
          return (
            <button
              key={block.id}
              onClick={() => onPickBlock(block)}
              style={{
                padding: 14,
                borderRadius: "var(--radius-lg)",
                border: isActive
                  ? "1px solid var(--signal-info)"
                  : isSelected
                    ? `1px solid ${blockTone.value === null ? "var(--primary-medium)" : blockTone.border}`
                    : `1px solid ${blockTone.border}`,
                background:
                  blockTone.value === null
                    ? isSelected
                      ? "linear-gradient(180deg, var(--primary-soft), var(--surface-panel-muted))"
                      : "var(--surface-panel-muted)"
                    : isSelected
                      ? blockTone.gradientStrong
                      : blockTone.gradient,
                textAlign: "left",
                cursor: "pointer",
                color: "var(--text-primary)",
                boxShadow: isSelected ? blockTone.shadow : "none",
                transition:
                  "transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--font-heading)" }}>
                  Bloque {block.blockIndex + 1}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: isActive ? "var(--signal-info)" : blockTone.text,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {blockProgress ? `${blockProgress.lastPercent}%` : "-"}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 6,
                }}
              >
                {block.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: isUpdated
                    ? "var(--accent-300)"
                    : blockTone.value === null
                      ? "var(--text-tertiary)"
                      : blockTone.text,
                }}
              >
                {label}
              </div>
            </button>
          );
        })}
      </div>

      {message && (
        <div
          style={{
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--info-soft)",
            border: "1px solid var(--signal-info)",
            color: "var(--signal-info)",
            fontSize: 12,
            lineHeight: 1.45,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
