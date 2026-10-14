import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "psoe_platform_sprite",
    name: "Platform Sprite",
    emoji: "🧚",
    tier: 2,
    topics: ["Platform Setup", "Access Control"],
    topicLabel: "Platform Ops",
  }),
  defineDragon({
    id: "psoe_pipeline_wyvern",
    name: "Pipeline Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["Log Ingestion & Parsing", "Entity Context"],
    topicLabel: "Data Pipelines",
  }),
  defineDragon({
    id: "psoe_hunter_golem",
    name: "Hunter Golem",
    emoji: "\uD83D\uDDFF",
    tier: 3,
    topics: ["Threat Hunting", "Threat Intelligence"],
    topicLabel: "Threat Hunting",
  }),
  defineDragon({
    id: "psoe_detector_basilisk",
    name: "Detector Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Detection Rules", "Detection Tuning"],
    topicLabel: "Detection Engineering",
  }),
  defineDragon({
    id: "psoe_responder_hydra",
    name: "Responder Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 4,
    topics: ["Investigation & Containment", "Playbooks & Automation", "Case Management"],
    topicLabel: "Incident Response",
  }),
  defineDragon({
    id: "psoe_observer_phoenix",
    name: "Observer Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Dashboards & Reporting", "Health Monitoring"],
    topicLabel: "Observability",
  }),
];
