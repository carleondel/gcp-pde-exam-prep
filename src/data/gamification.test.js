import { describe, expect, it } from "vitest";

import { ACHIEVEMENTS, DOMAIN_MASTERY_PERCENT, REGULAR_ACHIEVEMENT_IDS } from "./gamification.js";

/** Every stat maxed, so only the condition under test decides the outcome. */
const MAXED = {
  xp: 999999,
  correct: 999,
  maxStreak: 99,
  fastCorrect: 99,
  hardCorrect: 99,
  jackpot: true,
  topicsOk: 99,
  chestsOpened: 99,
  scratchUsed: 99,
  powerupsUsed: 99,
  bossWins: 99,
  highestTierDefeated: 9,
  totalBossDmgDealt: 99999,
  flawlessBossWin: true,
  allDomainsMastered: true,
  unlocked: [],
};

const snap = (overrides = {}) => ({ ...MAXED, ...overrides });
const byId = (id) => ACHIEVEMENTS.find((achievement) => achievement.id === id);

/** Mirrors applyUnlockedAchievements in App.jsx, including the fixed point. */
function unlockAll(start = []) {
  let achievements = [...start];
  let passes = 0;

  for (;;) {
    passes += 1;
    if (passes > 10) throw new Error("unlocking did not converge");
    const gained = ACHIEVEMENTS.filter(
      (achievement) =>
        !achievements.includes(achievement.id) &&
        achievement.cond(snap({ unlocked: achievements })),
    ).map((achievement) => achievement.id);
    if (!gained.length) break;
    achievements = [...achievements, ...gained];
  }

  return { achievements, passes };
}

describe("achievement catalogue", () => {
  it("has no duplicate ids", () => {
    const ids = ACHIEVEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every achievement an id, name, description, icon and condition", () => {
    for (const achievement of ACHIEVEMENTS) {
      expect(achievement.id, `${achievement.id} id`).toBeTruthy();
      expect(achievement.name, `${achievement.id} name`).toBeTruthy();
      expect(achievement.desc, `${achievement.id} desc`).toBeTruthy();
      expect(achievement.icon, `${achievement.id} icon`).toBeTruthy();
      expect(typeof achievement.cond, `${achievement.id} cond`).toBe("function");
    }
  });

  it("names everything in English, as the catalogue has always done", () => {
    const spanish = ACHIEVEMENTS.filter((a) => /[áéíóúñ¡¿]/i.test(a.name));
    expect(spanish.map((a) => a.name)).toEqual([]);
  });

  it("counts every achievement except the platinum as a regular one", () => {
    expect(REGULAR_ACHIEVEMENT_IDS).toHaveLength(ACHIEVEMENTS.length - 1);
    expect(REGULAR_ACHIEVEMENT_IDS).not.toContain("platinum");
  });

  it("has exactly one platinum", () => {
    expect(ACHIEVEMENTS.filter((a) => a.platinum)).toHaveLength(1);
  });
});

describe("Full Spectrum (secret)", () => {
  const achievement = byId("domain_master");

  it("stays hidden until earned", () => {
    expect(achievement.secret).toBe(true);
  });

  it("unlocks only when every domain is above the threshold", () => {
    expect(achievement.cond(snap({ allDomainsMastered: true }))).toBe(true);
    expect(achievement.cond(snap({ allDomainsMastered: false }))).toBe(false);
  });

  it("states the threshold it actually measures against", () => {
    expect(achievement.desc).toContain(String(DOMAIN_MASTERY_PERCENT));
  });

  it("counts towards the platinum", () => {
    expect(REGULAR_ACHIEVEMENT_IDS).toContain("domain_master");
  });
});

describe("Platinum", () => {
  const achievement = byId("platinum");

  it("is not secret — it should be visible as a goal", () => {
    expect(achievement.secret).toBeUndefined();
  });

  it("needs the whole collection", () => {
    expect(achievement.cond(snap({ unlocked: REGULAR_ACHIEVEMENT_IDS }))).toBe(true);
  });

  it("does not unlock while a single achievement is missing", () => {
    for (const missing of REGULAR_ACHIEVEMENT_IDS) {
      const unlocked = REGULAR_ACHIEVEMENT_IDS.filter((id) => id !== missing);
      expect(achievement.cond(snap({ unlocked })), `missing ${missing}`).toBe(false);
    }
  });

  it("does not unlock from an empty collection", () => {
    expect(achievement.cond(snap({ unlocked: [] }))).toBe(false);
  });
});

describe("unlocking to a fixed point", () => {
  it("awards the platinum in the same update that closes the collection", () => {
    // The point of the loop: a single pass would judge the platinum against
    // the state before the last regular achievement was recorded, leaving it
    // to fire on some unrelated later update.
    const { achievements } = unlockAll();
    expect(achievements).toContain("platinum");
    expect(achievements).toHaveLength(ACHIEVEMENTS.length);
  });

  it("settles quickly — nothing re-locks", () => {
    expect(unlockAll().passes).toBeLessThanOrEqual(3);
  });

  it("awards nothing twice when run again over a full collection", () => {
    const { achievements } = unlockAll();
    expect(unlockAll(achievements).achievements).toHaveLength(achievements.length);
  });

  it("holds back the platinum while one regular achievement is unmet", () => {
    const notThere = ACHIEVEMENTS.filter(
      (a) => !a.platinum && !a.cond(snap({ correct: 0, unlocked: [] })),
    );
    expect(notThere.length).toBeGreaterThan(0);

    // Nobody has answered anything: plenty is still locked, so no platinum.
    const gained = ACHIEVEMENTS.filter((a) => a.cond({ ...MAXED, correct: 0, unlocked: [] })).map(
      (a) => a.id,
    );
    expect(gained).not.toContain("platinum");
  });
});
