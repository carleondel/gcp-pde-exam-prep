export const READINESS_MOCK_WINDOW = 3;

/**
 * Estimates how ready the player is for the exam, as a percentage set
 * against the pass mark.
 *
 * Two signals are blended half and half:
 * - Blocks: every target question scores the latest round of the most
 *   recently studied block that contains it, in any block size. A question
 *   never played in a block scores 0, so coverage weighs in.
 * - Mocks: the average of the last few mock exams.
 *
 * With no mock taken yet the estimate is the block score alone. The target
 * questions are the ones flagged recent, or the whole bank when none is.
 */
export function computeReadiness({ questions, blockTracks = {}, mockHistory = [], passPercent }) {
  const recent = questions.filter((question) => question.isRecent);
  const target = recent.length ? recent : questions;

  const latestByQuestion = new Map();
  for (const track of Object.values(blockTracks)) {
    for (const block of Object.values(track?.blocks || {})) {
      if (!block?.rounds?.length) continue;
      for (const questionId of block.questionIds || []) {
        const current = latestByQuestion.get(questionId);
        if (!current || (block.lastStudiedAt || 0) > (current.lastStudiedAt || 0)) {
          latestByQuestion.set(questionId, block);
        }
      }
    }
  }

  let covered = 0;
  let blockTotal = 0;
  for (const question of target) {
    const block = latestByQuestion.get(question.id);
    if (!block) continue;
    covered += 1;
    blockTotal += block.lastPercent || 0;
  }
  const blockPercent = target.length ? blockTotal / target.length : 0;

  const mocks = mockHistory.slice(0, READINESS_MOCK_WINDOW);
  const mockPercent = mocks.length
    ? mocks.reduce((sum, mock) => sum + (mock.percent || 0), 0) / mocks.length
    : null;

  const percent = Math.round(
    mockPercent === null ? blockPercent : (blockPercent + mockPercent) / 2,
  );

  return {
    percent,
    passPercent,
    passing: percent >= passPercent,
    blockPercent: Math.round(blockPercent),
    mockPercent: mockPercent === null ? null : Math.round(mockPercent),
    mockCount: mocks.length,
    covered,
    total: target.length,
    scope: recent.length ? "recent" : "all",
    hasData: covered > 0 || mocks.length > 0,
  };
}
