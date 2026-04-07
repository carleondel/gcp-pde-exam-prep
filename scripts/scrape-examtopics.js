/**
 * =============================================================
 * ExamTopics Discussion Scraper v2 - GCP Professional Data Engineer
 * =============================================================
 * Trabaja sobre el DOM RENDERIZADO (no usa fetch).
 * Se auto-navega entre paginas acumulando resultados en localStorage.
 *
 * INSTRUCCIONES:
 *
 * 1. Inicia sesion en ExamTopics
 *
 * 2. Ve a la PRIMERA pagina del examen PDE:
 *    https://www.examtopics.com/exams/google/professional-data-engineer/view/
 *
 * 3. Abre la consola (F12 > Console)
 *
 * 4. Pega este script COMPLETO y pulsa Enter
 *
 * 5. El script:
 *    a) Extrae las preguntas y discusiones de la pagina actual
 *    b) Navega automaticamente a la siguiente pagina
 *    c) Repite hasta que no haya mas paginas
 *    d) Descarga el JSON final
 *
 * 6. Si se interrumpe, vuelve a pegar el script en la pagina
 *    donde te quedaste — retoma desde donde estaba (usa localStorage)
 *
 * CONTROLES:
 *   - Para ver el progreso: localStorage.getItem("et_progress")
 *   - Para reiniciar:       localStorage.removeItem("et_data"); localStorage.removeItem("et_progress")
 *   - Para descargar ahora: downloadResults()  (en la consola)
 *
 * =============================================================
 */

