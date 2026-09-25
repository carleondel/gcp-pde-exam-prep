import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pca_network_kraken",
    name: "Network Kraken",
    emoji: "\uD83D\uDC19",
    tier: 2,
    topics: ["Networking"],
    topicLabel: "Networking",
  }),
  defineDragon({
    id: "pca_compute_wyvern",
    name: "Compute Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["Compute"],
    topicLabel: "Compute & GKE",
  }),
  defineDragon({
    id: "pca_storage_golem",
    name: "Storage Golem",
    emoji: "\uD83D\uDDFF",
    tier: 3,
    topics: ["Storage & Databases"],
    topicLabel: "Storage & Databases",
  }),
  defineDragon({
    id: "pca_iam_basilisk",
    name: "IAM Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["Security/IAM", "Compliance"],
    topicLabel: "Security & Compliance",
  }),
  defineDragon({
    id: "pca_sre_hydra",
    name: "SRE Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 3,
    topics: ["Monitoring/SRE", "Reliability/DR"],
    topicLabel: "Reliability & SRE",
  }),
  defineDragon({
    id: "pca_devops_chimera",
    name: "DevOps Chimera",
    emoji: "\u2699\uFE0F",
    tier: 4,
    topics: ["DevOps/CI-CD", "Governance/IaC", "Development/APIs", "Business Processes"],
    topicLabel: "DevOps & Delivery",
  }),
  defineDragon({
    id: "pca_architect_phoenix",
    name: "Architect Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Architecture/Design", "Migration", "Cost Optimization"],
    topicLabel: "Solution Design",
  }),
];
