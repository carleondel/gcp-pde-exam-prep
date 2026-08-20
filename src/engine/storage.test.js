import { beforeEach, describe, expect, it } from "vitest";

import {
  completeDailyChallenge,
  createStorage,
  EMPTY_PROGRESS,
  getTodayString,
  isDailyChallengeCompleted,
  updateDailyStreak,
} from "./storage.js";

/**
 * Minimal localStorage stand-in. The real one is a browser global; these
 * tests run in Node, so storage.js gets one that behaves the same way,
 * including the part that matters most — values come back as strings.
 */
function installStorage() {
  const store = new Map();
  const api = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    key: (i) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  };
  globalThis.window = { localStorage: api };
  return { store, api };
}

describe("createStorage", () => {
  let store;

  beforeEach(() => {
    ({ store } = installStorage());
  });

  it("survives a round trip with the values intact", () => {
    const storage = createStorage("gcp-pca");
    const progress = {
      ...EMPTY_PROGRESS,
      xp: 4200,
      achievements: ["first_blood", "platinum"],
      bookmarks: [12, 34],
      wrongQuestionIds: [7],
      stats: { ...EMPTY_PROGRESS.stats, totalCorrect: 91, maxStreak: 13 },
    };

    storage.saveProgress(progress);
    const loaded = createStorage("gcp-pca").loadProgress();

    expect(loaded.xp).toBe(4200);
    expect(loaded.achievements).toEqual(["first_blood", "platinum"]);
    expect(loaded.bookmarks).toEqual([12, 34]);
    expect(loaded.wrongQuestionIds).toEqual([7]);
    expect(loaded.stats.totalCorrect).toBe(91);
    expect(loaded.stats.maxStreak).toBe(13);
  });

  it("keeps each cert's progress apart", () => {
    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 100 });
    createStorage("gcp-pca").saveProgress({ ...EMPTY_PROGRESS, xp: 999 });

    expect(createStorage("gcp-pde").loadProgress().xp).toBe(100);
    expect(createStorage("gcp-pca").loadProgress().xp).toBe(999);
  });

  it("namespaces its keys by cert id", () => {
    createStorage("gcp-pca").saveProgress(EMPTY_PROGRESS);
    expect([...store.keys()].every((key) => key.startsWith("gcp-pca."))).toBe(true);
  });

  it("returns empty progress when nothing has been stored yet", () => {
    expect(createStorage("brand-new").loadProgress()).toEqual(EMPTY_PROGRESS);
  });

  it("falls back to empty progress instead of throwing on corrupted data", () => {
    globalThis.window.localStorage.setItem("gcp-pca.progress.v2", "{not json");
    expect(() => createStorage("gcp-pca").loadProgress()).not.toThrow();
    expect(createStorage("gcp-pca").loadProgress()).toEqual(EMPTY_PROGRESS);
  });

  it("fills in stats added after the save was written", () => {
    // A save from an older build: no stats object at all.
    globalThis.window.localStorage.setItem(
      "gcp-pca.progress.v2",
      JSON.stringify({ xp: 50, achievements: ["first_blood"] }),
    );

    const loaded = createStorage("gcp-pca").loadProgress();

    expect(loaded.xp).toBe(50);
    expect(loaded.achievements).toEqual(["first_blood"]);
    // Defaults come from EMPTY_PROGRESS, which is why a new stat needs no
    // migration — this is the guarantee the achievement work relied on.
    expect(loaded.stats).toMatchObject(EMPTY_PROGRESS.stats);
    expect(loaded.inventory).toMatchObject(EMPTY_PROGRESS.inventory);
  });

  it("keeps stored stats while adding the missing ones", () => {
    globalThis.window.localStorage.setItem(
      "gcp-pca.progress.v2",
      JSON.stringify({ ...EMPTY_PROGRESS, stats: { totalCorrect: 7 } }),
    );

    const loaded = createStorage("gcp-pca").loadProgress();

    expect(loaded.stats.totalCorrect).toBe(7);
    expect(loaded.stats.bossWins).toBe(0);
  });

  it("repairs list fields that were stored as something else", () => {
    globalThis.window.localStorage.setItem(
      "gcp-pca.progress.v2",
      JSON.stringify({ ...EMPTY_PROGRESS, achievements: "nonsense", bookmarks: null }),
    );

    const loaded = createStorage("gcp-pca").loadProgress();

    expect(Array.isArray(loaded.achievements)).toBe(true);
    expect(Array.isArray(loaded.bookmarks)).toBe(true);
  });

  it("round-trips practice preferences", () => {
    const storage = createStorage("gcp-pca");
    storage.savePracticePrefs({ source: "wrong", order: "random", limit: 25 });
    expect(createStorage("gcp-pca").loadPracticePrefs()).toMatchObject({
      source: "wrong",
      order: "random",
      limit: 25,
    });
  });

  it("clears an active mock without touching the saved progress", () => {
    const storage = createStorage("gcp-pca");
    storage.saveProgress({ ...EMPTY_PROGRESS, xp: 321 });
    storage.saveActiveMock({ questionIds: [1, 2, 3] });

    expect(storage.loadActiveMock()).toMatchObject({ questionIds: [1, 2, 3] });

    storage.clearActiveMock();

    expect(storage.loadActiveMock()).toBeNull();
    expect(storage.loadProgress().xp).toBe(321);
  });
});

