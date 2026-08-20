// @vitest-environment jsdom
import { StrictMode } from "react";
import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BLOCK_MASTERY_PERCENT, DEFAULT_BLOCK_SIZE } from "../engine/block-study.js";
import { createStorage, EMPTY_PROGRESS } from "../engine/storage.js";
import { buildTrackRoundStats, useBlockStudy } from "./useBlockStudy.js";

function installStorage() {
  const store = new Map();
  const api = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
  Object.defineProperty(globalThis.window, "localStorage", { value: api, configurable: true });
  return store;
}

const BANK = Array.from({ length: 75 }, (_, i) => ({
  id: i + 1,
  topic: "Compute",
  options: ["a", "b"],
  correct: 0,
  sourceQuestionNumber: i + 1,
}));

const round = (percent, roundNumber = 1) => ({
  roundNumber,
  percent,
  correctCount: percent,
  questionCount: 100,
  finishedAt: 1700000000000,
});

function mountBlocks({
  certId = "gcp-pca",
  progress = EMPTY_PROGRESS,
  session = null,
  ready = true,
  strict = false,
  allQuestions = BANK,
  updateProgress = () => {},
} = {}) {
  const storage = createStorage(certId);
  const seen = { api: null };

  function Probe() {
    seen.api = useBlockStudy({
      allQuestions,
      progress,
      updateProgress,
      session,
      loadBlockPrefs: storage.loadBlockPrefs,
      saveBlockPrefs: storage.saveBlockPrefs,
      saveActiveBlockSession: storage.saveActiveBlockSession,
      clearActiveBlockSession: storage.clearActiveBlockSession,
      ready,
    });
    return null;
  }

  const utils = render(
    strict ? (
      <StrictMode>
        <Probe />
      </StrictMode>
    ) : (
      <Probe />
    ),
  );
  return { ...utils, seen, storage };
}

describe("buildTrackRoundStats", () => {
  it("returns nothing for a track never studied", () => {
    expect(buildTrackRoundStats(EMPTY_PROGRESS, "blocks-desc-25")).toEqual([]);
  });

  it("adds up the blocks played in each round", () => {
    const progress = {
      blockStudy: {
        tracks: {
          t: {
            blocks: {
              0: { rounds: [round(80, 1), round(90, 2)] },
              1: { rounds: [round(60, 1)] },
            },
          },
        },
      },
    };

    const stats = buildTrackRoundStats(progress, "t");

    expect(stats).toHaveLength(2);
    expect(stats[0]).toMatchObject({ roundNumber: 1, blocks: 2, correct: 140, total: 200 });
    expect(stats[0].percent).toBe(70);
    expect(stats[1]).toMatchObject({ roundNumber: 2, blocks: 1 });
  });

  it("orders rounds ascending", () => {
    const progress = {
      blockStudy: { tracks: { t: { blocks: { 0: { rounds: [round(50, 3), round(60, 1)] } } } } },
    };
    expect(buildTrackRoundStats(progress, "t").map((s) => s.roundNumber)).toEqual([1, 3]);
  });
});

