import { useCallback, useEffect, useState } from "react";

import {
  appendTopicAttempt,
  buildMockHistory,
  buildMockQuestions,
  buildMockSummary,
  pushWrongQuestionId,
} from "../engine/quiz-engine";
import {
  createMockSession,
  getMockStatus,
  getRemainingTime,
  toStoredMockSession,
} from "../engine/session-manager";

/**
 * Owns the mock exam: the attempt kept aside so a closed tab can come back to
 * it, the one setting that shapes a new attempt, the countdown, and what a
 * finished attempt writes into progress.
 *
 * As with block study, the running quiz session is passed in rather than
 * owned. A mock is a session like any other while it is being answered, and
 * the screen it lives on is shared with practice — so this hook reads the
 * session to run the clock and to persist the attempt, but the caller decides
 * what is on screen.
 *
 * The two callbacks that bracket an attempt are split the same way:
 * `createMockAttempt` returns the new session and records it, and
 * `recordMockResult` writes the result to progress and hands back the history
 * and summary. Neither touches the screen.
 *
 * Storage is injected, so the attempt in flight stays namespaced per cert.
 */
export function useMockSession({
  allQuestions,
  questionMap,
  updateProgress,
  session,
  now,
  questionCount,
  durationSec,
  passPercent,
  examDomains,
  topicMap,
  saveActiveMock,
  clearActiveMock,
  ready,
}) {
  const [savedMockSession, setSavedMockSession] = useState(null);
  const [mockPreferRecent, setMockPreferRecent] = useState(false);

  const isMock = session?.mode === "mock";
  const mockRemainingSec = isMock ? getRemainingTime(session, now) : 0;
  const mockExpired = isMock && getMockStatus(session, now) === "expired";

  useEffect(() => {
    if (!ready) return;
    if (savedMockSession) saveActiveMock(toStoredMockSession(savedMockSession));
    else clearActiveMock();
  }, [clearActiveMock, ready, savedMockSession, saveActiveMock]);

  /** Drops the attempt in flight without recording anything. */
  const discardMock = useCallback(() => {
    clearActiveMock();
    setSavedMockSession(null);
  }, [clearActiveMock]);

  /**
   * Builds a fresh attempt and records it as the one in flight. Returns it so
   * the caller can put it on screen.
   */
  const createMockAttempt = useCallback(() => {
    const questions = buildMockQuestions(allQuestions, questionCount, {
      preferRecent: mockPreferRecent,
      examDomains,
      topicMap,
    });
    const nextSession = createMockSession(
      questions.map((question) => question.id),
      { status: "active", durationSec },
    );
    setSavedMockSession(nextSession);
    return nextSession;
    // allQuestions is listed although the original startMock read it from
    // module scope: it is the cert's bank and never changes while mounted, so
    // naming it keeps the dependency list honest without changing when this
    // callback is rebuilt.
  }, [allQuestions, durationSec, examDomains, mockPreferRecent, questionCount, topicMap]);

  /**
   * Grades a finished attempt, folds it into progress and clears the attempt
   * in flight. Returns the history and summary for the result screen, or null
   * when handed something that is not a mock.
   *
   * An expired attempt is graded as of the moment the clock ran out, not the
   * moment the tab noticed.
   */
  const recordMockResult = useCallback(
    (sessionToFinish, reason = "completed") => {
      if (!sessionToFinish || sessionToFinish.mode !== "mock") return null;

      const history = buildMockHistory(
        sessionToFinish.questionIds,
        sessionToFinish.answersByQuestionId,
        questionMap,
      );
      const finishedAt =
        reason === "expired"
          ? sessionToFinish.startedAt + sessionToFinish.durationSec * 1000
          : Date.now();
      const summary = buildMockSummary(history, {
        startedAt: sessionToFinish.startedAt,
        finishedAt,
        durationSec: sessionToFinish.durationSec,
        passPercent,
        questionCount: sessionToFinish.questionIds.length,
      });

      updateProgress((prev) => {
        let topicHistory = prev.topicHistory;
        let wrongQuestionIds = prev.wrongQuestionIds;
        const topicsOk = new Set(prev.stats.topicsOk);
        let totalCorrect = prev.stats.totalCorrect;
        let hardCorrect = prev.stats.hardCorrect;

        history.forEach((entry) => {
          topicHistory = appendTopicAttempt(
            topicHistory,
            entry.question,
            entry.correct,
            finishedAt,
          );
          wrongQuestionIds = pushWrongQuestionId(wrongQuestionIds, entry.questionId, entry.correct);
          if (entry.correct) {
            totalCorrect += 1;
            if (entry.question.difficulty === 3) hardCorrect += 1;
            topicsOk.add(entry.question.topic);
          }
        });

        return {
          ...prev,
          topicHistory,
          wrongQuestionIds,
          mockHistory: [
            {
              date: finishedAt,
              score: summary.score,
              questionCount: summary.questionCount,
              percent: summary.percent,
              passed: summary.passed,
              elapsedSec: summary.elapsedSec,
              wrongQuestionIds: history
                .filter((entry) => !entry.correct)
                .map((entry) => entry.questionId),
            },
            ...prev.mockHistory,
          ].slice(0, 50),
          stats: {
            ...prev.stats,
            totalCorrect,
            hardCorrect,
            topicsOk: [...topicsOk],
          },
        };
      });

      discardMock();
      return { history, summary };
    },
    [discardMock, passPercent, questionMap, updateProgress],
  );

  return {
    savedMockSession,
    setSavedMockSession,
    mockPreferRecent,
    setMockPreferRecent,
    mockRemainingSec,
    mockExpired,
    createMockAttempt,
    recordMockResult,
    discardMock,
  };
}
