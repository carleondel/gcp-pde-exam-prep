// Mapping from raw question topics → canonical topics → 6 PSOE exam domains
//
// Domain names and weights follow the official Professional Security
// Operations Engineer exam guide: 14 / 14 / 19 / 22 / 21 / 10.

export const TOPIC_MAP = {
  // Domain 1 — Platform operations
  "Platform Setup": "Platform Setup",
  "Access Control": "Access Control",

  // Domain 2 — Data management
  "Log Ingestion & Parsing": "Log Ingestion & Parsing",
  "Entity Context": "Entity Context",

  // Domain 3 — Threat hunting
  "Threat Hunting": "Threat Hunting",
  "Threat Intelligence": "Threat Intelligence",

  // Domain 4 — Detection engineering
  "Detection Rules": "Detection Rules",
  "Detection Tuning": "Detection Tuning",

  // Domain 5 — Incident response
  "Investigation & Containment": "Investigation & Containment",
  "Playbooks & Automation": "Playbooks & Automation",
  "Case Management": "Case Management",

  // Domain 6 — Observability
  "Dashboards & Reporting": "Dashboards & Reporting",
  "Health Monitoring": "Health Monitoring",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Platform operations",
    short: "D1 Platform",
    weight: 14,
    topics: ["Platform Setup", "Access Control"],
  },
  {
    id: 2,
    name: "Data management",
    short: "D2 Data",
    weight: 14,
    topics: ["Log Ingestion & Parsing", "Entity Context"],
  },
  {
    id: 3,
    name: "Threat hunting",
    short: "D3 Hunting",
    weight: 19,
    topics: ["Threat Hunting", "Threat Intelligence"],
  },
  {
    id: 4,
    name: "Detection engineering",
    short: "D4 Detection",
    weight: 22,
    topics: ["Detection Rules", "Detection Tuning"],
  },
  {
    id: 5,
    name: "Incident response",
    short: "D5 Response",
    weight: 21,
    topics: ["Investigation & Containment", "Playbooks & Automation", "Case Management"],
  },
  {
    id: 6,
    name: "Observability",
    short: "D6 Observability",
    weight: 10,
    topics: ["Dashboards & Reporting", "Health Monitoring"],
  },
];
