import { getPercentTone } from "../ui/formatting.js";
import { isBlockMastered } from "../engine/block-study";

/**
 * The landing screen: where the app says what to do next, shows how the
 * study is going, and hands off to each of the other tabs.
 *
 * Its sections are private components of this file rather than helpers on
 * AppContent, which is where they used to live. They are presentation only:
 * they report what was clicked and never work out what it means. In
 * particular the recommendation is decided by the caller and arrives as a
 * descriptor, so NextAction renders a suggestion without knowing what makes
 * a block worth suggesting.
 */

/** The four cards across the top: rank, next rank, inventory, weakest topic. */
function SummaryCards({
  rank,
  xp,
  inventoryCount,
  achievementCount,
  weakestTopic,
  onLoadWeakTopics,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "var(--space-md)",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--surface-line)",
          borderRadius: "var(--radius-xl)",
          padding: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          Rango
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--primary-soft)",
              fontSize: 24,
              boxShadow: "var(--shadow-glow)",
            }}
          >
            {rank.current.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: rank.current.color,
                fontFamily: "var(--font-heading)",
              }}
            >
              {rank.current.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {xp} XP
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--surface-line)",
          borderRadius: "var(--radius-xl)",
          padding: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          Siguiente rango
        </div>
        {rank.next ? (
          <>
            <div
              style={{
                marginTop: 8,
                fontSize: 17,
                fontWeight: 800,
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {rank.next.icon} {rank.next.name}
            </div>
            <div
              style={{
                marginTop: 8,
                height: 6,
                background: "var(--surface-line)",
                borderRadius: "var(--radius-pill)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${rank.progress}%`,
                  background: `linear-gradient(90deg, ${rank.current.color}, ${rank.next.color})`,
                  borderRadius: "var(--radius-pill)",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {rank.next.minXP - xp} XP restantes
            </div>
          </>
        ) : (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--highlight)", fontWeight: 700 }}>
            Rango máximo alcanzado.
          </div>
        )}
      </div>
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--surface-line)",
          borderRadius: "var(--radius-xl)",
          padding: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          Inventario
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 22,
            fontWeight: 800,
            color: "var(--accent-300)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {inventoryCount}
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}>
          {achievementCount} logros desbloqueados
        </div>
      </div>
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--surface-line)",
          borderRadius: "var(--radius-xl)",
          padding: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          Peor rendimiento
        </div>
        {weakestTopic ? (
          <>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                {weakestTopic.topic}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color:
                    weakestTopic.accuracy >= 70 ? "var(--signal-correct)" : "var(--signal-wrong)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {weakestTopic.accuracy}%
              </div>
            </div>
            <button
              onClick={onLoadWeakTopics}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "10px 12px",
                border: "1px solid var(--wrong-soft)",
                borderRadius: "var(--radius-md)",
                background: "var(--wrong-soft)",
                color: "var(--signal-wrong)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cargar bloque
            </button>
          </>
        ) : (
          <div
            style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}
          >
            Se mostrará cuando haya suficientes respuestas.
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * The single recommendation above the shortcuts. `action` is one of three
 * shapes, or null when there is nothing worth recommending.
 */
function NextAction({ action, onRun }) {
  if (!action) return null;

  if (action.kind === "continue-block") {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, var(--info-soft), var(--primary-soft))",
          border: "1px solid var(--signal-info)",
          borderRadius: "var(--radius-xl)",
          padding: "18px 20px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Continuar Bloque {action.blockNumber}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Tu bloque actual esta a medias.
          </div>
        </div>
        <button
          onClick={onRun}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-practice)",
            color: "white",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          Continuar
        </button>
      </div>
    );
  }

  if (action.kind === "suggested-block") {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, var(--primary-soft), var(--accent-soft))",
          border: "1px solid var(--primary-medium)",
          borderRadius: "var(--radius-xl)",
          padding: "18px 20px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {action.hasRounds ? "Repetir" : "Empezar"} Bloque {action.blockNumber}{" "}
            <span style={{ color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>
              {action.label}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Siguiente bloque sugerido.
          </div>
        </div>
        <button
          onClick={onRun}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "var(--radius-md)",
            background: "var(--gradient-practice)",
            color: "white",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {action.hasRounds ? "Repetir" : "Empezar"}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, var(--wrong-soft), var(--accent-soft))",
        border: "1px solid var(--signal-warning)",
        borderRadius: "var(--radius-xl)",
        padding: "18px 20px",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-md)",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: "var(--text-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Reforzar {action.short}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
          Tu dominio mas flojo: {action.accuracy}% con {action.total} intentos.
        </div>
      </div>
      <button
        onClick={onRun}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "var(--radius-md)",
          background: "var(--gradient-danger)",
          color: "white",
          fontSize: 13,
          fontWeight: 800,
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
        }}
      >
        Practicar
      </button>
    </div>
  );
}

