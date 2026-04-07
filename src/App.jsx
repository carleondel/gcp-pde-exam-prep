import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import googleCloudLogo from "./assets/google-cloud-logo.svg";
import { QUESTIONS } from "./data/questions.js";
import { TOPICS } from "./data/topics.js";
import { RANKS, ACHIEVEMENTS } from "./data/gamification.js";
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
  advanceSession,
  createMockSession,
  createPracticeSession,
  getMockStatus,
  getRemainingTime,
  hydrateMockSession,
  toStoredMockSession,
  withRecordedMockAnswer,
} from "./engine/session-manager";
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
} from "./engine/storage";

const PRACTICE_PRESETS = [10, 20, 30, 50];
const DEFAULT_PRACTICE_LIMIT = 20;
const PRACTICE_SOURCE_META = {
  topics: {
    label: "Por dominio",
    helper: "Selecciona los dominios que quieres cubrir.",
    empty: "Selecciona temas.",
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
      ? `${PRACTICE_SOURCE_META[source].label} cargado.`
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
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-deep)", color: "var(--text-secondary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>
      Preparando simulador...
    </div>;
  }

  const renderSummaryCards = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Rango</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary-soft)", fontSize: 24, boxShadow: "var(--shadow-glow)" }}>
            {rankState.current.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: rankState.current.color, fontFamily: "var(--font-heading)" }}>{rankState.current.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{progress.xp} XP</div>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Siguiente rango</div>
        {rankState.next ? (
          <>
            <div style={{ marginTop: 8, fontSize: 17, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{rankState.next.icon} {rankState.next.name}</div>
            <div style={{ marginTop: 8, height: 6, background: "var(--surface-line)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${rankState.progress}%`, background: `linear-gradient(90deg, ${rankState.current.color}, ${rankState.next.color})`, borderRadius: 999 }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{rankState.next.minXP - progress.xp} XP restantes</div>
          </>
        ) : (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--highlight)", fontWeight: 700 }}>Rango máximo alcanzado.</div>
        )}
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Inventario</div>
        <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>
          {progress.inventory.shields + progress.inventory.fiftyFifty + progress.inventory.hints + progress.inventory.skips + progress.inventory.doubleXP + progress.inventory.scratchCards + progress.inventory.chestKeys + progress.inventory.bossKeys + progress.inventory.wheelSpins}
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)" }}>{achievementSet.size} logros desbloqueados</div>
      </div>
      <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 20, padding: 16, boxShadow: "var(--shadow-card)" }}>
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
                borderRadius: 12,
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
      ? `Iniciar práctica · ${effectivePracticeLimit} preguntas`
      : "Configura la práctica";
    const dailyDone = isDailyChallengeCompleted(progress);
    return <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>

      {showAch && <AchievementPopup achievement={showAch} onClose={() => setShowAch(null)} />}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "36px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 18px", borderRadius: 999, marginBottom: 18, background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)", boxShadow: "var(--shadow-card)" }}>
            <img src={googleCloudLogo} alt="Google Cloud" style={{ height: 24, width: "auto", opacity: 0.92 }} />
            <span style={{ width: 1, height: 18, background: "var(--surface-line-strong)" }} />
            <span style={{ fontSize: 12, color: "var(--text-primary)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-mono)" }}>Professional Data Engineer</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 44, lineHeight: 1.02, fontWeight: 900, letterSpacing: -1.4, fontFamily: "var(--font-heading)" }}>DataForge <span style={{ fontSize: 20, fontWeight: 700, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>PDE</span></h1>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 15, fontFamily: "var(--font-mono)" }}>319 preguntas · práctica + simulacro</p>
        </div>

        {renderSummaryCards()}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 20, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
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

          <div style={{ background: dailyDone ? "var(--correct-soft)" : "var(--accent-soft)", border: `1px solid ${dailyDone ? "var(--correct-soft)" : "var(--accent-medium)"}`, borderRadius: 20, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: dailyDone ? "var(--signal-correct)" : "var(--accent-300)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Reto diario</div>
              <div style={{ marginTop: 6, fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                {dailyDone ? "Completado" : `${DAILY_CHALLENGE_COUNT} preguntas · +${DAILY_CHALLENGE_BONUS_XP} XP`}
              </div>
            </div>
            {!dailyDone && <button onClick={startDailyChallenge} style={{ padding: "10px 14px", border: "none", borderRadius: 12, background: "var(--gradient-mock)", color: "white", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Iniciar reto</button>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 18, alignItems: "start" }}>
          <div style={{ background: "var(--gradient-panel-strong)", border: "1px solid var(--primary-medium)", borderRadius: 28, padding: 24, boxShadow: "var(--shadow-elevated), var(--shadow-glow)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--primary-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Practicar</div>
                <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4, fontFamily: "var(--font-heading)" }}>Sesión a medida</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>Control directo de fuente, orden y cantidad.</div>
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Feedback inmediato</div>
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
                        borderRadius: 18,
                        border: active ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                        background: active ? "linear-gradient(180deg, var(--primary-soft), var(--surface-panel-muted))" : "var(--surface-panel-muted)",
                        color: option.disabled ? "var(--text-muted)" : "var(--text-primary)",
                        textAlign: "left",
                        cursor: option.disabled ? "not-allowed" : "pointer",
                        opacity: option.disabled ? 0.6 : 1,
                        transition: "all var(--duration-normal) var(--ease-out)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)" }}>{PRACTICE_SOURCE_META[option.key].label}</span>
                        <span style={{ padding: "4px 8px", borderRadius: 999, background: "var(--bg-primary)", color: option.disabled ? "var(--text-tertiary)" : "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
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
              <div style={{ display: "flex", gap: 8 }}>
                {["random", "sequential"].map((order) => (
                  <button key={order} onClick={() => setPracticeOrder(order)} style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: practiceOrder === order ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                    background: practiceOrder === order ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                    color: practiceOrder === order ? "var(--primary-400)" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                  }}>
                    {order === "random" ? "Mezclado" : "Secuencial"}
                  </button>
                ))}
              </div>
            </div>

            {practiceSource === "topics" && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Temas</div>
                  <button onClick={() => setSelectedTopics(selectedTopics.size === TOPICS.length ? new Set() : new Set(TOPICS))} style={{ border: "none", background: "transparent", color: "var(--primary-400)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
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
                      setPracticeMessage(`Solo ${topic}.`);
                    }} style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: selectedTopics.has(topic) ? "1px solid var(--primary-medium)" : "1px solid var(--surface-line)",
                      background: selectedTopics.has(topic) ? "var(--primary-soft)" : "var(--surface-panel-muted)",
                      color: selectedTopics.has(topic) ? "var(--primary-400)" : "var(--text-secondary)",
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                    }}>
                      {topic} <span style={{ opacity: 0.65 }}>({topicAnswered[topic] || 0}/{topicCounts[topic] || 0})</span>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Doble click para aislar un dominio.</div>
              </div>
            )}

            {practiceSource !== "topics" && (
              <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 18, background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>{practiceSummary.title}</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45 }}>{practiceSummary.subtitle}</div>
                  </div>
                  <button onClick={() => setPracticeSource("topics")} style={{ border: "1px solid var(--surface-line)", borderRadius: 12, padding: "9px 12px", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
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
                    borderRadius: 12,
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
                      borderRadius: 12,
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

            <div style={{ marginBottom: 18, padding: "16px 18px", borderRadius: 18, background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)" }}>
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
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: 14, background: "var(--info-soft)", border: "1px solid var(--signal-info)", color: "var(--signal-info)", fontSize: 12, lineHeight: 1.45 }}>
                {practiceMessage}
              </div>
            )}

            {!hasPracticeQuestions && (
              <div style={{ marginBottom: 14, padding: "12px 14px", borderRadius: 14, background: "var(--surface-panel-muted)", border: "1px solid var(--surface-line)", color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.45 }}>
                {PRACTICE_SOURCE_META[practiceSource].empty}
              </div>
            )}

            <button onClick={startPractice} disabled={!hasPracticeQuestions} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: 18, background: hasPracticeQuestions ? "var(--gradient-practice)" : "var(--text-muted)", color: "white", fontSize: 15, fontWeight: 800, cursor: hasPracticeQuestions ? "pointer" : "not-allowed", fontFamily: "var(--font-mono)", boxShadow: hasPracticeQuestions ? "var(--shadow-glow)" : "none" }}>
              {practiceCtaLabel}
            </button>
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>Ayudas y progreso activo solo en práctica.</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--accent-medium)", borderRadius: 24, padding: 24, boxShadow: "var(--shadow-card)" }}>
              <div style={{ fontSize: 12, color: "var(--accent-300)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>Simulacro</div>
              <div style={{ fontSize: 24, fontWeight: 800, margin: "6px 0 8px", fontFamily: "var(--font-heading)" }}>50 preguntas · 90 min</div>
              <p style={{ margin: "0 0 16px", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>Sin ayudas. Sin recompensas. {PASS_PERCENT}% para aprobar.</p>
              <button onClick={startMock} style={{ width: "100%", padding: "16px 18px", border: "none", borderRadius: 16, background: "var(--gradient-mock)", color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
                Iniciar simulacro
              </button>
            </div>

            {savedMockSession && <button onClick={() => {
              setSession(savedMockSession);
              setScreen("quiz");
              resetQuestionUi();
            }} style={{ padding: "16px 18px", borderRadius: 20, border: "1px solid var(--correct-soft)", background: "var(--correct-soft)", color: "var(--signal-correct)", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
              Continuar simulacro activo
            </button>}

            {progress.mockHistory.length > 0 && (
              <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 24, padding: 20 }}>
                <div style={{ fontSize: 11, color: "var(--accent-300)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Historial</div>
                {progress.mockHistory.slice(0, 5).map((entry, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(progress.mockHistory.length, 5) - 1 ? "1px solid var(--surface-line)" : "none" }}>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{new Date(entry.date).toLocaleDateString("es-ES")}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: entry.passed ? "var(--signal-correct)" : "var(--signal-wrong)", fontFamily: "var(--font-mono)" }}>{entry.percent}% {entry.passed ? "Apto" : "No apto"}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: "var(--gradient-panel)", border: "1px solid var(--surface-line)", borderRadius: 24, padding: 20 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontFamily: "var(--font-mono)" }}>Inventario y logros</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {progress.inventory.shields > 0 && <span style={{ background: "var(--correct-soft)", color: "var(--signal-correct)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>🛡️ {progress.inventory.shields}</span>}
                {progress.inventory.fiftyFifty > 0 && <span style={{ background: "var(--info-soft)", color: "var(--signal-info)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>✂️ {progress.inventory.fiftyFifty}</span>}
                {progress.inventory.hints > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>💡 {progress.inventory.hints}</span>}
                {progress.inventory.skips > 0 && <span style={{ background: "var(--primary-soft)", color: "var(--primary-400)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>⏭️ {progress.inventory.skips}</span>}
                {progress.inventory.wheelSpins > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>🎰 {progress.inventory.wheelSpins}</span>}
                {progress.inventory.scratchCards > 0 && <span style={{ background: "var(--primary-soft)", color: "var(--primary-400)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>🎫 {progress.inventory.scratchCards}</span>}
                {progress.inventory.chestKeys > 0 && <span style={{ background: "var(--accent-soft)", color: "var(--accent-300)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>📦 {progress.inventory.chestKeys}</span>}
                {progress.inventory.bossKeys > 0 && <span style={{ background: "var(--wrong-soft)", color: "var(--signal-wrong)", padding: "4px 10px", borderRadius: 999, fontSize: 11, fontFamily: "var(--font-mono)" }}>🗝️ {progress.inventory.bossKeys}</span>}
                {!totalPowerups && <span style={{ color: "var(--text-tertiary)", fontSize: 13 }}>Sin items acumulados.</span>}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ACHIEVEMENTS.map((achievement) => (
                  <div key={achievement.id} title={`${achievement.name}: ${achievement.desc}`} style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: achievementSet.has(achievement.id) ? "var(--accent-soft)" : "rgba(139,149,168,0.06)", border: achievementSet.has(achievement.id) ? "1px solid var(--accent-medium)" : "1px solid var(--surface-line)", opacity: achievementSet.has(achievement.id) ? 1 : 0.22 }}>
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

    return <div style={{ minHeight: "100vh", color: "var(--text-primary)", fontFamily: "var(--font-body)", animation: "fadeIn var(--duration-fast) var(--ease-out)" }}>

      <Confetti active={resultPayload.mode === "mock" ? summary.passed : summary.percent >= 80} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 12, padding: "8px 14px", borderRadius: 999, background: resultPayload.mode === "mock" ? "var(--accent-soft)" : resultPayload.mode === "daily" ? "var(--correct-soft)" : "var(--primary-soft)", color: resultPayload.mode === "mock" ? "var(--accent-300)" : resultPayload.mode === "daily" ? "var(--signal-correct)" : "var(--primary-400)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
            {resultPayload.mode === "mock" ? "Simulacro" : resultPayload.mode === "daily" ? "Reto diario" : "Practicar"}
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900, fontFamily: "var(--font-heading)" }}>{headline}</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 15 }}>
            {resultPayload.mode === "mock"
              ? `${summary.score}/${summary.questionCount} correctas • ${summary.percent}% • ${summary.passed ? "Apto" : "No apto"}`
              : `${summary.score}/${summary.answered} correctas • ${summary.percent}% • +${summary.xpGained} XP${summary.dailyBonus ? ` (incluye +${summary.dailyBonus} bonus reto)` : ""}`}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", borderRadius: 18, padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "var(--signal-correct)" : "var(--signal-wrong)") : "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{summary.percent}%</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>Puntuación</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: 18, padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? formatDuration(summary.elapsedSec) : `+${summary.xpGained}`}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Tiempo usado" : "XP ganada"}</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: 18, padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--primary-400)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? summary.questionCount : `x${summary.maxStreak}`}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Preguntas" : "Racha máxima"}</div>
          </div>
          <div style={{ background: "var(--gradient-panel)", borderRadius: 18, padding: 16, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: resultPayload.mode === "mock" ? (summary.passed ? "var(--signal-correct)" : "var(--signal-wrong)") : "var(--accent-300)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? (summary.passed ? "Apto" : "No apto") : history.length}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{resultPayload.mode === "mock" ? "Estado" : "Preguntas vistas"}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "var(--gradient-panel)", borderRadius: 20, padding: 20, border: "1px solid var(--surface-line)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-heading)" }}>Rendimiento por tema</div>
            {Object.entries(topicStats).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([topic, stats]) => {
              const percent = Math.round((stats.correct / stats.total) * 100);
              return <div key={topic} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "var(--text-primary)" }}>{topic}</span>
                  <span style={{ color: percent >= 70 ? "var(--signal-correct)" : "var(--signal-wrong)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stats.correct}/{stats.total}</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-line)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${percent}%`, background: percent >= 70 ? "var(--signal-correct)" : "var(--accent-300)", borderRadius: 999 }} />
                </div>
              </div>;
            })}
          </div>

          <div style={{ background: "var(--gradient-panel)", borderRadius: 20, padding: 20, border: "1px solid var(--surface-line)", maxHeight: 420, overflowY: "auto" }}>
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

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={goToMenu} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: 16, background: "var(--gradient-practice)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>Volver al menú</button>
          <button onClick={() => resultPayload.mode === "mock" ? startMock() : startPractice()} style={{ flex: 1, padding: "14px 16px", border: "none", borderRadius: 16, background: resultPayload.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-success)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
            {resultPayload.mode === "mock" ? "Nuevo simulacro" : "Seguir practicando"}
          </button>
        </div>
      </div>
    </div>;
  }

  const practiceMode = session?.mode === "practice";
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <button onClick={goToMenu} style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid var(--surface-line)", background: "var(--surface-panel-muted)", color: "var(--text-primary)", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-mono)" }}>← Menú</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ padding: "6px 10px", borderRadius: 999, background: session?.mode === "mock" ? "var(--accent-soft)" : "var(--primary-soft)", color: session?.mode === "mock" ? "var(--accent-300)" : "var(--primary-400)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-mono)" }}>
              {session?.mode === "mock" ? "Simulacro" : "Practicar"}
            </span>
            {practiceMode && session.streak >= 2 && <span style={{ fontSize: 12, color: session.streak >= 5 ? "var(--accent-300)" : "var(--primary-400)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>x{session.streak}</span>}
            {practiceMode && progress.inventory.mult > 1 && <span style={{ fontSize: 12, color: "var(--signal-correct)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>mult x{progress.inventory.mult} ({progress.inventory.multDur})</span>}
            {session?.mode === "mock" && <span style={{ padding: "6px 10px", borderRadius: 12, background: mockRemainingSec < 300 ? "var(--wrong-soft)" : "var(--surface-line)", color: mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--text-primary)", fontSize: 13, fontWeight: 800, fontFamily: "var(--font-mono)" }}>{formatDuration(mockRemainingSec)}</span>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 132 }}>
            <span style={{ fontSize: 20 }}>{rankState.current.icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{rankState.current.name}</div>
              <div style={{ fontSize: 12, color: "var(--accent-300)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{progress.xp} XP</div>
            </div>
          </div>
          <div style={{ flex: 1, height: 8, background: "var(--surface-line)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((session.currentIndex + 1) / currentQuestions.length) * 100}%`, background: session?.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-practice)", borderRadius: 999, transition: "width 0.25s" }} />
          </div>
          <div style={{ minWidth: 100, textAlign: "right", fontSize: 12, color: "var(--text-primary)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
            {session.currentIndex + 1}/{currentQuestions.length}
          </div>
        </div>
      </div>
    </div>

    <div ref={qRef} style={{ maxWidth: 920, margin: "0 auto", padding: "24px 20px 40px" }}>
      {practiceMode && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 14 }}>
          <div style={{ background: "var(--surface-panel)", borderRadius: 18, border: "1px solid var(--surface-line)", padding: 14 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>Feedback inmediato • recompensas activas • ayudas disponibles</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "4px 10px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Correctas {session.score}/{session.answered}</span>
              {pendingRewardCount > 0 && <span style={{ padding: "4px 10px", borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-300)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Pendientes {pendingRewardCount}</span>}
              {progress.inventory.shields > 0 && <span style={{ padding: "4px 10px", borderRadius: 999, background: "var(--correct-soft)", color: "var(--signal-correct)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>🛡️ {progress.inventory.shields}</span>}
            </div>
          </div>
          {practiceInventoryButtons && <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {progress.inventory.fiftyFifty > 0 && <button onClick={use5050} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--signal-info)", background: "var(--info-soft)", color: "var(--signal-info)", cursor: "pointer" }}>✂️</button>}
            {progress.inventory.hints > 0 && <button onClick={useHint} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>💡</button>}
            {progress.inventory.skips > 0 && <button onClick={useSkip} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--primary-400)", background: "var(--primary-soft)", color: "var(--primary-400)", cursor: "pointer" }}>⏭️</button>}
            {progress.inventory.wheelSpins > 0 && <button onClick={() => useInventoryReward("wheel")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>🎰</button>}
            {progress.inventory.scratchCards > 0 && <button onClick={() => useInventoryReward("scratch")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--primary-400)", background: "var(--primary-soft)", color: "var(--primary-400)", cursor: "pointer" }}>🎫</button>}
            {progress.inventory.chestKeys > 0 && <button onClick={() => useInventoryReward("chest")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--accent-300)", background: "var(--accent-soft)", color: "var(--accent-300)", cursor: "pointer" }}>📦</button>}
            {progress.inventory.bossKeys > 0 && <button onClick={() => useInventoryReward("boss")} style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid var(--signal-wrong)", background: "var(--wrong-soft)", color: "var(--signal-wrong)", cursor: "pointer" }}>🗝️</button>}
          </div>}
        </div>
      )}

      {session?.mode === "mock" && (
        <div style={{ background: "var(--surface-panel)", borderRadius: 18, border: "1px solid var(--surface-line)", padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>Sin ayudas ni feedback inmediato. Las no respondidas al acabar el tiempo cuentan como incorrectas.</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 700 }}>Objetivo mínimo: {PASS_PERCENT}% • Apto/No apto</span>
            <span style={{ fontSize: 13, color: mockRemainingSec < 300 ? "var(--signal-wrong)" : "var(--accent-300)", fontWeight: 800, fontFamily: "var(--font-mono)" }}>{formatDuration(mockRemainingSec)} restantes</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: "var(--primary-soft)", color: "var(--primary-400)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{currentQuestion.topic}</span>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: currentQuestion.difficulty === 3 ? "var(--wrong-soft)" : "var(--accent-soft)", color: currentQuestion.difficulty === 3 ? "var(--signal-wrong)" : "var(--accent-300)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{"★".repeat(currentQuestion.difficulty)}</span>
        {isMulti && <span style={{ padding: "5px 10px", borderRadius: 999, background: "var(--surface-panel-muted)", color: "var(--text-secondary)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>Multi respuesta</span>}
        {practiceMode && <button onClick={() => toggleBookmark(currentQuestion.id)} style={{ marginLeft: "auto", border: "none", background: "transparent", color: bookmarkSet.has(currentQuestion.id) ? "var(--accent-300)" : "var(--text-tertiary)", fontSize: 20, cursor: "pointer" }}>{bookmarkSet.has(currentQuestion.id) ? "★" : "☆"}</button>}
      </div>

      {showHint && practiceMode && (
        <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-medium)", borderRadius: 16, padding: "12px 16px", marginBottom: 14, color: "var(--accent-300)", fontSize: 13 }}>
          💡 Pista: {currentQuestion.explanation.split(".")[0]}.
        </div>
      )}

      <div style={{ background: "var(--gradient-panel)", borderRadius: 24, border: "1px solid var(--surface-line)", padding: 24, boxShadow: "var(--shadow-elevated)" }}>
        <div style={{ marginBottom: 18, fontSize: 19, fontWeight: 700, lineHeight: 1.6, color: "var(--text-primary)" }}>{currentQuestion.question}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {currentQuestion.options.map((option, index) => {
            if (hiddenOptions.has(index)) {
              return <div key={index} style={{ padding: "14px 16px", borderRadius: 16, border: "1px dashed var(--surface-line)", background: "var(--surface-panel-muted)", color: "var(--text-muted)", fontStyle: "italic" }}>Opción eliminada</div>;
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
            }} style={{ padding: "15px 16px", borderRadius: 18, border, background, color, fontSize: 14, textAlign: "left", cursor: "pointer", lineHeight: 1.45, animation, transition: "all 0.18s ease" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {isMulti && <span style={{ width: 20, height: 20, borderRadius: 6, border: isSelected ? "2px solid currentColor" : "2px solid var(--surface-line-strong)", background: isSelected ? "currentColor" : "transparent", color: "var(--bg-primary)", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{isSelected ? "✓" : ""}</span>}
                <span style={{ flex: 1 }}>{option}</span>
                <span style={{ fontSize: 10, opacity: 0.55, flexShrink: 0, fontFamily: "var(--font-mono)" }}>{index + 1}</span>
              </span>
            </button>;
          })}
        </div>

        {practiceMode && showResult ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: currentEvaluation?.isCorrect ? "var(--correct-soft)" : "var(--wrong-soft)", border: `1px solid ${currentEvaluation?.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)"}`, borderRadius: 18, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: currentEvaluation?.isCorrect ? "var(--signal-correct)" : "var(--signal-wrong)" }}>{currentEvaluation?.isCorrect ? "Correcto" : "Incorrecto"}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "var(--accent-300)", fontFamily: "var(--font-mono)" }}>+{session.history[session.history.length - 1]?.xp || 0} XP</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6 }}>{currentQuestion.explanation}</div>
            </div>
            <button onClick={() => setShowDiscussion((value) => !value)} style={{ border: "1px solid var(--primary-medium)", background: "var(--primary-soft)", color: "var(--primary-400)", borderRadius: 14, padding: "10px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {showDiscussion ? "Ocultar" : "Ver"} discusión ({currentQuestion.discussion.length})
            </button>
            {showDiscussion && <div style={{ background: "var(--surface-panel)", borderRadius: 18, border: "1px solid var(--surface-line)", padding: 14 }}>
              {currentQuestion.discussion.map((entry, index) => (
                <div key={`${entry.user}-${index}`} style={{ paddingBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, marginBottom: index < currentQuestion.discussion.length - 1 ? 12 : 0, borderBottom: index < currentQuestion.discussion.length - 1 ? "1px solid var(--surface-line)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `hsl(${index * 110 + 210},65%,38%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{entry.user[0]}</div>
                    <span style={{ fontSize: 12, color: "var(--text-primary)", fontWeight: 700 }}>{entry.user}</span>
                  </div>
                  <div style={{ marginLeft: 34, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.55 }}>{entry.text}</div>
                </div>
              ))}
            </div>}
            <button onClick={openQueuedPracticeReward} style={{ padding: "14px 16px", border: "none", borderRadius: 16, background: pendingRewardCount ? "var(--gradient-mock)" : "var(--gradient-success)", color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
              {pendingRewardCount ? `Reclamar recompensa (${pendingRewardCount})` : session.currentIndex === currentQuestions.length - 1 ? "Ver resultados" : "Siguiente"} <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>
            </button>
          </div>
        ) : (
          <button onClick={submitCurrentAnswer} disabled={!canSubmitCurrent} style={{ width: "100%", padding: "15px 16px", border: "none", borderRadius: 16, background: canSubmitCurrent ? (session?.mode === "mock" ? "var(--gradient-mock)" : "var(--gradient-practice)") : "var(--text-muted)", color: "white", fontSize: 14, fontWeight: 800, cursor: canSubmitCurrent ? "pointer" : "not-allowed", opacity: canSubmitCurrent ? 1 : 0.55, fontFamily: "var(--font-mono)" }}>
            {session?.mode === "mock" ? "Guardar y continuar" : isMulti ? `Comprobar (${currentEvaluation?.selectedIndexes.length || 0}/${getCorrectOptionIndexes(currentQuestion).length})` : "Comprobar"} {canSubmitCurrent && <span style={{ opacity: 0.5, fontSize: 11 }}>(Enter)</span>}
          </button>
        )}
      </div>
    </div>
  </div>;
}

export default App;
