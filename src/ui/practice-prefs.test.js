import { describe, expect, it } from "vitest";

import { BLOCK_SIZE_PRESETS, DEFAULT_BLOCK_SIZE } from "../engine/block-study.js";
import {
  DEFAULT_PRACTICE_LIMIT,
  PRACTICE_PRESETS,
  PRACTICE_SOURCE_META,
  sanitizeBlockSize,
  sanitizePracticeLimit,
  sanitizePracticeOrder,
  sanitizePracticeSource,
  sanitizePracticeTopics,
} from "./practice-prefs.js";

// These values come back from localStorage, so every test here stands in
// for a save written by an older build or edited by hand.

describe("sanitizePracticeOrder", () => {
  it("keeps the orders the engine implements", () => {
    for (const order of ["random", "sequential", "recent-desc"]) {
      expect(sanitizePracticeOrder(order)).toBe(order);
    }
  });

  it("falls back to random for anything else", () => {
    expect(sanitizePracticeOrder("alphabetical")).toBe("random");
    expect(sanitizePracticeOrder(undefined)).toBe("random");
    expect(sanitizePracticeOrder(null)).toBe("random");
    expect(sanitizePracticeOrder(42)).toBe("random");
  });
});

describe("sanitizePracticeSource", () => {
  it("keeps every source the UI offers", () => {
    for (const source of Object.keys(PRACTICE_SOURCE_META)) {
      expect(sanitizePracticeSource(source)).toBe(source);
    }
  });

  it("falls back to topics for a source that no longer exists", () => {
    expect(sanitizePracticeSource("retired-source")).toBe("topics");
    expect(sanitizePracticeSource(undefined)).toBe("topics");
  });

  it("is not fooled by names inherited from Object.prototype", () => {
    for (const inherited of ["constructor", "toString", "valueOf", "hasOwnProperty"]) {
      expect(sanitizePracticeSource(inherited), inherited).toBe("topics");
    }
  });
});

describe("PRACTICE_SOURCE_META", () => {
  it("gives every source a label, a helper and an empty-state message", () => {
    for (const [key, meta] of Object.entries(PRACTICE_SOURCE_META)) {
      expect(meta.label, `${key} label`).toBeTruthy();
      expect(meta.helper, `${key} helper`).toBeTruthy();
      expect(meta.empty, `${key} empty`).toBeTruthy();
    }
  });

  it("includes topics, which everything else falls back to", () => {
    expect(PRACTICE_SOURCE_META.topics).toBeDefined();
  });
});

describe("sanitizePracticeTopics", () => {
  const all = ["A", "B", "C"];

  it("keeps the topics that still exist", () => {
    expect(sanitizePracticeTopics(["A", "C"], all)).toEqual(["A", "C"]);
  });

  it("drops topics the bank no longer has", () => {
    expect(sanitizePracticeTopics(["A", "GONE"], all)).toEqual(["A"]);
  });

  it("removes duplicates", () => {
    expect(sanitizePracticeTopics(["A", "A", "B"], all)).toEqual(["A", "B"]);
  });

  it("selects everything rather than nothing when the saved list is unusable", () => {
    expect(sanitizePracticeTopics(["GONE"], all)).toEqual(all);
    expect(sanitizePracticeTopics([], all)).toEqual(all);
    expect(sanitizePracticeTopics(null, all)).toEqual(all);
    expect(sanitizePracticeTopics("A", all)).toEqual(all);
  });

  it("returns a copy, so the caller cannot mutate the topic list", () => {
    const result = sanitizePracticeTopics(null, all);
    result.push("D");
    expect(all).toEqual(["A", "B", "C"]);
  });
});

describe("sanitizePracticeLimit", () => {
  it("keeps a sensible count", () => {
    expect(sanitizePracticeLimit(25)).toBe(25);
  });

  it("reads a numeric string, which is what localStorage tends to hand back", () => {
    expect(sanitizePracticeLimit("30")).toBe(30);
  });

  it("floors a fractional count", () => {
    expect(sanitizePracticeLimit(20.9)).toBe(20);
  });

  it("falls back to the default for anything below one or not a number", () => {
    expect(sanitizePracticeLimit(0)).toBe(DEFAULT_PRACTICE_LIMIT);
    expect(sanitizePracticeLimit(-5)).toBe(DEFAULT_PRACTICE_LIMIT);
    expect(sanitizePracticeLimit("muchas")).toBe(DEFAULT_PRACTICE_LIMIT);
    expect(sanitizePracticeLimit(undefined)).toBe(DEFAULT_PRACTICE_LIMIT);
    expect(sanitizePracticeLimit(Infinity)).toBe(DEFAULT_PRACTICE_LIMIT);
  });

  it("has a default that is one of the presets offered in the UI", () => {
    expect(PRACTICE_PRESETS).toContain(DEFAULT_PRACTICE_LIMIT);
  });
});

describe("sanitizeBlockSize", () => {
  it("keeps every preset size", () => {
    for (const size of BLOCK_SIZE_PRESETS) {
      expect(sanitizeBlockSize(size)).toBe(size);
    }
  });

  it("reads a numeric string", () => {
    expect(sanitizeBlockSize(String(BLOCK_SIZE_PRESETS[0]))).toBe(BLOCK_SIZE_PRESETS[0]);
  });

  it("falls back to the default for a size that is not on offer", () => {
    expect(sanitizeBlockSize(7)).toBe(DEFAULT_BLOCK_SIZE);
    expect(sanitizeBlockSize(0)).toBe(DEFAULT_BLOCK_SIZE);
    expect(sanitizeBlockSize(undefined)).toBe(DEFAULT_BLOCK_SIZE);
    expect(sanitizeBlockSize("grande")).toBe(DEFAULT_BLOCK_SIZE);
  });

  it("has a default that is itself a preset", () => {
    expect(BLOCK_SIZE_PRESETS).toContain(DEFAULT_BLOCK_SIZE);
  });
});
