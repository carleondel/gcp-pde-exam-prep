import { useCallback, useEffect, useMemo, useState } from "react";

import {
  buildBlockCatalog,
  getBlockProgressRecord,
  getSuggestedBlockIndex,
} from "../engine/block-study.js";
import { toStoredBlockSession } from "../engine/session-manager.js";
import { sanitizeBlockSize } from "../ui/practice-prefs.js";

/**
 * Aggregates a track's rounds so the menu can show progress per round
 * rather than only the latest attempt.
 */
export function buildTrackRoundStats(progress, trackId) {
  const track = progress.blockStudy?.tracks?.[trackId];
  const blocks = track?.blocks || {};
  const byRound = new Map();

  for (const record of Object.values(blocks)) {
    (record.rounds || []).forEach((round, index) => {
      const roundNumber = round.roundNumber || index + 1;
      const entry = byRound.get(roundNumber) || { roundNumber, blocks: 0, correct: 0, total: 0 };
      entry.blocks += 1;
      entry.correct += round.correctCount || 0;
      entry.total += round.questionCount || 0;
      byRound.set(roundNumber, entry);
    });
  }

  return [...byRound.values()]
    .map((entry) => ({
      ...entry,
      percent: entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0,
    }))
    .sort((left, right) => left.roundNumber - right.roundNumber);
}

/**
 * Owns block study: how the bank is cut into blocks, which block is
 * selected, and the round history of each one.
 *
 * The running quiz session is passed in rather than owned here. Practice and
 * mock share that state, and a block is simply a practice session tagged as
 * one — so this hook reads the session to decide whether a block is still in
 * flight, but does not control it.
 *
 * Storage is injected, keeping block preferences and any interrupted block
 * namespaced per cert.
 */
export function useBlockStudy({
  allQuestions,
  progress,
  updateProgress,
  session,
  loadBlockPrefs,
  saveBlockPrefs,
  saveActiveBlockSession,
  clearActiveBlockSession,
  ready,
}) {
  const storedBlockPrefs = useMemo(() => loadBlockPrefs() || {}, [loadBlockPrefs]);

  const [savedBlockSession, setSavedBlockSession] = useState(null);
  const [blockTrackSize, setBlockTrackSize] = useState(() =>
    sanitizeBlockSize(storedBlockPrefs.trackSize),
  );
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(() =>
    Math.max(0, Number(storedBlockPrefs.blockIndex) || 0),
  );
  const [blockMessage, setBlockMessage] = useState("");

  const blockCatalog = useMemo(
    () => buildBlockCatalog(allQuestions, blockTrackSize),
    [blockTrackSize],
  );

  const effectiveSelectedBlockIndex = useMemo(() => {
    if (!blockCatalog.blocks.length) return 0;
    return Math.min(Math.max(0, selectedBlockIndex), blockCatalog.blocks.length - 1);
  }, [blockCatalog.blocks.length, selectedBlockIndex]);

  const selectedBlock = blockCatalog.blocks[effectiveSelectedBlockIndex] || null;

  const suggestedBlockIndex = useMemo(
    () => getSuggestedBlockIndex(blockCatalog.blocks, progress, savedBlockSession),
    [blockCatalog.blocks, progress, savedBlockSession],
  );
  const suggestedBlock = blockCatalog.blocks[suggestedBlockIndex] || null;

  const selectedBlockProgress = useMemo(
    () =>
      selectedBlock
        ? getBlockProgressRecord(progress, selectedBlock.trackId, selectedBlock.blockIndex)
        : null,
    [progress, selectedBlock],
  );

  const trackRoundStats = useMemo(
    () => buildTrackRoundStats(progress, blockCatalog.trackId),
    [progress, blockCatalog.trackId],
  );

  /** Pulls the selection back in range when a smaller block size shortens the track. */
  useEffect(() => {
    if (!blockCatalog.blocks.length) return;
    if (selectedBlockIndex !== effectiveSelectedBlockIndex) {
      setSelectedBlockIndex(effectiveSelectedBlockIndex);
    }
  }, [blockCatalog.blocks.length, effectiveSelectedBlockIndex, selectedBlockIndex]);

  useEffect(() => {
    if (!ready) return;
    saveBlockPrefs({
      trackSize: blockTrackSize,
      blockIndex: effectiveSelectedBlockIndex,
    });
  }, [blockTrackSize, effectiveSelectedBlockIndex, ready, saveBlockPrefs]);

  /**
   * Keeps the interrupted-block record in step with what is actually running.
   *
   * The elapsed time is frozen into the stored record on the way out, because
   * startedAt is a wall-clock instant: without it, a block left overnight
   * would come back having "run" for eight hours.
   */
  useEffect(() => {
    if (!ready) return;
    const activeBlockSession =
      session?.mode === "practice" &&
      session.meta?.source === "blocks" &&
      session.status !== "finished"
        ? session
        : savedBlockSession;

    if (!activeBlockSession || activeBlockSession.status === "finished") {
      clearActiveBlockSession();
      return;
    }

    const stored = toStoredBlockSession(activeBlockSession);
    if (stored && stored.pausedElapsedSec == null) {
      stored.pausedElapsedSec = Math.floor((Date.now() - activeBlockSession.startedAt) / 1000);
    }
    saveActiveBlockSession(stored);
  }, [clearActiveBlockSession, ready, savedBlockSession, saveActiveBlockSession, session]);

  /**
   * Appends a finished round to the block's history and refreshes its
   * summary. The block's identity is copied over on every round so a block
   * whose questions changed underneath stops reporting the old signature.
   */
  const recordBlockRound = useCallback(
    (finishedSession, summary) => {
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
    },
    [updateProgress],
  );

  return {
    savedBlockSession,
    setSavedBlockSession,
    blockTrackSize,
    setBlockTrackSize,
    selectedBlockIndex,
    setSelectedBlockIndex,
    blockMessage,
    setBlockMessage,
    blockCatalog,
    effectiveSelectedBlockIndex,
    selectedBlock,
    suggestedBlockIndex,
    suggestedBlock,
    selectedBlockProgress,
    trackRoundStats,
    recordBlockRound,
  };
}