describe("useBlockStudy", () => {
  beforeEach(() => {
    installStorage();
  });

  describe("the catalogue", () => {
    it("cuts the bank at the default size when nothing is stored", () => {
      const { seen } = mountBlocks();
      expect(seen.api.blockCatalog.size).toBe(DEFAULT_BLOCK_SIZE);
      expect(seen.api.blockCatalog.blocks).toHaveLength(75 / DEFAULT_BLOCK_SIZE);
    });

    it("selects the first block by default", () => {
      const { seen } = mountBlocks();
      expect(seen.api.selectedBlock.blockIndex).toBe(0);
    });

    it("recuts the track when the size changes", () => {
      const { seen } = mountBlocks();
      act(() => seen.api.setBlockTrackSize(15));
      expect(seen.api.blockCatalog.size).toBe(15);
      expect(seen.api.blockCatalog.blocks).toHaveLength(5);
    });

    it("pulls the selection back in range when a bigger size shortens the track", () => {
      const { seen } = mountBlocks();
      act(() => seen.api.setSelectedBlockIndex(2));
      expect(seen.api.selectedBlock.blockIndex).toBe(2);

      act(() => seen.api.setBlockTrackSize(30));
      expect(seen.api.blockCatalog.blocks).toHaveLength(3);
      expect(seen.api.selectedBlockIndex ?? seen.api.selectedBlock.blockIndex).toBeLessThan(3);
    });
  });

  describe("what to study next", () => {
    it("suggests the first block on a fresh install", () => {
      const { seen } = mountBlocks();
      expect(seen.api.suggestedBlock.blockIndex).toBe(0);
    });

    it("skips a mastered block", () => {
      const trackId = `blocks-desc-${DEFAULT_BLOCK_SIZE}`;
      const progress = {
        ...EMPTY_PROGRESS,
        blockStudy: {
          tracks: {
            [trackId]: {
              blocks: {
                0: { rounds: [round(BLOCK_MASTERY_PERCENT), round(BLOCK_MASTERY_PERCENT)] },
              },
            },
          },
        },
      };
      const { seen } = mountBlocks({ progress });
      expect(seen.api.suggestedBlock.blockIndex).toBe(1);
    });

    it("prefers an interrupted block over the computed suggestion", () => {
      const trackId = `blocks-desc-${DEFAULT_BLOCK_SIZE}`;
      const { seen } = mountBlocks();
      act(() => {
        seen.api.setSavedBlockSession({ meta: { blockStudy: { trackId, blockIndex: 2 } } });
      });
      expect(seen.api.suggestedBlock.blockIndex).toBe(2);
    });
  });

  describe("preferences", () => {
    it("saves the size and selection and restores them after remounting", () => {
      const first = mountBlocks();
      act(() => {
        first.seen.api.setBlockTrackSize(15);
        first.seen.api.setSelectedBlockIndex(3);
      });
      first.unmount();

      const second = mountBlocks();
      expect(second.seen.api.blockTrackSize).toBe(15);
      expect(second.seen.api.selectedBlock.blockIndex).toBe(3);
    });

    it("falls back to the default for a size that is not a preset", () => {
      createStorage("gcp-pca").saveBlockPrefs({ trackSize: 7, blockIndex: 0 });
      const { seen } = mountBlocks();
      expect(seen.api.blockTrackSize).toBe(DEFAULT_BLOCK_SIZE);
    });

    it("writes nothing before the app has hydrated", () => {
      const saveBlockPrefs = vi.fn();
      function Probe() {
        useBlockStudy({
          allQuestions: BANK,
          progress: EMPTY_PROGRESS,
          updateProgress: () => {},
          session: null,
          loadBlockPrefs: () => ({ trackSize: 15, blockIndex: 1 }),
          saveBlockPrefs,
          saveActiveBlockSession: () => {},
          clearActiveBlockSession: () => {},
          ready: false,
        });
        return null;
      }
      render(<Probe />);
      expect(saveBlockPrefs).not.toHaveBeenCalled();
    });

    it("keeps each cert's block preferences apart", () => {
      createStorage("gcp-pde").saveBlockPrefs({ trackSize: 15, blockIndex: 0 });
      createStorage("gcp-pca").saveBlockPrefs({ trackSize: 30, blockIndex: 0 });

      const pde = mountBlocks({ certId: "gcp-pde" });
      expect(pde.seen.api.blockTrackSize).toBe(15);
      pde.unmount();

      const pca = mountBlocks({ certId: "gcp-pca" });
      expect(pca.seen.api.blockTrackSize).toBe(30);
    });

    it("survives StrictMode's double mount", () => {
      createStorage("gcp-pca").saveBlockPrefs({ trackSize: 15, blockIndex: 2 });
      const { seen } = mountBlocks({ strict: true });
      expect(seen.api.blockTrackSize).toBe(15);
      expect(seen.api.selectedBlock.blockIndex).toBe(2);
    });
  });

  describe("the interrupted block", () => {
    const runningBlock = (overrides = {}) => ({
      mode: "practice",
      status: "running",
      startedAt: Date.now() - 90_000,
      currentIndex: 2,
      answered: 2,
      questions: BANK.slice(0, 25),
      history: [],
      meta: { source: "blocks", blockStudy: { trackId: "t", blockIndex: 0, size: 25 } },
      ...overrides,
    });

    it("stores a block that is still running", () => {
      const { storage } = mountBlocks({ session: runningBlock() });
      expect(storage.loadActiveBlockSession()).not.toBeNull();
    });

    it("freezes the elapsed time so a block left overnight does not resume at eight hours", () => {
      const { storage } = mountBlocks({ session: runningBlock() });
      const stored = storage.loadActiveBlockSession();
      expect(stored.pausedElapsedSec).toBeGreaterThanOrEqual(89);
      expect(stored.pausedElapsedSec).toBeLessThan(120);
    });

    it("clears the record once the block is finished", () => {
      const { storage } = mountBlocks({ session: runningBlock({ status: "finished" }) });
      expect(storage.loadActiveBlockSession()).toBeNull();
    });

    it("ignores a session that is not a block", () => {
      const { storage } = mountBlocks({
        session: runningBlock({ meta: { source: "topics" } }),
      });
      expect(storage.loadActiveBlockSession()).toBeNull();
    });

    it("writes nothing before the app has hydrated", () => {
      const saveActiveBlockSession = vi.fn();
      function Probe() {
        useBlockStudy({
          allQuestions: BANK,
          progress: EMPTY_PROGRESS,
          updateProgress: () => {},
          session: runningBlock(),
          loadBlockPrefs: () => ({}),
          saveBlockPrefs: () => {},
          saveActiveBlockSession,
          clearActiveBlockSession: () => {},
          ready: false,
        });
        return null;
      }
      render(<Probe />);
      expect(saveActiveBlockSession).not.toHaveBeenCalled();
    });
  });

  describe("recordBlockRound", () => {
    const finished = {
      meta: {
        blockStudy: {
          trackId: "t",
          blockIndex: 1,
          label: "50→26",
          size: 25,
          questionIds: [1, 2],
          orderNumbers: [50, 26],
          blockSignature: "1:2",
        },
      },
    };

    it("does nothing for a session that is not a block", () => {
      const updateProgress = vi.fn();
      const { seen } = mountBlocks({ updateProgress });
      act(() => seen.api.recordBlockRound({ meta: {} }, round(80)));
      expect(updateProgress).not.toHaveBeenCalled();
    });

    it("appends the round and refreshes the summary", () => {
      let stored = EMPTY_PROGRESS;
      const updateProgress = (updater) => {
        stored = updater(stored);
      };
      const { seen } = mountBlocks({ updateProgress });

      act(() => seen.api.recordBlockRound(finished, round(72)));

      const record = stored.blockStudy.tracks.t.blocks[1];
      expect(record.rounds).toHaveLength(1);
      expect(record.lastPercent).toBe(72);
      expect(record.bestPercent).toBe(72);
      expect(record.blockSignature).toBe("1:2");
    });

    it("keeps the best percent when a later round is worse", () => {
      let stored = EMPTY_PROGRESS;
      const updateProgress = (updater) => {
        stored = updater(stored);
      };
      const { seen } = mountBlocks({ updateProgress });

      act(() => seen.api.recordBlockRound(finished, round(90)));
      act(() => seen.api.recordBlockRound(finished, round(40)));

      const record = stored.blockStudy.tracks.t.blocks[1];
      expect(record.rounds).toHaveLength(2);
      expect(record.lastPercent).toBe(40);
      expect(record.bestPercent).toBe(90);
    });
  });
});
