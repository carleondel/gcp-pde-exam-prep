import { useEffect, useMemo, useState } from "react";

import { sameSet } from "../ui/formatting.js";
import {
  PRACTICE_PRESETS,
  sanitizePracticeLimit,
  sanitizePracticeOrder,
  sanitizePracticeSource,
  sanitizePracticeTopics,
} from "../ui/practice-prefs.js";

/**
 * Owns the settings of a custom practice session — which questions it draws
 * from, in what order, how many, over which topics — together with the pool
 * those settings currently select.
 *
 * The selection lives here rather than in the caller because the two are
 * circular: how many questions are available depends on the chosen topics,
 * and the chosen count is clamped against what is available. Splitting them
 * would mean feeding each render's answer back in through a ref.
 *
 * The source pools are passed in instead of derived here: they follow from
 * saved progress, not from the practice settings, so they belong to whoever
 * owns progress.
 *
 * Every setting round-trips through localStorage and is read back through
 * its sanitizer, since a stored value can be stale, hand-edited, or left by
 * a build that offered different options. Storage is injected, so the hook
 * does not know which cert is active and cannot leak one cert's preferences
 * into another.
 */
export function usePracticeConfig({
  allQuestions,
  topics,
  recentQuestions,
  wrongQuestions,
  bookmarkedQuestions,
  weakQuestions,
  loadPracticePrefs,
  savePracticePrefs,
  ready,
}) {
  const storedPracticePrefs = useMemo(() => loadPracticePrefs() || {}, [loadPracticePrefs]);

  const [selectedTopics, setSelectedTopics] = useState(
    () => new Set(sanitizePracticeTopics(storedPracticePrefs.topics, topics)),
  );
  const [practiceOrder, setPracticeOrder] = useState(() =>
    sanitizePracticeOrder(storedPracticePrefs.order),
  );
  const [practiceSource, setPracticeSource] = useState(() =>
    sanitizePracticeSource(storedPracticePrefs.source),
  );
  const [practiceLimit, setPracticeLimit] = useState(() =>
    sanitizePracticeLimit(storedPracticePrefs.limit),
  );

  // The custom-count input opens by itself when the stored count is not one
  // of the presets, so a hand-typed number is still visible on return.
  const [showCustomLimit, setShowCustomLimit] = useState(() => {
    const initialLimit = sanitizePracticeLimit(storedPracticePrefs.limit);
    return !PRACTICE_PRESETS.includes(initialLimit);
  });

  const [practiceMessage, setPracticeMessage] = useState("");

  const topicQuestions = useMemo(
    () => allQuestions.filter((question) => selectedTopics.has(question.topic)),
    [selectedTopics],
  );

  const practiceSourceQuestions = useMemo(() => {
    if (practiceSource === "recent") return recentQuestions;
    if (practiceSource === "wrong") return wrongQuestions;
    if (practiceSource === "bookmarks") return bookmarkedQuestions;
    if (practiceSource === "weak") return weakQuestions;
    return topicQuestions;
  }, [
    bookmarkedQuestions,
    practiceSource,
    recentQuestions,
    topicQuestions,
    weakQuestions,
    wrongQuestions,
  ]);

  const practiceSourceCounts = useMemo(
    () => ({
      topics: topicQuestions.length,
      recent: recentQuestions.length,
      wrong: wrongQuestions.length,
      bookmarks: bookmarkedQuestions.length,
      weak: weakQuestions.length,
    }),
    [
      bookmarkedQuestions.length,
      recentQuestions.length,
      topicQuestions.length,
      weakQuestions.length,
      wrongQuestions.length,
    ],
  );

  const maxPracticeCount = practiceSourceQuestions.length;
  const effectivePracticeLimit =
    maxPracticeCount > 0 ? Math.min(Math.max(1, practiceLimit), maxPracticeCount) : 0;

  /**
   * Reconciles the saved settings against what the bank can actually supply
   * right now — topics that no longer exist, a source that has run dry, a
   * count larger than the pool — and says so, rather than silently starting
   * a session that does not match what the screen showed.
   *
   * The dependency list is deliberately the one this effect has always had.
   * `topics` and `allQuestions` are left out: both are fixed for as long as
   * the cert is mounted, and adding them would change when the effect runs.
   * That is a behaviour change and does not belong in a refactor.
   */
  useEffect(() => {
    if (!ready) return;

    let nextSource = practiceSource;
    let nextTopics = new Set([...selectedTopics].filter((topic) => topics.includes(topic)));
    let nextLimit = sanitizePracticeLimit(practiceLimit);
    let nextMessage = "";

    if (!nextTopics.size) {
      nextTopics = new Set(topics);
      nextMessage = "Ajustamos los temas a los disponibles actualmente.";
    }

    if (nextSource !== "topics" && practiceSourceCounts[nextSource] === 0) {
      nextSource = "topics";
      nextMessage = "Volvimos a Temas porque esa fuente ya no tiene preguntas disponibles.";
    }

    const nextMax =
      nextSource === "wrong"
        ? practiceSourceCounts.wrong
        : nextSource === "recent"
          ? practiceSourceCounts.recent
          : nextSource === "bookmarks"
            ? practiceSourceCounts.bookmarks
            : nextSource === "weak"
              ? practiceSourceCounts.weak
              : allQuestions.filter((question) => nextTopics.has(question.topic)).length;

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
    if (
      nextMessage &&
      (topicsChanged || sourceChanged || limitChanged || practiceMessage !== nextMessage)
    ) {
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
  }, [practiceLimit, practiceOrder, practiceSource, ready, savePracticePrefs, selectedTopics]);

  return {
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
    practiceSourceQuestions,
    practiceSourceCounts,
    maxPracticeCount,
    effectivePracticeLimit,
  };
}
