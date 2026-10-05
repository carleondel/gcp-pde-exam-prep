// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import MockView from "./MockView.jsx";

const distribution = [
  { id: 1, short: "D1 Design", target: 25 },
  { id: 2, short: "D2 Operations", target: 25 },
];

const render_ = (props = {}) =>
  render(
    <MockView
      questionCount={50}
      durationSec={7200}
      passPercent={70}
      certShort="PDE"
      distribution={distribution}
      recentCount={150}
      recentOnly={false}
      onRecentOnlyChange={() => {}}
      onStart={() => {}}
      savedSession={null}
      onContinue={() => {}}
      history={[]}
      {...props}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("MockView", () => {
  it("shows the active certification's fixed exam shape", () => {
    render_();

    expect(screen.getByText("50 questions · 120 min")).toBeTruthy();
    expect(screen.getByText(/70\s*% to pass\./)).toBeTruthy();
    expect(screen.getByText("Official PDE distribution")).toBeTruthy();
    expect(screen.getByText(/D1 Design 25/)).toBeTruthy();
  });

  it("passes the current checkbox value to the caller", () => {
    const onRecentOnlyChange = vi.fn();
    render_({ onRecentOnlyChange });

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onRecentOnlyChange).toHaveBeenCalledWith(true);
  });

  it("offers a recent-only mock when the recent set fills it", () => {
    render_();

    expect(screen.getByText("Only the 150 most recent questions")).toBeTruthy();
  });

  it("says the recent set is topped up when it is smaller than the mock", () => {
    render_({ recentCount: 15 });

    expect(screen.getByText("Include all 15 recent questions")).toBeTruthy();
    expect(screen.getByText("Topped up at random from the rest of the bank.")).toBeTruthy();
  });

  it("hides the recent option when no question is marked recent", () => {
    render_({ recentCount: 0 });

    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("starts an attempt through the caller", () => {
    const onStart = vi.fn();
    render_({ onStart });

    fireEvent.click(screen.getByText("Start mock exam"));

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("only offers continuation when an attempt exists", () => {
    const onContinue = vi.fn();
    const { rerender } = render_({ onContinue });
    expect(screen.queryByText("Continue active mock exam")).toBeNull();

    rerender(
      <MockView
        questionCount={50}
        durationSec={7200}
        passPercent={70}
        certShort="PDE"
        distribution={distribution}
        recentOnly={false}
        onRecentOnlyChange={() => {}}
        onStart={() => {}}
        savedSession={{ currentIndex: 2 }}
        onContinue={onContinue}
        history={[]}
      />,
    );
    fireEvent.click(screen.getByText("Continue active mock exam"));

    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("shows recent history and its trend", () => {
    render_({
      history: [
        { date: "2026-08-20T10:00:00.000Z", percent: 90, passed: true },
        { date: "2026-08-19T10:00:00.000Z", percent: 70, passed: true },
      ],
    });

    expect(screen.getByText("History")).toBeTruthy();
    expect(screen.getByText("90% Pass")).toBeTruthy();
    expect(screen.getByText(/80%/)).toBeTruthy();
  });
});
