import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, CountUp, Title, Kicker } from "../components/common.jsx";

export const LEVEL_UP = 52; // frame the XP bar tops out and the rank flips

/** Confetti burst reused from the app's reward moments, in miniature. */
export function Sparks() {
  const frame = useCurrentFrame();
  const t = frame - LEVEL_UP;
  if (t < 0 || t > 55) return null;
  return (
    <>
      {new Array(34).fill(0).map((_, i) => {
        const a = random(`a${i}`) * Math.PI * 2;
        const v = 120 + random(`v${i}`) * 300;
        const p = t / 55;
        const color = [C.accent300, C.primary400, C.highlight, C.correct][i % 4];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: 9,
              height: 9,
              borderRadius: 2,
              background: color,
              opacity: 1 - p,
              transform: `translate(${Math.cos(a) * v * p}px, ${Math.sin(a) * v * p + 260 * p * p}px) rotate(${t * 12}deg)`,
            }}
          />
        );
      })}
    </>
  );
}

export function Game() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fill = interpolate(frame, [12, LEVEL_UP], [0.42, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flip = spring({
    frame: frame - LEVEL_UP,
    fps,
    config: { damping: 14, mass: 0.7 },
    durationInFrames: 30,
  });
  const leveled = frame >= LEVEL_UP;

  return (
    <Scene>
      <div style={{ width: 1620 }}>
        <Rise>
          <Kicker color={C.accent300}>PROGRESSION</Kicker>
          <Title size={70} style={{ marginTop: 14 }}>
            {COPY.game.title}
          </Title>
        </Rise>

        <Rise delay={10}>
          <div style={{ ...panel, padding: 34, marginTop: 40, position: "relative" }}>
            <div
              style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
            >
              <div
                style={{
                  fontFamily: F.heading,
                  fontWeight: 700,
                  fontSize: 46,
                  color: leveled ? C.accent300 : C.textPrimary,
                  transform: `scale(${1 + 0.12 * flip * (leveled ? 1 : 0)})`,
                  transformOrigin: "left center",
                }}
              >
                {leveled ? `⚡ ${COPY.game.rankTo}` : `🔧 ${COPY.game.rankFrom}`}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 28, color: C.textTertiary }}>
                <CountUp to={1000} delay={12} duration={LEVEL_UP - 12} /> XP
              </div>
            </div>
            <div
              style={{
                height: 16,
                borderRadius: 999,
                background: "rgba(143,165,200,0.10)",
                marginTop: 22,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${fill * 100}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${C.primary500}, ${leveled ? C.accent300 : C.highlight})`,
                  boxShadow: `0 0 26px ${leveled ? C.accent300 : C.primary400}`,
                }}
              />
            </div>
            <Sparks />
          </div>
        </Rise>

        <div style={{ display: "flex", gap: 22, marginTop: 30 }}>
          {COPY.game.stats.map((s, i) => (
            <Rise key={s.l} delay={62 + i * 8} style={{ flex: 1 }}>
              <div style={{ ...panel, padding: "26px 30px", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 62,
                    color: C.primary400,
                  }}
                >
                  <CountUp to={s.n} delay={62 + i * 8} duration={30} />
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
                  {s.l}
                </div>
              </div>
            </Rise>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 28, justifyContent: "center" }}>
          {COPY.game.rewards.map((r, i) => (
            <Rise key={r} delay={96 + i * 6}>
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 23,
                  color: C.accent300,
                  border: "1px solid rgba(255,183,51,0.34)",
                  background: "rgba(255,183,51,0.07)",
                  borderRadius: 999,
                  padding: "12px 26px",
                }}
              >
                {r}
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={118}>
          <div
            style={{
              fontFamily: F.body,
              fontSize: 24,
              color: C.textMuted,
              textAlign: "center",
              marginTop: 26,
            }}
          >
            {COPY.game.footnote}
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
