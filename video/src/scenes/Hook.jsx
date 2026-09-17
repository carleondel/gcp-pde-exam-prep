import { useCurrentFrame } from "remotion";
import { C, F, COPY } from "../theme.js";
import { Scene, Rise, Typewriter, Title } from "../components/common.jsx";

/** Cold open: the shell prompt, then the one-line story of the project. */
export function Hook() {
  const frame = useCurrentFrame();
  return (
    <Scene fadeIn={6}>
      <div style={{ width: 1400 }}>
        <div style={{ fontFamily: F.mono, fontSize: 26, color: C.textMuted, marginBottom: 46 }}>
          <span style={{ color: C.primary400 }}>➜ </span>
          <Typewriter text={COPY.hook.kicker} delay={4} cps={34} />
        </div>
        <Rise delay={34} y={40}>
          <Title size={104}>{COPY.hook.l1}</Title>
        </Rise>
        <Rise delay={62} y={40}>
          <Title size={104} color={C.primary400} style={{ marginTop: 6 }}>
            {COPY.hook.l2}
          </Title>
        </Rise>
        <div
          style={{
            marginTop: 52,
            height: 3,
            width: frame > 62 ? Math.min((frame - 62) * 34, 1400) : 0,
            background: `linear-gradient(90deg, ${C.primary400}, transparent)`,
          }}
        />
      </div>
    </Scene>
  );
}
