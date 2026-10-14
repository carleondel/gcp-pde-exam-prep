import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-pcdoe",
  name: "Google Cloud Professional Cloud DevOps Engineer",
  short: "PCDOE",
  tagline: "Professional Cloud DevOps Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // Preguntas 1–196 del volcado de ExamTopics (snapshot de abril de 2025)
  // y 197–225, 227–230 de las páginas completas de ExamTopics obtenidas
  // en octubre de 2026; 231–233 son textos de sitios espejo sin número
  // confirmado (sourceNumberConfirmed: false). ExamTopics lista 239
  // preguntas; 226 y 234–239 pendientes.
  // isRecent marca las 150 más recientes del volcado (ExamTopics 83–233).
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
