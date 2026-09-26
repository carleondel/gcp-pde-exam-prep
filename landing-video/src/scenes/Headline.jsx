import { AbsoluteFill, useCurrentFrame } from "remotion";
import { mix, progress } from "../anim.js";
import { MaskedWords } from "../components/Text.jsx";
import { C, FONT } from "../theme.js";

// Services from the question banks, floating on three depth planes.
const SERVICES = [
  ["BigQuery", 150, 170, 0.9],
  ["Dataflow", 1540, 150, 0.7],
  ["Pub/Sub", 1690, 520, 1],
  ["Dataproc", 120, 820, 0.6],
  ["Cloud Storage", 1420, 880, 0.85],
  ["Spanner", 560, 110, 0.5],
  ["Vertex AI", 980, 930, 0.55],
  ["Cloud KMS", 1180, 90, 0.45],
  ["Bigtable", 70, 500, 0.5],
  ["GKE", 700, 960, 0.8],
];

const ServiceChip = ({ label, x, y, depth, index }) => {
  const frame = useCurrentFrame();
  const t = progress(frame, 4 + index * 3, 30);
  const drift = -frame * depth * 0.9;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + drift,
        padding: "12px 22px",
        borderRadius: 14,
        border: `1.5px solid ${C.lineStrong}`,
        background: "rgba(21, 29, 46, 0.7)",
        color: C.textSecondary,
        fontFamily: FONT.mono,
        fontWeight: 600,
        fontSize: 22 + depth * 10,
        opacity: t * (0.25 + depth * 0.45),
        filter: `blur(${(1 - depth) * 5}px)`,
        transform: `scale(${mix(t, 0.7, 1)})`,
      }}
    >
      {label}
    </div>
  );
};

export const Headline = () => {
  const frame = useCurrentFrame();
  const push = progress(frame, 0, 120, (t) => t);
  const underline = progress(frame, 44, 26);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${mix(push, 1.08, 1)})` }}>
        {SERVICES.map(([label, x, y, depth], i) => (
          <ServiceChip key={label} label={label} x={x} y={y} depth={depth} index={i} />
        ))}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${mix(push, 1, 1.05)})`,
        }}
      >
        <div
          style={{
            width: 1500,
            textAlign: "center",
            fontFamily: FONT.heading,
            fontWeight: 700,
            fontSize: 124,
            lineHeight: 1.08,
            letterSpacing: -4,
            color: C.text,
          }}
        >
          <div>
            <MaskedWords text="Pass your Google_Cloud certification," start={4} stagger={4} />
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <MaskedWords text="one question at a time." start={24} stagger={4} gradient />
            <svg
              width="100%"
              height="40"
              viewBox="0 0 1000 40"
              preserveAspectRatio="none"
              style={{ position: "absolute", left: 0, bottom: -34 }}
            >
              <path
                d="M8 26 C 250 6, 600 6, 992 22"
                fill="none"
                stroke={C.primary}
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - underline}
              />
            </svg>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
