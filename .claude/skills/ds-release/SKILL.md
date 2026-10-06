---
name: ds-release
description: End-to-end DS release — publish bumped packages with lerna, generate a changelog from GitLab MRs, create a GitLab release, post a two-audience release changelog to the Teams releases channel, optionally open DS-upgrade branches/MRs in the portal-ui-bridge and portal-next consumer repos, and optionally deploy the built apps to an environment
disable-model-invocation: true
---

## Credentials

This skill needs four **capabilities**, not four specific environment variables. One token often covers
several rows — a personal `api`-scoped PAT satisfies read, write and cross-project MR creation.

| Capability | Needed for | Minimum scope |
|---|---|---|
| **GitLab read** | MR lookups, pipeline/job status, job traces | `read_api` on `gitlab.synerise.com` |
| **GitLab write** | GitLab release (Phase 2), consumer MRs (Phase 3), playing manual deploy jobs (Phase 4) | `api`, Developer+ on **each** project touched |
| **puib pipeline trigger** | triggering the bridge-app build (Phase 3) | project **pipeline trigger token** (`glptt-…`) on project 1098 |
| **Teams webhook** | posting the release card (Phase 2) | Power Automate incoming webhook URL |

⚠️ **A project access token is not enough for the consumer repos.** `project_<id>_bot` tokens are scoped
to the project that issued them and return `403` everywhere else, so a synerise-design bot token cannot
create an MR in portal-ui-bridge, portal-next or portal-ui. Cross-project writes need the user's
**personal** `api` PAT. A `read_api` token cannot create releases, MRs, or play jobs.

### Where tokens live

Tokens may be stored in any of these. Resolve them in this order and **never print a value**:

1. **macOS Keychain via `keychain-secret`** (preferred — see the workspace `CLAUDE.md`). The registry
   holds names and notes only:

   ```bash
   keychain-secret list                                   # names + notes, no values
   keychain-secret exec <name> <ENVVAR> -- <command>      # injects into one child process
   ```

   `keychain-secret` lives in `~/.local/bin`, which is often not on the PATH in this shell — prepend
   `export PATH="$HOME/.local/bin:$PATH"`. **Never use `keychain-secret get`**; it refuses to run inside
   a Claude session by design.

   ⚠️ **`keychain-secret list` omits some real secrets, and `exec` on them fails intermittently** with
   `✗ no such secret: '<name>'` even though the Keychain item exists. Never conclude a secret is missing
   from one failure. Confirm the item independently, then retry `exec` a few times:

   ```bash
   security find-generic-password -s <name> >/dev/null 2>&1 && echo "item exists"   # never prints a value
   for i in 1 2 3 4 5; do out=$(keychain-secret exec <name> VAR -- <cmd> 2>&1) && break; done
   ``` Because `exec` injects into a child process, build the whole API call
   inside that child:

   ```bash
   export PATH="$HOME/.local/bin:$PATH"
   keychain-secret exec gitlab-synerise-pat GLTOK -- bash -c '
     curl -sS -H "PRIVATE-TOKEN: $GLTOK" "https://gitlab.synerise.com/api/v4/..."'
   ```

2. **Already-exported environment variables** — check with a presence test, never an echo:

   ```bash
   for v in GITLAB_TOKEN GITLAB_WRITE_TOKEN GITLAB_PERSONAL_TOKEN \
            GITLAB_PIPELINE_TRIGGER_TOKEN TEAMS_RELEASES_WEBHOOK; do
     printenv "$v" >/dev/null && echo "$v: SET" || echo "$v: MISSING"
   done   # printenv, not ${!v}/${(P)v} — those differ between bash and zsh
   ```

3. **The user's shell profile**, if the variables are defined there but not exported into this shell —
   `source ~/.zshrc 2>/dev/null` (or `~/.zshenv` / `~/.zprofile`) at the start of the same command.
   Note this frequently fails under sandboxing; treat it as a fallback, not the default.

4. **CI variables** — `TEAMS_RELEASES_WEBHOOK` also exists in CI. A local run has no access to it, so
   the Teams post may only be possible from the pipeline (see Phase 2).

### Skill config

Cache **where** each token lives — never the value — in `.claude/skills/ds-release/config.json`:

```json
{
  "updated": "2026-09-08",
  "tokens": {
    "gitlab_read":   { "source": "keychain", "name": "gitlab-synerise-pat" },
    "gitlab_write":  { "source": "keychain", "name": "gitlab-synerise-pat" },
    "gitlab_mr":     { "source": "keychain", "name": "gitlab-synerise-pat" },
    "puib_trigger":  { "source": "keychain", "name": "gitlab-trigger-portal-ui-bridge" },
    "teams_webhook": { "source": "env",      "name": "TEAMS_RELEASES_WEBHOOK" }
  },
  "clones": {
    "portal-ui-bridge": "/Users/<you>/Work/portal-ui-bridge",
    "portal-next":      "/Users/<you>/Work/portal-next",
    "portal-ui":        "/Users/<you>/Work/portal-ui"
  }
}
```

**Treat the config as stale and re-ask when any of these is true:**

- the file does not exist, or a needed `tokens` entry is missing;
- a `keychain` entry names a secret absent from `keychain-secret list`, or an `env` entry names an unset
  variable;
- a `clones` path no longer exists, or its `origin` does not match the expected project;
- `updated` is more than 180 days old.

When stale, ask the user with `AskUserQuestion` **where to look** — offer the names found in
`keychain-secret list` as options, plus "an environment variable" and "I'll paste the name". Ask for the
secret's **name or location, never its value.** Then rewrite `config.json` with the answers and today's
date. If a capability genuinely has no token, skip only the steps that need it and say so in the report —
do not fail the whole run.

## Fixed facts

| Thing | Value |
|---|---|
| `Frontend/synerise-design` | project **1171** |
| `Frontend/portal-ui-bridge` (puib) | project **1098**, default `master`, **pnpm** / `pnpm-lock.yaml` |
| `Frontend/portal-next` | project **1244**, default `master`, **yarn 1** / `yarn.lock` |
| `core/portal-ui` (deployment shell) | project **793** |
| Publish registry | public npm (by CI) |
| Consumer install registry | `https://nexus.snrinternal.com/repository/npm-release` |

