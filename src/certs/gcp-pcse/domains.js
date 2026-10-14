// Canonical topics → 5 PCSE exam domains
//
// Domain names and weights follow the CURRENT official Professional Cloud
// Security Engineer exam guide (25 / 22 / 23 / 19 / 11).

export const TOPIC_MAP = {
  // Domain 1 — Configuring access
  "Cloud Identity": "Cloud Identity",
  IAM: "IAM",
  "Resource Hierarchy": "Resource Hierarchy",

  // Domain 2 — Securing communications and establishing boundary protection
  "Network Security": "Network Security",
  Networking: "Network Security",
  "VPC Service Controls": "VPC Service Controls",
  "Private Connectivity": "Private Connectivity",

  // Domain 3 — Ensuring data protection
  "Sensitive Data Protection": "Sensitive Data Protection",
  DLP: "Sensitive Data Protection",
  "Encryption & Keys": "Encryption & Keys",
  Encryption: "Encryption & Keys",
  KMS: "Encryption & Keys",
  "Data Security": "Data Security",

  // Domain 4 — Managing operations
  "Security Operations": "Security Operations",
  "Logging & Monitoring": "Logging & Monitoring",
  Logging: "Logging & Monitoring",
  Monitoring: "Logging & Monitoring",
  "Workload & Supply Chain": "Workload & Supply Chain",

  // Domain 5 — Supporting compliance requirements
  Compliance: "Compliance",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Configuring access",
    short: "D1 Access",
    weight: 25,
    topics: ["Cloud Identity", "IAM", "Resource Hierarchy"],
  },
  {
    id: 2,
    name: "Securing communications and establishing boundary protection",
    short: "D2 Boundary",
    weight: 22,
    topics: ["Network Security", "VPC Service Controls", "Private Connectivity"],
  },
  {
    id: 3,
    name: "Ensuring data protection",
    short: "D3 Data",
    weight: 23,
    topics: ["Sensitive Data Protection", "Encryption & Keys", "Data Security"],
  },
  {
    id: 4,
    name: "Managing operations",
    short: "D4 Operations",
    weight: 19,
    topics: ["Security Operations", "Logging & Monitoring", "Workload & Supply Chain"],
  },
  {
    id: 5,
    name: "Supporting compliance requirements",
    short: "D5 Compliance",
    weight: 11,
    topics: ["Compliance"],
  },
];
