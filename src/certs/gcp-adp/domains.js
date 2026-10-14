// Mapping from raw question topics → canonical topics → 4 ADP exam domains
//
// Domain names and weights follow the official Associate Data Practitioner
// Exam Guide v1.0 (30 / 27 / 18 / 25).

export const TOPIC_MAP = {
  // Domain 1 — Data Preparation and Ingestion
  "Data Preparation": "Data Preparation",
  "Ingestion & Transfer": "Ingestion & Transfer",
  "Storage Selection": "Storage Selection",

  // Domain 2 — Data Analysis and Presentation
  "BigQuery & SQL": "BigQuery & SQL",
  "Looker & Visualization": "Looker & Visualization",
  "Machine Learning": "Machine Learning",

  // Domain 3 — Data Pipeline Orchestration
  "Pipelines & Processing": "Pipelines & Processing",
  "Orchestration & Monitoring": "Orchestration & Monitoring",

  // Domain 4 — Data Management
  "Security & Access": "Security & Access",
  "Data Sharing & Governance": "Data Sharing & Governance",
  "Lifecycle & Availability": "Lifecycle & Availability",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Data Preparation and Ingestion",
    short: "D1 Prep & Ingestion",
    weight: 30,
    topics: ["Data Preparation", "Ingestion & Transfer", "Storage Selection"],
  },
  {
    id: 2,
    name: "Data Analysis and Presentation",
    short: "D2 Analysis",
    weight: 27,
    topics: ["BigQuery & SQL", "Looker & Visualization", "Machine Learning"],
  },
  {
    id: 3,
    name: "Data Pipeline Orchestration",
    short: "D3 Pipelines",
    weight: 18,
    topics: ["Pipelines & Processing", "Orchestration & Monitoring"],
  },
  {
    id: 4,
    name: "Data Management",
    short: "D4 Management",
    weight: 25,
    topics: ["Security & Access", "Data Sharing & Governance", "Lifecycle & Availability"],
  },
];
