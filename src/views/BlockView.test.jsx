// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BLOCK_MASTERY_PERCENT } from "../engine/block-study.js";
import BlockView from "./BlockView.jsx";

/**
 * Component tests for the study-block tab.
 *
 * The flow through it — picking a size, starting a block, coming back to an
 * interrupted one — is covered end to end by the integration suite. What is
 * here is what the tab says about a block's state, which has more branches
 * than a walk through the app reaches.
 */

const block = (index) => ({
  id: `b${index}`,
  trackId: "blocks-desc-25",
  blockIndex: index,
  label: `${60 - index * 25}→${36 - index * 25}`,
  size: 25,
  questionIds: Array.from({ length: 25 }, (_, i) => index * 25 + i + 1),
  orderNumbers: [],
  blockSignature: `sig-${index}`,
});

const BLOCKS = [block(0), block(1), block(2)];

const round = (percent, roundNumber) => ({
  roundNumber,
  percent,
  correctCount: Math.round((percent / 100) * 25),
  questionCount: 25,
  elapsedSec: 300,
  finishedAt: 1700000000000,
});

const record = (rounds, overrides = {}) => ({
  blockIndex: 0,
  blockSignature: "sig-0",
  rounds,
  lastPercent: rounds.length ? rounds[rounds.length - 1].percent : 0,
  bestPercent: rounds.length ? Math.max(...rounds.map((r) => r.percent)) : 0,
  ...overrides,
});

const render_ = (props = {}) =>
  render(
    <BlockView
      blocks={BLOCKS}
      trackSize={25}
      selectedBlock={BLOCKS[0]}
      selectedBlockProgress={null}
      roundStats={[]}
      suggestedBlock={BLOCKS[0]}
      savedBlockIndex={null}
      activeBlockIndex={null}
      message=""
      getBlockRecord={() => null}
      onContinueSaved={() => {}}
      onStart={() => {}}
      onSelectSize={() => {}}
      onSelectIndex={() => {}}
      onPickBlock={() => {}}
      {...props}
    />,
  );

afterEach(() => {
  cleanup();
});

describe("BlockView", () => {
  describe("what it says about the selected block", () => {
    // Every status appears twice over: once as the badge on the detail panel
    // and once on the block's own tile in the grid. The counts below are
    // "detail + tiles", which is why an untouched track of three reads four.
    it("calls an untouched block not started", () => {
      render_();
      expect(screen.getAllByText("Not started")).toHaveLength(4);
      expect(screen.getByText("Empezar bloque")).toBeTruthy();
    });

    it("marks it as suggested when it is the one to study next", () => {
      render_({ selectedBlock: BLOCKS[1], suggestedBlock: BLOCKS[1] });
      expect(screen.getByText("Bloque sugerido")).toBeTruthy();
    });

    it("says selected when it is not the suggestion", () => {
      render_({ selectedBlock: BLOCKS[1], suggestedBlock: BLOCKS[0] });
      expect(screen.getByText("Bloque seleccionado")).toBeTruthy();
    });

    it("counts the rounds played and offers the next one", () => {
      render_({ selectedBlockProgress: record([round(60, 1), round(72, 2)]) });
      expect(screen.getByText("Reviewed 2x")).toBeTruthy();
      expect(screen.getByText("Repetir vuelta 3")).toBeTruthy();
    });

    it("calls a block mastered once it is consistently high", () => {
      render_({
        selectedBlockProgress: record([
          round(BLOCK_MASTERY_PERCENT, 1),
          round(BLOCK_MASTERY_PERCENT, 2),
        ]),
      });
      expect(screen.getByText(`Mastered (${BLOCK_MASTERY_PERCENT}%+)`)).toBeTruthy();
    });

    it("flags a block whose questions changed underneath it", () => {
      render_({ selectedBlockProgress: record([round(80, 1)], { blockSignature: "stale" }) });
      expect(screen.getByText("Updated")).toBeTruthy();
    });

    it("shows the last and best percentages apart", () => {
      render_({
        selectedBlockProgress: record([round(90, 1), round(40, 2)]),
        getBlockRecord: () => null,
      });
      // 40 is the latest round, 90 the best one so far. Each also appears
      // again in the per-round history below the panel.
      expect(screen.getAllByText("40%")).toHaveLength(2);
      expect(screen.getAllByText("90%")).toHaveLength(2);
    });
  });

  describe("an interrupted block", () => {
    it("offers to continue the one in flight instead of restarting it", () => {
      const onContinueSaved = vi.fn();
      render_({ activeBlockIndex: 0, savedBlockIndex: 0, onContinueSaved });

      // Badge on the detail panel and label on its tile.
      expect(screen.getAllByText("In progress")).toHaveLength(2);
      expect(screen.queryByText("Empezar bloque")).toBeNull();
      fireEvent.click(screen.getByText("Continuar"));
      expect(onContinueSaved).toHaveBeenCalledTimes(1);
    });

    // The header shortcut follows the saved attempt; "In progress" follows the
    // track on screen. Changing the size leaves the first and drops the second.
    it("keeps the header shortcut when the attempt belongs to another track", () => {
      render_({ activeBlockIndex: null, savedBlockIndex: 2 });

      expect(screen.getByText("Continuar B3")).toBeTruthy();
      expect(screen.queryByText("In progress")).toBeNull();
      expect(screen.getByText("Empezar bloque")).toBeTruthy();
    });

    it("offers no shortcut when nothing was left unfinished", () => {
      render_();
      expect(screen.queryByText(/^Continuar B/)).toBeNull();
    });
  });

  describe("moving around the track", () => {
    it("hides the next-block button on the last block", () => {
      render_({ selectedBlock: BLOCKS[2] });
      expect(screen.queryByText("Siguiente bloque")).toBeNull();
    });

    it("steps to the next block without clearing the message", () => {
      const onSelectIndex = vi.fn();
      render_({ onSelectIndex, message: "Track de 25 preguntas cargado." });
      fireEvent.click(screen.getByText("Siguiente bloque"));
      expect(onSelectIndex).toHaveBeenCalledWith(1);
      expect(screen.getByText("Track de 25 preguntas cargado.")).toBeTruthy();
    });

    it("picks a block from the grid", () => {
      const onPickBlock = vi.fn();
      render_({ onPickBlock });
      fireEvent.click(screen.getByText(/^Bloque 2/));
      expect(onPickBlock).toHaveBeenCalledWith(BLOCKS[1]);
    });

    it("asks for a different track size", () => {
      const onSelectSize = vi.fn();
      render_({ onSelectSize });
      fireEvent.click(screen.getByText("15 preguntas"));
      expect(onSelectSize).toHaveBeenCalledWith(15);
    });
  });

  describe("the grid", () => {
    it("labels each block from what the caller reports for it", () => {
      render_({
        getBlockRecord: (b) =>
          b.blockIndex === 1 ? record([round(88, 1)], { blockSignature: "sig-1" }) : null,
      });

      // Block 1's tile picks up the record; the other two tiles and the
      // detail panel for block 0 stay untouched.
      expect(screen.getAllByText("Not started")).toHaveLength(3);
      expect(screen.getByText("Reviewed 1x")).toBeTruthy();
    });

    it("marks the block in flight as in progress", () => {
      render_({ activeBlockIndex: 1, savedBlockIndex: 1 });
      // Once on the grid tile; the selected block is 0, so the detail panel
      // still reads "Not started".
      expect(screen.getAllByText("In progress")).toHaveLength(1);
    });
  });
});
