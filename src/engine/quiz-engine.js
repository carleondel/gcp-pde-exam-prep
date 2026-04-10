import { xpDiminishingFactor } from "../data/gamification.js";
import { EXAM_DOMAINS, getCanonicalTopic, getDomainForTopic } from "../data/pde-topics.js";
import { getQuestionOrderNumber } from "./block-study.js";

export const MOCK_DURATION_SEC = 90 * 60;
export const MOCK_QUESTION_COUNT = 50;
export const PASS_PERCENT = 70;
export const WEAK_TOPIC_WINDOW = 10;
export const WEAK_TOPIC_MIN = 5;
export const WRONG_QUESTION_LIMIT = 150;
export const MOCK_HISTORY_LIMIT = 50;

export function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function getCorrectOptionIndexes(question) {
  return Array.isArray(question.correct) ? [...question.correct] : [question.correct];
}

export function getWrongOptionIndexes(question) {
  const correct = new Set(getCorrectOptionIndexes(question));
  return question.options.map((_, index) => index).filter((index) => !correct.has(index));
}

export function normalizeSelection(selection) {
  if (selection === null || selection === undefined) return [];
  if (selection instanceof Set) return [...selection].sort((a, b) => a - b);
  if (Array.isArray(selection)) {
    return [...new Set(selection)].filter((value) => value !== null && value !== undefined).sort((a, b) => a - b);
  }
  return [selection];
}

export function serializeSelection(selection) {
  return normalizeSelection(selection);
}

export function isMultiQuestion(question) {
  return Array.isArray(question.correct);
}

export function canSubmitAnswer(question, selection) {
  const chosen = normalizeSelection(selection);
  if (chosen.length === 0) return false;
  if (!isMultiQuestion(question)) return true;
  return chosen.length >= getCorrectOptionIndexes(question).length;
}

export function evaluateAnswer(question, selection) {
  const selectedIndexes = normalizeSelection(selection);
  const correctIndexes = getCorrectOptionIndexes(question);
  const selectedSet = new Set(selectedIndexes);
  const correctSet = new Set(correctIndexes);
  const missingIndexes = correctIndexes.filter((index) => !selectedSet.has(index));
  const extraIndexes = selectedIndexes.filter((index) => !correctSet.has(index));
  return {
    isMulti: isMultiQuestion(question),
    selectedIndexes,
    correctIndexes,
    missingIndexes,
    extraIndexes,
    isCorrect: missingIndexes.length === 0 && extraIndexes.length === 0 && selectedIndexes.length === correctIndexes.length,
  };
}

export function get5050HiddenOptions(question) {
  return shuffle(getWrongOptionIndexes(question)).slice(0, 2);
}

export function calculatePracticeXp(question, elapsedSec, streak, multiplier = 1, hasDoubleXP = false, totalXp = 0) {
  const base = question.difficulty === 3 ? 45 : question.difficulty === 2 ? 30 : 20;
  const streakBonus = Math.min(streak * 8, 80);
  const speedBonus = elapsedSec < 8 ? 40 : elapsedSec < 15 ? 20 : elapsedSec < 25 ? 8 : 0;
  const effectiveMultiplier = hasDoubleXP ? multiplier * 2 : multiplier;
  const dimFactor = xpDiminishingFactor(totalXp);
  return {
    xp: Math.round((base + streakBonus + speedBonus) * effectiveMultiplier * dimFactor),
    base,
    streakBonus,
    speedBonus,
    effectiveMultiplier,
    diminishingFactor: dimFactor,
  };
}

export function buildPracticeQuestions(allQuestions, options = {}) {
  const { topicSet = null, order = "sequential", questionIds = null, questionMap = null, limit = null } = options;
  let selected = [];

  if (questionIds?.length) {
    const lookup = questionMap || new Map(allQuestions.map((question) => [question.id, question]));
    selected = questionIds.map((id) => lookup.get(id)).filter(Boolean);
  } else {
    selected = topicSet ? allQuestions.filter((question) => topicSet.has(question.topic)) : [...allQuestions];
  }

  let ordered = selected;
  if (order === "random") {
    ordered = shuffle(selected);
  } else if (order === "recent-desc") {
    ordered = [...selected].sort((left, right) => {
      const rightRecent = right.sourceQuestionNumber ?? right.id ?? 0;
      const leftRecent = left.sourceQuestionNumber ?? left.id ?? 0;
      return rightRecent - leftRecent || right.id - left.id;
    });
  }

  if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
    return ordered.slice(0, limit);
  }
  return ordered;
}

function allocateDomainTargets(count) {
  const raw = EXAM_DOMAINS.map((domain) => {
    const exact = (count * domain.weight) / 100;
    const floor = Math.floor(exact);
    return { id: domain.id, short: domain.short, exact, floor, frac: exact - floor };
  });
  let remainder = count - raw.reduce((sum, entry) => sum + entry.floor, 0);
  const sortedByFrac = [...raw].sort((a, b) => b.frac - a.frac);
  for (let i = 0; i < remainder && i < sortedByFrac.length; i += 1) {
    sortedByFrac[i].floor += 1;
  }
  return raw;
}

