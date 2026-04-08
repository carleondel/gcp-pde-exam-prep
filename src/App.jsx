import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import googleCloudLogo from "./assets/google-cloud-logo.svg";
import { QUESTIONS } from "./data/questions.js";
import { TOPICS } from "./data/topics.js";
import { RANKS, ACHIEVEMENTS } from "./data/gamification.js";
import { EXAM_DOMAINS, computeDomainStats, computeCanonicalTopicStats, getWeakestDomain, getCanonicalTopic } from "./data/pde-topics.js";
import {
  AchievementPopup,
  BossBattle,
  Confetti,
  MysteryChest,
  ScratchCard,
  SpinWheel,
} from "./components/rewards/index.js";
import "./styles/animations.css";
import {
  DAILY_CHALLENGE_BONUS_XP,
  DAILY_CHALLENGE_COUNT,
  MOCK_DURATION_SEC,
  MOCK_QUESTION_COUNT,
  PASS_PERCENT,
  appendTopicAttempt,
  buildDailyChallengeQuestions,
  buildMockHistory,
  buildMockQuestions,
  buildMockSummary,
  buildPracticeQuestions,
  calculatePracticeXp,
  canSubmitAnswer,
  computeWeakTopics,
  evaluateAnswer,
  get5050HiddenOptions,
  getCorrectOptionIndexes,
  pushWrongQuestionId,
  serializeSelection,
} from "./engine/quiz-engine";
import {
  BLOCK_SIZE_PRESETS,
  BLOCK_MASTERY_PERCENT,
  DEFAULT_BLOCK_SIZE,
  buildBlockCatalog,
  buildBlockRoundSummary,
  getBlockProgressRecord,
  getBlockRoundNumber,
  getSuggestedBlockIndex,
  hasBlockChanged,
  isBlockMastered,
} from "./engine/block-study";
import {
  advanceSession,
  createMockSession,
  createPracticeSession,
  getMockStatus,
  getRemainingTime,
  hydrateBlockSession,
  hydrateMockSession,
  toStoredBlockSession,
  toStoredMockSession,
  withRecordedMockAnswer,
} from "./engine/session-manager";
import {
  EMPTY_PROGRESS,
  clearActiveBlockSession,
  clearActiveMock,
  completeDailyChallenge,
  isDailyChallengeCompleted,
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
  updateDailyStreak,
} from "./engine/storage";

