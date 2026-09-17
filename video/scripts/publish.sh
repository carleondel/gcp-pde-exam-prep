#!/usr/bin/env bash
# Renders both cuts and writes:
#   docs/dataforge-promo.mp4   the full film, web-sized — the durable copy
#   out/teaser.gif             the short loop, on demand
#
# The README plays the film from GitHub's attachment CDN, not from docs/, so
# the mp4 here is the source of truth rather than what readers fetch. To
# refresh what they see, drag it into any GitHub comment box and swap the
# resulting user-attachments URL into the README.
#
# Needs ffmpeg.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
docs="$(cd "$here/.." && pwd)/docs"

npm --prefix "$here" run render
npm --prefix "$here" run teaser

# crf 26 rather than 23: on this much flat panel and text the two are
# indistinguishable and it saves about a third of the file.
ffmpeg -y -loglevel error -i "$here/out/dataforge.mp4" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  "$docs/dataforge-promo.mp4"

# Kept for wherever a player will not render — a mirror, a raw view, a local
# markdown preview. 64 colours and a bayer dither hold up because the palette
# is nearly flat, and the teaser freezes the drifting grid for the same
# reason: animating it takes this file from 3.5 MB to well over 20.
ffmpeg -y -loglevel error -i "$here/out/teaser.mp4" \
  -vf "fps=12,scale=860:-2:flags=lanczos,split[a][b];\
[a]palettegen=max_colors=64:stats_mode=diff[p];\
[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
  -loop 0 "$here/out/teaser.gif"

ls -lh "$docs/dataforge-promo.mp4" "$here/out/teaser.gif"
