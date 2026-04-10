#!/usr/bin/env node

// Exports all questions to JSON batches that can be fed to Gemini Pro
// to produce per-option rationales. Output goes to data/gemini-input/.
// Each batch is small enough that Gemini's response stays within output
// token limits (~12-15k tokens per batch).

import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../src/data/questions.js";
import {
  EXAM_DOMAINS,
  getCanonicalTopic,
  getDomainForTopic,
} from "../src/data/pde-topics.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "data", "gemini-input");
const PROMPT_FILE = join(OUTPUT_DIR, "prompt.md");
const BATCH_SIZE = 40;
const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

function getCorrectIndexes(question) {
  return Array.isArray(question.correct) ? [...question.correct] : [question.correct];
}

function buildExportEntry(question) {
  const correctIndexes = getCorrectIndexes(question);
  const correctLetters = correctIndexes.map((index) => LETTERS[index]).filter(Boolean);
  const canonicalTopic = getCanonicalTopic(question.topic);
  const domain = getDomainForTopic(canonicalTopic);
  const topComments = (question.discussion || [])
    .slice(0, 4)
    .map((entry) => ({ user: entry.user, text: entry.text }));

  return {
    id: question.id,
    topic: question.topic,
    canonicalTopic,
    domainId: domain ? domain.id : null,
    domainName: domain ? domain.name : null,
    question: question.question,
    options: question.options,
    correctIndexes,
    correctLetters,
    existingExplanation: question.explanation || "",
    topComments,
  };
}

function chunk(items, size) {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

function buildPromptTemplate(totalBatches, totalQuestions) {
  return `# Gemini Pro batch instructions — GCP PDE rationales

You are receiving one batch of questions from a Google Cloud Professional Data Engineer
practice bank (${totalQuestions} questions total, split into ${totalBatches} batches).
For each question, return a structured JSON object explaining **why each option is correct
or incorrect** so that a learner who picks the wrong answer immediately understands the
distinction. Do NOT generate generic boilerplate like "this is a fully managed service" —
the existing rationales already do that and they are useless.

## How to use this prompt

1. Open one batch file (\`batch-01.json\` ... \`batch-NN.json\`).
2. Paste this prompt **above** the batch JSON in the Gemini Pro chat.
3. Save Gemini's response to \`data/gemini-output/rationales-batch-NN.json\`.

## Output format — STRICT JSON, NO MARKDOWN FENCES

Return a single JSON array. Each entry must have exactly these keys:

\`\`\`json
{
  "id": <integer matching the input id>,
  "conceptSummary": "<one sentence naming the GCP concept being tested>",
  "correctRationale": "<2-4 sentences explaining why the correct option(s) is correct, citing the specific GCP feature, limit, pricing model, or behavior that makes it right>",
  "optionRationales": [
    "<rationale for option A — 1-2 sentences explaining why A is right or specifically why A is wrong (cite the actual flaw)>",
    "<rationale for option B>",
    "<rationale for option C>",
    "<rationale for option D>"
  ]
}
\`\`\`

## Hard rules

- **Language: English only.** Use precise GCP terminology (BigQuery slots, Bigtable row keys, Pub/Sub ack deadlines, Dataflow watermarks, etc.).
- **\`optionRationales.length\` must equal \`options.length\`** in the input. If the input has 5 options, return 5 rationales. Order matches A, B, C, D, ...
- **Preserve \`id\` exactly.** This is how the merge script links your output back to the bank.
- **Be specific about why wrong options are wrong.** Don't say "it's not the best choice" — say "Cloud Functions has a 9-minute max execution time, which doesn't fit a 30-minute batch job."
- **Cross-check against \`correctIndexes\` and \`correctLetters\`.** These are the official answer keys. Trust them. If you genuinely believe the key is wrong (rare), still provide rationales for the keyed answer and add a fifth field \`"keyDispute": "your reason"\`.
- **\`existingExplanation\` is provided as context only.** It is mostly auto-generated boilerplate — use it to disambiguate the question intent, not as a source of truth.
- **\`topComments\` are real ExamTopics user comments.** Mine them for the genuine reasoning, then write a clean rationale in your own words.
- **Return ONLY the JSON array.** No markdown fences (no \`\`\`), no preamble, no closing remarks. The merge script does \`JSON.parse(response)\` directly.

## Quality bar

Each \`correctRationale\` should answer: *Why this option specifically, and not the closest distractor?*
Each wrong-option \`optionRationale\` should answer: *What would have to change about the question for this option to become correct?*

If you cannot do better than the existing explanation, write a placeholder like \`"<needs review>"\` rather than fabricating details. The merge script flags placeholders.

## Example output (for one question)

\`\`\`json
[
  {
    "id": 259,
    "conceptSummary": "Datastore exploding indexes from multiple multi-valued properties in one composite index.",
    "correctRationale": "Datastore creates one index entry per cartesian combination of multi-valued properties in a composite index, so a single index over actors+tags+date_released would explode. Defining two separate composite indexes — actors+date_released and tags+date_released — keeps each index linear in the size of one array property and still serves both query patterns.",
    "optionRationales": [
      "Correct: two narrow composite indexes, each spanning only one multi-valued property plus date_released, satisfy both query patterns without exploding.",
      "Wrong: this single index spans actors AND tags together (two multi-valued properties), which is exactly the cartesian explosion the question asks you to avoid.",
      "Wrong: excluding actors and tags from indexes means you cannot filter by actor=<name> or tag=Comedy at all, breaking both required queries.",
      "Wrong: 'date_published' is not a property in the schema — the field is 'date_released'. Even if the typo were corrected, excluding the sort key would prevent ordering by date_released."
    ]
  }
]
\`\`\`
`;
}

function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const exportEntries = QUESTIONS.map(buildExportEntry);
  const batches = chunk(exportEntries, BATCH_SIZE);
  const totalBatches = batches.length;

  batches.forEach((entries, index) => {
    const batchIndex = index + 1;
    const fileName = `batch-${String(batchIndex).padStart(2, "0")}.json`;
    const filePath = join(OUTPUT_DIR, fileName);
    const payload = {
      batchIndex,
      totalBatches,
      questionCount: entries.length,
      questions: entries,
    };
    writeFileSync(filePath, JSON.stringify(payload, null, 2));
  });

  const prompt = buildPromptTemplate(totalBatches, exportEntries.length);
  writeFileSync(PROMPT_FILE, prompt);

  console.log(`Exported ${exportEntries.length} questions across ${totalBatches} batches`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Prompt: ${PROMPT_FILE}`);
  console.log("\nDomain distribution in export:");
  const counts = new Map(EXAM_DOMAINS.map((domain) => [domain.id, 0]));
  let unmatched = 0;
  for (const entry of exportEntries) {
    if (entry.domainId && counts.has(entry.domainId)) {
      counts.set(entry.domainId, counts.get(entry.domainId) + 1);
    } else {
      unmatched += 1;
    }
  }
  for (const domain of EXAM_DOMAINS) {
    console.log(`  ${domain.short}: ${counts.get(domain.id)}`);
  }
  if (unmatched > 0) console.log(`  unmatched: ${unmatched}`);
}

main();
