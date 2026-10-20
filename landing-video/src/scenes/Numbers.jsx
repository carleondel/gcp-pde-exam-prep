import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { progress, settle } from "../anim.js";
import { Chip } from "../components/Text.jsx";
import facts from "../facts.json";
import { C, FONT, GRADIENT } from "../theme.js";

// Tag colours of the cert cards on the landing (src/landing/landing.css).
const CERT_TAGS = {
  "gcp-pde": { tag: "PDE", tone: C.primary },
  "gcp-pca": { tag: "PCA", tone: C.accent },
  "gcp-adp": { tag: "ADP", tone: C.primary },
  "gcp-gail": { tag: "GAIL", tone: "#34a853" },
  "gcp-pmle": { tag: "PMLE", tone: "#ea4335" },
  "gcp-cdl": { tag: "CDL", tone: "#4285f4" },
  "gcp-agwa": { tag: "AGWA", tone: "#a142f4" },
  "gcp-ace": { tag: "ACE", tone: "#00adb5" },
  "gcp-pcse": { tag: "PCSE", tone: "#ff6d00" },
  "gcp-pcdoe": { tag: "PCDOE", tone: "#f06292" },
  "gcp-psoe": { tag: "PSOE", tone: "#7986cb" },
  "gcp-pcd": { tag: "PCD", tone: "#4dd0e1" },
  "gcp-pcde": { tag: "PCDE", tone: "#9ccc65" },
  "gcp-pcne": { tag: "PCNE", tone: "#fdd835" },
};
const COLUMNS = 7;

const STATS = [
  { value: facts.totalQuestions, label: "practice questions" },
  { value: facts.certs.length, label: "Google Cloud certifications" },
  { value: facts.totalDomains, label: "exam domains covered" },
];

export const COUNT_FRAMES = 46;
// cards: the frame each row of cert cards starts landing; cards in a row follow 2 frames apart.
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
          fontSize: 180,
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
        {count.toLocaleString("en-US")}
      </div>
      <div style={{ fontFamily: FONT.body, fontSize: 34, color: C.textSecondary, marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
};

const CertCard = ({ cert, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = settle(frame, fps, delay, { stiffness: 90 });
  const info = CERT_TAGS[cert.id];
  return (
    <div
      style={{
        width: 210,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "20px 0 18px",
        borderRadius: 20,
        border: `1.5px solid ${C.line}`,
        background: "linear-gradient(180deg, rgba(26, 36, 56, 0.94), rgba(15, 21, 32, 0.88))",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
        opacity: t,
        transform: `translateY(${(1 - t) * 60}px) scale(${0.85 + t * 0.15})`,
      }}
    >
      <span
        style={{
          padding: "5px 14px",
          borderRadius: 999,
          background: `${info.tone}24`,
          color: info.tone,
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        {info.tag}
      </span>
      <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.textSecondary }}>
        {cert.count} questions
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
      <div style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLUMNS}, auto)`,
          gap: 20,
          marginTop: 60,
        }}
      >
        {facts.certs.map((cert, i) => (
          <CertCard
            key={cert.id}
            cert={cert}
            delay={CUES.cards[Math.floor(i / COLUMNS)] + (i % COLUMNS) * 2}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
