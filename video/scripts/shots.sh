#!/usr/bin/env bash
# Rebuilds video/public/ from the app's own assets, so the film never ships a
# hand-maintained copy of a screenshot that has since been retaken. Derived
# output only: public/ is gitignored.
#
# Needs ffmpeg, which the publishing pipeline in README.md needs anyway.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
repo="$(cd "$here/.." && pwd)"
shots="$here/public/shots"
src="$repo/docs/screenshots"

mkdir -p "$shots"
cp "$repo/src/certs/gcp-pde/assets/logo.svg" "$here/public/google-cloud.svg"

# Whole screens, shown inside the browser frame in the Tour scene.
cp "$src/home.png" "$shots/home.png"
cp "$src/daily-challenge.png" "$shots/daily.png"

# Tight crops of the answer screen, scrolled as one column in Rationales.
# The app centres its content in a ~860px column starting at x=540, so these
# take that column and drop the empty margins either side.
ffmpeg -y -loglevel error -i "$src/discussion_2.png" -vf "crop=860:380:540:150" "$shots/rationales.png"
ffmpeg -y -loglevel error -i "$src/discussion_3.png" -vf "crop=860:640:540:90" "$shots/discussion.png"

echo "public/ rebuilt from docs/screenshots and src/certs/gcp-pde/assets"
