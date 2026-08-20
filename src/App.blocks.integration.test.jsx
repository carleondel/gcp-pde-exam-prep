// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

/**
 * Reads the block timer chip ("⏱ 00:42") back as a number of seconds, so a
 * test can assert on the time the user actually sees.
 */
function readBlockTimer() {
  const chip = screen.getByText(/^⏱ \d+:\d\d$/);
  const [minutes, seconds] = chip.textContent.replace("⏱", "").trim().split(":");
  return Number(minutes) * 60 + Number(seconds);
}

function startFirstBlock() {
  openBlocks();
  clickButton(/^(Empezar|Continuar) bloque/);
}

/**
 * The button that moves to the next question, matched exactly. A loose
 * /^Siguiente/ also matches "Siguiente bloque" on the result screen, so a
 * loop that overshot the end of a block silently started the next one.
 */
const ADVANCE_BUTTON = /^(Siguiente|Ver resultados) \(Enter\)$/;

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
    const advance = findButton(ADVANCE_BUTTON);
    if (advance) {
      fireEvent.click(advance);
      return;
    }
    // Dismissing a reward can advance the question by itself; a fresh
    // Comprobar means we are already on the next one.
    if (findButton(/^Comprobar/)) return;
    // The last question of a block ends on the result screen, where there is
    // no next question to advance to.
    if (findButton(/^Volver al menú$/)) return;
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

/**
 * Answers the block on screen to the end, correctly.
 *
 * Driven by what is on screen rather than by a count of BLOCK_SIZE answers:
 * dismissing a reward can advance the question by itself, so the number of
 * clicks a block needs is not the number of questions it has. The guard is
 * generous enough to cover that and still fail loudly.
 */
function finishBlock() {
  for (let guard = 0; guard < BLOCK_SIZE + 8; guard += 1) {
    dismissRewards();
    if (!findButton(/^Comprobar/)) break;
    answerCurrent();
  }
  dismissRewards();
}

const trackId = (size = BLOCK_SIZE) => `blocks-desc-${size}`;
const blockRecord = (index = 0, size = BLOCK_SIZE) =>
  storage().loadProgress().blockStudy?.tracks?.[trackId(size)]?.blocks?.[index];

