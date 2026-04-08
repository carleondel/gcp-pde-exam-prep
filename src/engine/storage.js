import { MOCK_HISTORY_LIMIT } from "./quiz-engine";

const PROGRESS_KEY = "pde.progress.v2";
const ACTIVE_MOCK_KEY = "pde.activeMock.v2";
const PRACTICE_PREFS_KEY = "pde.practicePrefs.v1";
const BLOCK_PREFS_KEY = "pde.blockPrefs.v1";
const ACTIVE_BLOCK_SESSION_KEY = "pde.activeBlockSession.v1";

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

export function loadProgress() {
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
}

export function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

export function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
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

export function saveProgress(progress) {
  if (!hasStorage()) return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function loadActiveMock() {
  if (!hasStorage()) return null;
  return safeParse(window.localStorage.getItem(ACTIVE_MOCK_KEY));
}

export function saveActiveMock(session) {
  if (!hasStorage()) return;
  window.localStorage.setItem(ACTIVE_MOCK_KEY, JSON.stringify(session));
}

export function clearActiveMock() {
  if (!hasStorage()) return;
  window.localStorage.removeItem(ACTIVE_MOCK_KEY);
}

export function loadPracticePrefs() {
  if (!hasStorage()) return null;
  return sanitizeObject(safeParse(window.localStorage.getItem(PRACTICE_PREFS_KEY)));
}

export function savePracticePrefs(preferences) {
  if (!hasStorage()) return;
  window.localStorage.setItem(PRACTICE_PREFS_KEY, JSON.stringify(preferences));
}

export function loadBlockPrefs() {
  if (!hasStorage()) return null;
  return sanitizeObject(safeParse(window.localStorage.getItem(BLOCK_PREFS_KEY)));
}

export function saveBlockPrefs(preferences) {
  if (!hasStorage()) return;
  window.localStorage.setItem(BLOCK_PREFS_KEY, JSON.stringify(preferences));
}

export function loadActiveBlockSession() {
  if (!hasStorage()) return null;
  return safeParse(window.localStorage.getItem(ACTIVE_BLOCK_SESSION_KEY));
}

export function saveActiveBlockSession(session) {
  if (!hasStorage()) return;
  window.localStorage.setItem(ACTIVE_BLOCK_SESSION_KEY, JSON.stringify(session));
}

export function clearActiveBlockSession() {
  if (!hasStorage()) return;
  window.localStorage.removeItem(ACTIVE_BLOCK_SESSION_KEY);
}
