/**
 * Presentation helpers shared across the app's screens.
 *
 * Pure functions only: no React, no cert data, no storage. Extracted from
 * App.jsx so they can be tested directly, and so the screens that use them
 * can be split apart later without dragging the formatting along.
 */

export function sameSet(left, right) {
  if (left.size !== right.size) return false;
  for (const value of left) {
    if (!right.has(value)) return false;
  }
  return true;
}

export function formatPracticeBadge(count, singular, plural = singular) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatDuration(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function clampPercent(percent) {
  const numeric = Number(percent);
  if (!Number.isFinite(numeric)) return null;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

export function getPercentTone(percent) {
  const value = clampPercent(percent);
  if (value === null) {
    return {
      value: null,
      text: "var(--text-tertiary)",
      border: "var(--surface-line)",
      gradient: "linear-gradient(180deg, rgba(26, 36, 56, 0.9), rgba(15, 21, 32, 0.82))",
      gradientStrong: "linear-gradient(180deg, rgba(26, 36, 56, 0.98), rgba(15, 21, 32, 0.9))",
      shadow: "none",
    };
  }

  if (value >= 90) {
    return {
      value,
      text: "var(--highlight)",
      border: "rgba(143, 255, 106, 0.28)",
      gradient: "linear-gradient(180deg, rgba(143, 255, 106, 0.12), rgba(15, 21, 32, 0.84))",
      gradientStrong: "linear-gradient(180deg, rgba(143, 255, 106, 0.18), rgba(15, 21, 32, 0.9))",
      shadow: "0 12px 28px rgba(143, 255, 106, 0.14)",
    };
  }

  if (value >= 70) {
    return {
      value,
      text: "var(--signal-correct)",
      border: "rgba(45, 212, 160, 0.28)",
      gradient: "linear-gradient(180deg, var(--correct-soft), rgba(15, 21, 32, 0.84))",
      gradientStrong: "linear-gradient(180deg, rgba(45, 212, 160, 0.2), rgba(15, 21, 32, 0.9))",
      shadow: "0 12px 28px rgba(45, 212, 160, 0.14)",
    };
  }

  if (value >= 50) {
    return {
      value,
      text: "var(--signal-warning)",
      border: "rgba(230, 168, 23, 0.28)",
      gradient: "linear-gradient(180deg, var(--warning-soft), rgba(15, 21, 32, 0.84))",
      gradientStrong: "linear-gradient(180deg, rgba(230, 168, 23, 0.2), rgba(15, 21, 32, 0.9))",
      shadow: "0 12px 28px rgba(230, 168, 23, 0.14)",
    };
  }

  return {
    value,
    text: "var(--signal-wrong)",
    border: "rgba(240, 96, 90, 0.28)",
    gradient: "linear-gradient(180deg, var(--wrong-soft), rgba(15, 21, 32, 0.84))",
    gradientStrong: "linear-gradient(180deg, rgba(240, 96, 90, 0.2), rgba(15, 21, 32, 0.9))",
    shadow: "0 12px 28px rgba(240, 96, 90, 0.14)",
  };
}
