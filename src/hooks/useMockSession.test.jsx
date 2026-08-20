// @vitest-environment jsdom
import { StrictMode } from "react";
import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createStorage, EMPTY_PROGRESS } from "../engine/storage.js";
import { createMockSession } from "../engine/session-manager.js";
import { useMockSession } from "./useMockSession.js";

function installStorage() {
  const store = new Map();
  const api = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
  Object.defineProperty(globalThis.window, "localStorage", { value: api, configurable: true });
  return store;
}

const EXAM_DOMAINS = [
  { id: "d1", name: "Uno", weight: 50, topics: ["Compute"] },
  { id: "d2", name: "Dos", weight: 50, topics: ["Storage"] },
];
const TOPIC_MAP = { Compute: "Compute", Storage: "Storage" };

const BANK = ["Compute", "Storage"].flatMap((topic, t) =>
  Array.from({ length: 20 }, (_, i) => ({
    id: t * 20 + i + 1,
    topic,
    difficulty: i % 3 === 0 ? 3 : 1,
    options: ["a", "b", "c", "d"],
    correct: 0,
    sourceQuestionNumber: t * 20 + i + 1,
  })),
);

const QUESTION_MAP = new Map(BANK.map((question) => [question.id, question]));

const QUESTION_COUNT = 10;
const DURATION_SEC = 600;

function mountMock({
  certId = "gcp-pca",
  session = null,
  now = Date.now(),
  ready = true,
  strict = false,
  updateProgress = () => {},
} = {}) {
  const storage = createStorage(certId);
  const seen = { api: null };

  function Probe() {
    seen.api = useMockSession({
      allQuestions: BANK,
      questionMap: QUESTION_MAP,
      updateProgress,
      session,
      now,
      questionCount: QUESTION_COUNT,
      durationSec: DURATION_SEC,
      passPercent: 70,
      examDomains: EXAM_DOMAINS,
      topicMap: TOPIC_MAP,
      saveActiveMock: storage.saveActiveMock,
      clearActiveMock: storage.clearActiveMock,
      ready,
    });
    return null;
  }

  const utils = render(
    strict ? (
      <StrictMode>
        <Probe />
      </StrictMode>
    ) : (
      <Probe />
    ),
  );
  return { ...utils, seen, storage };
}

/** A mock attempt with every question answered with option `answer`. */
function answeredAttempt(answer = 0, overrides = {}) {
  const questionIds = BANK.slice(0, QUESTION_COUNT).map((question) => question.id);
  const answersByQuestionId = Object.fromEntries(questionIds.map((id) => [id, [answer]]));
  return createMockSession(questionIds, {
    status: "active",
    durationSec: DURATION_SEC,
    answersByQuestionId,
    ...overrides,
  });
}

/** Collects what updateProgress folds into progress, starting from empty. */
function progressRecorder() {
  let stored = EMPTY_PROGRESS;
  return {
    updateProgress: (updater) => {
      stored = updater(stored);
    },
    get value() {
      return stored;
    },
  };
}

