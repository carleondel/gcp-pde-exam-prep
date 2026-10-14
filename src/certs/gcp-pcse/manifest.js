import logoPath from "./assets/logo.svg";
import { TOPIC_MAP, EXAM_DOMAINS } from "./domains.js";
import { DRAGONS } from "./dragons.js";

const manifest = {
  id: "gcp-pcse",
  name: "Google Cloud Professional Cloud Security Engineer",
  short: "PCSE",
  tagline: "Professional Cloud Security Engineer",
  brand: "Google Cloud",
  logoPath,
  disclaimer:
    "Independent study tool, not affiliated with or sponsored by Google LLC. Google Cloud and its logo are used here only as a visual reference for the exam.",
  // Date of the question-bank dump (importBatch examtopics-2026-10).
  // Not the file date: it is when the bank was taken as good.
  // isRecent marks the 150 most recent in the dump (ExamTopics 212–361).
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