describe("block study, wired into the app", () => {
  // rollPracticeRewards throws dice at 0.15, 0.08, 0.04 and 0.2, so how many
  // overlays a run has to dismiss varies. The loops above cope with that by
  // reading the screen instead of counting clicks — they pass across the whole
  // range of the dice — but pinning the value on top of that keeps a CI run
  // reproducible: a failure here can be replayed exactly. Above every
  // threshold, so only the streak-driven rewards fire, and those are fixed.
  beforeEach(() => {
    installStorage();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  // Vitest runs without globals, so Testing Library's automatic cleanup is
  // not installed: without this each test's DOM stacks on the last one and
  // every query finds several matches.
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
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

    it("freezes the elapsed time on the way out", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();

      const stored = storage().loadActiveBlockSession();
      expect(stored.pausedElapsedSec).toBeGreaterThanOrEqual(0);
      expect(stored.pausedElapsedSec).toBeLessThan(60);
    });

    it("resumes at the frozen time, not at the wall clock since it started", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();

      // A block opened two hours ago but only worked on for 42 seconds: the
      // stored startedAt is a stale wall-clock instant, and pausedElapsedSec
      // is the only honest number in the record.
      const stored = storage().loadActiveBlockSession();
      storage().saveActiveBlockSession({
        ...stored,
        startedAt: Date.now() - 2 * 60 * 60 * 1000,
        pausedElapsedSec: 42,
      });

      render(<AppContent allQuestions={BANK} />);

      // The timer chip is the observable proof: rebuilding startedAt from the
      // frozen value shows 00:42. Skip the rebuild and it reads 120:00.
      expect(readBlockTimer()).toBeGreaterThanOrEqual(40);
      expect(readBlockTimer()).toBeLessThanOrEqual(45);

      // And it is re-frozen near 42 seconds on the way out, not near two hours.
      const reStored = storage().loadActiveBlockSession();
      expect(reStored.pausedElapsedSec).toBeGreaterThanOrEqual(40);
      expect(reStored.pausedElapsedSec).toBeLessThanOrEqual(45);
    });

    it("comes back with the hint and the options removed by 50/50 still gone", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        inventory: { ...EMPTY_PROGRESS.inventory, hints: 1, fiftyFifty: 1 },
      });

      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      clickButton(/^💡$/);
      clickButton(/^✂️$/);

      expect(screen.getByText(/Pista:/)).toBeTruthy();
      expect(screen.getAllByText("Opción eliminada")).toHaveLength(2);
      first.unmount();

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Pregunta numero 60")).toBeTruthy();
      expect(screen.getByText(/Pista:/)).toBeTruthy();
      expect(screen.getAllByText("Opción eliminada")).toHaveLength(2);
    });

    it("is written under this cert only", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();

      expect(storage().loadActiveBlockSession()).not.toBeNull();
      expect(createStorage("gcp-pca").loadActiveBlockSession()).toBeNull();
    });

    it("neither adopts nor deletes a block interrupted in another cert", () => {
      // Built from a real PDE session rather than by hand: the shape is what
      // matters and only the storage key differs between certs.
      const first = render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      first.unmount();
      const pcaSession = { ...storage().loadActiveBlockSession(), id: "pca-block-session" };
      createStorage("gcp-pca").saveActiveBlockSession(pcaSession);
      globalThis.window.localStorage.removeItem(`${CERT_ID}.activeBlockSession.v1`);

      // PDE now has no block of its own. Mounting it must not adopt PCA's...
      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Bloques de estudio")).toBeTruthy();
      expect(storage().loadActiveBlockSession()).toBeNull();

      // ...and clearing its own empty slot must not reach across the namespace.
      expect(createStorage("gcp-pca").loadActiveBlockSession()).toEqual(pcaSession);
    });
  });

  describe("rewards over a question", () => {
    it("moves on by itself once a claimed reward is dismissed", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();

      // A streak of three queues a wheel, so the third answer offers to claim
      // it instead of moving on.
      answerCurrent();
      answerCurrent();
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Comprobar/);
      expect(findButton(/^Reclamar recompensa \(1\)/)).toBeTruthy();

      clickButton(/^Reclamar recompensa/);
      clickButton(/^SALTAR$/);

      // Dismissing it continues the session rather than parking on the
      // answered question with a Siguiente still to press.
      expect(screen.getByText("Pregunta numero 57")).toBeTruthy();
      expect(findButton(/^Comprobar/)).toBeTruthy();
    });

    it("moves on just the same when the reward is turned down", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();

      // A streak of five queues a chest, which used to have to be opened.
      for (let i = 0; i < 4; i += 1) answerCurrent();
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Comprobar/);
      clickButton(/^Reclamar recompensa/);
      expect(findButton(/^ABRIR COFRE$/)).toBeTruthy();

      clickButton(/^SALTAR$/);

      // Skipped, so nothing was opened and nothing was paid out — but the
      // session carries on rather than parking on the answered question.
      expect(screen.getByText("Pregunta numero 55")).toBeTruthy();
      expect(storage().loadProgress().stats.chestsOpened).toBe(0);
    });
  });

  describe("what the block tab reports", () => {
    it("shows a finished block's score on its detail panel", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      finishBlock();
      clickButton(/^Volver al menú$/);

      // Straight onto the block tab, where the round just played must be
      // reflected — the tab reads progress through AppContent, not directly.
      expect(screen.getAllByText("Reviewed 1x")).toHaveLength(2);
      expect(screen.getByText("Repetir vuelta 2")).toBeTruthy();
      expect(screen.getAllByText("100%").length).toBeGreaterThan(0);
    });

    it("resets the selection to the first block when the size changes", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^Bloque 3/);
      // A selected block is named twice: on its grid tile and as the heading
      // of the detail panel. An unselected one only on its tile.
      expect(screen.getAllByText(/^Bloque 3$/)).toHaveLength(2);

      clickButton(/^15 preguntas$/);

      // Recutting the track puts the selection back at the start rather than
      // leaving it pointing at a block that means something else now.
      expect(screen.getAllByText(/^Bloque 1$/)).toHaveLength(2);
      expect(screen.getAllByText(/^Bloque 3$/)).toHaveLength(1);
      expect(screen.getByText("Track de 15 preguntas cargado.")).toBeTruthy();
      expect(storage().loadBlockPrefs().blockIndex).toBe(0);
    });

    it("clears the track message when another block is picked from the grid", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^15 preguntas$/);
      expect(screen.getByText("Track de 15 preguntas cargado.")).toBeTruthy();

      clickButton(/^Bloque 2/);

      // The message described the recut, so it stops applying as soon as the
      // selection moves. The arrows below the panel leave it standing.
      expect(screen.queryByText("Track de 15 preguntas cargado.")).toBeNull();
    });

    it("keeps the header shortcut but drops In progress when the track changes", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^Bloque 2/);
      clickButton(/^Empezar bloque$/);
      answerCurrent();
      // Leaving a half-answered block asks first; it is kept, not discarded.
      vi.spyOn(window, "confirm").mockReturnValue(true);
      clickButton(/^← Menú$/);

      // Same track: the interrupted block is both offered and marked.
      expect(findButton(/^Continuar B2$/)).toBeTruthy();
      expect(screen.getAllByText("In progress").length).toBeGreaterThan(0);

      clickButton(/^15 preguntas$/);

      // Different track: the shortcut survives, the marker does not.
      expect(findButton(/^Continuar B2$/)).toBeTruthy();
      expect(screen.queryByText("In progress")).toBeNull();
    });
  });

  describe("finishing a block", () => {
    it("records the round, clears the active session and returns to the menu", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();

      finishBlock();

      expect(
        screen.getByText("Revisión"),
        "the block never reached its result screen",
      ).toBeTruthy();
      expect(storage().loadActiveBlockSession()).toBeNull();

      const record = blockRecord(0);
      expect(record, "the finished round was not written to progress").toBeTruthy();
      expect(record.rounds).toHaveLength(1);
      expect(record.lastPercent).toBe(100);
      expect(record.bestPercent).toBe(100);
      expect(record.blockSignature).toBeTruthy();

      clickButton(/^Volver al menú$/);
      expect(screen.getByText("Bloques de estudio")).toBeTruthy();
    });

    it("starts the next block straight from the result screen", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      finishBlock();

      clickButton(/^Siguiente bloque$/);

      // The second block of a 60-question bank cut at 25, running newest
      // first: 60→36 is done, so this one opens on 35.
      expect(screen.getByText("Pregunta numero 35")).toBeTruthy();
      expect(storage().loadActiveBlockSession().meta.blockStudy.blockIndex).toBe(1);
    });

    it("replays the same block from the result screen", () => {
      render(<AppContent allQuestions={BANK} />);
      startFirstBlock();
      finishBlock();

      clickButton(/^Repetir vuelta 2$/);

      expect(screen.getByText("Pregunta numero 60")).toBeTruthy();
      expect(storage().loadActiveBlockSession().meta.blockStudy.blockIndex).toBe(0);
    });

    it("offers no next block after the last one", () => {
      render(<AppContent allQuestions={BANK} />);
      openBlocks();
      clickButton(/^Bloque 3/);
      clickButton(/^(Empezar|Continuar) bloque/);
      finishBlock();

      expect(screen.getByText("Revisión")).toBeTruthy();
      expect(findButton(/^Siguiente bloque$/)).toBeFalsy();
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

  // The progress tab is the only menu view no session flows through, so this
  // is what proves ProgressView is wired to the live inventory at all.
  it("shows the inventory and achievements on the progress tab", () => {
    storage().saveProgress({
      ...EMPTY_PROGRESS,
      inventory: { ...EMPTY_PROGRESS.inventory, hints: 4 },
      achievements: ["first_blood"],
    });

    render(<AppContent allQuestions={BANK} />);
    clickButton(/^Inventario y logros →$/);

    expect(screen.getByText(/💡 4/)).toBeTruthy();
    expect(screen.queryByText("Sin items acumulados.")).toBeNull();
  });

  it("does not overwrite stored progress on mount", () => {
    storage().saveProgress({ ...EMPTY_PROGRESS, xp: 3210, achievements: ["first_blood"] });

    render(<AppContent allQuestions={BANK} />);

    const after = storage().loadProgress();
    expect(after.xp).toBe(3210);
    expect(after.achievements).toContain("first_blood");
  });
});
