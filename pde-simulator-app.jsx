import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import googleCloudLogo from "./google-cloud-logo.svg";
import {
  ACHIEVEMENTS,
  AchievementPopup,
  BossBattle,
  Confetti,
  CSS,
  QUESTIONS,
  RANKS,
  ScratchCard,
  MysteryChest,
  SpinWheel,
  TOPICS,
} from "./gcp-pde-exam-prep.jsx";
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
} from "./quiz-engine";
import {
  advanceSession,
  createMockSession,
  createPracticeSession,
  getMockStatus,
  getRemainingTime,
  hydrateMockSession,
  toStoredMockSession,
  withRecordedMockAnswer,
} from "./session-manager";
import {
  EMPTY_PROGRESS,
  clearActiveMock,
  completeDailyChallenge,
  isDailyChallengeCompleted,
  loadActiveMock,
  loadPracticePrefs,
  loadProgress,
  saveActiveMock,
  savePracticePrefs,
  saveProgress,
  updateDailyStreak,
} from "./storage";

const PRACTICE_PRESETS = [10, 20, 30, 50];
const DEFAULT_PRACTICE_LIMIT = 20;
const PRACTICE_SOURCE_META = {
  topics: {
    label: "Temas",
    helper: "Crea sesiones a medida por dominio.",
    empty: "Selecciona al menos un tema para empezar.",
  },
  wrong: {
    label: "Errores",
    helper: "Repasa solo lo que más te cuesta.",
    empty: "Todavía no has acumulado errores para repasar.",
  },
  bookmarks: {
    label: "Favoritas",
    helper: "Vuelve a tus preguntas marcadas.",
    empty: "Aún no has marcado preguntas como favoritas.",
  },
  weak: {
    label: "Temas débiles",
    helper: "Enfócate en los temas con peor acierto.",
    empty: "Necesitas al menos 5 respuestas por tema para detectar áreas débiles.",
  },
};

