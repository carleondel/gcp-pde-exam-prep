import { AbsoluteFill } from "remotion";

// Custom scene transitions. Blur peaks mid-move to fake motion blur, the
// way a camera whip or a push reads on screen.
const Push = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const blur = Math.sin(Math.PI * p) * 14;
  const x = entering ? (1 - p) * 100 : -p * 100;
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${x}%) scale(${1 - Math.sin(Math.PI * p) * 0.06})`,
        filter: `blur(${blur}px)`,
        opacity: entering ? Math.min(1, p * 2) : Math.min(1, (1 - p) * 2),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const ZoomThrough = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const scale = entering ? 0.82 + 0.18 * p : 1 + 0.45 * p;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        filter: `blur(${(entering ? 1 - p : p) * 16}px)`,
        opacity: entering ? p : 1 - p,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const push = () => ({ component: Push, props: {} });
export const zoomThrough = () => ({ component: ZoomThrough, props: {} });
