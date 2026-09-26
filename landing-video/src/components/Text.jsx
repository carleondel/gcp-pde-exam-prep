import { useCurrentFrame, useVideoConfig } from "remotion";
import { progress, settle } from "../anim.js";
import { C, FONT, GRADIENT } from "../theme.js";

// Each word rises out of its own mask with a slight rotation, like a title
// sequence. `gradient` paints the words with the brand gradient.
export const MaskedWords = ({ text, start = 0, stagger = 3, style, gradient = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => {
        const t = settle(frame, fps, start + i * stagger, { stiffness: 90 });
        return (
          <span key={i}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                paddingBottom: "0.14em",
                marginBottom: "-0.14em",
                verticalAlign: "top",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${(1 - t) * 110}%) rotate(${(1 - t) * 7}deg)`,
                  transformOrigin: "0% 100%",
                  ...(gradient && {
                    backgroundImage: GRADIENT,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }),
                }}
              >
                {word.replace(/_/g, "\u00a0")}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
};

// Small uppercase label that tracks in from wide letter-spacing.
export const Eyebrow = ({ children, start = 0, color = C.primary }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 28);
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        fontWeight: 700,
        fontSize: 22,
        textTransform: "uppercase",
        color,
        letterSpacing: 2 + (1 - t) * 14,
        opacity: t,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <span
        style={{
          width: 36 * t,
          height: 2,
          background: color,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
};

export const FadeUp = ({ children, start = 0, distance = 30, style }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, 30);
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * distance}px)`,
        filter: `blur(${(1 - t) * 8}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Chip = ({ children, start = 0, tone = "primary", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = settle(frame, fps, start, { damping: 13, stiffness: 160 });
  const tones = {
    primary: { bg: C.primarySoft, border: C.primaryMedium, color: C.primary },
    accent: { bg: C.accentSoft, border: C.accentMedium, color: C.accent },
    correct: {
      bg: "rgba(45, 212, 160, 0.14)",
      border: "rgba(45, 212, 160, 0.4)",
      color: C.correct,
    },
  }[tone];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        borderRadius: 999,
        background: `linear-gradient(${tones.bg}, ${tones.bg}), ${C.bgPrimary}`,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
        border: `1.5px solid ${tones.border}`,
        color: tones.color,
        fontFamily: FONT.mono,
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        opacity: Math.min(1, t * 1.5),
        transform: `scale(${0.6 + 0.4 * t})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