(function scrapeCurrentPage() {
  "use strict";

  const STORAGE_KEY = "et_data";
  const PROGRESS_KEY = "et_progress";
  const DELAY_NEXT_PAGE = 4000; // ms antes de navegar a la siguiente pagina

  // ===== Utilidades =====
  function log(msg) {
    console.log(`%c[Scraper] ${msg}`, "color: #60a5fa; font-weight: bold;");
  }
  function logOk(msg) {
    console.log(`%c[Scraper] ${msg}`, "color: #34d399; font-weight: bold;");
  }
  function logWarn(msg) {
    console.warn(`%c[Scraper] ${msg}`, "color: #fbbf24; font-weight: bold;");
  }

  // Obtener datos acumulados
  function loadData() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch { return []; }
  }
  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  function setProgress(info) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ ...info, timestamp: new Date().toISOString() }));
  }

  // ===== Detectar pagina actual =====
  const currentUrl = location.href;
  const pageMatch = currentUrl.match(/\/view\/(\d+)\/?/);
  const currentPage = pageMatch ? parseInt(pageMatch[1], 10) : 1;

  log(`Pagina actual: ${currentPage} (${currentUrl})`);

  // ===== Extraer preguntas y discusiones del DOM renderizado =====

  function extractFromDOM() {
    const results = [];

    // --- Estrategia 1: Buscar cards de preguntas ---
    // ExamTopics usa .exam-question-card o similar
    const cards = document.querySelectorAll(
      ".exam-question-card, .question-body, .card.exam-question-card"
    );

    if (cards.length > 0) {
      log(`Encontradas ${cards.length} cards de preguntas`);
      for (const card of cards) {
        results.push(extractFromCard(card));
      }
      return results;
    }

    // --- Estrategia 2: Buscar por estructura de texto ---
    // Buscar todas las "question-body" divs
    const questionBodies = document.querySelectorAll("[class*='question-body'], [class*='question_body']");
    if (questionBodies.length > 0) {
      log(`Encontrados ${questionBodies.length} question-bodies`);
      for (const qb of questionBodies) {
        const card = qb.closest(".card") || qb.parentElement;
        results.push(extractFromCard(card || qb));
      }
      return results;
    }

    // --- Estrategia 3: Buscar por links de discusion ---
    const discLinks = document.querySelectorAll('a[href*="/discussions/google/view/"]');
    if (discLinks.length > 0) {
      log(`Encontrados ${discLinks.length} links de discusion`);
      for (const link of discLinks) {
        const href = link.getAttribute("href") || "";
        if (!href.includes("professional-data-engineer")) continue;
        const container = link.closest(".card") || link.closest("[class*='question']") || link.parentElement?.parentElement?.parentElement;
        if (container) {
          results.push(extractFromCard(container, href));
        }
      }
      return results;
    }

    // --- Estrategia 4: Brute force - buscar toda la pagina ---
    log("Usando estrategia brute-force...");
    return extractBruteForce();
  }

  function extractFromCard(card, discussionUrl) {
    const result = {
      questionText: "",
      options: [],
      discussionUrl: discussionUrl || "",
      examTopicsNumber: null,
      discussions: [],
    };

    // Extraer texto de la pregunta
    const questionPs = card.querySelectorAll("p");
    for (const p of questionPs) {
      const text = p.textContent.trim();
      if (text.length > 40 && (text.includes("?") || text.includes("should you do") || text.includes("What"))) {
        result.questionText = text;
        break;
      }
    }
    // Fallback: primer parrafo largo
    if (!result.questionText) {
      for (const p of questionPs) {
        if (p.textContent.trim().length > 60) {
          result.questionText = p.textContent.trim();
          break;
        }
      }
    }

    // Extraer opciones
    const optionEls = card.querySelectorAll("li, .multi-choice-item, [class*='choice'], [class*='option']");
    for (const opt of optionEls) {
      const t = opt.textContent.trim();
      if (t.length > 3 && t.length < 1000) result.options.push(t);
    }

    // Extraer URL de discusion si no la tenemos
    if (!result.discussionUrl) {
      const dLink = card.querySelector('a[href*="/discussions/"]');
      if (dLink) result.discussionUrl = dLink.getAttribute("href") || "";
    }

    // Extraer numero de pregunta
    const numMatch = (result.discussionUrl || "").match(/question-(\d+)/);
    if (numMatch) result.examTopicsNumber = parseInt(numMatch[1], 10);

    // Si no hay numero en URL, buscar en el texto del card
    if (!result.examTopicsNumber) {
      const headerText = card.textContent;
      const qNumMatch = headerText.match(/Question\s*#?\s*(\d+)/i);
      if (qNumMatch) result.examTopicsNumber = parseInt(qNumMatch[1], 10);
    }

    // Extraer discusiones/comentarios
    result.discussions = extractComments(card);

    return result;
  }

  function extractComments(container) {
    const comments = [];
    const rawText = container.textContent;

    // Buscar bloques de comentarios por patrones conocidos de ExamTopics
    // Patron: username + "Highly Voted"/"Most Recent" + timestamp + texto + "upvoted N times"

    // Metodo 1: Regex sobre el texto completo
    const commentPattern = /\n\s*([\w\d]+)\s*\n[^]*?(Highly Voted|Most Recent|Selected Answer)[^]*?(\d+\s+(?:year|month|week|day|hour)s?[^]*?ago)\s*\n([^]*?)upvoted\s+(\d+)\s+times/g;

    let match;
    while ((match = commentPattern.exec(rawText)) !== null) {
      const user = match[1].trim();
      const rawComment = match[4].trim();
      const votes = parseInt(match[5], 10);

      // Limpiar el texto del comentario
      let text = rawComment
        .replace(/Selected Answer:\s*[A-F]/g, "")
        .replace(/\t+/g, " ")
        .replace(/\n{2,}/g, "\n")
        .replace(/Switch to a voting comment.*$/s, "")
        .replace(/Submit\s*Cancel/g, "")
        .trim();

      if (text.length > 10 && user.length > 1 && user.length < 30) {
        comments.push({ user, text, votes });
      }
    }

    // Metodo 2: Si el regex no funciono, intentar un enfoque mas simple
    if (comments.length === 0) {
      // Buscar "upvoted N times" como ancla y trabajar hacia atras
      const upvoteMatches = rawText.match(/upvoted\s+(\d+)\s+times/g);
      if (upvoteMatches && upvoteMatches.length > 0) {
        // Dividir el texto en bloques usando "upvoted X times" como separador
        const blocks = rawText.split(/upvoted\s+\d+\s+times/);
        const voteCounts = rawText.match(/upvoted\s+(\d+)\s+times/g);

        for (let i = 0; i < blocks.length - 1; i++) {
          const block = blocks[i];
          const votes = voteCounts[i] ? parseInt(voteCounts[i].match(/(\d+)/)[1], 10) : 0;

          // Extraer username (suele estar cerca del inicio del bloque o despues de un timestamp)
          const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);

          let user = "User";
          let text = "";

          // Buscar username: una linea corta (< 25 chars) seguida de contenido
          for (let j = lines.length - 1; j >= 0; j--) {
            const line = lines[j];
            if (line.match(/^\w[\w\d]{2,24}$/) && !line.match(/^(Submit|Cancel|New|Selected|Switch|Chosen)/)) {
              user = line;
              // El texto del comentario es lo que viene despues del username/timestamp
              const textLines = lines.slice(j + 1).filter(l =>
                l.length > 5 &&
                !l.match(/^(Highly Voted|Most Recent|Selected Answer|Submit|Cancel|Switch|New$|\d+ (year|month|week|day))/) &&
                !l.match(/^\d+$/)
              );
              text = textLines.join(" ").trim();
              break;
            }
          }

          // Limpiar texto
          text = text
            .replace(/Selected Answer:\s*[A-F]/g, "")
            .replace(/This is a voting comment.*$/s, "")
            .replace(/Switch to a voting comment.*/g, "")
            .replace(/Submit\s*Cancel/g, "")
            .replace(/\s{2,}/g, " ")
            .trim();

          if (text.length > 15) {
            comments.push({ user, text, votes });
          }
        }
      }
    }

    // Metodo 3: Buscar elementos DOM de comentarios
    if (comments.length === 0) {
      const commentEls = container.querySelectorAll("[class*='comment'], [class*='discuss']");
      for (const el of commentEls) {
        const text = el.textContent.trim();
        if (text.length > 20 && text.length < 3000) {
          comments.push({
            user: "User",
            text: text.substring(0, 500),
            votes: 0,
          });
        }
      }
    }

    // Deduplicar
    const seen = new Set();
    return comments.filter(c => {
      const key = c.text.substring(0, 80);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function extractBruteForce() {
    const results = [];
    const fullText = document.body.textContent;

    // Buscar todos los links de discusion en la pagina
    const links = document.querySelectorAll('a[href*="professional-data-engineer"]');
    for (const link of links) {
      const href = link.getAttribute("href") || "";
      if (!href.includes("/discussions/")) continue;

      const numMatch = href.match(/question-(\d+)/);
      results.push({
        questionText: "",
        options: [],
        discussionUrl: href.startsWith("http") ? href : `https://www.examtopics.com${href}`,
        examTopicsNumber: numMatch ? parseInt(numMatch[1], 10) : null,
        discussions: [],
      });
    }

    return results;
  }

  // ===== Funcion de descarga global =====
  window.downloadResults = function() {
    const data = loadData();
    const output = {
      metadata: {
        exam: "Google Professional Data Engineer",
        scrapedAt: new Date().toISOString(),
        totalQuestions: data.length,
        withDiscussions: data.filter(q => q.discussions && q.discussions.length > 0).length,
        source: "ExamTopics",
      },
      questions: data,
    };

    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "examtopics-discussions.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logOk(`Descargado! ${data.length} preguntas, ${output.metadata.withDiscussions} con discusiones`);
  };

  // ===== Ejecutar extraccion en la pagina actual =====
  log("Extrayendo datos del DOM...");
  const pageResults = extractFromDOM();
  log(`Preguntas extraidas en esta pagina: ${pageResults.length}`);

  // Acumular resultados
  const allData = loadData();
  const existingNums = new Set(allData.map(q => q.examTopicsNumber).filter(Boolean));
  let newCount = 0;

  for (const q of pageResults) {
    if (q.examTopicsNumber && existingNums.has(q.examTopicsNumber)) continue;
    allData.push(q);
    existingNums.add(q.examTopicsNumber);
    newCount++;
  }

  saveData(allData);
  setProgress({ page: currentPage, totalQuestions: allData.length, newThisPage: newCount });

  logOk(`Pagina ${currentPage}: +${newCount} nuevas | Total acumulado: ${allData.length}`);
  const withDisc = allData.filter(q => q.discussions && q.discussions.length > 0).length;
  log(`Con discusiones: ${withDisc}`);

  // ===== Navegar a la siguiente pagina =====
  // Buscar el link "Next" o la siguiente pagina
  const nextLink = document.querySelector(
    'a[rel="next"], a.page-link[aria-label="Next"], li.page-item:last-child a, a:has(> .fa-chevron-right), a:has(> .fa-angle-right)'
  );

  // Fallback: buscar un link que apunte a /view/N+1/
  let nextUrl = null;
  if (nextLink) {
    nextUrl = nextLink.getAttribute("href");
  }

  if (!nextUrl) {
    // Buscar todos los links de paginacion
    const pageLinks = document.querySelectorAll('a[href*="/view/"]');
    for (const pl of pageLinks) {
      const href = pl.getAttribute("href") || "";
      const m = href.match(/\/view\/(\d+)\/?$/);
      if (m && parseInt(m[1], 10) === currentPage + 1) {
        nextUrl = href;
        break;
      }
    }
  }

  if (!nextUrl) {
    // Ultimo intento: construir la URL manualmente
    const possibleNext = `/exams/google/professional-data-engineer/view/${currentPage + 1}/`;
    // Verificar si existe un link a esta pagina en el DOM
    const exists = document.querySelector(`a[href*="/view/${currentPage + 1}"]`);
    if (exists) nextUrl = possibleNext;
  }

  if (nextUrl && newCount > 0) {
    const fullNextUrl = nextUrl.startsWith("http") ? nextUrl : `https://www.examtopics.com${nextUrl}`;
    log(`Navegando a pagina ${currentPage + 1} en ${DELAY_NEXT_PAGE / 1000}s...`);
    log(`URL: ${fullNextUrl}`);
    log(`(Para detener, cierra esta pestana o recarga la pagina)`);

    setTimeout(() => {
      window.location.href = fullNextUrl;
    }, DELAY_NEXT_PAGE);
  } else {
    // No hay mas paginas o no se encontraron preguntas nuevas
    logOk("=============================================");
    logOk("       EXTRACCION COMPLETADA");
    logOk("=============================================");
    logOk(`Total de preguntas: ${allData.length}`);
    logOk(`Con discusiones: ${withDisc}`);
    logOk("");
    logOk("Descargando JSON automaticamente...");
    window.downloadResults();
    logOk("");
    logOk("Si la descarga no funciono, escribe: downloadResults()");
    logOk("Para reiniciar: localStorage.removeItem('et_data')");
  }

  // ===== Panel de control visual (esquina superior derecha) =====
  const panel = document.createElement("div");
  panel.id = "scraper-panel";
  if (!document.getElementById("scraper-panel")) {
    panel.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 99999;
      background: rgba(15,23,42,0.95); color: #e2e8f0;
      padding: 16px 20px; border-radius: 16px;
      border: 1px solid rgba(59,130,246,0.4);
      font-family: monospace; font-size: 13px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      backdrop-filter: blur(10px);
      min-width: 280px;
    `;
    panel.innerHTML = `
      <div style="font-weight:bold; color:#60a5fa; margin-bottom:8px;">ExamTopics Scraper v2</div>
      <div>Pagina: <span style="color:#34d399">${currentPage}</span></div>
      <div>Preguntas: <span style="color:#fbbf24">${allData.length}</span></div>
      <div>Con discusiones: <span style="color:#a78bfa">${withDisc}</span></div>
      <div>Nuevas esta pagina: <span style="color:#34d399">+${newCount}</span></div>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button onclick="downloadResults()" style="padding:6px 12px; border-radius:8px; border:1px solid rgba(59,130,246,0.5); background:rgba(59,130,246,0.15); color:#93c5fd; cursor:pointer; font-size:12px;">
          Descargar JSON
        </button>
        <button onclick="localStorage.removeItem('et_data');localStorage.removeItem('et_progress');location.reload()" style="padding:6px 12px; border-radius:8px; border:1px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.1); color:#fca5a5; cursor:pointer; font-size:12px;">
          Reiniciar
        </button>
      </div>
      ${nextUrl && newCount > 0 ? `<div style="margin-top:8px; color:#94a3b8; font-size:11px;">Auto-navegando en ${DELAY_NEXT_PAGE / 1000}s...</div>` : ""}
    `;
    document.body.appendChild(panel);
  }
})();
