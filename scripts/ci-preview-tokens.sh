#!/usr/bin/env bash
#
# ci-preview-tokens.sh — build a Chromatic PREVIEW of how an in-progress design-tokens
# change looks, WITHOUT creating an MR. Triggered (manually) from a design-tokens MR.
#
# Flow: mirror the MR branch's tokens into @synerise/ds-tokens → full build → build
# Storybook → run Chromatic on an isolated `token-preview/<branch>` branch so the diff
# shows against the master baseline but never updates it. Nothing is pushed, no MR.
#
# Env (passed by the design-tokens preview trigger / present as CI vars):
#   TRIGGER_SOURCE_BRANCH       design-tokens MR source branch (mirrored + used as preview name)
#   TRIGGER_SOURCE_SHA          exact MR head commit to mirror
#   TOKENS_REPO_READ_TOKEN      read token to clone design-tokens (or CI_JOB_TOKEN fallback)
#   CHROMATIC_PROJECT_TOKEN_SB7 Chromatic project token (existing CI var)
#
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

log() { printf '\n\033[1;34m▸ %s\033[0m\n' "$*"; }

# ── 1. Mirror the MR branch's tokens into the working tree (reuses the sync worker) ──
log "Mirroring tokens from design-tokens@${TRIGGER_SOURCE_BRANCH:-?} (sha=${TRIGGER_SOURCE_SHA:-tip})"
MIRROR_ONLY=1 bash "${REPO_ROOT}/scripts/ci-sync-tokens.sh"

# ── 2. Full build — Storybook needs generated vars/icons + built component dist ──────
log "Installing + building packages (with tokens applied)"
pnpm install --frozen-lockfile
pnpm build

# ── 3. Build Storybook ───────────────────────────────────────────────────────────────
# Disable TurboSnap for previews: a token change reaches Storybook through the build
# (tokens JSON → cssText → core), not through a traced story import, so TurboSnap would
# snapshot nothing. Full snapshot is required for the token diff to be visible.
if [[ -f packages/storybook/chromatic.config.json ]]; then
  log "Disabling TurboSnap (onlyChanged) for full preview snapshot"
  node -e '
    const fs = require("fs"), p = "packages/storybook/chromatic.config.json";
    const c = JSON.parse(fs.readFileSync(p, "utf8"));
    c.onlyChanged = false;
    fs.writeFileSync(p, JSON.stringify(c, null, 2));
  '
fi
log "Building Storybook"
( cd packages/storybook && pnpm build-storybook --quiet )

# ── 4. Chromatic on an isolated preview branch (does NOT touch the master baseline) ──
PREVIEW_BRANCH="token-preview/${TRIGGER_SOURCE_BRANCH:-adhoc}"
log "Publishing Chromatic preview (branch: ${PREVIEW_BRANCH})"
( cd packages/storybook && npx chromatic \
    --project-token="$CHROMATIC_PROJECT_TOKEN_SB7" \
    --storybook-build-dir ./storybook-static/ \
    --branch-name "$PREVIEW_BRANCH" \
    --exit-zero-on-changes \
    --diagnostics-file )

# ── 5. Notify Teams with the Chromatic build + published Storybook links ─────────────
log "Notifying Teams"
bash "${REPO_ROOT}/scripts/notify-teams.sh" \
  --diagnostics packages/storybook/chromatic-diagnostics.json \
  --title "🎨 Token preview ready — ${TRIGGER_SOURCE_BRANCH:-adhoc}" \
  --status Good \
  --text "Chromatic preview of in-progress design-tokens changes (not yet merged)." \
  --fact "Source=design-tokens / ${TRIGGER_SOURCE_BRANCH:-adhoc}" || true

log "Token preview complete."
