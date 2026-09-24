import { useCurrentFrame } from "remotion";
import { C, F, COPY } from "../theme.js";
import { Scene, Rise, Typewriter, Title } from "../components/common.jsx";
import { CONTENT_W, safeScene } from "./layout.js";

/** The cold open, set large enough to read with the sound off. */
export function Hook() {
  const frame = useCurrentFrame();
  return (
    <Scene fadeIn={6} style={safeScene}>
      <div style={{ width: CONTENT_W }}>
        <div style={{ fontFamily: F.mono, fontSize: 30, color: C.textMuted, marginBottom: 56 }}>
          <span style={{ color: C.primary400 }}>➜ </span>
          <Typewriter text={COPY.hook.kicker} delay={4} cps={34} />
        </div>
        <Rise delay={30} y={40}>
          <Title size={118}>{COPY.hook.l1}</Title>
        </Rise>
        <Rise delay={56} y={40}>
          <Title size={118} color={C.primary400} style={{ marginTop: 24 }}>
            {COPY.hook.l2}
          </Title>
        </Rise>
        <div
          style={{
            marginTop: 60,
            height: 4,
            width: frame > 56 ? Math.min((frame - 56) * 30, CONTENT_W) : 0,
            background: `linear-gradient(90deg, ${C.primary400}, transparent)`,
          }}
        />
      </div>
    </Scene>
  );
}
