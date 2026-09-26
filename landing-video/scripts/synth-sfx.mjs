// Synthesizes the whoosh and impact used on scene transitions and the logo
// hit, so no third-party license applies to them. Writes 16-bit stereo WAVs
// into src/audio/. Deterministic: same output on every run.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SR = 44100;
const out = (name) => resolve(import.meta.dirname, "../src/audio", name);

// Small deterministic PRNG so the noise is identical between runs.
let seed = 0x2f6b1d;
const noise = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return (seed / 0xffffffff) * 2 - 1;
};

function writeWav(path, left, right) {
  const n = left.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  const peak = left.concat(right).reduce((m, v) => Math.max(m, Math.abs(v)), 0) || 1;
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round((left[i] / peak) * 0.89 * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round((right[i] / peak) * 0.89 * 32767), 46 + i * 4);
  }
  writeFileSync(path, buf);
}

// Noise through a resonant band-pass whose centre sweeps up then down, with a
// swell envelope and a left-to-right pan: the classic "air" whoosh.
function whoosh(seconds, fLow, fHigh) {
  const n = Math.round(seconds * SR);
  const left = new Array(n);
  const right = new Array(n);
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  const q = 1.4;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const sweep = Math.sin(Math.PI * t);
    const f = fLow * (fHigh / fLow) ** sweep;
    const w = (2 * Math.PI * f) / SR;
    const alpha = Math.sin(w) / (2 * q);
    const a0 = 1 + alpha;
    const x = noise();
    const y =
      (alpha * x - alpha * x2) / a0 - ((-2 * Math.cos(w)) / a0) * y1 - ((1 - alpha) / a0) * y2;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
    const env = Math.sin(Math.PI * Math.min(1, t * 1.15)) ** 2.2;
    const pan = t;
    left[i] = y * env * Math.cos((pan * Math.PI) / 2);
    right[i] = y * env * Math.sin((pan * Math.PI) / 2);
  }
  return [left, right];
}

// A low sine that drops in pitch with a fast decay, plus a short noise
// transient on top: a soft cinematic "hit".
function impact(seconds) {
  const n = Math.round(seconds * SR);
  const mono = new Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 42 + 90 * Math.exp(-t * 9);
    phase += (2 * Math.PI * f) / SR;
    const body = Math.sin(phase) * Math.exp(-t * 3.2);
    const click = noise() * Math.exp(-t * 60) * 0.5;
    mono[i] = body + click;
  }
  return [mono, mono.slice()];
}

writeWav(out("whoosh.wav"), ...whoosh(0.62, 350, 3200));
writeWav(out("impact.wav"), ...impact(1.6));
console.log("wrote whoosh.wav, impact.wav");
