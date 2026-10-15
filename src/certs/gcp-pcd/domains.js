// Mapping from raw question topics → canonical topics → 4 PCD exam domains
//
// Domain names and weights follow the CURRENT official Professional Cloud
// Developer exam guide (32 / 23 / 24 / 21).

export const TOPIC_MAP = {
  // Domain 1 — Designing highly scalable, secure, and reliable cloud-native applications
  "Application Design": "Application Design",
  "Security/IAM": "Security/IAM",
  Security: "Security/IAM",
  IAM: "Security/IAM",
  "Data Storage": "Data Storage",
  Storage: "Data Storage",
  Databases: "Data Storage",

  // Domain 2 — Building and testing applications
  "Dev Environment": "Dev Environment",
  Development: "Dev Environment",
  "Build & CI/CD": "Build & CI/CD",
  "CI/CD": "Build & CI/CD",
  Testing: "Testing",

  // Domain 3 — Configuring cloud-native applications for deployment
  "Cloud Run & Serverless": "Cloud Run & Serverless",
  "Cloud Run": "Cloud Run & Serverless",
  Serverless: "Cloud Run & Serverless",
  GKE: "GKE",
  Kubernetes: "GKE",
  "Deployment Strategies": "Deployment Strategies",
  Deployment: "Deployment Strategies",

  // Domain 4 — Integrating applications with Google Cloud services
  "Messaging & Events": "Messaging & Events",
  "Pub/Sub": "Messaging & Events",
  "Google Cloud APIs": "Google Cloud APIs",
  APIs: "Google Cloud APIs",
  Observability: "Observability",
  Monitoring: "Observability",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Designing highly scalable, secure, and reliable cloud-native applications",
    short: "D1 Designing",
    weight: 32,
    topics: ["Application Design", "Security/IAM", "Data Storage"],
  },
  {
    id: 2,
    name: "Building and testing applications",
    short: "D2 Build & Test",
    weight: 23,
    topics: ["Dev Environment", "Build & CI/CD", "Testing"],
  },
  {
    id: 3,
    name: "Configuring cloud-native applications for deployment",
    short: "D3 Deploying",
    weight: 24,
    topics: ["Cloud Run & Serverless", "GKE", "Deployment Strategies"],
  },
  {
    id: 4,
    name: "Integrating applications with Google Cloud services",
    short: "D4 Integrating",
    weight: 21,
    topics: ["Messaging & Events", "Google Cloud APIs", "Observability"],
  },
];
