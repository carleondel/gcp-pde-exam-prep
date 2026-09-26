import { Composition } from "remotion";
import { LandingPromo } from "./LandingPromo.jsx";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme.js";

export const Root = () => (
  <Composition
    id="LandingPromo"
    component={LandingPromo}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
