import { Html5Audio, interpolate, Sequence } from "remotion";
import { progress } from "./anim.js";
import click from "./audio/click.mp3";
import confirm from "./audio/confirm.mp3";
import impact from "./audio/impact.wav";
import music from "./audio/music.mp3";
import pop from "./audio/pop.mp3";
import tick from "./audio/tick.mp3";
import whoosh from "./audio/whoosh.wav";
import { CUES as CTA } from "./scenes/Cta.jsx";
import { CUES as DASHBOARD } from "./scenes/Dashboard.jsx";
import { CUES as MOBILE } from "./scenes/Mobile.jsx";
import { COUNT_FRAMES, CUES as NUMBERS } from "./scenes/Numbers.jsx";
import { CUES as QUESTION } from "./scenes/Question.jsx";
import { DURATION, SCENE_START as S } from "./theme.js";

// Ticks follow the eased counter: fast at first, slowing as it settles.
const counterTicks = (start, steps = 14) =>
  Array.from({ length: COUNT_FRAMES }, (_, f) => start + f).filter(
    (f) =>
      Math.floor(progress(f, start, COUNT_FRAMES) * steps) >
      Math.floor(progress(f - 1, start, COUNT_FRAMES) * steps),
  );

// [global frame, sound, volume]
const CUES = [
  [3, impact, 0.8],
  ...[S.headline, S.question, S.dashboard, S.mobile, S.numbers, S.cta].map((f) => [
    f,
    whoosh,
    0.32,
  ]),
  [S.question + QUESTION.click, click, 0.7],
  [S.question + QUESTION.correct, confirm, 0.35],
  [S.question + QUESTION.why, pop, 0.4],
  [S.question + QUESTION.xp, confirm, 0.25],
  ...DASHBOARD.map((f) => [S.dashboard + f, tick, 0.35]),
  ...MOBILE.pulses.map((f) => [S.mobile + f, tick, 0.3]),
  [S.mobile + MOBILE.synced, confirm, 0.35],
  ...counterTicks(S.numbers + NUMBERS.stats[0]).map((f) => [f, tick, 0.18]),
  ...NUMBERS.cards.map((f) => [S.numbers + f, pop, 0.35]),
  [S.cta + CTA.chip, pop, 0.35],
  [S.cta + CTA.button, pop, 0.4],
  [S.cta + CTA.click, click, 0.8],
  [S.cta + CTA.click + 1, confirm, 0.4],
];

export const Soundtrack = () => (
  <>
    <Html5Audio
      src={music}
      volume={(f) =>
        interpolate(f, [0, 4, DURATION - 36, DURATION], [0, 0.6, 0.6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
    {CUES.map(([from, src, volume], i) => (
      <Sequence key={i} from={from} durationInFrames={60} layout="none">
        <Html5Audio src={src} volume={volume} />
      </Sequence>
    ))}
  </>
);
