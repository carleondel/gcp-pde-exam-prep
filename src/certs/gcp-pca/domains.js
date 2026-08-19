// Mapping from raw question topics → canonical topics → 6 PCA exam domains
//
// Domain names and weights follow the CURRENT official Professional Cloud
// Architect Standard Exam Guide (25 / 17.5 / 17.5 / 15 / 12.5 / 12.5).
// Note: an older blueprint (24 / 15 / 18 / 18 / 11 / 14) is still circulating
// on some translated Google pages — do not use it.

export const TOPIC_MAP = {
  // Domain 1 — Designing and planning a cloud solution architecture
  "Architecture/Design": "Architecture/Design",
  "Architecture": "Architecture/Design",
  "Migration": "Migration",
  "Data Migration": "Migration",
  "Cost Optimization": "Cost Optimization",

  // Domain 2 — Managing and provisioning a solution infrastructure
  "Compute": "Compute",
  "GKE": "Compute",
  "Networking": "Networking",
  "Storage & Databases": "Storage & Databases",
  "Storage": "Storage & Databases",
  "Databases": "Storage & Databases",

  // Domain 3 — Designing for security and compliance
  "Security/IAM": "Security/IAM",
  "Security": "Security/IAM",
  "IAM": "Security/IAM",
  "Compliance": "Compliance",

  // Domain 4 — Analyzing and optimizing technical and business processes
  "DevOps/CI-CD": "DevOps/CI-CD",
  "CI/CD": "DevOps/CI-CD",
  "Governance/IaC": "Governance/IaC",
  "Business Processes": "Business Processes",
  "Stakeholder Management": "Business Processes",

  // Domain 5 — Managing implementation
  "Development/APIs": "Development/APIs",
  "Development": "Development/APIs",

  // Domain 6 — Ensuring solution and operations reliability
  "Monitoring/SRE": "Monitoring/SRE",
  "Monitoring": "Monitoring/SRE",
  "Reliability/DR": "Reliability/DR",
  "Reliability": "Reliability/DR",
  "DR": "Reliability/DR",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Designing and planning a cloud solution architecture",
    short: "D1 Designing",
    weight: 25,
    topics: ["Architecture/Design", "Migration", "Cost Optimization"],
  },
  {
    id: 2,
    name: "Managing and provisioning cloud solution infrastructure",
    short: "D2 Provisioning",
    weight: 17.5,
    topics: ["Compute", "Networking", "Storage & Databases"],
  },
  {
    id: 3,
    name: "Designing for security and compliance",
    short: "D3 Security",
    weight: 17.5,
    topics: ["Security/IAM", "Compliance"],
  },
  {
    id: 4,
    name: "Analyzing and optimizing technical and business processes",
    short: "D4 Processes",
    weight: 15,
    topics: ["DevOps/CI-CD", "Governance/IaC", "Business Processes"],
  },
  {
    id: 5,
    name: "Managing implementation",
    short: "D5 Implementation",
    weight: 12.5,
    topics: ["Development/APIs"],
  },
  {
    id: 6,
    name: "Ensuring solution and operations excellence",
    short: "D6 Operations",
    weight: 12.5,
    topics: ["Monitoring/SRE", "Reliability/DR"],
  },
];
