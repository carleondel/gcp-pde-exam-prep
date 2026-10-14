import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-psoe",
  name: "Google Cloud Professional Security Operations Engineer",
  short: "PSOE",
  tagline: "Professional Security Operations Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // El banco de ExamTopics tiene 133 preguntas ("last updated Sep 30, 2026");
  // se cargan las 133 — 132 y 133 no tienen hilo público: su texto viene de
  // sitios espejo y su número es estimado (sourceNumberConfirmed: false).
  // Como el banco es menor que 150, isRecent marca las 133 cargadas.
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
