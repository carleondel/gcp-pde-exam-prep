import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { pop, progress, settle } from "../anim.js";
import { Cursor } from "../components/Cursor.jsx";
import { LogoMark } from "../components/LogoMark.jsx";
import { Chip, FadeUp, MaskedWords } from "../components/Text.jsx";
import { C, FONT, GRADIENT } from "../theme.js";

const URL = "dataforge-inky.vercel.app";

// Scene-local frames, on beats of the music; the sound layer reads these too.
export const CUES = { chip: 8, button: 50, click: 107 };
const CLICK = CUES.click;

const Button = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = pop(frame, fps, CUES.button, { damping: 12, stiffness: 110 });
  const press = interpolate(frame, [CLICK - 3, CLICK, CLICK + 8], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash = progress(frame, CLICK, 24);
  const shimmer = (start) => progress(frame, start, 26) * 260 - 130;
  const glow = 0.25 + 0.15 * Math.sin(frame / 8) + (frame >= CLICK ? (1 - flash) * 0.6 : 0);
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "34px 64px",
        borderRadius: 22,
        background: GRADIENT,
        color: "#fff",
        fontFamily: FONT.mono,
        fontWeight: 700,
        fontSize: 40,
        whiteSpace: "nowrap",
        transform: `scale(${t * press})`,
        boxShadow: `0 0 ${60 + glow * 60}px rgba(15, 191, 163, ${glow})`,
      }}
    >
      Try 20 questions free →
      {[66, 124].map((start) => (
        <div
          key={start}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%)",
            transform: `translateX(${shimmer(start)}%)`,
          }}
        />
      ))}
    </div>
  );
};

export const Cta = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = settle(frame, fps, 2, { stiffness: 90 });
  const typed = Math.round(progress(frame, CLICK + 7, 30, (x) => x) * URL.length);
  const caret = Math.floor(frame / 8) % 2 === 0 || typed < URL.length;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: logo,
          transform: `translateY(${(1 - logo) * -40}px)`,
          fontFamily: FONT.heading,
          fontWeight: 700,
          fontSize: 48,
          color: C.text,
          letterSpacing: -1,
        }}
      >
        <LogoMark size={64} />
        DataForge
      </div>
      <div style={{ marginTop: 50 }}>
        <Chip start={CUES.chip} tone="accent">
          Free while in beta
        </Chip>
      </div>
      <div
        style={{
          marginTop: 36,
          fontFamily: FONT.heading,
          fontWeight: 700,
          fontSize: 112,
          letterSpacing: -4,
          color: C.text,
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        <MaskedWords text="Your next certification" start={16} stagger={4} />
        <br />
        <MaskedWords text="starts today." start={28} stagger={4} gradient />
      </div>
      <FadeUp start={40} style={{ marginTop: 26 }}>
        <div style={{ fontFamily: FONT.body, fontSize: 34, color: C.textSecondary }}>
          Twenty questions, no account, two minutes.
        </div>
      </FadeUp>
      <div style={{ marginTop: 56, position: "relative" }}>
        <Button />
      </div>
      <div
        style={{
          marginTop: 34,
          height: 44,
          fontFamily: FONT.mono,
          fontWeight: 600,
          fontSize: 32,
          color: C.primary,
        }}
      >
        {URL.slice(0, typed)}
        {frame >= CLICK + 7 && <span style={{ opacity: caret ? 1 : 0, color: C.text }}>▍</span>}
      </div>
      <Cursor
        from={[1700, 1120]}
        to={[1080, 850]}
        start={CLICK - 30}
        arrive={CLICK - 4}
        clickAt={CLICK}
        hideAt={CLICK + 14}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: FONT.body,
          fontSize: 20,
          color: C.textMuted,
          opacity: progress(frame, CLICK + 14, 20),
        }}
      >
        Independent study tool. Not affiliated with or endorsed by Google LLC.
      </div>
    </AbsoluteFill>
  );
};
