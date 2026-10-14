import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-pcne",
  name: "Google Cloud Professional Cloud Network Engineer",
  short: "PCNE",
  tagline: "Professional Cloud Network Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // isRecent marca las 150 más recientes del volcado (ExamTopics 155–307),
  // que son los bloques 1–6 del modo bloques de 25.
  // 303 de las 316 preguntas que ExamTopics lista; 149, 277, 281, 283 y
  // 308–316 nunca se publicaron como discusión.
  questionsDumpedAt: "2026-10-14",
  passPercent: 70,
  mock: {
    count: 50,
    durationSec: 120 * 60,
  },
  topicMap: TOPIC_MAP,
  examDomains: EXAM_DOMAINS,
  dragons: DRAGONS,
  loadQuestions: () => import("./questions.js"),
};

export default manifest;