/** Accuracy per exam domain, dimmed until a domain has enough attempts. */
function DomainProgress({ domains, certShort }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 11,
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 10,
          fontFamily: "var(--font-mono)",
        }}
      >
        Dominios {certShort}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {domains.map((domain) => {
          const pct = domain.accuracy;
          const lowData = domain.total < 10;
          const barColor = lowData
            ? "var(--text-muted)"
            : pct >= 70
              ? "var(--signal-correct)"
              : pct >= 50
                ? "var(--signal-warning)"
                : "var(--signal-wrong)";
          return (
            <div
              key={domain.id}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr auto",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={domain.name}
              >
                {domain.short}
              </div>
              <div
                style={{
                  height: 8,
                  background: "var(--surface-line)",
                  borderRadius: "var(--radius-pill)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${lowData ? 0 : pct}%`,
                    background: barColor,
                    borderRadius: "var(--radius-pill)",
                    transition: "width 0.3s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 110,
                  justifyContent: "flex-end",
                }}
              >
                {lowData ? (
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    —
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: barColor,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {pct}%
                  </span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text-tertiary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  ({domain.total})
                </span>
                {lowData && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--surface-panel-muted)",
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    pocos datos
                  </span>
                )}
                {!lowData && pct < 70 && (
                  <span style={{ fontSize: 10, color: "var(--signal-warning)" }}>⚠</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** The whole track at a glance, one square per block. */
function BlockGrid({ blocks, onPick }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(62px, 1fr))",
        gap: 6,
      }}
    >
      {blocks.list.map((block) => {
        const blockProgress = blocks.getRecord(block);
        const tone = getPercentTone(blockProgress?.lastPercent);
        const isActive = blocks.activeIndex === block.blockIndex;
        const mastered = isBlockMastered(blockProgress);
        const rounds = blockProgress?.rounds?.length || 0;
        return (
          <button
            key={block.blockIndex}
            onClick={() => onPick(block)}
            title={`Bloque ${block.blockIndex + 1}${rounds ? ` · ${rounds} vuelta${rounds > 1 ? "s" : ""}` : " · sin empezar"}${mastered ? " · dominado" : ""}`}
            style={{
              padding: "8px 4px",
              borderRadius: "var(--radius-sm)",
              border: `1px solid ${isActive ? "var(--signal-info)" : mastered ? "var(--primary-medium)" : "var(--surface-line)"}`,
              background: isActive
                ? "var(--info-soft)"
                : mastered
                  ? "var(--primary-soft)"
                  : "var(--surface-panel-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>
              {block.blockIndex + 1}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                marginTop: 2,
                color: blockProgress ? tone.text : "var(--text-muted)",
              }}
            >
              {blockProgress ? `${blockProgress.lastPercent}%` : "—"}
            </div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 1 }}>
              {rounds ? `v${rounds}` : "—"}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Daily streak and the daily challenge. */
function DailyCards({ daily, onStartDaily }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "var(--space-md)",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--surface-line)",
          borderRadius: "var(--radius-xl)",
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            Racha diaria
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 17,
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
            }}
          >
            <span style={{ color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>
              {daily.current}
            </span>{" "}
            {daily.current === 1 ? "día" : "días"}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            Récord
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 17,
              fontWeight: 800,
              color: "var(--accent-300)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {daily.best}
          </div>
        </div>
      </div>

      <div
        style={{
          background: daily.done ? "var(--correct-soft)" : "var(--accent-soft)",
          border: `1px solid ${daily.done ? "var(--correct-soft)" : "var(--accent-medium)"}`,
          borderRadius: "var(--radius-xl)",
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-md)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: daily.done ? "var(--signal-correct)" : "var(--accent-300)",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            Reto diario
          </div>
          <div
            style={{ marginTop: 6, fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}
          >
            {daily.done ? "Completado" : `${daily.questionCount} preguntas · +${daily.bonusXp} XP`}
          </div>
        </div>
        {!daily.done && (
          <button
            onClick={onStartDaily}
            style={{
              padding: "10px 14px",
              border: "none",
              borderRadius: "var(--radius-md)",
              background: "var(--gradient-mock)",
              color: "white",
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            Iniciar reto
          </button>
        )}
      </div>
    </div>
  );
}

export default function HomeView({
  certShort,
  summary,
  nextAction,
  onRunNextAction,
  domainStats,
  shortcuts,
  onQuickPractice,
  onReviewWrong,
  onNavigate,
  blocks,
  onPickBlock,
  daily,
  onStartDaily,
}) {
  return (
    <>
      <SummaryCards {...summary} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 18,
          marginBottom: 18,
          alignItems: "start",
        }}
      >
        <div>
          <NextAction action={nextAction} onRun={onRunNextAction} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 10,
            }}
          >
            <button
              onClick={onQuickPractice}
              disabled={!shortcuts.practice.enabled}
              title={shortcuts.practice.title}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--surface-line)",
                background: "var(--gradient-panel)",
                color: "var(--text-primary)",
                cursor: shortcuts.practice.enabled ? "pointer" : "not-allowed",
                opacity: shortcuts.practice.enabled ? 1 : 0.45,
                fontFamily: "var(--font-body)",
              }}
            >
              <div style={{ fontSize: 17 }} aria-hidden="true">
                ⚡
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "var(--font-heading)",
                }}
              >
                Práctica rápida
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  marginTop: 3,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {shortcuts.practice.count} preguntas · {shortcuts.practice.sourceLabel}
              </div>
            </button>

            <button
              onClick={onReviewWrong}
              disabled={shortcuts.wrong.count === 0}
              title={shortcuts.wrong.title}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--surface-line)",
                background: "var(--gradient-panel)",
                color: "var(--text-primary)",
                cursor: shortcuts.wrong.count > 0 ? "pointer" : "not-allowed",
                opacity: shortcuts.wrong.count > 0 ? 1 : 0.45,
                fontFamily: "var(--font-body)",
              }}
            >
              <div style={{ fontSize: 17 }} aria-hidden="true">
                ↺
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginTop: 8,
                  fontFamily: "var(--font-heading)",
                }}
              >
                Repasar fallos
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: shortcuts.wrong.count > 0 ? "var(--signal-wrong)" : "var(--text-tertiary)",
                  marginTop: 3,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {shortcuts.wrong.count > 0 ? `${shortcuts.wrong.count} pendientes` : "Sin fallos"}
              </div>
            </button>

            <button
              onClick={() => onNavigate("mock")}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--accent-medium)",
                background: "var(--gradient-panel)",
                color: "var(--text-primary)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              <div style={{ fontSize: 17 }} aria-hidden="true">
                ◷
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  marginTop: 8,
                  color: "var(--accent-300)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Simulacro
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  marginTop: 3,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {shortcuts.mock.questionCount} preguntas ·{" "}
                {Math.round(shortcuts.mock.durationSec / 60)} min
              </div>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1px solid var(--surface-line)",
            }}
          >
            <button
              onClick={() => onNavigate("practice")}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--text-tertiary)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                padding: 0,
              }}
            >
              Sesión a medida →
            </button>
            <button
              onClick={() => onNavigate("progress")}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--text-tertiary)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                padding: 0,
              }}
            >
              Inventario y logros →
            </button>
          </div>
        </div>

        <div>
          <DomainProgress domains={domainStats} certShort={certShort} />

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Bloques de estudio
              </div>
              <button
                onClick={() => onNavigate("blocks")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--primary-400)",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  padding: 0,
                }}
              >
                Ver todos →
              </button>
            </div>
            <BlockGrid blocks={blocks} onPick={onPickBlock} />
          </div>
        </div>
      </div>

      <DailyCards daily={daily} onStartDaily={onStartDaily} />
    </>
  );
}
