// Mapping from raw question topics → 15 canonical topics → 5 PDE exam domains

export const TOPIC_MAP = {
  // Domain 1 — Designing Data Processing Systems
  Architecture: "Architecture",
  "IoT/Architecture": "Architecture",
  "Database Design": "Architecture",
  "ML/AI": "ML/AI",
  "ML/Architecture": "ML/AI",
  "Dataproc/ML": "ML/AI",
  "BigQuery/ML": "ML/AI",

  // Domain 2 — Ingesting and Processing Data
  Dataflow: "Dataflow",
  "Dataflow/Networking": "Dataflow",
  "Dataflow/Bigtable": "Dataflow",
  "Dataflow/DR": "Dataflow",
  "Dataflow/BigQuery": "Dataflow",
  "Pub/Sub": "Pub/Sub",
  Dataproc: "Dataproc",
  Orchestration: "Orchestration",
  "Cloud Composer": "Orchestration",
  "Data Migration": "Data Migration",
  "Data Ingestion": "Data Migration",
  Datastream: "Data Migration",

  // Domain 3 — Storing the Data
  BigQuery: "BigQuery",
  "BigQuery/DR": "BigQuery",
  "BigQuery DR": "BigQuery",
  "BigQuery/CDC": "BigQuery",
  "BigQuery/BigLake": "BigQuery",
  BigLake: "BigQuery",
  "Bigtable/BigQuery": "BigQuery",
  Bigtable: "Bigtable",
  Storage: "Storage",
  "Storage/DR": "Storage",
  "Storage/Backup": "Storage",
  "Cloud SQL": "SQL & Spanner",
  "Cloud SQL/DR": "SQL & Spanner",
  Spanner: "SQL & Spanner",
  Memorystore: "SQL & Spanner",

  // Domain 4 — Preparing and Using Data for Analysis
  Dataplex: "Analytics & Gov",
  "Data Catalog": "Analytics & Gov",
  Dataform: "Analytics & Gov",

  // Domain 5 — Maintaining and Automating Data Workloads
  Security: "Security",
  "Security/DLP": "Security",
  "Security/IAM": "Security",
  "Security/Logging": "Security",
  Monitoring: "Monitoring",
  "Data Processing": "Data Processing",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Designing Data Processing Systems",
    short: "D1 Designing",
    weight: 22,
    topics: ["Architecture", "ML/AI"],
  },
  {
    id: 2,
    name: "Ingesting and Processing Data",
    short: "D2 Ingesting",
    weight: 25,
    topics: ["Dataflow", "Pub/Sub", "Dataproc", "Orchestration", "Data Migration"],
  },
  {
    id: 3,
    name: "Storing the Data",
    short: "D3 Storing",
    weight: 20,
    topics: ["BigQuery", "Bigtable", "Storage", "SQL & Spanner"],
  },
  {
    id: 4,
    name: "Preparing and Using Data for Analysis",
    short: "D4 Analysis",
    weight: 15,
    topics: ["Analytics & Gov"],
  },
  {
    id: 5,
    name: "Maintaining and Automating Data Workloads",
    short: "D5 Maintaining",
    weight: 18,
    topics: ["Security", "Monitoring", "Data Processing"],
  },
];
