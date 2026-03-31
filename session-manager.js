import { MOCK_DURATION_SEC } from "./quiz-engine";

export function createPracticeSession(questions, meta = {}) {
  const now = Date.now();
  return {
    id: `practice-${now}`,
    mode: "practice",
    status: "active",
    questions,
    questionIds: questions.map((question) => question.id),
    currentIndex: 0,
    startedAt: now,
    currentQuestionStartedAt: now,
    score: 0,
    answered: 0,
    streak: 0,
    maxStreak: 0,
    history: [],
    rewardQueue: [],
    meta,
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
