const CONFIDENCE_SCORE = {
  high: 3,
  medium: 2,
  low: 1,
};

export const BLOCK_SIZE_PRESETS = [15, 25, 30];
export const DEFAULT_BLOCK_SIZE = 25;
export const BLOCK_MASTERY_PERCENT = 80;

export function getQuestionOrderNumber(question) {
  return Number.isFinite(question.sourceQuestionNumber) ? question.sourceQuestionNumber : question.id;
}

function getConfidenceScore(question) {
  return CONFIDENCE_SCORE[question.confidence] || 0;
}

function compareCanonicalQuestions(left, right) {
  const leftHasSource = Number.isFinite(left.sourceQuestionNumber);
  const rightHasSource = Number.isFinite(right.sourceQuestionNumber);
  if (leftHasSource !== rightHasSource) return leftHasSource ? -1 : 1;

  const confidenceDiff = getConfidenceScore(right) - getConfidenceScore(left);
  if (confidenceDiff !== 0) return confidenceDiff;

  if (left.isRecent !== right.isRecent) return left.isRecent ? -1 : 1;
  return right.id - left.id;
}

function compareOrderedQuestions(left, right) {
  return getQuestionOrderNumber(right) - getQuestionOrderNumber(left) || compareCanonicalQuestions(left, right);
}

export function buildBlockSignature(questionIds) {
  return questionIds.join(":");
}

export function buildBlockCatalog(questions, blockSize = DEFAULT_BLOCK_SIZE) {
  const size = BLOCK_SIZE_PRESETS.includes(blockSize) ? blockSize : DEFAULT_BLOCK_SIZE;
  const dedupedByOrder = new Map();

  questions.forEach((question) => {
    const orderNumber = getQuestionOrderNumber(question);
    const current = dedupedByOrder.get(orderNumber);
    if (!current || compareCanonicalQuestions(question, current) < 0) {
      dedupedByOrder.set(orderNumber, question);
    }
  });

  const ordered = [...dedupedByOrder.values()].sort(compareOrderedQuestions);
  const trackId = `blocks-desc-${size}`;
  const blocks = [];

  for (let index = 0; index < ordered.length; index += size) {
    const slice = ordered.slice(index, index + size);
    const orderNumbers = slice.map(getQuestionOrderNumber);
    const questionIds = slice.map((question) => question.id);
    const label = `${orderNumbers[0]}→${orderNumbers[orderNumbers.length - 1]}`;
    blocks.push({
      id: `${trackId}:${blocks.length}`,
      trackId,
      blockIndex: blocks.length,
      size,
      label,
      questionIds,
      orderNumbers,
      blockSignature: buildBlockSignature(questionIds),
    });
  }

  return {
    trackId,
    size,
    questionCount: ordered.length,
    blocks,
  };
}

export function getBlockProgressRecord(progress, trackId, blockIndex) {
  return progress.blockStudy?.tracks?.[trackId]?.blocks?.[blockIndex] || null;
}

export function getBlockRoundNumber(blockProgress) {
  return (blockProgress?.rounds?.length || 0) + 1;
}

export function isBlockMastered(blockProgress) {
  const rounds = blockProgress?.rounds || [];
  if (rounds.length < 2) return false;
  const recent = rounds.slice(-2);
  return recent.every((round) => round.percent >= BLOCK_MASTERY_PERCENT);
}

export function hasBlockChanged(block, blockProgress) {
  return !!blockProgress?.blockSignature && blockProgress.blockSignature !== block.blockSignature;
}

export function getSuggestedBlockIndex(blocks, progress, activeBlockSession = null) {
  if (activeBlockSession?.meta?.blockStudy) {
    return activeBlockSession.meta.blockStudy.blockIndex;
  }

  const firstPending = blocks.find((block) => {
    const blockProgress = getBlockProgressRecord(progress, block.trackId, block.blockIndex);
    return !isBlockMastered(blockProgress);
  });

  return firstPending ? firstPending.blockIndex : 0;
}

export function buildBlockRoundSummary(session, finishedAt = Date.now()) {
  const correctCount = session.history.filter((entry) => entry.correct).length;
  const questionCount = session.questions.length;
  return {
    roundNumber: session.meta?.blockStudy?.roundNumber || 1,
    questionCount,
    answeredCount: session.answered,
    correctCount,
    percent: questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0,
    startedAt: session.startedAt,
    finishedAt,
    elapsedSec: Math.max(0, Math.floor((finishedAt - session.startedAt) / 1000)),
  };
}
