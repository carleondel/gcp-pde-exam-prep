import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { CASE_STUDIES } from "./case-studies.js";

const manifest = {
  id: "gcp-pca",
  name: "Google Cloud Professional Cloud Architect",
  short: "PCA",
  tagline: "Professional Cloud Architect",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Herramienta de estudio independiente, no afiliada ni patrocinada por Google LLC. Google Cloud y su logotipo se usan aquí solo como referencia visual para el examen.",
  passPercent: 70,
  mock: {
    count: 50,
    durationSec: 120 * 60,
  },
  topicMap: TOPIC_MAP,
  examDomains: EXAM_DOMAINS,
  caseStudies: CASE_STUDIES,
  loadQuestions: () => import("./questions.js"),
};

export default manifest;
