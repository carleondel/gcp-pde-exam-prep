#!/usr/bin/env node
/**
 * =============================================================
 * Process ExamTopics Discussions -> Integrate into App
 * =============================================================
 *
 * USO:
 *   node process-discussions.js
 *
 * REQUISITOS:
 *   - El archivo "examtopics-discussions.json" debe estar en esta carpeta
 *     (descargado por el script de navegador scrape-examtopics.js)
 *
 * QUE HACE:
 *   1. Lee examtopics-discussions.json
 *   2. Lee las preguntas actuales de gcp-pde-exam-prep.jsx
 *   3. Empareja preguntas por similitud de texto (fuzzy matching)
 *   4. Reemplaza las discusiones genericas por las reales
 *   5. Genera el archivo actualizado
 *   6. Muestra un informe de emparejamiento
 *
 * =============================================================
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ========== CONFIG ==========
const DISCUSSIONS_FILE = join(__dirname, "..", "data", "examtopics-discussions.json");
const SOURCE_FILE = join(__dirname, "..", "src", "data", "questions.js");
const OUTPUT_FILE = join(__dirname, "..", "src", "data", "questions.js");
const BACKUP_FILE = join(__dirname, "..", "data", "questions.backup.js");
const MATCH_REPORT_FILE = join(__dirname, "..", "data", "match-report.json");

// Umbral minimo de similitud para considerar un match (0-1)
const MIN_SIMILARITY = 0.55;
// Maximo de comentarios por pregunta en la app
const MAX_COMMENTS = 6;
// Minimo de caracteres para considerar un comentario valido
const MIN_COMMENT_LENGTH = 15;

// ========== UTILIDADES ==========

/**
 * Normaliza texto para comparacion:
 * - minusculas, sin puntuacion extra, sin espacios multiples
 */
function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Calcula similitud entre dos strings usando coeficiente de Jaccard
 * sobre n-gramas de palabras
 */
function textSimilarity(a, b) {
  const wordsA = new Set(normalize(a).split(" ").filter((w) => w.length > 2));
  const wordsB = new Set(normalize(b).split(" ").filter((w) => w.length > 2));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) intersection++;
  }

  const union = wordsA.size + wordsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Match mas agresivo: busca las primeras N palabras significativas
 */
function prefixSimilarity(a, b, wordCount = 12) {
  const wordsA = normalize(a).split(" ").filter((w) => w.length > 2).slice(0, wordCount);
  const wordsB = normalize(b).split(" ").filter((w) => w.length > 2).slice(0, wordCount);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  let matches = 0;
  for (const word of wordsA) {
    if (wordsB.includes(word)) matches++;
  }

  return matches / Math.max(wordsA.length, wordsB.length);
}

/**
 * Combinacion de metricas de similitud
 */
function combinedSimilarity(a, b) {
  const jaccard = textSimilarity(a, b);
  const prefix = prefixSimilarity(a, b);
  // Dar mas peso al prefijo (las preguntas suelen empezar igual)
  return jaccard * 0.4 + prefix * 0.6;
}

/**
 * Limpia y formatea un comentario para la app
 */
function cleanComment(comment) {
  let text = (comment.text || "").trim();
  // Eliminar saltos de linea excesivos
  text = text.replace(/\n{3,}/g, "\n\n");
  // Eliminar caracteres de control
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  // Eliminar texto contaminado del scraper (panel flotante)
  text = text.replace(/ExamPrepper\s*Scraper[\s\S]*?(Reiniciar|Descargar JSON)/g, "").trim();
  text = text.replace(/Pagina:\s*\d+[\s\S]*?Total comentarios:\s*\d+/g, "").trim();
  text = text.replace(/(First|Previous|Next|Last)\n(\d+\n){2,}/g, "").trim();
  // NO escapar comillas aqui — escapeForJS lo hace
  // Truncar si es muy largo
  if (text.length > 500) text = text.substring(0, 497) + "...";

  let user = (comment.user || "User").trim();
  // Limpiar username
  user = user.replace(/"/g, "").substring(0, 20);
  if (!user || user === "Anonymous") user = "User" + Math.floor(Math.random() * 900 + 100);

  return { user, text };
}

/**
 * Escapa texto para incluir en un string JS (entre comillas dobles)
 * Orden: primero backslashes, luego comillas, luego newlines
 */
function escapeForJS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}

// ========== MAIN ==========

