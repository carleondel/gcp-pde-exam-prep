import {
  BossBattle,
  Confetti,
  MysteryChest,
  ScratchCard,
  SpinWheel,
} from "../components/rewards/index.js";

/**
 * The reward layer that floats over the quiz: confetti, the three prize
 * screens, the boss battle and the XP that pops up after one of them pays
 * out.
 *
 * Each overlay is either open or it is not, and closing is one action with
 * the reason attached — the caller decides what closing a boss has to tidy
 * up that closing a wheel does not.
 *
 * The achievement popup is deliberately not here: it also shows over the
 * menu, so it stays where both screens can reach it.
 */
export default function RewardOverlays({
  confetti,
  wheel,
  scratch,
  chest,
  boss,
  xpPop,
  onWheelComplete,
  onScratchComplete,
  onChestComplete,
  onBossComplete,
  onClose,
}) {
  return (
    <>
      <Confetti active={confetti} />

      {wheel && <SpinWheel onComplete={onWheelComplete} onClose={() => onClose("wheel")} />}

      {scratch && <ScratchCard onComplete={onScratchComplete} onClose={() => onClose("scratch")} />}

      {chest && <MysteryChest onComplete={onChestComplete} onClose={() => onClose("chest")} />}

      {boss && (
        <BossBattle
          questions={boss.questions}
          dragon={boss.dragon}
          onComplete={onBossComplete}
          onClose={() => onClose("boss")}
        />
      )}

      {xpPop && (
        <div
          key={xpPop.key}
          style={{
            position: "fixed",
            left: "50%",
            top: "34%",
            transform: "translate(-50%,-50%)",
            fontSize: 30,
            fontWeight: 900,
            color: "var(--accent-300)",
            zIndex: 500,
            pointerEvents: "none",
            animation: "floatUp 1.3s ease-out forwards",
            textShadow: "0 2px 12px rgba(212,147,10,0.4)",
            fontFamily: "var(--font-mono)",
          }}
        >
          +{xpPop.amount} XP
        </div>
      )}
    </>
  );
}
