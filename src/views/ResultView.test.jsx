// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { installCanvasStub } from "../test/canvas-stub.js";
import ResultView from "./ResultView.jsx";

/**
 * Component tests for the result screen.
 *
 * The block and mock paths are already covered end to end by the integration
 * suites; what is here are the branches those cannot reach cheaply — the
 * daily challenge, the headline thresholds, and the two buttons that appear
 * only under a condition.
 */

installCanvasStub();

const question = (id, topic = "BigQuery") => ({
  id,
  topic,
  question: `Pregunta ${id}`,
  options: ["A. correcta", "B. incorrecta"],
  correct: 0,
});

const entry = (id, correct, topic) => ({
  question: question(id, topic),
  questionId: id,
  correct,
  selectedIndexes: [correct ? 0 : 1],
});

function practiceResult(overrides = {}) {
  const history = [entry(1, true), entry(2, false, "Dataflow")];
  return {
    mode: "practice",
    history,
    summary: {
      score: 1,
      answered: 2,
      percent: 50,
      xpGained: 120,
      maxStreak: 1,
      ...overrides.summary,
    },
    blockStudy: null,
    ...overrides,
  };
}

const noop = () => {};
const render_ = (props) =>
  render(
    <ResultView
      result={practiceResult()}
      onGoToMenu={noop}
      onReviewMockMistakes={noop}
      onRepeat={noop}
      onNextBlock={null}
      {...props}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("ResultView", () => {
  describe("the headline", () => {
    it("praises a strong practice session", () => {
      render_({ result: practiceResult({ summary: { percent: 85, score: 2, answered: 2 } }) });
      expect(screen.getByText("Sesión excelente")).toBeTruthy();
    });

    it("is encouraging about a middling one", () => {
      render_({ result: practiceResult({ summary: { percent: 65 } }) });
      expect(screen.getByText("Buen entrenamiento")).toBeTruthy();
    });

    it("does not scold a weak one", () => {
      render_({ result: practiceResult({ summary: { percent: 20 } }) });
      expect(screen.getByText("Seguimos iterando")).toBeTruthy();
    });

    it("names the daily challenge as its own thing", () => {
      render_({
        result: practiceResult({ mode: "daily", summary: { percent: 90, dailyBonus: 50 } }),
      });
      expect(screen.getByText("Reto diario superado")).toBeTruthy();
      expect(screen.getByText("Reto diario")).toBeTruthy();
    });

    it("shows the daily bonus in the line under it", () => {
      render_({
        result: practiceResult({ mode: "daily", summary: { xpGained: 200, dailyBonus: 50 } }),
      });
      expect(screen.getByText(/incluye \+50 bonus reto/)).toBeTruthy();
    });
  });

  describe("what it lists", () => {
    it("breaks the session down by topic", () => {
      render_();
      // Once in the per-topic bars and once beside the question in the
      // review list, so both topics turn up twice.
      expect(screen.getAllByText("BigQuery")).toHaveLength(2);
      expect(screen.getAllByText("Dataflow")).toHaveLength(2);
      expect(screen.getByText("Rendimiento por tema")).toBeTruthy();
    });

    it("lists every question answered, right and wrong", () => {
      render_();
      expect(screen.getByText("Pregunta 1")).toBeTruthy();
      expect(screen.getByText("Pregunta 2")).toBeTruthy();
    });

    it("shows the right answer for the ones that were missed", () => {
      render_();
      expect(screen.getByText(/Resp: A\./)).toBeTruthy();
    });
  });

  describe("the actions", () => {
    it("goes back to the menu", () => {
      const onGoToMenu = vi.fn();
      render_({ onGoToMenu });
      fireEvent.click(screen.getByText("Volver al menú"));
      expect(onGoToMenu).toHaveBeenCalledTimes(1);
    });

    it("offers another session of the same kind", () => {
      const onRepeat = vi.fn();
      render_({ onRepeat });
      fireEvent.click(screen.getByText("Seguir practicando"));
      expect(onRepeat).toHaveBeenCalledTimes(1);
    });

    it("hides the next-block button when there is no next block", () => {
      render_({ onNextBlock: null });
      expect(screen.queryByText("Siguiente bloque")).toBeNull();
    });

    it("offers the next block when the caller supplies one", () => {
      const onNextBlock = vi.fn();
      render_({ onNextBlock });
      fireEvent.click(screen.getByText("Siguiente bloque"));
      expect(onNextBlock).toHaveBeenCalledTimes(1);
    });

    it("does not offer to review mistakes after a practice session", () => {
      render_();
      expect(screen.queryByText(/Repasar errores/)).toBeNull();
    });

    it("offers to review the mistakes of a failed mock", () => {
      const onReviewMockMistakes = vi.fn();
      render_({
        result: {
          mode: "mock",
          history: [entry(1, true), entry(2, false, "Dataflow")],
          summary: {
            score: 1,
            answered: 2,
            questionCount: 2,
            percent: 50,
            passed: false,
            elapsedSec: 90,
            byTopic: { BigQuery: { correct: 1, total: 1 }, Dataflow: { correct: 0, total: 1 } },
          },
        },
        onReviewMockMistakes,
      });

      expect(screen.getByText("Simulacro completado")).toBeTruthy();
      fireEvent.click(screen.getByText(/Repasar errores \(1\)/));
      expect(onReviewMockMistakes).toHaveBeenCalledTimes(1);
    });

    it("does not offer to review a flawless mock", () => {
      render_({
        result: {
          mode: "mock",
          history: [entry(1, true)],
          summary: {
            score: 1,
            answered: 1,
            questionCount: 1,
            percent: 100,
            passed: true,
            elapsedSec: 30,
            byTopic: { BigQuery: { correct: 1, total: 1 } },
          },
        },
      });

      expect(screen.getByText("Simulacro superado")).toBeTruthy();
      expect(screen.queryByText(/Repasar errores/)).toBeNull();
    });
  });
});
