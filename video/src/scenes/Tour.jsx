import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, COPY } from "../theme.js";
import { Scene, Rise, Kicker, BrowserFrame } from "../components/common.jsx";

const HOLD = 122; // frames each screenshot gets before it slides away
const SLIDE = 20; // length of the handover

/**
 * The product itself: two real captures in a browser window, each pushing in
 * slowly and then sliding aside for the next. A dissolve was the first
 * attempt and it read as mud — two screenshots at half opacity in the same
 * place is just noise, so they move instead.
 *
 * The push tops out at 1.06: the shots under public/shots/ are 1917px wide
 * and the frame is 1320px, so even at its largest the capture is still being
 * downscaled rather than stretched.
 */
export function Tour() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // The teaser cut gives this scene about half the room, which is not enough
  // for two shots and a handover. Below that, it shows the first one only.
  const shots = durationInFrames < 200 ? COPY.tour.shots.slice(0, 1) : COPY.tour.shots;

  const handover = interpolate(frame, [HOLD - SLIDE, HOLD], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene style={{ padding: 60 }}>
      <Rise style={{ position: "absolute", top: 58, left: 92 }}>
        <Kicker color={C.primary400}>{COPY.tour.kicker}</Kicker>
      </Rise>

      {shots.map((shot, i) => {
        const outgoing = i === 0 && shots.length > 1;
        const opacity = shots.length === 1 ? 1 : outgoing ? 1 - handover : handover;
        const x = shots.length === 1 ? 0 : outgoing ? -handover * 260 : (1 - handover) * 260;
        const scale = interpolate(frame - i * HOLD, [0, HOLD + SLIDE], [1, 1.06], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={shot.src}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
              transform: `translateX(${x}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <div style={{ transform: `scale(${scale})` }}>
              <BrowserFrame src={shot.src} width={1300} />
            </div>
            <div style={{ textAlign: "center", maxWidth: 1150 }}>
              <div
                style={{
                  fontFamily: F.heading,
                  fontWeight: 700,
                  fontSize: 42,
                  color: C.textPrimary,
                }}
              >
                {shot.title}
              </div>
              <div
                style={{
                  fontFamily: F.body,
                  fontSize: 25,
                  color: C.textSecondary,
                  marginTop: 10,
                }}
              >
                {shot.caption}
              </div>
            </div>
          </div>
        );
      })}
    </Scene>
  );
}
