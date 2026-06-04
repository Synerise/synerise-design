#!/usr/bin/env bash
#
# ci-sync-tokens.sh — mirror design tokens from the design-tokens repo into this
# monorepo's @synerise/ds-tokens package, then open/refresh a Merge Request whose
# pipeline publishes Storybook to Chromatic for visual review.
#
# Runs as the `sync_tokens` CI job (triggered by a merge in Frontend/design-tokens),
# but is fully runnable locally for testing via DRY_RUN / TOKENS_SRC_DIR.
#
# Flow: clone source @ SHA → mirror tokens/ (protecting repo-local files) →
#       diff-guard (exit if nothing changed) → build gate → force-push rolling
#       branch → create or refresh the rolling MR.
#
# Env (all optional unless noted):
#   TRIGGER_SOURCE_BRANCH   source branch to sync from           (default: main)
#   TRIGGER_SOURCE_SHA      exact source commit to checkout      (default: branch tip)
#   TOKENS_REPO             source repo path on the GitLab host  (default: Frontend/design-tokens)
#   GITLAB_HOST             GitLab host                          (default: gitlab.synerise.com)
#   TOKENS_REPO_READ_TOKEN  read token for cloning the source    (falls back to CI_JOB_TOKEN)
#   TOKENS_SRC_DIR          use an existing local clone instead of cloning (local testing)
#   PUSH_TOKEN              write + api token for project 1171   (required unless DRY_RUN)
#   CI_PROJECT_ID           target project id                    (default: 1171)
#   CI_API_V4_URL           GitLab API base                      (default: https://$GITLAB_HOST/api/v4)
#   SYNC_BRANCH             rolling branch name                  (default: sync/design-tokens)
#   DRY_RUN                 skip push + MR (mirror/build only)
#   SKIP_BUILD             skip the build gate (local dry-run only)
#
set -euo pipefail

# ── Config ────────────────────────────────────────────────────────────────────
GITLAB_HOST="${GITLAB_HOST:-gitlab.synerise.com}"
TOKENS_REPO="${TOKENS_REPO:-Frontend/design-tokens}"
TRIGGER_SOURCE_BRANCH="${TRIGGER_SOURCE_BRANCH:-main}"
TRIGGER_SOURCE_SHA="${TRIGGER_SOURCE_SHA:-}"
CI_PROJECT_ID="${CI_PROJECT_ID:-1171}"
CI_API_V4_URL="${CI_API_V4_URL:-https://${GITLAB_HOST}/api/v4}"
SYNC_BRANCH="${SYNC_BRANCH:-sync/design-tokens}"

REPO_ROOT="$(git rev-parse --show-toplevel)"
DST="${REPO_ROOT}/packages/tokens/tokens"

# Files that live only in this repo (phase-2 / locally maintained) and must NOT be
# deleted when mirroring the source, which doesn't contain them.
PROTECTED=(semantic/dimensions.json semantic/spacing.json modules/colors-only.json)

log() { printf '\n\033[1;34m▸ %s\033[0m\n' "$*"; }

# ── 1. Obtain the source token tree ────────────────────────────────────────────
if [[ -n "${TOKENS_SRC_DIR:-}" ]]; then
  log "Using local source tree: ${TOKENS_SRC_DIR}"
  SRC="${TOKENS_SRC_DIR%/}/tokens"
else
  CLONE_DIR="$(mktemp -d)"
  trap 'rm -rf "$CLONE_DIR"' EXIT
  CLONE_TOKEN="${TOKENS_REPO_READ_TOKEN:-${CI_JOB_TOKEN:-}}"
  CLONE_USER="oauth2"
  [[ -n "${TOKENS_REPO_READ_TOKEN:-}" ]] || CLONE_USER="gitlab-ci-token"
  if [[ -z "$CLONE_TOKEN" ]]; then
    echo "ERROR: no clone credential (set TOKENS_REPO_READ_TOKEN or run in CI with CI_JOB_TOKEN)." >&2
    exit 1
  fi
  log "Cloning ${TOKENS_REPO}@${TRIGGER_SOURCE_BRANCH} (sha=${TRIGGER_SOURCE_SHA:-tip})"
  git clone --depth 1 --branch "$TRIGGER_SOURCE_BRANCH" \
    "https://${CLONE_USER}:${CLONE_TOKEN}@${GITLAB_HOST}/${TOKENS_REPO}.git" "$CLONE_DIR"
  if [[ -n "$TRIGGER_SOURCE_SHA" ]]; then
    git -C "$CLONE_DIR" fetch --depth 1 origin "$TRIGGER_SOURCE_SHA"
    git -C "$CLONE_DIR" checkout --quiet "$TRIGGER_SOURCE_SHA"
  fi
  SRC="${CLONE_DIR}/tokens"
