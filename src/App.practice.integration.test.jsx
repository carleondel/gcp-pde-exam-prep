// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { installCanvasStub } from "./test/canvas-stub.js";
import { AppContent } from "./App.jsx";
import { createStorage, EMPTY_PROGRESS } from "./engine/storage.js";

/**
 * Integration tests for the custom-practice tab.
 *
 * The screen is almost entirely configuration, so a component test can only
 * show that a control fires its callback. What these check is the other half:
 * that the settings the screen shows are the ones a launched session uses.
 */

installCanvasStub();

const CERT_ID = "gcp-pde";
const CORRECT = "A. correcta";

// Two real PDE topics, so they resolve to different exam domains and the
// picker shows more than one group.
// "Dataflow" and "Dataflow/BigQuery" are two of the bank's raw topics that
// the cert maps onto the same canonical one, so the picker shows a single
// Dataflow chip standing for both. That is what makes the mapping testable.
const BANK = [
  ...Array.from({ length: 30 }, (_, i) => ({ id: i + 1, topic: "BigQuery" })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: i + 31, topic: "Dataflow" })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: i + 39, topic: "Dataflow/BigQuery" })),
].map((q) => ({
  // The newest six of the bank are flagged as recent imports, which is what
  // the "Recent" source draws from — it is about the import date, not
  // about what has been answered lately.
  isRecent: q.id > 36,
  ...q,
  difficulty: 2,
  question: `Question number ${q.id}`,
  options: [CORRECT, "B. incorrecta", "C. otra", "D. otra mas"],
  correct: 0,
  explanation: "Answer explanation.",
  discussion: [],
  sourceQuestionNumber: q.id,
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

const openPractice = () => clickButton(/^Custom session →$/);
const progressCounter = () => screen.getByText(/^\d+\/\d+$/).textContent;

/**
 * Runs a short practice session, answering two questions wrong, and comes
 * back to the practice tab — the cheapest way to give the derived sources
 * something to draw from.
 */
function failTwoQuestions() {
  clickButton(/^10$/);
  clickButton(/^Start practice/);
  for (let i = 0; i < 2; i += 1) {
    fireEvent.click(screen.getByText("B. incorrecta"));
    clickButton(/^Check/);
    clickButton(/^(Next|See results) \(Enter\)$/);
  }
  vi.spyOn(window, "confirm").mockReturnValue(true);
  clickButton(/^← Menu$/);
}

describe("custom practice, wired into the app", () => {
  beforeEach(() => {
    installStorage();
    // The order defaults to random; pinned so the questions a session opens
    // on are the same on every run.
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("the defaults", () => {
    it("starts with every topic selected and the whole bank available", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      expect(screen.getByText("Topics by domain")).toBeTruthy();
      expect(screen.getByText(`Max available (${BANK.length})`)).toBeTruthy();
    });

    it("launches the number of questions the button advertises", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      const cta = findButton(/^Start practice · \d+ questions/);
      const advertised = Number(cta.textContent.match(/(\d+) questions/)[1]);
      fireEvent.click(cta);

      expect(progressCounter()).toBe(`1/${advertised}`);
    });
  });

  describe("choosing how many", () => {
    it("uses a preset count", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      clickButton(/^10$/);
      expect(findButton(/^Start practice · 10 questions/)).toBeTruthy();

      clickButton(/^Start practice/);
      expect(progressCounter()).toBe("1/10");
    });

    it("uses a hand-typed count and keeps it after a remount", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Customize$/);
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "7" } });
      expect(findButton(/^Start practice · 7 questions/)).toBeTruthy();
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      openPractice();
      // A count that is not a preset reopens its own input on return.
      expect(screen.getByRole("spinbutton").value).toBe("7");
      expect(findButton(/^Start practice · 7 questions/)).toBeTruthy();
    });

    it("warns when the typed count is more than the pool holds", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Customize$/);
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "500" } });

      // The warning is transient: the settings hook clamps the stored count
      // on the next pass and reports the clamp instead.
      expect(
        screen.getByText(`Adjusted to ${BANK.length} based on current availability.`),
      ).toBeTruthy();
      // Clamped for the launch even though the field keeps what was typed.
      expect(findButton(new RegExp(`^Start practice · ${BANK.length} questions`))).toBeTruthy();
    });

    it("closes the custom input when a preset is chosen instead", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Customize$/);
      expect(screen.queryByRole("spinbutton")).toBeTruthy();

      clickButton(/^30$/);
      expect(screen.queryByRole("spinbutton")).toBeNull();
    });
  });

  describe("choosing which topics", () => {
    it("narrows the pool to a single topic on double click", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      // A count of 10 fits inside Dataflow's 12, so nothing is clamped and
      // the isolation message is the one left standing.
      clickButton(/^10$/);
      fireEvent.doubleClick(screen.getByTitle(/^Dataflow:/));

      expect(screen.getByText("Only Dataflow.")).toBeTruthy();
      // Both raw topics behind the chip, not just the one it is named after.
      expect(screen.getByText("Max available (12)")).toBeTruthy();
      expect(storage().loadPracticePrefs().topics.sort()).toEqual([
        "Dataflow",
        "Dataflow/BigQuery",
      ]);
    });

    it("only launches questions from the selected topic", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      fireEvent.doubleClick(screen.getByTitle(/^Dataflow:/));

      // The saved count of 20 no longer fits, so it is clamped to the pool
      // and says so rather than launching something else than advertised.
      expect(screen.getByText("Adjusted to 12 based on current availability.")).toBeTruthy();
      clickButton(/^Start practice/);

      expect(progressCounter()).toBe("1/12");
      expect(screen.getByText("Dataflow")).toBeTruthy();
    });

    it("toggles a topic off and back on", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      fireEvent.click(screen.getByTitle(/^Dataflow:/));
      // Turning the chip off drops both raw topics behind it at once.
      expect(screen.getByText("Max available (30)")).toBeTruthy();

      fireEvent.click(screen.getByTitle(/^Dataflow:/));
      expect(screen.getByText(`Max available (${BANK.length})`)).toBeTruthy();
    });

    it("refuses to start with nothing selected", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      clickButton(/^Deselect all$/);

      // Emptying the selection is reconciled straight back to everything
      // rather than leaving a session that cannot run — so the button is
      // still the one that clears, and the whole bank is still available.
      expect(screen.getByText("Topics adjusted to the ones currently available.")).toBeTruthy();
      expect(screen.getByText("Deselect all")).toBeTruthy();
      expect(screen.getByText(`Max available (${BANK.length})`)).toBeTruthy();
    });
  });

  describe("choosing a source", () => {
    it("offers no failed questions before anything has been answered", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      const wrong = buttons().find((b) => /^Mistakes only/.test(b.textContent));
      expect(wrong.disabled).toBe(true);
    });

    it("draws from the failed questions once there are some", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      failTwoQuestions();

      clickButton(/^Mistakes only/);
      // Announced as loaded, not as clamped: picking a derived source sizes
      // the session to it on the spot instead of leaving that to reconciliation.
      expect(screen.getByText("Mistakes only loaded.")).toBeTruthy();
      expect(findButton(/^Start practice · 2 questions/)).toBeTruthy();

      clickButton(/^Start practice/);
      expect(progressCounter()).toBe("1/2");
    });

    it("switches to newest-first when the recent source is picked", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();

      clickButton(/^Recent/);

      // Recency is the point of that source, so the order follows it.
      expect(screen.getByText("Recent loaded.")).toBeTruthy();
      expect(storage().loadPracticePrefs().order).toBe("recent-desc");
    });

    it("goes back to topics from a derived source", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      failTwoQuestions();

      // A derived source hides the topic picker and offers the way back.
      clickButton(/^Mistakes only/);
      expect(screen.queryByText("Topics by domain")).toBeNull();

      clickButton(/^Back to domains$/);
      expect(screen.getByText("Topics by domain")).toBeTruthy();
    });
  });

  describe("answering", () => {
    const startTen = () => {
      openPractice();
      clickButton(/^10$/);
      clickButton(/^Start practice/);
    };

    it("marks a question and keeps it for the bookmarks source", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();

      clickButton(/^☆$/);

      expect(findButton(/^★$/)).toBeTruthy();
      expect(storage().loadProgress().bookmarks).toHaveLength(1);
    });

    it("unmarks it again", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();
      clickButton(/^☆$/);
      clickButton(/^★$/);

      expect(findButton(/^☆$/)).toBeTruthy();
      expect(storage().loadProgress().bookmarks).toHaveLength(0);
    });

    it("selects an option with the number keys and submits with Enter", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();

      // Nothing is selected yet, so there is nothing to check.
      expect(findButton(/^Check/).disabled).toBe(true);

      fireEvent.keyDown(window, { key: "1" });
      expect(findButton(/^Check/).disabled).toBe(false);

      fireEvent.keyDown(window, { key: "Enter" });
      expect(screen.getByText(/Answer explanation/)).toBeTruthy();
    });

    it("moves to the next question with Enter once the answer is shown", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();
      fireEvent.keyDown(window, { key: "1" });
      fireEvent.keyDown(window, { key: "Enter" });

      fireEvent.keyDown(window, { key: "Enter" });

      expect(progressCounter()).toBe("2/10");
    });

    it("spends a hint and shows it", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        inventory: { ...EMPTY_PROGRESS.inventory, hints: 2 },
      });
      render(<AppContent allQuestions={BANK} />);
      startTen();

      clickButton(/^💡$/);

      expect(screen.getByText(/Hint:/)).toBeTruthy();
      expect(storage().loadProgress().inventory.hints).toBe(1);
      expect(storage().loadProgress().stats.powerupsUsed).toBe(1);
    });

    it("spends a 50/50 and removes two wrong options", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        inventory: { ...EMPTY_PROGRESS.inventory, fiftyFifty: 1 },
      });
      render(<AppContent allQuestions={BANK} />);
      startTen();

      clickButton(/^✂️$/);

      expect(screen.getAllByText("Option removed")).toHaveLength(2);
      // Never the right one, and the button is gone once it is spent.
      expect(screen.getByText(CORRECT)).toBeTruthy();
      expect(findButton(/^✂️$/)).toBeFalsy();
    });

    it("hides the power-ups once the answer is revealed", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        inventory: { ...EMPTY_PROGRESS.inventory, hints: 2 },
      });
      render(<AppContent allQuestions={BANK} />);
      startTen();
      expect(findButton(/^💡$/)).toBeTruthy();

      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);

      expect(findButton(/^💡$/)).toBeFalsy();
    });

    it("highlights the option that is picked, before it is checked", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();

      const option = screen.getByText(CORRECT).closest("button");
      expect(option.style.background).toBe("var(--surface-panel-muted)");

      fireEvent.click(screen.getByText(CORRECT));

      expect(option.style.background).toBe("var(--info-soft)");
    });

    it("ignores further clicks once the answer is showing", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      expect(screen.getByText("Correct")).toBeTruthy();

      fireEvent.click(screen.getByText("B. incorrecta"));

      // The question is settled: picking again must not re-judge it.
      expect(screen.getByText("Correct")).toBeTruthy();
      expect(screen.getByText("Correct 1/1")).toBeTruthy();
    });

    it("offers the results instead of another question on the last one", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Customize$/);
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "2" } });
      clickButton(/^Start practice/);

      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      expect(findButton(/^Next \(Enter\)$/)).toBeTruthy();
      clickButton(/^Next \(Enter\)$/);

      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);

      expect(findButton(/^See results \(Enter\)$/)).toBeTruthy();
      expect(findButton(/^Next \(Enter\)$/)).toBeFalsy();
    });

    /** XP is scaled down past 5,000 total — gamification.js XP_TIERS. */
    it("scales the award down once the total crosses a tier", () => {
      storage().saveProgress({ ...EMPTY_PROGRESS, xp: 4950 });
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^10$/);
      clickButton(/^Start practice/);

      // Still under 5,000, so this one is worth its full 78.
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      expect(screen.getAllByText("+78 XP").length).toBeGreaterThan(0);
      expect(storage().loadProgress().xp).toBeGreaterThanOrEqual(5000);
      clickButton(/^(Next|See results) \(Enter\)$/);

      // Over it now, so the next one is 86 raw at three quarters, not 86 flat.
      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      expect(screen.getAllByText("+65 XP").length).toBeGreaterThan(0);
      expect(screen.queryByText("+86 XP")).toBeNull();
    });

    /**
     * The same crossing, caused by a reward rather than by an answer — the
     * path where the scoring callback's missing progress.xp dependency looked
     * most likely to matter, since spending a chest changes neither the
     * session nor any inventory field the callback listed.
     *
     * It turned out not to: removing the dependency again leaves this passing,
     * and the callback still reads the post-chest total. Kept anyway, because
     * nothing else covers a reward moving the player across a tier.
     */
    it("scales the award down after a reward crosses a tier mid-question", () => {
      storage().saveProgress({
        ...EMPTY_PROGRESS,
        xp: 4950,
        inventory: { ...EMPTY_PROGRESS.inventory, chestKeys: 1 },
      });
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^10$/);
      clickButton(/^Start practice/);

      // 0.2 picks the common chest tier and stays clear of every reward
      // threshold in rollPracticeRewards, so the run stays deterministic.
      Math.random.mockReturnValue(0.2);

      clickButton(/^📦$/);
      clickButton(/^OPEN CHEST$/);
      clickButton(/^Collect$/);
      expect(storage().loadProgress().xp).toBe(5050);

      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);

      // 78 raw at three quarters. Scored against the stale 4,950 it was 78.
      expect(screen.getAllByText("+59 XP").length).toBeGreaterThan(0);
      expect(screen.queryByText("+78 XP")).toBeNull();
    });

    it("keeps the score in step as questions are answered", () => {
      render(<AppContent allQuestions={BANK} />);
      startTen();

      fireEvent.click(screen.getByText(CORRECT));
      clickButton(/^Check/);
      expect(screen.getByText("Correct 1/1")).toBeTruthy();
      clickButton(/^(Next|See results) \(Enter\)$/);

      fireEvent.click(screen.getByText("B. incorrecta"));
      clickButton(/^Check/);
      expect(screen.getByText("Correct 1/2")).toBeTruthy();
    });
  });

  describe("a question with several right answers", () => {
    const MULTI = [
      {
        id: 900,
        topic: "BigQuery",
        difficulty: 2,
        question: "Elige dos",
        options: [CORRECT, "B. tambien correcta", "C. otra", "D. otra mas"],
        correct: [0, 1],
        explanation: "Answer explanation.",
        discussion: [],
        sourceQuestionNumber: 900,
      },
      ...BANK.slice(0, 9),
    ];

    const startMulti = () => {
      openPractice();
      clickButton(/^Sequential$/);
      clickButton(/^10$/);
      clickButton(/^Start practice/);
    };

    it("says how many answers are still needed", () => {
      render(<AppContent allQuestions={MULTI} />);
      startMulti();

      expect(screen.getByText("Multiple answers")).toBeTruthy();
      expect(findButton(/^Check \(0\/2\)/)).toBeTruthy();

      fireEvent.click(screen.getByText(CORRECT));
      expect(findButton(/^Check \(1\/2\)/)).toBeTruthy();
    });

    it("will not check until every answer is picked", () => {
      render(<AppContent allQuestions={MULTI} />);
      startMulti();

      fireEvent.click(screen.getByText(CORRECT));
      expect(findButton(/^Check/).disabled).toBe(true);

      fireEvent.click(screen.getByText("B. tambien correcta"));
      expect(findButton(/^Check \(2\/2\)/).disabled).toBe(false);
    });

    it("lets a pick be taken back", () => {
      render(<AppContent allQuestions={MULTI} />);
      startMulti();

      fireEvent.click(screen.getByText(CORRECT));
      fireEvent.click(screen.getByText(CORRECT));

      expect(findButton(/^Check \(0\/2\)/)).toBeTruthy();
    });

    it("counts both answers as one correct question", () => {
      render(<AppContent allQuestions={MULTI} />);
      startMulti();

      fireEvent.click(screen.getByText(CORRECT));
      fireEvent.click(screen.getByText("B. tambien correcta"));
      clickButton(/^Check/);

      expect(screen.getByText("Correct 1/1")).toBeTruthy();
    });
  });

  describe("choosing an order", () => {
    it("remembers the order across a remount", () => {
      const first = render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Sequential$/);
      expect(storage().loadPracticePrefs().order).toBe("sequential");
      first.unmount();

      render(<AppContent allQuestions={BANK} />);
      openPractice();
      expect(storage().loadPracticePrefs().order).toBe("sequential");
    });

    it("runs a sequential session in bank order", () => {
      render(<AppContent allQuestions={BANK} />);
      openPractice();
      clickButton(/^Sequential$/);
      clickButton(/^10$/);
      clickButton(/^Start practice/);

      expect(screen.getByText("Question number 1")).toBeTruthy();
    });
  });
});