**Registry gate:** consumers install from Nexus, which *proxies* npm and lags behind it — sometimes by
package, not just in bulk. Any "is it published yet?" check must query **Nexus**, not npm.

**No Jira.** The workspace `CLAUDE.md` forbids Jira access from Claude — no REST calls, no MCP, no browser
automation, and no credential is stored for it. This skill creates **no Jira ticket**. Where an MR
description carries a `STOR-NNNN` id, carry it through to the changelog as **plain reference text**; never
fetch it. If the user wants a Jira record, produce Markdown for them to paste.

**Package managers differ per consumer and have changed before** (puib moved yarn → pnpm). Treat the
table as a hint and confirm from `packageManager` and the lockfile on disk — see Step 12.

**Locating clones.** Confirm each clone's remote before operating on it
(`git -C <clone> remote get-url origin`). Several clones and worktrees of the same repo commonly exist —
see *Picking a working copy* in Phase 3.

## Workflow

- **Step 0** — ask everything up front
- **Phase 1** (Steps 1–2) — bump and publish
- **Phase 2** (Steps 3–9) — changelog, GitLab release, Teams card
- **Phase 3** (Steps 10–13) — *optional* — DS-upgrade branches/MRs in the consumer repos
- **Phase 4** (Steps 14–17) — *optional* — deploy the built apps to an environment
- **Step 18** — report

Phases 3 and 4 run only if Step 0 opted into them.

---

## Step 0 — Plan the run

Resolve credentials and the skill config first (above), then ask **all** run parameters in one
`AskUserQuestion` call so the rest of the run is uninterrupted:

1. **Which consumer repos should get a DS-upgrade branch?** `portal-ui-bridge (puib)` · `portal-next` ·
   both · none. Multi-select. "None" skips Phases 3 and 4.
2. **Are implementation changes required before updating?** `Yes` / `No`. Decides whether Phase 3 ends
   with a commit+MR or leaves the branch uncommitted.
3. **Deploy the built apps to an environment?** Ask **per selected repo**; this drives Phase 4.
   - **puib** → which **portal-ui** env branch: `env-test-a` … `env-test-n` (canary), `canary-alpha`,
     `canary-beta`, `canary`, `qa-ds`, `qa-ds2`, `qa-ds3`, `dev-ds`, or none. Canary envs additionally
     need a deploy tag and a manual GitOps job; the `qa-*`/`dev-*` branches deploy on push.
   - **portal-next** → create a `-test.N` tag from the release branch and monitor its pipeline? Yes/No.
4. **Has the manual `k8s-prod-gitops` (g001-misc1) job been played?** Gates whether the Teams card carries
   the stale-Storybook caveat (Step 9). Ask only if you will post to Teams.

Deploying is outward-facing and touches shared QA environments — the answers here are the authorization
for Phase 4. Confirm the publish itself separately in Step 2.

---

## Phase 1 — Publish

### Step 1 — Switch to master and pull

The release must be cut from an up-to-date `master` (lerna's `allowBranch` permits only `master`,
`beta/*`, `chore/pnpm`):

```bash
git checkout master
git pull --ff-only
```

If the tree is dirty or the pull is not a clean fast-forward, **stop** and report — do not resolve it
automatically. `lerna version` refuses to run with uncommitted changes.

The commonest dirty tree is **this skill's own files** (`.claude/skills/ds-release/`), edited in the same
worktree you are releasing from. Offer to park them rather than committing them into the release: copy
both to the scratchpad, `git checkout --` the tracked one, move the untracked one aside, release, then
copy them back once `build: publish` has landed. Never use bare `git stash` — the stash stack is shared
with every other worktree and session.

**In a fresh git worktree** `node_modules` is usually absent and the root `postinstall` (which runs
`pnpm run generate` for core theme variables and SVGR output) has not run. `lerna` will not exist. Run
`pnpm install --frozen-lockfile` first — `--frozen-lockfile` so the release cannot silently rewrite
`pnpm-lock.yaml` — and confirm `git status` is still clean afterwards.

### Step 2 — Bump versions and publish

This is an outward-facing, irreversible write: it commits `build: publish` to `master`, tags every bumped
package, pushes, and triggers the npm publish in CI. **Always confirm with the user before running it**,
even if other writes were authorized earlier in the session.

Preview first:

```bash
git fetch origin master
git log --oneline $(git describe --tags --abbrev=0 --match "@synerise/design-system@*")..HEAD
```

Summarize the merged MRs, then ask. Flag anything the user should weigh before the point of no return —
in particular **breaking changes shipping as patch bumps** (the DS is deliberately not strict SemVer, and
the angular preset gives `refactor`/`fix`/`perf` a patch and only `feat` a minor), and any **companion MR
in another repo that must land alongside** (e.g. `testsqa/ui-tests-playwright` selector updates).

On confirmation:

```bash
SKIP_RELEASE_GUARD=1 pnpm lerna:version --yes
```

A Node version below the repo's `engines` (`^24`) surfaces only as a pnpm `WARN Unsupported engine` and
does not block the release — publishing happens in CI. Note it in the report; do not switch Node mid-run.

