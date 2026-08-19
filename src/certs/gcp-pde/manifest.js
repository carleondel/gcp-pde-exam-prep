import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";

const manifest = {
  id: "gcp-pde",
  name: "Google Cloud Professional Data Engineer",
  short: "PDE",
  tagline: "Professional Data Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Herramienta de estudio independiente, no afiliada ni patrocinada por Google LLC. Google Cloud y su logotipo se usan aquí solo como referencia visual para el examen.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-04).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  questionsDumpedAt: "2026-04-30",
  passPercent: 70,
  mock: {
    count: 50,
    durationSec: 120 * 60,
  },
  topicMap: TOPIC_MAP,
  examDomains: EXAM_DOMAINS,
  loadQuestions: () => import("./questions.js"),
};

export default manifest;
