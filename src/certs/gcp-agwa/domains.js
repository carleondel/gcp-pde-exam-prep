// Mapping from raw question topics → canonical topics → 6 AGWA exam domains
//
// Domain names follow the official Associate Google Workspace Administrator
// exam guide. The guide lists weights of ~20 / ~23 / ~15 / ~20 / ~10 / ~13,
// which sum to 101 due to Google's rounding; they are normalized here to
// 20 / 22 / 15 / 20 / 10 / 13 so the registry total is exactly 100.

export const TOPIC_MAP = {
  // Domain 1 — Managing user accounts, domains, and Directory
  "Users & Licensing": "Users & Licensing",
  "OUs & Groups": "OUs & Groups",
  Groups: "OUs & Groups",
  "Domains & Resources": "Domains & Resources",
  Domains: "Domains & Resources",
  "Calendar Resources": "Domains & Resources",

  // Domain 2 — Managing core Workspace services
  Gmail: "Gmail",
  "Drive & Docs": "Drive & Docs",
  Drive: "Drive & Docs",
  "Meet, Chat & Calendar": "Meet, Chat & Calendar",
  Meet: "Meet, Chat & Calendar",
  Chat: "Meet, Chat & Calendar",
  Calendar: "Meet, Chat & Calendar",
  "Gemini & AppSheet": "Gemini & AppSheet",
  AppSheet: "Gemini & AppSheet",

  // Domain 3 — Managing data governance and compliance
  "Vault & Retention": "Vault & Retention",
  Vault: "Vault & Retention",
  "DLP & Classification": "DLP & Classification",
  DLP: "DLP & Classification",
  "Data Regions": "DLP & Classification",

  // Domain 4 — Managing security policies and access controls
  "Authentication & SSO": "Authentication & SSO",
  Authentication: "Authentication & SSO",
  "Admin Roles & App Access": "Admin Roles & App Access",
  "Admin Roles": "Admin Roles & App Access",
  "Context-Aware Access": "Admin Roles & App Access",

  // Domain 5 — Managing browsers and endpoints
  "Mobile Devices": "Mobile Devices",
  Mobile: "Mobile Devices",
  "Chrome & Endpoints": "Chrome & Endpoints",
  Chrome: "Chrome & Endpoints",

  // Domain 6 — Monitoring and troubleshooting common issues
  "Reports, Alerts & Investigation": "Reports, Alerts & Investigation",
  "Security Investigation": "Reports, Alerts & Investigation",
  "Mail Flow & Troubleshooting": "Mail Flow & Troubleshooting",
  "Mail Flow": "Mail Flow & Troubleshooting",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Managing user accounts, domains, and Directory",
    short: "D1 Directory",
    weight: 20,
    topics: ["Users & Licensing", "OUs & Groups", "Domains & Resources"],
  },
  {
    id: 2,
    name: "Managing core Workspace services",
    short: "D2 Core Services",
    weight: 22,
    topics: ["Gmail", "Drive & Docs", "Meet, Chat & Calendar", "Gemini & AppSheet"],
  },
  {
    id: 3,
    name: "Managing data governance and compliance",
    short: "D3 Governance",
    weight: 15,
    topics: ["Vault & Retention", "DLP & Classification"],
  },
  {
    id: 4,
    name: "Managing security policies and access controls",
    short: "D4 Security",
    weight: 20,
    topics: ["Authentication & SSO", "Admin Roles & App Access"],
  },
  {
    id: 5,
    name: "Managing browsers and endpoints",
    short: "D5 Endpoints",
    weight: 10,
    topics: ["Mobile Devices", "Chrome & Endpoints"],
  },
  {
    id: 6,
    name: "Monitoring and troubleshooting common issues",
    short: "D6 Troubleshooting",
    weight: 13,
    topics: ["Reports, Alerts & Investigation", "Mail Flow & Troubleshooting"],
  },
];
