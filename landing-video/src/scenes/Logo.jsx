import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { mix, pop, progress, settle } from "../anim.js";
import { LogoMark } from "../components/LogoMark.jsx";
import { Eyebrow } from "../components/Text.jsx";
import { C, FONT } from "../theme.js";

const WORD = "DataForge";

export const Logo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const icon = pop(frame, fps, 3, { damping: 11, stiffness: 120 });
  const spin = settle(frame, fps, 3, { stiffness: 70 });
  const reveal = progress(frame, 22, 26);
  const push = progress(frame, 0, 68, (t) => t);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${mix(push, 1, 1.06)})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", width: 190, height: 190 }}>
          {[10, 17].map((start) => {
            const r = progress(frame, start, 30);
            return (
              <div
                key={start}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 48,
                  border: `3px solid ${C.primary}`,
                  transform: `scale(${1 + r * 1.6})`,
                  opacity: frame < start ? 0 : (1 - r) * 0.7,
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              inset: -80,
              background: `radial-gradient(closest-side, rgba(15, 191, 163, ${0.35 * icon}), transparent)`,
            }}
          />
          <div
            style={{
              transform: `scale(${icon}) rotate(${(1 - spin) * -140}deg)`,
              filter: "drop-shadow(0 30px 60px rgba(15, 191, 163, 0.35))",
            }}
          >
            <LogoMark size={190} draw={progress(frame, 8, 20)} fill={progress(frame, 22, 12)} />
          </div>
        </div>
        <div
          style={{
            maxWidth: mix(reveal, 0, 900),
            overflow: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: mix(reveal, 0, 44),
          }}
        >
          <div
            style={{
              fontFamily: FONT.heading,
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: -5,
              color: C.text,
              lineHeight: 1,
              paddingBottom: 12,
            }}
          >
            {WORD.split("").map((ch, i) => {
              const t = settle(frame, fps, 24 + i * 2, { stiffness: 120 });
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - t) * 80}px)`,
                    opacity: t,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 44 }}>
        <Eyebrow start={32} color={C.textSecondary}>
          Google Cloud certification practice
        </Eyebrow>
      </div>
    </AbsoluteFill>
  );
};
