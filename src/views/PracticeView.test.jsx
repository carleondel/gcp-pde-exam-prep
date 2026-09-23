// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { PRACTICE_SOURCE_META } from "../ui/practice-prefs.js";
import PracticeView from "./PracticeView.jsx";

/**
 * Component tests for the practice tab.
 *
 * Everything the tab does with a real session is covered by the integration
 * suite. What is here is the state the app cannot easily be walked into: an
 * empty pool, which needs a bank with nothing in it.
 */

const SOURCE_OPTIONS = [
  { key: "topics", badge: "2 topics", disabled: false },
  { key: "wrong", badge: "0 mistakes", disabled: true },
];

const render_ = (props = {}) =>
  render(
    <PracticeView
      sourceOptions={SOURCE_OPTIONS}
      source="topics"
      summary={{ title: "By domain", subtitle: "Session filtered by domain.", badge: "2 topics" }}
      order="random"
      limit={20}
      effectiveLimit={20}
      maxCount={42}
      maxPresetLabel="Max available (42)"
      showCustomLimit={false}
      message=""
      ctaLabel="Start practice · 20 questions"
      hasQuestions
      topicPicker={<div>picker</div>}
      onSelectSource={() => {}}
      onBackToTopics={() => {}}
      onSelectOrder={() => {}}
      onToggleCustomLimit={() => {}}
      onSelectCount={() => {}}
      onCustomCountChange={() => {}}
      onStart={() => {}}
      {...props}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("PracticeView", () => {
  it("shows the topic picker only for the topics source", () => {
    render_();
    expect(screen.getByText("picker")).toBeTruthy();
    expect(screen.queryByText("Back to domains")).toBeNull();
  });

  it("swaps the picker for a summary on a derived source", () => {
    render_({
      source: "wrong",
      summary: { title: "Mistakes only", subtitle: "Review your mistakes.", badge: "3 mistakes" },
    });

    expect(screen.queryByText("picker")).toBeNull();
    expect(screen.getByText("Back to domains")).toBeTruthy();
    expect(screen.getAllByText("Mistakes only").length).toBeGreaterThan(0);
  });

  it("disables a source that has nothing behind it, and says why", () => {
    render_();
    const wrong = screen
      .getAllByRole("button")
      .find((button) => /^Mistakes only/.test(button.textContent));
    expect(wrong.disabled).toBe(true);
    expect(screen.getByText(PRACTICE_SOURCE_META.wrong.empty)).toBeTruthy();
  });

  describe("with an empty pool", () => {
    const empty = { hasQuestions: false, maxCount: 0, ctaLabel: "Set up your practice" };

    it("will not start and explains the source is empty", () => {
      render_(empty);
      const cta = screen
        .getAllByRole("button")
        .find((button) => button.textContent === "Set up your practice");
      expect(cta.disabled).toBe(true);
    });

    it("drops the count from the button that offers the maximum", () => {
      render_({ ...empty, maxPresetLabel: "Max available" });
      expect(screen.getByText("Max available")).toBeTruthy();
    });

    it("disables every preset count", () => {
      render_(empty);
      const presets = screen
        .getAllByRole("button")
        .filter((button) => /^\d+$/.test(button.textContent));
      expect(presets.length).toBeGreaterThan(0);
      expect(presets.every((button) => button.disabled)).toBe(true);
    });
  });

  it("shows the custom-count input only when it is open", () => {
    const closed = render_();
    expect(screen.queryByRole("spinbutton")).toBeNull();
    expect(screen.getByText("Customize")).toBeTruthy();
    closed.unmount();

    render_({ showCustomLimit: true, limit: 7 });
    expect(screen.getByRole("spinbutton").value).toBe("7");
    expect(screen.getByText("Hide custom")).toBeTruthy();
  });

  it("shows a message when there is one", () => {
    render_({ message: "Adjusted to 12 based on current availability." });
    expect(screen.getByText("Adjusted to 12 based on current availability.")).toBeTruthy();
  });
});
