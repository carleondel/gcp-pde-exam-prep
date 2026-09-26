import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { Background } from "./components/Background.jsx";
import { push, zoomThrough } from "./components/transitions.jsx";
import { Cta } from "./scenes/Cta.jsx";
import { Dashboard } from "./scenes/Dashboard.jsx";
import { Headline } from "./scenes/Headline.jsx";
import { Logo } from "./scenes/Logo.jsx";
import { Mobile } from "./scenes/Mobile.jsx";
import { Numbers } from "./scenes/Numbers.jsx";
import { Question } from "./scenes/Question.jsx";
import { Soundtrack } from "./Soundtrack.jsx";
import { EASE, SCENES, TRANSITION } from "./theme.js";

const PLAN = [
  [Logo, SCENES.logo, zoomThrough],
  [Headline, SCENES.headline, push],
  [Question, SCENES.question, zoomThrough],
  [Dashboard, SCENES.dashboard, push],
  [Mobile, SCENES.mobile, zoomThrough],
  [Numbers, SCENES.numbers, push],
  [Cta, SCENES.cta, null],
];

const timing = linearTiming({ durationInFrames: TRANSITION, easing: EASE.inOut });

export const LandingPromo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fade = interpolate(frame, [0, 8, durationInFrames - 14, durationInFrames], [1, 0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <Background />
      <TransitionSeries>
        {PLAN.flatMap(([Scene, duration, transition], i) => [
          <TransitionSeries.Sequence key={`scene-${i}`} durationInFrames={duration}>
            <Scene />
          </TransitionSeries.Sequence>,
          transition && (
            <TransitionSeries.Transition
              key={`transition-${i}`}
              timing={timing}
              presentation={transition()}
            />
          ),
        ])}
      </TransitionSeries>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: fade, pointerEvents: "none" }} />
      <Soundtrack />
    </AbsoluteFill>
  );
};
