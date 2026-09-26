import { useId } from "react";

// The favicon mark (public/favicon.svg) with the bolt drawable: `draw` traces
// the outline, `fill` floods it.
const BOLT = "M37 7 15 37h14l-4 20 23-31H34z";
const BOLT_LENGTH = 180;

export const LogoMark = ({ size, draw = 1, fill = 1 }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0fbfa3" />
          <stop offset="1" stopColor="#4a9eff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${id})`} />
      <path
        d={BOLT}
        fill="#0f1520"
        fillOpacity={fill}
        stroke="#0f1520"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeDasharray={BOLT_LENGTH}
        strokeDashoffset={BOLT_LENGTH * (1 - draw)}
      />
    </svg>
  );
};
