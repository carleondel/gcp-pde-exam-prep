import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pcse_iam_basilisk",
    name: "IAM Basilisk",
    emoji: "\uD83D\uDC0D",
    tier: 3,
    topics: ["IAM", "Cloud Identity", "Resource Hierarchy"],
    topicLabel: "Access & IAM",
  }),
  defineDragon({
    id: "pcse_network_kraken",
    name: "Network Kraken",
    emoji: "\uD83D\uDC19",
    tier: 2,
    topics: ["Network Security"],
    topicLabel: "Network Security",
  }),
  defineDragon({
    id: "pcse_perimeter_drake",
    name: "Perimeter Drake",
    emoji: "\uD83D\uDD12",
    tier: 3,
    topics: ["VPC Service Controls", "Private Connectivity"],
    topicLabel: "Perimeters & Connectivity",
  }),
  defineDragon({
    id: "pcse_kms_golem",
    name: "KMS Golem",
    emoji: "\uD83D\uDD11",
    tier: 3,
    topics: ["Encryption & Keys", "Data Security"],
    topicLabel: "Encryption & Data",
  }),
  defineDragon({
    id: "pcse_dlp_wraith",
    name: "DLP Wraith",
    emoji: "\uD83D\uDC7B",
    tier: 4,
    topics: ["Sensitive Data Protection"],
    topicLabel: "Sensitive Data Protection",
  }),
  defineDragon({
    id: "pcse_ops_hydra",
    name: "Ops Hydra",
    emoji: "\uD83D\uDEA8",
    tier: 3,
    topics: ["Security Operations", "Logging & Monitoring", "Workload & Supply Chain"],
    topicLabel: "SecOps & Supply Chain",
  }),
  defineDragon({
    id: "pcse_compliance_phoenix",
    name: "Compliance Phoenix",
    emoji: "\u2696\uFE0F",
    tier: 4,
    topics: ["Compliance"],
    topicLabel: "Compliance",
  }),
];
