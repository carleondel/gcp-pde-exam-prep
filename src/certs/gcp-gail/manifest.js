import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-gail",
  name: "Google Cloud Generative AI Leader",
  short: "GAIL",
  tagline: "Generative AI Leader",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // ExamTopics marcaba la lista como actualizada el 14-sep-2026 con 99 preguntas.
  // isRecent marca las 99 porque el banco entero queda por debajo
  // de la ventana de las 150 más recientes.
  questionsDumpedAt: "2026-10-14",
  // Estimación de la comunidad: Google no publica la nota de corte.
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
