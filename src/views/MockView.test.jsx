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
      preferRecent={false}
      onPreferRecentChange={() => {}}
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
    const onPreferRecentChange = vi.fn();
    render_({ onPreferRecentChange });

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onPreferRecentChange).toHaveBeenCalledWith(true);
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
        preferRecent={false}
        onPreferRecentChange={() => {}}
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
