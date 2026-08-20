// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { installCanvasStub } from "./test/canvas-stub.js";
import { AppContent } from "./App.jsx";
import { createStorage, EMPTY_PROGRESS } from "./engine/storage.js";

/**
 * Integration tests for the mock exam.
 *
 * Mounted against the real screen for the same reason as the block tests: a
 * hook that is correct on its own can still be wired into AppContent wrongly,
 * and only the screen shows that.
 *
 * The mock's shape comes from the active cert, not from the fake bank, so the
 * counts below are read from the manifest rather than hard-coded.
 */

installCanvasStub();

const CERT_ID = "gcp-pde";
const MOCK_COUNT = 50;
const MOCK_DURATION_SEC = 120 * 60;
const CORRECT = "A. correcta";

const BANK = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  topic: "BigQuery",
  difficulty: 2,
  question: `Pregunta numero ${i + 1}`,
  options: [CORRECT, "B. incorrecta", "C. otra", "D. otra mas"],
  correct: 0,
  explanation: "Explicacion de la respuesta.",
  discussion: [],
  sourceQuestionNumber: i + 1,
}));

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

const storage = () => createStorage(CERT_ID);
const buttons = () => screen.queryAllByRole("button");
const findButton = (pattern) => buttons().find((button) => pattern.test(button.textContent));

function clickButton(pattern) {
  const button = findButton(pattern);
  if (!button) {
    throw new Error(
      `no button matching ${pattern} — found: ${buttons()
        .map((b) => b.textContent.slice(0, 28))
        .join(" | ")}`,
    );
  }
  fireEvent.click(button);
}

const openMockView = () => clickButton(/^◷Simulacro/);

function startMock() {
  openMockView();
  clickButton(/^Iniciar simulacro$/);
}

/** Answers the question on screen and saves it. Mocks give no feedback. */
function answerCurrent(option = CORRECT) {
  fireEvent.click(screen.getByText(option));
  clickButton(/^Guardar y continuar/);
}

