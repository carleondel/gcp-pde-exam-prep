import { describe, expect, it } from "vitest";

import { createDomainHelpers } from "./domain-helpers.js";

const { computeCanonicalTopicStats } = createDomainHelpers({
  topicMap: { Business: "Business Processes" },
  examDomains: [{ id: 1, topics: ["Business Processes", "Networking"] }],
});

const attempts = (total, correct) =>
  Array.from({ length: total }, (_, i) => ({ correct: i < correct, at: i, questionId: i }));

const statFor = (topic, history, counts) =>
  computeCanonicalTopicStats(history, counts).find((stat) => stat.topic === topic);

describe("canonical topic accuracy", () => {
  it("waits for ten attempts on a topic with plenty of questions", () => {
    const history = { Networking: attempts(9, 9) };
    expect(statFor("Networking", history, { Networking: 36 }).accuracy).toBeNull();

    history.Networking = attempts(10, 7);
    expect(statFor("Networking", history, { Networking: 36 }).accuracy).toBe(70);
  });

  // PCA's Business Processes has six questions: ten attempts would need the
  // player to repeat them, so a full pass through the topic has to be enough.
  it("reports accuracy once every question of a small topic is answered", () => {
    const counts = { "Business Processes": 6 };
    expect(statFor("Business Processes", { Business: attempts(5, 5) }, counts).accuracy).toBeNull();
    expect(statFor("Business Processes", { Business: attempts(6, 3) }, counts).accuracy).toBe(50);
  });

  it("keeps the ten-attempt floor when question counts are unknown", () => {
    expect(statFor("Networking", { Networking: attempts(6, 6) }).accuracy).toBeNull();
  });

  it("never reports accuracy without attempts", () => {
    expect(statFor("Networking", {}, { Networking: 0 }).accuracy).toBeNull();
  });
});
