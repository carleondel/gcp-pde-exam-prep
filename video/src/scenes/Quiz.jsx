import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Kicker } from "../components/common.jsx";

const LETTERS = ["A", "B", "C", "D"];
const PICK = 74; // frame the answer is committed and graded

/**
 * One option row, which knows three states: idle, graded correct, faded out.
 * `scale` enlarges type and spacing together for the vertical cut, which is
 * watched on a phone.
 */
export function Option({ text, index, delay, scale = 1 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isCorrect = index === COPY.quiz.correct;
  const graded = frame >= PICK && isCorrect;
  const faded = frame >= PICK && !isCorrect;

  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 22 });
  const grade = interpolate(frame, [PICK, PICK + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: s * (faded ? interpolate(grade, [0, 1], [1, 0.32]) : 1),
        transform: `translateY(${(1 - s) * 20}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18 * scale,
        padding: `${18 * scale}px ${22 * scale}px`,
        marginTop: 12 * scale,
        borderRadius: 13 * scale,
        border: graded
          ? `1px solid rgba(45,212,160,${0.35 + 0.55 * grade})`
          : `1px solid ${C.line}`,
        background: graded ? `rgba(45,212,160,${0.06 + 0.1 * grade})` : "rgba(21,29,46,0.75)",
        boxShadow: graded ? `0 0 ${34 * grade}px rgba(45,212,160,${0.3 * grade})` : "none",
      }}
    >
      <div
        style={{
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 21 * scale,
          width: 40 * scale,
          height: 40 * scale,
          flexShrink: 0,
          borderRadius: 9 * scale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: graded ? C.bgDeep : C.textTertiary,
          background: graded ? C.correct : "rgba(143,165,200,0.10)",
        }}
      >
        {LETTERS[index]}
      </div>
      <div
        style={{
          fontFamily: F.body,
          fontSize: 24 * scale,
          lineHeight: 1.35,
          color: C.textPrimary,
        }}
      >
        {text}
      </div>
      {graded ? (
        <div style={{ marginLeft: "auto", fontSize: 28 * scale, color: C.correct, opacity: grade }}>
          ✓
        </div>
      ) : null}
    </div>
  );
}

/** A rationale card — the thing the app has that a flashcard deck does not. */
export function Rationale({ label, text, color, delay, scale = 1 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 24 });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateX(${(1 - s) * 40}px)`,
        ...panel,
        borderLeft: `4px solid ${color}`,
        padding: 26 * scale,
        marginTop: 18 * scale,
      }}
    >
      <div style={{ fontFamily: F.mono, fontSize: 18 * scale, letterSpacing: 3, color }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: F.body,
          fontSize: 23 * scale,
          color: C.textSecondary,
          marginTop: 12,
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export function Quiz() {
  return (
    <Scene style={{ padding: 66 }}>
      <div style={{ display: "flex", gap: 30, width: 1780, alignItems: "flex-start" }}>
        <div style={{ flex: 1.75 }}>
          <Rise>
            <Kicker color={C.primary400}>{COPY.quiz.kicker}</Kicker>
          </Rise>
          <Rise delay={6}>
            <div style={{ ...panel, padding: 32, marginTop: 20 }}>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: F.mono,
                  fontSize: 17,
                  letterSpacing: 2,
                  color: C.primary400,
                  background: "rgba(15,191,163,0.10)",
                  border: "1px solid rgba(15,191,163,0.3)",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                {COPY.quiz.topic}
              </div>
              <div
                style={{
                  fontFamily: F.heading,
                  fontWeight: 500,
                  fontSize: 31,
                  color: C.textPrimary,
                  lineHeight: 1.32,
                  marginTop: 16,
                }}
              >
                {COPY.quiz.question}
              </div>
              <div style={{ marginTop: 16 }}>
                {COPY.quiz.options.map((o, i) => (
                  <Option key={o} text={o} index={i} delay={20 + i * 9} />
                ))}
              </div>
            </div>
          </Rise>
        </div>
        <div style={{ flex: 1, paddingTop: 62 }}>
          <Rationale
            label={COPY.quiz.rationaleLabel}
            text={COPY.quiz.rationale}
            color={C.correct}
            delay={92}
          />
          <Rationale
            label={COPY.quiz.wrongLabel}
            text={COPY.quiz.wrong}
            color={C.wrong}
            delay={122}
          />
        </div>
      </div>
    </Scene>
  );
}
