// Mapping from raw question topics → canonical topics → 6 CDL exam domains
//
// Domain names and weights follow the CURRENT official Cloud Digital Leader
// exam guide (17 / 16 / 16 / 17 / 17 / 17):
// https://cloud.google.com/learn/certification/guides/cloud-digital-leader

export const TOPIC_MAP = {
  // Domain 1 — Digital transformation with Google Cloud
  "Cloud Concepts": "Cloud Concepts",
  "Digital Transformation": "Digital Transformation",

  // Domain 2 — Exploring data transformation with Google Cloud
  "Databases & Storage": "Databases & Storage",
  Storage: "Databases & Storage",
  Databases: "Databases & Storage",
  "Data Analytics": "Data Analytics",

  // Domain 3 — Innovating with Google Cloud artificial intelligence
  "AI & ML": "AI & ML",
  "AI/ML": "AI & ML",
  "Machine Learning": "AI & ML",

  // Domain 4 — Modernizing infrastructure and applications with Google Cloud
  Compute: "Compute",
  Networking: "Networking",
  "Migration & Modernization": "Migration & Modernization",
  Migration: "Migration & Modernization",
  APIs: "Migration & Modernization",
  "Hybrid/Multicloud": "Migration & Modernization",

  // Domain 5 — Trust and security with Google Cloud
  "Security & IAM": "Security & IAM",
  Security: "Security & IAM",
  IAM: "Security & IAM",
  "Compliance & Privacy": "Compliance & Privacy",
  Compliance: "Compliance & Privacy",

  // Domain 6 — Scaling with Google Cloud operations
  "Cost Management": "Cost Management",
  Billing: "Cost Management",
  "Operations & Reliability": "Operations & Reliability",
  SRE: "Operations & Reliability",
  Support: "Operations & Reliability",
  Sustainability: "Sustainability",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Digital transformation with Google Cloud",
    short: "D1 Transformation",
    weight: 17,
    topics: ["Cloud Concepts", "Digital Transformation"],
  },
  {
    id: 2,
    name: "Exploring data transformation with Google Cloud",
    short: "D2 Data",
    weight: 16,
    topics: ["Databases & Storage", "Data Analytics"],
  },
  {
    id: 3,
    name: "Innovating with Google Cloud artificial intelligence",
    short: "D3 AI",
    weight: 16,
    topics: ["AI & ML"],
  },
  {
    id: 4,
    name: "Modernizing infrastructure and applications with Google Cloud",
    short: "D4 Modernization",
    weight: 17,
    topics: ["Compute", "Networking", "Migration & Modernization"],
  },
  {
    id: 5,
    name: "Trust and security with Google Cloud",
    short: "D5 Security",
    weight: 17,
    topics: ["Security & IAM", "Compliance & Privacy"],
  },
  {
    id: 6,
    name: "Scaling with Google Cloud operations",
    short: "D6 Operations",
    weight: 17,
    topics: ["Cost Management", "Operations & Reliability", "Sustainability"],
  },
];