describe("daily streak", () => {
  beforeEach(() => {
    installStorage();
  });

  it("starts the streak on the first day of activity", () => {
    expect(updateDailyStreak(EMPTY_PROGRESS).dailyStreak.current).toBe(1);
  });

  it("does not count the same day twice", () => {
    const once = updateDailyStreak(EMPTY_PROGRESS);
    expect(updateDailyStreak(once).dailyStreak.current).toBe(1);
  });

  it("extends the streak when the last activity was yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const iso = yesterday.toISOString().slice(0, 10);
    const progress = {
      ...EMPTY_PROGRESS,
      dailyStreak: { current: 4, best: 4, lastDate: iso },
    };
    expect(updateDailyStreak(progress).dailyStreak.current).toBe(5);
  });

  it("keeps the record when the current streak is broken", () => {
    const progress = {
      ...EMPTY_PROGRESS,
      dailyStreak: { current: 9, best: 9, lastDate: "2020-01-01" },
    };
    const updated = updateDailyStreak(progress);
    expect(updated.dailyStreak.current).toBe(1);
    expect(updated.dailyStreak.best).toBe(9);
  });
});

describe("daily challenge", () => {
  beforeEach(() => {
    installStorage();
  });

  it("is not complete before it is done", () => {
    expect(isDailyChallengeCompleted(EMPTY_PROGRESS)).toBe(false);
  });

  it("is complete once finished today", () => {
    expect(isDailyChallengeCompleted(completeDailyChallenge(EMPTY_PROGRESS))).toBe(true);
  });

  it("does not carry yesterday's completion into today", () => {
    const stale = {
      ...EMPTY_PROGRESS,
      dailyChallenge: { lastCompletedDate: "2020-01-01", totalCompleted: 3 },
    };
    expect(isDailyChallengeCompleted(stale)).toBe(false);
  });

  it("stamps today's date and counts the completion", () => {
    const done = completeDailyChallenge(EMPTY_PROGRESS);
    expect(done.dailyChallenge.lastCompletedDate).toBe(getTodayString());
    expect(done.dailyChallenge.totalCompleted).toBe(1);
  });

  it("keeps counting across days", () => {
    const done = completeDailyChallenge({
      ...EMPTY_PROGRESS,
      dailyChallenge: { lastCompletedDate: "2020-01-01", totalCompleted: 3 },
    });
    expect(done.dailyChallenge.totalCompleted).toBe(4);
  });
});
