import { interpolate, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Title, Kicker } from "../components/common.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

/** Keeps (top) against refuses (bottom), one item per line so each can land. */
export function Local() {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [44, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene style={safeScene}>
      <div style={{ width: CONTENT_W, textAlign: "center" }}>
        <Rise>
          <Kicker color={C.highlight} style={{ fontSize: 26 }}>
            LOCAL-FIRST
          </Kicker>
          <Title size={84} style={{ marginTop: 16 }}>
            {COPY.local.title}
          </Title>
        </Rise>

        <Rise delay={16}>
          <div
            style={{
              ...panel,
              marginTop: 56,
              padding: "30px 20px",
              fontFamily: F.mono,
              fontSize: 36,
              whiteSpace: "pre",
              color: C.primary400,
              border: "1px solid rgba(15,191,163,0.36)",
            }}
          >
            {COPY.local.yes.join("  ⇄  ")}
          </div>
        </Rise>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 36,
          }}
        >
          {COPY.local.no.map((n, i) => (
            <Rise key={n} delay={30 + i * 6}>
              <div
                style={{
                  position: "relative",
                  fontFamily: F.mono,
                  fontSize: 34,
                  color: C.textMuted,
                  border: `1px dashed ${C.line}`,
                  borderRadius: 14,
                  padding: "18px 34px",
                }}
              >
                {n}
                <div
                  style={{
                    position: "absolute",
                    left: "8%",
                    top: "50%",
                    height: 3,
                    width: `${84 * strike}%`,
                    background: C.wrong,
                  }}
                />
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={70}>
          <div
            style={{
              fontFamily: F.body,
              fontSize: 30,
              lineHeight: 1.45,
              color: C.textSecondary,
              marginTop: 40,
            }}
          >
            {COPY.local.sub}
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
