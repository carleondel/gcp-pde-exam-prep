import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "adp_ingestion_serpent",
    name: "Ingestion Serpent",
    emoji: "🐍",
    tier: 2,
    topics: ["Ingestion & Transfer", "Storage Selection"],
    topicLabel: "Ingestion & Storage",
  }),
  defineDragon({
    id: "adp_sql_wyrm",
    name: "SQL Wyrm",
    emoji: "🐲",
    tier: 2,
    topics: ["BigQuery & SQL", "Data Preparation"],
    topicLabel: "SQL & Data Prep",
  }),
  defineDragon({
    id: "adp_insight_sphinx",
    name: "Insight Sphinx",
    emoji: "\uD83D\uDCCA",
    tier: 3,
    topics: ["Looker & Visualization", "Machine Learning"],
    topicLabel: "Analysis & ML",
  }),
  defineDragon({
    id: "adp_pipeline_leviathan",
    name: "Pipeline Leviathan",
    emoji: "🐳",
    tier: 3,
    topics: ["Pipelines & Processing", "Orchestration & Monitoring"],
    topicLabel: "Data pipelines",
  }),
  defineDragon({
    id: "adp_governance_basilisk",
    name: "Governance Basilisk",
    emoji: "\uD83D\uDEE1\uFE0F",
    tier: 4,
    topics: ["Security & Access", "Data Sharing & Governance", "Lifecycle & Availability"],
    topicLabel: "Data management",
  }),
];
