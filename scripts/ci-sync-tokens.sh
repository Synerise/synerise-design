#!/usr/bin/env bash
#
# ci-sync-tokens.sh — mirror design tokens from the design-tokens repo into this
# monorepo's @synerise/ds-tokens package, then open/refresh a Merge Request whose
# pipeline publishes Storybook to Chromatic for visual review.
#
# Runs as the `sync_tokens` CI job (triggered by a merge in Frontend/design-tokens),
# but is fully runnable locally for testing via DRY_RUN / TOKENS_SRC_DIR.
#
# Flow: clone the source branch tip → mirror tokens/ (protecting repo-local files) →
#       diff-guard (nothing changed: close a still-open rolling MR, exit) → build gate →
#       force-push rolling branch → create or refresh the rolling MR.
#
# Env (all optional unless noted):
#   TRIGGER_SOURCE_BRANCH   source branch to sync from           (default: main)
#   TOKENS_REPO             source repo path on the GitLab host  (default: Frontend/design-tokens)
#   GITLAB_HOST             GitLab host                          (default: gitlab.synerise.com)
#   TOKENS_REPO_READ_TOKEN  read token for cloning the source    (falls back to CI_JOB_TOKEN)
#   TOKENS_SRC_DIR          use an existing local clone instead of cloning (local testing)
#   PUSH_TOKEN              write + api token for project 1171   (required unless DRY_RUN)
#   CI_PROJECT_ID           target project id                    (default: 1171)
#   CI_API_V4_URL           GitLab API base                      (default: https://$GITLAB_HOST/api/v4)
#   SYNC_BRANCH             rolling branch name                  (default: chore/design-tokens-sync)
#   SYNC_MR_TARGET_BRANCH   target branch for the rolling MR     (default: $CI_COMMIT_REF_NAME, else master)
#   DRY_RUN                 skip push + MR API calls (mirror/build only)
#   SKIP_BUILD             skip the build gate (local dry-run only)
#
set -euo pipefail

# ── Config ────────────────────────────────────────────────────────────────────
GITLAB_HOST="${GITLAB_HOST:-gitlab.synerise.com}"
TOKENS_REPO="${TOKENS_REPO:-Frontend/design-tokens}"
TRIGGER_SOURCE_BRANCH="${TRIGGER_SOURCE_BRANCH:-main}"
CI_PROJECT_ID="${CI_PROJECT_ID:-1171}"
CI_API_V4_URL="${CI_API_V4_URL:-https://${GITLAB_HOST}/api/v4}"
# Must match the repo's branch-name policy: (feature|hotfix|bugfix|fix|chore|test|docs|
# refactor|renovate|dev|master|beta|release)/*
SYNC_BRANCH="${SYNC_BRANCH:-chore/design-tokens-sync}"
# Target branch for the rolling MR. Defaults to the ref this sync ran on (CI_COMMIT_REF_NAME),
# so the MR's diff is just the token commit. While tokenisation is not yet in master the trigger
# fires on chore/tokenisation, so the MR targets chore/tokenisation; once the trigger ref reverts
# to master this auto-targets master. Override with SYNC_MR_TARGET_BRANCH.
SYNC_MR_TARGET_BRANCH="${SYNC_MR_TARGET_BRANCH:-${CI_COMMIT_REF_NAME:-master}}"
# Target repo derived from CI env, with fallbacks for local runs.
TARGET_HOST="${CI_SERVER_HOST:-$GITLAB_HOST}"
TARGET_PATH="${CI_PROJECT_PATH:-Frontend/synerise-design}"
PROJECT_URL="${CI_PROJECT_URL:-https://${TARGET_HOST}/${TARGET_PATH}}"

REPO_ROOT="$(git rev-parse --show-toplevel)"
DST="${REPO_ROOT}/packages/tokens/tokens"

# Files that live only in this repo (phase-2 / locally maintained) and must NOT be
# deleted when mirroring the source, which doesn't contain them.
PROTECTED=(semantic/dimensions.json semantic/spacing.json)

log() { printf '\n\033[1;34m▸ %s\033[0m\n' "$*"; }

