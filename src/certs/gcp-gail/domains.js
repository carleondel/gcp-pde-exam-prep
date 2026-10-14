// Mapping from raw question topics → canonical topics → 4 GAIL exam domains
//
// Domain names and weights follow the official Generative AI Leader exam
// guide (services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf):
// Fundamentals of gen AI ~30%, Google Cloud's gen AI offerings ~35%,
// Techniques to improve gen AI model output ~20%, Business strategies ~15%.
// ExamTopics topic N maps to domain N.

export const TOPIC_MAP = {
  // Domain 1 — Fundamentals of gen AI
  "Gen AI Concepts": "Gen AI Concepts",
  Concepts: "Gen AI Concepts",
  "ML Approaches": "ML Approaches",
  "Machine Learning": "ML Approaches",
  "Data & Privacy": "Data & Privacy",
  Data: "Data & Privacy",
  "Gen AI Landscape": "Gen AI Landscape",
  Landscape: "Gen AI Landscape",

  // Domain 2 — Google Cloud's gen AI offerings
  "Gemini Apps & Workspace": "Gemini Apps & Workspace",
  "Agent Platform & Models": "Agent Platform & Models",
  "Vertex AI": "Agent Platform & Models",
  "Search & Agents": "Search & Agents",
  Agents: "Search & Agents",
  "Customer Engagement": "Customer Engagement",
  "Cloud Strengths & Security": "Cloud Strengths & Security",

  // Domain 3 — Techniques to improve gen AI model output
  "Prompt Engineering": "Prompt Engineering",
  Prompting: "Prompt Engineering",
  "Grounding & RAG": "Grounding & RAG",
  Grounding: "Grounding & RAG",
  RAG: "Grounding & RAG",
  "Model Settings & Oversight": "Model Settings & Oversight",
  "Model Settings": "Model Settings & Oversight",

  // Domain 4 — Business strategies for a successful gen AI solution
  "Strategy & Adoption": "Strategy & Adoption",
  Strategy: "Strategy & Adoption",
  "Responsible AI": "Responsible AI",
  "Secure AI": "Secure AI",
};

export const EXAM_DOMAINS = [
  {
    id: 1,
    name: "Fundamentals of gen AI",
    short: "D1 Fundamentals",
    weight: 30,
    topics: ["Gen AI Concepts", "ML Approaches", "Data & Privacy", "Gen AI Landscape"],
  },
  {
    id: 2,
    name: "Google Cloud's gen AI offerings",
    short: "D2 Offerings",
    weight: 35,
    topics: [
      "Gemini Apps & Workspace",
      "Agent Platform & Models",
      "Search & Agents",
      "Customer Engagement",
      "Cloud Strengths & Security",
    ],
  },
  {
    id: 3,
    name: "Techniques to improve gen AI model output",
    short: "D3 Techniques",
    weight: 20,
    topics: ["Prompt Engineering", "Grounding & RAG", "Model Settings & Oversight"],
  },
  {
    id: 4,
    name: "Business strategies for a successful gen AI solution",
    short: "D4 Strategy",
    weight: 15,
    topics: ["Strategy & Adoption", "Responsible AI", "Secure AI"],
  },
];
