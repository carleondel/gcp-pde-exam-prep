import { interpolate, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Typewriter } from "../components/common.jsx";

/** The close: the evidence it works, then the two commands to run it. */
export function Cta() {
  const frame = useCurrentFrame();
  const urlIn = interpolate(frame, [86, 102], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene fadeOut={22}>
      <div style={{ width: 1500, textAlign: "center" }}>
        <div style={{ display: "flex", gap: 22, justifyContent: "center" }}>
          {COPY.cta.proof.map((p, i) => (
            <Rise key={p.l} delay={i * 9} style={{ flex: 1 }}>
              <div style={{ ...panel, padding: "28px 24px" }}>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 58,
                    color: C.correct,
                  }}
                >
                  {p.n}
                </div>
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 21,
                    letterSpacing: 2,
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
              marginTop: 40,
              padding: "38px 44px",
              textAlign: "left",
              fontFamily: F.mono,
              fontSize: 36,
            }}
          >
            {COPY.cta.cmds.map((cmd, i) => (
              <div key={cmd} style={{ marginTop: i === 0 ? 0 : 16, color: C.textPrimary }}>
                <span style={{ color: C.primary400 }}>➜ </span>
                <Typewriter text={cmd} delay={42 + i * 22} cps={30} cursor={i === 1} />
              </div>
            ))}
            <div
              style={{
                marginTop: 22,
                color: C.highlight,
                fontSize: 32,
                opacity: urlIn,
              }}
            >
              {COPY.cta.url}
            </div>
          </div>
        </Rise>

        <Rise delay={100}>
          <div
            style={{
              fontFamily: F.heading,
              fontWeight: 700,
              fontSize: 56,
              color: C.textPrimary,
              marginTop: 44,
            }}
          >
            {COPY.logo.name}
          </div>
          <div
            style={{
              fontFamily: F.body,
              fontSize: 20,
              color: C.textMuted,
              marginTop: 14,
            }}
          >
            {COPY.cta.disclaimer}
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
