import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, CountUp, Title, Kicker } from "../components/common.jsx";
import { LEVEL_UP, Sparks } from "../scenes/Game.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

/** The level-up beat of the landscape scene, with the stats in a 2x2 grid. */
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
    <Scene style={safeScene}>
      <div style={{ width: CONTENT_W }}>
        <Rise>
          <Kicker color={C.accent300} style={{ fontSize: 26 }}>
            PROGRESSION
          </Kicker>
          <Title size={76} style={{ marginTop: 16 }}>
            {COPY.game.title}
          </Title>
        </Rise>

        <Rise delay={10}>
          <div style={{ ...panel, padding: 34, marginTop: 44, position: "relative" }}>
            <div
              style={{
                fontFamily: F.heading,
                fontWeight: 700,
                fontSize: 50,
                color: leveled ? C.accent300 : C.textPrimary,
                transform: `scale(${1 + 0.1 * flip * (leveled ? 1 : 0)})`,
                transformOrigin: "left center",
              }}
            >
              {leveled ? `⚡ ${COPY.game.rankTo}` : `🔧 ${COPY.game.rankFrom}`}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 30, color: C.textTertiary, marginTop: 8 }}>
              <CountUp to={1000} delay={12} duration={LEVEL_UP - 12} /> XP
            </div>
            <div
              style={{
                height: 18,
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 26,
          }}
        >
          {COPY.game.stats.map((s, i) => (
            <Rise key={s.l} delay={62 + i * 8}>
              <div style={{ ...panel, padding: "24px 26px", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 70,
                    color: C.primary400,
                  }}
                >
                  <CountUp to={s.n} delay={62 + i * 8} duration={30} />
                </div>
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 25,
                    letterSpacing: 2,
                    color: C.textTertiary,
                    marginTop: 6,
                  }}
                >
                  {s.l}
                </div>
              </div>
            </Rise>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginTop: 26,
            justifyContent: "center",
          }}
        >
          {COPY.game.rewards.map((r, i) => (
            <Rise key={r} delay={96 + i * 6}>
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 27,
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
      </div>
    </Scene>
  );
}
