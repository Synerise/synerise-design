# Token sync automation

How design token changes flow from the **design-tokens** repo into `@synerise/ds-tokens`
and onto a Chromatic-reviewed Merge Request — automatically.

> **Why** the flow is shaped this way — and the trigger-token decision below — is recorded in
> [`docs/adr/0002-design-token-sync-flow.md`](../../docs/adr/0002-design-token-sync-flow.md).
> This file is the operational runbook (how to set up, run, verify).

```
design-tokens (Frontend/design-tokens)            synerise-design (Frontend/synerise-design, id 1171)
─────────────────────────────────────            ───────────────────────────────────────────────────
merge to main (tokens/** changed)
   │  CI: trigger_synerise_design  ──────────►  triggered pipeline ($CI_PIPELINE_SOURCE == "trigger")
   │  (pipeline trigger token, no variables)        └─ sync_tokens job → scripts/ci-sync-tokens.sh
                                                        1. clone design-tokens@main's tip
                                                           (one sync at a time: resource_group)
                                                        2. mirror tokens/ → packages/tokens/tokens/
                                                        3. diff-guard (nothing changed: close a
                                                           still-open rolling MR, then exit)
                                                        4. build gate (pnpm --filter ds-tokens build,
                                                           refusing unsafe CSS values)
                                                        5. force-push rolling branch  chore/design-tokens-sync
                                                        6. create/refresh the rolling MR (API)
                                                              ▼
                                                  MR pipeline ($CI_PIPELINE_SOURCE == "merge_request_event")
                                                      check_tokens_sync_scope, build_packages → chromatic_publish
                                                              ▼
                                                  human reviews Chromatic diff → merges
                                                              ▼
                                                  (later) release: lerna version → "build: publish" → npm
```

Design decisions: canonical source branch is **`main`**; automation is **merge-triggered in CI**
via a **bot-owned pipeline trigger token** (so any merge fires the sync regardless of who merges —
see ADR-0002 §6); the sync MR does **not** bump the package version (versioning stays with the
existing `build: publish` release flow); **one rolling MR** (`chore/design-tokens-sync`) is
force-updated per change.

---

## Moving parts in this repo (already implemented)

