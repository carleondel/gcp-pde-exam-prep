import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pcdoe_org_golem",
    name: "Org Golem",
    emoji: "\uD83D\uDDFF",
    tier: 2,
    topics: ["Org & IAM", "Infrastructure as Code"],
    topicLabel: "Organization & IaC",
  }),
  defineDragon({
    id: "pcdoe_pipeline_wyvern",
    name: "Pipeline Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["CI/CD Pipelines", "Deployment Strategies"],
    topicLabel: "CI/CD & Deployments",
  }),
  defineDragon({
    id: "pcdoe_supply_chain_basilisk",
    name: "Supply Chain Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Supply Chain Security"],
    topicLabel: "Supply Chain Security",
  }),
  defineDragon({
    id: "pcdoe_slo_hydra",
    name: "SLO Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 3,
    topics: ["SLOs & Error Budgets", "Incident Management", "Reliability Design"],
    topicLabel: "SRE & Incidents",
  }),
  defineDragon({
    id: "pcdoe_observability_kraken",
    name: "Observability Kraken",
    emoji: "\uD83D\uDC19",
    tier: 3,
    topics: ["Logging", "Monitoring & Alerting"],
    topicLabel: "Logging & Monitoring",
  }),
  defineDragon({
    id: "pcdoe_debug_phoenix",
    name: "Debug Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Troubleshooting & APM", "Performance & Cost"],
    topicLabel: "Troubleshooting & Cost",
  }),
];
