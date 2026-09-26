import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { mix, pop, progress, settle } from "../anim.js";
import { BrowserFrame, PhoneFrame } from "../components/Devices.jsx";
import { Chip, Eyebrow, FadeUp, MaskedWords } from "../components/Text.jsx";
import { C, FONT } from "../theme.js";

// Sync arc from the laptop to the phone (quadratic bezier, stage px).
const P0 = [1250, 395];
const P1 = [1300, 150];
const P2 = [1500, 250];
// Each pulse leaves on a beat; the last one lands as "Synced" pops.
const PULSE = 22;
export const CUES = { pulses: [50, 71], synced: 93 };

const bezier = (t) =>
  [0, 1].map((k) => (1 - t) ** 2 * P0[k] + 2 * (1 - t) * t * P1[k] + t ** 2 * P2[k]);

export const Mobile = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const laptop = settle(frame, fps, 4, { stiffness: 60 });
  const phone = pop(frame, fps, 16, { damping: 14, stiffness: 90 });
  const float = Math.sin(frame / 18) * 10;
  const arc = progress(frame, 38, 20);
  const pulses = CUES.pulses.map((start) => progress(frame, start, PULSE));

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 120, top: 330, width: 900 }}>
        <Eyebrow start={4}>Synced everywhere</Eyebrow>
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT.heading,
            fontWeight: 700,
            fontSize: 84,
            lineHeight: 1.04,
            letterSpacing: -3,
            color: C.text,
          }}
        >
          <MaskedWords text="Start on your laptop." start={8} stagger={4} />
          <br />
          <MaskedWords text="Finish on your phone." start={22} stagger={4} gradient />
        </div>
        <FadeUp start={40} style={{ marginTop: 30 }}>
          <div style={{ fontFamily: FONT.body, fontSize: 32, color: C.textSecondary }}>
            Your progress is saved to your account as you go.
          </div>
        </FadeUp>
      </div>

      <div
        style={{
          position: "absolute",
          left: 1010,
          top: 400,
          transform: `perspective(2000px) rotateY(${mix(laptop, 40, 14)}deg) translateX(${(1 - laptop) * 500}px)`,
          transformOrigin: "0% 50%",
          opacity: Math.min(1, laptop * 1.6),
          filter: "brightness(0.85)",
        }}
      >
        <BrowserFrame width={640} height={400}>
          <Img src={staticFile("landing/app-home.jpg")} style={{ width: 640 }} />
        </BrowserFrame>
      </div>

      <svg width="1920" height="1080" style={{ position: "absolute", inset: 0 }}>
        <mask id="sync-arc">
          <path
            d={`M${P0} Q${P1} ${P2}`}
            fill="none"
            stroke="#fff"
            strokeWidth="12"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - arc}
          />
        </mask>
        <path
          d={`M${P0} Q${P1} ${P2}`}
          fill="none"
          stroke={C.primary}
          strokeWidth="4"
          strokeDasharray="4 14"
          strokeLinecap="round"
          opacity={0.85}
          mask="url(#sync-arc)"
        />
        {pulses.map((t, i) =>
          t > 0 && t < 1 ? (
            <circle
              key={i}
              cx={bezier(t)[0]}
              cy={bezier(t)[1]}
              r="11"
              fill={C.primary}
              style={{ filter: `drop-shadow(0 0 14px ${C.primary})` }}
            />
          ) : null,
        )}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 1480,
          top: 160,
          transform: `translateY(${(1 - phone) * 800 + float}px) rotate(${mix(phone, 18, -4)}deg)`,
        }}
      >
        <PhoneFrame width={390} height={810}>
          <Img src={staticFile("landing/app-mobile.jpg")} style={{ width: 370 }} />
        </PhoneFrame>
      </div>
      <div style={{ position: "absolute", left: 1200, top: 110 }}>
        <Chip start={CUES.synced} tone="correct">
          ✓ Synced
        </Chip>
      </div>
    </AbsoluteFill>
  );
};
