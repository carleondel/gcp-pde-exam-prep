/**
 * The mock-exam section of the menu. It renders the fixed exam shape,
 * preference toggle and recent history; AppContent keeps responsibility for
 * creating, resuming and persisting the actual attempt.
 */
function MockSparkline({ history }) {
  if (!history.length) return null;

  const lastFive = history.slice(0, 5);
  const average = Math.round(
    lastFive.reduce((sum, entry) => sum + entry.percent, 0) / lastFive.length,
  );
  const recent = lastFive.slice(0, Math.min(3, lastFive.length));
  const older = lastFive.slice(Math.min(3, lastFive.length));
  const recentAverage = recent.length
    ? recent.reduce((sum, entry) => sum + entry.percent, 0) / recent.length
    : 0;
  const olderAverage = older.length
    ? older.reduce((sum, entry) => sum + entry.percent, 0) / older.length
    : recentAverage;
  const trend =
    recentAverage > olderAverage + 2 ? "↑" : recentAverage < olderAverage - 2 ? "↓" : "→";
  const trendColor =
    trend === "↑"
      ? "var(--signal-correct)"
      : trend === "↓"
        ? "var(--signal-wrong)"
        : "var(--text-secondary)";

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 10 }}>
      {lastFive
        .slice()
        .reverse()
        .map((entry, index) => (
          <div
            key={`${entry.date}-${index}`}
            title={`${entry.percent}% — ${new Date(entry.date).toLocaleDateString("es-ES")}`}
            style={{
              width: 16,
              height: Math.max(4, (entry.percent / 100) * 36),
              borderRadius: 3,
              background: entry.passed ? "var(--signal-correct)" : "var(--signal-wrong)",
              opacity: 0.7 + (index / lastFive.length) * 0.3,
            }}
          />
        ))}
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: trendColor,
          fontFamily: "var(--font-mono)",
          marginLeft: 6,
        }}
      >
        {average}% {trend}
      </span>
    </div>
  );
}

export default function MockView({
  questionCount,
  durationSec,
  passPercent,
  certShort,
  distribution,
  preferRecent,
  onPreferRecentChange,
  onStart,
  savedSession,
  onContinue,
  history,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          background: "var(--gradient-panel)",
          border: "1px solid var(--accent-medium)",
          borderRadius: "var(--radius-2xl)",
          padding: 24,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "var(--accent-300)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          Simulacro
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            margin: "6px 0 8px",
            fontFamily: "var(--font-heading)",
          }}
        >
          {questionCount} preguntas · {Math.round(durationSec / 60)} min
        </div>
        <p
          style={{
            margin: "0 0 12px",
            color: "var(--text-secondary)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Sin ayudas. Sin recompensas. {passPercent}% para aprobar.
        </p>
        <div
          style={{
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--surface-panel-muted)",
            border: "1px solid var(--surface-line)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 6,
              fontFamily: "var(--font-mono)",
            }}
          >
            Distribución oficial {certShort}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            {distribution.map((entry) => (
              <span
                key={entry.id}
                style={{
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--primary-soft)",
                  color: "var(--primary-400)",
                  fontWeight: 700,
                }}
              >
                {entry.short.replace(/^D\d /, `D${entry.id} `)} {entry.target}
              </span>
            ))}
          </div>
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 14,
            padding: "10px 12px",
            borderRadius: "var(--radius-md)",
            background: preferRecent ? "var(--accent-soft)" : "var(--surface-panel-muted)",
            border: `1px solid ${preferRecent ? "var(--accent-medium)" : "var(--surface-line)"}`,
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
        >
          <input
            type="checkbox"
            checked={preferRecent}
            onChange={(event) => onPreferRecentChange(event.target.checked)}
            style={{ marginTop: 2, accentColor: "var(--accent-300)", cursor: "pointer" }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: preferRecent ? "var(--accent-300)" : "var(--text-primary)",
              }}
            >
              Priorizar preguntas más recientes
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                marginTop: 2,
              }}
            >
              Mismas proporciones, pero seleccionando los índices más altos en cada dominio.
            </div>
          </div>
        </label>
        <button
          onClick={onStart}
          style={{
            width: "100%",
            padding: "16px 18px",
            border: "none",
            borderRadius: "var(--radius-lg)",
            background: "var(--gradient-mock)",
            color: "white",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          Iniciar simulacro
        </button>
      </div>

      {savedSession && (
        <button
          onClick={onContinue}
          style={{
            padding: "16px 18px",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--correct-soft)",
            background: "var(--correct-soft)",
            color: "var(--signal-correct)",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          Continuar simulacro activo
        </button>
      )}

      {history.length > 0 && (
        <div
          style={{
            background: "var(--gradient-panel)",
            border: "1px solid var(--surface-line)",
            borderRadius: "var(--radius-2xl)",
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--accent-300)",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 10,
              fontFamily: "var(--font-mono)",
            }}
          >
            Historial
          </div>
          {history.slice(0, 5).map((entry, index) => (
            <div
              key={`${entry.date}-${index}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom:
                  index < Math.min(history.length, 5) - 1
                    ? "1px solid var(--surface-line)"
                    : "none",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {new Date(entry.date).toLocaleDateString("es-ES")}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: entry.passed ? "var(--signal-correct)" : "var(--signal-wrong)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {entry.percent}% {entry.passed ? "Apto" : "No apto"}
              </span>
            </div>
          ))}
          <MockSparkline history={history} />
        </div>
      )}
    </div>
  );
}
