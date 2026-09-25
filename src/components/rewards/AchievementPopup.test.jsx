// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AchievementPopup } from "./AchievementPopup.jsx";

const ACHIEVEMENT = { id: "a", icon: "*", name: "First Blood", desc: "Do a thing" };

describe("achievement popup", () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  // The app re-renders every second in timed modes and hands the popup a
  // fresh onClose each time; that must not keep the popup on screen.
  it("closes on time even when the parent keeps re-rendering", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <AchievementPopup achievement={ACHIEVEMENT} onClose={() => onClose()} />,
    );

    for (let i = 0; i < 4; i++) {
      act(() => vi.advanceTimersByTime(1000));
      rerender(<AchievementPopup achievement={ACHIEVEMENT} onClose={() => onClose()} />);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("restarts the countdown for a newly unlocked achievement", () => {
    const onClose = vi.fn();
    const { rerender } = render(<AchievementPopup achievement={ACHIEVEMENT} onClose={onClose} />);

    act(() => vi.advanceTimersByTime(3000));
    rerender(<AchievementPopup achievement={{ ...ACHIEVEMENT, id: "b" }} onClose={onClose} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(onClose).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(600));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
