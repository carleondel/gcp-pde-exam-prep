import { interpolate, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Typewriter } from "../components/common.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

/** The close, stacked: the name first this time, since it is the last frame. */
export function Cta() {
  const frame = useCurrentFrame();
  const urlIn = interpolate(frame, [80, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene fadeOut={20} style={safeScene}>
      <div style={{ width: CONTENT_W, textAlign: "center" }}>
        <Rise>
          <div
            style={{
              fontFamily: F.heading,
              fontWeight: 700,
              fontSize: 120,
              letterSpacing: -2,
              color: C.textPrimary,
              textShadow: "0 0 60px rgba(15,191,163,0.45)",
            }}
          >
            {COPY.logo.name}
          </div>
        </Rise>

        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {COPY.cta.proof.map((p, i) => (
            <Rise key={p.l} delay={10 + i * 8} style={{ flex: 1 }}>
              <div style={{ ...panel, padding: "26px 12px" }}>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 60,
                    color: C.correct,
                  }}
                >
                  {p.n}
                </div>
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 22,
                    letterSpacing: 1,
                    color: C.textTertiary,
                    marginTop: 8,
                  }}
                >
                  {p.l}
                </div>
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={34}>
          <div
            style={{
              ...panel,
              marginTop: 36,
              padding: "36px 40px",
              textAlign: "left",
              fontFamily: F.mono,
              fontSize: 42,
            }}
          >
            {COPY.cta.cmds.map((cmd, i) => (
              <div key={cmd} style={{ marginTop: i === 0 ? 0 : 18, color: C.textPrimary }}>
                <span style={{ color: C.primary400 }}>➜ </span>
                <Typewriter text={cmd} delay={40 + i * 20} cps={30} cursor={i === 1} />
              </div>
            ))}
            <div style={{ marginTop: 24, color: C.highlight, fontSize: 33, opacity: urlIn }}>
              {COPY.cta.url}
            </div>
          </div>
        </Rise>

        <Rise delay={96}>
          <div
            style={{
              fontFamily: F.body,
              fontSize: 21,
              lineHeight: 1.45,
              color: C.textMuted,
              marginTop: 36,
            }}
          >
            {COPY.cta.disclaimer}
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
