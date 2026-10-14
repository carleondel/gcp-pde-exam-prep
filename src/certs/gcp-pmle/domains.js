// Mapping from raw question topics → canonical topics → 6 PMLE exam domains
//
// Domain names and weights follow the official Professional Machine Learning
// Engineer exam guide as of June 1, 2026. The guide lists approximate weights
// of ~13 / ~16 / ~21 / ~20 / ~18 / ~13, which sums to 101; the registry test
// requires 100, so the two ~13% sections are entered as 12.5.

export const TOPIC_MAP = {
  // Domain 1 — Architecting low-code AI solutions
  "BigQuery ML": "BigQuery ML",
  AutoML: "AutoML",
  "AI APIs & Gen AI": "AI APIs & Gen AI",

  // Domain 2 — Collaborating within and across teams to manage data and models
  "Data Preparation": "Data Preparation",
  "Notebooks & Prototyping": "Notebooks & Prototyping",
  "Experiments & Evaluation": "Experiments & Evaluation",

  // Domain 3 — Scaling prototypes into ML models
  "Model Development": "Model Development",
  Training: "Training",
  "Training Hardware": "Training Hardware",

  // Domain 4 — Serving and scaling models
  "Model Serving": "Model Serving",
  "Feature Store": "Feature Store",
  "Serving Infrastructure": "Serving Infrastructure",

  // Domain 5 — Automating and orchestrating ML pipelines
  "ML Pipelines": "ML Pipelines",
  "CI/CD & Retraining": "CI/CD & Retraining",

  // Domain 6 — Monitoring AI solutions
  "Monitoring & Drift": "Monitoring & Drift",
  "Responsible AI & Security": "Responsible AI & Security",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Architecting low-code AI solutions",
    short: "D1 Low-code AI",
    weight: 12.5,
    topics: ["BigQuery ML", "AutoML", "AI APIs & Gen AI"],
  },
  {
    id: 2,
    name: "Collaborating within and across teams to manage data and models",
    short: "D2 Data & Experiments",
    weight: 16,
    topics: ["Data Preparation", "Notebooks & Prototyping", "Experiments & Evaluation"],
  },
  {
    id: 3,
    name: "Scaling prototypes into ML models",
    short: "D3 Training",
    weight: 21,
    topics: ["Model Development", "Training", "Training Hardware"],
  },
  {
    id: 4,
    name: "Serving and scaling models",
    short: "D4 Serving",
    weight: 20,
    topics: ["Model Serving", "Feature Store", "Serving Infrastructure"],
  },
  {
    id: 5,
    name: "Automating and orchestrating ML pipelines",
    short: "D5 Pipelines",
    weight: 18,
    topics: ["ML Pipelines", "CI/CD & Retraining"],
  },
  {
    id: 6,
    name: "Monitoring AI solutions",
    short: "D6 Monitoring",
    weight: 12.5,
    topics: ["Monitoring & Drift", "Responsible AI & Security"],
  },
];