export function computeMockDistribution(count = MOCK_QUESTION_COUNT) {
  return allocateDomainTargets(count).map((entry) => ({
    id: entry.id,
    short: entry.short,
    target: entry.floor,
  }));
}

export function buildMockQuestions(allQuestions, count = MOCK_QUESTION_COUNT, options = {}) {
  const { preferRecent = false } = options;

  const buckets = new Map(EXAM_DOMAINS.map((domain) => [domain.id, []]));
  const unmatched = [];
  for (const question of allQuestions) {
    const domain = getDomainForTopic(getCanonicalTopic(question.topic));
    if (domain && buckets.has(domain.id)) buckets.get(domain.id).push(question);
    else unmatched.push(question);
  }

  const targets = new Map(allocateDomainTargets(count).map((entry) => [entry.id, entry.floor]));
  const orderPool = (pool) =>
    preferRecent
      ? [...pool].sort((a, b) => getQuestionOrderNumber(b) - getQuestionOrderNumber(a))
      : shuffle(pool);

  const picked = [];
  const leftover = [...unmatched];
  for (const [domainId, pool] of buckets.entries()) {
    const ordered = orderPool(pool);
    const target = targets.get(domainId) || 0;
    picked.push(...ordered.slice(0, target));
    leftover.push(...ordered.slice(target));
  }

  const deficit = count - picked.length;
  if (deficit > 0) {
    const filler = orderPool(leftover);
    picked.push(...filler.slice(0, deficit));
  }

  return shuffle(picked);
}

export function buildQuestionsFromIds(questionIds, questionMap) {
  return questionIds.map((id) => questionMap.get(id)).filter(Boolean);
}

export function appendTopicAttempt(topicHistory, question, correct, at = Date.now()) {
  const topic = question.topic;
  const current = topicHistory[topic] || [];
  const next = [...current, { correct, at, questionId: question.id }].slice(-WEAK_TOPIC_WINDOW);
  return {
    ...topicHistory,
    [topic]: next,
  };
}

export function pushWrongQuestionId(wrongQuestionIds, questionId, correct) {
  if (correct) return wrongQuestionIds.filter((id) => id !== questionId);
  const withoutCurrent = wrongQuestionIds.filter((id) => id !== questionId);
  return [questionId, ...withoutCurrent].slice(0, WRONG_QUESTION_LIMIT);
}

export function computeWeakTopics(topicHistory) {
  return Object.entries(topicHistory)
    .map(([topic, entries]) => {
      const attempts = entries.length;
      const correct = entries.filter((entry) => entry.correct).length;
      const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
      return {
        topic,
        attempts,
        correct,
        accuracy,
      };
    })
    .filter((topic) => topic.attempts >= WEAK_TOPIC_MIN)
    .sort((a, b) => a.accuracy - b.accuracy || a.attempts - b.attempts || a.topic.localeCompare(b.topic));
}

export function buildMockHistory(questionIds, answersByQuestionId, questionMap) {
  return questionIds
    .map((questionId) => {
      const question = questionMap.get(questionId);
      if (!question) return null;
      const selectedIndexes = normalizeSelection(answersByQuestionId[questionId]);
      const evaluation = selectedIndexes.length > 0 ? evaluateAnswer(question, selectedIndexes) : evaluateAnswer(question, []);
      return {
        questionId,
        question,
        selectedIndexes,
        answered: selectedIndexes.length > 0,
        correct: selectedIndexes.length > 0 ? evaluation.isCorrect : false,
        correctIndexes: evaluation.correctIndexes,
      };
    })
    .filter(Boolean);
}

export function buildTopicStatsFromHistory(history) {
  const stats = {};
  history.forEach((entry) => {
    const topic = entry.question.topic;
    if (!stats[topic]) stats[topic] = { correct: 0, total: 0 };
    stats[topic].total += 1;
    if (entry.correct) stats[topic].correct += 1;
  });
  return stats;
}

export const DAILY_CHALLENGE_COUNT = 5;
export const DAILY_CHALLENGE_BONUS_XP = 150;

export function buildDailyChallengeQuestions(allQuestions) {
  const today = new Date().toISOString().slice(0, 10);
  let seed = 0;
  for (let i = 0; i < today.length; i++) seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0;
  const seededRandom = (max) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % max;
  };
  const indices = new Set();
  while (indices.size < DAILY_CHALLENGE_COUNT && indices.size < allQuestions.length) {
    indices.add(seededRandom(allQuestions.length));
  }
  return [...indices].map((i) => allQuestions[i]);
}

export function buildMockSummary(history, options) {
  const { startedAt, finishedAt, durationSec, passPercent = PASS_PERCENT, questionCount = history.length } = options;
  const score = history.filter((entry) => entry.correct).length;
  const answered = history.filter((entry) => entry.answered).length;
  const percent = questionCount > 0 ? Math.round((score / questionCount) * 100) : 0;
  return {
    score,
    answered,
    questionCount,
    percent,
    passed: percent >= passPercent,
    elapsedSec: Math.max(0, Math.floor((finishedAt - startedAt) / 1000)),
    durationSec,
    byTopic: buildTopicStatsFromHistory(history),
  };
}