describe("useMockSession", () => {
  beforeEach(() => {
    installStorage();
  });

  describe("the attempt in flight", () => {
    it("stores nothing on a fresh install", () => {
      const { seen, storage } = mountMock();
      expect(seen.api.savedMockSession).toBeNull();
      expect(storage.loadActiveMock()).toBeNull();
    });

    it("stores the attempt as soon as one is created", () => {
      const { seen, storage } = mountMock();
      act(() => {
        seen.api.createMockAttempt();
      });
      expect(storage.loadActiveMock().questionIds).toHaveLength(QUESTION_COUNT);
    });

    it("clears the record when the attempt is discarded", () => {
      const { seen, storage } = mountMock();
      act(() => {
        seen.api.createMockAttempt();
      });
      act(() => seen.api.discardMock());
      expect(storage.loadActiveMock()).toBeNull();
      expect(seen.api.savedMockSession).toBeNull();
    });

    it("writes nothing before the app has hydrated", () => {
      const saveActiveMock = vi.fn();
      const clearActiveMock = vi.fn();
      function Probe() {
        useMockSession({
          allQuestions: BANK,
          questionMap: QUESTION_MAP,
          updateProgress: () => {},
          session: null,
          now: Date.now(),
          questionCount: QUESTION_COUNT,
          durationSec: DURATION_SEC,
          passPercent: 70,
          examDomains: EXAM_DOMAINS,
          topicMap: TOPIC_MAP,
          saveActiveMock,
          clearActiveMock,
          ready: false,
        });
        return null;
      }
      render(<Probe />);
      expect(saveActiveMock).not.toHaveBeenCalled();
      // Not even the clear: an unhydrated mount must not touch the slot at
      // all, or a restore in progress loses the attempt it was about to read.
      expect(clearActiveMock).not.toHaveBeenCalled();
    });

    it("keeps each cert's attempt apart", () => {
      const pca = mountMock({ certId: "gcp-pca" });
      act(() => {
        pca.seen.api.createMockAttempt();
      });
      expect(pca.storage.loadActiveMock()).not.toBeNull();
      expect(createStorage("gcp-pde").loadActiveMock()).toBeNull();
    });

    it("survives StrictMode's double mount", () => {
      const { seen, storage } = mountMock({ strict: true });
      act(() => {
        seen.api.createMockAttempt();
      });
      expect(storage.loadActiveMock().questionIds).toHaveLength(QUESTION_COUNT);
    });
  });

  describe("creating an attempt", () => {
    it("draws the configured number of questions for the configured time", () => {
      const { seen } = mountMock();
      let created = null;
      act(() => {
        created = seen.api.createMockAttempt();
      });
      expect(created.mode).toBe("mock");
      expect(created.status).toBe("active");
      expect(created.questionIds).toHaveLength(QUESTION_COUNT);
      expect(created.durationSec).toBe(DURATION_SEC);
    });

    it("starts with no answers recorded", () => {
      const { seen } = mountMock();
      let created = null;
      act(() => {
        created = seen.api.createMockAttempt();
      });
      expect(created.answersByQuestionId).toEqual({});
      expect(created.currentIndex).toBe(0);
    });

    it("draws the newest questions when asked to prefer recent ones", () => {
      const { seen } = mountMock();
      act(() => seen.api.setMockPreferRecent(true));

      let created = null;
      act(() => {
        created = seen.api.createMockAttempt();
      });

      // Both domains weigh 50, so the draw is the newest five of each: 16-20
      // out of Compute and 36-40 out of Storage. Asserted as an exact set
      // rather than as an average, which the random draw clears often enough
      // by luck to let a broken preferRecent through.
      const drawn = created.questionIds
        .map((id) => QUESTION_MAP.get(id).sourceQuestionNumber)
        .sort((a, b) => a - b);
      expect(drawn).toEqual([16, 17, 18, 19, 20, 36, 37, 38, 39, 40]);
    });
  });

  describe("the clock", () => {
    it("counts down from the full duration", () => {
      const startedAt = Date.now();
      const session = answeredAttempt(0, { startedAt });
      const { seen } = mountMock({ session, now: startedAt + 60_000 });
      expect(seen.api.mockRemainingSec).toBe(DURATION_SEC - 60);
      expect(seen.api.mockExpired).toBe(false);
    });

    it("expires once the duration has passed", () => {
      const startedAt = Date.now();
      const session = answeredAttempt(0, { startedAt });
      const { seen } = mountMock({ session, now: startedAt + (DURATION_SEC + 1) * 1000 });
      expect(seen.api.mockRemainingSec).toBe(0);
      expect(seen.api.mockExpired).toBe(true);
    });

    it("reports nothing while no mock is running", () => {
      const { seen } = mountMock({ session: null });
      expect(seen.api.mockRemainingSec).toBe(0);
      expect(seen.api.mockExpired).toBe(false);
    });
  });

  describe("recording a result", () => {
    it("ignores a session that is not a mock", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      let result = null;
      act(() => {
        result = seen.api.recordMockResult({ mode: "practice" });
      });
      expect(result).toBeNull();
      expect(recorder.value).toBe(EMPTY_PROGRESS);
    });

    it("grades the attempt and hands back the summary", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      let result = null;
      act(() => {
        result = seen.api.recordMockResult(answeredAttempt(0));
      });

      expect(result.history).toHaveLength(QUESTION_COUNT);
      expect(result.summary.score).toBe(QUESTION_COUNT);
      expect(result.summary.percent).toBe(100);
      expect(result.summary.passed).toBe(true);
    });

    it("fails the attempt when every answer is wrong", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      let result = null;
      act(() => {
        result = seen.api.recordMockResult(answeredAttempt(1));
      });

      expect(result.summary.percent).toBe(0);
      expect(result.summary.passed).toBe(false);
      expect(recorder.value.wrongQuestionIds).toHaveLength(QUESTION_COUNT);
    });

    it("writes the attempt to the mock history", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      act(() => {
        seen.api.recordMockResult(answeredAttempt(0));
      });

      const [entry] = recorder.value.mockHistory;
      expect(entry).toMatchObject({
        score: QUESTION_COUNT,
        questionCount: QUESTION_COUNT,
        percent: 100,
        passed: true,
      });
      expect(entry.wrongQuestionIds).toEqual([]);
    });

    it("puts the newest attempt first and keeps only the last fifty", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });

      act(() => {
        seen.api.recordMockResult(answeredAttempt(1));
      });
      for (let i = 0; i < 51; i += 1) {
        act(() => {
          seen.api.recordMockResult(answeredAttempt(0));
        });
      }

      expect(recorder.value.mockHistory).toHaveLength(50);
      // The single failed attempt has been pushed off the end.
      expect(recorder.value.mockHistory.every((entry) => entry.passed)).toBe(true);
    });

    it("counts the answers towards topic history and stats", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      act(() => {
        seen.api.recordMockResult(answeredAttempt(0));
      });

      expect(recorder.value.stats.totalCorrect).toBe(QUESTION_COUNT);
      expect(recorder.value.stats.hardCorrect).toBeGreaterThan(0);
      expect(recorder.value.stats.topicsOk).toContain("Compute");
      expect(Object.keys(recorder.value.topicHistory).length).toBeGreaterThan(0);
    });

    it("clears the attempt in flight once it is graded", () => {
      const recorder = progressRecorder();
      const { seen, storage } = mountMock({ updateProgress: recorder.updateProgress });
      act(() => {
        seen.api.createMockAttempt();
      });
      expect(storage.loadActiveMock()).not.toBeNull();

      act(() => {
        seen.api.recordMockResult(answeredAttempt(0));
      });

      expect(seen.api.savedMockSession).toBeNull();
      expect(storage.loadActiveMock()).toBeNull();
    });

    it("grades an expired attempt as of the moment the clock ran out", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      // Started three hours ago: a run of the full duration, then the tab sat
      // closed. The elapsed time must be the duration, not the three hours.
      const startedAt = Date.now() - 3 * 60 * 60 * 1000;
      let result = null;
      act(() => {
        result = seen.api.recordMockResult(answeredAttempt(0, { startedAt }), "expired");
      });

      expect(result.summary.elapsedSec).toBe(DURATION_SEC);
      expect(recorder.value.mockHistory[0].elapsedSec).toBe(DURATION_SEC);
    });

    it("grades a completed attempt as of now", () => {
      const recorder = progressRecorder();
      const { seen } = mountMock({ updateProgress: recorder.updateProgress });
      const startedAt = Date.now() - 120_000;
      let result = null;
      act(() => {
        result = seen.api.recordMockResult(answeredAttempt(0, { startedAt }));
      });

      expect(result.summary.elapsedSec).toBeGreaterThanOrEqual(119);
      expect(result.summary.elapsedSec).toBeLessThanOrEqual(125);
    });
  });
});