# Credentials never go into argv or a remote URL: GitLab masks job logs, not the process table,
# and git echoes remote URLs back in its errors. Both helpers take the *name* of the variable that
# holds the secret and switch xtrace off while they touch it, so a `bash -x` run cannot print it.

# True when the variable named $1 is set and non-empty.
secret_set() {
  { local xtrace="$-"; set +x; } 2>/dev/null
  local rc=1
  [[ -n "${!1:-}" ]] && rc=0
  [[ "$xtrace" == *x* ]] && set -x
  return "$rc"
}

# git_auth <host> <user> <secret-var> <git args…> — run git with an `Authorization: Basic` header
# for https://<host>/, passed through GIT_CONFIG_COUNT/KEY/VALUE env vars (appended to any the
# caller already set). The header is sent up front, so a runner's credential helper is never asked.
git_auth() {
  local host="$1" user="$2" secret_var="$3"
  shift 3
  (
    { set +x; } 2>/dev/null
    n="${GIT_CONFIG_COUNT:-0}"
    export GIT_CONFIG_COUNT="$((n + 1))"
    export "GIT_CONFIG_KEY_${n}=http.https://${host}/.extraHeader"
    export "GIT_CONFIG_VALUE_${n}=Authorization: Basic $(printf '%s:%s' "$user" "${!secret_var}" | base64 | tr -d '\n')"
    exec git "$@"
  )
}

require_push_token() {
  secret_set PUSH_TOKEN || { echo "ERROR: PUSH_TOKEN required to push and to open/close the MR." >&2; exit 1; }
  export PUSH_TOKEN
}

# mr_api upsert|close — create or refresh the rolling MR, or close it and delete its branch.
# Node fetch (no curl/jq dependency) reads PUSH_TOKEN from the environment it inherits; copying it
# into a prefix assignment here would print it under xtrace.
mr_api() {
  MR_ACTION="$1" MR_PROJECT_API="${CI_API_V4_URL}/projects/${CI_PROJECT_ID}" \
  MR_BRANCH="$SYNC_BRANCH" MR_TARGET="$SYNC_MR_TARGET_BRANCH" MR_TITLE="${TITLE:-}" \
  MR_DESC="${DESCRIPTION:-}" MR_NOTE="${CLOSE_NOTE:-}" MR_PROJECT_URL="$PROJECT_URL" node <<'NODE'
const base = process.env.MR_PROJECT_API;
const api = `${base}/merge_requests`;
const headers = { 'PRIVATE-TOKEN': process.env.PUSH_TOKEN, 'Content-Type': 'application/json' };
const branch = process.env.MR_BRANCH;
const target = process.env.MR_TARGET;
const body = { title: process.env.MR_TITLE, description: process.env.MR_DESC };
const mrUrl = (iid) => `${process.env.MR_PROJECT_URL}/-/merge_requests/${iid}`;

const close = async (iid) => {
  const note = await fetch(`${api}/${iid}/notes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ body: process.env.MR_NOTE }),
  });
  if (!note.ok) throw new Error(`comment on MR failed: ${note.status} ${await note.text()}`);
  const res = await fetch(`${api}/${iid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ state_event: 'close' }),
  });
  if (!res.ok) throw new Error(`close MR failed: ${res.status} ${await res.text()}`);
  // Without its branch the closed MR cannot be reopened and merged with the stale tokens.
  const del = await fetch(`${base}/repository/branches/${encodeURIComponent(branch)}`, {
    method: 'DELETE',
    headers,
  });
  if (!del.ok && del.status !== 404) {
    throw new Error(`delete branch failed: ${del.status} ${await del.text()}`);
  }
  console.log(`Closed: ${mrUrl(iid)} (deleted ${branch})`);
};

