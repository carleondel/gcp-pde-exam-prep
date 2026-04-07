#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../src/data/questions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DUMP_FILE = join(__dirname, "..", "data", "examtopics-recent-raw.txt");
const OUTPUT_FILE = join(__dirname, "..", "src", "data", "questions.js");
const NORMALIZED_OUTPUT_FILE = join(__dirname, "..", "data", "examtopics-recent-normalized.json");
const REPORT_OUTPUT_FILE = join(__dirname, "..", "data", "examtopics-recent-import-report.json");

const IMPORT_BATCH = "examtopics-2026-04";
const TARGET_EXAM = "professional-data-engineer";
const MIN_MATCH_SIMILARITY = 0.72;
const SAME_ID_FALLBACK_SIMILARITY = 0.45;
const MAX_DISCUSSIONS = 6;

const TOPIC_OVERRIDES = {
  317: "Data Migration",
  318: "BigQuery DR",
  319: "Security/DLP",
  320: "BigQuery",
  323: "Security/IAM",
  326: "BigQuery",
  327: "ML/AI",
  328: "BigQuery",
  329: "Storage",
  332: "BigQuery",
  338: "Security/DLP",
  344: "Spanner",
  345: "ML/AI",
  346: "BigQuery",
  348: "Dataplex",
};

const DIFFICULTY_OVERRIDES = {
  317: 2,
  318: 2,
  319: 2,
  320: 2,
  323: 2,
  326: 2,
  327: 2,
  328: 2,
  329: 2,
  332: 2,
  338: 2,
  344: 1,
  345: 2,
  346: 2,
  348: 2,
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function textSimilarity(a, b) {
  const wordsA = new Set(normalize(a).split(" ").filter((word) => word.length > 2));
  const wordsB = new Set(normalize(b).split(" ").filter((word) => word.length > 2));

  if (!wordsA.size || !wordsB.size) return 0;

  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection += 1;
  }

  const union = wordsA.size + wordsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

function prefixSimilarity(a, b, wordCount = 14) {
  const wordsA = normalize(a).split(" ").filter((word) => word.length > 2).slice(0, wordCount);
  const wordsB = normalize(b).split(" ").filter((word) => word.length > 2).slice(0, wordCount);

  if (!wordsA.length || !wordsB.length) return 0;

  let matches = 0;
  for (const word of wordsA) {
    if (wordsB.includes(word)) matches += 1;
  }

  return matches / Math.max(wordsA.length, wordsB.length);
}

function combinedSimilarity(a, b) {
  return textSimilarity(a, b) * 0.4 + prefixSimilarity(a, b) * 0.6;
}

function parseAnswerLetters(rawValue) {
  if (!rawValue) return [];
  const compact = String(rawValue)
    .replace(/🗳️.*$/u, "")
    .replace(/^.*?:\s*/u, "")
    .split("\n")[0]
    .toUpperCase()
    .trim();
  if (!compact) return [];
  return [...compact.replace(/[^A-F]/g, "")];
}

function answerLettersToIndexes(letters) {
  return letters.map((letter) => letter.charCodeAt(0) - 65).filter((index) => index >= 0);
}

function looksLikeMultiAnswer(questionText) {
  return /(choose\s+(two|three|2|3)|select\s+(two|three|2|3)|pick\s+(two|three|2|3))/i.test(questionText || "");
}

function isNoiseLine(line) {
  return !line
    || /^Chosen Answer:/i.test(line)
    || /^This is a voting comment/i.test(line)
    || /^Please explain your answer/i.test(line)
    || /^Community vote distribution/i.test(line)
    || /^Most Voted$/i.test(line)
    || /^by\s+/i.test(line)
    || /^(Home|Account|Logout|Contact|Resources|Platform|Company|ExamTopics|Examtopics\.com|Google Discussions)$/i.test(line)
    || /^Currently there are no comments/i.test(line);
}

function isFooterLine(line) {
  return /^ExamTopics/i.test(line)
    || /^Examtopics\.com/i.test(line)
    || /^©\s*\d{4}/.test(line)
    || /Mail Us/i.test(line)
    || /^Contact$/i.test(line)
    || /^Home$/i.test(line)
    || /^Account$/i.test(line)
    || /^Platform$/i.test(line);
}

function cleanQuestionText(rawText) {
  return (rawText || "")
    .replace(/\s+/g, " ")
    .replace(/\s+([?.!,;:])/g, "$1")
    .trim();
}

function cleanCommentText(rawText) {
  return (rawText || "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractQuestionText(segment) {
  const allQuestionsMatch = segment.match(/\[All [^\]]+ Questions\]([\s\S]*?)^[A-F]\.\s/m);
  if (!allQuestionsMatch) return "";
  const candidate = allQuestionsMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !isNoiseLine(line));
  return cleanQuestionText(candidate.join(" "));
}

