import { useCallback, useEffect, useState } from "react";

import { ACHIEVEMENTS, applyDiminishing } from "../data/gamification.js";

const ACHIEVEMENT_BONUS_XP = 75;

/**
 * Owns the saved progress: XP, stats, achievements, bookmarks and history.
 *
 * Storage is injected rather than imported so the hook stays independent of
 * which cert is active — the caller passes the functions from
 * createStorage(certId), which is what keeps each cert's progress separate.
 *
 * Loading is deliberately not automatic. The caller hydrates inside the
 * effect that also restores an interrupted mock or block session, so the
 * whole restore lands in one render rather than in two, and the order those
 * screens depend on is preserved.
 *
 * Nothing is written back until hydration has happened. Without that guard
 * the save effect would fire on the first render and overwrite real stored
 * progress with the empty initial state — losing everything on load.
 */
export function useProgress({ emptyProgress, loadProgress, saveProgress, getAchievementSnapshot }) {
  const [progress, setProgress] = useState(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  /**
   * Awards every achievement whose condition now holds, iterating to a fixed
   * point.
   *
   * A single pass would judge every condition against the state as it
   * arrived. That works while achievements depend only on stats, but breaks
   * as soon as one depends on another being unlocked — the platinum does.
   * The achievement closing the collection and the platinum would both be
   * measured against the same prior state, leaving the platinum to fire on
   * whatever unrelated update happened next. Nothing re-locks, so the loop
   * settles in three passes.
   */
  const applyUnlockedAchievements = useCallback(
    (candidate) => {
      let next = candidate;
      let unlockedCount = 0;

      for (;;) {
        const snapshot = getAchievementSnapshot(next);
        const unlocked = ACHIEVEMENTS.filter(
          (achievement) =>
            !next.achievements.includes(achievement.id) && achievement.cond(snapshot),
        ).map((achievement) => achievement.id);
        if (!unlocked.length) break;

        next = { ...next, achievements: [...next.achievements, ...unlocked] };
        unlockedCount += unlocked.length;
      }

      if (!unlockedCount) return candidate;
      const bonusXp = applyDiminishing(unlockedCount * ACHIEVEMENT_BONUS_XP, candidate.xp);
      return { ...next, xp: candidate.xp + bonusXp };
    },
    [getAchievementSnapshot],
  );

  /**
   * The only way callers should change progress. Takes a functional updater
   * so it always reads the latest state — a stale closure here would silently
   * roll back whatever was answered in between — and runs achievement
   * unlocking over the result.
   */
  const updateProgress = useCallback(
    (updater) => {
      setProgress((prev) => applyUnlockedAchievements(updater(prev)));
    },
    [applyUnlockedAchievements],
  );

  /**
   * Wipes progress back to empty. Separate from updateProgress because it is
   * the one legitimate case for replacing state wholesale rather than
   * deriving it — and keeping the raw setter private means no ordinary update
   * can skip achievement evaluation by accident.
   */
  const resetProgress = useCallback(() => {
    setProgress(emptyProgress);
  }, [emptyProgress]);

  /** Loads stored progress, opens the gate on saving, and returns what it read. */
  const hydrateProgress = useCallback(() => {
    const stored = loadProgress();
    setProgress(stored);
    setHydrated(true);
    return stored;
  }, [loadProgress]);

  useEffect(() => {
    if (!hydrated) return;
    saveProgress(progress);
  }, [hydrated, progress, saveProgress]);

  return { progress, updateProgress, resetProgress, hydrateProgress, hydrated };
}
