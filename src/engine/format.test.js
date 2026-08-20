import { describe, expect, it } from "vitest";

import { formatDumpDate } from "./format.js";

describe("formatDumpDate", () => {
  it("formats an ISO date in Spanish", () => {
    expect(formatDumpDate("2026-08-17")).toBe("17 ago 2026");
  });

  it("drops the leading zero from the day", () => {
    expect(formatDumpDate("2026-04-05")).toBe("5 abr 2026");
  });

  it("handles the first and last month", () => {
    expect(formatDumpDate("2026-01-01")).toBe("1 ene 2026");
    expect(formatDumpDate("2026-12-31")).toBe("31 dic 2026");
  });

  it("does not shift the date by a day", () => {
    // new Date("2026-01-01") is UTC midnight; rendered in a timezone west
    // of Greenwich that is still 31 December. Parsing by hand is the whole
    // reason this helper exists, so the guard is worth pinning down.
    expect(formatDumpDate("2026-01-01")).toContain("1 ene");
    expect(formatDumpDate("2026-01-01")).not.toContain("dic");
  });

  it("returns null when a cert has no dump date, so the label is omitted", () => {
    expect(formatDumpDate(undefined)).toBeNull();
    expect(formatDumpDate(null)).toBeNull();
    expect(formatDumpDate("")).toBeNull();
  });

  it("returns null rather than guessing at a malformed value", () => {
    expect(formatDumpDate("17/08/2026")).toBeNull();
    expect(formatDumpDate("2026-8-17")).toBeNull();
    expect(formatDumpDate("not a date")).toBeNull();
    expect(formatDumpDate(20260817)).toBeNull();
  });

  it("returns null for an impossible month", () => {
    expect(formatDumpDate("2026-13-01")).toBeNull();
    expect(formatDumpDate("2026-00-01")).toBeNull();
  });

  it("tolerates surrounding whitespace", () => {
    expect(formatDumpDate("  2026-08-17 ")).toBe("17 ago 2026");
  });
});
