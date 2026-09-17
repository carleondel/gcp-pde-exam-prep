import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Kicker, Title } from "../components/common.jsx";

/**
 * Two tight crops of the same real answer screen: the rationale written for
 * every option, and the discussion thread underneath. They slide as one
 * column, the way you would actually scroll them.
 */
export function Rationales() {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame, [30, 130], [0, -470], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene style={{ padding: 70 }}>
      <div style={{ display: "flex", gap: 64, alignItems: "center", width: 1740 }}>
        <div style={{ width: 690, flexShrink: 0 }}>
          <Rise>
            <Kicker color={C.accent300}>{COPY.rationales.kicker}</Kicker>
            <Title size={60} style={{ marginTop: 14 }}>
              {COPY.rationales.title}
            </Title>
            <div
              style={{
                fontFamily: F.body,
                fontSize: 27,
                color: C.textSecondary,
                marginTop: 20,
                lineHeight: 1.5,
              }}
            >
              {COPY.rationales.caption}
            </div>
          </Rise>
        </div>

        <Rise delay={10} style={{ flex: 1 }}>
          <div
            style={{
              ...panel,
              padding: 18,
              height: 700,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ transform: `translateY(${scroll}px)` }}>
              {COPY.rationales.shots.map((src) => (
                <Img
                  key={src}
                  src={staticFile(src)}
                  style={{ width: "100%", display: "block", borderRadius: 10 }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                height: 90,
                background: `linear-gradient(transparent, ${C.bgPrimary})`,
              }}
            />
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
