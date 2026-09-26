# AGENTS.md

## Verification

- `npm run lint` — ESLint
- `npx prettier --check src` — formatting (fix with `npm run format`)
- `npm test` — Vitest (unit + integration tests, which assert on visible UI text)
- `npm run build` — Vite production build

## Landing video

- `landing-video/` is a standalone Remotion project (own `package.json`, `npm install` inside it).
- `npm run studio` to preview, `npm run render` → `landing-video/out/landing-promo.mp4`.
- `npm run publish` re-renders the README video: `docs/dataforge-promo.mp4` (audio mastered to
  -16 LUFS) and `docs/dataforge-promo-poster.jpg`.
- Audio lives in `landing-video/src/audio/` (sources and licenses in `CREDITS.md`). Scene cuts are
  locked to the music's bars in `src/theme.js`; each scene exports `CUES` read by `Soundtrack.jsx`.
- Screenshots come from the app's `public/` (`remotion.config.js`); question counts and dates are
  generated into `src/facts.json` by `npm run facts` (run automatically by studio/render).

## Conventions

- All user-facing text (UI, question bank discussion/notes) is in English. Date formatting uses `en-US`.
