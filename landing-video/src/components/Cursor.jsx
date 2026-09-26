import { interpolate, useCurrentFrame } from "remotion";
import { progress } from "../anim.js";
import { EASE } from "../theme.js";

// A pointer that glides from `from` to `to` along a gentle arc, then clicks
// at `clickAt`: the arrow squashes and a ring ripples out of the tip.
export const Cursor = ({ from, to, start, arrive, clickAt, hideAt, color = "#fff" }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, start, arrive - start, EASE.inOut);
  const arc = Math.sin(Math.PI * t) * -60;
  const x = from[0] + (to[0] - from[0]) * t;
  const y = from[1] + (to[1] - from[1]) * t + arc;
  const press = interpolate(frame, [clickAt - 3, clickAt, clickAt + 5], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ring = progress(frame, clickAt, 20);
  const visible =
    interpolate(frame, [start, start + 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) * (hideAt === undefined ? 1 : 1 - progress(frame, hideAt, 10));
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: visible, zIndex: 20 }}>
      {frame >= clickAt && (
        <div
          style={{
            position: "absolute",
            left: -40,
            top: -40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `3px solid ${color}`,
            transform: `scale(${0.2 + ring * 1.4})`,
            opacity: 1 - ring,
          }}
        />
      )}
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{
          transform: `scale(${1 - press * 0.18})`,
          transformOrigin: "0 0",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
        }}
      >
        <path
          d="M3 2l7.5 19 2.6-7.4L20.5 11z"
          fill="#0a0e17"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
