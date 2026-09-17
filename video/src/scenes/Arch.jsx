import { interpolate, useCurrentFrame } from "remotion";
import { C, F, COPY, panel } from "../theme.js";
import { Scene, Rise, Title, Kicker } from "../components/common.jsx";

const NEW_AT = 46; // frame the third cert folder drops in

/** The file tree, with a third cert folder appearing to make the point. */
export function Arch() {
  const frame = useCurrentFrame();

  return (
    <Scene>
      <div style={{ display: "flex", gap: 80, alignItems: "center", width: 1620 }}>
        <div style={{ flex: 1 }}>
          <Rise>
            <Kicker color={C.info}>ARCHITECTURE</Kicker>
            <Title size={68} style={{ marginTop: 14 }}>
              {COPY.arch.title}
            </Title>
            <div
              style={{
                fontFamily: F.body,
                fontSize: 28,
                color: C.textSecondary,
                marginTop: 20,
                lineHeight: 1.5,
              }}
            >
              {COPY.arch.sub}
            </div>
          </Rise>
        </div>

        <Rise delay={12} style={{ flex: 1 }}>
          <div style={{ ...panel, padding: 40, fontFamily: F.mono, fontSize: 27 }}>
            {COPY.arch.tree.map((node, i) => {
              const isNew = node.kind === "new";
              // The new folder and everything inside it land together, after
              // the existing tree has settled.
              const start = isNew || node.depth === 2 ? NEW_AT + (i - 3) * 7 : 14 + i * 5;
              const appear = interpolate(frame, [start, start + 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const color = isNew
                ? C.highlight
                : node.kind === "dir"
                  ? C.primary400
                  : C.textSecondary;
              return (
                <div
                  key={node.t}
                  style={{
                    opacity: appear,
                    transform: `translateX(${(1 - appear) * 22}px)`,
                    color,
                    paddingLeft: node.depth * 36,
                    marginTop: i === 0 ? 0 : 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ opacity: 0.5 }}>{node.kind === "file" ? "└" : "▸"}</span>
                  {node.t}
                  {isNew ? (
                    <span
                      style={{
                        fontSize: 18,
                        letterSpacing: 2,
                        color: C.bgDeep,
                        background: C.highlight,
                        borderRadius: 6,
                        padding: "3px 10px",
                        marginLeft: 6,
                      }}
                    >
                      NEW
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Rise>
      </div>
    </Scene>
  );
}
