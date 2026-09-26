import { C } from "../theme.js";

export const BrowserFrame = ({ width, height, children, style }) => (
  <div
    style={{
      width,
      borderRadius: 22,
      border: `1.5px solid ${C.lineStrong}`,
      background: C.bgSecondary,
      boxShadow: "0 50px 120px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03)",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 9,
        padding: "14px 18px",
        borderBottom: `1px solid ${C.line}`,
        background: C.bgTertiary,
      }}
    >
      {["#f0605a", "#e6a817", "#2dd4a0"].map((color) => (
        <i
          key={color}
          style={{ width: 13, height: 13, borderRadius: "50%", background: color, opacity: 0.8 }}
        />
      ))}
    </div>
    <div style={{ position: "relative", height, overflow: "hidden" }}>{children}</div>
  </div>
);

export const PhoneFrame = ({ width, height, children, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 54,
      border: "10px solid #1d2638",
      background: C.bgPrimary,
      boxShadow:
        "0 60px 120px rgba(0, 0, 0, 0.65), inset 0 0 0 2px rgba(255, 255, 255, 0.05), 0 0 0 2px #2a3550",
      overflow: "hidden",
      position: "relative",
      ...style,
    }}
  >
    {children}
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        width: 110,
        height: 30,
        marginLeft: -55,
        borderRadius: 20,
        background: "#05070c",
      }}
    />
  </div>
);
