import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { keyframes, mix, pop, progress, settle } from "../anim.js";
import { Cursor } from "../components/Cursor.jsx";
import { BrowserFrame } from "../components/Devices.jsx";
import { Chip, Eyebrow, FadeUp, MaskedWords } from "../components/Text.jsx";
import { C, FONT } from "../theme.js";

// app-question.jpg is 1400x1050. It is drawn at SCALE and shifted left by
// OFFSET_X so the question card fills the frame; boxes below are in image px.
const FRAME_W = 1020;
const FRAME_H = 700;
const SCALE = 0.843;
const OFFSET_X = -80;
const OPTION_D = { x: 120, y: 700, w: 1160, h: 76 };
const EXPLANATION = { x: 120, y: 800, w: 1160, h: 200 };

// Scene-local frames, on beats of the music; the sound layer reads these too.
export const CUES = { click: 50, correct: 64, why: 136, xp: 150 };

const toFrame = ({ x, y, w, h }) => ({
  left: x * SCALE + OFFSET_X,
  top: y * SCALE,
  width: w * SCALE,
  height: h * SCALE,
});

// A box that traces itself on, then glows.
const Highlight = ({ box, start, color }) => {
  const frame = useCurrentFrame();
  const draw = progress(frame, start, 22);
  const glow = progress(frame, start + 12, 20);
  const { left, top, width, height } = toFrame(box);
  const pad = 8;
  return (
    <svg
      style={{
        position: "absolute",
        left: left - pad,
        top: top - pad,
        overflow: "visible",
        filter: `drop-shadow(0 0 ${18 * glow}px ${color})`,
      }}
      width={width + pad * 2}
      height={height + pad * 2}
    >
      <rect
        x="2"
        y="2"
        width={width + pad * 2 - 4}
        height={height + pad * 2 - 4}
        rx="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </svg>
  );
};

export const Question = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = settle(frame, fps, 2, { stiffness: 60 });
  const pan = keyframes(frame, [
    [93, 0],
    [121, -225],
  ]);
  const xp = pop(frame, fps, CUES.xp);
  const xpRise = progress(frame, CUES.xp, 30);
  const d = toFrame(OPTION_D);
  const e = toFrame(EXPLANATION);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 120, top: 300, width: 600 }}>
        <Eyebrow start={6}>Learn the why</Eyebrow>
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT.heading,
            fontWeight: 700,
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: C.text,
          }}
        >
          <MaskedWords text="Every option," start={10} stagger={4} />
          <br />
          <MaskedWords text="explained." start={18} stagger={4} gradient />
        </div>
        <FadeUp start={34} style={{ marginTop: 30 }}>
          <div
            style={{
              fontFamily: FONT.body,
              fontSize: 32,
              lineHeight: 1.45,
              color: C.textSecondary,
            }}
          >
            Know why the right answer is right, and why each distractor is wrong.
          </div>
        </FadeUp>
      </div>

      <div
        style={{
          position: "absolute",
          left: 850,
          top: 170,
          transform: `perspective(2200px) rotateY(${mix(enter, 34, 10) - frame * 0.02}deg) rotateX(${mix(enter, 14, 3)}deg) translateX(${(1 - enter) * 420}px)`,
          transformOrigin: "100% 50%",
          opacity: Math.min(1, enter * 1.6),
        }}
      >
        <BrowserFrame width={FRAME_W} height={FRAME_H}>
          <div style={{ position: "absolute", left: 0, top: pan, width: "100%" }}>
            <Img
              src={staticFile("landing/app-question.jpg")}
              style={{ position: "absolute", left: OFFSET_X, top: 0, width: 1400 * SCALE }}
            />
            <Highlight box={OPTION_D} start={CUES.click + 2} color={C.correct} />
            <Highlight box={EXPLANATION} start={CUES.why - 4} color={C.accent} />
            <div style={{ position: "absolute", left: d.left + d.width - 290, top: d.top - 30 }}>
              <Chip start={CUES.correct} tone="correct">
                ✓ Correct answer
              </Chip>
            </div>
            <div style={{ position: "absolute", left: e.left + 380, top: e.top - 30 }}>
              <Chip start={CUES.why} tone="accent">
                Why, for every option
              </Chip>
            </div>
            <div
              style={{
                position: "absolute",
                left: e.left + e.width - 120,
                top: e.top + 10 - xpRise * 70,
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 44,
                color: C.accent,
                transform: `scale(${xp})`,
                opacity: frame < CUES.xp ? 0 : 1 - progress(frame, CUES.xp + 18, 14),
                textShadow: "0 0 24px rgba(255, 183, 51, 0.6)",
              }}
            >
              +8 XP
            </div>
            <Cursor
              from={[FRAME_W + 120, FRAME_H + 80]}
              to={[d.left + 520, d.top + d.height / 2]}
              start={CUES.click - 26}
              arrive={CUES.click - 4}
              clickAt={CUES.click}
              hideAt={CUES.click + 30}
            />
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
