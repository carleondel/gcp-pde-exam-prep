import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, F, COPY } from "../theme.js";
import { Scene, Rise } from "../components/common.jsx";

/**
 * The wordmark under the same Google Cloud lockup the app's header carries,
 * so the video opens on exactly what you see when you load the page.
 */
export function Logo() {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [8, 32], [0, 1], { extrapolateRight: "clamp" });
  const spread = interpolate(frame, [8, 38], [26, 0], { extrapolateRight: "clamp" });

  return (
    <Scene>
      <div style={{ textAlign: "center" }}>
        <Rise y={18}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
              padding: "16px 34px",
              borderRadius: 999,
              background: "rgba(21,29,46,0.9)",
              border: `1px solid ${C.line}`,
              marginBottom: 40,
            }}
          >
            <Img src={staticFile("google-cloud.svg")} style={{ height: 30 }} />
            <div style={{ width: 1, height: 26, background: C.line }} />
            <div
              style={{
                fontFamily: F.mono,
                fontWeight: 700,
                fontSize: 21,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: C.textPrimary,
              }}
            >
              {COPY.logo.lockup}
            </div>
          </div>
        </Rise>

        <div
          style={{
            fontFamily: F.heading,
            fontWeight: 700,
            fontSize: 162,
            letterSpacing: `${spread - 3}px`,
            color: C.textPrimary,
            textShadow: `0 0 ${70 * glow}px rgba(15,191,163,${0.55 * glow})`,
            opacity: glow,
            lineHeight: 1,
          }}
        >
          {COPY.logo.name}
        </div>

        <Rise delay={34}>
          <div style={{ fontFamily: F.body, fontSize: 33, color: C.textSecondary, marginTop: 18 }}>
            {COPY.logo.tag}
          </div>
        </Rise>

        <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 42 }}>
          {COPY.logo.badges.map((b, i) => (
            <Rise key={b} delay={48 + i * 9}>
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 25,
                  color: C.primary400,
                  border: "1px solid rgba(15,191,163,0.38)",
                  background: "rgba(15,191,163,0.09)",
                  borderRadius: 999,
                  padding: "13px 30px",
                }}
              >
                {b}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Scene>
  );
}