fi

[[ -d "$SRC" ]] || { echo "ERROR: source tokens/ not found at $SRC" >&2; exit 1; }
command -v rsync >/dev/null || { echo "ERROR: rsync not found in PATH" >&2; exit 1; }

# ── 2. Mirror tokens/ → packages/tokens/tokens/ (protecting repo-local files) ───
log "Mirroring tokens → ${DST}"
EXCLUDES=()
for f in "${PROTECTED[@]}"; do EXCLUDES+=(--exclude "$f"); done
# --delete mirrors upstream removals; excluded files are never deleted by rsync.
rsync -a --delete "${EXCLUDES[@]}" "${SRC}/" "${DST}/"

# ── 3. Diff-guard — exit cleanly if nothing actually changed ────────────────────
cd "$REPO_ROOT"
git add packages/tokens/tokens
if git diff --cached --quiet -- packages/tokens/tokens; then
  log "No token changes after sync — nothing to do."
  exit 0
fi
log "Token changes detected:"
git diff --cached --stat -- packages/tokens/tokens

# ── 4. Build gate — never push a branch that can't build ────────────────────────
if [[ -z "${SKIP_BUILD:-}" ]]; then
  log "Build gate: rebuilding @synerise/ds-tokens"
  pnpm install --frozen-lockfile --filter "@synerise/ds-tokens..."
  pnpm --filter "@synerise/ds-tokens" build
else
  log "SKIP_BUILD set — skipping build gate"
fi

SHORT_SHA="${TRIGGER_SOURCE_SHA:0:8}"
[[ -n "$SHORT_SHA" ]] || SHORT_SHA="$(date -u +%Y%m%d)"
TITLE="chore(tokens): sync from design-tokens@${SHORT_SHA}"
DESCRIPTION="Automated token sync from ${TOKENS_REPO}@${TRIGGER_SOURCE_SHA:-${TRIGGER_SOURCE_BRANCH}}.

- Review the **Chromatic** diff on this MR before merging.
- Do **not** retitle the squash commit to \`build: publish\` — publishing is a separate, deliberate release step.

_Generated by ci-sync-tokens.sh._"

if [[ -n "${DRY_RUN:-}" ]]; then
  log "DRY_RUN set — skipping branch push + MR. Staged diff above is the result."
  exit 0
fi

# ── 5. Force-push the rolling branch (skip the redundant branch pipeline) ────────
[[ -n "${PUSH_TOKEN:-}" ]] || { echo "ERROR: PUSH_TOKEN required to push + open MR." >&2; exit 1; }
# Target repo derived from CI env, with fallbacks for local runs.
TARGET_HOST="${CI_SERVER_HOST:-$GITLAB_HOST}"
TARGET_PATH="${CI_PROJECT_PATH:-Frontend/synerise-design}"
PROJECT_URL="${CI_PROJECT_URL:-https://${TARGET_HOST}/${TARGET_PATH}}"
log "Committing + force-pushing ${SYNC_BRANCH}"
git config user.name "ds-tokens-sync-bot"
git config user.email "ds-bot@synerise.com"
git checkout -B "$SYNC_BRANCH"
git commit --quiet -m "$TITLE"
git push -f -o ci.skip \
  "https://oauth2:${PUSH_TOKEN}@${TARGET_HOST}/${TARGET_PATH}.git" "HEAD:${SYNC_BRANCH}"

# ── 6. Create or refresh the rolling MR ─────────────────────────────────────────
api() { curl -sf --header "PRIVATE-TOKEN: ${PUSH_TOKEN}" "$@"; }
# Extract the iid of an existing open MR for the rolling branch (parse with node, no jq).
EXISTING_IID="$(
  api "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests?source_branch=${SYNC_BRANCH}&state=opened" \
    | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const a=JSON.parse(d||"[]");process.stdout.write(a[0]?String(a[0].iid):"")})'
)"

if [[ -n "$EXISTING_IID" ]]; then
  log "Refreshing existing MR !${EXISTING_IID}"
  api -X PUT "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests/${EXISTING_IID}" \
    --data-urlencode "title=${TITLE}" \
    --data-urlencode "description=${DESCRIPTION}" >/dev/null
  echo "Updated: ${PROJECT_URL}/-/merge_requests/${EXISTING_IID}"
else
  log "Creating new rolling MR"
  api -X POST "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests" \
    --data "source_branch=${SYNC_BRANCH}" \
    --data "target_branch=master" \
    --data-urlencode "title=${TITLE}" \
    --data-urlencode "description=${DESCRIPTION}" \
    --data "squash=true" \
    --data "remove_source_branch=true" \
    | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=JSON.parse(d);console.log("Created:",m.web_url||("!"+m.iid))})'
fi

log "Token sync complete."
