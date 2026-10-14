// Mapping from raw question topics → canonical topics → 4 ACE exam domains
//
// Domain names and weights follow the CURRENT official Associate Cloud
// Engineer exam guide (live since 2026-06-30): 20 / 30 / 30 / 20.
// Note: the older 5-section blueprint (17.5 / 17.5 / 25 / 20 / 20) still
// circulates on some pages — it is outdated, do not use it.

export const TOPIC_MAP = {
  // Domain 1 — Setting up a cloud solution environment
  "Resource Hierarchy": "Resource Hierarchy",
  Organization: "Resource Hierarchy",
  Billing: "Billing",

  // Domain 2 — Planning and implementing a cloud solution
  Compute: "Compute",
  GKE: "Compute",
  "Cloud Run": "Compute",
  "App Engine": "Compute",
  "Storage & Databases": "Storage & Databases",
  Storage: "Storage & Databases",
  Databases: "Storage & Databases",
  Networking: "Networking",
  VPC: "Networking",
  "IaC & Tooling": "IaC & Tooling",
  IaC: "IaC & Tooling",

  // Domain 3 — Ensuring the successful operation of a cloud solution
  "Compute Operations": "Compute Operations",
  "Data Operations": "Data Operations",
  "Network Operations": "Network Operations",
  "Monitoring & Logging": "Monitoring & Logging",
  Monitoring: "Monitoring & Logging",
  Logging: "Monitoring & Logging",

  // Domain 4 — Configuring access and security
  IAM: "IAM",
  "Service Accounts": "Service Accounts",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Setting up a cloud solution environment",
    short: "D1 Setup",
    weight: 20,
    topics: ["Resource Hierarchy", "Billing"],
  },
  {
    id: 2,
    name: "Planning and implementing a cloud solution",
    short: "D2 Planning",
    weight: 30,
    topics: ["Compute", "Storage & Databases", "Networking", "IaC & Tooling"],
  },
  {
    id: 3,
    name: "Ensuring the successful operation of a cloud solution",
    short: "D3 Operations",
    weight: 30,
    topics: ["Compute Operations", "Data Operations", "Network Operations", "Monitoring & Logging"],
  },
  {
    id: 4,
    name: "Configuring access and security",
    short: "D4 Security",
    weight: 20,
    topics: ["IAM", "Service Accounts"],
  },
];
