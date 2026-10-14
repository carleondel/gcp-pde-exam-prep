import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "ace_network_kraken",
    name: "Network Kraken",
    emoji: "\uD83D\uDC19",
    tier: 2,
    topics: ["Networking", "Network Operations"],
    topicLabel: "Networking",
  }),
  defineDragon({
    id: "ace_compute_wyvern",
    name: "Compute Wyvern",
    emoji: "\uD83D\uDC32",
    tier: 2,
    topics: ["Compute", "Compute Operations"],
    topicLabel: "Compute & GKE",
  }),
  defineDragon({
    id: "ace_storage_golem",
    name: "Storage Golem",
    emoji: "\uD83D\uDDFF",
    tier: 3,
    topics: ["Storage & Databases", "Data Operations"],
    topicLabel: "Storage & Databases",
  }),
  defineDragon({
    id: "ace_iam_basilisk",
    name: "IAM Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["IAM", "Service Accounts"],
    topicLabel: "IAM & Service Accounts",
  }),
  defineDragon({
    id: "ace_ops_hydra",
    name: "Ops Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 3,
    topics: ["Monitoring & Logging"],
    topicLabel: "Monitoring & Logging",
  }),
  defineDragon({
    id: "ace_org_phoenix",
    name: "Org Phoenix",
    emoji: "\uD83D\uDD25",
    tier: 4,
    topics: ["Resource Hierarchy", "Billing", "IaC & Tooling"],
    topicLabel: "Setup & Governance",
  }),
];
