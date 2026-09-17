# Promo video

Source for the clip embedded at the top of the project README. Built with
[Remotion](https://www.remotion.dev): React components rendered frame by
frame. It is a separate npm project so the app's dependency tree stays
React and Vite; nothing here is imported by `src/`.

```bash
npm install
npm run studio     # preview
npm run publish    # re-render and update docs/ (needs ffmpeg)
```

`public/` and `out/` are derived and gitignored. All the copy is in the
`COPY` object in `src/theme.js`.
