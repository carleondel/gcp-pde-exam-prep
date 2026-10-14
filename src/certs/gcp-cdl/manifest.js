import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-cdl",
  name: "Google Cloud Digital Leader",
  short: "CDL",
  tagline: "Cloud Digital Leader",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // El banco de ExamTopics ("Last updated Sep 20, 2026") tiene 289 preguntas;
  // isRecent marca las 150 más recientes del volcado (ExamTopics 140–289),
  // que son los bloques 1–6 del modo bloques de 25.
  questionsDumpedAt: "2026-10-14",
  passPercent: 70,
  mock: {
    count: 50,
    durationSec: 90 * 60,
  },
  topicMap: TOPIC_MAP,
  examDomains: EXAM_DOMAINS,
  dragons: DRAGONS,
  loadQuestions: () => import("./questions.js"),
};

export default manifest;
