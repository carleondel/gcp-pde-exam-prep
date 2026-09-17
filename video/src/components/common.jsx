import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "../theme.js";

/**
 * The grid-and-vignette floor the whole film sits on, lifted from the app's
 * body background. It renders once, outside the scene sequences, so scenes
 * cross-fade over a background that never blinks.
 */
export function Backdrop({ frozen = false }) {
  const frame = useCurrentFrame();
  // The slow drift is what sells the "control room" feel in the video, but it
  // repaints every pixel of every frame, which is fatal for GIF compression.
  // The GIF cut freezes it.
  const drift = frozen ? 0 : (frame * 0.35) % 60;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bgDeep }}>
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0 59px, rgba(13,158,135,0.07) 59px 60px),
            repeating-linear-gradient(90deg, transparent 0 59px, rgba(13,158,135,0.07) 59px 60px)`,
          transform: `translate(${-drift}px, ${-drift}px)`,
          width: "110%",
          height: "110%",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 45%, rgba(15,191,163,0.13), transparent 70%),
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(5,7,12,0.92) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
}

/** Fades a scene in and out at its own edges, so scenes can sit back to back. */
export function Scene({ children, fadeIn = 10, fadeOut = 10, style }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity =
    interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }) *
    interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
    });
  return (
    <AbsoluteFill
      style={{
        opacity,
        alignItems: "center",
        justifyContent: "center",
        padding: 110,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

/** Spring-driven rise-and-fade used for every element entrance in the film. */
export function Rise({ delay = 0, y = 34, children, style, damping = 200 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping }, durationInFrames: 26 });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * y}px)`, ...style }}>
      {children}
    </div>
  );
}

/** Reveals `text` character by character, with a block cursor while typing. */
export function Typewriter({ text, delay = 0, cps = 26, style, cursor = true }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = Math.max(0, Math.round(((frame - delay) / fps) * cps));
  const shown = text.slice(0, Math.min(chars, text.length));
  const typing = chars < text.length;
  const blink = Math.floor(frame / 8) % 2 === 0;
  return (
    <span style={style}>
      {shown}
      {cursor && (typing || blink) && chars > 0 ? (
        <span style={{ color: C.primary400 }}>▋</span>
      ) : null}
    </span>
  );
}

/** Counts from zero to `to`, easing out, so a number lands rather than appears. */
export function CountUp({ to, delay = 0, duration = 40, style }) {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - p, 3);
  return <span style={style}>{Math.round(to * eased)}</span>;
}

/** Small uppercase mono label — the app's section-kicker treatment. */
export function Kicker({ children, color = C.textTertiary, style }) {
  return (
    <div
      style={{
        fontFamily: F.mono,
        fontSize: 22,
        letterSpacing: 4,
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Title({ children, size = 84, color = C.textPrimary, style }) {
  return (
    <div
      style={{
        fontFamily: F.heading,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -1.5,
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The teal hairline at the very bottom that tracks progress through the film. */
export function ProgressBar() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div style={{ height: 5, background: "rgba(143,165,200,0.10)" }}>
        <div
          style={{
            height: "100%",
            width: `${(frame / (durationInFrames - 1)) * 100}%`,
            background: `linear-gradient(90deg, ${C.primary600}, ${C.primary400})`,
            boxShadow: `0 0 18px ${C.primary400}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

/**
 * A browser window around a real screenshot of the app. The chrome is there
 * to say "this is the running product", so it stays plain: three dots, one
 * URL, no invented toolbars.
 *
 * `width` must not exceed the screenshot's native width or the capture goes
 * soft — the shots under public/shots/ are 1917px wide, which is why the
 * scenes push in only as far as they do.
 */
export function BrowserFrame({ src, width, url = "localhost:5173/?cert=gcp-pde", style }) {
  return (
    <div
      style={{
        width,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${C.line}`,
        boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
        background: C.bgPrimary,
        ...style,
      }}
    >
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 18px",
          background: C.bgTertiary,
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        {["#f0605a", "#e6a817", "#2dd4a0"].map((dot) => (
          <div key={dot} style={{ width: 11, height: 11, borderRadius: 999, background: dot }} />
        ))}
        <div
          style={{
            marginLeft: 16,
            flex: 1,
            height: 26,
            borderRadius: 999,
            background: "rgba(10,14,23,0.7)",
            color: C.textMuted,
            fontFamily: F.mono,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14,
          }}
        >
          {url}
        </div>
      </div>
      <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
    </div>
  );
}
