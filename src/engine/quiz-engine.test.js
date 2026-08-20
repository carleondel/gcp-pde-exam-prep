import { describe, expect, it } from "vitest";

import {
  buildPracticeQuestions,
  canSubmitAnswer,
  computeMockDistribution,
  computeWeakTopics,
  evaluateAnswer,
  getCorrectOptionIndexes,
  isMultiQuestion,
  normalizeSelection,
  pushWrongQuestionId,
  WRONG_QUESTION_LIMIT,
} from "./quiz-engine.js";

const single = { id: 1, topic: "A", options: ["a", "b", "c", "d"], correct: 2 };
const multi = { id: 2, topic: "A", options: ["a", "b", "c", "d"], correct: [1, 3] };

const bank = (n, topic = "A") =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    topic,
    options: ["a", "b"],
    correct: 0,
    sourceQuestionNumber: i + 1,
  }));

describe("evaluateAnswer", () => {
  it("accepts the correct single answer", () => {
    expect(evaluateAnswer(single, 2).isCorrect).toBe(true);
  });

  it("rejects a wrong single answer", () => {
    expect(evaluateAnswer(single, 0).isCorrect).toBe(false);
  });

  it("requires every option of a multi-answer question", () => {
    expect(evaluateAnswer(multi, [1, 3]).isCorrect).toBe(true);
    expect(evaluateAnswer(multi, [1]).isCorrect).toBe(false);
  });

  it("rejects a superset — extra picks are not free", () => {
    const result = evaluateAnswer(multi, [1, 2, 3]);
    expect(result.isCorrect).toBe(false);
    expect(result.extraIndexes).toEqual([2]);
  });

  it("ignores the order the options were picked in", () => {
    expect(evaluateAnswer(multi, [3, 1]).isCorrect).toBe(true);
  });

  it("reports what was missing so the UI can explain the failure", () => {
    expect(evaluateAnswer(multi, [1]).missingIndexes).toEqual([3]);
  });
});

describe("question shape helpers", () => {
  it("tells single and multi answers apart", () => {
    expect(isMultiQuestion(single)).toBe(false);
    expect(isMultiQuestion(multi)).toBe(true);
  });

  it("normalises both answer shapes to an array", () => {
    expect(normalizeSelection(2)).toEqual([2]);
    expect(normalizeSelection([3, 1])).toEqual([1, 3]);
    expect(normalizeSelection(null)).toEqual([]);
  });

  it("reads the correct indexes for both shapes", () => {
    expect(getCorrectOptionIndexes(single)).toEqual([2]);
    expect(getCorrectOptionIndexes(multi)).toEqual([1, 3]);
  });

  it("blocks submitting a multi-answer with the wrong number of picks", () => {
    expect(canSubmitAnswer(multi, [1])).toBe(false);
    expect(canSubmitAnswer(multi, [1, 3])).toBe(true);
    expect(canSubmitAnswer(single, 2)).toBe(true);
    expect(canSubmitAnswer(single, null)).toBe(false);
  });
});

describe("buildPracticeQuestions", () => {
  it("caps at the requested limit", () => {
    expect(buildPracticeQuestions(bank(50), { limit: 10 })).toHaveLength(10);
  });

  it("returns everything available when the limit exceeds the pool", () => {
    expect(buildPracticeQuestions(bank(5), { limit: 20 })).toHaveLength(5);
  });

  it("filters by topic", () => {
    const mixed = [...bank(3, "A"), ...bank(2, "B")];
    const only = buildPracticeQuestions(mixed, { topicSet: new Set(["B"]), limit: 99 });
    expect(only.every((q) => q.topic === "B")).toBe(true);
  });

  it("keeps the given ids and their order when asked for specific questions", () => {
    const all = bank(10);
    const map = new Map(all.map((q) => [q.id, q]));
    const picked = buildPracticeQuestions(all, {
      questionIds: [7, 3],
      questionMap: map,
      limit: 99,
    });
    expect(picked.map((q) => q.id)).toEqual([7, 3]);
  });

  it("drops ids that no longer exist instead of yielding holes", () => {
    const all = bank(3);
    const map = new Map(all.map((q) => [q.id, q]));
    const picked = buildPracticeQuestions(all, {
      questionIds: [1, 999],
      questionMap: map,
      limit: 99,
    });
    expect(picked.map((q) => q.id)).toEqual([1]);
  });

  it("orders newest first for recent-desc", () => {
    const ordered = buildPracticeQuestions(bank(5), { order: "recent-desc", limit: 5 });
    expect(ordered.map((q) => q.sourceQuestionNumber)).toEqual([5, 4, 3, 2, 1]);
  });

  it("returns the same set under random order, only rearranged", () => {
    const ids = buildPracticeQuestions(bank(20), { order: "random", limit: 20 })
      .map((q) => q.id)
      .sort((a, b) => a - b);
    expect(ids).toEqual(bank(20).map((q) => q.id));
  });
});

