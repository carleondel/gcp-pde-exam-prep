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
  question: `Question number ${i + 1}`,
  options: [CORRECT, "B. incorrecta", "C. otra", "D. otra mas"],
  correct: 0,
  explanation: "Answer explanation.",
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

      const tile = buttons().find((b) => /^⚡Quick practice/.test(b.textContent));
      const advertised = Number(tile.textContent.match(/(\d+) questions/)[1]);
      fireEvent.click(tile);

      expect(progressCounter()).toBe(`1/${advertised}`);
    });

    it("offers nothing to review before anything has been failed", () => {
      render(<AppContent allQuestions={BANK} />);

      const tile = buttons().find((b) => /^↺Review mistakes/.test(b.textContent));
      expect(tile.disabled).toBe(true);
      expect(tile.textContent).toContain("No mistakes");
    });

    it("reviews only the failed questions once there are some", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, wrongQuestionIds: [3, 7, 11] });
      render(<AppContent allQuestions={BANK} />);

      const tile = buttons().find((b) => /^↺Review mistakes/.test(b.textContent));
      expect(tile.textContent).toContain("3 pending");
      fireEvent.click(tile);

      expect(progressCounter()).toBe("1/3");
    });

    it("opens each of the other tabs", () => {
      render(<AppContent allQuestions={BANK} />);

      clickButton(/^◷Mock exam/);
      expect(screen.getByText("Start mock exam")).toBeTruthy();
      clickButton(/^← Home$/);

      clickButton(/^Custom session →$/);
      expect(screen.getByText("Topics by domain")).toBeTruthy();
      clickButton(/^← Home$/);

      clickButton(/^Inventory & achievements →$/);
      expect(screen.getByText("No items collected yet.")).toBeTruthy();
      clickButton(/^← Home$/);

      clickButton(/^See all →$/);
      expect(screen.getByText("Fixed study rounds")).toBeTruthy();
    });
  });

  describe("what it recommends next", () => {
    it("suggests the first block on a fresh install", () => {
      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Next suggested block.")).toBeTruthy();
      expect(screen.getByText(/^Start Block 1/)).toBeTruthy();
    });

    it("starts the block it suggests", () => {
      render(<AppContent allQuestions={BANK} />);

      clickButton(/^Start$/);

      expect(screen.getByText("Question number 60")).toBeTruthy();
      expect(storage().loadActiveBlockSession().meta.blockStudy.blockIndex).toBe(0);
    });

    // Not tested across a remount: a stored block is restored straight into
    // the quiz, so the home screen never gets a chance to recommend it. What
    // is tested is stepping out of a block into the menu.
    it("prefers an unfinished block over the suggestion", () => {
      render(<AppContent allQuestions={BANK} />);
      clickButton(/^See all →$/);
      clickButton(/^Block 2/);
      clickButton(/^Start block$/);
      clickButton(/^← Menu$/);
      clickButton(/^← Home$/);

      expect(screen.getByText("Your current block is half done.")).toBeTruthy();
      expect(screen.getByText("Continue Block 2")).toBeTruthy();
      expect(screen.queryByText("Next suggested block.")).toBeNull();
    });

    it("resumes that block on the question it was left on", () => {
      render(<AppContent allQuestions={BANK} />);
      clickButton(/^Start$/);
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      clickButton(/^(Next|See results) \(Enter\)$/);
      vi.spyOn(window, "confirm").mockReturnValue(true);
      clickButton(/^← Menu$/);

      clickButton(/^Continue$/);

      expect(screen.getByText("Question number 59")).toBeTruthy();
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
      expect(screen.getByText("Reinforce D5 Maintaining")).toBeTruthy();
      expect(screen.getByText(/Your weakest domain: 20% over 20 attempts/)).toBeTruthy();
      expect(screen.queryByText("Next suggested block.")).toBeNull();
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
      clickButton(/^Practice$/);

      // Straight onto the practice tab with that domain's topics selected.
      expect(screen.getByText("Loaded D5 Maintaining topics.")).toBeTruthy();
      expect(screen.getByText("Max available (20)")).toBeTruthy();
    });
  });

  describe("the block grid", () => {
    it("opens the block tab on the square that was clicked", () => {
      render(<AppContent allQuestions={BANK} />);

      fireEvent.click(screen.getByTitle(/^Block 3 · not started$/));

      expect(screen.getByText("Fixed study rounds")).toBeTruthy();
      expect(screen.getAllByText(/^Block 3$/)).toHaveLength(2);
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

      expect(screen.getByTitle("Block 1 · 1 round")).toBeTruthy();
    });
  });

  describe("the daily challenge", () => {
    it("offers today's challenge and runs it", () => {
      render(<AppContent allQuestions={BANK} />);

      const offer = screen.getByText(/^\d+ questions · \+\d+ XP$/);
      const offered = Number(offer.textContent.match(/^(\d+)/)[1]);
      clickButton(/^Start challenge$/);

      // A short practice session of exactly the advertised length.
      expect(progressCounter()).toBe(`1/${offered}`);
    });

    it("shows it as done once it has been completed today", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        dailyChallenge: { lastCompletedDate: getTodayString() },
      });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("Completed")).toBeTruthy();
      expect(findButton(/^Start challenge$/)).toBeFalsy();
    });
  });

  describe("the summary cards", () => {
    it("shows the rank and the XP behind it", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, xp: 4200, achievements: ["first_blood"] });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.getByText("4200 XP")).toBeTruthy();
      expect(screen.getByText("1 achievements unlocked")).toBeTruthy();
    });

    it("does not announce achievements that were already unlocked", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, achievements: ["first_blood", "streak3"] });

      render(<AppContent allQuestions={BANK} />);

      expect(screen.queryByText("Achievement unlocked")).toBeNull();
    });

    it("loads the weakest topics into a practice session", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        topicHistory: { Security: history(20, 4), BigQuery: history(20, 20) },
      });

      render(<AppContent allQuestions={BANK} />);
      expect(screen.getByText("Security")).toBeTruthy();

      clickButton(/^Load set$/);

      // Stays on the home screen; the quick-practice tile is what changes.
      const tile = buttons().find((b) => /^⚡Quick practice/.test(b.textContent));
      expect(tile.textContent).toContain("Weakest areas");
    });
  });
});
