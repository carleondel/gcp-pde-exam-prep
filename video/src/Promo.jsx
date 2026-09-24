import { AbsoluteFill, Sequence } from "remotion";
import { Backdrop, ProgressBar } from "./components/common.jsx";
import { Hook } from "./scenes/Hook.jsx";
import { Logo } from "./scenes/Logo.jsx";
import { Tour } from "./scenes/Tour.jsx";
import { Modes } from "./scenes/Modes.jsx";
import { Quiz } from "./scenes/Quiz.jsx";
import { Rationales } from "./scenes/Rationales.jsx";
import { Game } from "./scenes/Game.jsx";
import { Local } from "./scenes/Local.jsx";
import { Arch } from "./scenes/Arch.jsx";
import { Cta } from "./scenes/Cta.jsx";
import { Hook as VHook } from "./vertical/Hook.jsx";
import { Tour as VTour } from "./vertical/Tour.jsx";
import { Quiz as VQuiz } from "./vertical/Quiz.jsx";
import { Game as VGame } from "./vertical/Game.jsx";
import { Local as VLocal } from "./vertical/Local.jsx";
import { Cta as VCta } from "./vertical/Cta.jsx";

// The running order. Durations are in frames at 30fps.
export const SCENES = [
  { id: "hook", C: Hook, duration: 100 },
  { id: "logo", C: Logo, duration: 125 },
  { id: "tour", C: Tour, duration: 245 },
  { id: "modes", C: Modes, duration: 125 },
  { id: "quiz", C: Quiz, duration: 190 },
  { id: "rationales", C: Rationales, duration: 145 },
  { id: "game", C: Game, duration: 170 },
  { id: "local", C: Local, duration: 135 },
  { id: "arch", C: Arch, duration: 140 },
  { id: "cta", C: Cta, duration: 150 },
];

// The README loops a short cut of the same scenes rather than a second film,
// so the two can never drift apart. Durations are trimmed to what each scene
// needs to land its last beat.
export const TEASER = [
  { id: "tour", C: Tour, duration: 120 },
  { id: "quiz", C: Quiz, duration: 180 },
  { id: "game", C: Game, duration: 145 },
];

// The 9:16 cut for Reels, TikTok, Shorts and LinkedIn. Same copy, same
// question, relaid for a phone; kept under 30s so it plays through before
// people scroll on.
export const VERTICAL = [
  { id: "hook", C: VHook, duration: 80 },
  { id: "tour", C: VTour, duration: 200 },
  { id: "quiz", C: VQuiz, duration: 200 },
  { id: "game", C: VGame, duration: 145 },
  { id: "local", C: VLocal, duration: 110 },
  { id: "cta", C: VCta, duration: 150 },
];

// Compositions pass a variant name rather than the scene array itself:
// Remotion serialises defaultProps to JSON, and React components are not.
export const VARIANTS = {
  full: { scenes: SCENES, frozen: false, progress: true },
  teaser: { scenes: TEASER, frozen: true, progress: false },
  vertical: { scenes: VERTICAL, frozen: false, progress: false },
};

export const totalFrames = (variant) =>
  VARIANTS[variant].scenes.reduce((n, s) => n + s.duration, 0);

export function Promo({ variant = "full" }) {
  const { scenes, frozen, progress } = VARIANTS[variant];
  let at = 0;
  return (
    <AbsoluteFill>
      <Backdrop frozen={frozen} />
      {scenes.map((s) => {
        const from = at;
        at += s.duration;
        return (
          <Sequence key={s.id} from={from} durationInFrames={s.duration} name={s.id}>
            <s.C />
          </Sequence>
        );
      })}
      {progress ? <ProgressBar /> : null}
    </AbsoluteFill>
  );
}
