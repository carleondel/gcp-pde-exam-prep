import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  RANKS,
  ACHIEVEMENTS,
  DOMAIN_MASTERY_PERCENT,
  applyDiminishing,
  selectDragon,
  getBattleQuestions,
} from "./data/gamification.js";
import { createDomainHelpers, getWeakestDomain } from "./engine/domain-helpers.js";
import { AchievementPopup } from "./components/rewards/index.js";
import "./styles/animations.css";
import {
  DAILY_CHALLENGE_BONUS_XP,
  DAILY_CHALLENGE_COUNT,
  appendTopicAttempt,
  buildDailyChallengeQuestions,
  computeMockDistribution,
  buildPracticeQuestions,
  calculatePracticeXp,
  canSubmitAnswer,
  computeWeakTopics,
  evaluateAnswer,
  get5050HiddenOptions,
  pushWrongQuestionId,
  serializeSelection,
} from "./engine/quiz-engine";
import {
  buildBlockRoundSummary,
  getBlockProgressRecord,
  getBlockRoundNumber,
  isBlockMastered,
} from "./engine/block-study";
import {
  advanceSession,
  createPracticeSession,
  hydrateBlockSession,
  hydrateMockSession,
  withRecordedMockAnswer,
} from "./engine/session-manager";
import {
  EMPTY_PROGRESS,
  completeDailyChallenge,
  createStorage,
  isDailyChallengeCompleted,
  updateDailyStreak,
} from "./engine/storage";
import { getActiveCert, isKnownCertId, CERT_LIST } from "./certs/index.js";
import BlockView from "./views/BlockView.jsx";
import HomeView from "./views/HomeView.jsx";
import QuizHeader from "./views/QuizHeader.jsx";
import QuizView from "./views/QuizView.jsx";
import RewardOverlays from "./views/RewardOverlays.jsx";
import MockView from "./views/MockView.jsx";
import PracticeView from "./views/PracticeView.jsx";
import ProgressView from "./views/ProgressView.jsx";
import TopicPicker from "./views/TopicPicker.jsx";
import ResultView from "./views/ResultView.jsx";
import CertPicker from "./components/CertPicker.jsx";
import { usePracticeConfig } from "./hooks/usePracticeConfig.js";
import { useBlockStudy } from "./hooks/useBlockStudy.js";
import { useMockSession } from "./hooks/useMockSession.js";
import { useProgress } from "./hooks/useProgress.js";
import { formatDumpDate } from "./engine/format.js";
import { formatPracticeBadge } from "./ui/formatting.js";
import { PRACTICE_SOURCE_META, sanitizeBlockSize } from "./ui/practice-prefs.js";

const CERT_ID_FROM_URL = new URLSearchParams(window.location.search).get("cert");
const NEEDS_CERT_PICK = !isKnownCertId(CERT_ID_FROM_URL) && CERT_LIST.length > 1;

function openCertPicker() {
  const params = new URLSearchParams(window.location.search);
  params.delete("cert");
  window.location.search = params.toString();
}

const ACTIVE_CERT = getActiveCert(CERT_ID_FROM_URL);

const QUESTIONS_DUMPED_ON = formatDumpDate(ACTIVE_CERT.questionsDumpedAt);

const PASS_PERCENT = ACTIVE_CERT.passPercent;
const MOCK_QUESTION_COUNT = ACTIVE_CERT.mock.count;
const MOCK_DURATION_SEC = ACTIVE_CERT.mock.durationSec;
const EXAM_DOMAINS = ACTIVE_CERT.examDomains;

const { getCanonicalTopic, computeDomainStats, computeCanonicalTopicStats } =
  createDomainHelpers(ACTIVE_CERT);

const {
  clearActiveBlockSession,
  clearActiveMock,
  loadActiveBlockSession,
  loadActiveMock,
  loadBlockPrefs,
  loadPracticePrefs,
  loadProgress,
  saveActiveBlockSession,
  saveActiveMock,
  saveBlockPrefs,
  savePracticePrefs,
  saveProgress,
} = createStorage(ACTIVE_CERT.id);

const MENU_VIEW_LABELS = {
  blocks: "Bloques de estudio",
  practice: "Sesión a medida",
  mock: "Simulacro",
  progress: "Inventario y logros",
};

function normalizeSessionUi(session) {
  return {
    selectedAnswer: session?.ui?.selectedAnswer ?? null,
    showResult: !!session?.ui?.showResult,
    showDiscussion: !!session?.ui?.showDiscussion,
    hiddenOptions: Array.isArray(session?.ui?.hiddenOptions) ? session.ui.hiddenOptions : [],
    showHint: !!session?.ui?.showHint,
  };
}

function serializeUiState(selectedAnswer, hiddenOptions, showResult, showDiscussion, showHint) {
  return {
    selectedAnswer: serializeSelection(selectedAnswer),
    showResult,
    showDiscussion,
    hiddenOptions: [...hiddenOptions],
    showHint,
  };
}

function getRankState(xp) {
  const current = [...RANKS].reverse().find((rank) => xp >= rank.minXP) || RANKS[0];
  const next = RANKS[RANKS.indexOf(current) + 1];
  const progress = next ? ((xp - current.minXP) / (next.minXP - current.minXP)) * 100 : 100;
  return { current, next, progress };
}

// Todos los dominios por encima del umbral, ninguno rezagado.
//
// computeDomainStats deja accuracy en null por debajo de 10 intentos, así
// que el guardarraíl contra "100% con una sola respuesta" ya viene dado:
// un dominio sin datos suficientes no puede satisfacer la condición.
function hasMasteredEveryDomain(topicHistory) {
  const stats = computeDomainStats(topicHistory);
  if (!stats.length) return false;
  return stats.every(
    (domain) => domain.accuracy !== null && domain.accuracy >= DOMAIN_MASTERY_PERCENT,
  );
}

function getAchievementSnapshot(progress) {
  return {
    xp: progress.xp,
    correct: progress.stats.totalCorrect,
    maxStreak: progress.stats.maxStreak,
    fastCorrect: progress.stats.fastCorrect,
    hardCorrect: progress.stats.hardCorrect,
    jackpot: progress.stats.jackpot,
    topicsOk: progress.stats.topicsOk.length,
    chestsOpened: progress.stats.chestsOpened,
    scratchUsed: progress.stats.scratchUsed,
    powerupsUsed: progress.stats.powerupsUsed,
    bossWins: progress.stats.bossWins,
    highestTierDefeated: progress.stats.highestTierDefeated || 0,
    totalBossDmgDealt: progress.stats.totalBossDmgDealt || 0,
    flawlessBossWin: !!progress.stats.flawlessBossWin,
    allDomainsMastered: hasMasteredEveryDomain(progress.topicHistory),
    // El platino se mide contra la colección, no contra las estadísticas.
    unlocked: progress.achievements,
  };
}

function rollPracticeRewards(streak, hasBossKey) {
  const rewards = [];
  if (streak === 3 || streak === 7 || streak === 12) rewards.push("wheel");
  if (streak === 5 || streak === 10) rewards.push("chest");
  if (Math.random() < 0.15) rewards.push("wheel");
  if (Math.random() < 0.08) rewards.push("scratch");
  if (Math.random() < 0.04) rewards.push("chest");
  if (streak === 10 || (hasBossKey && Math.random() < 0.2)) rewards.push("boss");
  return rewards;
}

function buildTopicCounts(questions) {
  const counts = {};
  questions.forEach((question) => {
    counts[question.topic] = (counts[question.topic] || 0) + 1;
  });
  return counts;
}