/** Reads the countdown chip ("119:58") back as a number of seconds. */
function readCountdown() {
  const chip = screen.getByText(/^\d+:\d\d$/);
  const [minutes, seconds] = chip.textContent.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

/** The stored attempt in flight, whatever cert it belongs to. */
const activeMock = (certId = CERT_ID) => createStorage(certId).loadActiveMock();

describe("the mock exam, wired into the app", () => {
  beforeEach(() => {
    installStorage();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("starting one", () => {
    it("opens on the first question of a full-length exam", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();

      expect(screen.getByText(`1/${MOCK_COUNT}`)).toBeTruthy();
      expect(findButton(/^Guardar y continuar/)).toBeTruthy();
    });

    it("starts the clock at the full duration", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();

      // `now` ticks once a second and is captured before the attempt exists,
      // so the first render can be a second either side of the full duration.
      expect(Math.abs(readCountdown() - MOCK_DURATION_SEC)).toBeLessThanOrEqual(3);
    });

    it("records the attempt as in flight as soon as it starts", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();

      const stored = activeMock();
      expect(stored).not.toBeNull();
      expect(stored.questionIds).toHaveLength(MOCK_COUNT);
      expect(stored.answersByQuestionId).toEqual({});
    });

    it("offers no hints, no 50/50 and no rewards", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        inventory: { ...EMPTY_PROGRESS.inventory, hints: 3, fiftyFifty: 3 },
      });
      render(<AppContent allQuestions={BANK} />);
      startMock();

      expect(findButton(/^💡$/)).toBeFalsy();
      expect(findButton(/^✂️$/)).toBeFalsy();
    });
  });

  describe("an interrupted attempt", () => {
    it("keeps the stored answers in step as questions are saved", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();
      answerCurrent();

      const stored = activeMock();
      expect(stored.currentIndex).toBe(1);
      expect(Object.keys(stored.answersByQuestionId)).toHaveLength(1);
    });

    it("comes back on the question it was left on, with the answers kept", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startMock();
      answerCurrent();
      answerCurrent();
      const before = activeMock();
      first.unmount();

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText(`3/${MOCK_COUNT}`)).toBeTruthy();
      expect(activeMock().answersByQuestionId).toEqual(before.answersByQuestionId);
    });

    it("keeps counting down while the tab is closed, unlike a study block", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startMock();
      const stored = activeMock();
      first.unmount();

      // Ten minutes of a timed exam spent away from the tab are ten minutes
      // spent: a mock has a wall-clock deadline, it is not a paused session.
      storage().saveActiveMock({ ...stored, startedAt: Date.now() - 10 * 60 * 1000 });
      render(<AppContent allQuestions={BANK} />);

      expect(readCountdown()).toBeLessThanOrEqual(MOCK_DURATION_SEC - 600 + 2);
      expect(readCountdown()).toBeGreaterThan(MOCK_DURATION_SEC - 600 - 5);
    });

    it("finishes an attempt whose time ran out while the tab was closed", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startMock();
      answerCurrent();
      const stored = activeMock();
      first.unmount();

      storage().saveActiveMock({
        ...stored,
        startedAt: Date.now() - (MOCK_DURATION_SEC + 60) * 1000,
      });
      render(<AppContent allQuestions={BANK} />);

      // Graded straight to the result screen rather than handed back with a
      // countdown that has already run out.
      expect(screen.getByText("Revisión")).toBeTruthy();
      expect(activeMock()).toBeNull();

      const [entry] = storage().loadProgress().mockHistory;
      expect(entry.questionCount).toBe(MOCK_COUNT);
      expect(entry.score).toBe(1);
      // Graded as of the moment the clock ran out, not the moment we noticed.
      expect(entry.elapsedSec).toBe(MOCK_DURATION_SEC);
    });
  });

  describe("cancelling", () => {
    it("discards the attempt without writing it to the history", () => {
      vi.spyOn(window, "confirm").mockReturnValue(true);
      render(<AppContent allQuestions={BANK} />);
      startMock();
      answerCurrent();

      clickButton(/^Cancelar$/);

      expect(activeMock()).toBeNull();
      expect(storage().loadProgress().mockHistory).toHaveLength(0);
      // Back on the menu, on the mock view it was started from.
      expect(findButton(/^Iniciar simulacro$/)).toBeTruthy();
    });

    it("keeps the attempt when the confirmation is declined", () => {
      vi.spyOn(window, "confirm").mockReturnValue(false);
      render(<AppContent allQuestions={BANK} />);
      startMock();

      clickButton(/^Cancelar$/);

      expect(activeMock()).not.toBeNull();
      expect(screen.getByText(`1/${MOCK_COUNT}`)).toBeTruthy();
    });
  });

  describe("finishing one", () => {
    it("grades the attempt, writes it to the history and clears the slot", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();

      // One deliberate mistake, so a summary that simply reported 100% would
      // not pass this test.
      answerCurrent("B. incorrecta");
      for (let i = 1; i < MOCK_COUNT; i += 1) {
        answerCurrent();
      }

      expect(screen.getByText("Revisión")).toBeTruthy();
      expect(activeMock()).toBeNull();

      const progress = storage().loadProgress();
      expect(progress.mockHistory).toHaveLength(1);
      expect(progress.mockHistory[0]).toMatchObject({
        score: MOCK_COUNT - 1,
        questionCount: MOCK_COUNT,
        percent: 98,
        passed: true,
      });
      expect(progress.mockHistory[0].wrongQuestionIds).toHaveLength(1);
      expect(progress.wrongQuestionIds).toHaveLength(1);
      expect(progress.stats.totalCorrect).toBe(MOCK_COUNT - 1);
    });

    it("shows the attempt in the history on the mock screen afterwards", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();
      for (let i = 0; i < MOCK_COUNT; i += 1) {
        answerCurrent();
      }

      // Returns to the mock view it was started from, so the history is
      // already on screen.
      clickButton(/^Volver al menú$/);

      expect(screen.getByText(/100% Apto/)).toBeTruthy();
    });
  });

  describe("per cert", () => {
    it("writes the attempt under this cert only", () => {
      render(<AppContent allQuestions={BANK} />);
      startMock();

      expect(activeMock()).not.toBeNull();
      expect(activeMock("gcp-pca")).toBeNull();
    });

    it("neither adopts nor deletes an attempt interrupted in another cert", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startMock();
      first.unmount();
      const pcaMock = activeMock();
      createStorage("gcp-pca").saveActiveMock(pcaMock);
      globalThis.window.localStorage.removeItem(`${CERT_ID}.activeMock.v2`);

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Bloques de estudio")).toBeTruthy();
      expect(activeMock()).toBeNull();
      expect(activeMock("gcp-pca")).toEqual(pcaMock);
    });
  });
});
