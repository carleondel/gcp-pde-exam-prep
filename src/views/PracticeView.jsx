import { PRACTICE_PRESETS, PRACTICE_SOURCE_META } from "../ui/practice-prefs.js";

/**
 * The "Sesión a medida" tab: where a practice session is configured before it
 * is launched — which pool it draws from, in what order, and how many.
 *
 * The topic picker arrives as a node rather than as its own six props. It is
 * a separate concern over a different shape of data, and inlining its API
 * here would have doubled this component's surface for nothing.
 *
 * Nothing here decides anything. Each control reports an intent and the
 * caller works out what that means for the settings and for the message shown
 * underneath — picking a count, for instance, also closes the custom input.
 */
export default function PracticeView({
  sourceOptions,
  source,
  summary,
  order,
  limit,
  effectiveLimit,
  maxCount,
  maxPresetLabel,
  showCustomLimit,
  message,
  ctaLabel,
  hasQuestions,
  topicPicker,
  onSelectSource,
  onBackToTopics,
  onSelectOrder,
  onToggleCustomLimit,
  onSelectCount,
  onCustomCountChange,
  onStart,
}) {
  return (
    <div
      style={{
        background: "var(--gradient-panel-strong)",
        border: "1px solid var(--primary-medium)",
        borderRadius: "var(--radius-2xl)",
        padding: 24,
        boxShadow: "var(--shadow-elevated), var(--shadow-glow)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
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
            Practicar
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              marginTop: 4,
              fontFamily: "var(--font-heading)",
            }}
          >
            Sesión a medida
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>
            Control directo de fuente, orden y cantidad.
          </div>
        </div>
        <div
          style={{
            padding: "8px 14px",
            borderRadius: "var(--radius-pill)",
            background: "var(--primary-soft)",
            color: "var(--primary-400)",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
          }}
        >
          Feedback inmediato
        </div>
      </div>
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
          Fuente
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
          {sourceOptions.map((option) => {
            const active = source === option.key;
            return (
              <button
                key={option.key}
                disabled={option.disabled}
                onClick={() => onSelectSource(option.key)}
                style={{
                  padding: "14px 14px",
                  borderRadius: "var(--radius-lg)",
                  border: active
                    ? "1px solid var(--primary-medium)"
                    : "1px solid var(--surface-line)",
                  background: active
                    ? "linear-gradient(180deg, var(--primary-soft), var(--surface-panel-muted))"
                    : "var(--surface-panel-muted)",
                  color: option.disabled ? "var(--text-muted)" : "var(--text-primary)",
                  textAlign: "left",
                  cursor: option.disabled ? "not-allowed" : "pointer",
                  opacity: option.disabled ? 0.6 : 1,
                  transition: "all var(--duration-normal) var(--ease-out)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--space-md)",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)" }}
                  >
                    {PRACTICE_SOURCE_META[option.key].label}
                  </span>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--bg-primary)",
                      color: option.disabled ? "var(--text-tertiary)" : "var(--primary-400)",
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {option.badge}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: option.disabled ? "var(--text-tertiary)" : "var(--text-secondary)",
                    lineHeight: 1.45,
                  }}
                >
                  {option.disabled
                    ? PRACTICE_SOURCE_META[option.key].empty
                    : PRACTICE_SOURCE_META[option.key].helper}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
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
            Orden
          </div>
          <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
            {source === "topics" ? "Configurable" : "Aplicado al bloque cargado"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-sm)" }}>
          {["random", "sequential", "recent-desc"].map((option) => (
            <button
              key={option}
              onClick={() => onSelectOrder(option)}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border:
                  order === option
                    ? "1px solid var(--primary-medium)"
                    : "1px solid var(--surface-line)",
                background: order === option ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                color: order === option ? "var(--primary-400)" : "var(--text-secondary)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              {option === "random"
                ? "Mezclado"
                : option === "sequential"
                  ? "Secuencial"
                  : "Más recientes"}
            </button>
          ))}
        </div>
      </div>

      {source === "topics" && topicPicker}

      {source !== "topics" && (
        <div
          style={{
            marginBottom: 16,
            padding: "14px 16px",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-panel-muted)",
            border: "1px solid var(--surface-line)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "var(--space-md)",
              alignItems: "center",
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
                {summary.title}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                }}
              >
                {summary.subtitle}
              </div>
            </div>
            <button
              onClick={onBackToTopics}
              style={{
                border: "1px solid var(--surface-line)",
                borderRadius: "var(--radius-md)",
                padding: "9px 12px",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Volver a dominio
            </button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
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
            Cantidad
          </div>
          <button
            onClick={onToggleCustomLimit}
            style={{
              border: "none",
              background: "transparent",
              color: "var(--primary-400)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {showCustomLimit ? "Ocultar personalización" : "Personalizar"}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-sm)",
            marginBottom: showCustomLimit ? 10 : 0,
          }}
        >
          {PRACTICE_PRESETS.map((preset) => {
            const disabled = !hasQuestions || preset > maxCount;
            const active = effectiveLimit === preset && !showCustomLimit;
            return (
              <button
                key={preset}
                disabled={disabled}
                onClick={() => onSelectCount(preset)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: active
                    ? "1px solid var(--primary-medium)"
                    : "1px solid var(--surface-line)",
                  background: active ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                  color: disabled
                    ? "var(--text-muted)"
                    : active
                      ? "var(--primary-400)"
                      : "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.55 : 1,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {preset}
              </button>
            );
          })}
          <button
            disabled={!hasQuestions}
            onClick={() => onSelectCount(maxCount)}
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border:
                effectiveLimit === maxCount && !showCustomLimit
                  ? "1px solid var(--primary-medium)"
                  : "1px solid var(--surface-line)",
              background:
                effectiveLimit === maxCount && !showCustomLimit
                  ? "var(--primary-soft)"
                  : "var(--surface-panel-muted)",
              color: hasQuestions
                ? effectiveLimit === maxCount && !showCustomLimit
                  ? "var(--primary-400)"
                  : "var(--text-primary)"
                : "var(--text-muted)",
              fontSize: 12,
              fontWeight: 700,
              cursor: hasQuestions ? "pointer" : "not-allowed",
              opacity: hasQuestions ? 1 : 0.55,
              fontFamily: "var(--font-mono)",
            }}
          >
            {maxPresetLabel}
          </button>
        </div>
        {showCustomLimit && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="number"
              min="1"
              max={Math.max(1, maxCount)}
              value={limit}
              onChange={(event) => onCustomCountChange(event.target.value)}
              style={{
                width: 110,
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--surface-line)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-mono)",
              }}
            />
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              Se ajusta automáticamente al máximo disponible.
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          marginBottom: 18,
          padding: "16px 18px",
          borderRadius: "var(--radius-lg)",
          background: "var(--surface-panel-muted)",
          border: "1px solid var(--surface-line)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            fontFamily: "var(--font-mono)",
          }}
        >
          Resumen
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Fuente</div>
            <div
              style={{
                marginTop: 4,
                fontSize: 15,
                fontWeight: 800,
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {PRACTICE_SOURCE_META[source].label}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Disponibles</div>
            <div
              style={{
                marginTop: 4,
                fontSize: 15,
                fontWeight: 800,
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {maxCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Lanzarás</div>
            <div
              style={{
                marginTop: 4,
                fontSize: 15,
                fontWeight: 800,
                color: "var(--primary-400)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {hasQuestions ? effectiveLimit : 0}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-secondary)" }}>
          {summary.badge} • {summary.subtitle}
        </div>
      </div>

      {message && (
        <div
          style={{
            marginBottom: 14,
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

      {!hasQuestions && (
        <div
          style={{
            marginBottom: 14,
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-panel-muted)",
            border: "1px solid var(--surface-line)",
            color: "var(--text-secondary)",
            fontSize: 12,
            lineHeight: 1.45,
          }}
        >
          {PRACTICE_SOURCE_META[source].empty}
        </div>
      )}

      <button
        onClick={onStart}
        disabled={!hasQuestions}
        style={{
          width: "100%",
          padding: "16px 18px",
          border: "none",
          borderRadius: "var(--radius-lg)",
          background: hasQuestions ? "var(--gradient-practice)" : "var(--text-muted)",
          color: "white",
          fontSize: 15,
          fontWeight: 800,
          cursor: hasQuestions ? "pointer" : "not-allowed",
          fontFamily: "var(--font-mono)",
          boxShadow: hasQuestions ? "var(--shadow-glow)" : "none",
        }}
      >
        {ctaLabel}
      </button>
      <div
        style={{ marginTop: 10, fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}
      >
        Ayudas y progreso activo solo en práctica.
      </div>
    </div>
  );
}
