import { describe, expect, it } from "vitest";

import {
  BLOCK_MASTERY_PERCENT,
  buildBlockCatalog,
  DEFAULT_BLOCK_SIZE,
  getBlockRoundNumber,
  getSuggestedBlockIndex,
  hasBlockChanged,
  isBlockMastered,
} from "./block-study.js";

const bank = (n) =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    topic: "A",
    options: ["a", "b"],
    correct: 0,
    sourceQuestionNumber: i + 1,
  }));

const rounds = (...percents) => ({ rounds: percents.map((percent) => ({ percent })) });

describe("buildBlockCatalog", () => {
  it("cuts the bank into blocks of the requested size", () => {
    const catalog = buildBlockCatalog(bank(75), 25);
    expect(catalog.blocks).toHaveLength(3);
    expect(catalog.blocks.every((block) => block.questionIds.length === 25)).toBe(true);
  });

  it("leaves the remainder in a shorter final block rather than dropping it", () => {
    const catalog = buildBlockCatalog(bank(55), 25);
    expect(catalog.blocks).toHaveLength(3);
    expect(catalog.blocks.at(-1).questionIds).toHaveLength(5);
  });

  it("places every question exactly once", () => {
    const catalog = buildBlockCatalog(bank(55), 25);
    const ids = catalog.blocks.flatMap((block) => block.questionIds);
    expect(new Set(ids).size).toBe(55);
    expect(ids).toHaveLength(55);
  });

  it("orders newest first, so block 1 holds the most recent questions", () => {
    const catalog = buildBlockCatalog(bank(50), 25);
    expect(catalog.blocks[0].orderNumbers[0]).toBe(50);
    expect(catalog.blocks.at(-1).orderNumbers.at(-1)).toBe(1);
  });

  it("falls back to the default size when given one that is not a preset", () => {
    expect(buildBlockCatalog(bank(30), 7).size).toBe(DEFAULT_BLOCK_SIZE);
  });

  it("is stable: the same bank produces the same signatures", () => {
    const first = buildBlockCatalog(bank(50), 25);
    const second = buildBlockCatalog(bank(50), 25);
    expect(first.blocks.map((b) => b.blockSignature)).toEqual(
      second.blocks.map((b) => b.blockSignature),
    );
  });

  it("copes with an empty bank", () => {
    expect(buildBlockCatalog([], 25).blocks).toEqual([]);
  });
});

describe("isBlockMastered", () => {
  it("needs two rounds — one good result is not mastery", () => {
    expect(isBlockMastered(rounds(100))).toBe(false);
  });

  it("accepts two consecutive rounds at or above the threshold", () => {
    expect(isBlockMastered(rounds(BLOCK_MASTERY_PERCENT, BLOCK_MASTERY_PERCENT))).toBe(true);
  });

  it("rejects when the most recent round dropped below", () => {
    expect(isBlockMastered(rounds(95, BLOCK_MASTERY_PERCENT - 1))).toBe(false);
  });

  it("looks only at the last two rounds, not the whole history", () => {
    expect(isBlockMastered(rounds(10, 20, 95, 90))).toBe(true);
  });

  it("treats a block with no progress as not mastered", () => {
    expect(isBlockMastered(null)).toBe(false);
    expect(isBlockMastered({})).toBe(false);
  });
});

describe("getBlockRoundNumber", () => {
  it("starts at one for a block never attempted", () => {
    expect(getBlockRoundNumber(null)).toBe(1);
  });

  it("counts the next round after the ones already played", () => {
    expect(getBlockRoundNumber(rounds(50, 60))).toBe(3);
  });
});

describe("hasBlockChanged", () => {
  const block = { blockSignature: "1:2:3" };

  it("says no when the stored signature still matches", () => {
    expect(hasBlockChanged(block, { blockSignature: "1:2:3" })).toBe(false);
  });

  it("says yes when the bank shifted under the saved progress", () => {
    expect(hasBlockChanged(block, { blockSignature: "1:2:9" })).toBe(true);
  });

  it("says no when there is nothing stored to compare against", () => {
    expect(hasBlockChanged(block, null)).toBe(false);
  });
});

describe("getSuggestedBlockIndex", () => {
  const catalog = buildBlockCatalog(bank(75), 25);
  const { trackId, blocks } = catalog;

  const withProgress = (byIndex) => ({
    blockStudy: { tracks: { [trackId]: { blocks: byIndex } } },
  });

  it("suggests the first block when nothing has been done", () => {
    expect(getSuggestedBlockIndex(blocks, { blockStudy: { tracks: {} } })).toBe(0);
  });

  it("skips blocks already mastered", () => {
    const progress = withProgress({
      0: rounds(90, 95),
      1: rounds(90, 95),
    });
    expect(getSuggestedBlockIndex(blocks, progress)).toBe(2);
  });

  it("returns to a block that was started but not mastered", () => {
    const progress = withProgress({
      0: rounds(90, 95),
      1: rounds(40),
    });
    expect(getSuggestedBlockIndex(blocks, progress)).toBe(1);
  });

  it("prefers the block left in progress over the computed suggestion", () => {
    const progress = withProgress({ 0: rounds(90, 95) });
    const active = { meta: { blockStudy: { trackId, blockIndex: 2 } } };
    expect(getSuggestedBlockIndex(blocks, progress, active)).toBe(2);
  });

  it("wraps to the first block once every block is mastered", () => {
    const progress = withProgress({
      0: rounds(90, 95),
      1: rounds(90, 95),
      2: rounds(90, 95),
    });
    expect(getSuggestedBlockIndex(blocks, progress)).toBe(0);
  });
});
