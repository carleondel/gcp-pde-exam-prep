import { interpolate, spring } from "remotion";
import { EASE } from "./theme.js";

// 0 -> 1 over `duration` frames starting at `start`, with an expo ease-out.
export const progress = (frame, start, duration, easing = EASE.out) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const pop = (frame, fps, delay = 0, config = {}) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 140, ...config } });

export const settle = (frame, fps, delay = 0, config = {}) =>
  spring({ frame: frame - delay, fps, config: { damping: 200, ...config } });

export const mix = (t, from, to) => from + (to - from) * t;

// Piecewise camera: keys are [frame, value] pairs, eased between each pair.
export const keyframes = (frame, keys, easing = EASE.inOut) =>
  interpolate(
    frame,
    keys.map(([f]) => f),
    keys.map(([, v]) => v),
    { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
