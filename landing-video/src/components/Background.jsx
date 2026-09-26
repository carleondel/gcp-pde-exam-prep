import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme.js";

// One continuous backdrop under every scene, so cuts move the content while
// the "room" stays put: a slowly panning grid, two drifting light sources
// and a vignette.
export const Background = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const gridShift = (frame * 0.35) % 48;
  const blob = (x, y, size, color) => ({
    position: "absolute",
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(closest-side, ${color}, transparent)`,
  });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bgDeep, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          backgroundPosition: `${gridShift}px ${gridShift}px`,
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 80%)",
        }}
      />
      <div
        style={blob(
          360 + Math.sin(t * 0.5) * 160,
          180 + Math.cos(t * 0.4) * 90,
          1100,
          "rgba(15, 191, 163, 0.16)",
        )}
      />
      <div
        style={blob(
          1600 + Math.cos(t * 0.35) * 180,
          820 + Math.sin(t * 0.45) * 100,
          1200,
          "rgba(74, 158, 255, 0.13)",
        )}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55))",
        }}
      />
    </AbsoluteFill>
  );
};
