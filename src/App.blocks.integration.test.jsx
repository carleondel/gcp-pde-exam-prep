// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { installCanvasStub } from "./test/canvas-stub.js";
import { AppContent } from "./App.jsx";
import { createStorage, EMPTY_PROGRESS } from "./engine/storage.js";

/**
 * Integration tests for block study.
 *
 * These mount the real screen rather than a probe component, so they fail
 * when a hook is correct on its own but wired into AppContent wrongly —
 * which is exactly what the unit tests cannot see.
 *
 * No ?cert= is set, so the active cert is the default, gcp-pde. The fake
 * bank uses one of its real topics so domain stats resolve normally.
 */

installCanvasStub();

const CERT_ID = "gcp-pde";
const BLOCK_SIZE = 25;
const CORRECT = "A. correcta";

const BANK = Array.from({ length: 60 }, (_, i) => ({
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

/**
 * Streaks open a wheel, a chest or a scratch card over the question. They are
 * not what these tests are about, so each is dismissed the cheapest way it
 * allows — some offer SALTAR, a chest only opens.
 */
const REWARD_BUTTONS = /^(SALTAR|ABRIR COFRE|RASCAR|GIRAR|Cerrar|Continuar|Recoger)$/;

function dismissRewards() {
  // Bounded rather than while-true: a reward that will not close should fail
  // the test loudly instead of hanging it.
  for (let guard = 0; guard < 12; guard += 1) {
    const reward = findButton(REWARD_BUTTONS);
    if (!reward) return;
    fireEvent.click(reward);
  }
  throw new Error("a reward overlay would not close");
}

const openBlocks = () => fireEvent.click(screen.getByText("Ver todos →"));

function startFirstBlock() {
  openBlocks();
  clickButton(/^(Empezar|Continuar) bloque/);
}

/**
 * Answers the current question correctly and moves to the next one.
 *
 * Advancing is a loop rather than one click: "Reclamar recompensa (N)" is a
 * counter of pending rewards and claims one at a time without moving on, so
 * the button only becomes "Siguiente" once the queue is empty.
 */
function answerCurrent() {
  dismissRewards();
  fireEvent.click(screen.getByText(CORRECT));
  clickButton(/^Comprobar/);

  for (let guard = 0; guard < 20; guard += 1) {
    dismissRewards();
    const advance = findButton(/^(Siguiente|Ver resultados|Finalizar)/);
    if (advance) {
      fireEvent.click(advance);
      return;
    }
    // Dismissing a reward can advance the question by itself; a fresh
    // Comprobar means we are already on the next one.
    if (findButton(/^Comprobar/)) return;
    const claim = findButton(/^Reclamar recompensa/);
    if (!claim) {
      throw new Error(
        `stuck after answering — buttons: ${buttons()
          .map((b) => b.textContent.slice(0, 28))
          .join(" | ")}`,
      );
    }
    fireEvent.click(claim);
  }
  throw new Error("could not advance past a question");
}

const trackId = (size = BLOCK_SIZE) => `blocks-desc-${size}`;
const blockRecord = (index = 0, size = BLOCK_SIZE) =>
  storage().loadProgress().blockStudy?.tracks?.[trackId(size)]?.blocks?.[index];

describe("block study, wired into the app", () => {
  beforeEach(() => {
    installStorage();
  });

  // Vitest runs without globals, so Testing Library's automatic cleanup is
  // not installed: without this each test's DOM stacks on the last one and
  // every query finds several matches.
  afterEach(() => {
    cleanup();
  });

  describe("the track on screen", () => {
    it("shows the block grid on the home screen", () => {
      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Bloques de estudio")).toBeTruthy();
    });

    it("opens the block view", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      expect(screen.getByText("Rondas fijas de estudio")).toBeTruthy();
    });

    it("cuts 60 questions into three blocks at the default size", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      expect(findButton(/^Bloque 1/)).toBeTruthy();
      expect(findButton(/^Bloque 3/)).toBeTruthy();
      expect(findButton(/^Bloque 4/)).toBeFalsy();
    });

    it("recuts the track when the size changes", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^15 preguntas$/);
      expect(findButton(/^Bloque 4/)).toBeTruthy();
    });
  });

  describe("starting a block", () => {
    it("opens on the newest question, since blocks run newest first", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      expect(screen.getByText("Pregunta numero 60")).toBeTruthy();
    });

    it("keeps the stored record in step as the block is answered", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      expect(storage().loadActiveBlockSession()).toMatchObject({ currentIndex: 0, answered: 0 });

      answerCurrent();

      // Tracks the running session, not the snapshot taken at start: a block
      // interrupted here must come back on question two, not question one.
      expect(storage().loadActiveBlockSession()).toMatchObject({ currentIndex: 1, answered: 1 });
    });

    it("records the block as active as soon as it starts", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();

      const active = storage().loadActiveBlockSession();
      expect(active).not.toBeNull();
      expect(active.meta.blockStudy.blockIndex).toBe(0);
      expect(active.meta.source).toBe("blocks");
    });
  });

  describe("preferences", () => {
    it("persists the size and reads it back on a fresh mount", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^15 preguntas$/);
      expect(storage().loadBlockPrefs().trackSize).toBe(15);
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      // Four blocks again means the stored size of 15 was applied, not the default.
      expect(findButton(/^Bloque 4/)).toBeTruthy();
    });

    it("persists the selected block index", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^Bloque 3/);
      expect(storage().loadBlockPrefs().blockIndex).toBe(2);
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      expect(storage().loadBlockPrefs().blockIndex).toBe(2);
    });

    it("keeps each cert's block preferences apart", () => {
      createStorage("gcp-pca").saveBlockPrefs({ trackSize: 30, blockIndex: 2 });

      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^15 preguntas$/);

      expect(storage().loadBlockPrefs().trackSize).toBe(15);
      expect(createStorage("gcp-pca").loadBlockPrefs().trackSize).toBe(30);
    });
  });

  describe("an interrupted block", () => {
    it("comes back on the question it was left on", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      answerCurrent();
      expect(screen.getByText("Pregunta numero 59")).toBeTruthy();
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Pregunta numero 59")).toBeTruthy();
    });

    it("comes back with the answer and the revealed explanation intact", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Comprobar/);
      expect(screen.queryAllByText(/Explicacion de la respuesta/).length).toBeGreaterThan(0);
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Pregunta numero 60")).toBeTruthy();
      expect(screen.queryAllByText(/Explicacion de la respuesta/).length).toBeGreaterThan(0);
    });

    it("freezes the elapsed time instead of counting while the tab is closed", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();

      const stored = storage().loadActiveBlockSession();
      expect(stored.pausedElapsedSec).toBeGreaterThanOrEqual(0);
      expect(stored.pausedElapsedSec).toBeLessThan(60);

      // Simulate the block having been left open a while before closing.
      globalThis.window.localStorage.setItem(
        `${CERT_ID}.activeBlockSession.v1`,
        JSON.stringify({ ...stored, pausedElapsedSec: 42 }),
      );

      render(<AppContent allQuestions={BANK} />);
      // Restored from the frozen value rather than from the original
      // wall-clock start, so it resumes near 42s, not hours later.
      expect(storage().loadActiveBlockSession().pausedElapsedSec).toBeLessThan(120);
    });

    it("is dropped when the stored block belongs to another cert", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();

      expect(storage().loadActiveBlockSession()).not.toBeNull();
      expect(createStorage("gcp-pca").loadActiveBlockSession()).toBeNull();
    });
  });

  describe("finishing a block", () => {
    it("records the round, clears the active session and returns to the menu", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();

      for (let i = 0; i < BLOCK_SIZE; i += 1) {
        answerCurrent();
      }
      dismissRewards();

      expect(storage().loadActiveBlockSession()).toBeNull();

      const record = blockRecord(0);
      expect(record, "the finished round was not written to progress").toBeTruthy();
      expect(record.rounds).toHaveLength(1);
      expect(record.lastPercent).toBe(100);
      expect(record.bestPercent).toBe(100);
      expect(record.blockSignature).toBeTruthy();
    });
  });

  // README documents `discussion` as optional, so a cert can legitimately
  // ship questions without it. Every question in both banks happens to have
  // the field, which is why the unguarded read never showed up in use.
  it("answers a question that has no discussion field at all", () => {
    const withoutDiscussion = BANK.map(({ discussion: _discussion, ...rest }) => rest);
    render(<AppContent allQuestions={withoutDiscussion} />);
    startFirstBlock();

    fireEvent.click(screen.getByText(CORRECT));
    clickButton(/^Comprobar/);

    expect(screen.getByText(/discusión \(0\)/)).toBeTruthy();
  });

  it("does not overwrite stored progress on mount", () => {
    storage().saveProgress({ ...EMPTY_PROGRESS, xp: 3210, achievements: ["first_blood"] });

    render(<AppContent allQuestions={BANK} />);

    const after = storage().loadProgress();
    expect(after.xp).toBe(3210);
    expect(after.achievements).toContain("first_blood");
  });
});
