// Mapping from raw question topics → canonical topics → 4 PCDE exam domains
//
// Domain names and weights follow the CURRENT official Professional Cloud
// Database Engineer exam guide (32 / 25 / 23 / 20).

export const TOPIC_MAP = {
  // Domain 1 — Design innovative, scalable, and highly available cloud database solutions
  "Database Selection": "Database Selection",
  "Engine Choice": "Database Selection",
  "Data Modelling": "Database Selection",
  "Capacity Planning & Cost": "Capacity Planning & Cost",
  Capacity: "Capacity Planning & Cost",
  "Connectivity & Networking": "Connectivity & Networking",
  Networking: "Connectivity & Networking",

  // Domain 2 — Manage a solution that can span multiple database technologies
  "Security & IAM": "Security & IAM",
  Security: "Security & IAM",
  IAM: "Security & IAM",
  "Monitoring & Performance": "Monitoring & Performance",
  Monitoring: "Monitoring & Performance",
  Performance: "Monitoring & Performance",
  "Backup & Recovery": "Backup & Recovery",
  Backups: "Backup & Recovery",
  "Operations & Maintenance": "Operations & Maintenance",
  Operations: "Operations & Maintenance",
  Maintenance: "Operations & Maintenance",

  // Domain 3 — Migrate data solutions
  Migration: "Migration",
  "Data Migration": "Migration",
  DMS: "Migration",

  // Domain 4 — Deploy scalable and highly available databases in Google Cloud
  "High Availability & DR": "High Availability & DR",
  HA: "High Availability & DR",
  DR: "High Availability & DR",
  "Replication & Read Replicas": "Replication & Read Replicas",
  Replication: "Replication & Read Replicas",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Design innovative, scalable, and highly available cloud database solutions",
    short: "D1 Design",
    weight: 32,
    topics: ["Database Selection", "Capacity Planning & Cost", "Connectivity & Networking"],
  },
  {
    id: 2,
    name: "Manage a solution that can span multiple database technologies",
    short: "D2 Management",
    weight: 25,
    topics: [
      "Security & IAM",
      "Monitoring & Performance",
      "Backup & Recovery",
      "Operations & Maintenance",
    ],
  },
  {
    id: 3,
    name: "Migrate data solutions",
    short: "D3 Migration",
    weight: 23,
    topics: ["Migration"],
  },
  {
    id: 4,
    name: "Deploy scalable and highly available databases in Google Cloud",
    short: "D4 Deployment",
    weight: 20,
    topics: ["High Availability & DR", "Replication & Read Replicas"],
  },
];
