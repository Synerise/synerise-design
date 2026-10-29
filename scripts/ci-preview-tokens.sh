#!/usr/bin/env bash
#
# ci-preview-tokens.sh — build a Chromatic PREVIEW of how an in-progress design-tokens
# change looks, WITHOUT creating an MR. Run (manually) by the `preview_synerise_design` job
# in a design-tokens MR pipeline, from a read-only clone of this repo (ADR-0002 §7).
#
# Flow: toolchain → mirror the MR checkout's tokens into @synerise/ds-tokens → full build →
# build Storybook → run Chromatic on an isolated `token-preview/<branch>` branch, which never
# updates the baseline of the branch it was cloned from. Nothing is pushed, no MR.
#
# Env (set by the design-tokens job / its CI vars):
#   TOKENS_SRC_DIR              the design-tokens MR checkout whose tokens/ is mirrored (required)
#   TRIGGER_SOURCE_BRANCH       design-tokens MR source branch (used as the preview name)
#   TRIGGER_SOURCE_SHA          design-tokens commit being previewed (logged only)
#   SNR_NPM_REGISTRY_USERNAME   Nexus read credentials for pnpm install
#   SNR_NPM_REGISTRY_PASSWORD
#   CHROMATIC_PROJECT_TOKEN_SB7 Chromatic project token
#   TEAMS_TOKENS_WEBHOOK        Teams webhook for the "preview ready" card
#
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

log() { printf '\n\033[1;34m▸ %s\033[0m\n' "$*"; }

[[ -n "${TOKENS_SRC_DIR:-}" ]] || { echo "ERROR: TOKENS_SRC_DIR must point at the design-tokens checkout." >&2; exit 1; }

# ── 0. Toolchain — .install_pnpm plus the install job's Nexus auth, minus the GitLab cache dirs ──
# This runs in design-tokens' pipeline, which cannot !reference this repo's CI config. The pnpm
# version comes from package.json's packageManager, so there is no second pin to keep in step.
# .install_pnpm alone is not enough: only the install job fetches from Nexus, the rest install
# offline from the cache, so the _auth line below is the install job's, not .install_pnpm's.
[[ -n "${SNR_NPM_REGISTRY_USERNAME:-}" && -n "${SNR_NPM_REGISTRY_PASSWORD:-}" ]] ||
  { echo "ERROR: SNR_NPM_REGISTRY_USERNAME/PASSWORD must be set to install from Nexus." >&2; exit 1; }
PNPM_VERSION="$(node -p 'require("./package.json").packageManager.split("@")[1]')"
log "Installing pnpm@${PNPM_VERSION}"
npm install -g "pnpm@${PNPM_VERSION}"
export pnpm_config_strict_ssl=false
cp .npmrc.dist .npmrc
printf '\n//nexus.snrinternal.com/repository/npm-release/:_auth = %s\n' \
  "$(printf '%s:%s' "$SNR_NPM_REGISTRY_USERNAME" "$SNR_NPM_REGISTRY_PASSWORD" | base64 | tr -d '\n')" >> .npmrc

# ── 1. Mirror the MR checkout's tokens into the working tree (reuses the sync worker) ──
# TOKENS_SRC_DIR makes ci-sync-tokens.sh mirror that directory instead of cloning design-tokens.
log "Mirroring tokens from design-tokens@${TRIGGER_SOURCE_BRANCH:-?} (sha=${TRIGGER_SOURCE_SHA:-?})"
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

# ── 4. Chromatic on an isolated preview branch (never updates any baseline) ─────────
PREVIEW_BRANCH="token-preview/${TRIGGER_SOURCE_BRANCH:-adhoc}"
log "Publishing Chromatic preview (branch: ${PREVIEW_BRANCH})"
# The CLI reads CHROMATIC_PROJECT_TOKEN from the environment; --project-token would put the
# token in the process table.
( cd packages/storybook && export CHROMATIC_PROJECT_TOKEN="$CHROMATIC_PROJECT_TOKEN_SB7" && npx chromatic \
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
