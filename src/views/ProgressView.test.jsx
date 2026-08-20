// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ACHIEVEMENTS, REGULAR_ACHIEVEMENT_IDS } from "../data/gamification.js";
import { EMPTY_PROGRESS } from "../engine/storage.js";
import ProgressView from "./ProgressView.jsx";

const inventory = (overrides = {}) => ({ ...EMPTY_PROGRESS.inventory, ...overrides });

const render_ = (props = {}) =>
  render(<ProgressView inventory={inventory()} unlockedAchievements={new Set()} {...props} />);

afterEach(() => {
  cleanup();
});

describe("ProgressView", () => {
  describe("the inventory", () => {
    it("says so when there is nothing to carry", () => {
      render_();
      expect(screen.getByText("Sin items acumulados.")).toBeTruthy();
    });

    it("lists only the items actually held", () => {
      render_({ inventory: inventory({ hints: 2, shields: 1 }) });

      expect(screen.getByText(/💡 2/)).toBeTruthy();
      expect(screen.getByText(/🛡️ 1/)).toBeTruthy();
      expect(screen.queryByText(/✂️/)).toBeNull();
      expect(screen.queryByText("Sin items acumulados.")).toBeNull();
    });

    // mult defaults to 1 and multDur to 0, and neither is a power-up you
    // spend, so a fresh inventory must still read as empty.
    it("does not count the XP multiplier as an item", () => {
      render_({ inventory: inventory({ mult: 3, multDur: 2 }) });
      expect(screen.getByText("Sin items acumulados.")).toBeTruthy();
    });
  });

  describe("the achievements", () => {
    const PLATINUM = ACHIEVEMENTS.find((achievement) => achievement.platinum);
    const SECRET = ACHIEVEMENTS.find((achievement) => achievement.secret);

    /** Opens a badge's tooltip the way keyboard focus does, and reads it. */
    function tooltipOf(name) {
      fireEvent.focus(screen.getByLabelText(new RegExp(`^${name}:`)));
      return screen.getByRole("tooltip").textContent;
    }

    it("shows every achievement, locked or not", () => {
      const { container } = render_();
      expect(container.querySelectorAll("[aria-label]")).toHaveLength(ACHIEVEMENTS.length);
    });

    it("keeps the secret one secret while it is locked", () => {
      render_();
      expect(SECRET).toBeTruthy();
      expect(screen.getByLabelText(/^Logro oculto:/)).toBeTruthy();
      expect(screen.queryByLabelText(new RegExp(`^${SECRET.name}:`))).toBeNull();
    });

    it("names the secret one once it is unlocked", () => {
      render_({ unlockedAchievements: new Set([SECRET.id]) });
      expect(screen.getByLabelText(new RegExp(`^${SECRET.name}:`))).toBeTruthy();
      expect(screen.queryByLabelText(/^Logro oculto:/)).toBeNull();
    });

    it("counts the platinum's progress against the regular achievements", () => {
      const [first, second] = REGULAR_ACHIEVEMENT_IDS;
      render_({ unlockedAchievements: new Set([first, second]) });
      expect(tooltipOf(PLATINUM.name)).toContain(`2 / ${REGULAR_ACHIEVEMENT_IDS.length}`);
    });

    it("starts the platinum counter at zero", () => {
      render_();
      expect(tooltipOf(PLATINUM.name)).toContain(`0 / ${REGULAR_ACHIEVEMENT_IDS.length}`);
    });

    it("marks an unlocked achievement as earned", () => {
      const [first] = REGULAR_ACHIEVEMENT_IDS;
      const earned = ACHIEVEMENTS.find((achievement) => achievement.id === first);
      render_({ unlockedAchievements: new Set([first]) });
      expect(tooltipOf(earned.name)).toContain("Conseguido");
    });
  });
});
