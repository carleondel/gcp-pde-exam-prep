// @vitest-environment jsdom
import { StrictMode } from "react";
import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createStorage } from "../engine/storage.js";
import { DEFAULT_PRACTICE_LIMIT } from "../ui/practice-prefs.js";
import { usePracticeConfig } from "./usePracticeConfig.js";

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

const TOPICS = ["Compute", "Storage", "Security"];

const BANK = TOPICS.flatMap((topic, t) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: t * 10 + i + 1,
    topic,
    options: ["a", "b"],
    correct: 0,
  })),
);

/**
 * Mounts the hook the way AppContent does. Pools default to empty, which is
 * the state of a fresh install — nothing answered, nothing bookmarked.
 */
function mountConfig({
  certId = "gcp-pca",
  ready = true,
  strict = false,
  topics = TOPICS,
  allQuestions = BANK,
  recentQuestions = [],
  wrongQuestions = [],
  bookmarkedQuestions = [],
  weakQuestions = [],
} = {}) {
  const storage = createStorage(certId);
  const seen = { api: null };

  function Probe() {
    seen.api = usePracticeConfig({
      allQuestions,
      topics,
      recentQuestions,
      wrongQuestions,
      bookmarkedQuestions,
      weakQuestions,
      loadPracticePrefs: storage.loadPracticePrefs,
      savePracticePrefs: storage.savePracticePrefs,
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

describe("usePracticeConfig", () => {
  beforeEach(() => {
    installStorage();
  });

  describe("with nothing stored", () => {
    it("selects every topic", () => {
      const { seen } = mountConfig();
      expect([...seen.api.selectedTopics].sort()).toEqual([...TOPICS].sort());
    });

    it("uses the documented defaults", () => {
      const { seen } = mountConfig();
      expect(seen.api.practiceOrder).toBe("random");
      expect(seen.api.practiceSource).toBe("topics");
      expect(seen.api.practiceLimit).toBe(DEFAULT_PRACTICE_LIMIT);
    });

    it("keeps the custom-count input closed, since the default is a preset", () => {
      const { seen } = mountConfig();
      expect(seen.api.showCustomLimit).toBe(false);
    });
  });

  describe("restoring stored preferences", () => {
    it("reads back what was saved", () => {
      createStorage("gcp-pca").savePracticePrefs({
        source: "topics",
        order: "sequential",
        topics: ["Compute"],
        limit: 10,
      });

      const { seen } = mountConfig();

      expect(seen.api.practiceOrder).toBe("sequential");
      expect([...seen.api.selectedTopics]).toEqual(["Compute"]);
      expect(seen.api.practiceLimit).toBe(10);
    });

    it("keeps the topics as a Set, not an array", () => {
      createStorage("gcp-pca").savePracticePrefs({ topics: ["Compute", "Storage"] });
      const { seen } = mountConfig();
      expect(seen.api.selectedTopics).toBeInstanceOf(Set);
      expect(seen.api.selectedTopics.has("Compute")).toBe(true);
    });

    it("opens the custom-count input when the stored count is not a preset", () => {
      createStorage("gcp-pca").savePracticePrefs({ limit: 17 });
      const { seen } = mountConfig();
      expect(seen.api.practiceLimit).toBe(17);
      expect(seen.api.showCustomLimit).toBe(true);
    });
  });

  describe("preferences that no longer make sense", () => {
    it("drops topics the bank no longer has", () => {
      createStorage("gcp-pca").savePracticePrefs({ topics: ["Compute", "Retired"] });
      const { seen } = mountConfig();
      expect([...seen.api.selectedTopics]).toEqual(["Compute"]);
    });

    it("selects everything when none of the stored topics survive", () => {
      createStorage("gcp-pca").savePracticePrefs({ topics: ["Retired", "Gone"] });
      const { seen } = mountConfig();
      expect([...seen.api.selectedTopics].sort()).toEqual([...TOPICS].sort());
    });

    it("falls back to defaults for values that are not valid options", () => {
      createStorage("gcp-pca").savePracticePrefs({
        source: "constructor",
        order: "alphabetical",
        limit: -3,
      });

      const { seen } = mountConfig();

      expect(seen.api.practiceSource).toBe("topics");
      expect(seen.api.practiceOrder).toBe("random");
      expect(seen.api.practiceLimit).toBe(DEFAULT_PRACTICE_LIMIT);
    });

    it("returns to topics when the stored source has run dry", () => {
      createStorage("gcp-pca").savePracticePrefs({ source: "wrong", limit: 10 });
      const { seen } = mountConfig({ wrongQuestions: [] });
      expect(seen.api.practiceSource).toBe("topics");
      expect(seen.api.practiceMessage).toContain("Volvimos a Temas");
    });

    it("keeps a stored source that still has questions", () => {
      createStorage("gcp-pca").savePracticePrefs({ source: "wrong", limit: 5 });
      const { seen } = mountConfig({ wrongQuestions: BANK.slice(0, 8) });
      expect(seen.api.practiceSource).toBe("wrong");
    });

    it("clamps a count larger than the pool and says so", () => {
      createStorage("gcp-pca").savePracticePrefs({ source: "wrong", limit: 50 });
      const { seen } = mountConfig({ wrongQuestions: BANK.slice(0, 4) });
      expect(seen.api.practiceLimit).toBe(4);
      expect(seen.api.practiceMessage).toContain("4");
    });
  });

  describe("the pool the settings select", () => {
    it("counts the questions of the selected topics", () => {
      createStorage("gcp-pca").savePracticePrefs({ topics: ["Compute"] });
      const { seen } = mountConfig();
      expect(seen.api.topicQuestions).toHaveLength(10);
      expect(seen.api.practiceSourceCounts.topics).toBe(10);
    });

    it("counts each source separately", () => {
      const { seen } = mountConfig({
        wrongQuestions: BANK.slice(0, 3),
        bookmarkedQuestions: BANK.slice(0, 2),
        recentQuestions: BANK.slice(0, 7),
      });
      expect(seen.api.practiceSourceCounts).toMatchObject({
        wrong: 3,
        bookmarks: 2,
        recent: 7,
        weak: 0,
      });
    });

    it("never offers to launch more questions than exist", () => {
      createStorage("gcp-pca").savePracticePrefs({ topics: ["Compute"], limit: 10 });
      const { seen } = mountConfig();
      expect(seen.api.effectivePracticeLimit).toBeLessThanOrEqual(seen.api.maxPracticeCount);
    });

    it("reports a limit of zero when the pool is empty", () => {
      const { seen } = mountConfig({ allQuestions: [], topics: [] });
      expect(seen.api.maxPracticeCount).toBe(0);
      expect(seen.api.effectivePracticeLimit).toBe(0);
    });
  });

  describe("persistence", () => {
    it("saves a change and restores it after remounting", () => {
      const first = mountConfig();
      act(() => {
        first.seen.api.setPracticeOrder("sequential");
        first.seen.api.setSelectedTopics(new Set(["Storage"]));
      });
      first.unmount();

      const second = mountConfig();
      expect(second.seen.api.practiceOrder).toBe("sequential");
      expect([...second.seen.api.selectedTopics]).toEqual(["Storage"]);
    });

    // Asserted against a spy rather than against the stored value: the
    // settings are read in useState initialisers, so an early write would
    // put back something close to what was already there and a value check
    // would pass while the guard was gone. What matters is that no write
    // happens at all before the app has settled — otherwise sanitised
    // topics get flushed over the stored ones before reconciliation runs.
    it("writes nothing before the app has hydrated", () => {
      const savePracticePrefs = vi.fn();
      function Probe() {
        usePracticeConfig({
          allQuestions: BANK,
          topics: TOPICS,
          recentQuestions: [],
          wrongQuestions: [],
          bookmarkedQuestions: [],
          weakQuestions: [],
          loadPracticePrefs: () => ({ order: "sequential", topics: ["Storage"] }),
          savePracticePrefs,
          ready: false,
        });
        return null;
      }
      render(<Probe />);
      expect(savePracticePrefs).not.toHaveBeenCalled();
    });

    it("starts writing once the app is ready", () => {
      const savePracticePrefs = vi.fn();
      function Probe() {
        usePracticeConfig({
          allQuestions: BANK,
          topics: TOPICS,
          recentQuestions: [],
          wrongQuestions: [],
          bookmarkedQuestions: [],
          weakQuestions: [],
          loadPracticePrefs: () => ({ order: "sequential", topics: ["Storage"] }),
          savePracticePrefs,
          ready: true,
        });
        return null;
      }
      render(<Probe />);
      expect(savePracticePrefs).toHaveBeenCalled();
    });

    it("keeps each cert's preferences apart", () => {
      createStorage("gcp-pde").savePracticePrefs({ order: "sequential" });
      createStorage("gcp-pca").savePracticePrefs({ order: "recent-desc" });

      const pde = mountConfig({ certId: "gcp-pde" });
      expect(pde.seen.api.practiceOrder).toBe("sequential");
      pde.unmount();

      const pca = mountConfig({ certId: "gcp-pca" });
      expect(pca.seen.api.practiceOrder).toBe("recent-desc");
    });

    it("survives StrictMode's double mount", () => {
      createStorage("gcp-pca").savePracticePrefs({ order: "sequential", topics: ["Compute"] });
      const { seen } = mountConfig({ strict: true });
      expect(seen.api.practiceOrder).toBe("sequential");
      expect([...seen.api.selectedTopics]).toEqual(["Compute"]);
    });
  });
});
