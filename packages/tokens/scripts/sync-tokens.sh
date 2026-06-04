#!/usr/bin/env bash
# Sync token JSON files from the design-tokens GitLab repository into this package.
# Usage: pnpm sync [branch]    (from packages/tokens; default branch: main)
#
# Mirrors Frontend/design-tokens@<branch> tokens/ into ./tokens, preserving the
# phase-2 files maintained only in this repo (semantic/dimensions.json,
# semantic/spacing.json). Uses your existing git (SSH) auth — no token needed.
#
# This is the local counterpart of scripts/ci-sync-tokens.sh (which additionally
# opens the review MR in CI). After syncing, run `pnpm build` to regenerate CSS.

set -euo pipefail

BRANCH="${1:-main}"
REPO="ssh://git@gitlab.synerise.com/Frontend/design-tokens.git"
DST="$(cd "$(dirname "$0")/.." && pwd)/tokens"

command -v rsync >/dev/null || { echo "ERROR: rsync not found in PATH" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Cloning $REPO@$BRANCH …"
git clone --depth 1 --branch "$BRANCH" "$REPO" "$TMP/dt" --quiet

echo "Mirroring tokens → $DST (preserving local dimensions/spacing) …"
# --delete mirrors upstream removals; excluded (repo-local) files are never deleted.
rsync -a --delete \
  --exclude semantic/dimensions.json \
  --exclude semantic/spacing.json \
  "$TMP/dt/tokens/" "$DST/"

echo "Done — token files updated from $BRANCH. Run 'pnpm build' to regenerate CSS."
