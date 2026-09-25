// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SHARED_DRAGONS } from "../../data/gamification.js";
import { BossBattle } from "./BossBattle.jsx";

const QUESTIONS = [
  {
    id: 1,
    topic: "Networking",
    difficulty: 1,
    question: "First question",
    options: ["Right one", "Wrong one"],
    correct: 0,
    explanation: "Because the first one is right.",
  },
  {
    id: 2,
    topic: "Networking",
    difficulty: 1,
    question: "Second question",
    options: ["X", "Y"],
    correct: 1,
    explanation: "Y it is.",
  },
];

const DRAGON = SHARED_DRAGONS[0];

function startBattle(props = {}) {
  render(
    <BossBattle
      questions={QUESTIONS}
      dragon={DRAGON}
      onComplete={() => {}}
      onClose={() => {}}
      {...props}
    />,
  );
  fireEvent.click(screen.getByText("FIGHT"));
}

describe("boss battle feedback", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("tells the player a correct answer was correct and explains it", () => {
    startBattle();
    fireEvent.click(screen.getByText("Right one"));
    fireEvent.click(screen.getByText(/ATTACK/));

    expect(screen.getByText("Correct")).toBeTruthy();
    expect(screen.getByText("Because the first one is right.")).toBeTruthy();
    expect(screen.getByText("First question")).toBeTruthy();
  });

  it("tells the player a wrong answer was wrong", () => {
    startBattle();
    fireEvent.click(screen.getByText("Wrong one"));
    fireEvent.click(screen.getByText(/ATTACK/));

    expect(screen.getByText("Incorrect")).toBeTruthy();
    expect(screen.getByText("Right one").closest("button").disabled).toBe(true);
  });

  it("moves to the next question only when the player asks for it", () => {
    startBattle();
    fireEvent.click(screen.getByText("Right one"));
    fireEvent.click(screen.getByText(/ATTACK/));
    fireEvent.click(screen.getByText("NEXT TURN"));

    expect(screen.getByText("Second question")).toBeTruthy();
    expect(screen.queryByText("Correct")).toBeNull();
  });

  it("shows the final answer before the result screen", () => {
    const onComplete = vi.fn();
    render(
      <BossBattle
        questions={QUESTIONS}
        dragon={{ ...DRAGON, hp: 1 }}
        onComplete={onComplete}
        onClose={() => {}}
      />,
    );
    fireEvent.click(screen.getByText("FIGHT"));
    fireEvent.click(screen.getByText("Right one"));
    fireEvent.click(screen.getByText(/ATTACK/));

    expect(screen.getByText("Correct")).toBeTruthy();
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ won: true }));

    fireEvent.click(screen.getByText("SEE RESULT"));
    expect(screen.getByText("VICTORY")).toBeTruthy();
  });
});
