// @vitest-environment jsdom
import { StrictMode, useEffect } from "react";
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createStorage, EMPTY_PROGRESS } from "../engine/storage.js";
import { useProgress } from "./useProgress.js";

function installStorage() {
  const store = new Map();
  globalThis.window.localStorage.clear?.();
  const api = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  };
  Object.defineProperty(globalThis.window, "localStorage", { value: api, configurable: true });
  return store;
}

/**
 * Achievements are not the subject here, and letting the real snapshot run
 * would award some on any non-empty progress and muddy the assertions.
 */
const noAchievements = () => ({ unlocked: [], correct: 0, xp: 0 });

/**
 * Mounts the hook the way AppContent does: hydrate inside an effect, not on
 * first render. `autoHydrate: false` reproduces a caller that never
 * hydrates, which is how the overwrite-on-mount bug would show up.
 */
function mountProgress({ certId = "gcp-pca", autoHydrate = true, strict = false } = {}) {
  const storage = createStorage(certId);
  const seen = { current: null, api: null };

  function Probe() {
    const api = useProgress({
      emptyProgress: EMPTY_PROGRESS,
      loadProgress: storage.loadProgress,
      saveProgress: storage.saveProgress,
      getAchievementSnapshot: noAchievements,
    });
    seen.current = api.progress;
    seen.api = api;

    useEffect(() => {
      if (autoHydrate) api.hydrateProgress();
      // Mirrors AppContent: hydration happens once, from a restore effect.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

describe("useProgress", () => {
  beforeEach(() => {
    installStorage();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts from the empty progress before hydrating", () => {
    const { seen } = mountProgress({ autoHydrate: false });
    expect(seen.current).toEqual(EMPTY_PROGRESS);
  });

  it("loads what was stored", () => {
    createStorage("gcp-pca").saveProgress({ ...EMPTY_PROGRESS, xp: 1234 });
    const { seen } = mountProgress();
    expect(seen.current.xp).toBe(1234);
  });

  // The bug this hook is shaped to prevent: the save effect firing on the
  // first render, before anything was loaded, writing the empty initial
  // state over real stored progress.
  it("does not overwrite stored progress when a caller never hydrates", () => {
    const storage = createStorage("gcp-pca");
    storage.saveProgress({ ...EMPTY_PROGRESS, xp: 4242, achievements: ["first_blood"] });

    mountProgress({ autoHydrate: false });

    const stillThere = createStorage("gcp-pca").loadProgress();
    expect(stillThere.xp).toBe(4242);
    expect(stillThere.achievements).toEqual(["first_blood"]);
  });

  it("does not write anything at all before hydration", () => {
    const saveProgress = vi.fn();
    function Probe() {
      useProgress({
        emptyProgress: EMPTY_PROGRESS,
        loadProgress: () => EMPTY_PROGRESS,
        saveProgress,
        getAchievementSnapshot: noAchievements,
      });
      return null;
    }
    render(<Probe />);
    expect(saveProgress).not.toHaveBeenCalled();
  });

  it("persists an update and gives it back after remounting", () => {
    createStorage("gcp-pca").saveProgress({ ...EMPTY_PROGRESS, xp: 100 });

    const first = mountProgress();
    act(() => {
      first.seen.api.updateProgress((prev) => ({ ...prev, xp: prev.xp + 50 }));
    });
    expect(first.seen.current.xp).toBe(150);
    first.unmount();

    const second = mountProgress();
    expect(second.seen.current.xp).toBe(150);
  });

  it("survives StrictMode's double mount without losing progress", () => {
    createStorage("gcp-pca").saveProgress({ ...EMPTY_PROGRESS, xp: 777, bookmarks: [3, 9] });

    const { seen } = mountProgress({ strict: true });

    expect(seen.current.xp).toBe(777);
    expect(createStorage("gcp-pca").loadProgress().xp).toBe(777);
    expect(createStorage("gcp-pca").loadProgress().bookmarks).toEqual([3, 9]);
  });

  it("keeps each cert's progress separate", () => {
    createStorage("gcp-pde").saveProgress({ ...EMPTY_PROGRESS, xp: 10 });
    createStorage("gcp-pca").saveProgress({ ...EMPTY_PROGRESS, xp: 20 });

    const pde = mountProgress({ certId: "gcp-pde" });
    expect(pde.seen.current.xp).toBe(10);
    pde.unmount();

    const pca = mountProgress({ certId: "gcp-pca" });
    expect(pca.seen.current.xp).toBe(20);
  });

  it("fills in fields missing from an older save", () => {
    globalThis.window.localStorage.setItem(
      "gcp-pca.progress.v2",
      JSON.stringify({ xp: 60, achievements: ["first_blood"] }),
    );

    const { seen } = mountProgress();

    expect(seen.current.xp).toBe(60);
    expect(seen.current.stats).toMatchObject(EMPTY_PROGRESS.stats);
    expect(seen.current.inventory).toMatchObject(EMPTY_PROGRESS.inventory);
  });

  it("reads the latest state in a functional update, not a stale closure", () => {
    const { seen } = mountProgress();

    act(() => {
      seen.api.updateProgress((prev) => ({ ...prev, xp: prev.xp + 1 }));
      seen.api.updateProgress((prev) => ({ ...prev, xp: prev.xp + 1 }));
      seen.api.updateProgress((prev) => ({ ...prev, xp: prev.xp + 1 }));
    });

    // Three updates batched into one render. A stale closure would apply the
    // same base three times and land on 1.
    expect(seen.current.xp).toBe(3);
  });

  it("awards an achievement the update qualifies for", () => {
    const storage = createStorage("gcp-pca");
    const seen = { api: null, current: null };

    function Probe() {
      const api = useProgress({
        emptyProgress: EMPTY_PROGRESS,
        loadProgress: storage.loadProgress,
        saveProgress: storage.saveProgress,
        // Grants first_blood as soon as anything has been answered right.
        getAchievementSnapshot: (progress) => ({
          ...progress.stats,
          correct: progress.stats.totalCorrect,
          unlocked: progress.achievements,
        }),
      });
      seen.api = api;
      seen.current = api.progress;
      useEffect(() => {
        api.hydrateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    }

    render(<Probe />);
    act(() => {
      seen.api.updateProgress((prev) => ({
        ...prev,
        stats: { ...prev.stats, totalCorrect: 1 },
      }));
    });

    expect(seen.current.achievements).toContain("first_blood");
  });

  it("does not award the same achievement twice", () => {
    const storage = createStorage("gcp-pca");
    const seen = { api: null, current: null };

    function Probe() {
      const api = useProgress({
        emptyProgress: EMPTY_PROGRESS,
        loadProgress: storage.loadProgress,
        saveProgress: storage.saveProgress,
        getAchievementSnapshot: (progress) => ({
          ...progress.stats,
          correct: progress.stats.totalCorrect,
          unlocked: progress.achievements,
        }),
      });
      seen.api = api;
      seen.current = api.progress;
      useEffect(() => {
        api.hydrateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    }

    render(<Probe />);
    act(() => {
      seen.api.updateProgress((prev) => ({ ...prev, stats: { ...prev.stats, totalCorrect: 1 } }));
    });
    act(() => {
      seen.api.updateProgress((prev) => ({ ...prev, stats: { ...prev.stats, totalCorrect: 2 } }));
    });

    const firstBlood = seen.current.achievements.filter((id) => id === "first_blood");
    expect(firstBlood).toHaveLength(1);
  });

  it("clears progress and persists the reset", () => {
    createStorage("gcp-pca").saveProgress({
      ...EMPTY_PROGRESS,
      xp: 500,
      achievements: ["first_blood"],
    });
    const { seen } = mountProgress();

    act(() => {
      seen.api.resetProgress();
    });

    expect(seen.current).toEqual(EMPTY_PROGRESS);
    expect(createStorage("gcp-pca").loadProgress()).toEqual(EMPTY_PROGRESS);
  });

  it("keeps the raw setter private, so no update can skip achievements", () => {
    const { seen } = mountProgress();
    expect(seen.api.setProgress).toBeUndefined();
    expect(typeof seen.api.updateProgress).toBe("function");
    expect(typeof seen.api.resetProgress).toBe("function");
  });
});
