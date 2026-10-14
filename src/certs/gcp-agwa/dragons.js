import { defineDragon } from "../../data/gamification.js";

// Topic-themed bosses. `topics` are canonical topics from domains.js.
export const DRAGONS = [
  defineDragon({
    id: "agwa_directory_golem",
    name: "Directory Golem",
    emoji: "\uD83D\uDDC4\uFE0F",
    tier: 2,
    topics: ["Users & Licensing", "OUs & Groups", "Domains & Resources"],
    topicLabel: "Directory & Groups",
  }),
  defineDragon({
    id: "agwa_services_sprite",
    name: "Services Sprite",
    emoji: "\uD83D\uDCEC",
    tier: 2,
    topics: ["Gmail", "Drive & Docs", "Meet, Chat & Calendar", "Gemini & AppSheet"],
    topicLabel: "Core Services",
  }),
  defineDragon({
    id: "agwa_vault_wyrm",
    name: "Vault Wyrm",
    emoji: "\uD83D\uDC3F\uFE0F",
    tier: 3,
    topics: ["Vault & Retention", "DLP & Classification"],
    topicLabel: "Governance & Compliance",
  }),
  defineDragon({
    id: "agwa_security_basilisk",
    name: "Security Basilisk",
    emoji: "\uD83D\uDEE1\uFE0F",
    tier: 3,
    topics: ["Authentication & SSO", "Admin Roles & App Access"],
    topicLabel: "Security & Access",
  }),
  defineDragon({
    id: "agwa_endpoint_hydra",
    name: "Endpoint Hydra",
    emoji: "\uD83D\uDCBB",
    tier: 3,
    topics: ["Mobile Devices", "Chrome & Endpoints"],
    topicLabel: "Browsers & Endpoints",
  }),
  defineDragon({
    id: "agwa_triage_phoenix",
    name: "Triage Phoenix",
    emoji: "\uD83D\uDD0D",
    tier: 4,
    topics: ["Reports, Alerts & Investigation", "Mail Flow & Troubleshooting"],
    topicLabel: "Monitoring & Troubleshooting",
  }),
];