function main() {
  console.log("\n=== Process ExamTopics Discussions ===\n");

  // 1. Verificar archivos
  if (!existsSync(DISCUSSIONS_FILE)) {
    console.error(`ERROR: No se encuentra "${DISCUSSIONS_FILE}"`);
    console.error("Ejecuta primero el script de navegador en ExamTopics");
    console.error("para generar examtopics-discussions.json");
    process.exit(1);
  }

  if (!existsSync(SOURCE_FILE)) {
    console.error(`ERROR: No se encuentra "${SOURCE_FILE}"`);
    process.exit(1);
  }

  // 2. Leer datos
  console.log("Leyendo examtopics-discussions.json...");
  const scrapedData = JSON.parse(readFileSync(DISCUSSIONS_FILE, "utf-8"));
  const scrapedQuestions = scrapedData.questions || [];
  console.log(`  -> ${scrapedQuestions.length} preguntas de ExamTopics`);
  console.log(
    `  -> ${scrapedQuestions.filter((q) => q.commentCount > 0).length} con discusiones`
  );

  console.log("\nLeyendo gcp-pde-exam-prep.jsx...");
  const sourceCode = readFileSync(SOURCE_FILE, "utf-8");

  // 3. Extraer preguntas del archivo JSX
  // Parseamos el array QUESTIONS del archivo fuente
  const questionsMatch = sourceCode.match(
    /const QUESTIONS = \[([\s\S]*?)\];\s*\n\s*(?:const TOPICS|\/\/)/
  );

  if (!questionsMatch) {
    console.error("ERROR: No se pudo encontrar el array QUESTIONS en el archivo");
    process.exit(1);
  }

  // Extraer textos de preguntas del JSX para matching
  const questionRegex = /id:(\d+),\s*topic:"([^"]*)",[^}]*question:"([^"]*?)"/g;
  const appQuestions = [];
  let match;
  while ((match = questionRegex.exec(sourceCode)) !== null) {
    appQuestions.push({
      id: parseInt(match[1], 10),
      topic: match[2],
      questionText: match[3],
    });
  }
  console.log(`  -> ${appQuestions.length} preguntas en la app`);

  // 4. Emparejar preguntas
  // Primero intentar match directo por numero de pregunta (ExamPrepper usa examQuestionNumber)
  // Luego fallback a fuzzy matching por texto
  console.log("\nEmparejando preguntas...");

  // Crear indice por numero de pregunta para match directo
  const scrapedByNumber = new Map();
  for (let i = 0; i < scrapedQuestions.length; i++) {
    const num = scrapedQuestions[i].examTopicsNumber || scrapedQuestions[i].examQuestionNumber;
    if (num) scrapedByNumber.set(num, { index: i, scraped: scrapedQuestions[i] });
  }

  const matchResults = [];
  const matchedScraped = new Set();
  let matchCount = 0;
  let noMatchCount = 0;
  let noDiscussionCount = 0;
  let directMatchCount = 0;
  let fuzzyMatchCount = 0;

  for (const appQ of appQuestions) {
    let bestMatch = null;
    let bestScore = 0;
    let matchType = "none";

    // Intento 1: match directo por id == examQuestionNumber
    // Ambas fuentes tienen 319 preguntas numeradas 1-319, confiamos en el numero
    const directHit = scrapedByNumber.get(appQ.id);
    if (directHit && !matchedScraped.has(directHit.index)) {
      bestMatch = { index: directHit.index, scraped: directHit.scraped, score: 1.0 };
      bestScore = 1.0;
      matchType = "direct";
    }

    // Intento 2: fuzzy matching si no hubo match directo
    if (!bestMatch) {
      for (let i = 0; i < scrapedQuestions.length; i++) {
        if (matchedScraped.has(i)) continue;

        const scraped = scrapedQuestions[i];
        const textToCompare =
          scraped.questionText || scraped.fullQuestionText || scraped.questionTextPreview || "";

        if (!textToCompare) continue;

        const score = combinedSimilarity(appQ.questionText, textToCompare);

        if (score > bestScore) {
          bestScore = score;
          bestMatch = { index: i, scraped, score };
          matchType = "fuzzy";
        }
      }
    }

    if (bestMatch && (matchType === "direct" || bestScore >= MIN_SIMILARITY)) {
      matchedScraped.add(bestMatch.index);
      if (matchType === "direct") directMatchCount++;
      else fuzzyMatchCount++;

      const discussions = (bestMatch.scraped.discussions || [])
        .filter((d) => d.text && d.text.length >= MIN_COMMENT_LENGTH)
        .sort((a, b) => (b.votes || 0) - (a.votes || 0))
        .slice(0, MAX_COMMENTS)
        .map(cleanComment);

      matchResults.push({
        appId: appQ.id,
        topic: appQ.topic,
        similarity: Math.round(bestScore * 100),
        examTopicsNumber: bestMatch.scraped.examTopicsNumber || bestMatch.scraped.examQuestionNumber,
        discussionCount: discussions.length,
        discussions,
        status: discussions.length > 0 ? "matched" : "matched_no_discussions",
        matchType,
      });

      if (discussions.length > 0) {
        matchCount++;
      } else {
        noDiscussionCount++;
      }
    } else {
      matchResults.push({
        appId: appQ.id,
        topic: appQ.topic,
        similarity: bestMatch ? Math.round(bestScore * 100) : 0,
        examTopicsNumber: null,
        discussionCount: 0,
        discussions: [],
        status: "no_match",
      });
      noMatchCount++;
    }
  }

  console.log(`\n--- Informe de Emparejamiento ---`);
  console.log(`  Match directo (por numero):  ${directMatchCount}`);
  console.log(`  Match fuzzy (por texto):     ${fuzzyMatchCount}`);
  console.log(`  Emparejadas con discusiones: ${matchCount}`);
  console.log(`  Emparejadas sin discusiones: ${noDiscussionCount}`);
  console.log(`  Sin emparejar:               ${noMatchCount}`);
  console.log(`  Total:                       ${appQuestions.length}`);

  // 5. Crear backup
  console.log(`\nCreando backup: ${BACKUP_FILE}`);
  writeFileSync(BACKUP_FILE, sourceCode, "utf-8");

  // 6. Reemplazar discusiones en el archivo fuente
  console.log("Actualizando discusiones en gcp-pde-exam-prep.jsx...");

  let updatedSource = sourceCode;
  let replaceCount = 0;

  for (const result of matchResults) {
    if (result.discussions.length === 0) continue;

    // Construir el nuevo array de discusiones como string JS
    const discussionEntries = result.discussions
      .map(
        (d) =>
          `{user:"${escapeForJS(d.user)}",text:"${escapeForJS(d.text)}"}`
      )
      .join(", ");
    const newDiscussion = `discussion:[${discussionEntries}]`;

    // Buscar la discusion existente para esta pregunta (por id)
    // Patron: id:N, ... discussion:[...] }
    const idPattern = new RegExp(
      `(id:${result.appId},\\s*topic:"[^"]*"[^}]*?)discussion:\\[[^\\]]*\\]`,
      "s"
    );

    // Usar funcion de reemplazo para evitar que $1, $&, etc. en el texto
    // de comentarios se interpreten como backreferences de regex
    const replaced = updatedSource.replace(idPattern, (_match, prefix) => prefix + newDiscussion);

    if (replaced !== updatedSource) {
      updatedSource = replaced;
      replaceCount++;
    }
  }

  console.log(`  -> ${replaceCount} discusiones reemplazadas`);

  // 7. Escribir archivo actualizado
  writeFileSync(OUTPUT_FILE, updatedSource, "utf-8");
  console.log(`\nArchivo actualizado: ${OUTPUT_FILE}`);

  // 8. Guardar informe de emparejamiento
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalAppQuestions: appQuestions.length,
      totalScrapedQuestions: scrapedQuestions.length,
      matchedWithDiscussions: matchCount,
      matchedWithoutDiscussions: noDiscussionCount,
      notMatched: noMatchCount,
      replacedInFile: replaceCount,
    },
    details: matchResults.map((r) => ({
      appId: r.appId,
      topic: r.topic,
      status: r.status,
      similarity: r.similarity + "%",
      examTopicsQ: r.examTopicsNumber,
      discussions: r.discussionCount,
    })),
    unmatched: matchResults
      .filter((r) => r.status === "no_match")
      .map((r) => ({
        appId: r.appId,
        topic: r.topic,
        bestSimilarity: r.similarity + "%",
      })),
  };

  writeFileSync(MATCH_REPORT_FILE, JSON.stringify(report, null, 2), "utf-8");
  console.log(`Informe guardado: ${MATCH_REPORT_FILE}`);

  console.log("\n=== COMPLETADO ===");
  console.log(`\nSiguientes pasos:`);
  console.log(`  1. Revisa ${MATCH_REPORT_FILE} para ver el emparejamiento`);
  console.log(`  2. Ejecuta 'npm run dev' para ver los cambios`);
  console.log(`  3. Si algo sale mal, restaura desde ${BACKUP_FILE}`);
}

main();
