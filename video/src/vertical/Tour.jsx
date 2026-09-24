import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, COPY } from "../theme.js";
import { Scene, Rise, Kicker } from "../components/common.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

const VIEW_H = 860; // height of the window the capture sits in
const SLIDE = 18;

/**
 * A full desktop capture shrunk to a phone's width is unreadable, so each one
 * is drawn at close to native size and cropped to the app's centred content
 * column, which at this scale is about as wide as the video. The captures
 * are ~1917x990; at VIEW_H they are drawn slightly smaller than native, and
 * the push-in stops short of native, so nothing is upscaled.
 */
export function Tour() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const shots = COPY.tour.shots;
  const hold = Math.floor(durationInFrames / shots.length);
  const imgW = Math.round((VIEW_H * 1917) / 992);

  return (
    <Scene style={safeScene}>
      <div style={{ width: CONTENT_W }}>
        <Rise>
          <Kicker color={C.primary400} style={{ fontSize: 26 }}>
            {COPY.tour.kicker}
          </Kicker>
        </Rise>

        <div style={{ position: "relative", height: VIEW_H + 44 + 250, marginTop: 30 }}>
          {shots.map((shot, i) => {
            const start = i * hold;
            const local = frame - start;
            const inT = i === 0 ? 1 : interpolate(local, [0, SLIDE], [0, 1], clamp);
            const outT =
              i === shots.length - 1 ? 0 : interpolate(local, [hold - SLIDE, hold], [0, 1], clamp);
            const x = (1 - inT) * 200 - outT * 200;
            const push = interpolate(local, [0, hold], [1, 1.1], clamp);

            return (
              <div
                key={shot.src}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: inT * (1 - outT),
                  transform: `translateX(${x}px)`,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    border: `1px solid ${C.line}`,
                    boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
                    background: C.bgPrimary,
                  }}
                >
                  <div
                    style={{
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "0 18px",
                      background: C.bgTertiary,
                      borderBottom: `1px solid ${C.line}`,
                    }}
                  >
                    {["#f0605a", "#e6a817", "#2dd4a0"].map((dot) => (
                      <div
                        key={dot}
                        style={{ width: 12, height: 12, borderRadius: 999, background: dot }}
                      />
                    ))}
                  </div>
                  <div style={{ height: VIEW_H, overflow: "hidden" }}>
                    <Img
                      src={staticFile(shot.src)}
                      style={{
                        height: VIEW_H,
                        width: imgW,
                        display: "block",
                        transform: `translateX(${-(imgW - CONTENT_W) / 2}px) scale(${push})`,
                        transformOrigin: "50% 0",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 52,
                    lineHeight: 1.12,
                    color: C.textPrimary,
                    marginTop: 34,
                  }}
                >
                  {shot.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
}

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
