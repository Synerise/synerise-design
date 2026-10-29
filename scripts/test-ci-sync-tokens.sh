#!/usr/bin/env bash
#
# test-ci-sync-tokens.sh — run ci-sync-tokens.sh end to end on this machine, without GitLab and
# without touching your working tree, and check that no credential ever reaches argv or output.
#
# Everything lives in a temp dir: a sparse scratch clone of this repo (the sync target), a bare
# "design-tokens" repo with a few commits, a bare push target, and a stub of the GitLab MR API.
# A throwaway global git config rewrites the fake host's URLs to those bare repos, so the script's
# own clone / fetch / push code runs unchanged. Every scenario runs under `bash -x` with fresh
# fake token values while
#   - shims for git, curl, node and base64 log each argv,
#   - GIT_TRACE logs every process git spawns (git-remote-https, upload-pack, …),
#   - a sampler logs `ps` every 50 ms,
# and fails if a token, or the base64 `user:token` form git_auth sends, appears in any of those
# logs or in the script's output.
#
# Usage:
#   bash scripts/test-ci-sync-tokens.sh            # test the working-tree script
#   SCRIPT=/path/to/ci-sync-tokens.sh bash scripts/test-ci-sync-tokens.sh
#   KEEP=1 bash scripts/test-ci-sync-tokens.sh     # keep the temp dir for inspection
#
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
SCRIPT="${SCRIPT:-${REPO_ROOT}/scripts/ci-sync-tokens.sh}"
[[ "$SCRIPT" == /* ]] || SCRIPT="${PWD}/${SCRIPT}"
[[ -f "$SCRIPT" ]] || { echo "ERROR: no script at $SCRIPT" >&2; exit 1; }

WORK="$(mktemp -d)"
API_PID="" PS_PID=""
cleanup() {
  [[ -n "$PS_PID" ]] && kill "$PS_PID" 2>/dev/null || true
  [[ -n "$API_PID" ]] && kill "$API_PID" 2>/dev/null || true
  if [[ -n "${KEEP:-}" ]]; then echo "kept: $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

HOST="gitlab.invalid"
SYNC_BRANCH="chore/design-tokens-sync"
REAL_NODE="$(command -v node)" ORIG_PATH="$PATH"
PASS=0 FAIL=0

# Isolate every git call from the user's config (signing, hooks, credential helpers).
GITCONFIG="${WORK}/gitconfig"
export GIT_CONFIG_NOSYSTEM=1 GIT_CONFIG_GLOBAL="$GITCONFIG"
cat > "$GITCONFIG" <<EOF
[user]
  name = sync-harness
  email = sync-harness@example.invalid
[init]
  defaultBranch = main
[advice]
  detachedHead = false
[url "file://${WORK}/design-tokens.git"]
  insteadOf = https://${HOST}/Frontend/design-tokens.git
[url "file://${WORK}/target.git"]
  insteadOf = https://${HOST}/Frontend/synerise-design.git
EOF

# ── Sync target: sparse scratch clone of this repo at HEAD ──────────────────────
TARGET_SHA="$(git -C "$REPO_ROOT" rev-parse HEAD)"
git clone --quiet --shared --no-checkout "$REPO_ROOT" "${WORK}/ds"
git -C "${WORK}/ds" sparse-checkout set --no-cone /packages/tokens/tokens/ /scripts/
git -C "${WORK}/ds" checkout --quiet --detach "$TARGET_SHA"
git init --quiet --bare "${WORK}/target.git"
git -C "${WORK}/target.git" config receive.advertisePushOptions true

# ── Source: design-tokens history ───────────────────────────────────────────────
#   SAME   tokens identical to the target's mirrored files (an upstream revert)
#   CHANGE SAME + one new token file
#   DOCS   CHANGE + a README edit (no token change, so upstream fires no sync for it)
#   NEWER  DOCS + a changed token value (a second token merge)
src="${WORK}/dt-work"
git init --quiet "$src"
mkdir -p "${src}/tokens"
cp -R "${WORK}/ds/packages/tokens/tokens/." "${src}/tokens/"
rm -f "${src}/tokens/semantic/dimensions.json" "${src}/tokens/semantic/spacing.json"
git -C "$src" add -A && git -C "$src" commit --quiet -m "same as target"
SAME="$(git -C "$src" rev-parse HEAD)"
printf '{ "harness": { "a": { "value": "#000001", "type": "color" } } }\n' > "${src}/tokens/zz-harness.json"
git -C "$src" add -A && git -C "$src" commit --quiet -m "change"
CHANGE="$(git -C "$src" rev-parse HEAD)"
echo "docs" > "${src}/README.md"
git -C "$src" add -A && git -C "$src" commit --quiet -m "docs only"
DOCS="$(git -C "$src" rev-parse HEAD)"
printf '{ "harness": { "a": { "value": "#000002", "type": "color" } } }\n' > "${src}/tokens/zz-harness.json"
git -C "$src" add -A && git -C "$src" commit --quiet -m "newer change"
NEWER="$(git -C "$src" rev-parse HEAD)"
git clone --quiet --bare "$src" "${WORK}/design-tokens.git"
git -C "${WORK}/design-tokens.git" config uploadpack.allowAnySHA1InWant true

# ── Stub GitLab MR API ──────────────────────────────────────────────────────────
# Logs one line per request: method, path, whether PRIVATE-TOKEN matched, body keys. The open MR
# list comes from $OPEN_MR_FILE so a scenario can say whether a rolling MR is already open.
cat > "${WORK}/api.js" <<'JS'
const http = require('http');
const fs = require('fs');
const { API_LOG, PORT_FILE, OPEN_MR_FILE, EXPECT_TOKEN } = process.env;
http.createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const token = req.headers['private-token'];
    const auth = token === undefined ? 'missing' : token === EXPECT_TOKEN ? 'ok' : 'bad';
    const body = raw ? JSON.parse(raw) : {};
    const fields = Object.entries(body)
      .filter(([k]) => k !== 'description' && k !== 'body')
      .map(([k, v]) => `${k}=${v}`).join(' ');
    fs.appendFileSync(API_LOG, `${req.method} ${req.url.split('?')[0]} auth=${auth} ${fields}\n`);
    const open = fs.readFileSync(OPEN_MR_FILE, 'utf8').trim();
    const json = (code, data) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); };
    if (req.method === 'GET' && req.url.includes('/merge_requests?')) return json(200, open ? [{ iid: Number(open) }] : []);
    if (req.method === 'POST' && req.url.endsWith('/merge_requests')) return json(201, { iid: 99, web_url: 'http://stub/!99' });
    if (req.method === 'DELETE') { res.writeHead(204); return res.end(); }
    return json(200, {});
  });
}).listen(0, '127.0.0.1', function () { fs.writeFileSync(PORT_FILE, String(this.address().port)); });
JS

# ── argv shims ──────────────────────────────────────────────────────────────────
mkdir -p "${WORK}/shims"
for tool in git curl node base64; do
  real="$(command -v "$tool" || true)"
  [[ -n "$real" ]] || continue
  cat > "${WORK}/shims/${tool}" <<EOF
#!/usr/bin/env bash
{ printf '%q ' "\$0" "\$@"; printf '\n'; } >> "\$ARGV_LOG"
exec "$real" "\$@"
EOF
  chmod +x "${WORK}/shims/${tool}"
done

# leaks <dir> <value…> — print "file:line" for every log line containing a value.
leaks() {
  local dir="$1"; shift
  local v
  for v in "$@"; do
    grep -rnF -- "$v" "$dir" 2>/dev/null | cut -d: -f1,2 | sed "s|^${dir}/||" || true
  done
}

# scenario <name> <source-main-tip> <open-mr-iid|""> <expected-exit> <env…>
# Runs the script once; sets $LAST to that scenario's log dir.
scenario() {
  local name="$1" main="$2" open="$3" want_rc="$4"; shift 4
  LAST="${WORK}/run-${name}"
  mkdir -p "${LAST}/logs"
  git -C "${WORK}/design-tokens.git" update-ref refs/heads/main "$main"
  printf '%s' "$open" > "${LAST}/open-mr"
  git -C "${WORK}/ds" checkout --quiet --force --detach "$TARGET_SHA"
  git -C "${WORK}/ds" clean --quiet -fdx -- packages/tokens
  cp "$SCRIPT" "${WORK}/ds/scripts/ci-sync-tokens.sh"

  local read_token="fake-read-$RANDOM$RANDOM$RANDOM" push_token="fake-push-$RANDOM$RANDOM$RANDOM"
  local job_token="fake-job-$RANDOM$RANDOM$RANDOM"

  API_LOG="${LAST}/api.log" PORT_FILE="${LAST}/port" OPEN_MR_FILE="${LAST}/open-mr" \
    EXPECT_TOKEN="$push_token" "$REAL_NODE" "${WORK}/api.js" &
  API_PID=$!
  until [[ -s "${LAST}/port" ]]; do sleep 0.05; done
  touch "${LAST}/api.log"

  ( while :; do ps -axww -o pid=,args= >> "${LAST}/logs/ps.log"; sleep 0.05; done ) &
  PS_PID=$!

  # A clean environment built with builtins only: `env -i TOKEN=…` would put the fake tokens in
  # env's own argv, which the ps sampler would then report.
  local rc=0
  (
    cd "${WORK}/ds"
    for v in $(compgen -e); do
      case "$v" in HOME | USER | LOGNAME | SHELL | TERM | TMPDIR | LANG) ;; *) unset "$v" ;; esac
    done
    export PATH="${WORK}/shims:${ORIG_PATH}" GIT_CONFIG_NOSYSTEM=1 GIT_CONFIG_GLOBAL="$GITCONFIG"
    export ARGV_LOG="${LAST}/logs/argv.log" GIT_TRACE="${LAST}/logs/git-trace.log"
    export GITLAB_HOST="$HOST" CI_API_V4_URL="http://127.0.0.1:$(cat "${LAST}/port")/api/v4"
    export TOKENS_REPO_READ_TOKEN="$read_token" CI_JOB_TOKEN="$job_token" PUSH_TOKEN="$push_token"
    export SKIP_BUILD=1
    for kv in "$@"; do export "${kv?}"; done
    exec bash -x scripts/ci-sync-tokens.sh
  ) > "${LAST}/logs/output.log" 2>&1 || rc=$?

  kill "$PS_PID" 2>/dev/null || true; wait "$PS_PID" 2>/dev/null || true; PS_PID=""
  kill "$API_PID" 2>/dev/null || true; wait "$API_PID" 2>/dev/null || true; API_PID=""

  local b64=() user v
  for user in oauth2 gitlab-ci-token; do
    for v in "$read_token" "$push_token" "$job_token"; do
      b64+=("$(printf '%s:%s' "$user" "$v" | base64 | tr -d '\n')")
    done
  done
  local found
  found="$(leaks "${LAST}/logs" "$read_token" "$push_token" "$job_token" "${b64[@]}")"

  local problems=()
  [[ "$rc" == "$want_rc" ]] || problems+=("exit $rc, expected $want_rc")
  [[ -z "$found" ]] || problems+=("token found in: $(echo "$found" | tr '\n' ' ')")
  SCENARIO_PROBLEMS=("${problems[@]+"${problems[@]}"}")
  SCENARIO_NAME="$name"
}

# expect <description> <command…> — record an extra assertion for the current scenario.
expect() {
  local what="$1"; shift
  "$@" >/dev/null 2>&1 || SCENARIO_PROBLEMS+=("$what")
}

report() {
  local argv_lines ps_samples
  argv_lines="$(grep -c . "${LAST}/logs/argv.log" 2>/dev/null || true)"
  ps_samples="$(grep -c . "${LAST}/logs/ps.log" 2>/dev/null || true)"
  if (( ${#SCENARIO_PROBLEMS[@]} == 0 )); then
    PASS=$((PASS + 1))
    printf '  ok    %-22s (%s argv lines, %s ps lines scanned)\n' "$SCENARIO_NAME" "$argv_lines" "$ps_samples"
  else
    FAIL=$((FAIL + 1))
    printf '  FAIL  %-22s\n' "$SCENARIO_NAME"
    printf '          - %s\n' "${SCENARIO_PROBLEMS[@]}"
    printf '          log: %s\n' "${LAST}/logs/output.log"
  fi
}

in_output() { grep -qF -- "$1" "${LAST}/logs/output.log"; }
api_has() { grep -qE -- "$1" "${LAST}/api.log"; }
api_empty() { [[ ! -s "${LAST}/api.log" ]]; }
pushed() { git -C "${WORK}/target.git" rev-parse --verify --quiet "refs/heads/${SYNC_BRANCH}"; }
not_pushed() { ! pushed; }
drop_pushed() { git -C "${WORK}/target.git" update-ref -d "refs/heads/${SYNC_BRANCH}" 2>/dev/null || true; }

echo "Testing $SCRIPT"

drop_pushed
scenario dry-run "$CHANGE" "" 0 DRY_RUN=1
expect "no DRY_RUN stop" in_output "DRY_RUN set"
expect "API was called" api_empty
expect "branch was pushed" not_pushed
report

drop_pushed
scenario create-mr "$CHANGE" "" 0
expect "branch not pushed" pushed
expect "no authenticated MR create" api_has '^POST /api/v4/projects/1171/merge_requests auth=ok'
report

scenario refresh-mr "$CHANGE" 7 0
expect "no authenticated MR update" api_has '^PUT /api/v4/projects/1171/merge_requests/7 auth=ok'
expect "MR created twice" bash -c "! grep -q '^POST' '${LAST}/api.log'"
report

# A second token merge: the sync takes main's tip, whichever merge triggered it.
scenario syncs-tip "$NEWER" 7 0
expect "did not sync the tip" bash -c "git -C '${WORK}/target.git' log -1 --format=%s '${SYNC_BRANCH}' | grep -qF '${NEWER:0:8}'"
expect "no authenticated MR update" api_has '^PUT /api/v4/projects/1171/merge_requests/7 auth=ok'
report

scenario docs-only-tip "$DOCS" "" 0 DRY_RUN=1
expect "a docs-only tip stopped the sync" in_output "DRY_RUN set"
report

# Upstream reverted: the mirror equals the target again.
scenario revert-closes-mr "$SAME" 7 0
expect "no authenticated note" api_has '^POST /api/v4/projects/1171/merge_requests/7/notes auth=ok'
expect "no authenticated close" api_has '^PUT /api/v4/projects/1171/merge_requests/7 auth=ok state_event=close'
expect "no branch delete" api_has '^DELETE /api/v4/projects/1171/repository/branches/chore%2Fdesign-tokens-sync auth=ok'
expect "pushed anyway" bash -c "! grep -q 'force-pushing' '${LAST}/logs/output.log'"
report

scenario revert-no-mr "$SAME" "" 0
expect "MR changed with none open" bash -c "! grep -qE '^(PUT|POST|DELETE)' '${LAST}/api.log'"
expect "no 'nothing to close'" in_output "nothing to close"
report

scenario revert-dry-run "$SAME" 7 0 DRY_RUN=1
expect "no DRY_RUN note" in_output "would close the open rolling MR"
expect "API was called" api_empty
report

drop_pushed
scenario clone-fails "$CHANGE" "" 128 TOKENS_REPO=Frontend/missing
expect "no clone error in output" in_output "Frontend/missing"
report

echo
echo "${PASS} passed, ${FAIL} failed"
(( FAIL == 0 ))
