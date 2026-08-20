// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import TopicPicker from "./TopicPicker.jsx";

/**
 * Component tests for the topic picker.
 *
 * What is here is what a walk through the app cannot reach cheaply: the
 * tooltip only reports accuracy past ten attempts, and the tint follows four
 * thresholds that would each need a rigged history to produce.
 */

const entry = (topic, overrides = {}) => ({
  topic,
  domainId: 1,
  accuracy: null,
  correct: 0,
  total: 0,
  rawTopics: [topic],
  questionCount: 10,
  ...overrides,
});

const GROUPS = [
  { domainId: 1, domainShort: "D1 Designing", topics: [entry("Architecture"), entry("ML/AI")] },
  { domainId: 2, domainShort: "D2 Ingesting", topics: [entry("Dataflow")] },
];

const render_ = (props = {}) =>
  render(
    <TopicPicker
      groups={GROUPS}
      selectedTopics={new Set()}
      allSelected={false}
      onToggleAll={() => {}}
      onToggle={() => {}}
      onIsolate={() => {}}
      {...props}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("TopicPicker", () => {
  it("lays the topics out under their exam domain", () => {
    render_();
    expect(screen.getByText("D1 Designing")).toBeTruthy();
    expect(screen.getByText("D2 Ingesting")).toBeTruthy();
    expect(screen.getByTitle(/^Architecture:/)).toBeTruthy();
    expect(screen.getByTitle(/^Dataflow:/)).toBeTruthy();
  });

  describe("what a chip reports", () => {
    it("shows a dash instead of an accuracy that is not established yet", () => {
      render_();
      expect(screen.getAllByText("—")).toHaveLength(3);
    });

    it("counts attempts while there are too few to judge", () => {
      render_({
        groups: [{ ...GROUPS[0], topics: [entry("Architecture", { total: 4, correct: 3 })] }],
      });
      expect(screen.getByTitle("Architecture: 4 intentos · 10 preguntas")).toBeTruthy();
    });

    it("reports accuracy once there are ten attempts", () => {
      render_({
        groups: [
          {
            ...GROUPS[0],
            topics: [entry("Architecture", { total: 10, correct: 7, accuracy: 70 })],
          },
        ],
      });
      expect(screen.getByTitle("Architecture: 7/10 correctas · 10 preguntas")).toBeTruthy();
      expect(screen.getByText("70%")).toBeTruthy();
    });

    it("tints a selected chip by how well the topic is going", () => {
      const tintOf = (accuracy) => {
        cleanup();
        render_({
          groups: [{ ...GROUPS[0], topics: [entry("Architecture", { total: 20, accuracy })] }],
          selectedTopics: new Set(["Architecture"]),
        });
        return screen.getByTitle(/^Architecture:/).style.color;
      };

      expect(tintOf(95)).toBe("var(--highlight)");
      expect(tintOf(75)).toBe("var(--signal-correct)");
      expect(tintOf(55)).toBe("var(--signal-warning)");
      expect(tintOf(20)).toBe("var(--signal-wrong)");
    });

    it("leaves an unselected chip untinted whatever its accuracy", () => {
      render_({
        groups: [{ ...GROUPS[0], topics: [entry("Architecture", { total: 20, accuracy: 95 })] }],
        selectedTopics: new Set(),
      });
      expect(screen.getByTitle(/^Architecture:/).style.color).toBe("var(--text-secondary)");
    });
  });

  describe("selecting", () => {
    it("counts a chip as picked only when every topic behind it is", () => {
      const group = entry("Dataflow", { rawTopics: ["Dataflow", "Dataflow/BigQuery"] });
      const { rerender } = render_({
        groups: [{ domainId: 2, domainShort: "D2", topics: [group] }],
        selectedTopics: new Set(["Dataflow"]),
      });
      expect(screen.getByTitle(/^Dataflow:/).style.color).toBe("var(--text-secondary)");

      rerender(
        <TopicPicker
          groups={[{ domainId: 2, domainShort: "D2", topics: [group] }]}
          selectedTopics={new Set(["Dataflow", "Dataflow/BigQuery"])}
          allSelected={false}
          onToggleAll={() => {}}
          onToggle={() => {}}
          onIsolate={() => {}}
        />,
      );
      expect(screen.getByTitle(/^Dataflow:/).style.color).not.toBe("var(--text-secondary)");
    });

    it("hands the whole entry back when a chip is clicked", () => {
      const onToggle = vi.fn();
      render_({ onToggle });
      fireEvent.click(screen.getByTitle(/^Dataflow:/));
      expect(onToggle).toHaveBeenCalledWith(GROUPS[1].topics[0]);
    });

    it("isolates on a double click", () => {
      const onIsolate = vi.fn();
      render_({ onIsolate });
      fireEvent.doubleClick(screen.getByTitle(/^Dataflow:/));
      expect(onIsolate).toHaveBeenCalledWith(GROUPS[1].topics[0]);
    });

    it("offers to clear the selection when everything is picked", () => {
      const onToggleAll = vi.fn();
      render_({ allSelected: true, onToggleAll });
      fireEvent.click(screen.getByText("Deseleccionar todo"));
      expect(onToggleAll).toHaveBeenCalledTimes(1);
    });

    it("offers to pick everything when nothing is", () => {
      render_({ allSelected: false });
      expect(screen.getByText("Seleccionar todo")).toBeTruthy();
    });
  });
});