describe("computeMockDistribution", () => {
  // The current PCA blueprint. Fractional weights are the reason this is
  // worth a test: they were what broke the older even-split assumption.
  const pca = [
    { id: 1, short: "D1", weight: 25 },
    { id: 2, short: "D2", weight: 17.5 },
    { id: 3, short: "D3", weight: 17.5 },
    { id: 4, short: "D4", weight: 15 },
    { id: 5, short: "D5", weight: 12.5 },
    { id: 6, short: "D6", weight: 12.5 },
  ];

  it("hands out exactly the requested number of questions", () => {
    for (const count of [10, 25, 50, 60]) {
      const total = computeMockDistribution(count, pca).reduce((sum, d) => sum + d.target, 0);
      expect(total).toBe(count);
    }
  });

  it("splits a 60-question mock the way the blueprint says", () => {
    const targets = computeMockDistribution(60, pca).map((d) => d.target);
    expect(targets).toEqual([15, 11, 11, 9, 7, 7]);
  });

  it("gives the heaviest domain the most questions", () => {
    const [first, ...rest] = computeMockDistribution(50, pca).map((d) => d.target);
    expect(first).toBeGreaterThanOrEqual(Math.max(...rest));
  });

  it("still totals correctly with whole-number weights", () => {
    const pde = [
      { id: 1, short: "D1", weight: 22 },
      { id: 2, short: "D2", weight: 25 },
      { id: 3, short: "D3", weight: 20 },
      { id: 4, short: "D4", weight: 15 },
      { id: 5, short: "D5", weight: 18 },
    ];
    const total = computeMockDistribution(50, pde).reduce((sum, d) => sum + d.target, 0);
    expect(total).toBe(50);
  });
});

describe("pushWrongQuestionId", () => {
  it("records a miss", () => {
    expect(pushWrongQuestionId([], 5, false)).toContain(5);
  });

  it("clears the question once answered correctly", () => {
    expect(pushWrongQuestionId([5], 5, true)).not.toContain(5);
  });

  it("does not store the same question twice", () => {
    const once = pushWrongQuestionId([], 5, false);
    expect(pushWrongQuestionId(once, 5, false).filter((id) => id === 5)).toHaveLength(1);
  });

  it("stays within the retention limit", () => {
    let list = [];
    for (let id = 1; id <= WRONG_QUESTION_LIMIT + 25; id += 1) {
      list = pushWrongQuestionId(list, id, false);
    }
    expect(list.length).toBeLessThanOrEqual(WRONG_QUESTION_LIMIT);
  });
});

describe("computeWeakTopics", () => {
  // Despite the name it does not filter by weakness: it ranks every topic
  // that has enough attempts to judge, worst accuracy first. Callers take
  // the head of the list — App.jsx uses the worst four.
  it("stays quiet until a topic has enough attempts to judge", () => {
    expect(computeWeakTopics({ A: [{ correct: false }, { correct: false }] })).toEqual([]);
  });

  it("ranks the weakest topic first", () => {
    const history = {
      strong: Array.from({ length: 10 }, () => ({ correct: true })),
      weak: Array.from({ length: 10 }, (_, i) => ({ correct: i < 2 })),
      middling: Array.from({ length: 10 }, (_, i) => ({ correct: i < 6 })),
    };
    expect(computeWeakTopics(history).map((entry) => entry.topic)).toEqual([
      "weak",
      "middling",
      "strong",
    ]);
  });

  it("reports the accuracy each ranking is based on", () => {
    const history = { A: Array.from({ length: 10 }, (_, i) => ({ correct: i < 3 })) };
    expect(computeWeakTopics(history)[0]).toMatchObject({
      topic: "A",
      attempts: 10,
      correct: 3,
      accuracy: 30,
    });
  });

  it("leaves out topics with too little data to rank fairly", () => {
    const history = {
      barely: [{ correct: false }, { correct: false }],
      enough: Array.from({ length: 10 }, () => ({ correct: true })),
    };
    expect(computeWeakTopics(history).map((entry) => entry.topic)).toEqual(["enough"]);
  });
});
