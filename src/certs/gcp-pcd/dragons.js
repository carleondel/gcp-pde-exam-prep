import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pcd_data_otter",
    name: "Data Otter",
    emoji: "\uD83E\uDDA6",
    tier: 2,
    topics: ["Data Storage"],
    topicLabel: "Data Storage",
  }),
  defineDragon({
    id: "pcd_devtools_crane",
    name: "DevTools Crane",
    emoji: "\uD83D\uDEE0\uFE0F",
    tier: 2,
    topics: ["Dev Environment", "Build & CI/CD", "Testing"],
    topicLabel: "Build & Test",
  }),
  defineDragon({
    id: "pcd_serverless_phoenix",
    name: "Serverless Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 3,
    topics: ["Cloud Run & Serverless", "Deployment Strategies"],
    topicLabel: "Serverless & Deployment",
  }),
  defineDragon({
    id: "pcd_k8s_kraken",
    name: "Kubernetes Kraken",
    emoji: "\uD83D\uDC19",
    tier: 3,
    topics: ["GKE"],
    topicLabel: "GKE",
  }),
  defineDragon({
    id: "pcd_security_basilisk",
    name: "IAM Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 4,
    topics: ["Security/IAM", "Application Design"],
    topicLabel: "Design & Security",
  }),
  defineDragon({
    id: "pcd_integration_hydra",
    name: "Integration Hydra",
    emoji: "\u26A1",
    tier: 4,
    topics: ["Messaging & Events", "Google Cloud APIs", "Observability"],
    topicLabel: "Integration & Observability",
  }),
];
