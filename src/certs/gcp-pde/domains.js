// Mapping from raw question topics → 15 canonical topics → 5 PDE exam domains

export const TOPIC_MAP = {
  // Domain 1 — Designing Data Processing Systems
  "Architecture": "Architecture",
  "IoT/Architecture": "Architecture",
  "Database Design": "Architecture",
  "ML/AI": "ML/AI",
  "ML/Architecture": "ML/AI",
  "Dataproc/ML": "ML/AI",
  "BigQuery/ML": "ML/AI",

  // Domain 2 — Ingesting and Processing Data
  "Dataflow": "Dataflow",
  "Dataflow/Networking": "Dataflow",
  "Dataflow/Bigtable": "Dataflow",
  "Dataflow/DR": "Dataflow",
  "Dataflow/BigQuery": "Dataflow",
  "Pub/Sub": "Pub/Sub",
  "Dataproc": "Dataproc",
  "Orchestration": "Orchestration",
  "Cloud Composer": "Orchestration",
  "Data Migration": "Data Migration",
  "Data Ingestion": "Data Migration",
  "Datastream": "Data Migration",

  // Domain 3 — Storing the Data
  "BigQuery": "BigQuery",
  "BigQuery/DR": "BigQuery",
  "BigQuery DR": "BigQuery",
  "BigQuery/CDC": "BigQuery",
  "BigQuery/BigLake": "BigQuery",
  "BigLake": "BigQuery",
  "Bigtable/BigQuery": "BigQuery",
  "Bigtable": "Bigtable",
  "Storage": "Storage",
  "Storage/DR": "Storage",
  "Storage/Backup": "Storage",
  "Cloud SQL": "SQL & Spanner",
  "Cloud SQL/DR": "SQL & Spanner",
  "Spanner": "SQL & Spanner",
  "Memorystore": "SQL & Spanner",

  // Domain 4 — Preparing and Using Data for Analysis
  "Dataplex": "Analytics & Gov",
  "Data Catalog": "Analytics & Gov",
  "Dataform": "Analytics & Gov",

  // Domain 5 — Maintaining and Automating Data Workloads
  "Security": "Security",
  "Security/DLP": "Security",
  "Security/IAM": "Security",
  "Security/Logging": "Security",
  "Monitoring": "Monitoring",
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

export function getCanonicalTopic(topic) {
  return TOPIC_MAP[topic] || topic;
}

export function getDomainForTopic(canonicalTopic) {
  return EXAM_DOMAINS.find((d) => d.topics.includes(canonicalTopic)) || null;
}

export function computeDomainStats(topicHistory) {
  const byCanonical = {};
  for (const [topic, entries] of Object.entries(topicHistory)) {
    const canonical = getCanonicalTopic(topic);
    if (!byCanonical[canonical]) byCanonical[canonical] = { correct: 0, total: 0 };
    for (const e of entries) {
      byCanonical[canonical].total += 1;
      if (e.correct) byCanonical[canonical].correct += 1;
    }
  }

  return EXAM_DOMAINS.map((domain) => {
    let correct = 0;
    let total = 0;
    for (const t of domain.topics) {
      if (byCanonical[t]) {
        correct += byCanonical[t].correct;
        total += byCanonical[t].total;
      }
    }
    const accuracy = total >= 10 ? Math.round((correct / total) * 100) : null;
    return { ...domain, correct, total, accuracy };
  });
}

export function computeCanonicalTopicStats(topicHistory) {
  const byCanonical = {};
  for (const [topic, entries] of Object.entries(topicHistory)) {
    const canonical = getCanonicalTopic(topic);
    if (!byCanonical[canonical]) byCanonical[canonical] = { correct: 0, total: 0 };
    for (const e of entries) {
      byCanonical[canonical].total += 1;
      if (e.correct) byCanonical[canonical].correct += 1;
    }
  }

  return EXAM_DOMAINS.flatMap((domain) =>
    domain.topics.map((topic) => {
      const stats = byCanonical[topic] || { correct: 0, total: 0 };
      const accuracy = stats.total >= 10 ? Math.round((stats.correct / stats.total) * 100) : null;
      return { topic, domainId: domain.id, ...stats, accuracy };
    }),
  );
}

export function getWeakestDomain(domainStats) {
  const candidates = domainStats.filter((d) => d.total >= 10 && d.accuracy !== null && d.accuracy < 70);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.accuracy - b.accuracy || b.weight - a.weight);
  return candidates[0];
}
