// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import QuizView from "./QuizView.jsx";

/**
 * Badge coverage for questions whose ExamTopics number is unconfirmed
 * (sourceNumberConfirmed === false). The badge must surface the estimate so a
 * question number guessed from mirror sites never looks like ground truth.
 */

const QUESTION = {
  id: 85,
  topic: "Reports, Alerts & Investigation",
  difficulty: 1,
  question: "Sample question?",
  options: ["A. one", "B. two", "C. three", "D. four"],
  correct: 0,
  explanation: "Because.",
  discussion: [],
  source: "devin-validated",
  sourceQuestionNumber: 85,
  isRecent: true,
};

const INVENTORY = {
  shields: 0,
  fiftyFifty: 0,
  hints: 0,
  skips: 0,
  wheelSpins: 0,
  scratchCards: 0,
  chestKeys: 0,
  bossKeys: 0,
};

const render_ = (question) =>
  render(
    <QuizView
      question={question}
      caseStudies={{}}
      bookmarked={false}
      answer={{
        isMulti: false,
        showHint: false,
        showResult: false,
        selectedIndexes: [],
        hiddenOptions: [],
        evaluation: null,
      }}
      session={{
        mode: "practice",
        score: 0,
        answered: 0,
        pendingRewards: 0,
      }}
      inventory={INVENTORY}
      canUsePowerUps={false}
      scrollRef={() => {}}
      onSelectOption={() => {}}
      onSubmit={() => {}}
      onAdvance={() => {}}
      onToggleDiscussion={() => {}}
      onToggleRationales={() => {}}
      onToggleBookmark={() => {}}
      onUseHint={() => {}}
      onUse5050={() => {}}
      onUseSkip={() => {}}
      onConsumeReward={() => {}}
      onCancelMock={() => {}}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("QuizView unconfirmed-number badge", () => {
  it("shows the badge when the source number is unconfirmed", () => {
    render_({
      ...QUESTION,
      sourceNumberConfirmed: false,
      sourceNumberNote: "Number estimated from other sites.",
    });
    expect(screen.getByText("Unconfirmed #85")).toBeTruthy();
  });

  it("is absent when the field is unset or true", () => {
    render_(QUESTION);
    expect(screen.queryByText(/Unconfirmed #/)).toBeNull();
    cleanup();
    render_({ ...QUESTION, sourceNumberConfirmed: true });
    expect(screen.queryByText(/Unconfirmed #/)).toBeNull();
  });
});