function extractOptions(segment) {
  return [...segment.matchAll(/^[A-F]\.\s.*$/gm)].map((match) => match[0].trim());
}

function extractComments(segment) {
  const commentsSection = segment.split(/Comments/i)[1] || "";
  if (!commentsSection || /Currently there are no comments/i.test(commentsSection)) return [];

  const lines = commentsSection
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const comments = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/^Selected Answer:/i.test(line)) continue;

    const selectedAnswer = parseAnswerLetters(line)[0] || null;
    let user = "ExamTopics";

    for (let back = index - 1; back >= Math.max(0, index - 3); back -= 1) {
      const candidate = lines[back];
      if (isNoiseLine(candidate)) continue;
      const userMatch = candidate.match(/^([A-Za-z0-9_.-]{2,30})\b/);
      if (userMatch) {
        user = userMatch[1];
        break;
      }
    }

    const textLines = [];
    let votes = 0;
    let cursor = index + 1;

    while (cursor < lines.length) {
      const nextLine = lines[cursor];
      if (/^Selected Answer:/i.test(nextLine)) break;
      if (isFooterLine(nextLine)) break;

      const voteMatch = nextLine.match(/^upvoted\s+(\d+)\s+times?/i);
      if (voteMatch) {
        votes = parseInt(voteMatch[1], 10);
        cursor += 1;
        break;
      }

      if (!isNoiseLine(nextLine)) {
        textLines.push(nextLine);
      }

      cursor += 1;
    }

    index = cursor - 1;

    const text = cleanCommentText(textLines.join("\n"));
    if (!text) continue;

    comments.push({
      user,
      text,
      votes,
      selectedAnswer,
    });
  }

  const deduped = [];
  const seen = new Set();

  for (const comment of comments) {
    const key = `${comment.user}::${comment.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(comment);
  }

  return deduped.slice(0, MAX_DISCUSSIONS);
}

function summarizeDiscussion(comments, fallbackAnswer) {
  if (!comments.length) {
    return fallbackAnswer ? `Respuesta sugerida: ${fallbackAnswer}.` : "";
  }

  const sorted = [...comments].sort((left, right) => (right.votes || 0) - (left.votes || 0));
  const selectedMatch = sorted.find((comment) => comment.selectedAnswer && comment.text);
  const base = selectedMatch || sorted[0];
  const firstSentence = base.text.split(/(?<=[.!?])\s+/)[0] || base.text;
  return cleanCommentText(firstSentence).slice(0, 280);
}

function getCommunityConsensus(comments) {
  const counts = new Map();
  for (const comment of comments) {
    if (!comment.selectedAnswer) continue;
    counts.set(comment.selectedAnswer, (counts.get(comment.selectedAnswer) || 0) + Math.max(comment.votes || 0, 1));
  }

  const ordered = [...counts.entries()].sort((left, right) => right[1] - left[1]);
  if (!ordered.length) return null;
  if (ordered.length === 1) return ordered[0][0];
  if (ordered[0][1] === ordered[1][1]) return null;
  return ordered[0][0];
}

function resolveAnswer(questionText, suggestedLetters, comments) {
  const multi = looksLikeMultiAnswer(questionText);
  const communityConsensus = getCommunityConsensus(comments);
  const suggestedSingle = suggestedLetters.length === 1 ? suggestedLetters[0] : null;

  let answerLetters = [];
  let conflict = false;

  if (multi) {
    answerLetters = suggestedLetters.length ? suggestedLetters : communityConsensus ? [communityConsensus] : [];
    conflict = suggestedLetters.length === 0;
  } else if (suggestedSingle) {
    answerLetters = [suggestedSingle];
    if (communityConsensus && communityConsensus !== suggestedSingle) conflict = true;
  } else if (communityConsensus) {
    answerLetters = [communityConsensus];
    conflict = suggestedLetters.length > 1;
  } else if (suggestedLetters.length > 1) {
    answerLetters = [suggestedLetters[0]];
    conflict = true;
  }

  const answerIndexes = answerLettersToIndexes(answerLetters);
  if (!answerIndexes.length) return { correct: null, conflict: true };

  return {
    correct: multi ? answerIndexes : answerIndexes[0],
    conflict,
  };
}

function inferConfidence(question, comments, parseConflict, mergeConflict) {
  if (mergeConflict || parseConflict) return "low";
  if (!comments.length) return "low";
  if (comments.length < 2) return "medium";
  if (question.suggestedAnswer && getCommunityConsensus(comments)) return "high";
  return "medium";
}

function inferTopic(questionNumber, questionText, options) {
  if (TOPIC_OVERRIDES[questionNumber]) return TOPIC_OVERRIDES[questionNumber];

  const normalizedQuestion = normalize(questionText);
  if (normalizedQuestion.includes("bigquery")) return "BigQuery";
  if (normalizedQuestion.includes("dataplex")) return "Dataplex";
  if (normalizedQuestion.includes("spanner")) return "Spanner";
  if (normalizedQuestion.includes("vertex ai") || normalizedQuestion.includes("model") || normalizedQuestion.includes("embedding")) return "ML/AI";
  if (normalizedQuestion.includes("cloud storage")) return "Storage";
  if (normalizedQuestion.includes("iam") || normalizedQuestion.includes("group")) return "Security/IAM";
  if (normalizedQuestion.includes("privacy") || normalizedQuestion.includes("sensitive")) return "Security/DLP";
  if (normalizedQuestion.includes("looker studio")) return "BigQuery";
  if (options.some((option) => option.includes("Dataflow"))) return "Dataflow";
  return "BigQuery";
}

function inferDifficulty(questionNumber) {
  return DIFFICULTY_OVERRIDES[questionNumber] || 2;
}

function toExamSlug(examTitle) {
  return normalize(examTitle).replace(/\s+/g, "-");
}

function parseSegment(segment) {
  const examTitle = segment.match(/^Actual exam question from Google's (.+)$/m)?.[1]?.trim() || "";
  const sourceExam = toExamSlug(examTitle);
  const questionNumber = parseInt(segment.match(/Question #:\s*(\d+)/)?.[1] || "", 10);

  if (!examTitle || !Number.isFinite(questionNumber)) return null;

  const questionText = extractQuestionText(segment);
  const options = extractOptions(segment);
  const suggestedAnswerLetters = parseAnswerLetters(segment.match(/Suggested Answer:\s*([A-F,\s]+)/i)?.[1] || "");
  const comments = extractComments(segment);
  const { correct, conflict } = resolveAnswer(questionText, suggestedAnswerLetters, comments);
  const discussionSummary = summarizeDiscussion(comments, suggestedAnswerLetters.join(""));

  return {
    examTitle,
    sourceExam,
    sourceQuestionNumber: questionNumber,
    question: questionText,
    options,
    suggestedAnswer: suggestedAnswerLetters.join(""),
    discussion: comments.map((comment) => ({
      user: comment.user,
      text: comment.text,
    })),
    rawComments: comments,
    discussionSummary,
    parsedCorrect: correct,
    parseConflict: conflict,
  };
}

function parseRawDump(rawText) {
  const segments = rawText
    .split(/(?=Actual exam question from Google's )/g)
    .map((segment) => segment.trim())
    .filter((segment) => segment.includes("Question #:"));

  return segments
    .map(parseSegment)
    .filter(Boolean);
}

function findBestExistingMatch(importedQuestion, existingQuestions) {
  const directMatch = existingQuestions.find((question) =>
    question.sourceQuestionNumber === importedQuestion.sourceQuestionNumber
    || question.id === importedQuestion.sourceQuestionNumber
  );

  if (directMatch) {
    const similarity = combinedSimilarity(importedQuestion.question, directMatch.question);
    if (similarity >= SAME_ID_FALLBACK_SIMILARITY) {
      return { question: directMatch, similarity, reason: "same-id" };
    }
  }

  let bestMatch = null;
  let bestSimilarity = 0;
  for (const question of existingQuestions) {
    const similarity = combinedSimilarity(importedQuestion.question, question.question);
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestMatch = question;
    }
  }

  if (bestMatch && bestSimilarity >= MIN_MATCH_SIMILARITY) {
    return { question: bestMatch, similarity: bestSimilarity, reason: "fuzzy" };
  }

  return null;
}

function buildBaseMetadata(question) {
  const isLegacyExamprepper = (question.source || "examprepper") === "examprepper"
    && !question.isRecent
    && !question.importBatch;
  return {
    source: question.source || "examprepper",
    sourceExam: question.sourceExam || TARGET_EXAM,
    sourceQuestionNumber: !isLegacyExamprepper && Number.isFinite(question.sourceQuestionNumber) ? question.sourceQuestionNumber : null,
    isRecent: Boolean(question.isRecent),
    importBatch: question.importBatch || null,
    confidence: question.confidence || "medium",
    conflict: Boolean(question.conflict),
    discussionSummary: question.discussionSummary || "",
  };
}

function normalizeExistingQuestions(existingQuestions) {
  const normalized = existingQuestions.map((question) => ({
    ...question,
    ...buildBaseMetadata(question),
  }));

  let nextId = normalized.reduce((max, question) => Math.max(max, question.id), 0);
  const seenIds = new Set();

  return normalized.map((question) => {
    if (!seenIds.has(question.id)) {
      seenIds.add(question.id);
      return question;
    }

    nextId += 1;
    seenIds.add(nextId);
    return {
      ...question,
      id: nextId,
    };
  });
}

function serializeQuestions(questions) {
  return `export const QUESTIONS = ${JSON.stringify(questions, null, 2)};\n`;
}

function main() {
  if (!existsSync(RAW_DUMP_FILE)) {
    console.error(`No se encuentra ${RAW_DUMP_FILE}`);
    process.exit(1);
  }

  const rawDump = readFileSync(RAW_DUMP_FILE, "utf-8");
  const parsedEntries = parseRawDump(rawDump);
  const validEntries = parsedEntries.filter((entry) => entry.sourceExam === TARGET_EXAM);
  const excludedEntries = parsedEntries.filter((entry) => entry.sourceExam !== TARGET_EXAM);

  const questions = normalizeExistingQuestions(QUESTIONS);

  const mergedQuestions = [...questions];
  let nextGeneratedId = mergedQuestions.reduce((max, question) => Math.max(max, question.id), 0);
  const summary = {
    totalRawEntries: parsedEntries.length,
    importedPdeEntries: validEntries.length,
    excludedNonPdeEntries: excludedEntries.length,
    newQuestionsAdded: 0,
    mergedQuestionsUpdated: 0,
    conflictsMarked: 0,
    lowConfidenceCount: 0,
    discardedEntries: excludedEntries.map((entry) => ({
      sourceExam: entry.sourceExam,
      sourceQuestionNumber: entry.sourceQuestionNumber,
    })),
  };

  const details = [];

  for (const entry of validEntries) {
    const match = findBestExistingMatch(entry, mergedQuestions);
    const existing = match?.question || null;
    const isRefreshOfRecentImport = existing
      && existing.isRecent
      && existing.sourceQuestionNumber === entry.sourceQuestionNumber;
    const contentConflict = existing && !isRefreshOfRecentImport
      ? combinedSimilarity(entry.question, existing.question) < SAME_ID_FALLBACK_SIMILARITY
        || (existing.correct !== entry.parsedCorrect && JSON.stringify(existing.correct) !== JSON.stringify(entry.parsedCorrect))
      : false;
    const sourceConflict = entry.parsedCorrect === null || entry.parseConflict;
    const mergeConflict = sourceConflict || contentConflict;
    const preserveExistingAnswer = existing && !isRefreshOfRecentImport && mergeConflict;

    const confidence = inferConfidence(entry, entry.rawComments, sourceConflict, contentConflict);
    const topic = existing?.topic || inferTopic(entry.sourceQuestionNumber, entry.question, entry.options);
    const difficulty = existing?.difficulty || inferDifficulty(entry.sourceQuestionNumber);
    const hasIdCollision = !existing && mergedQuestions.some((question) => question.id === entry.sourceQuestionNumber);
    const nextId = hasIdCollision ? ++nextGeneratedId : entry.sourceQuestionNumber;

    const importedQuestion = {
      id: existing?.id || nextId,
      topic,
      difficulty,
      question: entry.question,
      options: entry.options,
      correct: preserveExistingAnswer ? existing.correct : entry.parsedCorrect,
      explanation: preserveExistingAnswer
        ? existing.explanation
        : (entry.discussionSummary || (existing?.explanation ?? "")),
      discussion: preserveExistingAnswer
        ? existing.discussion
        : (entry.discussion.length ? entry.discussion : (existing?.discussion ?? [])),
      source: existing ? "merged" : "examtopics",
      sourceExam: TARGET_EXAM,
      sourceQuestionNumber: entry.sourceQuestionNumber,
      isRecent: true,
      importBatch: IMPORT_BATCH,
      confidence,
      conflict: mergeConflict,
      discussionSummary: entry.discussionSummary,
    };

    if (existing) {
      const existingIndex = mergedQuestions.findIndex((question) => question.id === existing.id);
      mergedQuestions.splice(existingIndex, 1, {
        ...existing,
        ...importedQuestion,
      });
      summary.mergedQuestionsUpdated += 1;
      if (mergeConflict) summary.conflictsMarked += 1;
    } else {
      mergedQuestions.push(importedQuestion);
      summary.newQuestionsAdded += 1;
      if (mergeConflict) summary.conflictsMarked += 1;
    }

    if (confidence === "low") summary.lowConfidenceCount += 1;

    details.push({
      id: importedQuestion.id,
      sourceQuestionNumber: entry.sourceQuestionNumber,
      status: existing ? "merged" : "added",
      matchReason: match?.reason || "new",
      similarity: match ? Math.round(match.similarity * 100) : 100,
      confidence,
      conflict: mergeConflict,
      sourceExam: entry.sourceExam,
    });
  }

  mergedQuestions.sort((left, right) => left.id - right.id);

  const importedRecentNumbers = validEntries.map((entry) => entry.sourceQuestionNumber);
  const recentMin = Math.min(...importedRecentNumbers);
  const recentMax = Math.max(...importedRecentNumbers);
  const missingRecentNumbers = [];
  for (let questionNumber = recentMin; questionNumber <= recentMax; questionNumber += 1) {
    if (!importedRecentNumbers.includes(questionNumber)) missingRecentNumbers.push(questionNumber);
  }

  const report = {
    timestamp: new Date().toISOString(),
    batch: IMPORT_BATCH,
    summary: {
      ...summary,
      recentRange: [recentMin, recentMax],
      missingRecentNumbers,
      finalQuestionCount: mergedQuestions.length,
    },
    details,
  };

  writeFileSync(OUTPUT_FILE, serializeQuestions(mergedQuestions), "utf-8");
  writeFileSync(NORMALIZED_OUTPUT_FILE, JSON.stringify(validEntries.map((entry) => ({
    sourceExam: entry.sourceExam,
    sourceQuestionNumber: entry.sourceQuestionNumber,
    question: entry.question,
    options: entry.options,
    suggestedAnswer: entry.suggestedAnswer,
    discussionSummary: entry.discussionSummary,
    parsedCorrect: entry.parsedCorrect,
    parseConflict: entry.parseConflict,
  })), null, 2), "utf-8");
  writeFileSync(REPORT_OUTPUT_FILE, JSON.stringify(report, null, 2), "utf-8");

  console.log(`Importadas PDE: ${summary.importedPdeEntries}`);
  console.log(`Descartadas por examen distinto: ${summary.excludedNonPdeEntries}`);
  console.log(`Nuevas añadidas: ${summary.newQuestionsAdded}`);
  console.log(`Coincidentes actualizadas: ${summary.mergedQuestionsUpdated}`);
  console.log(`Conflictos marcados: ${summary.conflictsMarked}`);
  console.log(`Faltantes en rango reciente ${recentMin}-${recentMax}: ${missingRecentNumbers.join(", ") || "ninguna"}`);
}

main();
