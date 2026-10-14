import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-pcde",
  name: "Google Cloud Professional Cloud Database Engineer",
  short: "PCDE",
  tagline: "Professional Cloud Database Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Fecha del volcado del banco de preguntas (importBatch examtopics-2026-10).
  // No es la fecha del fichero: es cuándo se dio el banco por bueno.
  // ExamTopics lista 197 preguntas (banco actualizado el 2026-10-01), pero
  // las 174, 176, 179, 180 y 182–197 no tienen página pública de discusión,
  // así que el banco queda en 177 preguntas.
  // isRecent marca las 150 más recientes del volcado (ExamTopics 28–181),
  // que son los bloques 1–6 del modo bloques de 25.
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
