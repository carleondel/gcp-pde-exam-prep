/**
 * jsdom ships no canvas implementation, so getContext("2d") returns null and
 * the reward animations (wheel, confetti) throw the moment they are drawn.
 * This is a limitation of the test environment, not of the app, so the
 * methods those components call are stubbed out to no-ops.
 */
const noop = () => {};

const CONTEXT_2D = {
  canvas: null,
  fillStyle: "",
  strokeStyle: "",
  lineWidth: 1,
  font: "",
  textAlign: "left",
  textBaseline: "alphabetic",
  globalAlpha: 1,
  shadowBlur: 0,
  shadowColor: "",
  arc: noop,
  beginPath: noop,
  clearRect: noop,
  closePath: noop,
  createLinearGradient: () => ({ addColorStop: noop }),
  createRadialGradient: () => ({ addColorStop: noop }),
  drawImage: noop,
  fill: noop,
  fillRect: noop,
  fillText: noop,
  lineTo: noop,
  measureText: () => ({ width: 0 }),
  moveTo: noop,
  restore: noop,
  rotate: noop,
  save: noop,
  scale: noop,
  setTransform: noop,
  stroke: noop,
  strokeRect: noop,
  strokeText: noop,
  translate: noop,
};

export function installCanvasStub() {
  if (typeof globalThis.HTMLCanvasElement === "undefined") return;
  globalThis.HTMLCanvasElement.prototype.getContext = function getContext(type) {
    return type === "2d" ? { ...CONTEXT_2D, canvas: this } : null;
  };
  globalThis.HTMLCanvasElement.prototype.toDataURL = () => "data:image/png;base64,";
}