// Exported for integration tests: they mount the real screen with a small
// fake bank, which is the only way to check the hooks are actually wired
// into it rather than merely correct in isolation.
export function AppContent({ allQuestions }) {
  const qRef = useRef(null);
  const previousAchievementsRef = useRef([]);
  const topics = useMemo(() => [...new Set(allQuestions.map((q) => q.topic))], [allQuestions]);
  const questionMap = useMemo(
    () => new Map(allQuestions.map((question) => [question.id, question])),
    [allQuestions],
  );
  const topicCounts = useMemo(() => buildTopicCounts(allQuestions), [allQuestions]);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState("menu");
  // Sub-vista del menú: la portada muestra acciones y progreso, y cada
  // configurador vive en su propia vista para no competir con ellos.
  const [menuView, setMenuView] = useState("home");
  const { progress, updateProgress, resetProgress, hydrateProgress } = useProgress({
    emptyProgress: EMPTY_PROGRESS,
    loadProgress,
    saveProgress,
    getAchievementSnapshot,
  });
  const [session, setSession] = useState(null);
  const [resultPayload, setResultPayload] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showAllRationales, setShowAllRationales] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [showBoss, setShowBoss] = useState(false);
  const [bossQuestions, setBossQuestions] = useState(null);
  const [bossDragon, setBossDragon] = useState(null);
  const [rewardFlow, setRewardFlow] = useState("manual");
  const [showAch, setShowAch] = useState(null);
  const [xpPop, setXpPop] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [now, setNow] = useState(Date.now());

  const achievementSet = useMemo(() => new Set(progress.achievements), [progress.achievements]);
  const bookmarkSet = useMemo(() => new Set(progress.bookmarks), [progress.bookmarks]);
  const weakTopics = useMemo(
    () => computeWeakTopics(progress.topicHistory).slice(0, 4),
    [progress.topicHistory],
  );
  const rankState = useMemo(() => getRankState(progress.xp), [progress.xp]);
  const domainStats = useMemo(
    () => computeDomainStats(progress.topicHistory),
    [progress.topicHistory],
  );
  const canonicalTopicStats = useMemo(
    () => computeCanonicalTopicStats(progress.topicHistory),
    [progress.topicHistory],
  );
  const weakestDomain = useMemo(() => getWeakestDomain(domainStats), [domainStats]);
  const weakTopicSet = useMemo(() => new Set(weakTopics.map((topic) => topic.topic)), [weakTopics]);
  const wrongQuestions = useMemo(
    () => progress.wrongQuestionIds.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.wrongQuestionIds, questionMap],
  );
  const bookmarkedQuestions = useMemo(
    () => progress.bookmarks.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.bookmarks, questionMap],
  );
  const recentQuestions = useMemo(
    () => allQuestions.filter((question) => question.isRecent),
    [allQuestions],
  );
  const weakQuestions = useMemo(
    () => allQuestions.filter((question) => weakTopicSet.has(question.topic)),
    [allQuestions, weakTopicSet],
  );
  const {
    selectedTopics,
    setSelectedTopics,
    practiceOrder,
    setPracticeOrder,
    practiceSource,
    setPracticeSource,
    practiceLimit,
    setPracticeLimit,
    showCustomLimit,
    setShowCustomLimit,
    practiceMessage,
    setPracticeMessage,
    topicQuestions,
    practiceSourceCounts,
    maxPracticeCount,
    effectivePracticeLimit,
  } = usePracticeConfig({
    allQuestions,
    topics,
    recentQuestions,
    wrongQuestions,
    bookmarkedQuestions,
    weakQuestions,
    loadPracticePrefs,
    savePracticePrefs,
    ready,
  });
  const {
    savedBlockSession,
    setSavedBlockSession,
    blockTrackSize,
    setBlockTrackSize,
    setSelectedBlockIndex,
    blockMessage,
    setBlockMessage,
    blockCatalog,
    selectedBlock,
    suggestedBlock,
    selectedBlockProgress,
    trackRoundStats,
    recordBlockRound,
  } = useBlockStudy({
    allQuestions,
    progress,
    updateProgress,
    session,
    loadBlockPrefs,
    saveBlockPrefs,
    saveActiveBlockSession,
    clearActiveBlockSession,
    ready,
  });
  const {
    savedMockSession,
    setSavedMockSession,
    mockPreferRecent,
    setMockPreferRecent,
    mockRemainingSec,
    mockExpired,
    createMockAttempt,
    recordMockResult,
    discardMock,
  } = useMockSession({
    allQuestions,
    questionMap,
    updateProgress,
    session,
    now,
    questionCount: MOCK_QUESTION_COUNT,
    durationSec: MOCK_DURATION_SEC,
    passPercent: PASS_PERCENT,
    examDomains: ACTIVE_CERT.examDomains,
    topicMap: ACTIVE_CERT.topicMap,
    saveActiveMock,
    clearActiveMock,
    ready,
  });
  const maxPresetLabel =
    maxPracticeCount > 0 ? `Máximo disponible (${maxPracticeCount})` : "Máximo disponible";
  const practiceSummary = useMemo(() => {
    if (practiceSource === "recent") {
      return {
        title: "Recientes",
        subtitle: recentQuestions.length
          ? "Bloque priorizado con las preguntas más nuevas importadas."
          : PRACTICE_SOURCE_META.recent.empty,
        badge: formatPracticeBadge(recentQuestions.length, "pregunta", "preguntas"),
      };
    }
    if (practiceSource === "wrong") {
      return {
        title: "Solo fallos",
        subtitle: "Repaso directo sobre preguntas falladas.",
        badge: formatPracticeBadge(progress.wrongQuestionIds.length, "error", "errores"),
      };
    }
    if (practiceSource === "bookmarks") {
      return {
        title: "Marcadas",
        subtitle: "Vuelve a las preguntas reservadas para repaso.",
        badge: formatPracticeBadge(progress.bookmarks.length, "marcada", "marcadas"),
      };
    }
    if (practiceSource === "weak") {
      return {
        title: "Peor rendimiento",
        subtitle: weakTopics.length
          ? "Carga automática de las áreas con menor acierto."
          : PRACTICE_SOURCE_META.weak.empty,
        badge: formatPracticeBadge(weakTopics.length, "tema", "temas"),
      };
    }
    return {
      title: "Por dominio",
      subtitle:
        selectedTopics.size === topics.length
          ? "Banco completo listo para práctica."
          : "Sesión filtrada por dominio.",
      badge: formatPracticeBadge(selectedTopics.size, "tema", "temas"),
    };
  }, [
    practiceSource,
    progress.bookmarks.length,
    progress.wrongQuestionIds.length,
    recentQuestions.length,
    selectedTopics.size,
    topics.length,
    weakTopics.length,
  ]);

  const currentQuestions = useMemo(() => {
    if (!session) return [];
    return session.mode === "practice"
      ? session.questions
      : session.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  }, [session, questionMap]);

  const currentQuestion = session ? currentQuestions[session.currentIndex] : null;
  const practiceMode = session?.mode === "practice";
  const blockMode = practiceMode && session?.meta?.source === "blocks";
  const blockSessionMeta = blockMode ? session.meta.blockStudy : null;
  // One name for the three kinds of session the quiz screen renders. Blocks
  // are practice sessions underneath, so this collapses the two flags above
  // into the single thing the views actually switch on.
  const quizMode = blockMode ? "blocks" : session?.mode === "mock" ? "mock" : "practice";
  const currentEvaluation = currentQuestion
    ? evaluateAnswer(currentQuestion, selectedAnswer)
    : null;
  const isMulti = currentQuestion ? Array.isArray(currentQuestion.correct) : false;
  const canSubmitCurrent = currentQuestion
    ? canSubmitAnswer(currentQuestion, selectedAnswer)
    : false;
  const blockElapsedSec = blockMode ? Math.floor((now - session.startedAt) / 1000) : 0;
  const pendingRewardCount = practiceMode ? session.rewardQueue.length : 0;

  const resetQuestionUi = useCallback(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowDiscussion(false);
    setShowAllRationales(false);
    setHiddenOptions(new Set());
    setShowHint(false);
    if (qRef.current) qRef.current.scrollTop = 0;
  }, []);

  const finishPracticeSession = useCallback(
    (finishedSession) => {
      const isDaily = finishedSession.meta?.source === "daily";
      const isBlocks = finishedSession.meta?.source === "blocks";
      const rawDailyBonus =
        isDaily && !isDailyChallengeCompleted(progress) ? DAILY_CHALLENGE_BONUS_XP : 0;
      const dailyBonus = rawDailyBonus > 0 ? applyDiminishing(rawDailyBonus, progress.xp) : 0;
      const baseXp = finishedSession.history.reduce((sum, entry) => sum + entry.xp, 0);
      const summary = {
        score: finishedSession.score,
        answered: finishedSession.answered,
        percent: finishedSession.answered
          ? Math.round((finishedSession.score / finishedSession.answered) * 100)
          : 0,
        maxStreak: finishedSession.maxStreak,
        xpGained: baseXp + dailyBonus,
        dailyBonus,
      };
      if (isDaily && dailyBonus > 0) {
        updateProgress((prev) => ({
          ...completeDailyChallenge(prev),
          xp: prev.xp + dailyBonus,
        }));
      }
      const blockRoundSummary = isBlocks ? buildBlockRoundSummary(finishedSession) : null;
      if (blockRoundSummary) {
        recordBlockRound(finishedSession, blockRoundSummary);
        clearActiveBlockSession();
        setSavedBlockSession(null);
      }
      setSession(finishedSession);
      setResultPayload({
        mode: isBlocks ? "blocks" : isDaily ? "daily" : "practice",
        history: finishedSession.history,
        summary,
        blockStudy: isBlocks
          ? {
              ...finishedSession.meta.blockStudy,
              roundSummary: blockRoundSummary,
            }
          : null,
      });
      setScreen("results");
      resetQuestionUi();
    },
    [progress, recordBlockRound, resetQuestionUi, setSavedBlockSession, updateProgress],
  );

  /**
   * Grading and the progress write live in useMockSession; what stays here is
   * the part that is about the screen — showing the result and clearing the
   * question UI.
   */
  const finalizeMockSession = useCallback(
    (sessionToFinish, reason = "completed") => {
      const finished = recordMockResult(sessionToFinish, reason);
      if (!finished) return;

      setSession({ ...sessionToFinish, status: "finished" });
      setResultPayload({
        mode: "mock",
        reason,
        history: finished.history,
        summary: finished.summary,
      });
      setScreen("results");
      resetQuestionUi();
    },
    [recordMockResult, resetQuestionUi],
  );

  const advancePracticeSession = useCallback(
    (baseSession) => {
      const nextSession = advanceSession(baseSession);
      if (nextSession.status === "finished") {
        finishPracticeSession({ ...baseSession, status: "finished" });
        return;
      }
      setSession(nextSession);
      if (nextSession.meta?.source === "blocks") setSavedBlockSession(nextSession);
      resetQuestionUi();
    },
    [finishPracticeSession, resetQuestionUi, setSavedBlockSession],
  );

  const openRewardByKey = useCallback(
    (rewardKey, flow = "manual") => {
      setRewardFlow(flow);
      if (rewardKey === "wheel") setShowWheel(true);
      if (rewardKey === "scratch") setShowScratch(true);
      if (rewardKey === "chest") setShowChest(true);
      if (rewardKey === "boss") {
        const dragon = selectDragon(progress.xp);
        const battleQuestions = getBattleQuestions(allQuestions, dragon);
        setBossDragon(dragon);
        setBossQuestions(battleQuestions);
        setShowBoss(true);
      }
    },
    [allQuestions, progress.xp],
  );

  const openQueuedPracticeReward = useCallback(() => {
    if (!session || session.mode !== "practice") return;
    if (session.rewardQueue.length > 0) {
      const [nextReward, ...rest] = session.rewardQueue;
      setSession({
        ...session,
        rewardQueue: rest,
      });
      openRewardByKey(nextReward, "queued");
      return;
    }
    advancePracticeSession(session);
  }, [advancePracticeSession, openRewardByKey, session]);

  const afterRewardClose = useCallback(() => {
    if (rewardFlow === "queued") openQueuedPracticeReward();
    setRewardFlow("manual");
  }, [openQueuedPracticeReward, rewardFlow]);

  /**
   * Closes whichever overlay is open. A boss battle also has its questions
   * and its dragon to let go of; the prize screens have nothing to tidy.
   */
  const closeReward = useCallback(
    (kind) => {
      if (kind === "wheel") setShowWheel(false);
      if (kind === "scratch") setShowScratch(false);
      if (kind === "chest") setShowChest(false);
      if (kind === "boss") {
        setShowBoss(false);
        setBossQuestions(null);
        setBossDragon(null);
      }
      afterRewardClose();
    },
    [afterRewardClose],
  );

  useEffect(() => {
    document.title = `${ACTIVE_CERT.name} Exam Prep`;
  }, []);

  useEffect(() => {
    const savedProgress = hydrateProgress();
    const storedMock = loadActiveMock();
    const storedBlock = loadActiveBlockSession();
    const restoredMock = storedMock ? hydrateMockSession(storedMock, questionMap) : null;
    const restoredBlock = storedBlock ? hydrateBlockSession(storedBlock, questionMap) : null;

    previousAchievementsRef.current = savedProgress.achievements;

    if (restoredMock) {
      setSavedMockSession(restoredMock);
      setSession(restoredMock);
      setScreen("quiz");
    } else if (restoredBlock) {
      const uiState = normalizeSessionUi(restoredBlock);
      const restoreSelection = (question) => {
        const raw = uiState.selectedAnswer;
        if (!Array.isArray(raw)) return raw;
        if (Array.isArray(question?.correct)) return new Set(raw);
        return raw.length ? raw[0] : null;
      };
      if (restoredBlock.pausedElapsedSec != null) {
        restoredBlock.startedAt = Date.now() - restoredBlock.pausedElapsedSec * 1000;
        delete restoredBlock.pausedElapsedSec;
      }
      setSavedBlockSession(restoredBlock);
      setBlockTrackSize(sanitizeBlockSize(restoredBlock.meta?.blockStudy?.size));
      setSelectedBlockIndex(restoredBlock.meta?.blockStudy?.blockIndex || 0);
      setSession(restoredBlock);
      setSelectedAnswer(restoreSelection(restoredBlock.questions[restoredBlock.currentIndex]));
      setShowResult(uiState.showResult);
      setShowDiscussion(uiState.showDiscussion);
      setHiddenOptions(new Set(uiState.hiddenOptions));
      setShowHint(uiState.showHint);
      setScreen("quiz");
    } else {
      clearActiveMock();
      clearActiveBlockSession();
      setScreen("menu");
    }

    setReady(true);
    // Everything listed below is stable: hydrateProgress is a useCallback over
    // module-level storage functions, and the setters come from useState calls
    // inside the hooks, whose identity React guarantees. Nothing here can make
    // this restore effect run twice.
  }, [
    hydrateProgress,
    questionMap,
    setBlockTrackSize,
    setSavedBlockSession,
    setSavedMockSession,
    setSelectedBlockIndex,
  ]);

  useEffect(() => {
    const previous = previousAchievementsRef.current;
    if (progress.achievements.length > previous.length) {
      const unlockedId = progress.achievements.find(
        (achievementId) => !previous.includes(achievementId),
      );
      if (unlockedId) {
        const achievement = ACHIEVEMENTS.find((item) => item.id === unlockedId);
        if (achievement) setShowAch(achievement);
      }
    }
    previousAchievementsRef.current = progress.achievements;
  }, [progress.achievements]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
      if (event.key >= "1" && event.key <= "6") {
        document.dispatchEvent(new CustomEvent("quiz-key", { detail: { key: event.key } }));
      }
      if (event.key === "Enter") {
        document.dispatchEvent(new CustomEvent("quiz-enter"));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!blockMode || !session) return;
    const nextUi = serializeUiState(
      selectedAnswer,
      hiddenOptions,
      showResult,
      showDiscussion,
      showHint,
    );
    setSession((prev) => {
      if (!prev || prev.mode !== "practice" || prev.meta?.source !== "blocks") return prev;
      const currentUi = prev.ui || {};
      const same =
        JSON.stringify(currentUi.selectedAnswer ?? null) ===
          JSON.stringify(nextUi.selectedAnswer) &&
        !!currentUi.showResult === nextUi.showResult &&
        !!currentUi.showDiscussion === nextUi.showDiscussion &&
        JSON.stringify(currentUi.hiddenOptions || []) === JSON.stringify(nextUi.hiddenOptions) &&
        !!currentUi.showHint === nextUi.showHint;
      if (same) return prev;
      return {
        ...prev,
        ui: nextUi,
      };
    });
  }, [blockMode, hiddenOptions, selectedAnswer, session, showDiscussion, showHint, showResult]);

  useEffect(() => {
    if (screen !== "quiz" || !currentQuestion) return;

    const onKey = (event) => {
      const index = parseInt(event.detail.key, 10) - 1;
      if (
        index < 0 ||
        index >= currentQuestion.options.length ||
        showResult ||
        hiddenOptions.has(index)
      )
        return;

      if (isMulti) {
        setSelectedAnswer((prev) => {
          const next = new Set(prev instanceof Set ? prev : []);
          if (next.has(index)) next.delete(index);
          else next.add(index);
          return new Set(next);
        });
      } else {
        setSelectedAnswer(index);
      }
    };

    const onEnter = () => {
      if (session?.mode === "practice" && showResult) {
        document.dispatchEvent(new CustomEvent("practice-next"));
        return;
      }
      if (canSubmitCurrent) {
        document.dispatchEvent(new CustomEvent("submit-current"));
      }
    };

    document.addEventListener("quiz-key", onKey);
    document.addEventListener("quiz-enter", onEnter);
    return () => {
      document.removeEventListener("quiz-key", onKey);
      document.removeEventListener("quiz-enter", onEnter);
    };
  }, [
    canSubmitCurrent,
    currentQuestion,
    hiddenOptions,
    isMulti,
    screen,
    session?.mode,
    showResult,
  ]);

  useEffect(() => {
    if (screen !== "quiz" || (session?.mode !== "mock" && !blockMode)) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [blockMode, screen, session]);

  useEffect(() => {
    if (screen !== "quiz" || !mockExpired) return;
    finalizeMockSession({ ...session, status: "expired" }, "expired");
  }, [finalizeMockSession, mockExpired, screen, session]);

  const setPracticeSourcePreset = useCallback(
    (source) => {
      if (source === "wrong" && !wrongQuestions.length) {
        setPracticeMessage(PRACTICE_SOURCE_META.wrong.empty);
        return;
      }
      if (source === "recent" && !recentQuestions.length) {
        setPracticeMessage(PRACTICE_SOURCE_META.recent.empty);
        return;
      }
      if (source === "bookmarks" && !bookmarkedQuestions.length) {
        setPracticeMessage(PRACTICE_SOURCE_META.bookmarks.empty);
        return;
      }
      if (source === "weak") {
        if (!weakQuestions.length) {
          setPracticeMessage(PRACTICE_SOURCE_META.weak.empty);
          return;
        }
        setSelectedTopics(new Set(weakTopics.map((topic) => topic.topic)));
      }

      const nextCount =
        source === "recent"
          ? recentQuestions.length
          : source === "wrong"
            ? wrongQuestions.length
            : source === "bookmarks"
              ? bookmarkedQuestions.length
              : source === "weak"
                ? weakQuestions.length
                : topicQuestions.length;
      const nextLimit = nextCount > 0 ? Math.min(practiceLimit, nextCount) : practiceLimit;

      setPracticeSource(source);
      setPracticeLimit(nextLimit > 0 ? nextLimit : practiceLimit);
      if (source === "recent") setPracticeOrder("recent-desc");
      setPracticeMessage(
        nextCount > 0
          ? `${PRACTICE_SOURCE_META[source].label} cargado.`
          : PRACTICE_SOURCE_META[source].empty,
      );
      // The setters come from usePracticeConfig's useState calls, so React
      // guarantees their identity is stable and listing them cannot make this
      // callback change on every render.
    },
    [
      bookmarkedQuestions.length,
      practiceLimit,
      recentQuestions.length,
      setPracticeLimit,
      setPracticeMessage,
      setPracticeOrder,
      setPracticeSource,
      setSelectedTopics,
      topicQuestions.length,
      weakQuestions.length,
      weakTopics,
      wrongQuestions.length,
    ],
  );

  const openBlockSession = useCallback(
    (block, existingSession = null) => {
      if (!block) return;

      if (existingSession?.pausedElapsedSec != null) {
        existingSession = {
          ...existingSession,
          startedAt: Date.now() - existingSession.pausedElapsedSec * 1000,
        };
        delete existingSession.pausedElapsedSec;
      }

      const blockProgress = getBlockProgressRecord(progress, block.trackId, block.blockIndex);
      const sessionToOpen =
        existingSession ||
        createPracticeSession(block.questionIds.map((id) => questionMap.get(id)).filter(Boolean), {
          order: "block-fixed-desc",
          source: "blocks",
          questionLimit: block.questionIds.length,
          blockStudy: {
            trackId: block.trackId,
            blockIndex: block.blockIndex,
            size: block.size,
            label: block.label,
            questionIds: block.questionIds,
            orderNumbers: block.orderNumbers,
            blockSignature: block.blockSignature,
            roundNumber: getBlockRoundNumber(blockProgress),
          },
        });

      setSavedBlockSession(sessionToOpen);
      setSession(sessionToOpen);
      setResultPayload(null);
      setScreen("quiz");
      setShowDiscussion(!!sessionToOpen.ui?.showDiscussion);
      resetQuestionUi();

      const uiState = normalizeSessionUi(sessionToOpen);
      const restoredSelection = (currentQuestion) => {
        if (!currentQuestion) return null;
        const raw = uiState.selectedAnswer;
        if (Array.isArray(raw)) {
          if (Array.isArray(currentQuestion.correct)) return new Set(raw);
          return raw.length ? raw[0] : null;
        }
        return raw;
      };

      const question = sessionToOpen.questions[sessionToOpen.currentIndex];
      setSelectedAnswer(restoredSelection(question));
      setShowResult(uiState.showResult);
      setShowDiscussion(uiState.showDiscussion);
      setHiddenOptions(new Set(uiState.hiddenOptions));
      setShowHint(uiState.showHint);
    },
    [progress, questionMap, resetQuestionUi, setSavedBlockSession],
  );

  const startBlock = useCallback(
    (block = selectedBlock) => {
      if (!block) return;
      setBlockTrackSize(sanitizeBlockSize(block.size));
      setSelectedBlockIndex(block.blockIndex);
      setBlockMessage("");
      openBlockSession(block);
    },
    [openBlockSession, selectedBlock, setBlockMessage, setBlockTrackSize, setSelectedBlockIndex],
  );

  const continueSavedBlock = useCallback(() => {
    if (!savedBlockSession) return;
    setBlockTrackSize(sanitizeBlockSize(savedBlockSession.meta?.blockStudy?.size));
    setSelectedBlockIndex(savedBlockSession.meta?.blockStudy?.blockIndex || 0);
    openBlockSession(
      savedBlockSession.meta?.blockStudy
        ? {
            ...savedBlockSession.meta.blockStudy,
            trackId: savedBlockSession.meta.blockStudy.trackId,
            blockIndex: savedBlockSession.meta.blockStudy.blockIndex,
            size: savedBlockSession.meta.blockStudy.size,
            label: savedBlockSession.meta.blockStudy.label,
            questionIds: savedBlockSession.meta.blockStudy.questionIds,
            orderNumbers: savedBlockSession.meta.blockStudy.orderNumbers,
            blockSignature: savedBlockSession.meta.blockStudy.blockSignature,
          }
        : null,
      savedBlockSession,
    );
  }, [openBlockSession, savedBlockSession, setBlockTrackSize, setSelectedBlockIndex]);

  const startPracticeWith = useCallback(
    (overrides = {}) => {
      const source = overrides.source ?? practiceSource;
      const order = overrides.order ?? practiceOrder;

      const questionIds =
        source === "recent"
          ? recentQuestions.map((question) => question.id)
          : source === "wrong"
            ? progress.wrongQuestionIds
            : source === "bookmarks"
              ? progress.bookmarks
              : null;
      const topicSet =
        source === "weak" ? weakTopicSet : source === "topics" ? selectedTopics : null;

      // effectivePracticeLimit is clamped against the *current* source, so a
      // shortcut that switches source has to clamp against its own pool.
      const pool = questionIds ? questionIds.length : allQuestions.length;
      const limit =
        overrides.limit ??
        (overrides.source
          ? Math.min(Math.max(1, practiceLimit), Math.max(1, pool))
          : effectivePracticeLimit);

      const questions = buildPracticeQuestions(allQuestions, {
        topicSet,
        order,
        questionIds,
        questionMap,
        limit,
      });
      if (!questions.length) return;

      setSession(
        createPracticeSession(questions, {
          order,
          source,
          questionLimit: limit,
        }),
      );
      setResultPayload(null);
      setScreen("quiz");
      resetQuestionUi();
    },
    [
      allQuestions,
      effectivePracticeLimit,
      practiceLimit,
      practiceOrder,
      practiceSource,
      progress.bookmarks,
      progress.wrongQuestionIds,
      questionMap,
      recentQuestions,
      resetQuestionUi,
      selectedTopics,
      weakTopicSet,
    ],
  );

  const startPractice = useCallback(() => startPracticeWith(), [startPracticeWith]);

  const startMock = useCallback(() => {
    setSession(createMockAttempt());
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [createMockAttempt, resetQuestionUi]);

  const reviewMockMistakes = useCallback(() => {
    if (!resultPayload || resultPayload.mode !== "mock") return;
    const wrongIds = resultPayload.history
      .filter((entry) => !entry.correct)
      .map((entry) => entry.questionId);
    if (!wrongIds.length) return;
    const questions = buildPracticeQuestions(allQuestions, {
      questionIds: wrongIds,
      questionMap,
      order: "sequential",
    });
    if (!questions.length) return;
    setSession(
      createPracticeSession(questions, {
        order: "sequential",
        source: "mock-review",
        questionLimit: questions.length,
      }),
    );
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [allQuestions, questionMap, resetQuestionUi, resultPayload]);

  const cancelMock = useCallback(() => {
    if (session?.mode !== "mock") return;
    if (
      !window.confirm(
        "¿Cancelar simulacro? Se descartará el progreso y no se registrará en el historial.",
      )
    )
      return;
    discardMock();
    setSession(null);
    setResultPayload(null);
    setScreen("menu");
    resetQuestionUi();
  }, [discardMock, resetQuestionUi, session]);

  const startDailyChallenge = useCallback(() => {
    if (isDailyChallengeCompleted(progress)) return;
    const questions = buildDailyChallengeQuestions(allQuestions);
    if (!questions.length) return;
    setSession(
      createPracticeSession(questions, {
        order: "sequential",
        source: "daily",
        questionLimit: DAILY_CHALLENGE_COUNT,
      }),
    );
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [allQuestions, progress, resetQuestionUi]);

  /**
   * What the "again" button on the result screen does. Mock and blocks each
   * restart the same thing they just finished; everything else — practice and
   * the daily challenge — falls back to a new practice session, as before.
   */
  const repeatFinishedSession = useCallback(() => {
    if (resultPayload?.mode === "mock") {
      startMock();
      return;
    }
    if (resultPayload?.mode === "blocks") {
      startBlock(blockCatalog.blocks[resultPayload.blockStudy.blockIndex]);
      return;
    }
    startPractice();
  }, [blockCatalog.blocks, resultPayload, startBlock, startMock, startPractice]);

  /**
   * The action for "next block", or null when the block just finished is the
   * last one. Resolved here so ResultView never sees the catalogue.
   */
  const nextBlockAfterResult = useMemo(() => {
    if (resultPayload?.mode !== "blocks") return null;
    const next = blockCatalog.blocks[resultPayload.blockStudy.blockIndex + 1];
    return next ? () => startBlock(next) : null;
  }, [blockCatalog.blocks, resultPayload, startBlock]);

  /** What a block has scored so far, asked for by BlockView per block. */
  const getBlockRecord = useCallback(
    (block) => getBlockProgressRecord(progress, block.trackId, block.blockIndex),
    [progress],
  );

  /** Recuts the track, resets the selection to the first block and says so. */
  const selectBlockTrackSize = useCallback(
    (size) => {
      setBlockTrackSize(size);
      setSelectedBlockIndex(0);
      setBlockMessage(`Track de ${size} preguntas cargado.`);
    },
    [setBlockMessage, setBlockTrackSize, setSelectedBlockIndex],
  );

  /**
   * Selecting a block from the grid also clears the message, unlike the
   * prev/next arrows, which leave it standing.
   */
  const pickBlock = useCallback(
    (block) => {
      setSelectedBlockIndex(block.blockIndex);
      setBlockMessage("");
    },
    [setBlockMessage, setSelectedBlockIndex],
  );

  /**
   * The topic picker's data, resolved once here rather than in the view: a
   * canonical topic can stand for several of the bank's raw topics, and that
   * mapping belongs with the domain helpers, not with the buttons.
   */
  const practiceTopicGroups = useMemo(
    () =>
      EXAM_DOMAINS.map((domain) => ({
        domainId: domain.id,
        domainShort: domain.short,
        topics: canonicalTopicStats
          .filter((stat) => stat.domainId === domain.id)
          .map((stat) => {
            const rawTopics = topics.filter((topic) => getCanonicalTopic(topic) === stat.topic);
            return {
              ...stat,
              rawTopics,
              questionCount: rawTopics.reduce((sum, topic) => sum + (topicCounts[topic] || 0), 0),
            };
          }),
      })),
    [canonicalTopicStats, topicCounts, topics],
  );

  const toggleAllTopics = useCallback(() => {
    setSelectedTopics(selectedTopics.size === topics.length ? new Set() : new Set(topics));
  }, [selectedTopics, setSelectedTopics, topics]);

  /**
   * Adds or removes a whole canonical topic, and warns when the one just
   * added barely has any questions behind it.
   */
  const toggleTopicGroup = useCallback(
    (entry) => {
      const next = new Set(selectedTopics);
      const allSelected = entry.rawTopics.every((topic) => next.has(topic));
      entry.rawTopics.forEach((topic) => (allSelected ? next.delete(topic) : next.add(topic)));
      setSelectedTopics(next);
      setPracticeSource("topics");
      setPracticeMessage(
        entry.questionCount < 5
          ? `${entry.topic}: solo ${entry.questionCount} preguntas disponibles.`
          : "",
      );
    },
    [selectedTopics, setPracticeMessage, setPracticeSource, setSelectedTopics],
  );

  /** Double-clicking a topic narrows the selection down to that one alone. */
  const isolateTopicGroup = useCallback(
    (entry) => {
      setSelectedTopics(new Set(entry.rawTopics));
      setPracticeSource("topics");
      setPracticeMessage(`Solo ${entry.topic}.`);
    },
    [setPracticeMessage, setPracticeSource, setSelectedTopics],
  );

  /**
   * Topics is the only source that is configured rather than derived, so it
   * says what to do next instead of announcing what it picked.
   */
  const selectPracticeSource = useCallback(
    (source) => {
      if (source === "topics") {
        setPracticeSource("topics");
        setPracticeMessage("Selecciona temas y cantidad.");
        return;
      }
      setPracticeSourcePreset(source);
    },
    [setPracticeMessage, setPracticeSource, setPracticeSourcePreset],
  );

  const backToTopicSource = useCallback(() => {
    setPracticeSource("topics");
  }, [setPracticeSource]);

  const toggleCustomLimit = useCallback(() => {
    setShowCustomLimit((current) => !current);
  }, [setShowCustomLimit]);

  /** Choosing a preset count also closes the custom input it replaces. */
  const selectPracticeCount = useCallback(
    (count) => {
      setPracticeLimit(count);
      setPracticeMessage("");
      setShowCustomLimit(false);
    },
    [setPracticeLimit, setPracticeMessage, setShowCustomLimit],
  );

  /**
   * The typed count is kept as typed and only warned about: the settings hook
   * clamps it against the pool on its own, so overwriting it here would fight
   * the field while it is being edited.
   */
  const changeCustomPracticeCount = useCallback(
    (rawValue) => {
      const nextValue = rawValue === "" ? 1 : Math.max(1, Number(rawValue));
      setPracticeLimit(nextValue);
      setPracticeMessage(
        nextValue > maxPracticeCount && maxPracticeCount > 0
          ? `Máximo disponible: ${maxPracticeCount}`
          : "",
      );
    },
    [maxPracticeCount, setPracticeLimit, setPracticeMessage],
  );

  /**
   * What the home screen recommends, as a descriptor rather than as rendered
   * markup: an unfinished block first, then the block worth studying next,
   * then the weakest domain. Null when none of the three applies.
   */
  const nextAction = useMemo(() => {
    const activeBlockMeta = savedBlockSession?.meta?.blockStudy || null;
    if (activeBlockMeta && activeBlockMeta.trackId === blockCatalog.trackId) {
      return { kind: "continue-block", blockNumber: activeBlockMeta.blockIndex + 1 };
    }

    if (suggestedBlock) {
      const record = getBlockProgressRecord(
        progress,
        blockCatalog.trackId,
        suggestedBlock.blockIndex,
      );
      if (!isBlockMastered(record)) {
        return {
          kind: "suggested-block",
          blockNumber: suggestedBlock.blockIndex + 1,
          label: suggestedBlock.label,
          hasRounds: record?.rounds?.length > 0,
        };
      }
    }

    if (weakestDomain) {
      return {
        kind: "weak-domain",
        short: weakestDomain.short,
        accuracy: weakestDomain.accuracy,
        total: weakestDomain.total,
      };
    }

    return null;
  }, [blockCatalog.trackId, progress, savedBlockSession, suggestedBlock, weakestDomain]);

  /** Carries out whatever the home screen is currently recommending. */
  const runNextAction = useCallback(() => {
    if (!nextAction) return;

    if (nextAction.kind === "continue-block") {
      continueSavedBlock();
      return;
    }

    if (nextAction.kind === "suggested-block") {
      setSelectedBlockIndex(suggestedBlock.blockIndex);
      startBlock(suggestedBlock);
      return;
    }

    const domainTopics = weakestDomain.topics.flatMap((canonical) =>
      topics.filter((topic) => getCanonicalTopic(topic) === canonical),
    );
    setSelectedTopics(new Set(domainTopics));
    setPracticeSource("topics");
    setPracticeMessage(`Cargados temas de ${weakestDomain.short}.`);
    setMenuView("practice");
  }, [
    continueSavedBlock,
    nextAction,
    setPracticeMessage,
    setPracticeSource,
    setSelectedBlockIndex,
    setSelectedTopics,
    startBlock,
    suggestedBlock,
    topics,
    weakestDomain,
  ]);

  const reviewWrongQuestions = useCallback(
    () => startPracticeWith({ source: "wrong" }),
    [startPracticeWith],
  );

  /** Picking a square on the home grid selects that block and opens the tab. */
  const openBlockFromGrid = useCallback(
    (block) => {
      setSelectedBlockIndex(block.blockIndex);
      setMenuView("blocks");
    },
    [setSelectedBlockIndex],
  );

  const loadWeakTopics = useCallback(
    () => setPracticeSourcePreset("weak"),
    [setPracticeSourcePreset],
  );

  /**
   * Picking an option. A multi-answer question toggles the index in and out
   * of the selection; a single-answer one replaces it. Once the answer is
   * showing in practice there is nothing left to pick.
   */
  const selectOption = useCallback(
    (index) => {
      if (practiceMode && showResult) return;
      if (isMulti) {
        setSelectedAnswer((prev) => {
          const next = new Set(prev instanceof Set ? prev : []);
          if (next.has(index)) next.delete(index);
          else next.add(index);
          return next;
        });
        return;
      }
      setSelectedAnswer(index);
    },
    [isMulti, practiceMode, showResult],
  );

  const toggleDiscussion = useCallback(() => setShowDiscussion((value) => !value), []);
  const toggleAllRationales = useCallback(() => setShowAllRationales((value) => !value), []);
  const goToMenu = useCallback(() => {
    if (session?.mode === "practice" && session.answered > 0 && session.status !== "finished") {
      const message =
        session.meta?.source === "blocks"
          ? "¿Salir del bloque? La vuelta no se registrará todavía, pero podrás continuarla después."
          : "¿Salir de la sesión? Se perderá el progreso de esta práctica.";
      if (!window.confirm(message)) return;
    }
    setScreen("menu");
    setResultPayload(null);
    if (
      session?.mode === "practice" &&
      session.meta?.source === "blocks" &&
      session.status !== "finished"
    ) {
      const pausedSession = {
        ...session,
        pausedElapsedSec: Math.floor((Date.now() - session.startedAt) / 1000),
      };
      setSavedBlockSession(pausedSession);
      setBlockMessage(
        `Bloque ${session.meta.blockStudy.label} pausado en ${session.currentIndex + 1}/${session.questions.length}.`,
      );
      setSession(null);
    } else if (session?.mode === "practice" || session?.status === "finished") {
      setSession(null);
    }
    resetQuestionUi();
  }, [resetQuestionUi, session, setBlockMessage, setSavedBlockSession]);

  const toggleBookmark = useCallback(
    (questionId) => {
      updateProgress((prev) => {
        const exists = prev.bookmarks.includes(questionId);
        return {
          ...prev,
          bookmarks: exists
            ? prev.bookmarks.filter((id) => id !== questionId)
            : [questionId, ...prev.bookmarks],
        };
      });
    },
    [updateProgress],
  );

  const toggleCurrentBookmark = useCallback(() => {
    if (currentQuestion) toggleBookmark(currentQuestion.id);
  }, [currentQuestion, toggleBookmark]);

  const consumeInventoryReward = useCallback(
    (rewardKey) => {
      updateProgress((prev) => {
        const inventory = { ...prev.inventory };
        if (rewardKey === "wheel" && inventory.wheelSpins > 0) inventory.wheelSpins -= 1;
        if (rewardKey === "scratch" && inventory.scratchCards > 0) inventory.scratchCards -= 1;
        if (rewardKey === "chest" && inventory.chestKeys > 0) inventory.chestKeys -= 1;
        if (rewardKey === "boss" && inventory.bossKeys > 0) inventory.bossKeys -= 1;
        return { ...prev, inventory };
      });
      openRewardByKey(rewardKey, "manual");
    },
    [openRewardByKey, updateProgress],
  );

  const handleWheelComplete = useCallback(
    (prize) => {
      let xpAwarded = 0;
      updateProgress((prev) => {
        const inventory = { ...prev.inventory };
        if (prize.mult) {
          inventory.mult = prize.mult;
          inventory.multDur = 3;
        }
        if (prize.scratch) inventory.scratchCards += 1;
        if (prize.chest) inventory.chestKeys += 1;
        if (prize.power) {
          const roll = Math.random();
          if (roll < 0.3) inventory.shields += 1;
          else if (roll < 0.6) inventory.fiftyFifty += 1;
          else if (roll < 0.8) inventory.hints += 1;
          else inventory.doubleXP += 1;
        }

        xpAwarded = prize.xp ? applyDiminishing(prize.xp, prev.xp) : 0;
        return {
          ...prev,
          xp: prev.xp + xpAwarded,
          inventory,
          stats: {
            ...prev.stats,
            jackpot: prev.stats.jackpot || !!prize.jackpot,
            powerupsUsed: prev.stats.powerupsUsed + (prize.power ? 1 : 0),
          },
        };
      });

      if (xpAwarded) setXpPop({ amount: xpAwarded, key: Date.now() });
      if (prize.jackpot) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
    },
    [updateProgress],
  );

  const handleScratchComplete = useCallback(
    (prize) => {
      let xpAwarded = 0;
      updateProgress((prev) => {
        const inventory = { ...prev.inventory };
        if (prize.mult) {
          inventory.mult = prize.mult;
          inventory.multDur = 3;
        }
        if (prize.freeze) inventory.shields += 1;
        if (prize.skip) inventory.skips += 1;
        xpAwarded = prize.xp ? applyDiminishing(prize.xp, prev.xp) : 0;
        return {
          ...prev,
          xp: prev.xp + xpAwarded,
          inventory,
          stats: {
            ...prev.stats,
            scratchUsed: prev.stats.scratchUsed + 1,
          },
        };
      });
      if (xpAwarded) setXpPop({ amount: xpAwarded, key: Date.now() });
    },
    [updateProgress],
  );

  const handleChestComplete = useCallback(
    (item) => {
      let xpAwarded = 0;
      updateProgress((prev) => {
        const inventory = { ...prev.inventory };
        if (item.freeze) inventory.shields += 1;
        if (item.multDuration) {
          inventory.mult = 2;
          inventory.multDur = item.multDuration;
        }
        if (item.spin) inventory.wheelSpins += 1;
        if (item.bossKey) inventory.bossKeys += 1;
        xpAwarded = item.xp ? applyDiminishing(item.xp, prev.xp) : 0;
        return {
          ...prev,
          xp: prev.xp + xpAwarded,
          inventory,
          stats: {
            ...prev.stats,
            chestsOpened: prev.stats.chestsOpened + 1,
          },
        };
      });
      if (xpAwarded) setXpPop({ amount: xpAwarded, key: Date.now() });
    },
    [updateProgress],
  );

  const handleBossComplete = useCallback(
    (result) => {
      const { won, dragon, dmgDealt = 0, dmgTaken = 0, flawless = false } = result || {};
      let xpAwarded = 0;
      updateProgress((prev) => {
        const winsByDragon = { ...(prev.stats.bossWinsByDragon || {}) };
        if (won && dragon) {
          winsByDragon[dragon.id] = (winsByDragon[dragon.id] || 0) + 1;
        }
        xpAwarded = won && dragon ? applyDiminishing(dragon.xpReward, prev.xp) : 0;
        return {
          ...prev,
          xp: prev.xp + xpAwarded,
          stats: {
            ...prev.stats,
            bossFights: (prev.stats.bossFights || 0) + 1,
            bossWins: won ? prev.stats.bossWins + 1 : prev.stats.bossWins,
            bossWinsByDragon: winsByDragon,
            totalBossDmgDealt: (prev.stats.totalBossDmgDealt || 0) + dmgDealt,
            totalBossDmgTaken: (prev.stats.totalBossDmgTaken || 0) + dmgTaken,
            highestTierDefeated:
              won && dragon
                ? Math.max(prev.stats.highestTierDefeated || 0, dragon.tier)
                : prev.stats.highestTierDefeated || 0,
            flawlessBossWin: prev.stats.flawlessBossWin || (won && flawless),
          },
        };
      });
      if (won && xpAwarded) {
        setXpPop({ amount: xpAwarded, key: Date.now() });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
    },
    [updateProgress],
  );

  const submitCurrentAnswer = useCallback(() => {
    if (!currentQuestion || !session || !canSubmitCurrent) return;

    const evaluation = evaluateAnswer(currentQuestion, selectedAnswer);

    if (session.mode === "mock") {
      const recorded = withRecordedMockAnswer(
        session,
        currentQuestion.id,
        serializeSelection(selectedAnswer),
      );
      const nextSession = advanceSession(recorded);
      if (nextSession.status === "finished") {
        finalizeMockSession(recorded, "completed");
        return;
      }
      setSavedMockSession(nextSession);
      setSession(nextSession);
      resetQuestionUi();
      return;
    }

    const elapsedSec = Math.max(1, (Date.now() - session.currentQuestionStartedAt) / 1000);
    const hasShield = progress.inventory.shields > 0;
    const nextStreak = evaluation.isCorrect ? session.streak + 1 : hasShield ? session.streak : 0;
    const xpInfo = evaluation.isCorrect
      ? calculatePracticeXp(
          currentQuestion,
          elapsedSec,
          nextStreak,
          progress.inventory.mult,
          progress.inventory.doubleXP > 0,
          progress.xp,
        )
      : { xp: 8 };
    const historyEntry = {
      question: currentQuestion,
      selectedIndexes: evaluation.selectedIndexes,
      correct: evaluation.isCorrect,
      correctIndexes: evaluation.correctIndexes,
      xp: xpInfo.xp,
      time: elapsedSec,
    };
    const rewardQueue = evaluation.isCorrect
      ? [
          ...session.rewardQueue,
          ...rollPracticeRewards(nextStreak, progress.inventory.bossKeys > 0),
        ]
      : session.rewardQueue;

    updateProgress((prev) => {
      const inventory = { ...prev.inventory };
      if (evaluation.isCorrect) {
        if (inventory.doubleXP > 0) inventory.doubleXP -= 1;
        if (inventory.multDur > 0) {
          inventory.multDur -= 1;
          if (inventory.multDur <= 0) inventory.mult = 1;
        }
      } else if (inventory.shields > 0) {
        inventory.shields -= 1;
      }

      const topicsOk = new Set(prev.stats.topicsOk);
      if (evaluation.isCorrect) topicsOk.add(currentQuestion.topic);

      const updated = {
        ...prev,
        xp: prev.xp + xpInfo.xp,
        inventory,
        topicHistory: appendTopicAttempt(prev.topicHistory, currentQuestion, evaluation.isCorrect),
        wrongQuestionIds: pushWrongQuestionId(
          prev.wrongQuestionIds,
          currentQuestion.id,
          evaluation.isCorrect,
        ),
        stats: {
          ...prev.stats,
          totalCorrect: prev.stats.totalCorrect + (evaluation.isCorrect ? 1 : 0),
          hardCorrect:
            prev.stats.hardCorrect +
            (evaluation.isCorrect && currentQuestion.difficulty === 3 ? 1 : 0),
          fastCorrect: prev.stats.fastCorrect + (evaluation.isCorrect && elapsedSec < 8 ? 1 : 0),
          maxStreak: Math.max(prev.stats.maxStreak, nextStreak),
          topicsOk: [...topicsOk],
        },
      };
      return updateDailyStreak(updated);
    });

    setSession({
      ...session,
      answered: session.answered + 1,
      score: session.score + (evaluation.isCorrect ? 1 : 0),
      streak: nextStreak,
      maxStreak: Math.max(session.maxStreak, nextStreak),
      history: [...session.history, historyEntry],
      rewardQueue,
    });
    if (session.meta?.source === "blocks") {
      setSavedBlockSession({
        ...session,
        answered: session.answered + 1,
        score: session.score + (evaluation.isCorrect ? 1 : 0),
        streak: nextStreak,
        maxStreak: Math.max(session.maxStreak, nextStreak),
        history: [...session.history, historyEntry],
        rewardQueue,
        ui: {
          ...serializeUiState(selectedAnswer, hiddenOptions, true, showDiscussion, showHint),
        },
      });
    }
    setXpPop({ amount: xpInfo.xp, key: Date.now() });
    setShowResult(true);
  }, [
    canSubmitCurrent,
    currentQuestion,
    finalizeMockSession,
    hiddenOptions,
    progress.inventory.bossKeys,
    progress.inventory.doubleXP,
    progress.inventory.mult,
    progress.inventory.shields,
    progress.xp,
    resetQuestionUi,
    selectedAnswer,
    session,
    setSavedBlockSession,
    setSavedMockSession,
    showDiscussion,
    showHint,
    updateProgress,
  ]);

  useEffect(() => {
    const submitHandler = () => submitCurrentAnswer();
    const nextHandler = () => openQueuedPracticeReward();
    document.addEventListener("submit-current", submitHandler);
    document.addEventListener("practice-next", nextHandler);
    return () => {
      document.removeEventListener("submit-current", submitHandler);
      document.removeEventListener("practice-next", nextHandler);
    };
  }, [openQueuedPracticeReward, submitCurrentAnswer]);

  const use5050 = useCallback(() => {
    if (
      !currentQuestion ||
      showResult ||
      session?.mode !== "practice" ||
      progress.inventory.fiftyFifty <= 0
    )
      return;
    updateProgress((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        fiftyFifty: prev.inventory.fiftyFifty - 1,
      },
      stats: {
        ...prev.stats,
        powerupsUsed: prev.stats.powerupsUsed + 1,
      },
    }));
    setHiddenOptions(new Set(get5050HiddenOptions(currentQuestion)));
  }, [currentQuestion, progress.inventory.fiftyFifty, session?.mode, showResult, updateProgress]);

  const useHint = useCallback(() => {
    if (
      !currentQuestion ||
      showResult ||
      session?.mode !== "practice" ||
      progress.inventory.hints <= 0
    )
      return;
    updateProgress((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        hints: prev.inventory.hints - 1,
      },
      stats: {
        ...prev.stats,
        powerupsUsed: prev.stats.powerupsUsed + 1,
      },
    }));
    setShowHint(true);
  }, [currentQuestion, progress.inventory.hints, session?.mode, showResult, updateProgress]);

  const useSkip = useCallback(() => {
    if (!session || session.mode !== "practice" || progress.inventory.skips <= 0) return;
    updateProgress((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        skips: prev.inventory.skips - 1,
      },
    }));
    advancePracticeSession(session);
  }, [advancePracticeSession, progress.inventory.skips, session, updateProgress]);

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-deep)",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-body)",
          animation: "fadeIn var(--duration-fast) var(--ease-out)",
        }}
      >
        Preparando simulador...
      </div>
    );
  }

  if (screen === "menu") {
    const hasPracticeQuestions = maxPracticeCount > 0;
    const activeBlockMeta = savedBlockSession?.meta?.blockStudy || null;
    const activeBlockIndex =
      activeBlockMeta?.trackId === blockCatalog.trackId ? activeBlockMeta.blockIndex : null;
    const visibleBlocks = blockCatalog.blocks;
    const practiceSourceOptions = [
      {
        key: "topics",
        badge: formatPracticeBadge(selectedTopics.size, "tema", "temas"),
        disabled: false,
      },
      {
        key: "recent",
        badge: formatPracticeBadge(practiceSourceCounts.recent, "reciente", "recientes"),
        disabled: practiceSourceCounts.recent === 0,
      },
      {
        key: "wrong",
        badge: formatPracticeBadge(progress.wrongQuestionIds.length, "error", "errores"),
        disabled: practiceSourceCounts.wrong === 0,
      },
      {
        key: "bookmarks",
        badge: formatPracticeBadge(progress.bookmarks.length, "favorita", "favoritas"),
        disabled: practiceSourceCounts.bookmarks === 0,
      },
      {
        key: "weak",
        badge: formatPracticeBadge(weakTopics.length, "tema", "temas"),
        disabled: practiceSourceCounts.weak === 0,
      },
    ];
    const homeSummary = {
      rank: rankState,
      xp: progress.xp,
      inventoryCount:
        progress.inventory.shields +
        progress.inventory.fiftyFifty +
        progress.inventory.hints +
        progress.inventory.skips +
        progress.inventory.doubleXP +
        progress.inventory.scratchCards +
        progress.inventory.chestKeys +
        progress.inventory.bossKeys +
        progress.inventory.wheelSpins,
      achievementCount: achievementSet.size,
      weakestTopic: weakTopics[0] || null,
      onLoadWeakTopics: loadWeakTopics,
    };
    const homeShortcuts = {
      practice: {
        enabled: hasPracticeQuestions,
        count: effectivePracticeLimit,
        sourceLabel: PRACTICE_SOURCE_META[practiceSource].label,
        title: hasPracticeQuestions
          ? `${PRACTICE_SOURCE_META[practiceSource].label} · ${effectivePracticeLimit} preguntas`
          : "No hay preguntas para la configuración guardada",
      },
      wrong: {
        count: practiceSourceCounts.wrong,
        title:
          practiceSourceCounts.wrong === 0
            ? "Aún no hay fallos guardados"
            : "Repasar solo las preguntas falladas",
      },
      mock: { questionCount: MOCK_QUESTION_COUNT, durationSec: MOCK_DURATION_SEC },
    };
    const homeBlockGrid = {
      list: visibleBlocks,
      activeIndex: activeBlockIndex,
      getRecord: getBlockRecord,
    };
    const homeDaily = {
      current: progress.dailyStreak.current,
      best: progress.dailyStreak.best,
      done: isDailyChallengeCompleted(progress),
      questionCount: DAILY_CHALLENGE_COUNT,
      bonusXp: DAILY_CHALLENGE_BONUS_XP,
    };
    const practiceCtaLabel = hasPracticeQuestions
      ? `Iniciar práctica · ${effectivePracticeLimit} preguntas`
      : "Configura la práctica";
    return (
      <div
        style={{
          minHeight: "100vh",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
          animation: "fadeIn var(--duration-fast) var(--ease-out)",
        }}
      >
        {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px 56px" }}>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 18px",
                borderRadius: "var(--radius-pill)",
                marginBottom: 18,
                background: "var(--surface-panel-muted)",
                border: "1px solid var(--surface-line)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <img
                src={ACTIVE_CERT.logoPath}
                alt={ACTIVE_CERT.brand}
                style={{ height: 24, width: "auto", opacity: 0.92 }}
              />
              <span style={{ width: 1, height: 18, background: "var(--surface-line-strong)" }} />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-primary)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {ACTIVE_CERT.tagline}
              </span>
              {CERT_LIST.length > 1 && (
                <>
                  <span
                    style={{ width: 1, height: 18, background: "var(--surface-line-strong)" }}
                  />
                  <button
                    onClick={openCertPicker}
                    title="Cambiar de certificación"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "var(--text-tertiary)",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      padding: 0,
                    }}
                  >
                    Cambiar
                  </button>
                </>
              )}
            </div>
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: 44,
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: -1.4,
                fontFamily: "var(--font-heading)",
              }}
            >
              DataForge{" "}
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--primary-400)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {ACTIVE_CERT.short}
              </span>
            </h1>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: 15,
                fontFamily: "var(--font-mono)",
              }}
            >
              {allQuestions.length} preguntas
              {QUESTIONS_DUMPED_ON && (
                <span title="Fecha en la que se volcó por última vez el banco de preguntas desde la fuente original.">
                  {" · "}último volcado {QUESTIONS_DUMPED_ON}
                </span>
              )}
            </p>
          </div>

          {menuView !== "home" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-md)",
                marginBottom: 18,
              }}
            >
              <button
                onClick={() => setMenuView("home")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 15px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--surface-line)",
                  background: "var(--surface-panel-muted)",
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span aria-hidden="true">←</span> Inicio
              </button>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {MENU_VIEW_LABELS[menuView]}
              </span>
            </div>
          )}

          {menuView === "home" && (
            <HomeView
              certShort={ACTIVE_CERT.short}
              summary={homeSummary}
              nextAction={nextAction}
              onRunNextAction={runNextAction}
              domainStats={domainStats}
              shortcuts={homeShortcuts}
              onQuickPractice={startPractice}
              onReviewWrong={reviewWrongQuestions}
              onNavigate={setMenuView}
              blocks={homeBlockGrid}
              onPickBlock={openBlockFromGrid}
              daily={homeDaily}
              onStartDaily={startDailyChallenge}
            />
          )}

          {menuView === "blocks" && (
            <BlockView
              blocks={visibleBlocks}
              trackSize={blockTrackSize}
              selectedBlock={selectedBlock}
              selectedBlockProgress={selectedBlockProgress}
              roundStats={trackRoundStats}
              suggestedBlock={suggestedBlock}
              savedBlockIndex={savedBlockSession?.meta?.blockStudy?.blockIndex ?? null}
              activeBlockIndex={activeBlockIndex}
              message={blockMessage}
              getBlockRecord={getBlockRecord}
              onContinueSaved={continueSavedBlock}
              onStart={startBlock}
              onSelectSize={selectBlockTrackSize}
              onSelectIndex={setSelectedBlockIndex}
              onPickBlock={pickBlock}
            />
          )}

          {menuView !== "home" && menuView !== "blocks" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
                gap: 14,
                marginBottom: 18,
                alignItems: "start",
              }}
            >
              {menuView === "practice" && (
                <PracticeView
                  sourceOptions={practiceSourceOptions}
                  source={practiceSource}
                  summary={practiceSummary}
                  order={practiceOrder}
                  limit={practiceLimit}
                  effectiveLimit={effectivePracticeLimit}
                  maxCount={maxPracticeCount}
                  maxPresetLabel={maxPresetLabel}
                  showCustomLimit={showCustomLimit}
                  message={practiceMessage}
                  ctaLabel={practiceCtaLabel}
                  hasQuestions={hasPracticeQuestions}
                  topicPicker={
                    <TopicPicker
                      groups={practiceTopicGroups}
                      selectedTopics={selectedTopics}
                      allSelected={selectedTopics.size === topics.length}
                      onToggleAll={toggleAllTopics}
                      onToggle={toggleTopicGroup}
                      onIsolate={isolateTopicGroup}
                    />
                  }
                  onSelectSource={selectPracticeSource}
                  onBackToTopics={backToTopicSource}
                  onSelectOrder={setPracticeOrder}
                  onToggleCustomLimit={toggleCustomLimit}
                  onSelectCount={selectPracticeCount}
                  onCustomCountChange={changeCustomPracticeCount}
                  onStart={startPractice}
                />
              )}

              {menuView === "mock" && (
                <MockView
                  questionCount={MOCK_QUESTION_COUNT}
                  durationSec={MOCK_DURATION_SEC}
                  passPercent={PASS_PERCENT}
                  certShort={ACTIVE_CERT.short}
                  distribution={computeMockDistribution(
                    MOCK_QUESTION_COUNT,
                    ACTIVE_CERT.examDomains,
                  )}
                  preferRecent={mockPreferRecent}
                  onPreferRecentChange={setMockPreferRecent}
                  onStart={startMock}
                  savedSession={savedMockSession}
                  onContinue={() => {
                    setSession(savedMockSession);
                    setScreen("quiz");
                    resetQuestionUi();
                  }}
                  history={progress.mockHistory}
                />
              )}

              {menuView === "progress" && (
                <ProgressView
                  inventory={progress.inventory}
                  unlockedAchievements={achievementSet}
                />
              )}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <div
              style={{
                maxWidth: 760,
                margin: "0 auto 10px",
                fontSize: 11,
                color: "var(--text-tertiary)",
                lineHeight: 1.6,
              }}
            >
              {ACTIVE_CERT.disclaimer}
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm("¿Restablecer todo el progreso? Esta acción no se puede deshacer.")
                ) {
                  resetProgress();
                  setSavedMockSession(null);
                  clearActiveMock();
                }
              }}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: 11,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Restablecer progreso
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "results" && resultPayload) {
    return (
      <ResultView
        result={resultPayload}
        onGoToMenu={goToMenu}
        onReviewMockMistakes={reviewMockMistakes}
        onRepeat={repeatFinishedSession}
        onNextBlock={nextBlockAfterResult}
      />
    );
  }

  const practiceInventoryButtons = practiceMode && !showResult;

  /**
   * What the question on screen looks like right now, as a presentation
   * contract: indexes rather than the Set kept above, and the derived flags
   * already worked out. QuizView cannot reach back into this state.
   */
  const quizAnswer = {
    selectedIndexes:
      selectedAnswer instanceof Set
        ? [...selectedAnswer]
        : selectedAnswer === null || selectedAnswer === undefined
          ? []
          : [selectedAnswer],
    hiddenOptions: [...hiddenOptions],
    evaluation: currentEvaluation,
    isMulti,
    canSubmit: canSubmitCurrent,
    showResult,
    showHint,
    showDiscussion,
    showAllRationales,
  };

  /** A narrow summary of the run, not the session object itself. */
  const quizSessionSummary = {
    mode: quizMode,
    blockMeta: blockSessionMeta,
    score: session.score,
    answered: session.answered,
    isLast: session.currentIndex === currentQuestions.length - 1,
    pendingRewards: pendingRewardCount,
    passPercent: PASS_PERCENT,
    mockRemainingSec,
    // Practice keeps a history of answered questions; a mock does not, so
    // this is read defensively rather than assumed.
    lastXp: (session.history || []).at(-1)?.xp || 0,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          session?.mode === "mock"
            ? "linear-gradient(180deg, var(--bg-primary), var(--bg-deep))"
            : "radial-gradient(circle at top, rgba(15, 191, 163, 0.12), transparent 24%), linear-gradient(180deg, var(--bg-primary), var(--bg-deep) 55%, var(--bg-deep))",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        animation: "fadeIn var(--duration-fast) var(--ease-out)",
      }}
    >
      <RewardOverlays
        confetti={showConfetti}
        wheel={showWheel}
        scratch={showScratch}
        chest={showChest}
        boss={
          showBoss && bossQuestions && bossDragon
            ? { questions: bossQuestions, dragon: bossDragon }
            : null
        }
        xpPop={xpPop}
        onWheelComplete={handleWheelComplete}
        onScratchComplete={handleScratchComplete}
        onChestComplete={handleChestComplete}
        onBossComplete={handleBossComplete}
        onClose={closeReward}
      />
      {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}

      <QuizHeader
        mode={quizMode}
        blockMeta={blockSessionMeta}
        streak={session.streak}
        multiplier={{ value: progress.inventory.mult, rounds: progress.inventory.multDur }}
        rank={rankState}
        xp={progress.xp}
        questionNumber={session.currentIndex + 1}
        questionTotal={currentQuestions.length}
        mockRemainingSec={mockRemainingSec}
        blockElapsedSec={blockElapsedSec}
        onGoToMenu={goToMenu}
      />

      <QuizView
        question={currentQuestion}
        caseStudies={ACTIVE_CERT.caseStudies}
        bookmarked={bookmarkSet.has(currentQuestion.id)}
        answer={quizAnswer}
        session={quizSessionSummary}
        inventory={progress.inventory}
        canUsePowerUps={practiceInventoryButtons}
        scrollRef={qRef}
        onSelectOption={selectOption}
        onSubmit={submitCurrentAnswer}
        onAdvance={openQueuedPracticeReward}
        onToggleDiscussion={toggleDiscussion}
        onToggleRationales={toggleAllRationales}
        onToggleBookmark={toggleCurrentBookmark}
        onUseHint={useHint}
        onUse5050={use5050}
        onUseSkip={useSkip}
        onConsumeReward={consumeInventoryReward}
        onCancelMock={cancelMock}
      />
    </div>
  );
}

function CertApp() {
  const [allQuestions, setAllQuestions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    ACTIVE_CERT.loadQuestions()
      .then((mod) => {
        if (!cancelled) setAllQuestions(mod.QUESTIONS);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: 32, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
        Error cargando preguntas: {String(error?.message ?? error)}
      </div>
    );
  }

  if (!allQuestions) {
    return (
      <div style={{ padding: 32, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
        Cargando {ACTIVE_CERT.short}…
      </div>
    );
  }

  return <AppContent allQuestions={allQuestions} />;
}

function App() {
  if (NEEDS_CERT_PICK) return <CertPicker />;
  return <CertApp />;
}

export default App;
