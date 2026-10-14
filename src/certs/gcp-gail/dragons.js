import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "gail_foundation_sprite",
    name: "Foundation Sprite",
    emoji: "\u2728",
    tier: 2,
    topics: ["Gen AI Concepts", "ML Approaches", "Data & Privacy", "Gen AI Landscape"],
    topicLabel: "Gen AI Fundamentals",
  }),
  defineDragon({
    id: "gail_agent_wyvern",
    name: "Agent Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 3,
    topics: ["Agent Platform & Models", "Search & Agents", "Gemini Apps & Workspace"],
    topicLabel: "Offerings & Agents",
  }),
  defineDragon({
    id: "gail_engagement_hydra",
    name: "Engagement Hydra",
    emoji: "\uD83D\uDD25",
    tier: 3,
    topics: ["Customer Engagement", "Cloud Strengths & Security", "Secure AI"],
    topicLabel: "Engagement & Security",
  }),
  defineDragon({
    id: "gail_strategy_phoenix",
    name: "Strategy Phoenix",
    emoji: "\uD83E\uDDE9",
    tier: 4,
    topics: [
      "Prompt Engineering",
      "Grounding & RAG",
      "Model Settings & Oversight",
      "Strategy & Adoption",
      "Responsible AI",
    ],
    topicLabel: "Techniques & Strategy",
  }),
];
