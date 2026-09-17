import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Title, Kicker } from "../components/common.jsx";

/** The four study modes, as four cards that deal onto the table in sequence. */
export function Modes() {
  return (
    <Scene>
      <div style={{ width: 1620 }}>
        <Rise>
          <Kicker>MODES</Kicker>
          <Title size={74} style={{ marginTop: 14 }}>
            {COPY.modes.title}
          </Title>
        </Rise>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 54,
          }}
        >
          {COPY.modes.items.map((m, i) => (
            <Rise key={m.k} delay={22 + i * 11} y={46}>
              <div style={{ ...panel, padding: 32, height: 330, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "0 0 auto 0",
                    height: 4,
                    borderRadius: "20px 20px 0 0",
                    background: `linear-gradient(90deg, ${m.c}, transparent)`,
                  }}
                />
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 19,
                    letterSpacing: 3,
                    color: m.c,
                  }}
                >
                  {m.k}
                </div>
                <div
                  style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: 42,
                    color: C.textPrimary,
                    marginTop: 26,
                    lineHeight: 1.1,
                  }}
                >
                  {m.t}
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    fontSize: 26,
                    color: C.textSecondary,
                    marginTop: 18,
                    lineHeight: 1.45,
                  }}
                >
                  {m.d}
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Scene>
  );
}