const PRACTICE_PRESETS = [10, 20, 30, 50];
const DEFAULT_PRACTICE_LIMIT = 20;
const PRACTICE_SOURCE_META = {
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

function sanitizePracticeOrder(order) {
  return ["random", "sequential", "recent-desc"].includes(order) ? order : "random";
}

function sanitizePracticeSource(source) {
  return PRACTICE_SOURCE_META[source] ? source : "topics";
}

function sanitizePracticeTopics(topics) {
  const values = Array.isArray(topics) ? topics : TOPICS;
  const next = values.filter((topic, index) => TOPICS.includes(topic) && values.indexOf(topic) === index);
  return next.length ? next : [...TOPICS];
}

function sanitizePracticeLimit(limit) {
  const numeric = Number(limit);
  if (!Number.isFinite(numeric) || numeric < 1) return DEFAULT_PRACTICE_LIMIT;
  return Math.floor(numeric);
}

function sanitizeBlockSize(size) {
  const numeric = Number(size);
  return BLOCK_SIZE_PRESETS.includes(numeric) ? numeric : DEFAULT_BLOCK_SIZE;
}

function sameSet(left, right) {
  if (left.size !== right.size) return false;
  for (const value of left) {
    if (!right.has(value)) return false;
  }
  return true;
}

function formatPracticeBadge(count, singular, plural = singular) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

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

function getAchievementSnapshot(progress) {
  return {
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

function buildTopicCounts() {
  const counts = {};
  QUESTIONS.forEach((question) => {
    counts[question.topic] = (counts[question.topic] || 0) + 1;
  });
  return counts;
}

function App() {
  const qRef = useRef(null);
  const previousAchievementsRef = useRef([]);
  const storedPracticePrefs = useMemo(() => loadPracticePrefs() || {}, []);
  const storedBlockPrefs = useMemo(() => loadBlockPrefs() || {}, []);
  const questionMap = useMemo(() => new Map(QUESTIONS.map((question) => [question.id, question])), []);
  const topicCounts = useMemo(() => buildTopicCounts(), []);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState("menu");
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [session, setSession] = useState(null);
  const [savedMockSession, setSavedMockSession] = useState(null);
  const [savedBlockSession, setSavedBlockSession] = useState(null);
  const [resultPayload, setResultPayload] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState(() => new Set(sanitizePracticeTopics(storedPracticePrefs.topics)));
  const [practiceOrder, setPracticeOrder] = useState(() => sanitizePracticeOrder(storedPracticePrefs.order));
  const [practiceSource, setPracticeSource] = useState(() => sanitizePracticeSource(storedPracticePrefs.source));
  const [practiceLimit, setPracticeLimit] = useState(() => sanitizePracticeLimit(storedPracticePrefs.limit));
  const [blockTrackSize, setBlockTrackSize] = useState(() => sanitizeBlockSize(storedBlockPrefs.trackSize));
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(() => Math.max(0, Number(storedBlockPrefs.blockIndex) || 0));
  const [blockMessage, setBlockMessage] = useState("");
  const [showCustomLimit, setShowCustomLimit] = useState(() => {
    const initialLimit = sanitizePracticeLimit(storedPracticePrefs.limit);
    return !PRACTICE_PRESETS.includes(initialLimit);
  });
  const [practiceMessage, setPracticeMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [showScratch, setShowScratch] = useState(false);
  const [showChest, setShowChest] = useState(false);
  const [showBoss, setShowBoss] = useState(false);
  const [bossQuestion, setBossQuestion] = useState(null);
  const [rewardFlow, setRewardFlow] = useState("manual");
  const [showAch, setShowAch] = useState(null);
  const [xpPop, setXpPop] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [now, setNow] = useState(Date.now());

  const achievementSet = useMemo(() => new Set(progress.achievements), [progress.achievements]);
  const bookmarkSet = useMemo(() => new Set(progress.bookmarks), [progress.bookmarks]);
  const weakTopics = useMemo(() => computeWeakTopics(progress.topicHistory).slice(0, 4), [progress.topicHistory]);
  const rankState = useMemo(() => getRankState(progress.xp), [progress.xp]);
  const domainStats = useMemo(() => computeDomainStats(progress.topicHistory), [progress.topicHistory]);
  const canonicalTopicStats = useMemo(() => computeCanonicalTopicStats(progress.topicHistory), [progress.topicHistory]);
  const weakestDomain = useMemo(() => getWeakestDomain(domainStats), [domainStats]);
  const weakTopicSet = useMemo(() => new Set(weakTopics.map((topic) => topic.topic)), [weakTopics]);
  const wrongQuestions = useMemo(
    () => progress.wrongQuestionIds.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.wrongQuestionIds, questionMap]
  );
  const bookmarkedQuestions = useMemo(
    () => progress.bookmarks.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.bookmarks, questionMap]
  );
  const recentQuestions = useMemo(
    () => QUESTIONS.filter((question) => question.isRecent),
    []
  );
  const topicQuestions = useMemo(
    () => QUESTIONS.filter((question) => selectedTopics.has(question.topic)),
    [selectedTopics]
  );
  const weakQuestions = useMemo(
    () => QUESTIONS.filter((question) => weakTopicSet.has(question.topic)),
    [weakTopicSet]
  );
  const practiceSourceQuestions = useMemo(() => {
    if (practiceSource === "recent") return recentQuestions;
    if (practiceSource === "wrong") return wrongQuestions;
    if (practiceSource === "bookmarks") return bookmarkedQuestions;
    if (practiceSource === "weak") return weakQuestions;
    return topicQuestions;
  }, [bookmarkedQuestions, practiceSource, recentQuestions, topicQuestions, weakQuestions, wrongQuestions]);
  const practiceSourceCounts = useMemo(() => ({
    topics: topicQuestions.length,
    recent: recentQuestions.length,
    wrong: wrongQuestions.length,
    bookmarks: bookmarkedQuestions.length,
    weak: weakQuestions.length,
  }), [bookmarkedQuestions.length, recentQuestions.length, topicQuestions.length, weakQuestions.length, wrongQuestions.length]);
  const blockCatalog = useMemo(() => buildBlockCatalog(QUESTIONS, blockTrackSize), [blockTrackSize]);
  const effectiveSelectedBlockIndex = useMemo(() => {
    if (!blockCatalog.blocks.length) return 0;
    return Math.min(Math.max(0, selectedBlockIndex), blockCatalog.blocks.length - 1);
  }, [blockCatalog.blocks.length, selectedBlockIndex]);
  const selectedBlock = blockCatalog.blocks[effectiveSelectedBlockIndex] || null;
  const suggestedBlockIndex = useMemo(
    () => getSuggestedBlockIndex(blockCatalog.blocks, progress, savedBlockSession),
    [blockCatalog.blocks, progress, savedBlockSession]
  );
  const suggestedBlock = blockCatalog.blocks[suggestedBlockIndex] || null;
  const selectedBlockProgress = useMemo(
    () => selectedBlock ? getBlockProgressRecord(progress, selectedBlock.trackId, selectedBlock.blockIndex) : null,
    [progress, selectedBlock]
  );
  const maxPracticeCount = practiceSourceQuestions.length;
  const effectivePracticeLimit = maxPracticeCount > 0 ? Math.min(Math.max(1, practiceLimit), maxPracticeCount) : 0;
  const maxPresetLabel = maxPracticeCount > 0 ? `Máximo disponible (${maxPracticeCount})` : "Máximo disponible";
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
      subtitle: selectedTopics.size === TOPICS.length
        ? "Banco completo listo para práctica."
        : "Sesión filtrada por dominio.",
      badge: formatPracticeBadge(selectedTopics.size, "tema", "temas"),
    };
  }, [practiceSource, progress.bookmarks.length, progress.wrongQuestionIds.length, recentQuestions.length, selectedTopics.size, weakTopics.length]);

  const currentQuestions = useMemo(() => {
    if (!session) return [];
    return session.mode === "practice" ? session.questions : session.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  }, [session, questionMap]);

  const currentQuestion = session ? currentQuestions[session.currentIndex] : null;
  const practiceMode = session?.mode === "practice";
  const blockMode = practiceMode && session?.meta?.source === "blocks";
  const blockSessionMeta = blockMode ? session.meta.blockStudy : null;
  const currentEvaluation = currentQuestion ? evaluateAnswer(currentQuestion, selectedAnswer) : null;
  const isMulti = currentQuestion ? Array.isArray(currentQuestion.correct) : false;
  const canSubmitCurrent = currentQuestion ? canSubmitAnswer(currentQuestion, selectedAnswer) : false;
  const mockRemainingSec = session?.mode === "mock" ? getRemainingTime(session, now) : 0;
  const pendingRewardCount = practiceMode ? session.rewardQueue.length : 0;

  const resetQuestionUi = useCallback(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowDiscussion(false);
    setHiddenOptions(new Set());
    setShowHint(false);
    if (qRef.current) qRef.current.scrollTop = 0;
  }, []);

  const applyUnlockedAchievements = useCallback((candidate) => {
    const unlocked = ACHIEVEMENTS
      .filter((achievement) => !candidate.achievements.includes(achievement.id) && achievement.cond(getAchievementSnapshot(candidate)))
      .map((achievement) => achievement.id);

    if (!unlocked.length) return candidate;
    return {
      ...candidate,
      xp: candidate.xp + unlocked.length * 75,
      achievements: [...candidate.achievements, ...unlocked],
    };
  }, []);

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => applyUnlockedAchievements(updater(prev)));
  }, [applyUnlockedAchievements]);

  const recordBlockRound = useCallback((finishedSession, summary) => {
    const blockMeta = finishedSession.meta?.blockStudy;
    if (!blockMeta) return;

    updateProgress((prev) => {
      const tracks = prev.blockStudy?.tracks || {};
      const track = tracks[blockMeta.trackId] || { blocks: {} };
      const blockRecord = track.blocks?.[blockMeta.blockIndex] || {
        blockIndex: blockMeta.blockIndex,
        label: blockMeta.label,
        size: blockMeta.size,
        questionIds: blockMeta.questionIds,
        orderNumbers: blockMeta.orderNumbers,
        blockSignature: blockMeta.blockSignature,
        rounds: [],
        lastStudiedAt: null,
        lastPercent: 0,
        bestPercent: 0,
      };
      const rounds = [...(blockRecord.rounds || []), summary];
      return {
        ...prev,
        blockStudy: {
          tracks: {
            ...tracks,
            [blockMeta.trackId]: {
              blocks: {
                ...(track.blocks || {}),
                [blockMeta.blockIndex]: {
                  ...blockRecord,
                  label: blockMeta.label,
                  size: blockMeta.size,
                  questionIds: blockMeta.questionIds,
                  orderNumbers: blockMeta.orderNumbers,
                  blockSignature: blockMeta.blockSignature,
                  rounds,
                  lastStudiedAt: summary.finishedAt,
                  lastPercent: summary.percent,
                  bestPercent: Math.max(blockRecord.bestPercent || 0, summary.percent),
                },
              },
            },
          },
        },
      };
    });
  }, [updateProgress]);

  const finishPracticeSession = useCallback((finishedSession) => {
    const isDaily = finishedSession.meta?.source === "daily";
    const isBlocks = finishedSession.meta?.source === "blocks";
    const dailyBonus = isDaily && !isDailyChallengeCompleted(progress) ? DAILY_CHALLENGE_BONUS_XP : 0;
    const baseXp = finishedSession.history.reduce((sum, entry) => sum + entry.xp, 0);
    const summary = {
      score: finishedSession.score,
      answered: finishedSession.answered,
      percent: finishedSession.answered ? Math.round((finishedSession.score / finishedSession.answered) * 100) : 0,
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
      blockStudy: isBlocks ? {
        ...finishedSession.meta.blockStudy,
        roundSummary: blockRoundSummary,
      } : null,
    });
    setScreen("results");
    resetQuestionUi();
  }, [progress, recordBlockRound, resetQuestionUi, updateProgress]);

  const finalizeMockSession = useCallback((sessionToFinish, reason = "completed") => {
    if (!sessionToFinish || sessionToFinish.mode !== "mock") return;

    const history = buildMockHistory(sessionToFinish.questionIds, sessionToFinish.answersByQuestionId, questionMap);
    const finishedAt = reason === "expired" ? sessionToFinish.startedAt + sessionToFinish.durationSec * 1000 : Date.now();
    const summary = buildMockSummary(history, {
      startedAt: sessionToFinish.startedAt,
      finishedAt,
      durationSec: sessionToFinish.durationSec,
      passPercent: PASS_PERCENT,
      questionCount: sessionToFinish.questionIds.length,
    });

    updateProgress((prev) => {
      let topicHistory = prev.topicHistory;
      let wrongQuestionIds = prev.wrongQuestionIds;
      const topicsOk = new Set(prev.stats.topicsOk);
      let totalCorrect = prev.stats.totalCorrect;
      let hardCorrect = prev.stats.hardCorrect;

      history.forEach((entry) => {
        topicHistory = appendTopicAttempt(topicHistory, entry.question, entry.correct, finishedAt);
        wrongQuestionIds = pushWrongQuestionId(wrongQuestionIds, entry.questionId, entry.correct);
        if (entry.correct) {
          totalCorrect += 1;
          if (entry.question.difficulty === 3) hardCorrect += 1;
          topicsOk.add(entry.question.topic);
        }
      });

      return {
        ...prev,
        topicHistory,
        wrongQuestionIds,
        mockHistory: [{
          date: finishedAt,
          score: summary.score,
          questionCount: summary.questionCount,
          percent: summary.percent,
          passed: summary.passed,
          elapsedSec: summary.elapsedSec,
          wrongQuestionIds: history.filter((entry) => !entry.correct).map((entry) => entry.questionId),
        }, ...prev.mockHistory].slice(0, 50),
        stats: {
          ...prev.stats,
          totalCorrect,
          hardCorrect,
          topicsOk: [...topicsOk],
        },
      };
    });

    clearActiveMock();
    setSavedMockSession(null);
    setSession({ ...sessionToFinish, status: "finished" });
    setResultPayload({
      mode: "mock",
      reason,
      history,
      summary,
    });
    setScreen("results");
    resetQuestionUi();
  }, [questionMap, resetQuestionUi, updateProgress]);

  const advancePracticeSession = useCallback((baseSession) => {
    const nextSession = advanceSession(baseSession);
    if (nextSession.status === "finished") {
      finishPracticeSession({ ...baseSession, status: "finished" });
      return;
    }
    setSession(nextSession);
    if (nextSession.meta?.source === "blocks") setSavedBlockSession(nextSession);
    resetQuestionUi();
  }, [finishPracticeSession, resetQuestionUi]);

  const openRewardByKey = useCallback((rewardKey, flow = "manual") => {
    setRewardFlow(flow);
    if (rewardKey === "wheel") setShowWheel(true);
    if (rewardKey === "scratch") setShowScratch(true);
    if (rewardKey === "chest") setShowChest(true);
    if (rewardKey === "boss") {
      setBossQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
      setShowBoss(true);
    }
  }, []);

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

  useEffect(() => {
    const savedProgress = loadProgress();
    const storedMock = loadActiveMock();
    const storedBlock = loadActiveBlockSession();
    const restoredMock = storedMock ? hydrateMockSession(storedMock, questionMap) : null;
    const restoredBlock = storedBlock ? hydrateBlockSession(storedBlock, questionMap) : null;

    previousAchievementsRef.current = savedProgress.achievements;
    setProgress(savedProgress);

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
  }, [questionMap]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(progress);
  }, [progress, ready]);

  useEffect(() => {
    if (!blockCatalog.blocks.length) return;
    if (selectedBlockIndex !== effectiveSelectedBlockIndex) {
      setSelectedBlockIndex(effectiveSelectedBlockIndex);
    }
  }, [blockCatalog.blocks.length, effectiveSelectedBlockIndex, selectedBlockIndex]);

  useEffect(() => {
    if (!ready) return;

    let nextSource = practiceSource;
    let nextTopics = new Set([...selectedTopics].filter((topic) => TOPICS.includes(topic)));
    let nextLimit = sanitizePracticeLimit(practiceLimit);
    let nextShowCustom = showCustomLimit;
    let nextMessage = "";

    if (!nextTopics.size) {
      nextTopics = new Set(TOPICS);
      nextMessage = "Ajustamos los temas a los disponibles actualmente.";
    }

    if (nextSource !== "topics" && practiceSourceCounts[nextSource] === 0) {
      nextSource = "topics";
      nextMessage = "Volvimos a Temas porque esa fuente ya no tiene preguntas disponibles.";
    }

    const nextMax = nextSource === "wrong"
      ? practiceSourceCounts.wrong
      : nextSource === "recent"
        ? practiceSourceCounts.recent
      : nextSource === "bookmarks"
        ? practiceSourceCounts.bookmarks
        : nextSource === "weak"
          ? practiceSourceCounts.weak
          : QUESTIONS.filter((question) => nextTopics.has(question.topic)).length;

    if (nextMax > 0 && nextLimit > nextMax) {
      nextLimit = nextMax;
      nextMessage = `Ajustado a ${nextMax} por disponibilidad actual.`;
    }

    if (nextMax > 0 && nextLimit < 1) {
      nextLimit = 1;
    }

    const topicsChanged = !sameSet(selectedTopics, nextTopics);
    const sourceChanged = nextSource !== practiceSource;
    const limitChanged = nextLimit !== practiceLimit;

    if (topicsChanged) setSelectedTopics(nextTopics);
    if (sourceChanged) setPracticeSource(nextSource);
    if (limitChanged) setPracticeLimit(nextLimit);
    if (nextMessage && (topicsChanged || sourceChanged || limitChanged || practiceMessage !== nextMessage)) {
      setPracticeMessage(nextMessage);
    }
  }, [practiceLimit, practiceMessage, practiceSource, practiceSourceCounts, ready, selectedTopics]);

  useEffect(() => {
    if (!ready) return;
    savePracticePrefs({
      source: practiceSource,
      order: practiceOrder,
      topics: [...selectedTopics],
      limit: practiceLimit,
    });
  }, [practiceLimit, practiceOrder, practiceSource, ready, selectedTopics]);

  useEffect(() => {
    if (!ready) return;
    saveBlockPrefs({
      trackSize: blockTrackSize,
      blockIndex: effectiveSelectedBlockIndex,
    });
  }, [blockTrackSize, effectiveSelectedBlockIndex, ready]);

  useEffect(() => {
    if (!ready) return;
    if (savedMockSession) saveActiveMock(toStoredMockSession(savedMockSession));
    else clearActiveMock();
  }, [ready, savedMockSession]);

  useEffect(() => {
    if (!ready) return;
    const activeBlockSession = session?.mode === "practice" && session.meta?.source === "blocks" && session.status !== "finished"
      ? session
      : savedBlockSession;

    if (!activeBlockSession || activeBlockSession.status === "finished") {
      clearActiveBlockSession();
      return;
    }

    saveActiveBlockSession(toStoredBlockSession(activeBlockSession));
  }, [ready, savedBlockSession, session]);

  useEffect(() => {
    const previous = previousAchievementsRef.current;
    if (progress.achievements.length > previous.length) {
      const unlockedId = progress.achievements.find((achievementId) => !previous.includes(achievementId));
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
    const nextUi = serializeUiState(selectedAnswer, hiddenOptions, showResult, showDiscussion, showHint);
    setSession((prev) => {
      if (!prev || prev.mode !== "practice" || prev.meta?.source !== "blocks") return prev;
      const currentUi = prev.ui || {};
      const same =
        JSON.stringify(currentUi.selectedAnswer ?? null) === JSON.stringify(nextUi.selectedAnswer)
        && !!currentUi.showResult === nextUi.showResult
        && !!currentUi.showDiscussion === nextUi.showDiscussion
        && JSON.stringify(currentUi.hiddenOptions || []) === JSON.stringify(nextUi.hiddenOptions)
        && !!currentUi.showHint === nextUi.showHint;
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
      if (index < 0 || index >= currentQuestion.options.length || showResult || hiddenOptions.has(index)) return;

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
  }, [canSubmitCurrent, currentQuestion, hiddenOptions, isMulti, screen, session?.mode, showResult]);

  useEffect(() => {
    if (screen !== "quiz" || session?.mode !== "mock") return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [screen, session]);

  useEffect(() => {
    if (screen !== "quiz" || session?.mode !== "mock") return;
    if (getMockStatus(session, now) === "expired") {
      finalizeMockSession({ ...session, status: "expired" }, "expired");
    }
  }, [finalizeMockSession, now, screen, session]);

  const setPracticeSourcePreset = useCallback((source) => {
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

    const nextCount = source === "recent"
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
    setPracticeMessage(nextCount > 0
      ? `${PRACTICE_SOURCE_META[source].label} cargado.`
      : PRACTICE_SOURCE_META[source].empty);
  }, [bookmarkedQuestions.length, practiceLimit, recentQuestions.length, topicQuestions.length, weakQuestions.length, weakTopics, wrongQuestions.length]);

  const openBlockSession = useCallback((block, existingSession = null) => {
    if (!block) return;

    const blockProgress = getBlockProgressRecord(progress, block.trackId, block.blockIndex);
    const sessionToOpen = existingSession || createPracticeSession(
      block.questionIds.map((id) => questionMap.get(id)).filter(Boolean),
      {
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
      }
    );

    setSavedBlockSession(sessionToOpen);
    setSession(sessionToOpen);
    setResultPayload(null);
    setScreen("quiz");
    setShowDiscussion(!!sessionToOpen.ui?.showDiscussion);
    resetQuestionUi();

    const uiState = normalizeSessionUi(sessionToOpen);
    const restoredSelection = currentQuestion => {
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
  }, [progress, questionMap, resetQuestionUi]);

  const startBlock = useCallback((block = selectedBlock) => {
    if (!block) return;
    setBlockTrackSize(sanitizeBlockSize(block.size));
    setSelectedBlockIndex(block.blockIndex);
    setBlockMessage("");
    openBlockSession(block);
  }, [openBlockSession, selectedBlock]);

  const continueSavedBlock = useCallback(() => {
    if (!savedBlockSession) return;
    setBlockTrackSize(sanitizeBlockSize(savedBlockSession.meta?.blockStudy?.size));
    setSelectedBlockIndex(savedBlockSession.meta?.blockStudy?.blockIndex || 0);
    openBlockSession(savedBlockSession.meta?.blockStudy ? {
      ...savedBlockSession.meta.blockStudy,
      trackId: savedBlockSession.meta.blockStudy.trackId,
      blockIndex: savedBlockSession.meta.blockStudy.blockIndex,
      size: savedBlockSession.meta.blockStudy.size,
      label: savedBlockSession.meta.blockStudy.label,
      questionIds: savedBlockSession.meta.blockStudy.questionIds,
      orderNumbers: savedBlockSession.meta.blockStudy.orderNumbers,
      blockSignature: savedBlockSession.meta.blockStudy.blockSignature,
    } : null, savedBlockSession);
  }, [openBlockSession, savedBlockSession]);

  const startPractice = useCallback(() => {
    const questionIds = practiceSource === "recent"
      ? recentQuestions.map((question) => question.id)
      : practiceSource === "wrong"
      ? progress.wrongQuestionIds
      : practiceSource === "bookmarks"
        ? progress.bookmarks
        : null;
    const topicSet = practiceSource === "weak"
      ? weakTopicSet
      : practiceSource === "topics"
        ? selectedTopics
        : null;
    const questions = buildPracticeQuestions(QUESTIONS, {
      topicSet,
      order: practiceOrder,
      questionIds,
      questionMap,
      limit: effectivePracticeLimit,
    });
    if (!questions.length) return;

    setSession(createPracticeSession(questions, {
      order: practiceOrder,
      source: practiceSource,
      questionLimit: effectivePracticeLimit,
    }));
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [effectivePracticeLimit, practiceOrder, practiceSource, progress.bookmarks, progress.wrongQuestionIds, questionMap, recentQuestions, resetQuestionUi, selectedTopics, weakTopicSet]);

  const startMock = useCallback(() => {
    const questions = buildMockQuestions(QUESTIONS, MOCK_QUESTION_COUNT);
    const nextSession = createMockSession(questions.map((question) => question.id), {
      status: "active",
      durationSec: MOCK_DURATION_SEC,
    });
    setSavedMockSession(nextSession);
    setSession(nextSession);
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [resetQuestionUi]);

  const startDailyChallenge = useCallback(() => {
    if (isDailyChallengeCompleted(progress)) return;
    const questions = buildDailyChallengeQuestions(QUESTIONS);
    if (!questions.length) return;
    setSession(createPracticeSession(questions, {
      order: "sequential",
      source: "daily",
      questionLimit: DAILY_CHALLENGE_COUNT,
    }));
    setResultPayload(null);
    setScreen("quiz");
    resetQuestionUi();
  }, [progress, resetQuestionUi]);

  const goToMenu = useCallback(() => {
    if (session?.mode === "practice" && session.answered > 0 && session.status !== "finished") {
      const message = session.meta?.source === "blocks"
        ? "¿Salir del bloque? La vuelta no se registrará todavía, pero podrás continuarla después."
        : "¿Salir de la sesión? Se perderá el progreso de esta práctica.";
      if (!window.confirm(message)) return;
    }
    setScreen("menu");
    setResultPayload(null);
    if (session?.mode === "practice" && session.meta?.source === "blocks" && session.status !== "finished") {
      setSavedBlockSession(session);
      setBlockMessage(`Bloque ${session.meta.blockStudy.label} pausado en ${session.currentIndex + 1}/${session.questions.length}.`);
      setSession(null);
    } else if (session?.mode === "practice" || session?.status === "finished") {
      setSession(null);
    }
    resetQuestionUi();
  }, [resetQuestionUi, session]);

  const toggleBookmark = useCallback((questionId) => {
    updateProgress((prev) => {
      const exists = prev.bookmarks.includes(questionId);
      return {
        ...prev,
        bookmarks: exists ? prev.bookmarks.filter((id) => id !== questionId) : [questionId, ...prev.bookmarks],
      };
    });
  }, [updateProgress]);

  const useInventoryReward = useCallback((rewardKey) => {
    updateProgress((prev) => {
      const inventory = { ...prev.inventory };
      if (rewardKey === "wheel" && inventory.wheelSpins > 0) inventory.wheelSpins -= 1;
      if (rewardKey === "scratch" && inventory.scratchCards > 0) inventory.scratchCards -= 1;
      if (rewardKey === "chest" && inventory.chestKeys > 0) inventory.chestKeys -= 1;
      if (rewardKey === "boss" && inventory.bossKeys > 0) inventory.bossKeys -= 1;
      return { ...prev, inventory };
    });
    openRewardByKey(rewardKey, "manual");
  }, [openRewardByKey, updateProgress]);

  const handleWheelComplete = useCallback((prize) => {
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

      return {
        ...prev,
        xp: prev.xp + (prize.xp || 0),
        inventory,
        stats: {
          ...prev.stats,
          jackpot: prev.stats.jackpot || !!prize.jackpot,
          powerupsUsed: prev.stats.powerupsUsed + (prize.power ? 1 : 0),
        },
      };
    });

    if (prize.xp) setXpPop({ amount: prize.xp, key: Date.now() });
    if (prize.jackpot) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  }, [updateProgress]);

  const handleScratchComplete = useCallback((prize) => {
    updateProgress((prev) => {
      const inventory = { ...prev.inventory };
      if (prize.mult) {
        inventory.mult = prize.mult;
        inventory.multDur = 3;
      }
      if (prize.freeze) inventory.shields += 1;
      if (prize.skip) inventory.skips += 1;
      return {
        ...prev,
        xp: prev.xp + (prize.xp || 0),
        inventory,
        stats: {
          ...prev.stats,
          scratchUsed: prev.stats.scratchUsed + 1,
        },
      };
    });
    if (prize.xp) setXpPop({ amount: prize.xp, key: Date.now() });
  }, [updateProgress]);

  const handleChestComplete = useCallback((item) => {
    updateProgress((prev) => {
      const inventory = { ...prev.inventory };
      if (item.freeze) inventory.shields += 1;
      if (item.multDuration) {
        inventory.mult = 2;
        inventory.multDur = item.multDuration;
      }
      if (item.spin) inventory.wheelSpins += 1;
      if (item.bossKey) inventory.bossKeys += 1;
      return {
        ...prev,
        xp: prev.xp + (item.xp || 0),
        inventory,
        stats: {
          ...prev.stats,
          chestsOpened: prev.stats.chestsOpened + 1,
        },
      };
    });
    if (item.xp) setXpPop({ amount: item.xp, key: Date.now() });
  }, [updateProgress]);

  const handleBossComplete = useCallback((won) => {
    if (!won) return;
    updateProgress((prev) => ({
      ...prev,
      xp: prev.xp + 500,
      stats: {
        ...prev.stats,
        bossWins: prev.stats.bossWins + 1,
      },
    }));
    setXpPop({ amount: 500, key: Date.now() });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  }, [updateProgress]);

  const submitCurrentAnswer = useCallback(() => {
    if (!currentQuestion || !session || !canSubmitCurrent) return;

    const evaluation = evaluateAnswer(currentQuestion, selectedAnswer);

    if (session.mode === "mock") {
      const recorded = withRecordedMockAnswer(session, currentQuestion.id, serializeSelection(selectedAnswer));
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
      ? calculatePracticeXp(currentQuestion, elapsedSec, nextStreak, progress.inventory.mult, progress.inventory.doubleXP > 0)
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
      ? [...session.rewardQueue, ...rollPracticeRewards(nextStreak, progress.inventory.bossKeys > 0)]
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
        wrongQuestionIds: pushWrongQuestionId(prev.wrongQuestionIds, currentQuestion.id, evaluation.isCorrect),
        stats: {
          ...prev.stats,
          totalCorrect: prev.stats.totalCorrect + (evaluation.isCorrect ? 1 : 0),
          hardCorrect: prev.stats.hardCorrect + (evaluation.isCorrect && currentQuestion.difficulty === 3 ? 1 : 0),
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
  }, [canSubmitCurrent, currentQuestion, finalizeMockSession, hiddenOptions, progress.inventory.bossKeys, progress.inventory.doubleXP, progress.inventory.mult, progress.inventory.shields, resetQuestionUi, selectedAnswer, session, showDiscussion, showHint, updateProgress]);

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
    if (!currentQuestion || showResult || session?.mode !== "practice" || progress.inventory.fiftyFifty <= 0) return;
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
    if (!currentQuestion || showResult || session?.mode !== "practice" || progress.inventory.hints <= 0) return;
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
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-deep)", color: "var(--text-secondary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>
      Preparando simulador...
    </div>;
  }

  const renderNextAction = () => {
    const activeBlockMeta = savedBlockSession?.meta?.blockStudy || null;
    const hasActiveBlock = activeBlockMeta && activeBlockMeta.trackId === blockCatalog.trackId;
    if (hasActiveBlock) {
      return (
        <div style={{ background: "linear-gradient(135deg, var(--info-soft), var(--primary-soft))", border: "1px solid var(--signal-info)", borderRadius: "var(--radius-xl)", padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Continuar Bloque {activeBlockMeta.blockIndex + 1}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>Tu bloque actual esta a medias.</div>
          </div>
          <button onClick={continueSavedBlock} style={{ padding: "12px 20px", border: "none", borderRadius: "var(--radius-md)", background: "var(--gradient-practice)", color: "white", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Continuar</button>
        </div>
      );
    }
    const suggested = suggestedBlock;
    if (suggested && !isBlockMastered(getBlockProgressRecord(progress, blockCatalog.trackId, suggested.blockIndex))) {
      const suggestedProgress = getBlockProgressRecord(progress, blockCatalog.trackId, suggested.blockIndex);
      const hasRounds = suggestedProgress?.rounds?.length > 0;
      return (
        <div style={{ background: "linear-gradient(135deg, var(--primary-soft), var(--accent-soft))", border: "1px solid var(--primary-medium)", borderRadius: "var(--radius-xl)", padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{hasRounds ? "Repetir" : "Empezar"} Bloque {suggested.blockIndex + 1} <span style={{ color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{suggested.label}</span></div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>Siguiente bloque sugerido.</div>
          </div>
          <button onClick={() => { setSelectedBlockIndex(suggested.blockIndex); startBlock(suggested); }} style={{ padding: "12px 20px", border: "none", borderRadius: "var(--radius-md)", background: "var(--gradient-practice)", color: "white", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>{hasRounds ? "Repetir" : "Empezar"}</button>
        </div>
      );
    }
    if (weakestDomain) {
      return (
        <div style={{ background: "linear-gradient(135deg, var(--wrong-soft), var(--accent-soft))", border: "1px solid var(--signal-warning)", borderRadius: "var(--radius-xl)", padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Reforzar {weakestDomain.short}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>Tu dominio mas flojo: {weakestDomain.accuracy}% con {weakestDomain.total} intentos.</div>
          </div>
          <button onClick={() => {
            const domainTopics = weakestDomain.topics.flatMap((canonical) =>
              TOPICS.filter((t) => getCanonicalTopic(t) === canonical)
            );
            setSelectedTopics(new Set(domainTopics));
            setPracticeSource("topics");
            setPracticeMessage(`Cargados temas de ${weakestDomain.short}.`);
          }} style={{ padding: "12px 20px", border: "none", borderRadius: "var(--radius-md)", background: "var(--gradient-danger)", color: "white", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Practicar</button>
        </div>
      );
    }
    return null;
  };

  const renderDomainProgress = () => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Dominios PDE</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {domainStats.map((domain) => {
          const pct = domain.accuracy;
          const lowData = domain.total < 10;
          const barColor = lowData ? "var(--text-muted)" : pct >= 70 ? "var(--signal-correct)" : pct >= 50 ? "var(--signal-warning)" : "var(--signal-wrong)";
          return (
            <div key={domain.id} style={{ display: "grid", gridTemplateColumns: "140px 1fr auto", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={domain.name}>{domain.short}</div>
              <div style={{ height: 8, background: "var(--surface-line)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${lowData ? 0 : pct}%`, background: barColor, borderRadius: "var(--radius-pill)", transition: "width 0.3s" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 110, justifyContent: "flex-end" }}>
                {lowData ? (
                  <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>—</span>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 800, color: barColor, fontFamily: "var(--font-mono)" }}>{pct}%</span>
                )}
                <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>({domain.total})</span>
                {lowData && <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: "var(--radius-pill)", background: "var(--surface-panel-muted)", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>pocos datos</span>}
                {!lowData && pct < 70 && <span style={{ fontSize: 10, color: "var(--signal-warning)" }}>⚠</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTopicHeatmap = () => {
    const heatmapColor = (accuracy) => {
      if (accuracy === null) return "var(--text-muted)";
      if (accuracy >= 90) return "var(--highlight)";
      if (accuracy >= 70) return "var(--signal-correct)";
      if (accuracy >= 50) return "var(--signal-warning)";
      return "var(--signal-wrong)";
    };
    const heatmapBg = (accuracy) => {
      if (accuracy === null) return "var(--surface-panel-muted)";
      if (accuracy >= 90) return "rgba(143, 255, 106, 0.12)";
      if (accuracy >= 70) return "var(--correct-soft)";
      if (accuracy >= 50) return "var(--warning-soft)";
      return "var(--wrong-soft)";
    };
    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Temas</div>
          <button onClick={() => setSelectedTopics(selectedTopics.size === TOPICS.length ? new Set() : new Set(TOPICS))} style={{ border: "none", background: "transparent", color: "var(--primary-400)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {selectedTopics.size === TOPICS.length ? "Deseleccionar todo" : "Seleccionar todo"}
          </button>
        </div>
        {EXAM_DOMAINS.map((domain) => (
          <div key={domain.id} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "var(--font-mono)" }}>{domain.short}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {canonicalTopicStats.filter((s) => s.domainId === domain.id).map((stat) => {
                const rawTopics = TOPICS.filter((t) => getCanonicalTopic(t) === stat.topic);
                const allSelected = rawTopics.every((t) => selectedTopics.has(t));
                const qCount = rawTopics.reduce((sum, t) => sum + (topicCounts[t] || 0), 0);
                const tooltipText = stat.total >= 10 ? `${stat.correct}/${stat.total} correctas` : `${stat.total} intentos`;
                return (
                  <button
                    key={stat.topic}
                    title={`${stat.topic}: ${tooltipText} · ${qCount} preguntas`}
                    onClick={() => {
                      const next = new Set(selectedTopics);
                      rawTopics.forEach((t) => allSelected ? next.delete(t) : next.add(t));
                      setSelectedTopics(next);
                      setPracticeSource("topics");
                      if (qCount < 5) setPracticeMessage(`${stat.topic}: solo ${qCount} preguntas disponibles.`);
                      else setPracticeMessage("");
                    }}
                    onDoubleClick={() => {
                      setSelectedTopics(new Set(rawTopics));
                      setPracticeSource("topics");
                      setPracticeMessage(`Solo ${stat.topic}.`);
                    }}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "var(--radius-pill)",
                      border: allSelected ? `1px solid ${heatmapColor(stat.accuracy)}` : "1px solid var(--surface-line)",
                      background: allSelected ? heatmapBg(stat.accuracy) : "var(--surface-panel-muted)",
                      color: allSelected ? heatmapColor(stat.accuracy) : "var(--text-secondary)",
                      fontSize: 11,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.topic} <span style={{ opacity: 0.65 }}>{stat.accuracy !== null ? `${stat.accuracy}%` : "—"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>Doble click para aislar un tema. Tooltip para detalle.</div>
      </div>
    );
  };

  const renderMockSparkline = () => {
    if (!progress.mockHistory.length) return null;
    const last5 = progress.mockHistory.slice(0, 5);
    const avg = Math.round(last5.reduce((s, e) => s + e.percent, 0) / last5.length);
    const recent3 = last5.slice(0, Math.min(3, last5.length));
    const older = last5.slice(Math.min(3, last5.length));
    const recentAvg = recent3.length ? recent3.reduce((s, e) => s + e.percent, 0) / recent3.length : 0;
    const olderAvg = older.length ? older.reduce((s, e) => s + e.percent, 0) / older.length : recentAvg;
    const trend = recentAvg > olderAvg + 2 ? "↑" : recentAvg < olderAvg - 2 ? "↓" : "→";
    const trendColor = trend === "↑" ? "var(--signal-correct)" : trend === "↓" ? "var(--signal-wrong)" : "var(--text-secondary)";
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 10 }}>
        {last5.slice().reverse().map((entry, i) => (
          <div key={i} title={`${entry.percent}% — ${new Date(entry.date).toLocaleDateString("es-ES")}`} style={{ width: 16, height: Math.max(4, (entry.percent / 100) * 36), borderRadius: 3, background: entry.passed ? "var(--signal-correct)" : "var(--signal-wrong)", opacity: 0.7 + (i / last5.length) * 0.3 }} />
        ))}
        <span style={{ fontSize: 12, fontWeight: 800, color: trendColor, fontFamily: "var(--font-mono)", marginLeft: 6 }}>{avg}% {trend}</span>
      </div>
    );
  };

  const renderSummaryCards = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "var(--space-md)", marginBottom: 16 }}>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Rango</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary-soft)", fontSize: 24, boxShadow: "var(--shadow-glow)" }}>
            {rankState.current.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: rankState.current.color, fontFamily: "var(--font-heading)" }}>{rankState.current.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{progress.xp} XP</div>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Siguiente rango</div>
        {rankState.next ? (
          <>
            <div style={{ marginTop: 8, fontSize: 17, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{rankState.next.icon} {rankState.next.name}</div>
            <div style={{ marginTop: 8, height: 6, background: "var(--surface-line)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${rankState.progress}%`, background: `linear-gradient(90deg, ${rankState.current.color}, ${rankState.next.color})`, borderRadius: "var(--radius-pill)" }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{rankState.next.minXP - progress.xp} XP restantes</div>
          </>
        ) : (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--highlight)", fontWeight: 700 }}>Rango máximo alcanzado.</div>
        )}
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Inventario</div>
        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>
          {progress.inventory.shields + progress.inventory.fiftyFifty + progress.inventory.hints + progress.inventory.skips + progress.inventory.doubleXP + progress.inventory.scratchCards + progress.inventory.chestKeys + progress.inventory.bossKeys + progress.inventory.wheelSpins}
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}>{achievementSet.size} logros desbloqueados</div>
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Peor rendimiento</div>
        {weakTopics.length ? (
          <>
            <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{weakTopics[0].topic}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: weakTopics[0].accuracy >= 70 ? "var(--signal-correct)" : "var(--signal-wrong)", fontFamily: "var(--font-mono)" }}>{weakTopics[0].accuracy}%</div>
            </div>
            <button
              onClick={() => setPracticeSourcePreset("weak")}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "10px 12px",
                border: "1px solid var(--wrong-soft)",
                borderRadius: "var(--radius-md)",
                background: "var(--wrong-soft)",
                color: "var(--signal-wrong)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cargar bloque
            </button>
          </>
        ) : (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>Se mostrará cuando haya suficientes respuestas.</div>
        )}
      </div>
    </div>
  );

  if (screen === "menu") {
    const totalPowerups = progress.inventory.shields + progress.inventory.fiftyFifty + progress.inventory.hints + progress.inventory.skips + progress.inventory.doubleXP + progress.inventory.scratchCards + progress.inventory.chestKeys + progress.inventory.bossKeys + progress.inventory.wheelSpins;
    const hasPracticeQuestions = maxPracticeCount > 0;
    const activeBlockMeta = savedBlockSession?.meta?.blockStudy || null;
    const activeBlockIndex = activeBlockMeta?.trackId === blockCatalog.trackId ? activeBlockMeta.blockIndex : null;
    const selectedBlockRounds = selectedBlockProgress?.rounds || [];
    const selectedBlockChanged = selectedBlock ? hasBlockChanged(selectedBlock, selectedBlockProgress) : false;
    const selectedBlockMastered = isBlockMastered(selectedBlockProgress);
    const selectedBlockStatus = activeBlockIndex === selectedBlock?.blockIndex
      ? "In progress"
      : selectedBlockChanged
        ? "Updated"
        : !selectedBlockProgress?.rounds?.length
          ? "Not started"
          : selectedBlockMastered
            ? `Mastered (${BLOCK_MASTERY_PERCENT}%+)`
            : `Reviewed ${selectedBlockProgress.rounds.length}x`;
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
    const practiceCtaLabel = hasPracticeQuestions
      ? `Iniciar práctica · ${effectivePracticeLimit} preguntas`
      : "Configura la práctica";
    const dailyDone = isDailyChallengeCompleted(progress);
    return <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>

      {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 18px", borderRadius: "var(--radius-pill)", marginBottom: 18, background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)", boxShadow: "var(--shadow-card)" }}>
            <img src={googleCloudLogo} alt="Google Cloud" style={{ height: 24, width: "auto", opacity: 0.92 }} />
            <span style={{ width: 1, height: 18, background: "var(--surface-line-strong)" }} />
            <span style={{ fontSize: 12, color: "var(--text-primary)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-mono)" }}>Professional Data Engineer</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 44, lineHeight: 1.02, fontWeight: 900, letterSpacing: -1.4, fontFamily: "var(--font-heading)" }}>DataForge <span style={{ fontSize: 20, fontWeight: 700, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>PDE</span></h1>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 15, fontFamily: "var(--font-mono)" }}>{QUESTIONS.length} preguntas · práctica + simulacro</p>
        </div>

        {renderSummaryCards()}
        {renderNextAction()}
        {renderDomainProgress()}

        <div style={{ background: "linear-gradient(180deg, rgba(15, 191, 163, 0.14), rgba(6, 15, 25, 0.92))", border: "1px solid var(--primary-medium)", borderRadius: "var(--radius-2xl)", padding: 24, marginBottom: 18, boxShadow: "var(--shadow-elevated)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--primary-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Bloques</div>
              <div style={{ fontSize: 30, fontWeight: 900, marginTop: 4, fontFamily: "var(--font-heading)" }}>Rondas fijas de estudio</div>
              <div style={{ marginTop: 6, fontSize: 14, color: "var(--text-secondary)", maxWidth: 720 }}>
                Orden descendente estable, vueltas por bloque y continuidad aunque recargues la página.
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
              {savedBlockSession && (
                <button
                  onClick={continueSavedBlock}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--signal-info)",
                    background: "var(--info-soft)",
                    color: "var(--signal-info)",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Continuar B{savedBlockSession.meta.blockStudy.blockIndex + 1}
                </button>
              )}
              {BLOCK_SIZE_PRESETS.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setBlockTrackSize(size);
                    setSelectedBlockIndex(0);
                    setBlockMessage(`Track de ${size} preguntas cargado.`);
                  }}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: blockTrackSize === size ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                    background: blockTrackSize === size ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                    color: blockTrackSize === size ? "var(--primary-400)" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {size} preguntas
                </button>
              ))}
            </div>
          </div>

          {selectedBlock && (
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.9fr)", gap: 14, marginBottom: 18 }}>
              <div style={{ background: "var(--gradient-panel-strong)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", flexWrap: "wrap", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
                      {selectedBlock.blockIndex === suggestedBlock?.blockIndex ? "Bloque sugerido" : "Bloque seleccionado"}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 26, fontWeight: 900, fontFamily: "var(--font-heading)" }}>
                      Bloque {selectedBlock.blockIndex + 1} <span style={{ color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{selectedBlock.label}</span>
                    </div>
                  </div>
                  <span style={{ padding: "6px 10px", borderRadius: "var(--radius-pill)", background: selectedBlockChanged ? "var(--accent-soft)" : selectedBlockMastered ? "var(--correct-soft)" : "var(--surface-panel-muted)", color: selectedBlockChanged ? "var(--accent-300)" : selectedBlockMastered ? "var(--signal-correct)" : "var(--text-primary)", fontSize: 11, fontWeight: 800, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: 1 }}>
                    {selectedBlockStatus}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Preguntas</div>
                    <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, fontFamily: "var(--font-mono)" }}>{selectedBlock.questionIds.length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Vueltas</div>
                    <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, fontFamily: "var(--font-mono)" }}>{selectedBlockRounds.length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Último %</div>
                    <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{selectedBlockProgress ? `${selectedBlockProgress.lastPercent}%` : "-"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Mejor %</div>
                    <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{selectedBlockProgress ? `${selectedBlockProgress.bestPercent}%` : "-"}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {activeBlockIndex === selectedBlock.blockIndex ? (
                    <button onClick={continueSavedBlock} style={{ padding: "14px 16px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--gradient-practice)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                      Continuar
                    </button>
                  ) : (
                    <button onClick={() => startBlock(selectedBlock)} style={{ padding: "14px 16px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--gradient-practice)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                      {selectedBlockRounds.length ? `Repetir vuelta ${selectedBlockRounds.length + 1}` : "Empezar bloque"}
                    </button>
                  )}
                  {selectedBlock.blockIndex < blockCatalog.blocks.length - 1 && (
                    <button onClick={() => setSelectedBlockIndex(selectedBlock.blockIndex + 1)} style={{ padding: "14px 16px", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-lg)", background: "var(--surface-panel-muted)", color: "var(--text-primary)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                      Siguiente bloque
                    </button>
                  )}
                  {selectedBlock.blockIndex > 0 && (
                    <button onClick={() => setSelectedBlockIndex(selectedBlock.blockIndex - 1)} style={{ padding: "14px 16px", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-lg)", background: "var(--surface-panel-muted)", color: "var(--text-primary)", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                      Bloque anterior
                    </button>
                  )}
                </div>
              </div>

              <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: 20 }}>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)", marginBottom: 12 }}>Últimas vueltas</div>
                {selectedBlockRounds.length ? selectedBlockRounds.slice(-3).reverse().map((round, index, rounds) => (
                  <div key={round.roundNumber} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderBottom: index < rounds.length - 1 ? "1px solid var(--surface-line)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>Vuelta {round.roundNumber}</div>
                      <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}>{new Date(round.finishedAt).toLocaleString("es-ES")}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: round.percent >= BLOCK_MASTERY_PERCENT ? "var(--signal-correct)" : "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{round.percent}%</div>
                      <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{round.correctCount}/{round.questionCount}</div>
                    </div>
                  </div>
                )) : (
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    Todavía no hay vueltas registradas para este bloque.
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
            {visibleBlocks.map((block) => {
              const blockProgress = getBlockProgressRecord(progress, block.trackId, block.blockIndex);
              const blockRounds = blockProgress?.rounds || [];
              const isActive = activeBlockIndex === block.blockIndex;
              const isSelected = selectedBlock?.blockIndex === block.blockIndex;
              const isUpdated = hasBlockChanged(block, blockProgress);
              const isMastered = isBlockMastered(blockProgress);
              const label = isActive
                ? "In progress"
                : isUpdated
                  ? "Updated"
                  : !blockRounds.length
                    ? "Not started"
                    : isMastered
                      ? "Mastered"
                      : `Reviewed ${blockRounds.length}x`;
              return (
                <button
                  key={block.id}
                  onClick={() => {
                    setSelectedBlockIndex(block.blockIndex);
                    setBlockMessage("");
                  }}
                  style={{
                    padding: 14,
                    borderRadius: "var(--radius-lg)",
                    border: isSelected ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                    background: isSelected ? "linear-gradient(180deg, var(--primary-soft), var(--surface-panel-muted))" : "var(--surface-panel-muted)",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--font-heading)" }}>Bloque {block.blockIndex + 1}</span>
                    <span style={{ fontSize: 11, color: isActive ? "var(--signal-info)" : isMastered ? "var(--signal-correct)" : "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>{blockProgress ? `${blockProgress.lastPercent}%` : "-"}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>{block.label}</div>
                  <div style={{ fontSize: 11, color: isUpdated ? "var(--accent-300)" : "var(--text-tertiary)" }}>{label}</div>
                </button>
              );
            })}
          </div>

          {blockMessage && (
            <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--info-soft)", border: "1px solid var(--signal-info)", color: "var(--signal-info)", fontSize: 12, lineHeight: 1.45 }}>
              {blockMessage}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-md)", marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-xl)", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Racha diaria</div>
              <div style={{ marginTop: 6, fontSize: 17, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
                <span style={{ color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{progress.dailyStreak.current}</span> {progress.dailyStreak.current === 1 ? "día" : "días"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Récord</div>
              <div style={{ marginTop: 6, fontSize: 17, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{progress.dailyStreak.best}</div>
            </div>
          </div>

          <div style={{ background: dailyDone ? "var(--correct-soft)" : "var(--accent-soft)", border: `1px solid ${dailyDone ? "var(--correct-soft)" : "var(--accent-medium)"}`, borderRadius: "var(--radius-xl)", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)" }}>
            <div>
              <div style={{ fontSize: 11, color: dailyDone ? "var(--signal-correct)" : "var(--accent-300)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Reto diario</div>
              <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                {dailyDone ? "Completado" : `${DAILY_CHALLENGE_COUNT} preguntas · +${DAILY_CHALLENGE_BONUS_XP} XP`}
              </div>
            </div>
            {!dailyDone && <button onClick={startDailyChallenge} style={{ padding: "10px 14px", border: "none", borderRadius: "var(--radius-md)", background: "var(--gradient-mock)", color: "white", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Iniciar reto</button>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 18, alignItems: "start" }}>
          <div style={{ background: "var(--gradient-panel-strong)", border: "1px solid var(--primary-medium)", borderRadius: "var(--radius-2xl)", padding: 24, boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--primary-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Practicar</div>
                <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4, fontFamily: "var(--font-heading)" }}>Sesión a medida</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>Control directo de fuente, orden y cantidad.</div>
              </div>
              <div style={{ padding: "8px 14px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Feedback inmediato</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Fuente</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                {practiceSourceOptions.map((option) => {
                  const active = practiceSource === option.key;
                  return (
                    <button
                      key={option.key}
                      disabled={option.disabled}
                      onClick={() => {
                        if (option.key === "topics") {
                          setPracticeSource("topics");
                          setPracticeMessage("Selecciona temas y cantidad.");
                        } else {
                          setPracticeSourcePreset(option.key);
                        }
                      }}
                      style={{
                        padding: "14px 14px",
                        borderRadius: "var(--radius-lg)",
                        border: active ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                        background: active ? "linear-gradient(180deg, var(--primary-soft), var(--surface-panel-muted))" : "var(--surface-panel-muted)",
                        color: option.disabled ? "var(--text-muted)" : "var(--text-primary)",
                        textAlign: "left",
                        cursor: option.disabled ? "not-allowed" : "pointer",
                        opacity: option.disabled ? 0.6 : 1,
                        transition: "all var(--duration-normal) var(--ease-out)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-md)", marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)" }}>{PRACTICE_SOURCE_META[option.key].label}</span>
                        <span style={{ padding: "4px 8px", borderRadius: "var(--radius-pill)", background: "var(--bg-primary)", color: option.disabled ? "var(--text-tertiary)" : "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                          {option.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: option.disabled ? "var(--text-tertiary)" : "var(--text-secondary)", lineHeight: 1.45 }}>
                        {option.disabled ? PRACTICE_SOURCE_META[option.key].empty : PRACTICE_SOURCE_META[option.key].helper}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Orden</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{practiceSource === "topics" ? "Configurable" : "Aplicado al bloque cargado"}</div>
              </div>
              <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                {["random", "sequential", "recent-desc"].map((order) => (
                  <button key={order} onClick={() => setPracticeOrder(order)} style={{
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: practiceOrder === order ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                    background: practiceOrder === order ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                    color: practiceOrder === order ? "var(--primary-400)" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}>
                    {order === "random" ? "Mezclado" : order === "sequential" ? "Secuencial" : "Más recientes"}
                  </button>
                ))}
              </div>
            </div>

            {practiceSource === "topics" && renderTopicHeatmap()}

            {practiceSource !== "topics" && (
              <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: "var(--radius-lg)", background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-md)", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{practiceSummary.title}</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45 }}>{practiceSummary.subtitle}</div>
                  </div>
                  <button onClick={() => setPracticeSource("topics")} style={{ border: "1px solid var(--surface-line)", borderRadius: "var(--radius-md)", padding: "9px 12px", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    Volver a dominio
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Cantidad</div>
                <button onClick={() => setShowCustomLimit((current) => !current)} style={{ border: "none", background: "transparent", color: "var(--primary-400)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {showCustomLimit ? "Ocultar personalización" : "Personalizar"}
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)", marginBottom: showCustomLimit ? 10 : 0 }}>
                {PRACTICE_PRESETS.map((preset) => {
                  const disabled = !hasPracticeQuestions || preset > maxPracticeCount;
                  const active = effectivePracticeLimit === preset && !showCustomLimit;
                  return (
                    <button
                      key={preset}
                      disabled={disabled}
                      onClick={() => {
                        setPracticeLimit(preset);
                        setPracticeMessage("");
                        setShowCustomLimit(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "var(--radius-md)",
                        border: active ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                        background: active ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                        color: disabled ? "var(--text-muted)" : active ? "var(--primary-400)" : "var(--text-secondary)",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.55 : 1,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {preset}
                    </button>
                  );
                })}
                <button
                  disabled={!hasPracticeQuestions}
                  onClick={() => {
                    setPracticeLimit(maxPracticeCount);
                    setPracticeMessage("");
                    setShowCustomLimit(false);
                  }}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                    background: effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                    color: hasPracticeQuestions ? (effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "var(--primary-400)" : "var(--text-primary)") : "var(--text-muted)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: hasPracticeQuestions ? "pointer" : "not-allowed",
                    opacity: hasPracticeQuestions ? 1 : 0.55,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {maxPresetLabel}
                </button>
              </div>
              {showCustomLimit && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="number"
                    min="1"
                    max={Math.max(1, maxPracticeCount)}
                    value={practiceLimit}
                    onChange={(event) => {
                      const rawValue = event.target.value;
                      const nextValue = rawValue === "" ? 1 : Math.max(1, Number(rawValue));
                      setPracticeLimit(nextValue);
                      setPracticeMessage(nextValue > maxPracticeCount && maxPracticeCount > 0 ? `Máximo disponible: ${maxPracticeCount}` : "");
                    }}
                    style={{
                      width: 110,
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--surface-line)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                  <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Se ajusta automáticamente al máximo disponible.</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 18, padding: "16px 18px", borderRadius: "var(--radius-lg)", background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, fontFamily: "var(--font-mono)" }}>Resumen</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Fuente</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{PRACTICE_SOURCE_META[practiceSource].label}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Disponibles</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{maxPracticeCount}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Lanzarás</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{hasPracticeQuestions ? effectivePracticeLimit : 0}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-secondary)" }}>
                {practiceSummary.badge} • {practiceSummary.subtitle}
              </div>
            </div>

            {practiceMessage && (
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--info-soft)", border: "1px solid var(--signal-info)", color: "var(--signal-info)", fontSize: 12, lineHeight: 1.45 }}>
                {practiceMessage}
              </div>
            )}

            {!hasPracticeQuestions && (
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)", color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.45 }}>
                {PRACTICE_SOURCE_META[practiceSource].empty}
              </div>
            )}

            <button onClick={startPractice} disabled={!hasPracticeQuestions} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: "var(--radius-lg)", background: hasPracticeQuestions ? "var(--gradient-practice)" : "var(--text-muted)", color: "white", fontSize: 15, fontWeight: 800, cursor: hasPracticeQuestions ? "pointer" : "not-allowed", fontFamily: "var(--font-mono)", boxShadow: hasPracticeQuestions ? "var(--shadow-glow)" : "none" }}>
              {practiceCtaLabel}
            </button>
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>Ayudas y progreso activo solo en práctica.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--accent-medium)", borderRadius: "var(--radius-2xl)", padding: 24, boxShadow: "var(--shadow-card)" }}>
              <div style={{ fontSize: 12, color: "var(--accent-300)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Simulacro</div>
              <div style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 8px", fontFamily: "var(--font-heading)" }}>50 preguntas · 90 min</div>
              <p style={{ margin: "0 0 16px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>Sin ayudas. Sin recompensas. {PASS_PERCENT}% para aprobar.</p>
              <button onClick={startMock} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--gradient-mock)", color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                Iniciar simulacro
              </button>
            </div>

            {savedMockSession && <button onClick={() => {
              setSession(savedMockSession);
              setScreen("quiz");
              resetQuestionUi();
            }} style={{ padding: "16px 18px", borderRadius: "var(--radius-xl)", border: "1px solid var(--correct-soft)", background: "var(--correct-soft)", color: "var(--signal-correct)", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
              Continuar simulacro activo
            </button>}

            {progress.mockHistory.length > 0 && (
              <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-2xl)", padding: 20 }}>
                <div style={{ fontSize: 11, color: "var(--accent-300)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Historial</div>
                {progress.mockHistory.slice(0, 5).map((entry, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(progress.mockHistory.length, 5) - 1 ? "1px solid var(--surface-line)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{new Date(entry.date).toLocaleDateString("es-ES")}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: entry.passed ? "var(--signal-correct)" : "var(--signal-wrong)", fontFamily: "var(--font-mono)" }}>{entry.percent}% {entry.passed ? "Apto" : "No apto"}</span>
                  </div>
                ))}
                {renderMockSparkline()}
              </div>
            )}

            <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-2xl)", padding: 20 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Inventario y logros</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {progress.inventory.shields > 0 && <span style={{ background: "var(--correct-soft)", color: "var(--signal-correct)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🛡️ {progress.inventory.shields}</span>}
                {progress.inventory.fiftyFifty > 0 && <span style={{ background: "var(--info-soft)", color: "var(--signal-info)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>✂️ {progress.inventory.fiftyFifty}</span>}
                {progress.inventory.hints > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>💡 {progress.inventory.hints}</span>}
                {progress.inventory.skips > 0 && <span style={{ background: "var(--primary-soft)", color: "var(--primary-400)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>⏭️ {progress.inventory.skips}</span>}
                {progress.inventory.wheelSpins > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🎰 {progress.inventory.wheelSpins}</span>}
                {progress.inventory.scratchCards > 0 && <span style={{ background: "var(--primary-soft)", color: "var(--primary-400)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🎫 {progress.inventory.scratchCards}</span>}
                {progress.inventory.chestKeys > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>📦 {progress.inventory.chestKeys}</span>}
                {progress.inventory.bossKeys > 0 && <span style={{ background: "var(--wrong-soft)", color: "var(--signal-wrong)", padding: "4px 10px", borderRadius: "var(--radius-pill)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🗝️ {progress.inventory.bossKeys}</span>}
                {!totalPowerups && <span style={{ color: "var(--text-tertiary)", fontSize: 13 }}>Sin items acumulados.</span>}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ACHIEVEMENTS.map((achievement) => (
                  <div key={achievement.id} title={`${achievement.name}: ${achievement.desc}`} style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: achievementSet.has(achievement.id) ? "var(--accent-soft)" : "rgba(139,149,168,0.06)", border: achievementSet.has(achievement.id) ? "1px solid var(--accent-medium)" : "1px solid var(--surface-line)", opacity: achievementSet.has(achievement.id) ? 1 : 0.22 }}>
                    {achievementSet.has(achievement.id) ? achievement.icon : "🔒"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <div style={{ maxWidth: 760, margin: "0 auto 10px", fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.6 }}>
            Herramienta de estudio independiente, no afiliada ni patrocinada por Google LLC. Google Cloud y su logotipo se usan aquí solo como referencia visual para el examen.
          </div>
          <button onClick={() => {
            if (window.confirm("¿Restablecer todo el progreso? Esta acción no se puede deshacer.")) {
              setProgress(EMPTY_PROGRESS);
              setSavedMockSession(null);
              clearActiveMock();
            }
          }} style={{ border: "none", background: "transparent", color: "var(--text-muted)", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>
            Restablecer progreso
          </button>
        </div>
      </div>
    </div>;
  }

  if (screen === "results" && resultPayload) {
    const summary = resultPayload.summary;
    const history = resultPayload.history;
    const isBlockResult = resultPayload.mode === "blocks";
    const blockResult = resultPayload.blockStudy;
    const topicStats = resultPayload.mode === "mock"
      ? summary.byTopic
      : history.reduce((acc, entry) => {
        const topic = entry.question.topic;
        if (!acc[topic]) acc[topic] = { correct: 0, total: 0 };
        acc[topic].total += 1;
        if (entry.correct) acc[topic].correct += 1;
        return acc;
      }, {});
    const headline = resultPayload.mode === "mock"
      ? (summary.passed ? "Simulacro superado" : "Simulacro completado")
      : resultPayload.mode === "daily"
        ? (summary.percent >= 80 ? "Reto diario superado" : "Reto diario completado")
        : isBlockResult
          ? (summary.percent >= BLOCK_MASTERY_PERCENT ? "Bloque consolidado" : "Bloque completado")
        : (summary.percent >= 80 ? "Sesión excelente" : summary.percent >= 60 ? "Buen entrenamiento" : "Seguimos iterando");

    return <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>

      <Confetti active={resultPayload.mode === "mock" ? summary.passed : summary.percent >= 80} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", gap: "var(--space-sm)", alignItems: "center", marginBottom: 12, padding: "8px 14px", borderRadius: "var(--radius-pill)", background: resultPayload.mode === "mock" ? "var(--accent-soft)" : resultPayload.mode === "daily" ? "var(--correct-soft)" : isBlockResult ? "var(--info-soft)" : "var(--primary-soft)", color: resultPayload.mode === "mock" ? "var(--accent-300)" : resultPayload.mode === "daily" ? "var(--signal-correct)" : isBlockResult ? "var(--signal-info)" : "var(--primary-400)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
            {resultPayload.mode === "mock" ? "Simulacro" : resultPayload.mode === "daily" ? "Reto diario" : isBlockResult ? "Bloques" : "Practicar"}
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900, fontFamily: "var(--font-heading)" }}>{headline}</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 15 }}>
            {resultPayload.mode === "mock"
              ? `${summary.score}/${summary.questionCount} correctas • ${summary.percent}% • ${summary.passed ? "Apto" : "No apto"}`
              : isBlockResult
                ? `${summary.score}/${summary.answered} correctas • ${summary.percent}% • vuelta ${blockResult?.roundSummary?.roundNumber ?? "?"} • +${summary.xpGained} XP`
              : `${summary.score}/${summary.answered} correctas • ${summary.percent}% • +${summary.xpGained} XP${summary.dailyBonus ? ` (incluye +${summary.dailyBonus} bonus reto)` : ""}`}
          </p>
          {isBlockResult && blockResult && (
            <p style={{ margin: "10px 0 0", color: "var(--signal-info)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
              Bloque {blockResult.blockIndex + 1} · {blockResult.label}
            </p>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-lg)", padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "var(--signal-correct)" : "var(--signal-wrong)") : "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{summary.percent}%</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>Puntuación</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-lg)", padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? formatDuration(summary.elapsedSec) : isBlockResult ? formatDuration(blockResult?.roundSummary?.elapsedSec || 0) : `+${summary.xpGained}`}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Tiempo usado" : isBlockResult ? "Tiempo bloque" : "XP ganada"}</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-lg)", padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? summary.questionCount : isBlockResult ? `V${blockResult?.roundSummary?.roundNumber ?? "-"}` : `x${summary.maxStreak}`}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Preguntas" : isBlockResult ? "Vuelta" : "Racha máxima"}</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-lg)", padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "var(--signal-correct)" : "var(--signal-wrong)") : "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? (summary.passed ? "Apto" : "No apto") : isBlockResult ? `${blockResult?.roundSummary?.correctCount ?? 0}/${blockResult?.roundSummary?.questionCount ?? history.length}` : history.length}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Estado" : isBlockResult ? "Aciertos" : "Preguntas vistas"}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-xl)", padding: 20, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-heading)" }}>Rendimiento por tema</div>
            {Object.entries(topicStats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([topic, stats]) => {
              const percent = Math.round((stats.correct / stats.total) * 100);
              return <div key={topic} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "var(--text-primary)" }}>{topic}</span>
                  <span style={{ color: percent >= 70 ? "var(--signal-correct)" : "var(--signal-wrong)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.correct}/{stats.total}</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-line)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${percent}%`, background: percent >= 70 ? "var(--signal-correct)" : "var(--accent-300)", borderRadius: "var(--radius-pill)" }} />
                </div>
              </div>;
            })}
          </div>

          <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-xl)", padding: 20, border: "1px solid var(--surface-line)", maxHeight: 420, overflowY: "auto" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-heading)" }}>Revisión</div>
            {history.map((entry, index) => {
              const correctLabels = getCorrectOptionIndexes(entry.question).map((optionIndex) => entry.question.options[optionIndex].slice(0, 2)).join(", ");
              return <div key={`${entry.question.id}-${index}`} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: index < history.length - 1 ? "1px solid var(--surface-line)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: entry.correct ? "var(--correct-soft)" : "var(--wrong-soft)", color: entry.correct ? "var(--signal-correct)" : "var(--signal-wrong)", fontWeight: 800 }}>
                  {entry.correct ? "✓" : "✗"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--text-primary)", fontSize: 12, lineHeight: 1.45 }}>{entry.question.question}</div>
                  <div style={{ color: "var(--text-tertiary)", fontSize: 11, marginTop: 4 }}>
                    {entry.question.topic}
                    {!entry.correct && <span style={{ color: "var(--signal-correct)", marginLeft: 8 }}>Resp: {correctLabels}</span>}
                  </div>
                </div>
              </div>;
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={goToMenu} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: "var(--radius-lg)", background: "var(--gradient-practice)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Volver al menú</button>
          <button onClick={() => resultPayload.mode === "mock" ? startMock() : isBlockResult ? startBlock(blockCatalog.blocks[blockResult.blockIndex]) : startPractice()} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: "var(--radius-lg)", background: resultPayload.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-success)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
            {resultPayload.mode === "mock" ? "Nuevo simulacro" : isBlockResult ? `Repetir vuelta ${blockResult?.roundSummary?.roundNumber + 1 || ""}` : "Seguir practicando"}
          </button>
          {isBlockResult && blockCatalog.blocks[blockResult.blockIndex + 1] && (
            <button onClick={() => startBlock(blockCatalog.blocks[blockResult.blockIndex + 1])} style={{ flex: 1, padding: "14px 16px", border: "1px solid var(--surface-line)", borderRadius: "var(--radius-lg)", background: "var(--surface-panel-muted)", color: "var(--text-primary)", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
              Siguiente bloque
            </button>
          )}
        </div>
      </div>
    </div>;
  }
  const practiceInventoryButtons = practiceMode && !showResult;

  return <div style={{ minHeight: "100vh", background: session?.mode === "mock" ? "linear-gradient(180deg, var(--bg-primary), var(--bg-deep))" : "radial-gradient(circle at top, rgba(15, 191, 163, 0.12), transparent 24%), linear-gradient(180deg, var(--bg-primary), var(--bg-deep) 55%, var(--bg-deep))", color: "var(--text-primary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>
    <Confetti active={showConfetti} />
    {showWheel && <SpinWheel onComplete={handleWheelComplete} onClose={() => { setShowWheel(false); afterRewardClose(); }} />}
    {showScratch && <ScratchCard onComplete={handleScratchComplete} onClose={() => { setShowScratch(false); afterRewardClose(); }} />}
    {showChest && <MysteryChest onComplete={handleChestComplete} onClose={() => { setShowChest(false); afterRewardClose(); }} />}
    {showBoss && bossQuestion && <BossBattle question={bossQuestion} onComplete={handleBossComplete} onClose={() => { setShowBoss(false); setBossQuestion(null); afterRewardClose(); }} />}
    {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
    {xpPop && <div key={xpPop.key} style={{ position: "fixed", left: "50%", top: "34%", transform: "translate(-50%,-50%)", fontSize: 30, fontWeight: 900, color: "var(--accent-300)", zIndex: 500, pointerEvents: "none", animation: "floatUp 1.3s ease-out forwards", textShadow: "0 2px 12px rgba(212,147,10,0.4)", fontFamily: "var(--font-mono)" }}>+{xpPop.amount} XP</div>}

    <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(10, 14, 23, 0.88)", borderBottom: "1px solid var(--surface-line)", backdropFilter: "blur(14px)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", marginBottom: 8 }}>
          <button onClick={goToMenu} style={{ padding: "8px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-line)", background: "var(--surface-panel-muted)", color: "var(--text-primary)", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-mono)" }}>← Menú</button>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "6px 10px", borderRadius: "var(--radius-pill)", background: session?.mode === "mock" ? "var(--accent-soft)" : "var(--primary-soft)", color: session?.mode === "mock" ? "var(--accent-300)" : "var(--primary-400)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
              {session?.mode === "mock" ? "Simulacro" : blockMode ? "Bloques" : "Practicar"}
            </span>
            {blockMode && blockSessionMeta && <span style={{ padding: "6px 10px", borderRadius: "var(--radius-pill)", background: "var(--info-soft)", color: "var(--signal-info)", fontSize: 11, fontWeight: 800, letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
              B{blockSessionMeta.blockIndex + 1} · V{blockSessionMeta.roundNumber}
            </span>}
            {practiceMode && session.streak >= 2 && <span style={{ fontSize: 12, color: session.streak >= 5 ? "var(--accent-300)" : "var(--primary-400)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>x{session.streak}</span>}
            {practiceMode && progress.inventory.mult > 1 && <span style={{ fontSize: 12, color: "var(--signal-correct)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>mult x{progress.inventory.mult} ({progress.inventory.multDur})</span>}
            {session?.mode === "mock" && <span style={{ padding: "6px 10px", borderRadius: "var(--radius-md)", background: mockRemainingSec < 300 ? "var(--wrong-soft)" : "var(--surface-line)", color: mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--text-primary)", fontSize: 13, fontWeight: 800, fontFamily: "var(--font-mono)" }}>{formatDuration(mockRemainingSec)}</span>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", minWidth: 132 }}>
            <span style={{ fontSize: 20 }}>{rankState.current.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{rankState.current.name}</div>
              <div style={{ fontSize: 12, color: "var(--accent-300)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{progress.xp} XP</div>
            </div>
          </div>
          <div style={{ flex: 1, height: 8, background: "var(--surface-line)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((session.currentIndex + 1) / currentQuestions.length) * 100}%`, background: session?.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-practice)", borderRadius: "var(--radius-pill)", transition: "width 0.25s" }} />
          </div>
          <div style={{ minWidth: 100, textAlign: "right", fontSize: 12, color: "var(--text-primary)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
            {session.currentIndex + 1}/{currentQuestions.length}
          </div>
        </div>
      </div>
    </div>

    <div ref={qRef} style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 40px" }}>
      {practiceMode && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-md)", marginBottom: 14 }}>
          <div style={{ background: "var(--surface-panel)", borderRadius: "var(--radius-lg)", border: "1px solid var(--surface-line)", padding: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
              {blockMode ? `Bloque ${blockSessionMeta.label} • orden fijo • vuelta ${blockSessionMeta.roundNumber}` : "Feedback inmediato • recompensas activas • ayudas disponibles"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap" }}>
              <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Correctas {session.score}/{session.answered}</span>
              {pendingRewardCount > 0 && <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--accent-soft)", color: "var(--accent-300)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Pendientes {pendingRewardCount}</span>}
              {progress.inventory.shields > 0 && <span style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "var(--correct-soft)", color: "var(--signal-correct)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>🛡️ {progress.inventory.shields}</span>}
            </div>
          </div>
          {practiceInventoryButtons && <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {progress.inventory.fiftyFifty > 0 && <button onClick={use5050} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--signal-info)", background: "var(--info-soft)", color: "var(--signal-info)", cursor: "pointer" }}>✂️</button>}
            {progress.inventory.hints > 0 && <button onClick={useHint} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>💡</button>}
            {progress.inventory.skips > 0 && <button onClick={useSkip} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--primary-400)", background: "var(--primary-soft)", color: "var(--primary-400)", cursor: "pointer" }}>⏭️</button>}
            {progress.inventory.wheelSpins > 0 && <button onClick={() => useInventoryReward("wheel")} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>🎰</button>}
            {progress.inventory.scratchCards > 0 && <button onClick={() => useInventoryReward("scratch")} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--primary-400)", background: "var(--primary-soft)", color: "var(--primary-400)", cursor: "pointer" }}>🎫</button>}
            {progress.inventory.chestKeys > 0 && <button onClick={() => useInventoryReward("chest")} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>📦</button>}
            {progress.inventory.bossKeys > 0 && <button onClick={() => useInventoryReward("boss")} style={{ width: 38, height: 38, borderRadius: "var(--radius-md)", border: "1px solid var(--signal-wrong)", background: "var(--wrong-soft)", color: "var(--signal-wrong)", cursor: "pointer" }}>🗝️</button>}
          </div>}
        </div>
      )}

      {session?.mode === "mock" && (
        <div style={{ background: "var(--surface-panel)", borderRadius: "var(--radius-lg)", border: "1px solid var(--surface-line)", padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>Sin ayudas ni feedback inmediato. Las no respondidas al acabar el tiempo cuentan como incorrectas.</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>Objetivo mínimo: {PASS_PERCENT}% • Apto/No apto</span>
            <span style={{ fontSize: 13, color: mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--accent-300)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{formatDuration(mockRemainingSec)} restantes</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{currentQuestion.topic}</span>
        <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: currentQuestion.difficulty === 3 ? "var(--wrong-soft)" : "var(--accent-soft)", color: currentQuestion.difficulty === 3 ? "var(--signal-wrong)" : "var(--accent-300)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{"★".repeat(currentQuestion.difficulty)}</span>
        {blockMode && blockSessionMeta && <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: "var(--surface-panel-muted)", color: "var(--text-secondary)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{blockSessionMeta.label}</span>}
        {currentQuestion.isRecent && <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: "var(--accent-soft)", color: "var(--accent-300)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Reciente #{currentQuestion.sourceQuestionNumber || currentQuestion.id}</span>}
        {isMulti && <span style={{ padding: "5px 10px", borderRadius: "var(--radius-pill)", background: "var(--surface-panel-muted)", color: "var(--text-secondary)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Multi respuesta</span>}
        {practiceMode && <button onClick={() => toggleBookmark(currentQuestion.id)} style={{ marginLeft: "auto", border: "none", background: "transparent", color: bookmarkSet.has(currentQuestion.id) ? "var(--accent-300)" : "var(--text-tertiary)", fontSize: 20, cursor: "pointer" }}>{bookmarkSet.has(currentQuestion.id) ? "★" : "☆"}</button>}
      </div>

      {showHint && practiceMode && (
        <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-medium)", borderRadius: "var(--radius-lg)", padding: "12px 16px", marginBottom: 14, color: "var(--accent-300)", fontSize: 13 }}>
          💡 Pista: {currentQuestion.explanation.split(".")[0]}.
        </div>
      )}

      <div style={{ background: "var(--gradient-panel)", borderRadius: "var(--radius-2xl)", border: "1px solid var(--surface-line)", padding: 24, boxShadow: "var(--shadow-elevated)" }}>
        <div style={{ marginBottom: 18, fontSize: 19, fontWeight: 700, lineHeight: 1.6, color: "var(--text-primary)" }}>{currentQuestion.question}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {currentQuestion.options.map((option, index) => {
            if (hiddenOptions.has(index)) {
              return <div key={index} style={{ padding: "14px 16px", borderRadius: "var(--radius-lg)", border: "1px dashed var(--surface-line)", background: "var(--surface-panel-muted)", color: "var(--text-muted)", fontStyle: "italic" }}>Opción eliminada</div>;
            }

            const isSelected = selectedAnswer instanceof Set ? selectedAnswer.has(index) : selectedAnswer === index;
            const isCorrectOption = getCorrectOptionIndexes(currentQuestion).includes(index);
            const selectedIndexes = currentEvaluation?.selectedIndexes || [];
            const selectedHasOption = selectedIndexes.includes(index);
            let background = "var(--surface-panel-muted)";
            let border = "1px solid var(--surface-line)";
            let color = "var(--text-primary)";
            let animation = "";

            if (practiceMode && showResult) {
              if (isCorrectOption) {
                background = "var(--correct-soft)";
                border = "2px solid var(--signal-correct)";
                color = "var(--signal-correct)";
              } else if (selectedHasOption) {
                background = "var(--wrong-soft)";
                border = "2px solid var(--signal-wrong)";
                color = "var(--signal-wrong)";
                animation = "shake 0.4s";
              }
            } else if (isSelected) {
              background = session?.mode === "mock" ? "var(--accent-soft)" : "var(--info-soft)";
              border = session?.mode === "mock" ? "2px solid var(--accent-300)" : "2px solid var(--signal-info)";
              color = session?.mode === "mock" ? "var(--accent-300)" : "var(--signal-info)";
            }

            return <button key={index} onClick={() => {
              if (practiceMode && showResult) return;
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
            }} style={{ padding: "15px 16px", borderRadius: "var(--radius-lg)", border, background, color, fontSize: 14, textAlign: "left", cursor: "pointer", lineHeight: 1.45, animation, transition: "all 0.18s ease" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {isMulti && <span style={{ width: 20, height: 20, borderRadius: 6, border: isSelected ? "2px solid currentColor" : "2px solid var(--surface-line-strong)", background: isSelected ? "currentColor" : "transparent", color: "var(--bg-primary)", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{isSelected ? "✓" : ""}</span>}
                <span style={{ flex: 1 }}>{option}</span>
                <span style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid var(--surface-line-strong)", background: "var(--surface-panel-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--text-tertiary)", flexShrink: 0, fontFamily: "var(--font-mono)" }}>{index + 1}</span>
              </span>
            </button>;
          })}
        </div>

        {practiceMode && showResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: currentEvaluation?.isCorrect ? "var(--correct-soft)" : "var(--wrong-soft)", border: `1px solid ${currentEvaluation?.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)"}`, borderRadius: "var(--radius-lg)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: currentEvaluation?.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)" }}>{currentEvaluation?.isCorrect ? "Correcto" : "Incorrecto"}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>+{session.history[session.history.length - 1]?.xp || 0} XP</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>{currentQuestion.explanation}</div>
            </div>
            <button onClick={() => setShowDiscussion((value) => !value)} style={{ border: "1px solid var(--primary-medium)", background: "var(--primary-soft)", color: "var(--primary-400)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {showDiscussion ? "Ocultar" : "Ver"} discusión ({currentQuestion.discussion.length})
            </button>
            {showDiscussion && <div style={{ background: "var(--surface-panel)", borderRadius: "var(--radius-lg)", border: "1px solid var(--surface-line)", padding: 14 }}>
              {currentQuestion.discussion.map((entry, index) => (
                <div key={`${entry.user}-${index}`} style={{ paddingBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, marginBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, borderBottom: index < currentQuestion.discussion.length - 1 ? "1px solid var(--surface-line)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBottom: 4 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `hsl(${index * 110 + 210},65%,38%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{entry.user[0]}</div>
                    <span style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 700 }}>{entry.user}</span>
                  </div>
                  <div style={{ marginLeft: 34, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.55 }}>{entry.text}</div>
                </div>
              ))}
            </div>}
            <button onClick={openQueuedPracticeReward} style={{ padding: "14px 16px", border: "none", borderRadius: "var(--radius-lg)", background: pendingRewardCount ? "var(--gradient-mock)" : "var(--gradient-success)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
              {pendingRewardCount ? `Reclamar recompensa (${pendingRewardCount})` : session.currentIndex === currentQuestions.length - 1 ? "Ver resultados" : "Siguiente"} <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>
            </button>
          </div>
        ) : (
          <button onClick={submitCurrentAnswer} disabled={!canSubmitCurrent} style={{ width: "100%", padding: "15px 16px", border: "none", borderRadius: "var(--radius-lg)", background: canSubmitCurrent ? (session?.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-practice)") : "var(--text-muted)", color: "white", fontSize: 14, fontWeight: 800, cursor: canSubmitCurrent ? "pointer" : "not-allowed", opacity: canSubmitCurrent ? 1 : 0.55, fontFamily: "var(--font-mono)" }}>
            {session?.mode === "mock" ? "Guardar y continuar" : isMulti ? `Comprobar (${currentEvaluation?.selectedIndexes.length || 0}/${getCorrectOptionIndexes(currentQuestion).length})` : "Comprobar"} {canSubmitCurrent && <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>}
          </button>
        )}
      </div>
    </div>
  </div>;
}

export default App;
