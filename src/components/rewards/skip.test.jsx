// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DRAGONS } from "../../data/gamification.js";
import { installCanvasStub } from "../../test/canvas-stub.js";
import { BossBattle } from "./BossBattle.jsx";
import { MysteryChest } from "./MysteryChest.jsx";
import { ScratchCard } from "./ScratchCard.jsx";
import { SpinWheel } from "./SpinWheel.jsx";

/**
 * Every reward can be turned down.
 *
 * Skipping forfeits the prize — onClose without onComplete — which is what
 * the wheel and the boss battle already did. The chest and the scratch card
 * had no way out at all: the scratch card in particular could only be closed
 * by scratching it to the end.
 */

installCanvasStub();

const QUESTION = {
  id: 1,
  topic: "BigQuery",
  difficulty: 2,
  question: "Pregunta",
  options: ["A", "B", "C", "D"],
  correct: 0,
  explanation: "e.",
};

// The first dragon of the bestiary, so the shape stays true to the real one.
const DRAGON = DRAGONS[0];

describe("skipping a reward", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.2);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const cases = [
    ["the wheel", (props) => <SpinWheel {...props} />],
    ["the chest", (props) => <MysteryChest {...props} />],
    ["the scratch card", (props) => <ScratchCard {...props} />],
    [
      "the boss battle",
      (props) => <BossBattle questions={[QUESTION]} dragon={DRAGON} {...props} />,
    ],
  ];

  it.each(cases)("%s offers a way out", (_name, renderReward) => {
    render(renderReward({ onComplete: () => {}, onClose: () => {} }));
    expect(screen.getByText("SALTAR")).toBeTruthy();
  });

  it.each(cases)("%s closes without paying out when skipped", (_name, renderReward) => {
    const onComplete = vi.fn();
    const onClose = vi.fn();
    render(renderReward({ onComplete, onClose }));

    fireEvent.click(screen.getByText("SALTAR"));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("stops offering to skip the chest once it is open", () => {
    render(<MysteryChest onComplete={() => {}} onClose={() => {}} />);
    fireEvent.click(screen.getByText("ABRIR COFRE"));

    // The prize is on screen now, so the way out is to take it.
    expect(screen.queryByText("SALTAR")).toBeNull();
    expect(screen.getByText("Recoger")).toBeTruthy();
  });

  it("takes the chest prize when it is opened rather than skipped", () => {
    const onComplete = vi.fn();
    const onClose = vi.fn();
    render(<MysteryChest onComplete={onComplete} onClose={onClose} />);

    fireEvent.click(screen.getByText("ABRIR COFRE"));
    fireEvent.click(screen.getByText("Recoger"));

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
