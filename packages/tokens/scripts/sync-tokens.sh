#!/usr/bin/env bash
# Sync token JSON files from the Token Studio repository.
# Usage: pnpm sync (from packages/tokens)

set -euo pipefail

REPO_RAW="https://raw.githubusercontent.com/piotrzarebski2/design-tokens/main/tokens"
DIR="$(cd "$(dirname "$0")/.." && pwd)/tokens"

echo "Syncing tokens from $REPO_RAW → $DIR"

curl -sL "$REPO_RAW/primitives/core.json"   -o "$DIR/primitives/core.json"
curl -sL "$REPO_RAW/semantic/Light.json"     -o "$DIR/semantic/Light.json"
curl -sL "$REPO_RAW/semantic/Dark.json"      -o "$DIR/semantic/Dark.json"
curl -sL "$REPO_RAW/modules/base.json"       -o "$DIR/modules/base.json"
curl -sL "$REPO_RAW/surface/base.json"       -o "$DIR/surface/base.json"
curl -sL "$REPO_RAW/%24metadata.json"        -o "$DIR/\$metadata.json"
curl -sL "$REPO_RAW/%24themes.json"          -o "$DIR/\$themes.json"

for color in blue cyan fern green grey mars orange pink purple red violet yellow; do
  curl -sL "$REPO_RAW/semantic/custom-color/${color}.json" \
    -o "$DIR/semantic/custom-color/${color}.json"
done

echo "Done — all token files updated."
