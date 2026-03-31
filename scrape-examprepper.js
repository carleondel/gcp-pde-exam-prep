/**
 * =============================================================
 * ExamPrepper Discussion Scraper - GCP Professional Data Engineer
 * =============================================================
 *
 * INSTRUCCIONES:
 *
 * 1. Inicia sesion en ExamPrepper (https://www.examprepper.co)
 *
 * 2. Ve a la PRIMERA pagina del examen PDE:
 *    https://www.examprepper.co/exam/12
 *
 * 3. Abre la consola (F12 > Console)
 *
 * 4. Pega este script COMPLETO y pulsa Enter
 *
 * 5. El script automaticamente:
 *    a) Abre todas las respuestas ("Show Answer") de la pagina
 *    b) Extrae preguntas + discusiones
 *    c) Navega a la siguiente pagina
 *    d) Repite hasta terminar
 *    e) Descarga examprepper-discussions.json
 *
 * 6. NO toques nada mientras se ejecuta (~3-5 minutos)
 *
 * CONTROLES (escribir en consola):
 *   downloadResults()  -> Descargar lo que lleva hasta ahora
 *   resetScraper()     -> Reiniciar desde cero
 *
 * =============================================================
 */

(async function scrapeExamPrepper() {
  "use strict";

  const STORAGE_KEY = "ep_data";
  const DELAY_SHOW_ANSWER = 600;   // ms entre clicks de "Show Answer"
  const DELAY_AFTER_ANSWERS = 1500; // ms tras abrir todas las respuestas
  const DELAY_NEXT_PAGE = 3000;     // ms antes de ir a la siguiente pagina

  // ===== Utilidades =====
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function log(msg) {
    console.log(`%c[ExamPrepper] ${msg}`, "color: #60a5fa; font-weight: bold;");
  }
  function logOk(msg) {
    console.log(`%c[ExamPrepper] ${msg}`, "color: #34d399; font-weight: bold;");
  }
  function logErr(msg) {
    console.error(`%c[ExamPrepper] ${msg}`, "color: #f87171; font-weight: bold;");
  }

  function loadData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  }
  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ===== Panel visual =====
  function showPanel(info) {
    let panel = document.getElementById("ep-scraper-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "ep-scraper-panel";
      panel.style.cssText = `
        position: fixed; top: 10px; right: 10px; z-index: 99999;
        background: rgba(15,23,42,0.95); color: #e2e8f0;
        padding: 16px 20px; border-radius: 16px;
        border: 1px solid rgba(59,130,246,0.4);
        font-family: monospace; font-size: 13px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        backdrop-filter: blur(10px); min-width: 300px;
      `;
      document.body.appendChild(panel);
    }
    panel.innerHTML = `
      <div style="font-weight:bold; color:#60a5fa; margin-bottom:8px;">ExamPrepper Scraper</div>
      <div>Pagina: <span style="color:#34d399">${info.page || "?"}</span></div>
      <div>Preguntas: <span style="color:#fbbf24">${info.total || 0}</span></div>
      <div>Con discusiones: <span style="color:#a78bfa">${info.withDisc || 0}</span></div>
      <div>Total comentarios: <span style="color:#f472b6">${info.totalComments || 0}</span></div>
      <div style="margin-top:6px; color:#94a3b8; font-size:11px;">${info.status || ""}</div>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button onclick="downloadResults()" style="padding:6px 12px; border-radius:8px; border:1px solid rgba(59,130,246,0.5); background:rgba(59,130,246,0.15); color:#93c5fd; cursor:pointer; font-size:12px;">
          Descargar JSON
        </button>
        <button onclick="resetScraper()" style="padding:6px 12px; border-radius:8px; border:1px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.1); color:#fca5a5; cursor:pointer; font-size:12px;">
          Reiniciar
        </button>
      </div>
    `;
  }

  // ===== Funciones globales =====
  window.downloadResults = function () {
    const data = loadData();
    const totalComments = data.reduce((s, q) => s + (q.discussions?.length || 0), 0);
    const output = {
      metadata: {
        exam: "Google Professional Data Engineer",
        scrapedAt: new Date().toISOString(),
        totalQuestions: data.length,
        withDiscussions: data.filter((q) => q.discussions?.length > 0).length,
        totalComments,
        source: "ExamPrepper",
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
    logOk(`Descargado! ${data.length} preguntas, ${totalComments} comentarios totales`);
  };

  window.resetScraper = function () {
    localStorage.removeItem(STORAGE_KEY);
    const panel = document.getElementById("ep-scraper-panel");
    if (panel) panel.remove();
    logOk("Scraper reiniciado. Puedes volver a ejecutar el script.");
  };

  // ===== Paso 1: Abrir todas las respuestas =====
  async function openAllAnswers() {
    const showButtons = [...document.querySelectorAll("button")].filter(
      (b) => b.textContent.trim() === "Show Answer"
    );
    log(`Abriendo ${showButtons.length} respuestas...`);

    for (let i = 0; i < showButtons.length; i++) {
      showButtons[i].click();
      // Pequeña pausa entre clicks para no saturar
      await sleep(DELAY_SHOW_ANSWER);
    }

    // Esperar a que todo el contenido se renderice
    await sleep(DELAY_AFTER_ANSWERS);
    logOk("Todas las respuestas abiertas");
  }

  // ===== Paso 2: Extraer datos de la pagina =====
  function extractQuestions() {
    const results = [];
    const bodyText = document.body.innerText;

    // Dividir por "Question N" headers
    const questionBlocks = bodyText.split(/(?=Question \d+\n)/);

    for (const block of questionBlocks) {
      // Verificar que es un bloque de pregunta
      const headerMatch = block.match(/^Question (\d+)\n/);
      if (!headerMatch) continue;

      const questionNumber = parseInt(headerMatch[1], 10);

      // Extraer texto de la pregunta (primera linea larga despues del header)
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      let questionText = "";
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].length > 40 && !lines[i].match(/^[A-F]\.\s*$/)) {
          questionText = lines[i];
          break;
        }
      }

      // Extraer opciones (lineas que empiezan con A. B. C. etc.)
      const options = [];
      const optionRegex = /^([A-F])\.\s*$/;
      for (let i = 0; i < lines.length; i++) {
        if (optionRegex.test(lines[i]) && i + 1 < lines.length) {
          // La opcion es la siguiente linea(s) hasta la proxima letra o seccion
          let optText = lines[i] + " " + lines[i + 1];
          options.push(optText.trim());
        }
      }

      // Extraer discusiones (bloques que empiezan con [-])
      const discussions = [];
      const commentBlocks = block.split(/\[-\]\s*\n?/);

      // El primer bloque es la pregunta, los siguientes son comentarios
      for (let i = 1; i < commentBlocks.length; i++) {
        const cb = commentBlocks[i].trim();
        if (!cb) continue;

        const cbLines = cb.split("\n").map((l) => l.trim()).filter(Boolean);
        if (cbLines.length < 3) continue;

        // Estructura: username, N points, time ago, [Selected Answer: X], comment text
        const user = cbLines[0] || "User";
        const pointsMatch = cbLines[1]?.match(/(\d+)\s*points?/i);
        const votes = pointsMatch ? parseInt(pointsMatch[1], 10) : 0;

        // Encontrar el texto del comentario (saltando metadata)
        let textStartIndex = 2; // Despues de username y points
        // Saltar la linea de tiempo ("over 3 years ago", "8 months ago", etc.)
        if (cbLines[textStartIndex]?.match(/\d+\s+(year|month|week|day|hour|minute)s?\s+ago|about|over/i)) {
          textStartIndex++;
        }

        // Recoger el texto restante
        const textLines = [];
        let selectedAnswer = "";
        for (let j = textStartIndex; j < cbLines.length; j++) {
          const line = cbLines[j];
          // Detectar "Selected Answer: X"
          const selMatch = line.match(/Selected Answer:\s*([A-F](?:,\s*[A-F])*)/i);
          if (selMatch) {
            selectedAnswer = selMatch[1];
            continue;
          }
          // Ignorar lineas de UI
          if (line.match(/^(Show Answer|Hide Answer|Reply|Report|Share)$/i)) continue;
          textLines.push(line);
        }

        let text = textLines.join("\n").trim();

        // Limpiar texto de spam/promociones
        if (text.match(/Examforsure|ExamSnap|Pass4sure|Certbolt|actual exam/i)) {
          // Es spam, solo mantener si tiene contenido tecnico tambien
          const cleanLines = textLines.filter(
            (l) => !l.match(/Examforsure|ExamSnap|Pass4sure|Certbolt|mock test platform|actual exam|I've tried|stood out/i)
          );
          text = cleanLines.join("\n").trim();
        }

        if (text.length < 5) continue;
        if (user.length < 2 || user.length > 30) continue;

        discussions.push({
          user,
          text,
          votes,
          selectedAnswer: selectedAnswer || null,
        });
      }

      results.push({
        examQuestionNumber: questionNumber,
        questionText: questionText.substring(0, 500),
        options,
        discussions,
        commentCount: discussions.length,
      });
    }

    return results;
  }

  // ===== Paso 3: Detectar pagina actual y total =====
  function getPageInfo() {
    const buttons = [...document.querySelectorAll('.chakra-button__group button, [role="group"] button')];
    const activeButton = buttons.find(
      (b) => b.getAttribute("aria-current") === "page" ||
        b.style.background?.includes("blue") ||
        b.className.includes("active") ||
        getComputedStyle(b).backgroundColor !== getComputedStyle(buttons[0] || b).backgroundColor
    );

    // Determinar pagina actual por el boton activo o por el texto
    let currentPage = 1;
    for (const b of buttons) {
      const num = parseInt(b.textContent.trim(), 10);
      if (!isNaN(num)) {
        // Check if this button looks "active" (different style)
        const style = getComputedStyle(b);
        if (
          style.backgroundColor.includes("59, 130, 246") || // blue
          style.backgroundColor.includes("66, 153, 225") || // chakra blue
          b.getAttribute("data-active") !== null ||
          b.getAttribute("aria-current") === "page" ||
          b.hasAttribute("data-active")
        ) {
          currentPage = num;
        }
      }
    }

    // Fallback: mirar el titulo de la pagina
    const titleMatch = document.title.match(/Page (\d+)/i);
    if (titleMatch) currentPage = parseInt(titleMatch[1], 10);

    // Boton "Next"
    const nextButton = buttons.find((b) => b.textContent.trim() === "Next");
    const lastButton = buttons.find((b) => b.textContent.trim() === "Last");
    const isNextDisabled = nextButton?.disabled || nextButton?.getAttribute("disabled") !== null;

    return { currentPage, nextButton, lastButton, isNextDisabled, buttons };
  }

  // ===== MAIN: Ejecutar el scraping =====

  log("=== ExamPrepper Scraper iniciado ===");
  const allData = loadData();
  const existingNums = new Set(allData.map((q) => q.examQuestionNumber));

  let pageCount = 0;
  let hasNextPage = true;

  while (hasNextPage) {
    pageCount++;
    const { currentPage, nextButton, isNextDisabled } = getPageInfo();

    const totalComments = allData.reduce((s, q) => s + (q.discussions?.length || 0), 0);
    showPanel({
      page: currentPage || pageCount,
      total: allData.length,
      withDisc: allData.filter((q) => q.discussions?.length > 0).length,
      totalComments,
      status: "Abriendo respuestas...",
    });

    log(`--- Pagina ${currentPage || pageCount} ---`);

    // Abrir todas las respuestas
    await openAllAnswers();

    showPanel({
      page: currentPage || pageCount,
      total: allData.length,
      withDisc: allData.filter((q) => q.discussions?.length > 0).length,
      totalComments,
      status: "Extrayendo discusiones...",
    });

    // Extraer preguntas y discusiones
    const pageResults = extractQuestions();
    let newCount = 0;

    for (const q of pageResults) {
      if (existingNums.has(q.examQuestionNumber)) continue;
      existingNums.add(q.examQuestionNumber);
      allData.push(q);
      newCount++;
    }

    saveData(allData);

    const pageTotalComments = pageResults.reduce((s, q) => s + (q.discussions?.length || 0), 0);
    logOk(`Pagina ${currentPage || pageCount}: ${pageResults.length} preguntas, ${pageTotalComments} comentarios, +${newCount} nuevas`);

    // Navegar a la siguiente pagina
    if (nextButton && !isNextDisabled) {
      const updatedTotalComments = allData.reduce((s, q) => s + (q.discussions?.length || 0), 0);
      showPanel({
        page: currentPage || pageCount,
        total: allData.length,
        withDisc: allData.filter((q) => q.discussions?.length > 0).length,
        totalComments: updatedTotalComments,
        status: `Navegando a pagina ${(currentPage || pageCount) + 1}...`,
      });

      nextButton.click();
      log("Click en 'Next', esperando carga...");

      // Esperar a que la pagina se actualice (SPA)
      await sleep(DELAY_NEXT_PAGE);

      // Verificar que el contenido cambio (esperando nuevas preguntas)
      let retries = 0;
      while (retries < 5) {
        const newText = document.body.innerText;
        const newFirstQ = newText.match(/Question (\d+)/);
        if (newFirstQ) {
          const firstNum = parseInt(newFirstQ[1], 10);
          if (!existingNums.has(firstNum) || retries >= 4) break;
        }
        retries++;
        await sleep(1000);
      }
    } else {
      log("No hay boton 'Next' o esta deshabilitado. Fin.");
      hasNextPage = false;
    }

    // Proteccion: maximo 100 paginas
    if (pageCount >= 100) {
      logErr("Limite de paginas alcanzado (100). Deteniendo.");
      hasNextPage = false;
    }

    // Si no se encontraron preguntas nuevas en 2 paginas seguidas, parar
    if (newCount === 0 && pageCount > 1) {
      // Dar una oportunidad mas
      if (pageCount > 2) {
        log("Sin preguntas nuevas en multiples paginas. Finalizando.");
        hasNextPage = false;
      }
    }
  }

  // ===== Resultado final =====
  const totalComments = allData.reduce((s, q) => s + (q.discussions?.length || 0), 0);
  const withDisc = allData.filter((q) => q.discussions?.length > 0).length;

  logOk("=============================================");
  logOk("       EXTRACCION COMPLETADA");
  logOk("=============================================");
  logOk(`Total preguntas: ${allData.length}`);
  logOk(`Con discusiones: ${withDisc}`);
  logOk(`Total comentarios: ${totalComments}`);
  logOk("");

  showPanel({
    page: "DONE",
    total: allData.length,
    withDisc,
    totalComments,
    status: "Completado! Descargando...",
  });

  // Descargar automaticamente
  window.downloadResults();

  logOk("Si la descarga no funciono, escribe: downloadResults()");
  logOk("Luego ejecuta: node process-discussions.js");
})();
