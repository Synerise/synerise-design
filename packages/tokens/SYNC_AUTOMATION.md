# Token sync automation

How design token changes flow from the **design-tokens** repo into `@synerise/ds-tokens`
and onto a Chromatic-reviewed Merge Request — automatically.

```
design-tokens (Frontend/design-tokens)            synerise-design (Frontend/synerise-design, id 1171)
─────────────────────────────────────            ───────────────────────────────────────────────────
merge to main (tokens/** changed)
   │  CI: trigger_synerise_design  ──────────►  triggered pipeline ($CI_PIPELINE_SOURCE == "pipeline")
   │  (multi-project trigger + SHA)                 └─ sync_tokens job → scripts/ci-sync-tokens.sh
                                                        1. clone design-tokens @ SHA
                                                        2. mirror tokens/ → packages/tokens/tokens/
                                                        3. diff-guard (exit if nothing changed)
                                                        4. build gate (pnpm --filter ds-tokens build)
                                                        5. force-push rolling branch  sync/design-tokens
                                                        6. create/refresh the rolling MR (API)
                                                              ▼
                                                  MR pipeline ($CI_PIPELINE_SOURCE == "merge_request_event")
                                                      build_packages → chromatic_publish
                                                              ▼
                                                  human reviews Chromatic diff → merges
                                                              ▼
                                                  (later) release: lerna version → "build: publish" → npm
```

Design decisions: canonical source branch is **`main`**; automation is **merge-triggered in CI**;
the sync MR does **not** bump the package version (versioning stays with the existing
`build: publish` release flow); **one rolling MR** (`sync/design-tokens`) is force-updated per change.

---

## Moving parts in this repo (already implemented)

| File | Role |
|------|------|
| `packages/tokens/config/build-tokens.mjs` | Derives the color/opacity/shadow subset from `modules/base.json` in-memory and **prunes unresolvable references to a fixpoint** — so a token sync needs no hand-maintained `colors-only.json`, and a partial/ drifted upstream never hard-fails the build (broken tokens surface as absent vars in the Chromatic diff; a warning lists how many were pruned). Base sources (`dimensions`/`spacing`) are existence-tolerant. Asserts non-empty `--ds-color-` output. |
| `scripts/ci-sync-tokens.sh` | The CI sync worker (clone → mirror → diff-guard → build gate → push → MR). Runnable locally with `DRY_RUN=1` / `TOKENS_SRC_DIR=…`. |
| `.gitlab-ci.yml` → `sync_tokens` job | Runs `ci-sync-tokens.sh` only on the trigger pipeline (`$CI_PIPELINE_SOURCE == "pipeline" && $SYNC_TOKENS == "true"`). |
| `packages/tokens/scripts/sync-tokens.sh` | Local `pnpm sync` — mirrors `design-tokens@main` over your SSH auth (no token), preserving the repo-local phase-2 files. |

The mirror **protects** `semantic/dimensions.json` and `semantic/spacing.json` (phase-2 files
that exist here but not upstream) from `rsync --delete`.

---

## One-time setup (required before first run)

### A. design-tokens repo — canonicalize on `main` + add the trigger

Token content lives on `main`; `master` only carries the Secret-Detection template. Make `main`
the single source of truth:

1. **Project → Settings → Repository → Default branch → `main`.**
2. Add `.gitlab-ci.yml` **on `main`** combining Secret Detection (carried over from `master`) with
   the trigger job below. Retire `master` afterwards.

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
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      changes:
        paths: ["tokens/**/*"]          # ignore README/docs-only commits
  trigger:
    project: Frontend/synerise-design
    branch: master
    # strategy: depend                  # uncomment to mirror the sync result back here
  variables:
    SYNC_TOKENS: "true"
    TRIGGER_SOURCE_SHA: "$CI_COMMIT_SHA" # clone the exact merged state in synerise-design
    TRIGGER_SOURCE_PROJECT: "Frontend/design-tokens"
    TRIGGER_SOURCE_BRANCH: "main"
```

### B. synerise-design (project 1171) — allow the trigger + provide tokens

1. **Settings → CI/CD → Token Access (job-token allowlist)** → add `Frontend/design-tokens`
   (lets its `trigger:` start a pipeline here).
2. **CI/CD variables** (masked; group-level preferred so they're shared/rotatable):
   - `TOKENS_REPO_READ_TOKEN` — Project Access Token on **design-tokens**, scope `read_repository`
     (Reporter). Used to clone the source. *(Optional: omit and the script falls back to
     `CI_JOB_TOKEN`, which then also needs design-tokens' allowlist to include project 1171.)*
   - `PUSH_TOKEN` — Project Access Token on **synerise-design**, scopes `write_repository` + `api`
     (Developer). Used to push the rolling branch and create/refresh the MR.
3. Set expiry + rotation reminders on both tokens.

---

## End-to-end behaviour

- **Trigger** fires only when `tokens/**` changes on `main`; the merged SHA is passed downstream so
  the sync clones the exact state (no race if two merges land back-to-back).
- **sync_tokens** runs *only* on the trigger pipeline; the normal MR/master jobs are gated on
  `merge_request_event` / default-branch and are unaffected.
- **Diff-guard**: if the mirror produces no change to `packages/tokens/tokens`, the job exits 0 —
  no branch, no MR.
- **Build gate**: rebuilds `@synerise/ds-tokens` before pushing; the non-empty-output assertion
  fails the job if the CSS would be empty, so a broken branch is never opened.
- **Rolling MR**: a single `sync/design-tokens` branch is force-pushed and its MR refreshed, so the
  reviewer always sees "current tokens vs master" in one Chromatic thread.
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

---

## Verification runbook

1. **No-op trigger** — push a docs-only commit to `design-tokens@main`; confirm
   `trigger_synerise_design` does **not** run (blocked by `changes: tokens/**`).
2. **Real trigger** — change one color in `tokens/modules/base.json` on `main`; confirm the sync
   pipeline clones at the SHA, mirrors, builds, force-pushes `sync/design-tokens`, and opens/refreshes
   the MR; then the MR's pipeline runs `build_packages` + `chromatic_publish` and Chromatic shows the
   expected diff.
3. **Idempotency** — re-run the same merge; confirm the MR is refreshed (not duplicated) and the
   branch is force-updated.
4. **Publish isolation** — merge the sync MR; confirm `publish_packages` does **not** fire (commit
   title isn't `build: publish`).
