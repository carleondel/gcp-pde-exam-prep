import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "bigquery_wyrm",
    name: "BigQuery Wyrm",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["BigQuery"],
    topicLabel: "BigQuery",
  }),
  defineDragon({
    id: "dataflow_serpent",
    name: "Dataflow Serpent",
    emoji: "\uD83D\uDC0D",
    tier: 2,
    topics: ["Dataflow"],
    topicLabel: "Dataflow",
  }),
  defineDragon({
    id: "ml_hydra",
    name: "ML Hydra",
    emoji: "\uD83E\uDDE0",
    tier: 3,
    topics: ["ML/AI"],
    topicLabel: "ML/AI",
  }),
  defineDragon({
    id: "storage_golem",
    name: "Storage Golem",
    emoji: "\uD83D\uDDFF",
    tier: 3,
    topics: ["Storage"],
    topicLabel: "Storage",
  }),
  defineDragon({
    id: "security_basilisk",
    name: "Security Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Security"],
    topicLabel: "Security",
  }),
  defineDragon({
    id: "pipeline_leviathan",
    name: "Pipeline Leviathan",
    emoji: "\uD83D\uDC33",
    tier: 4,
    topics: [
      "Dataflow",
      "Pub/Sub",
      "Dataproc",
      "Orchestration",
      "Data Migration",
      "Data Processing",
    ],
    topicLabel: "Data pipelines",
  }),
  defineDragon({
    id: "architect_phoenix",
    name: "Architect Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Architecture"],
    topicLabel: "Architecture",
  }),
];
