import { ACHIEVEMENTS, REGULAR_ACHIEVEMENT_IDS } from "../data/gamification.js";
import AchievementBadge from "../components/AchievementBadge.jsx";

/**
 * The "Progreso" tab of the menu: what the player is carrying and what they
 * have unlocked.
 *
 * The two counts below are presentation, not state — one decides whether to
 * show the empty line, the other fills the platinum badge's counter — so they
 * are worked out here rather than passed in.
 */
export default function ProgressView({ inventory, unlockedAchievements }) {
  const totalPowerups =
    inventory.shields +
    inventory.fiftyFifty +
    inventory.hints +
    inventory.skips +
    inventory.doubleXP +
    inventory.scratchCards +
    inventory.chestKeys +
    inventory.bossKeys +
    inventory.wheelSpins;
  const regularUnlockedCount = REGULAR_ACHIEVEMENT_IDS.filter((id) =>
    unlockedAchievements.has(id),
  ).length;

  return (
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
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 10,
          fontFamily: "var(--font-mono)",
        }}
      >
        Inventario y logros
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {inventory.shields > 0 && (
          <span
            style={{
              background: "var(--correct-soft)",
              color: "var(--signal-correct)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            🛡️ {inventory.shields}
          </span>
        )}
        {inventory.fiftyFifty > 0 && (
          <span
            style={{
              background: "var(--info-soft)",
              color: "var(--signal-info)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            ✂️ {inventory.fiftyFifty}
          </span>
        )}
        {inventory.hints > 0 && (
          <span
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-300)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            💡 {inventory.hints}
          </span>
        )}
        {inventory.skips > 0 && (
          <span
            style={{
              background: "var(--primary-soft)",
              color: "var(--primary-400)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            ⏭️ {inventory.skips}
          </span>
        )}
        {inventory.wheelSpins > 0 && (
          <span
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-300)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            🎰 {inventory.wheelSpins}
          </span>
        )}
        {inventory.scratchCards > 0 && (
          <span
            style={{
              background: "var(--primary-soft)",
              color: "var(--primary-400)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            🎫 {inventory.scratchCards}
          </span>
        )}
        {inventory.chestKeys > 0 && (
          <span
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-300)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            📦 {inventory.chestKeys}
          </span>
        )}
        {inventory.bossKeys > 0 && (
          <span
            style={{
              background: "var(--wrong-soft)",
              color: "var(--signal-wrong)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            🗝️ {inventory.bossKeys}
          </span>
        )}
        {!totalPowerups && (
          <span style={{ color: "var(--text-tertiary)", fontSize: 13 }}>Sin items acumulados.</span>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={unlockedAchievements.has(achievement.id)}
            progressLabel={
              achievement.platinum
                ? `${regularUnlockedCount} / ${REGULAR_ACHIEVEMENT_IDS.length}`
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}
