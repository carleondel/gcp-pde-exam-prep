import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { progress, settle } from "../anim.js";
import { Chip } from "../components/Text.jsx";
import facts from "../facts.json";
import { C, FONT, GRADIENT } from "../theme.js";

const CERT_NAMES = {
  "gcp-pde": { tag: "PDE", name: "Professional Data Engineer", tone: C.primary },
  "gcp-pca": { tag: "PCA", name: "Professional Cloud Architect", tone: C.accent },
};

const STATS = [
  { value: facts.totalQuestions, label: "practice questions" },
  { value: facts.certs.length, label: "Google Cloud certifications" },
  { value: facts.totalDomains, label: "exam domains covered" },
];

export const COUNT_FRAMES = 46;
export const CUES = { stats: [8, 15, 22], cards: [51, 58] };

const Stat = ({ value, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = settle(frame, fps, delay, { stiffness: 80 });
  const count = Math.round(value * progress(frame, delay, COUNT_FRAMES));
  return (
    <div
      style={{
        width: 480,
        textAlign: "center",
        opacity: Math.min(1, t * 1.5),
        transform: `translateY(${(1 - t) * 80}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.heading,
          fontWeight: 700,
          fontSize: 200,
          lineHeight: 1,
          letterSpacing: -6,
          fontVariantNumeric: "tabular-nums",
          backgroundImage: GRADIENT,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          paddingBottom: 10,
        }}
      >
        {count}
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 34, color: C.textSecondary, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
};

const CertCard = ({ cert, delay, fromLeft }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = settle(frame, fps, delay, { stiffness: 70 });
  const info = CERT_NAMES[cert.id];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "26px 34px",
        borderRadius: 24,
        border: `1.5px solid ${C.line}`,
        background: "linear-gradient(180deg, rgba(26, 36, 56, 0.94), rgba(15, 21, 32, 0.88))",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
        opacity: t,
        transform: `translateX(${(1 - t) * (fromLeft ? -200 : 200)}px)`,
      }}
    >
      <span
        style={{
          padding: "6px 16px",
          borderRadius: 999,
          background: `${info.tone}22`,
          color: info.tone,
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        {info.tag}
      </span>
      <div>
        <div style={{ fontFamily: FONT.heading, fontWeight: 700, fontSize: 34, color: C.text }}>
          {info.name}
        </div>
        <div style={{ fontFamily: FONT.mono, fontSize: 22, color: C.textSecondary, marginTop: 4 }}>
          {cert.count} questions · {cert.domains} domains
        </div>
      </div>
    </div>
  );
};

export const Numbers = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Chip start={2} tone="correct">
        ✓ Questions updated {facts.latestUpdate}
      </Chip>
      <div style={{ display: "flex", alignItems: "center", marginTop: 70 }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && (
              <div
                style={{
                  width: 2,
                  height: 220,
                  background: `linear-gradient(transparent, ${C.lineStrong}, transparent)`,
                  transform: `scaleY(${progress(frame, 10 + i * 6, 24)})`,
                }}
              />
            )}
            <Stat value={stat.value} label={stat.label} delay={CUES.stats[i]} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 28, marginTop: 80 }}>
        {facts.certs.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} delay={CUES.cards[i]} fromLeft={i === 0} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