const main = async () => {
  const find = await fetch(
    `${api}?source_branch=${encodeURIComponent(branch)}&state=opened`,
    { headers },
  );
  if (!find.ok) throw new Error(`list MRs failed: ${find.status} ${await find.text()}`);
  const open = await find.json();

  if (process.env.MR_ACTION === 'close') {
    if (open[0]) await close(open[0].iid);
    else console.log('No open rolling MR — nothing to close.');
  } else if (open[0]) {
    const res = await fetch(`${api}/${open[0].iid}`, {
      method: 'PUT',
      headers,
      // include target_branch so an existing rolling MR is retargeted if the target changed
      // (e.g. master -> chore/tokenisation during the interim, or back again).
      body: JSON.stringify({ ...body, target_branch: target }),
    });
    if (!res.ok) throw new Error(`update MR failed: ${res.status} ${await res.text()}`);
    console.log(`Updated: ${mrUrl(open[0].iid)}`);
  } else {
    const res = await fetch(api, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...body,
        source_branch: branch,
        target_branch: target,
        squash: true,
        remove_source_branch: true,
      }),
    });
    if (!res.ok) throw new Error(`create MR failed: ${res.status} ${await res.text()}`);
    const mr = await res.json();
    console.log(`Created: ${mr.web_url || '!' + mr.iid}`);
  }
};
main().catch((e) => { console.error(String(e)); process.exit(1); });
NODE
}

# ── 1. Obtain the source token tree ────────────────────────────────────────────
if [[ -n "${TOKENS_SRC_DIR:-}" ]]; then
  log "Using local source tree: ${TOKENS_SRC_DIR}"
  SRC="${TOKENS_SRC_DIR%/}/tokens"
  SOURCE_SHA="$(git -C "$TOKENS_SRC_DIR" rev-parse HEAD 2>/dev/null || true)"
else
  CLONE_DIR="$(mktemp -d)"
  trap 'rm -rf "$CLONE_DIR"' EXIT
  if secret_set TOKENS_REPO_READ_TOKEN; then
    CLONE_SECRET_VAR="TOKENS_REPO_READ_TOKEN" CLONE_USER="oauth2"
  else
    CLONE_SECRET_VAR="CI_JOB_TOKEN" CLONE_USER="gitlab-ci-token"
  fi
  if ! secret_set "$CLONE_SECRET_VAR"; then
    echo "ERROR: no clone credential (set TOKENS_REPO_READ_TOKEN or run in CI with CI_JOB_TOKEN)." >&2
    exit 1
  fi
  # The trigger carries no variables (ADR-0002 §6), so the sync always takes the branch tip. Syncs
  # run one at a time (resource_group in .gitlab-ci.yml), so each clones a tip at least as new as
  # the one the previous sync pushed.
  log "Cloning ${TOKENS_REPO}@${TRIGGER_SOURCE_BRANCH}"
  git_auth "$GITLAB_HOST" "$CLONE_USER" "$CLONE_SECRET_VAR" clone --depth 1 \
    --branch "$TRIGGER_SOURCE_BRANCH" "https://${GITLAB_HOST}/${TOKENS_REPO}.git" "$CLONE_DIR"
  SOURCE_SHA="$(git -C "$CLONE_DIR" rev-parse HEAD)"
  SRC="${CLONE_DIR}/tokens"
fi

[[ -d "$SRC" ]] || { echo "ERROR: source tokens/ not found at $SRC" >&2; exit 1; }

# ── 2. Mirror tokens/ → packages/tokens/tokens/ (protecting repo-local files) ───
# Done in Node (guaranteed in the build image) rather than rsync (not installed):
# copy every source file, and delete DST files absent from SRC except the protected
# repo-local phase-2 files.
log "Mirroring tokens → ${DST}"
MIRROR_SRC="$SRC" MIRROR_DST="$DST" MIRROR_PROTECTED="$(printf '%s\n' "${PROTECTED[@]}")" node <<'NODE'
const fs = require('fs');
const path = require('path');
const SRC = process.env.MIRROR_SRC;
const DST = process.env.MIRROR_DST;
const protectedSet = new Set(process.env.MIRROR_PROTECTED.split('\n').filter(Boolean));

const walk = (dir, base = '') => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out;
};

const srcFiles = fs.existsSync(SRC) ? walk(SRC) : [];
const dstFiles = fs.existsSync(DST) ? walk(DST) : [];
const srcSet = new Set(srcFiles);