function sanitizePracticeOrder(order) {
  return order === "sequential" ? "sequential" : "random";
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
  const questionMap = useMemo(() => new Map(QUESTIONS.map((question) => [question.id, question])), []);
  const topicCounts = useMemo(() => buildTopicCounts(), []);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState("menu");
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [session, setSession] = useState(null);
  const [savedMockSession, setSavedMockSession] = useState(null);
  const [resultPayload, setResultPayload] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState(() => new Set(sanitizePracticeTopics(storedPracticePrefs.topics)));
  const [practiceOrder, setPracticeOrder] = useState(() => sanitizePracticeOrder(storedPracticePrefs.order));
  const [practiceSource, setPracticeSource] = useState(() => sanitizePracticeSource(storedPracticePrefs.source));
  const [practiceLimit, setPracticeLimit] = useState(() => sanitizePracticeLimit(storedPracticePrefs.limit));
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
  const topicAnswered = useMemo(() => {
    const counts = {};
    Object.entries(progress.topicHistory).forEach(([topic, entries]) => {
      counts[topic] = new Set(entries.map(e => e.questionId)).size;
    });
    return counts;
  }, [progress.topicHistory]);
  const weakTopicSet = useMemo(() => new Set(weakTopics.map((topic) => topic.topic)), [weakTopics]);
  const wrongQuestions = useMemo(
    () => progress.wrongQuestionIds.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.wrongQuestionIds, questionMap]
  );
  const bookmarkedQuestions = useMemo(
    () => progress.bookmarks.map((id) => questionMap.get(id)).filter(Boolean),
    [progress.bookmarks, questionMap]
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
    if (practiceSource === "wrong") return wrongQuestions;
    if (practiceSource === "bookmarks") return bookmarkedQuestions;
    if (practiceSource === "weak") return weakQuestions;
    return topicQuestions;
  }, [bookmarkedQuestions, practiceSource, topicQuestions, weakQuestions, wrongQuestions]);
  const practiceSourceCounts = useMemo(() => ({
    topics: topicQuestions.length,
    wrong: wrongQuestions.length,
    bookmarks: bookmarkedQuestions.length,
    weak: weakQuestions.length,
  }), [bookmarkedQuestions.length, topicQuestions.length, weakQuestions.length, wrongQuestions.length]);
  const maxPracticeCount = practiceSourceQuestions.length;
  const effectivePracticeLimit = maxPracticeCount > 0 ? Math.min(Math.max(1, practiceLimit), maxPracticeCount) : 0;
  const maxPresetLabel = maxPracticeCount > 0 ? `Máximo disponible (${maxPracticeCount})` : "Máximo disponible";
  const practiceSummary = useMemo(() => {
    if (practiceSource === "wrong") {
      return {
        title: "Repaso de errores",
        subtitle: "Corrige huecos de conocimiento con preguntas falladas recientemente.",
        badge: formatPracticeBadge(progress.wrongQuestionIds.length, "error", "errores"),
      };
    }
    if (practiceSource === "bookmarks") {
      return {
        title: "Favoritas guardadas",
        subtitle: "Retoma las preguntas que marcaste para repasar después.",
        badge: formatPracticeBadge(progress.bookmarks.length, "favorita", "favoritas"),
      };
    }
    if (practiceSource === "weak") {
      return {
        title: "Temas débiles detectados",
        subtitle: weakTopics.length
          ? "Practica las áreas con menor porcentaje de acierto."
          : PRACTICE_SOURCE_META.weak.empty,
        badge: formatPracticeBadge(weakTopics.length, "tema", "temas"),
      };
    }
    return {
      title: "Temas seleccionados",
      subtitle: selectedTopics.size === TOPICS.length
        ? "Banco completo disponible para sesiones personalizadas."
        : "Filtra por dominio para enfocar la práctica.",
      badge: formatPracticeBadge(selectedTopics.size, "tema", "temas"),
    };
  }, [practiceSource, progress.bookmarks.length, progress.wrongQuestionIds.length, selectedTopics.size, weakTopics.length]);

  const currentQuestions = useMemo(() => {
    if (!session) return [];
    return session.mode === "practice" ? session.questions : session.questionIds.map((id) => questionMap.get(id)).filter(Boolean);
  }, [session, questionMap]);

  const currentQuestion = session ? currentQuestions[session.currentIndex] : null;
  const currentEvaluation = currentQuestion ? evaluateAnswer(currentQuestion, selectedAnswer) : null;
  const isMulti = currentQuestion ? Array.isArray(currentQuestion.correct) : false;
  const canSubmitCurrent = currentQuestion ? canSubmitAnswer(currentQuestion, selectedAnswer) : false;
  const mockRemainingSec = session?.mode === "mock" ? getRemainingTime(session, now) : 0;
  const pendingRewardCount = session?.mode === "practice" ? session.rewardQueue.length : 0;

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

  const finishPracticeSession = useCallback((finishedSession) => {
    const isDaily = finishedSession.source === "daily";
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
    setSession(finishedSession);
    setResultPayload({
      mode: isDaily ? "daily" : "practice",
      history: finishedSession.history,
      summary,
    });
    setScreen("results");
    resetQuestionUi();
  }, [progress, resetQuestionUi, updateProgress]);

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
    const restoredMock = storedMock ? hydrateMockSession(storedMock, questionMap) : null;

    previousAchievementsRef.current = savedProgress.achievements;
    setProgress(savedProgress);

    if (restoredMock) {
      setSavedMockSession(restoredMock);
      setSession(restoredMock);
      setScreen("quiz");
    } else {
      clearActiveMock();
      setScreen("menu");
    }

    setReady(true);
  }, [questionMap]);

  useEffect(() => {
    if (!ready) return;
    saveProgress(progress);
  }, [progress, ready]);

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
    if (savedMockSession) saveActiveMock(toStoredMockSession(savedMockSession));
    else clearActiveMock();
  }, [ready, savedMockSession]);

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

    const nextCount = source === "wrong"
      ? wrongQuestions.length
      : source === "bookmarks"
        ? bookmarkedQuestions.length
        : source === "weak"
          ? weakQuestions.length
          : topicQuestions.length;
    const nextLimit = nextCount > 0 ? Math.min(practiceLimit, nextCount) : practiceLimit;

    setPracticeSource(source);
    setPracticeLimit(nextLimit > 0 ? nextLimit : practiceLimit);
    setPracticeMessage(nextCount > 0
      ? `Configuracion de ${PRACTICE_SOURCE_META[source].label.toLowerCase()} cargada en Practicar.`
      : PRACTICE_SOURCE_META[source].empty);
  }, [bookmarkedQuestions.length, practiceLimit, topicQuestions.length, weakQuestions.length, weakTopics, wrongQuestions.length]);

  const startPractice = useCallback(() => {
    const questionIds = practiceSource === "wrong"
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
  }, [effectivePracticeLimit, practiceOrder, practiceSource, progress.bookmarks, progress.wrongQuestionIds, questionMap, resetQuestionUi, selectedTopics, weakTopicSet]);

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
      if (!window.confirm("¿Salir de la sesión? Se perderá el progreso de esta práctica.")) return;
    }
    setScreen("menu");
    setResultPayload(null);
    if (session?.mode === "practice" || session?.status === "finished") setSession(null);
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
    setXpPop({ amount: xpInfo.xp, key: Date.now() });
    setShowResult(true);
  }, [canSubmitCurrent, currentQuestion, finalizeMockSession, progress.inventory.bossKeys, progress.inventory.doubleXP, progress.inventory.mult, progress.inventory.shields, resetQuestionUi, selectedAnswer, session, updateProgress]);

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
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#020617,#0f172a)", color: "#cbd5e1", fontFamily: "'Inter',sans-serif" }}>
      Preparando simulador...
    </div>;
  }

  const renderSummaryCards = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, marginBottom: 18 }}>
      <div style={{ background: "rgba(15,23,42,0.78)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 22, padding: 20, backdropFilter: "blur(18px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", fontSize: 28 }}>
            {rankState.current.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Progreso global</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: rankState.current.color }}>{rankState.current.name}</div>
            <div style={{ fontSize: 13, color: "#e2e8f0", marginTop: 2 }}>{progress.xp} XP acumulada</div>
          </div>
        </div>
        {rankState.next && <>
          <div style={{ height: 8, background: "rgba(148,163,184,0.08)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${rankState.progress}%`, background: `linear-gradient(90deg,${rankState.current.color},${rankState.next.color})`, borderRadius: 999 }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>{rankState.next.minXP - progress.xp} XP para {rankState.next.icon} {rankState.next.name}</div>
        </>}
      </div>
      <div style={{ background: "rgba(15,23,42,0.78)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 22, padding: 20, backdropFilter: "blur(18px)" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Temas débiles</div>
        {weakTopics.length ? weakTopics.map((topic) => (
          <div key={topic.topic} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: "#e2e8f0" }}>{topic.topic}</span>
              <span style={{ color: topic.accuracy >= 70 ? "#34d399" : "#f87171", fontWeight: 700 }}>{topic.accuracy}%</span>
            </div>
            <div style={{ height: 5, background: "rgba(148,163,184,0.08)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${topic.accuracy}%`, background: topic.accuracy >= 70 ? "#34d399" : "#f59e0b", borderRadius: 999 }} />
            </div>
          </div>
        )) : <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>Aún no hay suficientes respuestas evaluadas. Necesitas al menos 5 por tema.</div>}
        <button
          onClick={() => setPracticeSourcePreset("weak")}
          disabled={!weakTopics.length}
          style={{
            width: "100%",
            marginTop: 12,
            padding: "10px 14px",
            border: "1px solid rgba(248,113,113,0.28)",
            borderRadius: 12,
            background: weakTopics.length ? "rgba(248,113,113,0.10)" : "rgba(15,23,42,0.45)",
            color: weakTopics.length ? "#fca5a5" : "#64748b",
            fontSize: 12,
            fontWeight: 700,
            cursor: weakTopics.length ? "pointer" : "not-allowed",
          }}
        >
          Cargar en Practicar
        </button>
      </div>
    </div>
  );

  if (screen === "menu") {
    const totalPowerups = progress.inventory.shields + progress.inventory.fiftyFifty + progress.inventory.hints + progress.inventory.skips + progress.inventory.doubleXP + progress.inventory.scratchCards + progress.inventory.chestKeys + progress.inventory.bossKeys + progress.inventory.wheelSpins;
    const hasPracticeQuestions = maxPracticeCount > 0;
    const practiceSourceOptions = [
      {
        key: "topics",
        badge: formatPracticeBadge(selectedTopics.size, "tema", "temas"),
        disabled: false,
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
      ? `Empezar práctica de ${effectivePracticeLimit} preguntas`
      : "Configura tu práctica";
    return <div style={{ minHeight: "100vh", background: "radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 30%), linear-gradient(180deg,#020617,#0f172a 48%,#111827)", color: "#e2e8f0", fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{CSS}</style>
      {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 18px", borderRadius: 999, marginBottom: 18, background: "rgba(15,23,42,0.72)", border: "1px solid rgba(148,163,184,0.12)", boxShadow: "0 12px 32px rgba(2,6,23,0.32)" }}>
            <img src={googleCloudLogo} alt="Google Cloud" style={{ height: 24, width: "auto", opacity: 0.92 }} />
            <span style={{ width: 1, height: 18, background: "rgba(148,163,184,0.18)" }} />
            <span style={{ fontSize: 12, color: "#cbd5e1", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>Professional Data Engineer</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 40, lineHeight: 1.05, fontWeight: 900, letterSpacing: -1 }}>DataForge <span style={{ fontSize: 20, fontWeight: 600, color: "#60a5fa" }}>PDE</span></h1>
          <p style={{ margin: "0 0 6px", color: "#cbd5e1", fontSize: 16 }}>Prepara la certificación Professional Data Engineer con sesiones configurables y simulacro real.</p>
          <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>Practicar: aprende a tu ritmo con sesiones configurables. Simulacro: mide tu nivel en condiciones de examen.</p>
        </div>

        {renderSummaryCards()}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,191,36,0.08))", border: "1px solid rgba(251,191,36,0.22)", borderRadius: 24, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 42, lineHeight: 1 }}>{progress.dailyStreak.current >= 7 ? "🔥" : progress.dailyStreak.current >= 3 ? "⚡" : "📅"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: progress.dailyStreak.current > 0 ? "#fbbf24" : "#94a3b8" }}>{progress.dailyStreak.current} {progress.dailyStreak.current === 1 ? "día" : "días"}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Racha diaria {progress.dailyStreak.best > 1 && <span style={{ color: "#fbbf24" }}>· Récord: {progress.dailyStreak.best}</span>}</div>
            </div>
          </div>

          {(() => {
            const dailyDone = isDailyChallengeCompleted(progress);
            return <div style={{ background: dailyDone ? "rgba(34,197,94,0.08)" : "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.08))", border: `1px solid ${dailyDone ? "rgba(34,197,94,0.22)" : "rgba(168,85,247,0.22)"}`, borderRadius: 24, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 42, lineHeight: 1 }}>{dailyDone ? "✅" : "🎯"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{dailyDone ? "Reto completado" : "Reto diario"}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: dailyDone ? 0 : 10 }}>{dailyDone ? `+${DAILY_CHALLENGE_BONUS_XP} XP bonus cobrado · Vuelve mañana` : `${DAILY_CHALLENGE_COUNT} preguntas · +${DAILY_CHALLENGE_BONUS_XP} XP bonus`}</div>
                {!dailyDone && <button onClick={startDailyChallenge} style={{ padding: "8px 18px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Aceptar reto</button>}
              </div>
            </div>;
          })()}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "rgba(15,23,42,0.82)", border: "1px solid rgba(96,165,250,0.16)", borderRadius: 28, padding: 24, boxShadow: "0 20px 40px rgba(2,6,23,0.28)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Practicar</div>
                <div style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>Configura una sesión clara y rápida</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>Elige origen, orden y tamaño antes de empezar. Un solo CTA, sin ruido.</div>
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(59,130,246,0.12)", color: "#93c5fd", fontSize: 12, fontWeight: 700 }}>Gamificada</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Fuente</div>
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
                          setPracticeMessage("Ajusta los temas y la cantidad antes de lanzar la práctica.");
                        } else {
                          setPracticeSourcePreset(option.key);
                        }
                      }}
                      style={{
                        padding: "14px 14px",
                        borderRadius: 18,
                        border: active ? "1px solid rgba(96,165,250,0.5)" : "1px solid rgba(148,163,184,0.12)",
                        background: active ? "linear-gradient(180deg, rgba(37,99,235,0.18), rgba(15,23,42,0.72))" : "rgba(15,23,42,0.62)",
                        color: option.disabled ? "#475569" : "#e2e8f0",
                        textAlign: "left",
                        cursor: option.disabled ? "not-allowed" : "pointer",
                        opacity: option.disabled ? 0.6 : 1,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 800 }}>{PRACTICE_SOURCE_META[option.key].label}</span>
                        <span style={{ padding: "4px 8px", borderRadius: 999, background: "rgba(15,23,42,0.68)", color: option.disabled ? "#64748b" : "#93c5fd", fontSize: 11, fontWeight: 700 }}>
                          {option.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: option.disabled ? "#64748b" : "#94a3b8", lineHeight: 1.45 }}>
                        {option.disabled ? PRACTICE_SOURCE_META[option.key].empty : PRACTICE_SOURCE_META[option.key].helper}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Orden</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{practiceSource === "topics" ? "Configurable" : "Se aplica al subconjunto cargado"}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["random", "sequential"].map((order) => (
                  <button key={order} onClick={() => setPracticeOrder(order)} style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: practiceOrder === order ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.12)",
                    background: practiceOrder === order ? "rgba(37,99,235,0.18)" : "rgba(15,23,42,0.7)",
                    color: practiceOrder === order ? "#bfdbfe" : "#94a3b8",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}>
                    {order === "random" ? "Orden mezclado" : "Orden secuencial"}
                  </button>
                ))}
              </div>
            </div>

            {practiceSource === "topics" && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Temas</div>
                  <button onClick={() => setSelectedTopics(selectedTopics.size === TOPICS.length ? new Set() : new Set(TOPICS))} style={{ border: "none", background: "transparent", color: "#93c5fd", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    {selectedTopics.size === TOPICS.length ? "Deseleccionar todo" : "Seleccionar todo"}
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  {TOPICS.map((topic) => (
                    <button key={topic} onClick={() => {
                      const next = new Set(selectedTopics);
                      if (next.has(topic)) next.delete(topic);
                      else next.add(topic);
                      setSelectedTopics(next);
                      setPracticeMessage("");
                    }} onDoubleClick={() => {
                      setSelectedTopics(new Set([topic]));
                      setPracticeMessage(`Filtrado rápido activado para ${topic}.`);
                    }} style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: selectedTopics.has(topic) ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.12)",
                      background: selectedTopics.has(topic) ? "rgba(37,99,235,0.16)" : "rgba(15,23,42,0.72)",
                      color: selectedTopics.has(topic) ? "#bfdbfe" : "#94a3b8",
                      fontSize: 12,
                      cursor: "pointer",
                    }}>
                      {topic} <span style={{ opacity: 0.65 }}>({topicAnswered[topic] || 0}/{topicCounts[topic] || 0})</span>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#475569" }}>Doble click en un tema para quedarte solo con ese dominio.</div>
              </div>
            )}

            {practiceSource !== "topics" && (
              <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 18, background: "rgba(15,23,42,0.45)", border: "1px solid rgba(148,163,184,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0" }}>{practiceSummary.title}</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: "#94a3b8", lineHeight: 1.45 }}>{practiceSummary.subtitle}</div>
                  </div>
                  <button onClick={() => setPracticeSource("topics")} style={{ border: "1px solid rgba(148,163,184,0.12)", borderRadius: 12, padding: "9px 12px", background: "rgba(15,23,42,0.72)", color: "#cbd5e1", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    Volver a Temas
                  </button>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Cantidad</div>
                <button onClick={() => setShowCustomLimit((current) => !current)} style={{ border: "none", background: "transparent", color: "#93c5fd", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {showCustomLimit ? "Ocultar personalización" : "Personalizar"}
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: showCustomLimit ? 10 : 0 }}>
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
                        borderRadius: 12,
                        border: active ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.12)",
                        background: active ? "rgba(37,99,235,0.18)" : "rgba(15,23,42,0.7)",
                        color: disabled ? "#475569" : active ? "#bfdbfe" : "#94a3b8",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.55 : 1,
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
                    borderRadius: 12,
                    border: effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "1px solid rgba(59,130,246,0.55)" : "1px solid rgba(148,163,184,0.12)",
                    background: effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "rgba(37,99,235,0.18)" : "rgba(15,23,42,0.7)",
                    color: hasPracticeQuestions ? (effectivePracticeLimit === maxPracticeCount && !showCustomLimit ? "#bfdbfe" : "#cbd5e1") : "#475569",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: hasPracticeQuestions ? "pointer" : "not-allowed",
                    opacity: hasPracticeQuestions ? 1 : 0.55,
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
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.16)",
                      background: "rgba(15,23,42,0.68)",
                      color: "#e2e8f0",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>El límite se ajusta automáticamente al máximo disponible.</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 18, padding: "16px 18px", borderRadius: 18, background: "linear-gradient(180deg, rgba(15,23,42,0.76), rgba(15,23,42,0.54))", border: "1px solid rgba(148,163,184,0.10)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Resumen de sesión</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Fuente</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{PRACTICE_SOURCE_META[practiceSource].label}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Disponibles</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{maxPracticeCount}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Lanzarás</div>
                  <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: "#60a5fa" }}>{hasPracticeQuestions ? effectivePracticeLimit : 0}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
                {practiceSummary.badge} • {practiceSummary.subtitle}
              </div>
            </div>

            {practiceMessage && (
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: 14, background: "rgba(59,130,246,0.10)", border: "1px solid rgba(59,130,246,0.18)", color: "#bfdbfe", fontSize: 12, lineHeight: 1.45 }}>
                {practiceMessage}
              </div>
            )}

            {!hasPracticeQuestions && (
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: 14, background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.10)", color: "#94a3b8", fontSize: 12, lineHeight: 1.45 }}>
                {PRACTICE_SOURCE_META[practiceSource].empty}
              </div>
            )}

            <button onClick={startPractice} disabled={!hasPracticeQuestions} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: 18, background: hasPracticeQuestions ? "linear-gradient(135deg,#1d4ed8,#3b82f6)" : "#334155", color: "white", fontSize: 15, fontWeight: 800, cursor: hasPracticeQuestions ? "pointer" : "not-allowed" }}>
              {practiceCtaLabel}
            </button>
            <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", textAlign: "center" }}>Feedback inmediato, progreso persistente y ayudas solo en modo práctica.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(15,23,42,0.78)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 24, padding: 24 }}>
              <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Simulacro</div>
              <div style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 8px" }}>50 preguntas, 90 minutos</div>
              <p style={{ margin: "0 0 8px", color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Modo estricto: sin ayudas, sin minijuegos y con revisión final al terminar.</p>
              <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>Mide tu nivel real en condiciones de examen. Aquí no hay atajos ni recompensas intermedias.</p>
              <button onClick={startMock} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: 16, background: "linear-gradient(135deg,#d97706,#f59e0b)", color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                Iniciar simulacro real
              </button>
            </div>

            {savedMockSession && <button onClick={() => {
              setSession(savedMockSession);
              setScreen("quiz");
              resetQuestionUi();
            }} style={{ padding: "16px 18px", borderRadius: 20, border: "1px solid rgba(34,197,94,0.24)", background: "rgba(34,197,94,0.10)", color: "#86efac", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
              Continuar simulacro activo
            </button>}

            {progress.mockHistory.length > 0 && (
              <div style={{ background: "rgba(15,23,42,0.78)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 24, padding: 20 }}>
                <div style={{ fontSize: 12, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Historial de simulacros</div>
                {progress.mockHistory.slice(0, 5).map((entry, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(progress.mockHistory.length, 5) - 1 ? "1px solid rgba(148,163,184,0.07)" : "none" }}>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(entry.date).toLocaleDateString("es-ES")}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: entry.passed ? "#34d399" : "#f87171" }}>{entry.percent}% {entry.passed ? "Apto" : "No apto"}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "rgba(15,23,42,0.78)", border: "1px solid rgba(148,163,184,0.10)", borderRadius: 24, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Inventario y logros</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {progress.inventory.shields > 0 && <span style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>🛡️ {progress.inventory.shields}</span>}
                {progress.inventory.fiftyFifty > 0 && <span style={{ background: "rgba(59,130,246,0.15)", color: "#93c5fd", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>✂️ {progress.inventory.fiftyFifty}</span>}
                {progress.inventory.hints > 0 && <span style={{ background: "rgba(251,191,36,0.15)", color: "#fcd34d", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>💡 {progress.inventory.hints}</span>}
                {progress.inventory.skips > 0 && <span style={{ background: "rgba(168,85,247,0.15)", color: "#d8b4fe", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>⏭️ {progress.inventory.skips}</span>}
                {progress.inventory.wheelSpins > 0 && <span style={{ background: "rgba(245,158,11,0.15)", color: "#fcd34d", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>🎰 {progress.inventory.wheelSpins}</span>}
                {progress.inventory.scratchCards > 0 && <span style={{ background: "rgba(236,72,153,0.15)", color: "#f9a8d4", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>🎫 {progress.inventory.scratchCards}</span>}
                {progress.inventory.chestKeys > 0 && <span style={{ background: "rgba(168,85,247,0.15)", color: "#d8b4fe", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>📦 {progress.inventory.chestKeys}</span>}
                {progress.inventory.bossKeys > 0 && <span style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", padding: "4px 10px", borderRadius: 999, fontSize: 11 }}>🗝️ {progress.inventory.bossKeys}</span>}
                {!totalPowerups && <span style={{ color: "#64748b", fontSize: 13 }}>Todavía no hay items acumulados.</span>}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ACHIEVEMENTS.map((achievement) => (
                  <div key={achievement.id} title={`${achievement.name}: ${achievement.desc}`} style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: achievementSet.has(achievement.id) ? "rgba(251,191,36,0.12)" : "rgba(148,163,184,0.05)", border: achievementSet.has(achievement.id) ? "1px solid rgba(251,191,36,0.35)" : "1px solid rgba(148,163,184,0.08)", opacity: achievementSet.has(achievement.id) ? 1 : 0.22 }}>
                    {achievementSet.has(achievement.id) ? achievement.icon : "🔒"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <div style={{ maxWidth: 760, margin: "0 auto 10px", fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>
            Herramienta de estudio independiente, no afiliada ni patrocinada por Google LLC. Google Cloud y su logotipo se usan aquí solo como referencia visual para el examen.
          </div>
          <button onClick={() => {
            if (window.confirm("¿Restablecer todo el progreso? Esta acción no se puede deshacer.")) {
              setProgress(EMPTY_PROGRESS);
              setSavedMockSession(null);
              clearActiveMock();
            }
          }} style={{ border: "none", background: "transparent", color: "#475569", fontSize: 11, cursor: "pointer", textDecoration: "underline" }}>
            Restablecer progreso
          </button>
        </div>
      </div>
    </div>;
  }

  if (screen === "results" && resultPayload) {
    const summary = resultPayload.summary;
    const history = resultPayload.history;
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
        : (summary.percent >= 80 ? "Sesión excelente" : summary.percent >= 60 ? "Buen entrenamiento" : "Seguimos iterando");

    return <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#020617,#0f172a 52%,#111827)", color: "#e2e8f0", fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{CSS}</style>
      <Confetti active={resultPayload.mode === "mock" ? summary.passed : summary.percent >= 80} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 12, padding: "8px 14px", borderRadius: 999, background: resultPayload.mode === "mock" ? "rgba(245,158,11,0.14)" : resultPayload.mode === "daily" ? "rgba(168,85,247,0.14)" : "rgba(59,130,246,0.14)", color: resultPayload.mode === "mock" ? "#fcd34d" : resultPayload.mode === "daily" ? "#d8b4fe" : "#93c5fd", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
            {resultPayload.mode === "mock" ? "Simulacro" : resultPayload.mode === "daily" ? "🎯 Reto diario" : "Practicar"}
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900 }}>{headline}</h2>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: 15 }}>
            {resultPayload.mode === "mock"
              ? `${summary.score}/${summary.questionCount} correctas • ${summary.percent}% • ${summary.passed ? "Apto" : "No apto"}`
              : `${summary.score}/${summary.answered} correctas • ${summary.percent}% • +${summary.xpGained} XP${summary.dailyBonus ? ` (incluye +${summary.dailyBonus} bonus reto)` : ""}`}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 18, padding: 16, border: "1px solid rgba(148,163,184,0.10)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "#34d399" : "#f87171") : "#60a5fa" }}>{summary.percent}%</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Puntuación</div>
          </div>
          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 18, padding: 16, border: "1px solid rgba(148,163,184,0.10)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fbbf24" }}>{resultPayload.mode === "mock" ? formatDuration(summary.elapsedSec) : `+${summary.xpGained}`}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{resultPayload.mode === "mock" ? "Tiempo usado" : "XP ganada"}</div>
          </div>
          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 18, padding: 16, border: "1px solid rgba(148,163,184,0.10)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#c084fc" }}>{resultPayload.mode === "mock" ? summary.questionCount : `x${summary.maxStreak}`}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{resultPayload.mode === "mock" ? "Preguntas" : "Racha máxima"}</div>
          </div>
          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 18, padding: 16, border: "1px solid rgba(148,163,184,0.10)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "#34d399" : "#f87171") : "#fbbf24" }}>{resultPayload.mode === "mock" ? (summary.passed ? "Apto" : "No apto") : history.length}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{resultPayload.mode === "mock" ? "Estado" : "Preguntas vistas"}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 20, padding: 20, border: "1px solid rgba(148,163,184,0.10)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Rendimiento por tema</div>
            {Object.entries(topicStats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([topic, stats]) => {
              const percent = Math.round((stats.correct / stats.total) * 100);
              return <div key={topic} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#e2e8f0" }}>{topic}</span>
                  <span style={{ color: percent >= 70 ? "#34d399" : "#f87171", fontWeight: 700 }}>{stats.correct}/{stats.total}</span>
                </div>
                <div style={{ height: 6, background: "rgba(148,163,184,0.08)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${percent}%`, background: percent >= 70 ? "#34d399" : "#f59e0b", borderRadius: 999 }} />
                </div>
              </div>;
            })}
          </div>

          <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 20, padding: 20, border: "1px solid rgba(148,163,184,0.10)", maxHeight: 420, overflowY: "auto" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Revisión</div>
            {history.map((entry, index) => {
              const correctLabels = getCorrectOptionIndexes(entry.question).map((optionIndex) => entry.question.options[optionIndex].slice(0, 2)).join(", ");
              return <div key={`${entry.question.id}-${index}`} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: index < history.length - 1 ? "1px solid rgba(148,163,184,0.07)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: entry.correct ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)", color: entry.correct ? "#34d399" : "#f87171", fontWeight: 800 }}>
                  {entry.correct ? "✓" : "✗"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 }}>{entry.question.question}</div>
                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>
                    {entry.question.topic}
                    {!entry.correct && <span style={{ color: "#86efac", marginLeft: 8 }}>Resp: {correctLabels}</span>}
                  </div>
                </div>
              </div>;
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={goToMenu} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: 16, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Volver al menu</button>
          <button onClick={() => resultPayload.mode === "mock" ? startMock() : startPractice()} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: 16, background: resultPayload.mode === "mock" ? "linear-gradient(135deg,#d97706,#f59e0b)" : "linear-gradient(135deg,#7c3aed,#a855f7)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
            {resultPayload.mode === "mock" ? "Nuevo simulacro" : "Seguir practicando"}
          </button>
        </div>
      </div>
    </div>;
  }

  const practiceMode = session?.mode === "practice";
  const practiceInventoryButtons = practiceMode && !showResult;

  return <div style={{ minHeight: "100vh", background: session?.mode === "mock" ? "linear-gradient(180deg,#020617,#111827)" : "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 24%), linear-gradient(180deg,#020617,#0f172a 55%,#111827)", color: "#e2e8f0", fontFamily: "'Inter',-apple-system,sans-serif" }}>
    <style>{CSS}</style>
    <Confetti active={showConfetti} />
    {showWheel && <SpinWheel onComplete={handleWheelComplete} onClose={() => { setShowWheel(false); afterRewardClose(); }} />}
    {showScratch && <ScratchCard onComplete={handleScratchComplete} onClose={() => { setShowScratch(false); afterRewardClose(); }} />}
    {showChest && <MysteryChest onComplete={handleChestComplete} onClose={() => { setShowChest(false); afterRewardClose(); }} />}
    {showBoss && bossQuestion && <BossBattle question={bossQuestion} onComplete={handleBossComplete} onClose={() => { setShowBoss(false); setBossQuestion(null); afterRewardClose(); }} />}
    {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
    {xpPop && <div key={xpPop.key} style={{ position: "fixed", left: "50%", top: "34%", transform: "translate(-50%,-50%)", fontSize: 30, fontWeight: 900, color: "#fbbf24", zIndex: 500, pointerEvents: "none", animation: "floatUp 1.3s ease-out forwards", textShadow: "0 2px 12px rgba(251,191,36,0.5)" }}>+{xpPop.amount} XP</div>}

    <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(2,6,23,0.88)", borderBottom: "1px solid rgba(148,163,184,0.10)", backdropFilter: "blur(14px)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <button onClick={goToMenu} style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(15,23,42,0.75)", color: "#cbd5e1", fontSize: 12, cursor: "pointer" }}>← Menu</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: session?.mode === "mock" ? "rgba(245,158,11,0.14)" : "rgba(59,130,246,0.14)", color: session?.mode === "mock" ? "#fcd34d" : "#93c5fd", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
              {session?.mode === "mock" ? "Simulacro" : "Practicar"}
            </span>
            {practiceMode && session.streak >= 2 && <span style={{ fontSize: 12, color: session.streak >= 5 ? "#f59e0b" : "#60a5fa", fontWeight: 800 }}>🔥 x{session.streak}</span>}
            {practiceMode && progress.inventory.mult > 1 && <span style={{ fontSize: 12, color: "#34d399", fontWeight: 800 }}>⚡x{progress.inventory.mult} ({progress.inventory.multDur})</span>}
            {session?.mode === "mock" && <span style={{ padding: "6px 10px", borderRadius: 12, background: mockRemainingSec < 300 ? "rgba(239,68,68,0.14)" : "rgba(148,163,184,0.12)", color: mockRemainingSec < 300 ? "#fca5a5" : "#e2e8f0", fontSize: 13, fontWeight: 800 }}>{formatDuration(mockRemainingSec)}</span>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 132 }}>
            <span style={{ fontSize: 20 }}>{rankState.current.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{rankState.current.name}</div>
              <div style={{ fontSize: 12, color: "#fbbf24", fontWeight: 800 }}>{progress.xp} XP</div>
            </div>
          </div>
          <div style={{ flex: 1, height: 8, background: "rgba(148,163,184,0.10)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((session.currentIndex + 1) / currentQuestions.length) * 100}%`, background: session?.mode === "mock" ? "linear-gradient(90deg,#f59e0b,#f97316)" : "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: 999, transition: "width 0.25s" }} />
          </div>
          <div style={{ minWidth: 100, textAlign: "right", fontSize: 12, color: "#cbd5e1", fontWeight: 700 }}>
            {session.currentIndex + 1}/{currentQuestions.length}
          </div>
        </div>
      </div>
    </div>

    <div ref={qRef} style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 40px" }}>
      {practiceMode && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 14 }}>
          <div style={{ background: "rgba(15,23,42,0.72)", borderRadius: 18, border: "1px solid rgba(148,163,184,0.10)", padding: 14 }}>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Feedback inmediato • minijuegos • ayudas activas</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(59,130,246,0.12)", color: "#93c5fd", fontSize: 11, fontWeight: 700 }}>Correctas {session.score}/{session.answered}</span>
              {pendingRewardCount > 0 && <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(245,158,11,0.12)", color: "#fcd34d", fontSize: 11, fontWeight: 700 }}>🎁 Pendientes {pendingRewardCount}</span>}
              {progress.inventory.shields > 0 && <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(16,185,129,0.12)", color: "#6ee7b7", fontSize: 11, fontWeight: 700 }}>🛡️ {progress.inventory.shields}</span>}
            </div>
          </div>
          {practiceInventoryButtons && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {progress.inventory.fiftyFifty > 0 && <button onClick={use5050} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(59,130,246,0.35)", background: "rgba(59,130,246,0.12)", color: "#93c5fd", cursor: "pointer" }}>✂️</button>}
            {progress.inventory.hints > 0 && <button onClick={useHint} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(251,191,36,0.35)", background: "rgba(251,191,36,0.12)", color: "#fcd34d", cursor: "pointer" }}>💡</button>}
            {progress.inventory.skips > 0 && <button onClick={useSkip} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(168,85,247,0.35)", background: "rgba(168,85,247,0.12)", color: "#d8b4fe", cursor: "pointer" }}>⏭️</button>}
            {progress.inventory.wheelSpins > 0 && <button onClick={() => useInventoryReward("wheel")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(245,158,11,0.35)", background: "rgba(245,158,11,0.12)", color: "#fcd34d", cursor: "pointer" }}>🎰</button>}
            {progress.inventory.scratchCards > 0 && <button onClick={() => useInventoryReward("scratch")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(236,72,153,0.35)", background: "rgba(236,72,153,0.12)", color: "#f9a8d4", cursor: "pointer" }}>🎫</button>}
            {progress.inventory.chestKeys > 0 && <button onClick={() => useInventoryReward("chest")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(168,85,247,0.35)", background: "rgba(168,85,247,0.12)", color: "#d8b4fe", cursor: "pointer" }}>📦</button>}
            {progress.inventory.bossKeys > 0 && <button onClick={() => useInventoryReward("boss")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(239,68,68,0.35)", background: "rgba(239,68,68,0.12)", color: "#fca5a5", cursor: "pointer" }}>🗝️</button>}
          </div>}
        </div>
      )}

      {session?.mode === "mock" && (
        <div style={{ background: "rgba(15,23,42,0.72)", borderRadius: 18, border: "1px solid rgba(148,163,184,0.10)", padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Sin ayudas ni feedback inmediato. Las no respondidas al acabar el tiempo cuentan como incorrectas.</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 700 }}>Objetivo mínimo: {PASS_PERCENT}% • Apto/No apto</span>
            <span style={{ fontSize: 13, color: mockRemainingSec < 300 ? "#fca5a5" : "#fcd34d", fontWeight: 800 }}>{formatDuration(mockRemainingSec)} restantes</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: "rgba(59,130,246,0.12)", color: "#93c5fd", fontSize: 11, fontWeight: 700 }}>{currentQuestion.topic}</span>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: currentQuestion.difficulty === 3 ? "rgba(239,68,68,0.12)" : "rgba(234,179,8,0.12)", color: currentQuestion.difficulty === 3 ? "#fca5a5" : "#fcd34d", fontSize: 11, fontWeight: 700 }}>{"★".repeat(currentQuestion.difficulty)}</span>
        {isMulti && <span style={{ padding: "5px 10px", borderRadius: 999, background: "rgba(168,85,247,0.12)", color: "#d8b4fe", fontSize: 11, fontWeight: 700 }}>Multi respuesta</span>}
        {practiceMode && <button onClick={() => toggleBookmark(currentQuestion.id)} style={{ marginLeft: "auto", border: "none", background: "transparent", color: bookmarkSet.has(currentQuestion.id) ? "#fcd34d" : "#64748b", fontSize: 20, cursor: "pointer" }}>{bookmarkSet.has(currentQuestion.id) ? "★" : "☆"}</button>}
      </div>

      {showHint && practiceMode && (
        <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.22)", borderRadius: 16, padding: "12px 16px", marginBottom: 14, color: "#fcd34d", fontSize: 13 }}>
          💡 Pista: {currentQuestion.explanation.split(".")[0]}.
        </div>
      )}

      <div style={{ background: "rgba(15,23,42,0.78)", borderRadius: 24, border: "1px solid rgba(148,163,184,0.10)", padding: 24, boxShadow: "0 18px 60px rgba(2,6,23,0.25)" }}>
        <div style={{ marginBottom: 18, fontSize: 19, fontWeight: 700, lineHeight: 1.6, color: "#f8fafc" }}>{currentQuestion.question}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {currentQuestion.options.map((option, index) => {
            if (hiddenOptions.has(index)) {
              return <div key={index} style={{ padding: "14px 16px", borderRadius: 16, border: "1px dashed rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.52)", color: "#475569", fontStyle: "italic" }}>Opción eliminada</div>;
            }

            const isSelected = selectedAnswer instanceof Set ? selectedAnswer.has(index) : selectedAnswer === index;
            const isCorrectOption = getCorrectOptionIndexes(currentQuestion).includes(index);
            const selectedIndexes = currentEvaluation?.selectedIndexes || [];
            const selectedHasOption = selectedIndexes.includes(index);
            let background = "rgba(15,23,42,0.68)";
            let border = "1px solid rgba(148,163,184,0.12)";
            let color = "#e2e8f0";
            let animation = "";

            if (practiceMode && showResult) {
              if (isCorrectOption) {
                background = "rgba(52,211,153,0.10)";
                border = "2px solid #34d399";
                color = "#86efac";
              } else if (selectedHasOption) {
                background = "rgba(248,113,113,0.10)";
                border = "2px solid #f87171";
                color = "#fca5a5";
                animation = "shake 0.4s";
              }
            } else if (isSelected) {
              background = session?.mode === "mock" ? "rgba(245,158,11,0.12)" : "rgba(37,99,235,0.14)";
              border = session?.mode === "mock" ? "2px solid #f59e0b" : "2px solid #3b82f6";
              color = session?.mode === "mock" ? "#fde68a" : "#bfdbfe";
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
            }} style={{ padding: "15px 16px", borderRadius: 18, border, background, color, fontSize: 14, textAlign: "left", cursor: "pointer", lineHeight: 1.45, animation, transition: "all 0.18s ease" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {isMulti && <span style={{ width: 20, height: 20, borderRadius: 6, border: isSelected ? "2px solid currentColor" : "2px solid rgba(148,163,184,0.30)", background: isSelected ? "currentColor" : "transparent", color: "#0f172a", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{isSelected ? "✓" : ""}</span>}
                <span style={{ flex: 1 }}>{option}</span>
                <span style={{ fontSize: 10, opacity: 0.55, flexShrink: 0 }}>{index + 1}</span>
              </span>
            </button>;
          })}
        </div>

        {practiceMode && showResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: currentEvaluation?.isCorrect ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${currentEvaluation?.isCorrect ? "rgba(52,211,153,0.18)" : "rgba(248,113,113,0.18)"}`, borderRadius: 18, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: currentEvaluation?.isCorrect ? "#86efac" : "#fca5a5" }}>{currentEvaluation?.isCorrect ? "Correcto" : "Incorrecto"}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fcd34d" }}>+{session.history[session.history.length - 1]?.xp || 0} XP</div>
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{currentQuestion.explanation}</div>
            </div>
            <button onClick={() => setShowDiscussion((value) => !value)} style={{ border: "1px solid rgba(168,85,247,0.24)", background: "rgba(168,85,247,0.10)", color: "#d8b4fe", borderRadius: 14, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {showDiscussion ? "Ocultar" : "Ver"} discusión ({currentQuestion.discussion.length})
            </button>
            {showDiscussion && <div style={{ background: "rgba(15,23,42,0.65)", borderRadius: 18, border: "1px solid rgba(148,163,184,0.10)", padding: 14 }}>
              {currentQuestion.discussion.map((entry, index) => (
                <div key={`${entry.user}-${index}`} style={{ paddingBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, marginBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, borderBottom: index < currentQuestion.discussion.length - 1 ? "1px solid rgba(148,163,184,0.08)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `hsl(${index * 110 + 210},65%,38%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{entry.user[0]}</div>
                    <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 700 }}>{entry.user}</span>
                  </div>
                  <div style={{ marginLeft: 34, fontSize: 12, color: "#94a3b8", lineHeight: 1.55 }}>{entry.text}</div>
                </div>
              ))}
            </div>}
            <button onClick={openQueuedPracticeReward} style={{ padding: "14px 16px", border: "none", borderRadius: 16, background: pendingRewardCount ? "linear-gradient(135deg,#d97706,#f59e0b)" : "linear-gradient(135deg,#059669,#10b981)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
              {pendingRewardCount ? `Reclamar recompensa (${pendingRewardCount})` : session.currentIndex === currentQuestions.length - 1 ? "Ver resultados" : "Siguiente"} <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>
            </button>
          </div>
        ) : (
          <button onClick={submitCurrentAnswer} disabled={!canSubmitCurrent} style={{ width: "100%", padding: "15px 16px", border: "none", borderRadius: 16, background: canSubmitCurrent ? (session?.mode === "mock" ? "linear-gradient(135deg,#d97706,#f59e0b)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)") : "#334155", color: "white", fontSize: 14, fontWeight: 800, cursor: canSubmitCurrent ? "pointer" : "not-allowed", opacity: canSubmitCurrent ? 1 : 0.55 }}>
            {session?.mode === "mock" ? "Guardar y continuar" : isMulti ? `Comprobar (${currentEvaluation?.selectedIndexes.length || 0}/${getCorrectOptionIndexes(currentQuestion).length})` : "Comprobar"} {canSubmitCurrent && <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>}
          </button>
        )}
      </div>
    </div>
  </div>;
}

export default App;