`pnpm lerna:version` runs `scripts/release-preflight.sh` then `lerna version --conventional-commits`. The
preflight is an interactive nudge for people invoking it directly; `SKIP_RELEASE_GUARD=1` bypasses it
here. `--yes` skips the confirmation prompt (you already have the user's). Verify before continuing:

```bash
git log --oneline -1                                        # expect "build: publish"
git tag --points-at HEAD | grep "@synerise/design-system@"  # the release target
git status -sb | head -1                                    # confirm pushed
```

If lerna reports "no changed packages to version", there is nothing to release — stop and tell the user.

---

## Phase 2 — Changelog & Release

### Step 3 — Identify the commit range

```bash
git log --oneline --grep="build: publish" -2
```

The range is `<older-publish>..<newer-publish>`. Capture the new meta-package version for the release:

```bash
git log <newer-publish> -1 --format="%B" | grep -oE "@synerise/design-system@[0-9]+\.[0-9]+\.[0-9]+"
```

A `build: publish` body lists every bumped package as `- @synerise/<pkg>@<version>`, and a matching git
tag exists for each.

### Step 4 — Collect merge requests

```bash
git log <older>..<newer> --merges --format="%H %s"
git log <merge-sha> -1 --format="%B"        # body carries "See merge request Frontend/synerise-design!NNNN"
```

### Step 5 — Fetch MR details

Use the `iids[]` query form — the path-based `/merge_requests/{iid}` endpoint returns 404:

```
GET https://gitlab.synerise.com/api/v4/projects/1171/merge_requests?iids[]={iid}
```

The response is an array; take the first element. Extract `title`, `description`, `author.name`. MR
descriptions are the richest source for the changelog — migration notes, breaking-change tables and
landing-order constraints usually live only there.

### Step 6 — Build the changelog

Group by component (the conventional-commit `scope`) and category: **Bug Fixes** (`fix`), **Features /
Improvements** (`feat`), **Refactors** (`refactor`). A release of only `refactor` commits still ships —
say so plainly rather than forcing entries into fix/feat buckets.

Per entry: a bold summary, what changed, the MR reference, and any `STOR-NNNN` as plain text.

**Always prefix MR references with the repo** — `synerise-design!3938`, not `!3938` — so they resolve when
pasted into another project.

Lead with a **⚠️ Breaking changes for consumers** section whenever behaviour changed, regardless of the
version bump. Reproduce the MR's migration table and any before/after selector diff verbatim; that is what
consumers and QA actually act on.

### Step 7 — Per-package version summary

New versions come from the publish commit body; old versions from `git show <newer>^:<pkg>/package.json`.
Map package name → directory by reading each `package.json` `name`.

```bash
git ls-tree -d --name-only HEAD packages/components/     # NOTE the trailing slash
```

⚠️ Without the trailing slash this lists only `packages/components` itself and every lookup silently
returns nothing — producing an empty "functional changes" set and bogus "major bump" flags.

Split **functional** bumps (packages with real source changes in the range) from
**dependency-driven cascade** bumps — most of a release is cascade. Flag any true major bump.

⚠️ **A plain `git diff --name-only <older> <newer> -- packages/components` is wrong here.** Both ends of
the range are `build: publish` commits, which rewrite every package's `package.json` and `CHANGELOG.md`.
Unfiltered, *every* package looks functional. Exclude the version files:

```bash
git diff --name-only <older> <newer> -- packages/components \
 | grep -vE '/(package\.json|CHANGELOG\.md)$' \
 | awk -F/ '{print $3}' | sort | uniq -c | sort -rn
```

A package can also be functional without a file of its own changing — an `ds-icon` fix that lives in the
root `vite.config.base.ts` changes what `ds-code-snippet` ships. Cross-check the non-package paths too:

```bash
git diff --name-only <older> <newer> -- . ':(exclude)packages/components'
```

Attribute bumps by **which files each commit touched**, not by its conventional-commit scope. lerna reads
the files: a commit titled `feat(list-item)` that also edits `select/` and `utils/` gives *those* packages
a minor bump too, which is why a release can show far more minors than it has `feat` commits.

```bash
git show --name-only --format="" <sha> | grep '^packages/components/' | awk -F/ '{print $3}' | sort -u
```

### Step 8 — Create the GitLab release

> Needs **GitLab write**. If unavailable, skip and note it in the report.

Target the tag the publish already created — do **not** create a tag. Two pre-flight checks (URL-encode
`/` as `%2F`):

```
GET /projects/1171/repository/tags/@synerise%2Fdesign-system@<version>   → expect 200
GET /projects/1171/releases/@synerise%2Fdesign-system@<version>          → expect 404
```

`404` on the tag means the push has not landed — stop. `200` on the release means it already exists —
skip the POST, report the existing URL, continue. Only when the tag is `200` and the release is `404`:

```
POST https://gitlab.synerise.com/api/v4/projects/1171/releases
Body: { "name": "@synerise/design-system@<version>",
        "tag_name": "@synerise/design-system@<version>",
        "description": "<Step 6 changelog as GitHub-flavored Markdown>" }
```

Post the body from a file (`--data @payload.json`) rather than inline — release notes routinely exceed
what is comfortable on a command line. A `201` returns the release URL at `_links.self`.

### Step 9 — Post the release changelog to Teams

> Needs the **Teams webhook**. If unavailable, still build the card, `--dry-run` it, hand the user the
> JSON file, and note it in the report.

Note CI's own `notify_release` job (`.gitlab-ci.yml`, gated on `$CI_COMMIT_TITLE == "build: publish"`)
posts a **short** card to the same channel automatically using the CI variable. The card below is the
richer two-audience version; mention the overlap so the user can choose rather than double-posting.

Build the body as a JSON array at `/tmp/ds-release-card-<DD-MM-YYYY>.json`, then post with
`scripts/notify-teams.sh --card-file`.

**9a — Changed docs → Storybook URLs.** `git diff --name-status <older>..<newer> -- '*.mdx' '*.stories.tsx'`
(`A`=added, `M`=updated, `D`=removed). Resolve each file's Storybook title: `*.stories.tsx` → CSF
`title:`; `*.mdx` with `<Meta title="…"/>` → that string; `*.mdx` with `<Meta of={X}/>` → the title of the
`*.stories.tsx` it imports. Title → id: lowercase, every run of non-`[a-z0-9]` → one `-`, trimmed, then
`--overview`. URL: `https://design.synerise.com/storybook-static/?path=/docs/<id>--overview`. Examples:
`Components/Modal` → `components-modal--overview`; `Components/TableNew/Expandable rows` →
`components-tablenew-expandable-rows--overview`.

**Not every component has an `--overview` docs page.** A component documented only by stories (Wizard,
Dropdown/DropdownMenu at the time of writing) has no `--docs` entry at all, and the transform will
produce an id that 404s. When an id is missing from the index, fall back in this order:

1. the **parent** component's overview (`Components/Dropdown/DropdownMenu` → `components-dropdown--overview`);
2. the single most relevant **story**, linked as `?path=/story/<id>` rather than `/docs/`;
3. no link at all — never ship a link you could not find in the index.

Say which fallback you used in the report, since a missing overview page is usually a docs gap worth filing.

**Verify every id against the live index** rather than trusting the transform — it also confirms removals
and re-titles actually shipped. Note the index reflects the *currently deployed* Storybook, so stories
added by this release will legitimately be absent until the prod gitops deploy runs:

```bash
curl -sS https://design.synerise.com/storybook-static/index.json | python3 -c "..."   # check the `entries` keys
```

**9b — Two-audience content.** A **Summary** for product owners (one plain-language, impact-first bullet
per changed package; skip pure dependency bumps; say explicitly whether apps must change) and **Change
details** for FE devs (per package an Accent sub-header
`@synerise/ds-<name> · <old> → <new> · 🐛 fix` / `✨ feat` / `🔧 refactor`, then bullets with a one-line
note, the `synerise-design!NNNN` ref, any `STOR-NNNN`, and the 9a doc link).

**9c — Storybook freshness.** The public Storybook only refreshes after the **manual** `k8s-prod-gitops`
(g001-misc1) job on the publish pipeline; `deploy_storybook` succeeding is *not* enough.

⚠️ **Re-check the job immediately before building the card — do not rely on the Step 0 answer.** The user
often plays it *during* the run, which makes a caveat posted minutes later simply wrong, and the card
cannot be edited once sent:

```
GET /projects/1171/pipelines/<publish-pipeline-id>/jobs
# find the job named k8s-prod-gitops: [g001-misc1, …]; status "manual" = unplayed, "success" = played
```

Only if it is still unplayed, add `⚠️ Storybook links go live once the prod gitops deploy is played.`
under the meta line.

**9d — Render + post.** Mark detail containers `"_truncatable": true` so the script can shrink a card over
Teams' ~28KB limit (it drops them bottom-up).

1. **Header band** — `Container` `style: accent`, `bleed: true`: `🚀 Design System Release` (ExtraLarge
   Bolder) + a `DD-MM-YYYY` line.
2. **Meta** — `TextBlock` (`isSubtle`): `N packages · M MRs · ✅ all patch-level, no breaking version bumps`
   plus, when behaviour changed regardless of bump level, `⚠️ still breaking for consumers`, and a
   `[Full notes in the GitLab release](<url>)` link. Add the 9c caveat here.
3. **Buttons** — an in-body `ActionSet` right after the meta (card-level `actions` render at the very
   bottom in Teams): GitLab release, Public Storybook, Compare `<old>…<new>`.
4. **📝 Summary** — `Container` `style: good`, `separator`, `spacing: ExtraLarge`, header `Large`.
5. **🔧 Change details** — `Container` `separator`, `spacing: ExtraLarge`, `_truncatable`, header `Large`.
6. **📖 Documentation** — `Container` `separator`, `spacing: ExtraLarge`, `_truncatable`, header `Large`.
7. **📦 Version changes** — `Container` `style: emphasis`, `separator`, `spacing: ExtraLarge`, header
   `Large`: a `FactSet` of functional bumps, then cascade bumps collapsed into one `fontType: Monospace`,
   `isSubtle` line.

Teams `TextBlock` markdown supports only `**bold**`, `*italic*`, `[text](url)`, `- ` bullets and `\n` — no
tables (hence the FactSet) and no backtick code (use **bold** for prop names).

```json
[
  { "type": "Container", "style": "accent", "bleed": true, "items": [
    { "type": "TextBlock", "size": "ExtraLarge", "weight": "Bolder", "text": "🚀 Design System Release", "wrap": true },
    { "type": "TextBlock", "spacing": "None", "weight": "Bolder", "text": "07-09-2026", "wrap": true } ] },
  { "type": "TextBlock", "spacing": "Small", "isSubtle": true, "wrap": true,
    "text": "49 packages · 2 MRs · ✅ all patch-level · ⚠️ still breaking for consumers · [Full notes in the GitLab release](<url>)" },
  { "type": "ActionSet", "spacing": "Medium", "actions": [
    { "type": "Action.OpenUrl", "title": "GitLab release", "url": "<release url>" },
    { "type": "Action.OpenUrl", "title": "Public Storybook", "url": "https://design.synerise.com/storybook-static/" },
    { "type": "Action.OpenUrl", "title": "Compare 2.0.3 → 2.0.4", "url": "<compare url>" } ] },
  { "type": "Container", "style": "good", "separator": true, "spacing": "ExtraLarge", "items": [
    { "type": "TextBlock", "weight": "Bolder", "size": "Large", "text": "📝 Summary", "wrap": true },
    { "type": "TextBlock", "wrap": true, "text": "- **Date pickers** — calendar internals moved to a maintained library; looks the same, but automated tests that click days need updated selectors." } ] },
  { "type": "Container", "style": "emphasis", "separator": true, "spacing": "ExtraLarge", "items": [
    { "type": "TextBlock", "weight": "Bolder", "size": "Large", "text": "📦 Version changes", "wrap": true },
    { "type": "FactSet", "facts": [ { "title": "@synerise/ds-modal", "value": "1.5.1 → 1.5.2" } ] },
    { "type": "TextBlock", "spacing": "Small", "isSubtle": true, "weight": "Bolder", "text": "Dependency bumps (34)", "wrap": true },
    { "type": "TextBlock", "spacing": "None", "isSubtle": true, "fontType": "Monospace", "wrap": true, "text": "ds-core 1.12.1→1.12.2, …" } ] }
]
```

Preview, then confirm with the user before sending:

```bash
bash scripts/notify-teams.sh --webhook-env TEAMS_RELEASES_WEBHOOK \
  --status Accent --card-file /tmp/ds-release-card-<DD-MM-YYYY>.json --dry-run
```

---

## Phase 3 — (Optional) Update consumers

### Step 10 — Wait for the publish to land in Nexus

1. **Wait for the publish pipeline.** The lookup needs the **full** SHA:

   ```bash
   FULL=$(git rev-parse <publish-commit>)
   # GET /projects/1171/pipelines?ref=master&sha=$FULL
   ```

   Poll until terminal. `code_quality` failing is normal — it is `allow_failure: true`. The job that
   matters is `publish_packages`; read its trace and confirm `lerna success published N packages`. If it
   failed, stop — do not install.

2. **Confirm in Nexus.** ⚠️ **Check every published package, not just the meta package.** Nexus proxies
   npm per package and fills in unevenly — the meta package can resolve minutes before some components:

   ```bash
   git log <publish-commit> -1 --format=%b | grep -oE '@synerise/[a-z0-9-]+@[0-9.]+' > /tmp/pkgs.txt
   while read -r p; do
     npm view "$p" version --registry https://nexus.snrinternal.com/repository/npm-release >/dev/null 2>&1 \
       || echo "MISSING: $p"
   done < /tmp/pkgs.txt
   ```

   Do not run `upgrade:ds` until this prints nothing. Installing early produces the silent failure in
   Step 12.

### Step 11 — Picking a working copy

Several clones and worktrees of these repos usually exist, most carrying unmerged local work. For each
selected repo:

```bash
git -C <clone> status --short           # tracked modifications?
git -C <clone> branch --show-current
git -C <clone> merge-base --is-ancestor HEAD origin/master && echo merged || echo "unmerged commits"
```

- **Clean and merged** → check out `master` there.
- **Untracked files only** (e.g. `.claude/settings.json`, `DO-NOT-COMMIT.md`) → fine; a branch switch
  leaves them alone.
- **Dirty, or holding unmerged commits** → do **not** commandeer it. Create a dedicated worktree instead;
  it shares the object store and disturbs nothing:

  ```bash
  git -C <clone> worktree add -b chore/ds-release-<YYYY-MM-DD> <path>-ds-release-<YYYY-MM-DD> origin/master
  ```

  Note in the report that the worktree should be removed once the MR merges.

⚠️ A clone can move under you mid-run if another session or skill is driving it. Re-check the branch
before each write, and verify your pushed commit is still the tip of its remote branch.

**Read whatever the clone is already doing before you branch away from it.** These clones frequently sit
on an unmerged DS-bump branch of their own, sometimes with uncommitted edits that resolve exactly the
problem you are about to hit. Check both:

```bash
git -C <clone> log --oneline origin/master..HEAD | head
git -C <clone> diff -- package.json
```

If that work already answers a decision in Step 12 (a resolution pin to drop, a retired package to hold),
surface it to the user rather than deciding independently — landing the opposite choice creates a
conflict with a branch they are still working on.

### Step 12 — Upgrade the DS packages

⚠️ **The two repos use different package managers. Check before running anything:**

```bash
python3 -c "import json;d=json.load(open('package.json'));print(d.get('packageManager'), '|', d['scripts'].get('upgrade:ds'))"
ls pnpm-lock.yaml yarn.lock 2>/dev/null
```

| Repo | Manager | Lockfile | `upgrade:ds` does |
|---|---|---|---|
| puib | **pnpm** (`pnpm@10.x`) | `pnpm-lock.yaml` | `ncu` → `pnpm install` → `pnpm dedupe` |
| portal-next | **yarn 1** | `yarn.lock` | `ncu` only — **never installs** |

puib migrated off yarn; do not assume either repo's tooling from the other, and re-read this table each
release rather than trusting it — it has changed before.

```bash
git checkout master && git pull --ff-only
git checkout -b chore/ds-release-<YYYY-MM-DD>
```

**`ncu` lives in devDependencies, so a fresh worktree needs a baseline install first** (`pnpm install
--frozen-lockfile` or `yarn install --frozen-lockfile`). Confirm `git status` is clean afterwards, so
anything that follows is attributable to the upgrade.

⚠️ **`upgrade:ds` fails silently in both repos. Never trust its exit code.**

- **puib:** `ncu … && (echo "$out" | grep -q '→' && pnpm install && pnpm dedupe || true)`. The trailing
  `|| true` swallows install failures. Worse, on a **re-run** `ncu` finds nothing to do (the failed first
  run already wrote the bumps into `package.json`), so `grep -q '→'` fails and the install is **skipped
  entirely** — leaving a bumped `package.json` with an untouched lockfile.
- **portal-next:** `upgrade:ds` is only `ncu -f "@synerise/ds-*" -u`. Follow it with:

  ```bash
  yarn install
  npx --yes yarn-deduplicate --scopes @synerise --strategy highest yarn.lock
  yarn install
  ```

  Its `@synerise/ds-*` filter does not match `@synerise/design-system` — harmless where portal-next does
  not depend on the meta package, but check.

#### Pins `ncu` will not move

`ncu` only rewrites semver entries in the `package.json` files it is pointed at. Three kinds of pin
survive an upgrade and silently hold packages back — **check all three every release**:

```bash
# 1. resolutions / overrides — ncu never touches these
python3 -c "import json;d=json.load(open('package.json'));print({k:v for k,v in d.get('resolutions',{}).items() if 'synerise' in k})"

# 2. URL / tarball deps anywhere in the workspace (chromatic .tgz, file:.yalc, -alpha.N)
git grep -nE "chromatic\.com|\.tgz|file:\.yalc|-alpha\." -- '**/package.json' 'package.json'

# 3. workspace package.json files — ncu at the root does not reach them
find packages -maxdepth 3 -name package.json -not -path "*/node_modules/*"
```

A DS package pinned in `resolutions` is the dangerous one: `dependencies` will read the new version
while the resolution forces the old one across the whole tree. Either bump the resolution with the
dependency or drop it — **ask the user which**, and say which package it silences.

Chromatic `.tgz` pins are pre-release bridges that outlive their purpose. When the release publishes a
real version of a chromatic-pinned package, say so explicitly: that app does **not** get the fixes in
this release. Do not replace such a pin without asking — it may be deliberate.

**Verify explicitly, by inspection, not exit code:**

```bash
grep -cE "Couldn't find any versions" <install log>   # must be 0
grep -c "dedupe" <install log>                         # puib: confirm dedupe actually ran
git -C <clone> status --short                          # expect package.json + the repo's lockfile
```

If the install was skipped or errored, run install / dedupe / install by hand.

#### Confirm the diff is DS-only

`package.json` should be pure:

```bash
git diff package.json | grep -E "^[+-]" | grep -v "^[+-][+-]" | grep -v "@synerise/"
```

The **lockfile is a different matter, and a raw `git diff` will mislead you.** A textual diff of
`pnpm-lock.yaml` shows hundreds of non-DS lines that are peer-snapshot re-keying, not dependency
changes. Compare the *set of package keys* instead:

```bash
python3 - <<'EOF'
import subprocess,re
def keys(t):
    out=set(); inpk=False
    for l in t.splitlines():
        if l.startswith('packages:'): inpk=True; continue
        if inpk:
            if l and not l.startswith(' '): break
            m=re.match(r"  ('?)([^:']+)\1:\s*$", l)
            if m: out.add(m.group(2))
    return out
old=keys(subprocess.run(['git','show','HEAD:pnpm-lock.yaml'],capture_output=True,text=True).stdout)
new=keys(open('pnpm-lock.yaml').read())
for label,s in (('ADDED',new-old),('REMOVED',old-new)):
    other=sorted(x for x in s if not x.startswith('@synerise'))
    print(label, len(s), '| non-@synerise:', ", ".join(other) or "(none)")
EOF
```

**Nothing non-`@synerise` should be ADDED.** Removals are expected — `pnpm dedupe` collapses duplicates
and drops orphans. Before accepting a removal, prove it is one of those two and not a downgrade, by
reading the *importer specifier*, which is what actually constrains resolution:

```bash
grep -A2 -E "^      <pkg>:$" pnpm-lock.yaml     # specifier: + resolved version
```

A removal is benign when the importer specifier still resolves inside its declared range (e.g.
`vite: ^6.0.3` collapsing 6.4.1 → 6.0.3 to match sibling workspaces that pin 6.0.3), or when no importer
references the removed version at all (an orphan left by an older DS package). It is **not** benign when
an importer's declared range no longer has a satisfying version. Name every surviving change in the MR,
peer-context shifts included (e.g. `redux-persist`'s peer moving `redux@4.2.0` → `redux@4.0.5`).

Retired packages that are **exactly pinned** (no caret) must stay untouched — that pin is what keeps a
consumer resolving a frozen published version. Confirm `ncu` did not move them:

```bash
for p in ds-menu ds-flex-box ds-loader ds-flag ds-core; do
  o=$(git show HEAD:package.json | python3 -c "import json,sys;print(json.load(sys.stdin)['dependencies'].get('@synerise/$p','-'))")
  n=$(python3 -c "import json;print(json.load(open('package.json'))['dependencies'].get('@synerise/$p','-'))")
  [ "$o" = "$n" ] || echo "MOVED: $p $o -> $n"
done
```

#### Verify the upgrade from `node_modules`, never from `package.json`

⚠️ **A bumped `package.json` does not mean the packages moved.** Every pin mechanism above can leave the
manifest claiming the new version while the installed tree keeps the old one, and nothing in the install
output says so. Always read the files that were actually installed:

```bash
for p in ds-core ds-list-item ds-table-new ds-icon; do
  printf "  %-16s " "$p"
  node -p "require('./node_modules/@synerise/$p/package.json').version" 2>/dev/null || echo MISSING
done
```

Use the **relative path** form. A bare `require('@synerise/ds-core/package.json')` throws
`ERR_PACKAGE_PATH_NOT_EXPORTED` because DS packages do not expose `./package.json` in their `exports`
map — that failure is the test being wrong, not the package being absent. To check mere presence, test
for the file on disk instead.

This is the single most important check in Phase 3. A release has already shipped to a QA environment
built against the *previous* DS because the manifest looked right.

#### pnpm keeps a satisfying resolution rather than the newest one

After the manifests are correct, transitive consumers can still hold the old version: pnpm keeps any
existing lockfile resolution that **still satisfies** the declared range. `@synerise/universal-list`
declares `^1 || ^2`, the retired `ds-menu` and `ds-table` declare `^2.0.1`, and all of them happily keep
a version the release superseded — leaving two copies of much of the design system.

`pnpm update --recursive`, with or without `--latest`, does **not** dislodge these. What works is
removing the entries and letting pnpm resolve them again:

```bash
python3 - <<'EOF'
import re
p='pnpm-lock.yaml'; ls=open(p).read().splitlines(keepends=True)
key=re.compile(r"^ {2}'?@synerise/[a-z0-9-]+@")
out=[]; i=0
while i < len(ls):
    if key.match(ls[i]):
        i+=1
        while i < len(ls) and ls[i].startswith('    '): i+=1
        continue
    out.append(ls[i]); i+=1
open(p,'w').writelines(out)
EOF
pnpm install --no-frozen-lockfile
```

Scope it to `@synerise` — this is the targeted alternative to `pnpm dedupe`, which rewrites everything.

#### A duplicate DS copy is a production bug, not untidiness

puib ships `scripts/check-ds-singletons.mjs` and runs it in CI. Its docstring records why: duplicate
copies took the campaigns `vendors.js` from 31 MB to 59 MB with three `ds-core` instances — three
separate React contexts — through a fully green pipeline. Run it after any dependency change here, and
treat a failure as release-blocking:

```bash
node scripts/check-ds-singletons.mjs
```

#### Pinning one app to a pre-release Chromatic build

When an app needs a DS feature that is not published yet, it pins the Chromatic `.tgz` in **its own**
`package.json`. Whether that pin actually takes effect depends entirely on the version *inside* the
tarball, and there is exactly one shape that works:

| Tarball declares | Result |
|---|---|
| the **same version** as the registry (`2.1.1`) | ❌ `nodeLinker: hoisted` keeps one copy per name+version, so the registry build wins on disk and the feature silently vanishes. Only a tree-wide override makes it win — putting *every* app on the unpublished build. |
| a **higher patch** (`2.1.99`) | ❌ It satisfies `@synerise/design-system`'s own `^2.1.1` range, so pnpm selects it for the umbrella and the install fails: `ERR_PNPM_NO_MATCHING_VERSION … while fetching it from Nexus`. |
| a **pre-release** (`2.1.1-timezone.0`) | ✅ Distinct version, so the linker keeps both copies and the app gets a nested one; sorts *below* `2.1.1` and cannot satisfy `^2.1.1`, so nothing else resolves onto it. |

So: ask for a pre-release version, and verify on disk rather than in the lockfile — every one of these
arrangements looks correct in `pnpm-lock.yaml`.

```bash
# the app's own copy must carry the feature; the root copy must not
grep -rql "<the-new-prop>" packages/apps/<app>/node_modules/@synerise/ds-x/dist/
grep -rql "<the-new-prop>" node_modules/@synerise/ds-x/dist/
node scripts/check-ds-singletons.mjs      # expect "N allowlisted nested copies", not 0
```

⚠️ **Zero allowlisted nested copies is the failure signal, not the success signal** when an app is meant
to have a pinned build. Grep a `.d.ts` for the prop, not just any file — a runtime `.js` can mention the
same identifier incidentally.

#### Two builds can share one version string

A Chromatic `.tgz` pin and the registry can both declare, say, `2.1.1` while containing different code —
the tarball is built from an unreleased branch. Under `nodeLinker: hoisted` pnpm keeps **one copy per
version**, so the two resolutions collapse and the registry build wins; the tarball's extra props vanish
and typechecking fails somewhere unrelated. Consequences worth knowing before you touch such a pin:

- An **app-scoped** override (`app>@synerise/ds-x`) cannot fix it. It resolves correctly in the lockfile
  and still loses on disk — verify by grepping the installed `dist`, not by reading the lockfile.
- Only a **tree-wide** override makes the tarball win, which means *every* app gets the unpublished
  build. Say so explicitly in the MR.
- A tarball pin is silently ineffective the moment the registry publishes the same version number. That
  is easy to miss, because `check-ds-singletons` reports *fewer* nested copies — which reads like good
  news and is actually the pin being defeated.

Changing a Chromatic pin is the app owner's call. Surface it and ask.

**Say in the MR when the upgrade spans more than one release.** A consumer that skipped a release will
show packages jumping several versions (`ds-core` 2.2.0 → 2.3.0, `ds-tags` 2.0.4 → 2.0.6); reviewers
read the MR title as one release and need telling otherwise.

### Step 13 — Finalize

**If implementation changes ARE required:** stop here. Do not commit, push, open an MR or trigger a
pipeline. Tell the user the branch is ready in each repo with the new versions installed. Skip Phase 4.

**If NOT:**

```bash
git add package.json <lockfile>      # pnpm-lock.yaml (puib) / yarn.lock (portal-next) — NEVER `git add -A`
git commit -m "chore: ds release <YYYY-MM-DD>"
git push -u origin chore/ds-release-<YYYY-MM-DD>
```

⚠️ Never `git add -A` — these repos carry untracked scratch files. Stage only what the upgrade changed
(root `package.json`, the repo's own lockfile, plus any workspace `package.json` it touched) and review the staged
diff first. Never `--no-verify`; if a hook fails, fix the cause.

Create the MR with the **GitLab write** capability (a personal `api` PAT — see *Credentials*):

```
POST https://gitlab.synerise.com/api/v4/projects/<project-id>/merge_requests
Body: { "source_branch": "chore/ds-release-<YYYY-MM-DD>", "target_branch": "master",
        "title": "chore: ds release <YYYY-MM-DD>",
        "description": "<Step 6 changelog + link to the GitLab release>" }
```

If no token can create it, hand the user the manual URL `git push` printed. Add repo-specific notes to the
description — which retired packages stay pinned, which transitive dependencies moved, and any regression
to watch for.

**Then trigger the puib build** (puib only). puib's `workflow:rules` accept trigger-sourced pipelines, so
use the **pipeline trigger token** endpoint (`glptt-…`, not a PAT):

```
POST https://gitlab.synerise.com/api/v4/projects/1098/trigger/pipeline
Form: token=<trigger-token>  ref=chore/ds-release-<YYYY-MM-DD>  variables[PORTAL_UI_TRIGGER]=<app list>
```

For a DS release always build **all 11** bridge apps (no need to ask):

```
snrs-react-ai-bridge,snrs-react-analytics-bridge,snrs-react-analytics-bridge-v2,snrs-react-assets-bridge,snrs-react-automations-bridge,snrs-react-campaigns-bridge,snrs-react-communications-bridge,snrs-react-crm-bridge,snrs-react-dashboards-bridge,snrs-react-schemas-bridge,snrs-react-settings-bridge
```

Branch names must be lowercase (Artifactory limitation). Report the pipeline `web_url`. portal-next has no
trigger step — its branch/MR pipeline runs per its own CI rules.

---

## Phase 4 — (Optional) Deploy the built apps

Runs only for the targets chosen in Step 0. Deploying touches shared QA environments — those answers are
the authorization; do not widen them.

### Step 14 — puib → read the published app version

Wait for the Step 13 trigger pipeline's `deploy` job to succeed, then read the version from its trace. All
11 apps share one version, `0.0.<pipelineId>-<CI_COMMIT_REF_SLUG>`:

```bash
# job id: GET /projects/1098/pipelines/<PIPELINE_ID>/jobs  → the job named "deploy"
# trace:  GET /projects/1098/jobs/<JOB_ID>/trace
grep -oE '0\.0\.[0-9]+-[a-z0-9-]+' trace.txt | sort -u     # expect exactly ONE
grep -A40 'DEPLOY_RESULTS' trace.txt                        # every row must be `true`
```

Cross-check the slug against the branch (lowercased, every non-alphanumeric → `-`). If more than one
version appears, or any `DEPLOY_RESULTS` row is `false`, stop and report.

⚠️ **A green build proves the apps compiled, not that they compiled against the new DS.** The slug names
the branch, not the dependency tree. If Phase 3's `node_modules` check was skipped or the branch was
amended afterwards, this pipeline can publish apps built on the previous release and every downstream
step will look healthy. Confirm the pipeline ran on the commit you actually intend to deploy:

```bash
# GET /projects/1098/pipelines/<id>  → compare .sha with your branch tip
git -C <clone> rev-parse HEAD
```

Re-trigger after any amend or force-push; the old pipeline's artefacts are stale.

### Step 15 — puib → update the portal-ui env branch

The app versions are consumed by **portal-ui** (project **793**). Each branch there is permanently wired
to an environment by **its own `.gitlab-ci.yml`** — the `APP` variable and the `ENV` matrix in
`k8s-portal-gitops` differ per branch:

| Branch | `APP` (GitOps entry) | Clusters |
|---|---|---|
| `env-test-e` | `portal-ui-test-e` | `p001` |
| `canary-alpha` | `portal-ui-alpha` | `p001`, `p002` |

These values drift — `env-test-e` was documented here as `portal-ui` and is actually `portal-ui-test-e`.
Read them from the branch every time rather than trusting the table.

⚠️ **The tag name does not choose the environment — the branch does.** Tagging `-canary-alpha` from
`env-test-e` redeploys test-e. Always check out the branch wired to the target env, and read its
`.gitlab-ci.yml` (`git show origin/<branch>:.gitlab-ci.yml`) to confirm `APP`/`ENV` before writing.

**Never create a branch in portal-ui** — only check out an existing one. If it is checked out in another
worktree, work in that worktree. Apply the Step 11 dirty/unmerged rules.

portal-ui uses npm with **no lockfile** (CI runs `npm install --no-package-lock`), so only `package.json`
changes. Set all **11** bridge deps to the Step 14 version. Because they all share the previous version,
an exact string replacement is safest — verify the old string appears exactly 11 times and only on
`snrs-react-` lines first:

```bash
grep -c "$OLD" package.json                                  # expect 11
grep -n "$OLD" package.json | grep -vc "snrs-react-"         # expect 0
sed -i '' "s|$OLD|$NEW|g" package.json
```

> ⚠️ **`analytics-v2` breaks the naming pattern.** The package is **`snrs-react-analytics-bridge-v2`**
> (`-v2` *after* `bridge`). A loop building `snrs-react-<app>-bridge` silently misses it and ships 10/11.
> Leave `snrs-react-monaco-editor-bridge` and `snrs-react-icons-bridge` alone — they are not part of the
> triggered build. Always assert:

```bash
python3 -c "
import json; d=json.load(open('package.json')); exp='<NEW>'
apps=[k for k,v in d['dependencies'].items() if k.startswith('snrs-react-') and v==exp]
print('bumped', len(apps), '/ 11', 'PASS' if len(apps)==11 else 'FAIL')
print('analytics-v2:', 'snrs-react-analytics-bridge-v2' in apps)"
```

Validate the JSON, then commit and push (SSH, authored by the user):

```bash
git add package.json
git commit -m "chore: bump bridge apps to DS <version> release build <PIPELINE_ID>"
git push origin <branch>
```

For `qa-ds*` / `dev-ds` this push **is** the deploy — their GitOps watcher picks up the commit. Stop here.

### Step 16 — puib → canary tag, pipeline, GitOps deploy

For canary branches (`env-test-*`, `canary`, `canary-alpha`, `canary-beta`) the **tag** triggers the
deploy. Compute it deterministically and push without prompting:

```bash
git fetch --tags origin
LATEST=$(git tag -l 'v*' | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1)   # latest FULL version
BASE=$(python3 -c "import sys,re;m=re.match(r'v(\d+)\.(\d+)\.(\d+)\$',sys.argv[1]);print('v%s.%s.%d'%(m.group(1),m.group(2),int(m.group(3))+1))" "$LATEST")
N=0; while git tag -l "$BASE-canary-<flavour>.$N" | grep -q .; do N=$((N+1)); done
TAG="$BASE-canary-<flavour>.$N"
git tag -a "$TAG" -m "<short message>" && git push origin "$TAG"
```

`<flavour>` matches the branch (`test-e`, `alpha`, `beta`, …). Use an **annotated** tag with a short
message naming what is being deployed — e.g. `DS 2.0.4: react-day-picker v10, menu/alert/table retired`.

**Then, in order:**

1. Find the tag pipeline: `GET /projects/793/pipelines?ref=<TAG>&order_by=id&sort=desc`.
2. **Wait for `deploy_tag` to succeed before playing any GitOps job.** `deploy_tag` and
   `k8s-portal-gitops` share the `deploy` stage with **no `needs:`**, so GitLab will not order them.
   `deploy_tag` builds and pushes `portal-ui:<TAG>`; the GitOps job writes that tag into the steveops
   values for the cluster to pull. Playing GitOps first commits a tag whose image may not exist yet.
   If `deploy_tag` fails, stop and report — do not deploy.
3. Play each `k8s-portal-gitops` job (`POST /projects/793/jobs/<id>/play`). It is `when: manual`, and only
   becomes playable once its status flips `created` → `manual`. There is **one job per cluster** in the
   `parallel: matrix` — `canary-alpha` has two (`p001`, `p002`).
4. **Verify every job individually.** Confirm each trace shows `master -> master` on the steveops push.

⚠️ **Known race when a branch deploys to more than one cluster.** Each matrix job independently clones
`steveops`, commits and pushes to `master`, with no pull/rebase/retry. Whichever finishes second is
rejected with `! [rejected] master -> master (fetch first)` and its cluster is **not** updated — while the
**pipeline still reports `success`**. Never trust the pipeline badge here. On rejection, simply retry the
failed job (`POST /projects/793/jobs/<id>/retry`); the fresh clone then includes the other commit and
pushes cleanly.

### Step 17 — portal-next → test tag

portal-next is a separate app and has **no `test-e`/canary env**; its CI deploy matrix is `p001`/`p002`/
`p003` and those jobs are `when: manual`. "Deploying" it here means tagging the release branch so its
images build.

Tag naming is `v<version>-test.<N>`. Derive the base from the latest full `v<X>.<Y>.<Z>` tag: if that
version is already released, start a fresh series at the next patch (`v0.19.9` released → `v0.19.10-test.0`);
otherwise continue the existing series at the first free index. **The version becomes the npm version and
the Docker image tag, so confirm it with the user rather than guessing.**

```bash
git tag -a v<version>-test.<N> -m "<short message>" && git push origin v<version>-test.<N>
```

Pushing builds and pushes `portal-spa:<tag>` plus `-init-azure`, `-init-gcp` and `-static` variants.
Monitor the pipeline (`GET /projects/1244/pipelines?ref=<tag>`) and report its status. The `p001`–`p003`
deploys stay manual — do not play them unless the user asks.

⚠️ If the release branch is unmerged and will be **squashed** on merge, the tagged commit will not be an
ancestor of `master` afterwards, leaving the tag pointing at a commit only the deleted branch had. Fine
for a throwaway test build — say so, and suggest re-tagging from `master` if the image must stay
traceable.

---

## Step 18 — Report

- Published `@synerise/design-system` version and publish commit SHA
- GitLab release name and URL (or why it was skipped / already existed)
- Whether the Teams card was posted, and whether it carried the stale-Storybook caveat
- Changelog summary — counts by category, and any breaking changes called out
- **Phase 3:** per repo — branch, MR URL (or "ready for changes"), triggered pipeline URL; note any
  worktree created for cleanup
- **Phase 4:** per target — env branch and commit, tag, deploy pipeline URL, and the **per-job** GitOps
  outcome per cluster (never just the pipeline status); for portal-next, the tag and its pipeline
- Anything skipped for a missing credential, and which capability was missing
