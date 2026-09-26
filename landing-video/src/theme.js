import { Easing } from "remotion";
import { loadFont as loadHeading } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Same palette and type as the landing (src/styles/tokens.css).
export const C = {
  bgDeep: "#0a0e17",
  bgPrimary: "#0f1520",
  bgSecondary: "#151d2e",
  bgTertiary: "#1a2438",
  line: "rgba(139, 149, 168, 0.14)",
  lineStrong: "rgba(139, 149, 168, 0.24)",
  primary: "#0fbfa3",
  primaryDeep: "#0d9e87",
  primarySoft: "rgba(15, 191, 163, 0.12)",
  primaryMedium: "rgba(15, 191, 163, 0.22)",
  accent: "#ffb733",
  accentSoft: "rgba(212, 147, 10, 0.14)",
  accentMedium: "rgba(212, 147, 10, 0.3)",
  correct: "#2dd4a0",
  wrong: "#f0605a",
  info: "#4a9eff",
  text: "#e8ecf2",
  textSecondary: "#8b95a8",
  textMuted: "#5a6478",
};

export const GRADIENT = `linear-gradient(135deg, ${C.primaryDeep}, ${C.info})`;

export const FONT = {
  heading: loadHeading("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily,
  body: loadBody("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily,
  mono: loadMono("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily,
};

export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION = 16;

// Beat grid of src/audio/music.mp3: 126.7 BPM, first downbeat at 0.104 s.
export const BEAT = (FPS * 60) / 126.7;
const FIRST_DOWNBEAT = 0.104 * FPS;
export const bar = (n) => Math.round(FIRST_DOWNBEAT + n * 4 * BEAT);

// Each cut lands on a bar: the midpoint of the transition into a scene sits
// exactly on the downbeat, and the film ends on bar 16.
const ORDER = ["logo", "headline", "question", "dashboard", "mobile", "numbers", "cta"];
const CUT_BARS = [1, 3, 6, 9, 11, 13];
const END_BAR = 16;

const starts = [0, ...CUT_BARS.map((b) => bar(b) - TRANSITION / 2)];
export const DURATION = bar(END_BAR);

// Scene lengths in frames. Consecutive scenes overlap by TRANSITION frames.
export const SCENES = Object.fromEntries(
  ORDER.map((name, i) => [
    name,
    (starts[i + 1] ?? DURATION) - starts[i] + (i < ORDER.length - 1 ? TRANSITION : 0),
  ]),
);

// Global frame where each scene begins, for scheduling sound effects.
export const SCENE_START = Object.fromEntries(ORDER.map((name, i) => [name, starts[i]]));
