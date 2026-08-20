import { describe, expect, it } from "vitest";

import {
  clampPercent,
  formatDuration,
  formatPracticeBadge,
  getPercentTone,
  sameSet,
} from "./formatting.js";

describe("sameSet", () => {
  it("matches sets with the same members", () => {
    expect(sameSet(new Set([1, 2]), new Set([2, 1]))).toBe(true);
  });

  it("separates sets of different sizes", () => {
    expect(sameSet(new Set([1]), new Set([1, 2]))).toBe(false);
  });

  it("separates same-sized sets with different members", () => {
    expect(sameSet(new Set([1, 2]), new Set([1, 3]))).toBe(false);
  });

  it("treats two empty sets as equal", () => {
    expect(sameSet(new Set(), new Set())).toBe(true);
  });
});

describe("formatPracticeBadge", () => {
  it("uses the singular for exactly one", () => {
    expect(formatPracticeBadge(1, "tema", "temas")).toBe("1 tema");
  });

  it("uses the plural for anything else, zero included", () => {
    expect(formatPracticeBadge(3, "tema", "temas")).toBe("3 temas");
    expect(formatPracticeBadge(0, "tema", "temas")).toBe("0 temas");
  });

  it("falls back to the singular when no plural is given", () => {
    expect(formatPracticeBadge(5, "items")).toBe("5 items");
  });
});

describe("formatDuration", () => {
  it("pads to mm:ss", () => {
    expect(formatDuration(0)).toBe("00:00");
    expect(formatDuration(5)).toBe("00:05");
    expect(formatDuration(65)).toBe("01:05");
  });

  it("keeps counting minutes past an hour rather than rolling over", () => {
    expect(formatDuration(7200)).toBe("120:00");
  });

  it("clamps a negative remaining time to zero instead of showing -01:-30", () => {
    expect(formatDuration(-90)).toBe("00:00");
  });
});

describe("clampPercent", () => {
  it("passes a normal percentage through", () => {
    expect(clampPercent(72)).toBe(72);
  });

  it("rounds to a whole number", () => {
    expect(clampPercent(72.6)).toBe(73);
  });

  it("holds the value inside 0..100", () => {
    expect(clampPercent(-20)).toBe(0);
    expect(clampPercent(140)).toBe(100);
  });

  it("returns null for values that are not numbers", () => {
    expect(clampPercent(undefined)).toBeNull();
    expect(clampPercent("hola")).toBeNull();
    expect(clampPercent(NaN)).toBeNull();
  });

  it("reads a numeric string", () => {
    expect(clampPercent("80")).toBe(80);
  });

  // Documents current behaviour rather than endorsing it: Number(null) is 0,
  // so an explicit null reads as a genuine 0% while undefined reads as "no
  // data". Callers reach this through optional chaining, which yields
  // undefined, so the asymmetry is not reachable today — but it is a trap
  // for whoever stores an explicit null later.
  it("treats an explicit null as zero, unlike undefined", () => {
    expect(clampPercent(null)).toBe(0);
    expect(clampPercent(undefined)).toBeNull();
  });
});

describe("getPercentTone", () => {
  it("gives a muted tone and no value when there is nothing to show", () => {
    const tone = getPercentTone(undefined);
    expect(tone.value).toBeNull();
    expect(tone.shadow).toBe("none");
    expect(tone.text).toBe("var(--text-tertiary)");
  });

  it("carries the clamped value through", () => {
    expect(getPercentTone(88.4).value).toBe(88);
    expect(getPercentTone(150).value).toBe(100);
  });

  it("always returns the full set of style fields, whatever the input", () => {
    const fields = ["value", "text", "border", "gradient", "gradientStrong", "shadow"];
    for (const percent of [undefined, 0, 49, 50, 69, 70, 89, 90, 100]) {
      const tone = getPercentTone(percent);
      for (const field of fields) {
        expect(tone, `${percent} → ${field}`).toHaveProperty(field);
      }
    }
  });

  it("changes colour as the score crosses each band", () => {
    const colours = [0, 50, 70, 90].map((percent) => getPercentTone(percent).text);
    expect(new Set(colours).size).toBe(4);
  });

  it("reserves the brightest tone for the top band", () => {
    expect(getPercentTone(95).text).toBe("var(--highlight)");
  });
});