// Mirror upstream removals — but never delete the protected repo-local files.
for (const rel of dstFiles) {
  if (!srcSet.has(rel) && !protectedSet.has(rel)) fs.rmSync(path.join(DST, rel));
}
// Copy/overwrite every source file.
for (const rel of srcFiles) {
  const to = path.join(DST, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(path.join(SRC, rel), to);
}
console.log(`  mirrored ${srcFiles.length} file(s)`);
NODE

# MIRROR_ONLY: used by ci-preview-tokens.sh — mirror the tokens into the working tree and
# stop (no diff-guard / build / push / MR). The mirrored files persist for the caller.
if [[ -n "${MIRROR_ONLY:-}" ]]; then
  log "MIRROR_ONLY set — tokens mirrored, skipping diff-guard/build/push."
  exit 0
fi

SHORT_SHA="${SOURCE_SHA:0:8}"
[[ -n "$SHORT_SHA" ]] || SHORT_SHA="$(date -u +%Y%m%d)"

# ── 3. Diff-guard — nothing to push if the mirror equals the target ──────────────
# Equal is not always a no-op: if upstream reverted a change, or it reached the target some other
# way, a still-open rolling MR carries tokens main no longer has and is one click from merging
# them. Close it and delete its branch; the next token merge opens a fresh MR.
cd "$REPO_ROOT"
git add packages/tokens/tokens
if git diff --cached --quiet -- packages/tokens/tokens; then
  if [[ -n "${DRY_RUN:-}" ]]; then
    log "No token changes after sync. DRY_RUN set — would close the open rolling MR, if any."
    exit 0
  fi
  log "No token changes after sync — closing the rolling MR if one is still open."
  require_push_token
  CLOSE_NOTE="${TOKENS_REPO}@${SHORT_SHA} matches \`${SYNC_MR_TARGET_BRANCH}\` again, so the token \
changes in this MR are no longer upstream (reverted there, or already landed another way). Closing \
it and deleting \`${SYNC_BRANCH}\` so they cannot be merged by accident; the next token merge opens \
a fresh sync MR.

_Generated by ci-sync-tokens.sh._"
  mr_api close
  exit 0
fi
log "Token changes detected:"
git diff --cached --stat -- packages/tokens/tokens

# ── 4. Build gate — never push a branch that can't build ────────────────────────
if [[ -z "${SKIP_BUILD:-}" ]]; then
  log "Build gate: rebuilding @synerise/ds-tokens"
  # --ignore-scripts: skip the root postinstall (generate:vars/icons needs less-vars-to-js
  # and other workspace build deps the token build doesn't require).
  pnpm install --frozen-lockfile --filter "@synerise/ds-tokens..." --ignore-scripts
  pnpm --filter "@synerise/ds-tokens" build
else
  log "SKIP_BUILD set — skipping build gate"
fi

TITLE="chore(tokens): sync from design-tokens@${SHORT_SHA}"
DESCRIPTION="Automated token sync from ${TOKENS_REPO}@${SOURCE_SHA:-${TRIGGER_SOURCE_BRANCH}}.

- Review the **Chromatic** diff on this MR before merging.
- Do **not** retitle the squash commit to \`build: publish\` — publishing is a separate, deliberate release step.

_Generated by ci-sync-tokens.sh._"

if [[ -n "${DRY_RUN:-}" ]]; then
  log "DRY_RUN set — skipping branch push + MR. Staged diff above is the result."
  exit 0
fi

# ── 5. Force-push the rolling branch (skip the redundant branch pipeline) ────────
require_push_token
log "Committing + force-pushing ${SYNC_BRANCH}"
git config user.name "ds-tokens-sync-bot"
git config user.email "ds-bot@synerise.com"
git checkout -B "$SYNC_BRANCH"
git commit --quiet -m "$TITLE"
git_auth "$TARGET_HOST" oauth2 PUSH_TOKEN push -f -o ci.skip \
  "https://${TARGET_HOST}/${TARGET_PATH}.git" "HEAD:${SYNC_BRANCH}"

# ── 6. Create or refresh the rolling MR ──────────────────────────────────────────
log "Creating/refreshing rolling MR (target: ${SYNC_MR_TARGET_BRANCH})"
mr_api upsert

log "Token sync complete."
