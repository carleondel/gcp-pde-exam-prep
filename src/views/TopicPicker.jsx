function heatmapColor(accuracy) {
  if (accuracy === null) return "var(--text-muted)";
  if (accuracy >= 90) return "var(--highlight)";
  if (accuracy >= 70) return "var(--signal-correct)";
  if (accuracy >= 50) return "var(--signal-warning)";
  return "var(--signal-wrong)";
}

function heatmapBg(accuracy) {
  if (accuracy === null) return "var(--surface-panel-muted)";
  if (accuracy >= 90) return "rgba(143, 255, 106, 0.12)";
  if (accuracy >= 70) return "var(--correct-soft)";
  if (accuracy >= 50) return "var(--warning-soft)";
  return "var(--wrong-soft)";
}

/**
 * Picks which topics a custom practice session draws from, laid out by exam
 * domain and tinted by how well each one is going.
 *
 * A domain's topics are canonical names, and each stands for one or more of
 * the bank's raw topics. Working out that mapping is not this component's
 * job: the caller hands it `groups`, already resolved, and gets the same
 * entry back when one is clicked.
 */
export default function TopicPicker({
  groups,
  selectedTopics,
  allSelected,
  onToggleAll,
  onToggle,
  onIsolate,
}) {
  return (
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
          Temas por dominio
        </div>
        <button
          onClick={onToggleAll}
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
          {allSelected ? "Deseleccionar todo" : "Seleccionar todo"}
        </button>
      </div>

      {groups.map((group) => (
        <div key={group.domainId} style={{ marginBottom: 10 }}>
          <div
            style={{
              fontSize: 10,
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 6,
              fontFamily: "var(--font-mono)",
            }}
          >
            {group.domainShort}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {group.topics.map((entry) => {
              const picked = entry.rawTopics.every((topic) => selectedTopics.has(topic));
              const tooltipText =
                entry.total >= 10
                  ? `${entry.correct}/${entry.total} correctas`
                  : `${entry.total} intentos`;
              return (
                <button
                  key={entry.topic}
                  title={`${entry.topic}: ${tooltipText} · ${entry.questionCount} preguntas`}
                  onClick={() => onToggle(entry)}
                  onDoubleClick={() => onIsolate(entry)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "var(--radius-pill)",
                    border: picked
                      ? `1px solid ${heatmapColor(entry.accuracy)}`
                      : "1px solid var(--surface-line)",
                    background: picked ? heatmapBg(entry.accuracy) : "var(--surface-panel-muted)",
                    color: picked ? heatmapColor(entry.accuracy) : "var(--text-secondary)",
                    fontSize: 11,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {entry.topic}{" "}
                  <span style={{ opacity: 0.65 }}>
                    {entry.accuracy !== null ? `${entry.accuracy}%` : "—"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>
        Doble click para aislar un tema. Tooltip para detalle.
      </div>
    </div>
  );
}
