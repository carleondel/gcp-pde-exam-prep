// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { installCanvasStub } from "./test/canvas-stub.js";
import { AppContent } from "./App.jsx";
import { createStorage, EMPTY_PROGRESS, getTodayString } from "./engine/storage.js";

/**
 * Integration tests for the landing screen.
 *
 * It is mostly a hub — a recommendation, four shortcuts and a way into every
 * other tab — so almost all of it is wiring, and wiring is only visible from
 * the real app.
 */

installCanvasStub();

const CERT_ID = "gcp-pde";
const CORRECT = "A. correcta";

const BANK = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  // Security sits alone in D5, so a run of wrong answers there makes it the
  // weakest domain without dragging the others down with it.
  topic: i < 20 ? "Security" : "BigQuery",
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
  Object.defineProperty(globalThis.window, "localStorage", {
    value: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
    },
    configurable: true,
  });
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
        .map((b) => b.textContent.slice(0, 30))
        .join(" | ")}`,
    );
  }
  fireEvent.click(button);
}

const progressCounter = () => screen.getByText(/^\d+\/\d+$/).textContent;

/** A topic history of `total` attempts, `correct` of them right. */
const history = (total, correct) =>
  Array.from({ length: total }, (_, i) => ({
    correct: i < correct,
    at: 1700000000000 + i,
    questionId: i + 1,
  }));

describe("the home screen, wired into the app", () => {
  beforeEach(() => {
    installStorage();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("the shortcuts", () => {
    it("launches a quick practice with the saved settings", () => {
      render(<AppContent allQuestions={BANK} />);

      const tile = buttons().find((b) => /^⚡Práctica rápida/.test(b.textContent));
      const advertised = Number(tile.textContent.match(/(\d+) preguntas/)[1]);
      fireEvent.click(tile);

      expect(progressCounter()).toBe(`1/${advertised}`);
    });

    it("offers nothing to review before anything has been failed", () => {
      render(<AppContent allQuestions={BANK} />);

      const tile = buttons().find((b) => /^↺Repasar fallos/.test(b.textContent));
      expect(tile.disabled).toBe(true);
      expect(tile.textContent).toContain("Sin fallos");
    });

    it("reviews only the failed questions once there are some", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, wrongQuestionIds: [3, 7, 11] });
      render(<AppContent allQuestions={BANK} />);

      const tile = buttons().find((b) => /^↺Repasar fallos/.test(b.textContent));
      expect(tile.textContent).toContain("3 pendientes");
      fireEvent.click(tile);

      expect(progressCounter()).toBe("1/3");
    });

    it("opens each of the other tabs", () => {
      render(<AppContent allQuestions={BANK} />);

      clickButton(/^◷Simulacro/);
      expect(screen.getByText("Iniciar simulacro")).toBeTruthy();
      clickButton(/^← Inicio$/);

      clickButton(/^Sesión a medida →$/);
      expect(screen.getByText("Temas por dominio")).toBeTruthy();
      clickButton(/^← Inicio$/);

      clickButton(/^Inventario y logros →$/);
      expect(screen.getByText("Sin items acumulados.")).toBeTruthy();
      clickButton(/^← Inicio$/);

      clickButton(/^Ver todos →$/);
      expect(screen.getByText("Rondas fijas de estudio")).toBeTruthy();
    });
  });

  describe("what it recommends next", () => {
    it("suggests the first block on a fresh install", () => {
      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Siguiente bloque sugerido.")).toBeTruthy();
      expect(screen.getByText(/^Empezar Bloque 1/)).toBeTruthy();
    });

    it("starts the block it suggests", () => {
      render(<AppContent allQuestions={BANK} />);

      clickButton(/^Empezar$/);

      expect(screen.getByText("Pregunta numero 60")).toBeTruthy();
      expect(storage().loadActiveBlockSession().meta.blockStudy.blockIndex).toBe(0);
    });

    // Not tested across a remount: a stored block is restored straight into
    // the quiz, so the home screen never gets a chance to recommend it. What
    // is tested is stepping out of a block into the menu.
    it("prefers an unfinished block over the suggestion", () => {
      render(<AppContent allQuestions={BANK} />);
      clickButton(/^Ver todos →$/);
      clickButton(/^Bloque 2/);
      clickButton(/^Empezar bloque$/);
      clickButton(/^← Menú$/);
      clickButton(/^← Inicio$/);

      expect(screen.getByText("Tu bloque actual esta a medias.")).toBeTruthy();
      expect(screen.getByText("Continuar Bloque 2")).toBeTruthy();
      expect(screen.queryByText("Siguiente bloque sugerido.")).toBeNull();
    });

    it("resumes that block on the question it was left on", () => {
      render(<AppContent allQuestions={BANK} />);
      clickButton(/^Empezar$/);
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Comprobar/);
      clickButton(/^(Siguiente|Ver resultados) \(Enter\)$/);
      vi.spyOn(window, "confirm").mockReturnValue(true);
      clickButton(/^← Menú$/);

      clickButton(/^Continuar$/);

      expect(screen.getByText("Pregunta numero 59")).toBeTruthy();
    });

    it("falls back to the weakest domain once every block is mastered", () => {
      // Security answered badly, everything else answered well, and the whole
      // track already mastered so the block suggestion steps aside.
      const tracks = { "blocks-desc-25": { blocks: {} } };
      for (let i = 0; i < 3; i += 1) {
        tracks["blocks-desc-25"].blocks[i] = {
          blockIndex: i,
          rounds: [
            { roundNumber: 1, percent: 100, correctCount: 25, questionCount: 25 },
            { roundNumber: 2, percent: 100, correctCount: 25, questionCount: 25 },
          ],
          lastPercent: 100,
          bestPercent: 100,
        };
      }
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        topicHistory: { Security: history(20, 4), BigQuery: history(20, 20) },
        blockStudy: { tracks },
      });

      render(<AppContent allQuestions={BANK} />);

      // Named by its exam domain, not by the topic underneath it.
      expect(screen.getByText("Reforzar D5 Maintaining")).toBeTruthy();
      expect(screen.getByText(/Tu dominio mas flojo: 20% con 20 intentos/)).toBeTruthy();
      expect(screen.queryByText("Siguiente bloque sugerido.")).toBeNull();
    });

    it("loads that domain's topics into the practice tab", () => {
      const tracks = { "blocks-desc-25": { blocks: {} } };
      for (let i = 0; i < 3; i += 1) {
        tracks["blocks-desc-25"].blocks[i] = {
          blockIndex: i,
          rounds: [
            { roundNumber: 1, percent: 100, correctCount: 25, questionCount: 25 },
            { roundNumber: 2, percent: 100, correctCount: 25, questionCount: 25 },
          ],
          lastPercent: 100,
          bestPercent: 100,
        };
      }
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        topicHistory: { Security: history(20, 4), BigQuery: history(20, 20) },
        blockStudy: { tracks },
      });

      render(<AppContent allQuestions={BANK} />);
      clickButton(/^Practicar$/);

      // Straight onto the practice tab with that domain's topics selected.
      expect(screen.getByText("Cargados temas de D5 Maintaining.")).toBeTruthy();
      expect(screen.getByText("Máximo disponible (20)")).toBeTruthy();
    });
  });

  describe("the block grid", () => {
    it("opens the block tab on the square that was clicked", () => {
      render(<AppContent allQuestions={BANK} />);

      fireEvent.click(screen.getByTitle(/^Bloque 3 · sin empezar$/));

      expect(screen.getByText("Rondas fijas de estudio")).toBeTruthy();
      expect(screen.getAllByText(/^Bloque 3$/)).toHaveLength(2);
      expect(storage().loadBlockPrefs().blockIndex).toBe(2);
    });

    it("reports how many rounds a block has had", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        blockStudy: {
          tracks: {
            "blocks-desc-25": {
              blocks: {
                0: {
                  blockIndex: 0,
                  rounds: [{ roundNumber: 1, percent: 64, correctCount: 16, questionCount: 25 }],
                  lastPercent: 64,
                  bestPercent: 64,
                },
              },
            },
          },
        },
      });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByTitle("Bloque 1 · 1 vuelta")).toBeTruthy();
    });
  });

  describe("the daily challenge", () => {
    it("offers today's challenge and runs it", () => {
      render(<AppContent allQuestions={BANK} />);

      const offer = screen.getByText(/^\d+ preguntas · \+\d+ XP$/);
      const offered = Number(offer.textContent.match(/^(\d+)/)[1]);
      clickButton(/^Iniciar reto$/);

      // A short practice session of exactly the advertised length.
      expect(progressCounter()).toBe(`1/${offered}`);
    });

    it("shows it as done once it has been completed today", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        dailyChallenge: { lastCompletedDate: getTodayString() },
      });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Completado")).toBeTruthy();
      expect(findButton(/^Iniciar reto$/)).toBeFalsy();
    });
  });

  describe("the summary cards", () => {
    it("shows the rank and the XP behind it", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, xp: 4200, achievements: ["first_blood"] });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("4200 XP")).toBeTruthy();
      expect(screen.getByText("1 logros desbloqueados")).toBeTruthy();
    });

    it("loads the weakest topics into a practice session", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        topicHistory: { Security: history(20, 4), BigQuery: history(20, 20) },
      });

      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Security")).toBeTruthy();

      clickButton(/^Cargar bloque$/);

      // Stays on the home screen; the quick-practice tile is what changes.
      const tile = buttons().find((b) => /^⚡Práctica rápida/.test(b.textContent));
      expect(tile.textContent).toContain("Peor rendimiento");
    });
  });
});
