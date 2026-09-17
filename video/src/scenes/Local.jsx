import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Title, Kicker } from "../components/common.jsx";

/** What the app keeps (left) against what it refuses to have (right). */
export function Local() {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [46, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene>
      <div style={{ width: 1500, textAlign: "center" }}>
        <Rise>
          <Kicker color={C.highlight}>LOCAL-FIRST</Kicker>
          <Title size={76} style={{ marginTop: 14 }}>
            {COPY.local.title}
          </Title>
          <div
            style={{
              fontFamily: F.body,
              fontSize: 29,
              color: C.textSecondary,
              marginTop: 18,
            }}
          >
            {COPY.local.sub}
          </div>
        </Rise>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 26,
            marginTop: 62,
          }}
        >
          {COPY.local.yes.map((y, i) => (
            <React.Fragment key={y}>
              {i > 0 ? (
                <Rise delay={26}>
                  <div style={{ fontFamily: F.mono, fontSize: 34, color: C.primary400 }}>⇄</div>
                </Rise>
              ) : null}
              <Rise delay={16 + i * 10}>
                <div
                  style={{
                    ...panel,
                    padding: "30px 46px",
                    fontFamily: F.mono,
                    fontSize: 30,
                    color: C.primary400,
                    border: "1px solid rgba(15,191,163,0.36)",
                  }}
                >
                  {y}
                </div>
              </Rise>
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 44 }}>
          {COPY.local.no.map((n, i) => (
            <Rise key={n} delay={40 + i * 8}>
              <div
                style={{
                  position: "relative",
                  fontFamily: F.mono,
                  fontSize: 27,
                  color: C.textMuted,
                  border: `1px dashed ${C.line}`,
                  borderRadius: 14,
                  padding: "18px 34px",
                }}
              >
                {n}
                <div
                  style={{
                    position: "absolute",
                    left: "8%",
                    top: "50%",
                    height: 2,
                    width: `${84 * strike}%`,
                    background: C.wrong,
                  }}
                />
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Scene>
  );
}
