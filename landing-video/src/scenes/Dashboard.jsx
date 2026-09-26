import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { keyframes, mix, progress, settle } from "../anim.js";
import { BrowserFrame } from "../components/Devices.jsx";
import { MaskedWords } from "../components/Text.jsx";
import { C, FONT } from "../theme.js";

// app-home.jpg is 1600x1000, drawn at SCALE inside the frame. Beat boxes are
// the card edges measured on that image, in image px; the camera flies to
// each one and a spotlight isolates it. Re-measure if the screenshot changes.
const SCALE = 0.875;
const FRAME_W = 1600 * SCALE;
const FRAME_H = 1000 * SCALE;

const BEATS = [
  {
    at: 51,
    box: { x: 796, y: 366, w: 588, h: 176 },
    zoom: 1.6,
    label: "See exactly where you stand.",
    note: "Accuracy for every exam domain",
  },
  {
    at: 93,
    box: { x: 609, y: 486, w: 180, h: 129 },
    zoom: 1.7,
    label: "Timed mocks, like the real exam.",
    note: "50 questions · 2 hours · a pass line to beat",
  },
  {
    at: 136,
    box: { x: 222, y: 745, w: 1156, h: 84 },
    zoom: 1.18,
    label: "A daily habit that sticks.",
    note: "Streaks, XP and a daily challenge",
  },
];
const MOVE = 22;

// The camera lands on each beat of the music; the sound layer reads these.
export const CUES = BEATS.map((b) => b.at);

const center = ({ x, y, w, h }) => [(x + w / 2) * SCALE, (y + h / 2) * SCALE];

const Caption = ({ index, label, note, duration }) => {
  const frame = useCurrentFrame();
  const out = progress(frame, duration - 10, 10);
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        bottom: 90,
        padding: "30px 40px",
        borderRadius: 28,
        background: "rgba(10, 14, 23, 0.82)",
        border: `1.5px solid ${C.lineStrong}`,
        boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
        opacity: progress(frame, 0, 12) * (1 - out),
        transform: `translateY(${out * -30}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT.mono,
          fontWeight: 700,
          fontSize: 22,
          color: C.primary,
          letterSpacing: 2,
        }}
      >
        0{index + 1} / 0{BEATS.length}
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: FONT.heading,
          fontWeight: 700,
          fontSize: 64,
          letterSpacing: -2,
          color: C.text,
          whiteSpace: "nowrap",
        }}
      >
        <MaskedWords text={label} start={2} stagger={3} />
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: FONT.body,
          fontSize: 28,
          color: C.textSecondary,
          opacity: progress(frame, 12, 16),
        }}
      >
        {note}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = settle(frame, fps, 0, { stiffness: 55 });

  const shots = [{ at: 0, c: [FRAME_W / 2, FRAME_H / 2], zoom: 1 }].concat(
    BEATS.map((b) => ({ at: b.at, c: center(b.box), zoom: b.zoom })),
  );
  const keys = (pick) =>
    shots.flatMap((s, i) =>
      i === 0
        ? [[0, pick(s)]]
        : [
            [s.at - MOVE, pick(shots[i - 1])],
            [s.at, pick(s)],
          ],
    );
  const cx = keyframes(
    frame,
    keys((s) => s.c[0]),
  );
  const cy = keyframes(
    frame,
    keys((s) => s.c[1]),
  );
  const zoom = keyframes(
    frame,
    keys((s) => s.zoom),
  );

  const active = BEATS.findLastIndex((b) => frame >= b.at - MOVE / 2);
  const beat = BEATS[active];
  const spot = active >= 0 ? progress(frame, beat.at - MOVE / 2, 16) : 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          transform: `perspective(2400px) translateY(${(1 - enter) * 500}px) rotateX(${(1 - enter) * 32}deg) scale(${mix(enter, 0.78, 0.96)})`,
          opacity: Math.min(1, enter * 1.8),
        }}
      >
        <BrowserFrame width={FRAME_W} height={FRAME_H}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "50% 50%",
              transform: `scale(${zoom}) translate(${FRAME_W / 2 - cx}px, ${FRAME_H / 2 - cy}px)`,
            }}
          >
            <Img src={staticFile("landing/app-home.jpg")} style={{ width: FRAME_W }} />
            {beat && (
              <div
                style={{
                  position: "absolute",
                  left: (beat.box.x - 10) * SCALE,
                  top: (beat.box.y - 10) * SCALE,
                  width: (beat.box.w + 20) * SCALE,
                  height: (beat.box.h + 20) * SCALE,
                  borderRadius: 18,
                  border: `2.5px solid rgba(15, 191, 163, ${spot})`,
                  boxShadow: `0 0 0 4000px rgba(5, 8, 14, ${0.6 * spot}), 0 0 40px rgba(15, 191, 163, ${0.45 * spot})`,
                }}
              />
            )}
          </div>
        </BrowserFrame>
      </div>
      {BEATS.map((b, i) => {
        const end = BEATS[i + 1]?.at ?? durationInFrames + MOVE;
        const from = b.at - MOVE / 2;
        return (
          <Sequence
            key={b.label}
            from={from}
            durationInFrames={end - MOVE / 2 - from}
            layout="none"
          >
            <Caption index={i} label={b.label} note={b.note} duration={end - MOVE / 2 - from} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
