// Canonical topics → 5 Professional Cloud DevOps Engineer exam domains.
//
// Domain names and weights follow the CURRENT official Professional Cloud
// DevOps Engineer exam guide (20 / 25 / 18 / 25 / 12).

export const TOPIC_MAP = {
  // Domain 1 — Bootstrapping and maintaining a Google Cloud organization
  "Org & IAM": "Org & IAM",
  "Infrastructure as Code": "Infrastructure as Code",

  // Domain 2 — Building and implementing CI/CD pipelines
  "CI/CD Pipelines": "CI/CD Pipelines",
  "Deployment Strategies": "Deployment Strategies",
  "Supply Chain Security": "Supply Chain Security",

  // Domain 3 — Applying site reliability engineering practices
  "SLOs & Error Budgets": "SLOs & Error Budgets",
  "Incident Management": "Incident Management",
  "Reliability Design": "Reliability Design",

  // Domain 4 — Implementing observability practices and troubleshooting
  Logging: "Logging",
  "Monitoring & Alerting": "Monitoring & Alerting",
  "Troubleshooting & APM": "Troubleshooting & APM",

  // Domain 5 — Optimizing performance and cost
  "Performance & Cost": "Performance & Cost",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Bootstrapping and maintaining a Google Cloud organization",
    short: "D1 Bootstrapping",
    weight: 20,
    topics: ["Org & IAM", "Infrastructure as Code"],
  },
  {
    id: 2,
    name: "Building and implementing CI/CD pipelines for applications, infrastructure, and ML workloads",
    short: "D2 CI/CD",
    weight: 25,
    topics: ["CI/CD Pipelines", "Deployment Strategies", "Supply Chain Security"],
  },
  {
    id: 3,
    name: "Applying site reliability engineering practices",
    short: "D3 SRE",
    weight: 18,
    topics: ["SLOs & Error Budgets", "Incident Management", "Reliability Design"],
  },
  {
    id: 4,
    name: "Implementing observability practices and troubleshooting issues",
    short: "D4 Observability",
    weight: 25,
    topics: ["Logging", "Monitoring & Alerting", "Troubleshooting & APM"],
  },
  {
    id: 5,
    name: "Optimizing performance and cost",
    short: "D5 Cost & Performance",
    weight: 12,
    topics: ["Performance & Cost"],
  },
];
