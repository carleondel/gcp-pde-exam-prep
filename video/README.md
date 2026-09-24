# Promo video

Source for the clip embedded at the top of the project README. Built with
[Remotion](https://www.remotion.dev): React components rendered frame by
frame. It is a separate npm project so the app's dependency tree stays
React and Vite; nothing here is imported by `src/`.

```bash
npm install
npm run studio     # preview
npm run publish    # re-render and update docs/ (needs ffmpeg)
npm run vertical   # 9:16 cut for social feeds -> out/vertical.mp4
```

The vertical cut (`src/vertical/`) reuses the same copy and question but
lays it out for a phone, keeping text inside the area Reels, TikTok and
Shorts leave uncovered (`src/vertical/layout.js`). It is not published to
`docs/`: it is for posting, not for the README.

`public/` and `out/` are derived and gitignored. All the copy is in the
`COPY` object in `src/theme.js`.
