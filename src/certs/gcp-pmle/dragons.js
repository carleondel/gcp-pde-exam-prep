import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pmle_lowcode_sprite",
    name: "Low-Code Sprite",
    emoji: "🧚",
    tier: 2,
    topics: ["BigQuery ML", "AutoML", "AI APIs & Gen AI"],
    topicLabel: "Low-Code AI",
  }),
  defineDragon({
    id: "pmle_data_wyvern",
    name: "Data Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["Data Preparation", "Notebooks & Prototyping", "Experiments & Evaluation"],
    topicLabel: "Data & Experiments",
  }),
  defineDragon({
    id: "pmle_training_golem",
    name: "Training Golem",
    emoji: "\uD83D\uDDFF",
    tier: 3,
    topics: ["Model Development", "Training", "Training Hardware"],
    topicLabel: "Model Training",
  }),
  defineDragon({
    id: "pmle_serving_basilisk",
    name: "Serving Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Model Serving", "Feature Store", "Serving Infrastructure"],
    topicLabel: "Model Serving",
  }),
  defineDragon({
    id: "pmle_pipeline_hydra",
    name: "Pipeline Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 4,
    topics: ["ML Pipelines", "CI/CD & Retraining"],
    topicLabel: "ML Pipelines",
  }),
  defineDragon({
    id: "pmle_monitoring_phoenix",
    name: "Monitoring Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Monitoring & Drift", "Responsible AI & Security"],
    topicLabel: "Monitoring & Responsible AI",
  }),
];