| File | Role |
|------|------|
| `packages/tokens/config/build-tokens.mjs` | Derives the color/opacity/shadow subset from `modules/base.json` in-memory and **prunes unresolvable references to a fixpoint** — so a token sync needs no hand-maintained `colors-only.json`, and a partial/ drifted upstream never hard-fails the build (broken tokens surface as absent vars in the Chromatic diff; a warning lists how many were pruned). Base sources (`dimensions`/`spacing`) are existence-tolerant. Asserts non-empty `--ds-color-` output, and **fails on unsafe output**: a name outside `--ds-[a-z0-9-]+`, or a value that could inject CSS (`unsafeDeclarations` / `unsafeTokenValues` in `token-transforms.mjs`, ADR-0002 §5). |
| `scripts/ci-sync-tokens.sh` | The CI sync worker (clone main's tip → mirror → diff-guard, closing a stale MR → build gate → push → MR). Runnable locally with `DRY_RUN=1` / `TOKENS_SRC_DIR=…`. |
| `.gitlab-ci.yml` → `sync_tokens` job | Runs `ci-sync-tokens.sh` only on the trigger pipeline (`$CI_PIPELINE_SOURCE == "trigger"`; the trigger sends no variables, ADR-0002 §6). |
| `.gitlab-ci.yml` → `check_tokens_sync_scope` job | Fails the sync MR's pipeline when the MR changes anything outside `packages/tokens/tokens/` (ADR-0002 §9). |
| `scripts/ci-preview-tokens.sh` | The MR-time preview, run from `design-tokens`' `preview_synerise_design` job in a read-only clone of this repo (ADR-0002 §7): toolchain → mirror the MR checkout (`TOKENS_SRC_DIR`) → build → Storybook → Chromatic on `token-preview/<branch>` → Teams. |
| `scripts/test-ci-sync-tokens.sh` | Local harness: runs the worker against scratch repos and a stub MR API with fake tokens, and fails if a token reaches argv, `ps`, `GIT_TRACE` or the job output. |
| `packages/tokens/scripts/sync-tokens.sh` | Local `pnpm sync` — mirrors `design-tokens@main` over your SSH auth (no token), preserving the repo-local phase-2 files. |

The mirror (a small Node copy — no `rsync`/`curl`/`jq` dependency) **protects**
`semantic/dimensions.json` and `semantic/spacing.json` (phase-2 files that exist here but not
upstream) from deletion.

---

## One-time setup (required before first run)

### A. design-tokens repo — canonicalize on `main` + add the trigger

Token content lives on `main`; `master` only carries the Secret-Detection template. Make `main`
the single source of truth:

1. **Project → Settings → Repository → Default branch → `main`.**
2. Add `.gitlab-ci.yml` **on `main`** combining Secret Detection (carried over from `master`) with
   the trigger job below. Retire `master` afterwards.
3. **CI/CD variables**
   - `DS_SYNC_TRIGGER_TOKEN` (masked + **protected**) — the bot-owned pipeline trigger token
     created in synerise-design (§B.1), for the main-branch sync. Mark `main` a **protected
     branch** so the protected variable is exposed to it. Never put a synerise-design trigger
     token in a non-protected variable: whoever can read it can run any synerise-design job with
     variables of their choosing (ADR-0002 §6).
   - For the MR preview (masked, **not** protected, because MR pipelines run on unprotected
     feature branches; none of them can write to synerise-design — ADR-0002 §7):
     - `DS_REPO_READ_TOKEN` — Project Access Token on **synerise-design**, scope
       `read_repository` (Reporter), for the read-only clone.
     - `CHROMATIC_PROJECT_TOKEN_SB7` — the same Chromatic project token synerise-design uses.
     - `TEAMS_TOKENS_WEBHOOK` — the Teams webhook for the "preview ready" card.
     - `SNR_NPM_REGISTRY_USERNAME` / `SNR_NPM_REGISTRY_PASSWORD` — Nexus read credentials, unless
       they are already set at group level.

`-F 'token=<-'` reads the trigger token from stdin, so it never appears in curl's argv (see
[Credentials](#credentials)).

The sync fires via the **trigger API** (not the `trigger:` keyword) so the downstream pipeline is
created under the token owner's identity, not the merger's — any merge to `main` works regardless
of who performs it (ADR-0002 §6). Token-triggered pipelines have `CI_PIPELINE_SOURCE == "trigger"`,
which is all synerise-design needs to know: the request sends no variables, and synerise-design
refuses any (§B.4).
The preview triggers nothing: it runs in the `design-tokens` MR pipeline itself (ADR-0002 §7).

```yaml
# design-tokens/.gitlab-ci.yml  (on main)
stages:
  - test
  - secret-detection
  - downstream

variables:
  SECRET_DETECTION_ENABLED: 'true'

include:
  - template: Security/Secret-Detection.gitlab-ci.yml

secret_detection:
  stage: secret-detection

# Fire a sync pipeline in synerise-design whenever token JSON changes land on main.
trigger_synerise_design:
  stage: downstream
  image: curlimages/curl:latest
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      changes:
        paths: ["tokens/**/*"]          # ignore README/docs-only commits
  script:
    - |
      printf '%s' "$DS_SYNC_TRIGGER_TOKEN" | curl --fail-with-body -X POST \
        -F 'token=<-' \
        -F ref="master" \
        "https://gitlab.synerise.com/api/v4/projects/Frontend%2Fsynerise-design/trigger/pipeline"

# Manual: preview an in-progress token change in Chromatic from this MR (no MR/branch in DS).
# Runs here, in a read-only clone of synerise-design; the result shows on this MR, and the
# Chromatic + Storybook links also arrive via Teams (ci-preview-tokens.sh).
preview_synerise_design:
  stage: downstream
  image: docker.nexus.snrinternal.com/synerise/base-build-images:nodejs24
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual
  allow_failure: true
  variables:
    DS_REF: master
    KUBERNETES_CPU_REQUEST: 4
    KUBERNETES_MEMORY_REQUEST: 16Gi
    KUBERNETES_MEMORY_LIMIT: 22Gi
  script:
    - DS_DIR="$(mktemp -d)"
    # The read token reaches git as an Authorization header through GIT_CONFIG_* env vars, in a
    # subshell so no later step inherits it; never in argv or the remote URL.
    - |
      (
        export GIT_CONFIG_COUNT=1
        export GIT_CONFIG_KEY_0="http.https://gitlab.synerise.com/.extraHeader"
        export GIT_CONFIG_VALUE_0="Authorization: Basic $(printf 'oauth2:%s' "$DS_REPO_READ_TOKEN" | base64 | tr -d '\n')"
        git clone --filter=blob:none --single-branch --branch "$DS_REF" \
          https://gitlab.synerise.com/Frontend/synerise-design.git "$DS_DIR"
      )
    - cd "$DS_DIR"
    - |
      TOKENS_SRC_DIR="$CI_PROJECT_DIR" \
      TRIGGER_SOURCE_BRANCH="$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME" \
      TRIGGER_SOURCE_SHA="$CI_COMMIT_SHA" \
      bash scripts/ci-preview-tokens.sh
```

### B. synerise-design (project 1171) — create the trigger token + provide tokens

1. **Create the bot-owned pipeline trigger token** (sync only — the preview needs none). Trigger
   tokens are owned by whoever creates them and have no owner picker, so create it **as a bot** —
   not as a person who might leave, and whose access its pipelines would carry (ADR-0002 §6).
   Creating a trigger token needs the Maintainer role, and a project bot's role cannot be changed
   afterwards, not even through the API.
   1. **Settings → Access tokens**: add a Project Access Token for a bot of its own (not
      `PUSH_TOKEN`'s), role **Maintainer**, scope `api`, the longest expiry allowed. This creates a
      `project_1171_bot_…` user.
   2. Store it locally, without echo:
      `keychain-secret add ds-tokens-trigger-owner-pat --note "owns the design-tokens sync trigger"`.
   3. Mint the trigger token as the bot and write it straight into design-tokens'
      `DS_SYNC_TRIGGER_TOKEN` (§A.3). `EXPIRES` must be under a year away; GitLab rejects later
      dates. Expect two lines: the bot as `owner`, then the variable as protected and masked.

      ```bash
      # Your own Maintainer PAT (GL) and the bot's token (PAT) come from the Keychain; neither reaches
      # argv or the output. Nothing is written unless GitLab returns a trigger token.
      EXPIRES=2027-10-21 keychain-secret exec gitlab-synerise-pat GL -- \
        keychain-secret exec ds-tokens-trigger-owner-pat PAT -- bash -c '
          API=https://gitlab.synerise.com/api/v4
          h() { printf "header = \"PRIVATE-TOKEN: %s\"\n" "$1"; }
          resp=$(curl -sS --config <(h "$PAT") -X POST --form "description=design-tokens main sync (bot-owned)" \
            --form "expires_at=$EXPIRES" "$API/projects/1171/triggers")
          tok=$(jq -r ".token // empty" <<<"$resp")
          [ -n "$tok" ] || { echo "trigger not created: $(jq -c "del(.token)" <<<"$resp")" >&2; exit 1; }
          jq -c "{id, owner: .owner.username, expires_at}" <<<"$resp"
          printf "%s" "$tok" | curl -sS --config <(h "$GL") -X PUT --data-urlencode value@- \
            "$API/projects/2185/variables/DS_SYNC_TRIGGER_TOKEN" | jq -c "{key, protected, masked}"'
      ```

   4. Keep the bot's access token **active**, and rotate it before it expires (**Settings → Access
      tokens → Rotate**). Revoking it, or letting it expire, removes the bot after 30 days, and the
      trigger token stops working with it.

   This must be the project's only trigger token, since every `trigger` pipeline here runs a
   sync.
2. **Settings → CI/CD → Token Access (job-token allowlist)** → add `Frontend/design-tokens` (needed
   if the clone falls back to `CI_JOB_TOKEN`). *(Both triggers now use trigger tokens, not the
   `trigger:` keyword, so the allowlist is no longer required for triggering itself.)*
3. **CI/CD variables** (masked; group-level preferred so they're shared/rotatable):
   - `TOKENS_REPO_READ_TOKEN` — Project Access Token on **design-tokens**, scope `read_repository`
     (Reporter). Used to clone the source. *(Optional: omit and the script falls back to
     `CI_JOB_TOKEN`, which then also needs design-tokens' allowlist to include project 1171.)*
   - `PUSH_TOKEN` — Project Access Token on **synerise-design**, scopes `write_repository` + `api`
     (Developer). Used to push the rolling branch and create/refresh the MR. Mark it **protected**
     once the sync runs on the protected `master`; until then every MR pipeline can read it.
4. **Settings → CI/CD → Variables → Minimum role to use pipeline variables → No one allowed**, so
   the trigger cannot inject variables (ADR-0002 §6). Not *Maintainer*: the trigger's owner is a
   Maintainer bot. Verify with runbook step 7.
5. **Settings → Repository → Protected branches**: on `master`, require code-owner approval
   (`.gitlab/CODEOWNERS` owns CI, `scripts/` and `packages/tokens/`). Name at least two owners
   first: authors usually cannot approve their own MRs, so a sole owner's MRs to owned paths could
   never get code-owner approval. Optionally protect
   `chore/design-tokens-sync` with only the sync bot allowed to push and force-push (ADR-0002 §9).
6. **Operate → Environments → Protected environments**: protect `npm`, so `NPM_TOKEN` reaches only
   the release job.
7. Set expiry + rotation reminders on all tokens, including the trigger token and its bot's access
   token. Rotate the bot's token; never revoke it (§B.1).

### C. Migrating off the preview trigger token

Until ADR-0002 §7 was amended, the MR preview started a synerise-design pipeline with a second,
non-protected trigger token. Once:

1. Revoke the "MR preview" trigger token in synerise-design (**Settings → CI/CD → Pipeline trigger
   tokens**) and delete `DS_PREVIEW_TRIGGER_TOKEN` from design-tokens.
2. Rotate `PUSH_TOKEN` and `TOKENS_REPO_READ_TOKEN`: the old token could reach them. Check that
   `NPM_TOKEN` is scoped to the `npm` environment.
3. Add the preview variables in design-tokens (§A.3).
4. Land the synerise-design change before the design-tokens one: the new preview job runs
   `ci-preview-tokens.sh` from the cloned `DS_REF`.

### D. Migrating to the variable-free trigger

Until ADR-0002 §6 was amended, the trigger sent `SYNC_TOKENS` and the merged SHA as pipeline
variables, and `sync_tokens` required them. In order:

1. Land the synerise-design change on the trigger ref (`chore/tokenisation`, later `master`). Its
   `sync_tokens` rule needs only the `trigger` source, so the old trigger, variables and all, keeps
   working.
2. Land the design-tokens change that drops the variables from `trigger_synerise_design`.
3. Re-mint `DS_SYNC_TRIGGER_TOKEN` as a Maintainer bot's, with an expiry (§B.1); the command
   updates the variable in design-tokens. Once a sync has run through the new token, delete the old
   trigger token. Keep the bot's access token active.
4. Set the minimum role for pipeline variables (§B.4) and run verification step 7. Do this last:
   once set, a trigger that still sends variables is refused.
5. Protect the `npm` environment and require code-owner approval on `master` (§B.5–6).

### Credentials

GitLab masks CI variables in the job log only. The process table, `git remote -v` and git's own
error messages are not masked, so no token may appear in a command line or a remote URL:

- **git** — `ci-sync-tokens.sh`'s `git_auth` sends an `Authorization: Basic` header built from the
  token and passed through `GIT_CONFIG_COUNT` / `GIT_CONFIG_KEY_n` / `GIT_CONFIG_VALUE_n` env vars,
  scoped to `https://<host>/`. Remote URLs stay token-free. The header is sent up front, so a
  runner-provided credential helper is never consulted.
- **GitLab API** — the MR helper is Node `fetch`, which reads `PUSH_TOKEN` from its inherited
  environment. For any `curl`, put the header in a config read from stdin
  (`printf 'header = "PRIVATE-TOKEN: %s"\n' "$T" | curl -K - …`), never `-H "PRIVATE-TOKEN: $T"`.
- **Preview clone** — `design-tokens`' `preview_synerise_design` job sends `DS_REPO_READ_TOKEN`
  the same way, through `GIT_CONFIG_*` env vars set in a subshell around the clone only.
- **Chromatic** — `ci-preview-tokens.sh` exports `CHROMATIC_PROJECT_TOKEN` instead of passing
  `--project-token`.
- Both helpers in `ci-sync-tokens.sh` switch xtrace off while they touch a secret, so a `bash -x`
  run prints neither the token nor its base64 form.

---

## End-to-end behaviour

- **Trigger** fires only when `tokens/**` changes on `main`, and sends only the token and the ref.
  The sync clones `main`'s tip: one commit's tree.
- **One sync at a time, newest wins**: two quick merges start two sync pipelines, and run together
  the one that cloned the older tip could force-push last. `sync_tokens` therefore holds
  `resource_group: design-tokens-sync`, so syncs never overlap, and each clones the tip when it
  *runs*: a later sync always takes a tip at least as new as the one the previous sync pushed. The
  group's `unordered` process mode does not matter.
- **sync_tokens** runs *only* on the trigger pipeline. The trigger runs on the master ref, so every
  default-branch job (`install`, `build_packages`, `publish_packages`, `notify_release`,
  `build_storybook`, `deploy_storybook`, `chromatic_publish_baseline`) opts out first through
  `.skip_token_triggers`, which excludes the `trigger` source. A new default-branch job must do the
  same.
- **Diff-guard**: if the mirror produces no change to `packages/tokens/tokens`, nothing is pushed.
  That is not always a no-op: when upstream reverts a change (or it reached the target another
  way), the still-open rolling MR carries tokens `main` no longer has and is ready to merge. So the
  job looks up the open MR on `chore/design-tokens-sync`; if there is one, it comments why, closes
  it and deletes the branch (so it cannot be reopened and merged), then exits 0. With no open MR it
  just exits 0. The next token merge opens a fresh MR. `DRY_RUN` makes no API call and only logs
  that it would close.
- **Build gate**: rebuilds `@synerise/ds-tokens` before pushing; the non-empty-output assertion
  fails the job if the CSS would be empty, and the output check fails it on a value that could
  inject CSS (`;`, `}`, `url(`, `!important`, `</style>`, …), so neither branch is ever opened.
- **Scope check**: `check_tokens_sync_scope` fails the sync MR's pipeline when the MR changes
  anything outside `packages/tokens/tokens/`, for instance after someone pushed to the rolling
  branch. MRs need a passing pipeline, so that blocks the merge until the next sync force-pushes
  the branch.
- **Rolling MR**: a single `chore/design-tokens-sync` branch is force-pushed and its MR refreshed, so the
  reviewer always sees "current tokens vs the target branch" in one Chromatic thread. The MR targets
  the branch the sync ran on (`CI_COMMIT_REF_NAME`, override `SYNC_MR_TARGET_BRANCH`) — normally
  `master`, but **`chore/tokenisation` during the interim** while tokenisation is not yet in master
  (auto-reverts to `master` when the trigger ref does; the target is updated on existing MRs too).
  An MR targeting `chore/tokenisation` still runs the full MR pipeline incl. `chromatic_publish` —
  those jobs gate only on `merge_request_event`, and the token-sync specials key on the *source*
  branch (`chore/design-tokens-sync`), so neither depends on the target.
- **No premature publish**: the sync commit/MR title is `chore(tokens): sync …`, never
  `build: publish`, so merging it does not trigger `publish_packages`. The next normal release
  (`lerna version` → `build: publish`) picks up the changed package files and publishes.

---

## Local usage

```bash
cd packages/tokens
pnpm sync            # mirror design-tokens@main into ./tokens (uses your git SSH auth)
pnpm build           # regenerate dist/css + dist/js
```

Dry-run the full CI worker locally (mirror + build only, no push/MR):

```bash
DRY_RUN=1 TOKENS_SRC_DIR=/path/to/design-tokens bash scripts/ci-sync-tokens.sh
```

That stages the mirrored tokens in **your** checkout. To exercise the whole worker — clone, fetch,
push and MR API included — without touching your checkout or GitLab, run the harness. It builds a
scratch clone of this repo, a fake design-tokens repo, a bare push target and a stub MR API in a
temp dir, runs each scenario under `bash -x` with fake tokens, and fails if a token shows up in any
argv, `ps` sample, `GIT_TRACE` line or the output:

```bash
bash scripts/test-ci-sync-tokens.sh                               # the working-tree worker
SCRIPT=/tmp/old-ci-sync-tokens.sh bash scripts/test-ci-sync-tokens.sh   # any other version
```

---

## Verification runbook

1. **No-op trigger** — push a docs-only commit to `design-tokens@main`; confirm
   `trigger_synerise_design` does **not** run (blocked by `changes: tokens/**`).
2. **Real trigger** — change one color in `tokens/modules/base.json` on `main`; confirm the sync
   pipeline clones `main`'s tip, mirrors, builds, force-pushes `chore/design-tokens-sync`, and
   opens/refreshes the MR; then the MR's pipeline runs `check_tokens_sync_scope`, `build_packages` +
   `chromatic_publish`, and Chromatic shows the expected diff.
3. **Back-to-back merges** — merge two token changes to `main` within a minute; confirm the two
   `sync_tokens` jobs run one after the other (the second shows *waiting for resource*), and that
   the MR ends up titled with the second merge's SHA.
4. **Revert** — with the sync MR open, revert the token change on `main`; confirm the sync logs
   `No token changes after sync`, the MR gets a comment and is closed, and
   `chore/design-tokens-sync` is deleted.
5. **Idempotency** — re-run the same merge; confirm the MR is refreshed (not duplicated) and the
   branch is force-updated.
6. **Publish isolation** — merge the sync MR; confirm `publish_packages` does **not** fire (commit
   title isn't `build: publish`).
7. **Variables refused** — nobody can read `DS_SYNC_TRIGGER_TOKEN`, so probe with a throwaway
   trigger token of your own: *No one allowed* applies to every role, so it stands in for the bot's.
   The script creates it, sends one variable to `chore/tokenisation`, prints the result, and deletes
   it:

   ```bash
   keychain-secret exec gitlab-synerise-pat GL -- bash -c '
     API=https://gitlab.synerise.com/api/v4
     h() { printf "header = \"PRIVATE-TOKEN: %s\"\n" "$GL"; }
     t=$(curl -sS --config <(h) -X POST --form description=variables-probe \
       --form "expires_at=$(date -v+1d +%F)" "$API/projects/1171/triggers")
     id=$(jq -r .id <<<"$t")
     jq -j .token <<<"$t" | curl -sS -X POST -F "token=<-" -F ref=chore/tokenisation \
       -F "variables[PROBE]=1" "$API/projects/1171/trigger/pipeline" | jq -c "{pipeline_id: .id, message}"
     curl -sS -o /dev/null -w "probe trigger deleted: HTTP %{http_code}\n" --config <(h) \
       -X DELETE "$API/projects/1171/triggers/$id"'
   ```

   Expect `pipeline_id: null` with a permissions message. A `pipeline_id` means the setting does
   not cover trigger tokens: that pipeline is an ordinary sync, but the bot's trigger token is back
   to being as sensitive as ADR-0002 §6 describes before its amendment.
8. **Scope check** — push a commit touching a file outside `packages/tokens/tokens/` to
   `chore/design-tokens-sync`; confirm `check_tokens_sync_scope` fails and lists the file, then let
   the next sync (or a manual re-run of the last `sync_tokens`) force-push it away.
