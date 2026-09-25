import { toLocalDateString } from "./format.js";
import { MOCK_HISTORY_LIMIT } from "./quiz-engine";

export const EMPTY_PROGRESS = {
  xp: 0,
  achievements: [],
  bookmarks: [],
  wrongQuestionIds: [],
  topicHistory: {},
  mockHistory: [],
  stats: {
    totalCorrect: 0,
    hardCorrect: 0,
    fastCorrect: 0,
    maxStreak: 0,
    jackpot: false,
    topicsOk: [],
    chestsOpened: 0,
    scratchUsed: 0,
    powerupsUsed: 0,
    bossWins: 0,
    bossFights: 0,
    bossWinsByDragon: {},
    totalBossDmgDealt: 0,
    totalBossDmgTaken: 0,
    highestTierDefeated: 0,
    flawlessBossWin: false,
  },
  inventory: {
    shields: 0,
    skips: 0,
    fiftyFifty: 0,
    hints: 0,
    doubleXP: 0,
    scratchCards: 0,
    chestKeys: 0,
    bossKeys: 0,
    wheelSpins: 0,
    mult: 1,
    multDur: 0,
  },
  dailyStreak: {
    current: 0,
    lastDate: null,
    best: 0,
  },
  dailyChallenge: {
    lastCompletedDate: null,
    totalCompleted: 0,
  },
  blockStudy: {
    tracks: {},
  },
};

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

let writeListener = null;

/**
 * Registers a callback fired after every write or removal, with the key and
 * the parsed value (null on removal). localStorage stays the synchronous
 * source the hooks read from; the cloud sync mirrors it through this.
 */
export function setStorageWriteListener(listener) {
  writeListener = listener;
}

function writeItem(key, value) {
  if (!hasStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  writeListener?.(key, value);
}

function removeItem(key) {
  if (!hasStorage()) return;
  window.localStorage.removeItem(key);
  writeListener?.(key, null);
}

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function sanitizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function sanitizeObject(value) {
  return value && typeof value === "object" ? value : null;
}

// Settings that belong to the player rather than to a cert. The "app."
// namespace is synced with the account like the per-cert keys.
export const APP_SETTINGS_KEY = "app.settings.v1";
export const DEFAULT_APP_SETTINGS = { focusMode: false };

export function loadAppSettings() {
  if (!hasStorage()) return DEFAULT_APP_SETTINGS;
  const stored = sanitizeObject(safeParse(window.localStorage.getItem(APP_SETTINGS_KEY)));
  return { ...DEFAULT_APP_SETTINGS, ...stored, focusMode: stored?.focusMode === true };
}

export function saveAppSettings(settings) {
  writeItem(APP_SETTINGS_KEY, settings);
}

export function getTodayString() {
  return toLocalDateString();
}

export function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toLocalDateString(d);
}

export function updateDailyStreak(progress) {
  const today = getTodayString();
  const yesterday = getYesterdayString();
  const streak = { ...progress.dailyStreak };

  if (streak.lastDate === today) return progress;

  if (streak.lastDate === yesterday) {
    streak.current += 1;
  } else {
    streak.current = 1;
  }
  streak.lastDate = today;
  streak.best = Math.max(streak.best, streak.current);

  return { ...progress, dailyStreak: streak };
}

export function isDailyChallengeCompleted(progress) {
  return progress.dailyChallenge.lastCompletedDate === getTodayString();
}

export function completeDailyChallenge(progress) {
  return {
    ...progress,
    dailyChallenge: {
      lastCompletedDate: getTodayString(),
      totalCompleted: (progress.dailyChallenge.totalCompleted || 0) + 1,
    },
  };
}

export function createStorage(certId) {
  if (!certId || typeof certId !== "string") {
    throw new Error("createStorage requires a certId string");
  }

  const PROGRESS_KEY = `${certId}.progress.v2`;
  const ACTIVE_MOCK_KEY = `${certId}.activeMock.v2`;
  const PRACTICE_PREFS_KEY = `${certId}.practicePrefs.v1`;
  const BLOCK_PREFS_KEY = `${certId}.blockPrefs.v1`;
  const ACTIVE_BLOCK_SESSION_KEY = `${certId}.activeBlockSession.v1`;

  return {
    loadProgress() {
      if (!hasStorage()) return EMPTY_PROGRESS;
      const stored = safeParse(window.localStorage.getItem(PROGRESS_KEY));
      if (!stored) return EMPTY_PROGRESS;
      return {
        ...EMPTY_PROGRESS,
        ...stored,
        achievements: sanitizeArray(stored.achievements),
        bookmarks: sanitizeArray(stored.bookmarks),
        wrongQuestionIds: sanitizeArray(stored.wrongQuestionIds),
        mockHistory: sanitizeArray(stored.mockHistory).slice(0, MOCK_HISTORY_LIMIT),
        topicHistory: stored.topicHistory || {},
        stats: {
          ...EMPTY_PROGRESS.stats,
          ...(stored.stats || {}),
          topicsOk: sanitizeArray(stored.stats?.topicsOk),
          bossWinsByDragon: sanitizeObject(stored.stats?.bossWinsByDragon) || {},
        },
        inventory: {
          ...EMPTY_PROGRESS.inventory,
          ...(stored.inventory || {}),
        },
        dailyStreak: {
          ...EMPTY_PROGRESS.dailyStreak,
          ...(stored.dailyStreak || {}),
        },
        dailyChallenge: {
          ...EMPTY_PROGRESS.dailyChallenge,
          ...(stored.dailyChallenge || {}),
        },
        blockStudy: {
          ...EMPTY_PROGRESS.blockStudy,
          ...(stored.blockStudy || {}),
          tracks: sanitizeObject(stored.blockStudy?.tracks) || {},
        },
      };
    },

    saveProgress(progress) {
      writeItem(PROGRESS_KEY, progress);
    },

    loadActiveMock() {
      if (!hasStorage()) return null;
      return safeParse(window.localStorage.getItem(ACTIVE_MOCK_KEY));
    },

    saveActiveMock(session) {
      writeItem(ACTIVE_MOCK_KEY, session);
    },

    clearActiveMock() {
      removeItem(ACTIVE_MOCK_KEY);
    },

    loadPracticePrefs() {
      if (!hasStorage()) return null;
      return sanitizeObject(safeParse(window.localStorage.getItem(PRACTICE_PREFS_KEY)));
    },

    savePracticePrefs(preferences) {
      writeItem(PRACTICE_PREFS_KEY, preferences);
    },

    loadBlockPrefs() {
      if (!hasStorage()) return null;
      return sanitizeObject(safeParse(window.localStorage.getItem(BLOCK_PREFS_KEY)));
    },

    saveBlockPrefs(preferences) {
      writeItem(BLOCK_PREFS_KEY, preferences);
    },

    loadActiveBlockSession() {
      if (!hasStorage()) return null;
      return safeParse(window.localStorage.getItem(ACTIVE_BLOCK_SESSION_KEY));
    },

    saveActiveBlockSession(session) {
      writeItem(ACTIVE_BLOCK_SESSION_KEY, session);
    },

    clearActiveBlockSession() {
      removeItem(ACTIVE_BLOCK_SESSION_KEY);
    },
  };
}
