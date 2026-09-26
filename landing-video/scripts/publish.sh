#!/usr/bin/env bash
# Renders the film and its poster into ../docs for the README.
#   docs/dataforge-promo.mp4         web-sized, audio mastered to -16 LUFS
#   docs/dataforge-promo-poster.jpg  thumbnail linked from the README
# Uses the ffmpeg bundled with Remotion, so nothing else needs installing.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
docs="$(cd "$here/.." && pwd)/docs"
cd "$here"

npm run facts
# crf 26: on flat panels and text it is indistinguishable from 18 at a
# third of the size.
npx remotion render src/index.jsx LandingPromo out/web.mp4 \
  --codec=h264 --crf=26 --x264-preset=slow --audio-bitrate=192k
# Streaming platforms and browsers play around -14 to -16 LUFS; the raw mix
# sits near -21, so bring it up with a true-peak ceiling. Video is copied.
npx remotion ffmpeg -y -loglevel error -i out/web.mp4 -c:v copy \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 160k \
  -movflags +faststart "$docs/dataforge-promo.mp4"
npx remotion still src/index.jsx Poster "$docs/dataforge-promo-poster.jpg" \
  --frame=100 --image-format=jpeg --jpeg-quality=88

ls -lh "$docs/dataforge-promo.mp4" "$docs/dataforge-promo-poster.jpg"
