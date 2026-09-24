import { Composition } from "remotion";
import { Promo, totalFrames } from "./Promo.jsx";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={totalFrames("full")}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ variant: "full" }}
      />
      {/* The short, frozen-background cut the README loops as a GIF. */}
      <Composition
        id="Teaser"
        component={Promo}
        durationInFrames={totalFrames("teaser")}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ variant: "teaser" }}
      />
      {/* 9:16 for social feeds. No progress bar: the platforms draw their own. */}
      <Composition
        id="Vertical"
        component={Promo}
        durationInFrames={totalFrames("vertical")}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ variant: "vertical" }}
      />
    </>
  );
}
