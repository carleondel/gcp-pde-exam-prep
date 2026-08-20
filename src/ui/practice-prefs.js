/**
 * Practice-session preferences: the source, order and size of a custom
 * session, plus the copy that labels them.
 *
 * The sanitizers exist because these values are persisted to localStorage
 * and reloaded on the next visit, where they may be stale, hand-edited or
 * left over from a build that offered different options. Each one narrows
 * whatever it is handed back to something the engine accepts.
 */

import { BLOCK_SIZE_PRESETS, DEFAULT_BLOCK_SIZE } from "../engine/block-study.js";

export const PRACTICE_PRESETS = [10, 20, 30, 50];
export const DEFAULT_PRACTICE_LIMIT = 20;

export const PRACTICE_SOURCE_META = {
  topics: {
    label: "Por dominio",
    helper: "Selecciona los dominios que quieres cubrir.",
    empty: "Selecciona temas.",
  },
  recent: {
    label: "Recientes",
    helper: "Prioriza ExamTopics reciente con las últimas incorporaciones.",
    empty: "Aún no hay preguntas recientes importadas.",
  },
  wrong: {
    label: "Solo fallos",
    helper: "Repasa solo lo que más te cuesta.",
    empty: "Aún no hay fallos guardados.",
  },
  bookmarks: {
    label: "Marcadas",
    helper: "Retoma preguntas reservadas para revisión.",
    empty: "Aún no hay preguntas marcadas.",
  },
  weak: {
    label: "Peor rendimiento",
    helper: "Enfócate en los temas con peor acierto.",
    empty: "Se activa tras 5 respuestas por tema.",
  },
};

export function sanitizePracticeOrder(order) {
  return ["random", "sequential", "recent-desc"].includes(order) ? order : "random";
}

export function sanitizePracticeSource(source) {
  // Own properties only. A plain index lookup is truthy for anything on
  // Object.prototype, so a stored source of "constructor" or "toString"
  // would pass validation and then read as a source with no label.
  return Object.hasOwn(PRACTICE_SOURCE_META, source) ? source : "topics";
}

export function sanitizePracticeTopics(topics, allTopics) {
  const values = Array.isArray(topics) ? topics : allTopics;
  const next = values.filter(
    (topic, index) => allTopics.includes(topic) && values.indexOf(topic) === index,
  );
  return next.length ? next : [...allTopics];
}

export function sanitizePracticeLimit(limit) {
  const numeric = Number(limit);
  if (!Number.isFinite(numeric) || numeric < 1) return DEFAULT_PRACTICE_LIMIT;
  return Math.floor(numeric);
}

export function sanitizeBlockSize(size) {
  const numeric = Number(size);
  return BLOCK_SIZE_PRESETS.includes(numeric) ? numeric : DEFAULT_BLOCK_SIZE;
}
