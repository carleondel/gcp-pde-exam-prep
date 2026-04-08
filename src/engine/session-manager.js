import { MOCK_DURATION_SEC } from "./quiz-engine";

export function createPracticeSession(questions, meta = {}, state = {}) {
  const now = state.startedAt ?? Date.now();
  return {
    id: state.id ?? `practice-${now}`,
    mode: "practice",
    status: state.status ?? "active",
    questions,
    questionIds: questions.map((question) => question.id),
    currentIndex: state.currentIndex ?? 0,
    startedAt: now,
    currentQuestionStartedAt: state.currentQuestionStartedAt ?? now,
    score: state.score ?? 0,
    answered: state.answered ?? 0,
    streak: state.streak ?? 0,
    maxStreak: state.maxStreak ?? 0,
    history: state.history ?? [],
    rewardQueue: state.rewardQueue ?? [],
    meta,
    ui: state.ui ?? {},
  };
}

export function createMockSession(questionIds, meta = {}) {
  const startedAt = meta.startedAt ?? Date.now();
  return {
    id: `mock-${startedAt}`,
    mode: "mock",
    status: meta.status ?? "active",
    questionIds,
    currentIndex: meta.currentIndex ?? 0,
    answersByQuestionId: meta.answersByQuestionId ?? {},
    startedAt,
    durationSec: meta.durationSec ?? MOCK_DURATION_SEC,
    currentQuestionStartedAt: meta.currentQuestionStartedAt ?? startedAt,
    meta: meta.meta ?? {},
  };
}

export function advanceSession(session) {
  if (!session) return null;
  const total = session.mode === "mock" ? session.questionIds.length : session.questions.length;
  const nextIndex = session.currentIndex + 1;
  if (nextIndex >= total) {
    return {
      ...session,
      status: "finished",
    };
  }
  return {
    ...session,
    currentIndex: nextIndex,
    currentQuestionStartedAt: Date.now(),
  };
}

export function withRecordedMockAnswer(session, questionId, selection) {
  return {
    ...session,
    answersByQuestionId: {
      ...session.answersByQuestionId,
      [questionId]: selection,
    },
  };
}

export function getMockStatus(session, now = Date.now()) {
  if (!session) return "finished";
  if (session.status === "finished") return "finished";
  if (session.status === "expired") return "expired";
  return now - session.startedAt >= session.durationSec * 1000 ? "expired" : "active";
}

export function getRemainingTime(session, now = Date.now()) {
  return Math.max(0, session.durationSec - Math.floor((now - session.startedAt) / 1000));
}

export function toStoredMockSession(session) {
  if (!session || session.mode !== "mock") return null;
  return {
    questionIds: session.questionIds,
    answersByQuestionId: session.answersByQuestionId,
    currentIndex: session.currentIndex,
    startedAt: session.startedAt,
    durationSec: session.durationSec,
    status: session.status,
  };
}

export function hydrateMockSession(stored, questionMap) {
  if (!stored?.questionIds?.length) return null;
  const validIds = stored.questionIds.filter((id) => questionMap.has(id));
  if (!validIds.length) return null;
  return createMockSession(validIds, {
    answersByQuestionId: stored.answersByQuestionId || {},
    currentIndex: Math.min(stored.currentIndex || 0, validIds.length - 1),
    startedAt: stored.startedAt,
    durationSec: stored.durationSec,
    status: stored.status,
  });
}

export function toStoredBlockSession(session) {
  if (!session || session.mode !== "practice" || session.meta?.source !== "blocks") return null;
  return {
    id: session.id,
    questionIds: session.questionIds,
    currentIndex: session.currentIndex,
    startedAt: session.startedAt,
    currentQuestionStartedAt: session.currentQuestionStartedAt,
    status: session.status,
    score: session.score,
    answered: session.answered,
    streak: session.streak,
    maxStreak: session.maxStreak,
    history: session.history.map((entry) => ({
      questionId: entry.question.id,
      selectedIndexes: entry.selectedIndexes,
      correct: entry.correct,
      correctIndexes: entry.correctIndexes,
      xp: entry.xp,
      time: entry.time,
    })),
    rewardQueue: session.rewardQueue,
    meta: session.meta,
    ui: session.ui || {},
  };
}

export function hydrateBlockSession(stored, questionMap) {
  if (!stored?.questionIds?.length) return null;
  const questions = stored.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  if (!questions.length) return null;
  return createPracticeSession(questions, stored.meta || {}, {
    id: stored.id,
    currentIndex: Math.min(stored.currentIndex || 0, questions.length - 1),
    startedAt: stored.startedAt,
    currentQuestionStartedAt: stored.currentQuestionStartedAt,
    status: stored.status,
    score: stored.score,
    answered: stored.answered,
    streak: stored.streak,
    maxStreak: stored.maxStreak,
    history: Array.isArray(stored.history) ? stored.history.map((entry) => ({
      ...entry,
      question: questionMap.get(entry.questionId),
    })).filter((entry) => entry.question) : [],
    rewardQueue: Array.isArray(stored.rewardQueue) ? stored.rewardQueue : [],
    ui: stored.ui || {},
  });
}
