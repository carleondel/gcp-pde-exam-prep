import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "pcde_selection_sphinx",
    name: "Selection Sphinx",
    emoji: "\uD83E\uDD81",
    tier: 2,
    topics: ["Database Selection", "Capacity Planning & Cost"],
    topicLabel: "Engine & Capacity",
  }),
  defineDragon({
    id: "pcde_network_kraken",
    name: "Network Kraken",
    emoji: "\uD83D\uDC19",
    tier: 2,
    topics: ["Connectivity & Networking", "Security & IAM"],
    topicLabel: "Connectivity & Security",
  }),
  defineDragon({
    id: "pcde_migration_leviathan",
    name: "Migration Leviathan",
    emoji: "\uD83D\uDC22",
    tier: 3,
    topics: ["Migration"],
    topicLabel: "Migration",
  }),
  defineDragon({
    id: "pcde_replica_hydra",
    name: "Replica Hydra",
    emoji: "\uD83D\uDC09",
    tier: 3,
    topics: ["High Availability & DR", "Replication & Read Replicas"],
    topicLabel: "HA & Replication",
  }),
  defineDragon({
    id: "pcde_ops_golem",
    name: "Ops Golem",
    emoji: "\uD83D\uDDFF",
    tier: 4,
    topics: ["Monitoring & Performance", "Backup & Recovery", "Operations & Maintenance"],
    topicLabel: "Ops & Recovery",
  }),
];
