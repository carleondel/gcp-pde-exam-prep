#!/usr/bin/env node

// Merges Gemini Pro rationale output (data/gemini-output/*.json) into
// src/data/questions.js. Adds conceptSummary, correctRationale, and
// optionRationales fields to each question by id. Does NOT delete the
// old explanation field — the hint helper still uses it.
//
// Usage:
//   node scripts/merge-gemini-rationales.js
//   node scripts/merge-gemini-rationales.js --skip-existing

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../src/data/questions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GEMINI_DIR = join(__dirname, "..", "data", "gemini-output");
const OUTPUT_FILE = join(__dirname, "..", "src", "data", "questions.js");
const REPORT_FILE = join(__dirname, "..", "data", "gemini-output", "merge-report.json");

const skipExisting = process.argv.includes("--skip-existing");

function loadRationales() {
  const files = readdirSync(GEMINI_DIR)
    .filter((file) => file.endsWith(".json") && file !== "merge-report.json")
    .sort();

  const all = [];
  const parseErrors = [];

  for (const file of files) {
    const filePath = join(GEMINI_DIR, file);
    try {
      const raw = readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      const entries = Array.isArray(parsed) ? parsed : parsed.questions || parsed;
      if (!Array.isArray(entries)) {
        parseErrors.push({ file, reason: "top-level value is not an array" });
        continue;
      }
      all.push(...entries.map((entry) => ({ ...entry, _sourceFile: file })));
    } catch (error) {
      parseErrors.push({ file, reason: error.message });
    }
  }

  return { all, parseErrors, fileCount: files.length };
}

function main() {
  const { all: rationales, parseErrors, fileCount } = loadRationales();
  const questionMap = new Map(QUESTIONS.map((question) => [question.id, question]));

  const merged = [];
  const skipped = [];
  const warnings = [];

  for (const entry of rationales) {
    const question = questionMap.get(entry.id);
    if (!question) {
      skipped.push({ id: entry.id, reason: "id not found in question bank", file: entry._sourceFile });
      continue;
    }

    if (skipExisting && question.correctRationale) {
      skipped.push({ id: entry.id, reason: "already has rationale (--skip-existing)", file: entry._sourceFile });
      continue;
    }

    if (!entry.conceptSummary || !entry.correctRationale || !Array.isArray(entry.optionRationales)) {
      skipped.push({ id: entry.id, reason: "missing required fields", file: entry._sourceFile });
      continue;
    }

    if (entry.optionRationales.length !== question.options.length) {
      warnings.push({
        id: entry.id,
        reason: `optionRationales length mismatch: got ${entry.optionRationales.length}, expected ${question.options.length}`,
        file: entry._sourceFile,
      });
    }

    const hasPlaceholder =
      entry.conceptSummary.includes("<needs review>") ||
      entry.correctRationale.includes("<needs review>") ||
      entry.optionRationales.some((rationale) => rationale.includes("<needs review>"));
    if (hasPlaceholder) {
      warnings.push({ id: entry.id, reason: "contains <needs review> placeholder", file: entry._sourceFile });
    }

    if (entry.keyDispute) {
      warnings.push({ id: entry.id, reason: `keyDispute: ${entry.keyDispute}`, file: entry._sourceFile });
    }

    question.conceptSummary = entry.conceptSummary;
    question.correctRationale = entry.correctRationale;
    question.optionRationales = entry.optionRationales;
    merged.push(entry.id);
  }

  const output = `export const QUESTIONS = ${JSON.stringify(QUESTIONS, null, 2)};\n`;
  writeFileSync(OUTPUT_FILE, output);

  const report = {
    timestamp: new Date().toISOString(),
    filesRead: fileCount,
    totalRationales: rationales.length,
    merged: merged.length,
    skipped: skipped.length,
    warnings: warnings.length,
    parseErrors,
    skippedDetails: skipped,
    warningDetails: warnings,
  };
  writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  console.log(`Merged: ${merged.length}/${rationales.length} rationales from ${fileCount} files`);
  if (skipped.length) console.log(`Skipped: ${skipped.length}`);
  if (warnings.length) console.log(`Warnings: ${warnings.length}`);
  if (parseErrors.length) console.log(`Parse errors: ${parseErrors.length}`);
  console.log(`Report: ${REPORT_FILE}`);
}

main();
