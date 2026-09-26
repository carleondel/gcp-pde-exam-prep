import { AbsoluteFill } from "remotion";
import { Background } from "./components/Background.jsx";
import { Headline } from "./scenes/Headline.jsx";
import { C, FONT, GRADIENT } from "./theme.js";

// README thumbnail: the headline scene plus a play badge. Rendered at
// POSTER_FRAME, once every word has landed.
export const POSTER_FRAME = 100;

export const Poster = () => (
  <AbsoluteFill>
    <Background />
    <AbsoluteFill style={{ transform: "translateY(-70px)" }}>
      <Headline />
    </AbsoluteFill>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 110 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: GRADIENT,
            boxShadow: "0 0 80px rgba(15, 191, 163, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="46" height="46" viewBox="0 0 24 24" style={{ marginLeft: 6 }}>
            <path d="M5 3l16 9-16 9z" fill="#fff" />
          </svg>
        </div>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: C.text }}>
          Watch the 30-second tour
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
