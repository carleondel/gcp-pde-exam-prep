import { Composition } from "remotion";
import { LandingPromo } from "./LandingPromo.jsx";
import { Poster, POSTER_FRAME } from "./Poster.jsx";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme.js";

export const Root = () => (
  <>
    <Composition
      id="LandingPromo"
      component={LandingPromo}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="Poster"
      component={Poster}
      durationInFrames={POSTER_FRAME + 1}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
