import { describe, expect, it } from "vitest";

import { computeReadiness } from "./readiness.js";

const questions = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, isRecent: i >= 6 }));

const block = (questionIds, lastPercent, lastStudiedAt = 1) => ({
  questionIds,
  lastPercent,
  lastStudiedAt,
  rounds: [{ percent: lastPercent }],
});

describe("computeReadiness", () => {
  it("has no data before any block or mock", () => {
    const readiness = computeReadiness({ questions, passPercent: 70 });
    expect(readiness).toMatchObject({ percent: 0, covered: 0, total: 4, hasData: false });
  });

  it("scores unplayed recent questions as zero", () => {
    const readiness = computeReadiness({
      questions,
      blockTracks: { t: { blocks: { 0: block([9, 10], 80) } } },
      passPercent: 70,
    });
    expect(readiness).toMatchObject({ percent: 40, covered: 2, total: 4, passing: false });
  });

  it("ignores questions outside the recent set", () => {
    const readiness = computeReadiness({
      questions,
      blockTracks: { t: { blocks: { 0: block([1, 2, 7, 8, 9, 10], 100) } } },
      passPercent: 70,
    });
    expect(readiness).toMatchObject({ percent: 100, covered: 4, passing: true });
  });

  it("uses the most recently studied block when tracks overlap", () => {
    const readiness = computeReadiness({
      questions,
      blockTracks: {
        a: { blocks: { 0: block([7, 8, 9, 10], 40, 1) } },
        b: { blocks: { 0: block([7, 8, 9, 10], 90, 2) } },
      },
      passPercent: 70,
    });
    expect(readiness.blockPercent).toBe(90);
  });

  it("skips blocks that were never finished", () => {
    const readiness = computeReadiness({
      questions,
      blockTracks: { t: { blocks: { 0: { ...block([7, 8, 9, 10], 90), rounds: [] } } } },
      passPercent: 70,
    });
    expect(readiness.covered).toBe(0);
  });

  it("blends blocks and the last three mocks half and half", () => {
    const readiness = computeReadiness({
      questions,
      blockTracks: { t: { blocks: { 0: block([7, 8, 9, 10], 60) } } },
      mockHistory: [{ percent: 90 }, { percent: 80 }, { percent: 70 }, { percent: 0 }],
      passPercent: 70,
    });
    expect(readiness).toMatchObject({ blockPercent: 60, mockPercent: 80, mockCount: 3 });
    expect(readiness.percent).toBe(70);
    expect(readiness.passing).toBe(true);
  });

  it("falls back to the whole bank when nothing is flagged recent", () => {
    const plain = questions.map(({ id }) => ({ id }));
    const readiness = computeReadiness({ questions: plain, passPercent: 70 });
    expect(readiness).toMatchObject({ total: 10, scope: "all" });
  });
});
