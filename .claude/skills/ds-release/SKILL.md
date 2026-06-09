---
name: ds-release
description: End-to-end DS release — publish bumped packages with lerna, generate a changelog from GitLab MRs, create a Jira release task plus a GitLab release, post a two-audience release changelog to the Teams releases channel, and optionally open DS-upgrade branches/MRs in the portal-ui-bridge and portal-next consumer repos
disable-model-invocation: true
---

## Prerequisites

The following environment variables must be set:

- `GITLAB_TOKEN` — GitLab personal access token (scope: `read_api`) for `gitlab.synerise.com` — used for all reads
- `GITLAB_WRITE_TOKEN` — GitLab personal access token (scope: `api`, Developer role on the project) for `gitlab.synerise.com` — used for write actions: creating the GitLab release (Step 10) and creating the consumer MRs (Phase 3). `read_api` cannot create releases or MRs. If this variable is not set, skip those writes and tell the user.
- `JIRA_EMAIL` — Atlassian account email
- `JIRA_TOKEN` — Atlassian API token
- `TEAMS_RELEASES_WEBHOOK` — Power Automate incoming webhook for the Teams releases-changelog channel (Step 11). Also exists as a CI variable; for local skill runs export it in your shell profile too. If unset, `scripts/notify-teams.sh` no-ops and the rest of the run still completes.
- `GITLAB_PIPELINE_TRIGGER_TOKEN` — GitLab pipeline **trigger** token (`glptt-…`) for the puib build trigger in Phase 3 (Step 15). Distinct from the PATs above. If unset, the puib pipeline trigger is skipped (ask the user for it).
- `GITLAB_PERSONAL_TOKEN` — the user's **personal** `api`-scoped PAT (Developer+ on the consumer repos). Required to create the consumer MRs in Phase 3 (Step 15); the project-bot tokens above can't write cross-project. Depending on where it is exported, it may only be present after sourcing the shell profile (see the note below).

**Important:** These variables may not be available in Claude Code's shell by default. Before any API call, source the user's shell profile first (e.g. `source ~/.zshrc 2>/dev/null` — adjust to whatever profile file the user keeps these in). Prepend this to every Bash command that uses these variables.

The GitLab project ID for `Frontend/synerise-design` is **1171**.
The Jira project key is **STOR**.
The Jira base URL is `https://hgintelligence.atlassian.net`.

**Registry:** DS packages are published to public npm by CI, but the consumer repos install from the internal Nexus registry `https://nexus.snrinternal.com/repository/npm-release` — so the "is it published yet?" gate in Phase 3 must query Nexus (it proxies npm and can lag slightly behind the publish).

**Consumer repos** (for the optional Phase 3):

| Repo | GitLab project | ID | Default branch |
|------|----------------|----|----------------|
| portal-ui-bridge (puib) | `Frontend/portal-ui-bridge` | **1098** | `master` |
| portal-next | `Frontend/portal-next` | **1244** | `master` |

Locate each repo's **local clone** on the machine before operating on it — clones can live anywhere and under any directory name, so don't assume a fixed path. Confirm the clone's `origin` remote matches the GitLab project above (`git -C <clone> remote get-url origin`). Ask the user for the path if it can't be found.

## Workflow

The flow has three phases: **Phase 1 — Publish** (Steps 1–2) bumps and publishes the packages; **Phase 2 — Changelog & Release** (Steps 3–11) documents what shipped and posts the release changelog to Teams; **Phase 3 — (Optional) Update consumers** (Steps 12–15) opens DS-upgrade branches/MRs in portal-ui-bridge and portal-next. A final report (Step 16) closes the run. Phase 3 only runs if the user opts in.

---

## Phase 1 — Publish

### Step 1 — Switch to master and pull

The release must be cut from an up-to-date `master` (lerna's `allowBranch` only permits `master`, `beta/*`, `chore/pnpm`):

```
git checkout master
git pull --ff-only
```

If the working tree is dirty or `git pull` is not a clean fast-forward, **stop** and report it — do not attempt to resolve it automatically.

### Step 2 — Bump versions and publish

This step is an outward-facing, irreversible write (it commits `build: publish` to `master`, creates per-package tags, pushes them, and triggers the npm publish in CI). **Always confirm with the user before running it**, even if other writes were authorized earlier this session.

First do a dry preview so the user can see what will be bumped:

```
git fetch origin master
git log --oneline $(git describe --tags --abbrev=0 --match "@synerise/design-system@*")..HEAD
```

Summarize the merged MRs that will be included, then ask the user to confirm. On confirmation, run (the skill is the preferred path, so bypass the direct-publish guard):

```
SKIP_RELEASE_GUARD=1 pnpm lerna:version
```

(`pnpm lerna:version` runs `scripts/release-preflight.sh` then `lerna version --conventional-commits`. The preflight is an interactive reminder for people who run `pnpm lerna:version` *directly* that this skill is the preferred release path; `SKIP_RELEASE_GUARD=1` skips it here since you are already in the skill. `lerna version` bumps every changed package independently, including `@synerise/design-system` which depends on all others, commits with message `build: publish`, tags each bumped package, and pushes. The actual npm publish runs in CI on the pushed tags.)

After it completes, verify the publish commit and the new `@synerise/design-system` tag exist on HEAD before continuing:

```
git log --oneline -1
git tag --points-at HEAD | grep "@synerise/design-system@"
```

If lerna reports "no changed packages to version", there is nothing to release — stop and tell the user.

---

## Phase 2 — Changelog & Release

### Step 3 — Identify the commit range

Find the last two `build: publish` commits on the current branch:

```
git log --oneline --grep="build: publish" -2
```

The range is: `<older-publish>..<newer-publish>`. If HEAD equals the latest publish, use the two most recent. If HEAD is ahead of the latest publish, use `<latest-publish>..HEAD`.

Also capture the new `@synerise/design-system` version from the **latest** publish commit body — needed for the GitLab release in Step 10:

```
git log <newer-publish> -1 --format="%B" | grep -oE "@synerise/design-system@[0-9]+\.[0-9]+\.[0-9]+"
```

A `build: publish` commit lists every bumped package as `- @synerise/<pkg>@<version>` and a matching git tag is created for each. The `@synerise/design-system@<version>` tag is the release target.

### Step 4 — Collect merge requests

List merge commits in the range:

```
git log <older>..<newer> --merges --format="%H %s"
```

Extract the MR number from each merge commit message (pattern: `See merge request Frontend/synerise-design!NNNN` or from the `Merge branch '...' into 'master'` body which contains `!NNNN`).

For each merge commit, also get the full commit body to find the MR number:

```
git log <merge-sha> -1 --format="%B"
```

### Step 5 — Fetch MR details from GitLab

For each MR number, call (use `iids[]` query parameter — the path-based `/merge_requests/{iid}` endpoint returns 404):

```
GET https://gitlab.synerise.com/api/v4/projects/1171/merge_requests?iids[]={mr_iid}
```

Header: `PRIVATE-TOKEN: $GITLAB_TOKEN`

The response is an array — use the first element.

Extract from each MR:
- `title` — the MR title (follows conventional commits: `type(scope): description`)
- `description` — contains "Changes:" section and "Resolves task:" section with Jira IDs
- `author.name`

### Step 6 — Extract Jira task IDs and fetch details

From each MR description, extract Jira task IDs matching the pattern `STOR-\d+`. **Note:** Not all MRs have Jira IDs in their description — skip this step for MRs without them and proceed with just the MR title/description for the changelog.

For each unique Jira ID found, fetch task details:

```
GET https://hgintelligence.atlassian.net/rest/api/3/issue/{task_id}?fields=summary,description,status,issuetype
```

Auth: Basic auth with `$JIRA_EMAIL:$JIRA_TOKEN`.

### Step 7 — Build the changelog

Group changes by component (the `scope` from conventional commit titles). Categorize into:

1. **Bug Fixes** — commits with `fix(...)` type
2. **Features / Improvements** — commits with `feat(...)` type

For each entry, include:
- Bold summary of the change
- Description of what changed (from MR description, diff context, and Jira summary)
- MR reference and Jira task ID

**MR reference format:** Always prefix MR references with `synerise-design` so they resolve correctly when pasted in other GitLab projects. Use the format `synerise-design!NNNN` (e.g., `synerise-design!3635`) instead of bare `!NNNN`.

### Step 8 — Create the Jira release task

Create a new issue in the STOR project:

```
POST https://hgintelligence.atlassian.net/rest/api/3/issue
```

Fields:
- `project.key`: `STOR`
- `summary`: `DS Release DD-MM-YYYY` (use the date of the latest publish commit, or today's date)
- `issuetype.id`: `10496` (Maintenance)
- `description`: The changelog formatted in Atlassian Document Format (ADF)

The ADF structure should use:
- `heading` nodes (level 2 for categories, level 3 for component names)
- `bulletList` with `listItem` nodes for individual changes
- `rule` node to separate sections
- Bold text via `marks: [{type: "strong"}]` for change summaries

### Step 9 — Add to the current sprint

Find the active sprint for the Storybook board (board ID **245**):

```
GET https://hgintelligence.atlassian.net/rest/agile/1.0/board/245/sprint?state=active
```

Then move the newly created issue to that sprint:

```
POST https://hgintelligence.atlassian.net/rest/agile/1.0/sprint/{sprint_id}/issue
Body: {"issues": ["STOR-XXXX"]}
```

### Step 10 — Create the GitLab release

> **Requires `GITLAB_WRITE_TOKEN`.** If it is not set, skip this step and note in the report that the release was not created (and why). This is an outward-facing write — confirm with the user before posting unless they have already authorized it this session.

Create one release per `@synerise/design-system` version bump, targeting the tag created by the publish commit (it already exists — do **not** create a new tag).

```
POST https://gitlab.synerise.com/api/v4/projects/1171/releases
```

Header: `PRIVATE-TOKEN: $GITLAB_WRITE_TOKEN`

Body (JSON):
- `name`: `@synerise/design-system@<version>` (the version captured in Step 3)
- `tag_name`: `@synerise/design-system@<version>` (must match an existing tag)
- `description`: the changelog from Step 7, rendered as **GitHub-flavored Markdown** (not ADF — GitLab release notes are Markdown). Reuse the same content as the Jira task: `## Bug Fixes`, `### <Component>`, bullet list of changes. Keep the `synerise-design!NNNN` MR references.

Before posting, run two pre-flight checks (URL-encode `/` as `%2F` in both paths):

1. **Tag exists** — the release must target an existing tag:

   ```
   GET https://gitlab.synerise.com/api/v4/projects/1171/repository/tags/@synerise%2Fdesign-system@<version>
   ```

   Expect `200`. If `404`, the publish push hasn't landed the tag — stop and report.

2. **Release does not already exist** (re-run guard — avoids a `409 Conflict` when the skill is re-run for a version that was already released):

   ```
   GET https://gitlab.synerise.com/api/v4/projects/1171/releases/@synerise%2Fdesign-system@<version>
   ```

   Expect `404` (no release yet → safe to create). If it returns `200`, a release already exists for this tag — **skip the POST**, report the existing release URL, and continue to Phase 3.

Only `POST` the release when check 1 is `200` and check 2 is `404`. On success the POST returns `201` and the response contains the release URL at `_links.self`.

### Step 11 — Post the release changelog to Teams

> **Requires `TEAMS_RELEASES_WEBHOOK`.** If unset, `scripts/notify-teams.sh` no-ops and the run still completes — note it in the report. This is an outward-facing post — preview with `--dry-run` and confirm with the user before sending.

Reuses what earlier steps gathered (MRs from Step 5, Jira from Step 6, the grouped changelog from Step 7, range/versions from Step 3) to post a styled Adaptive Card. Build the card body as a JSON array, write it to `/tmp/ds-release-card-<DD-MM-YYYY>.json`, and post via `scripts/notify-teams.sh --card-file`.

**11a — Detect changed docs → Storybook URLs.** `git diff --name-status <older>..<newer> -- '*.mdx' '*.stories.tsx'` (`A`=added, `M`=updated). Resolve each file's Storybook title: `*.stories.tsx` → CSF `title: '...'`; `*.mdx` with `<Meta title="..."/>` → that string; `*.mdx` with `<Meta of={X}/>` (e.g. `Modal.mdx`) → the title of the `*.stories.tsx` it imports. Title → URL id: lowercase, replace each run of non-`[a-z0-9]` with one `-`, trim, append `--overview` (autodocs; config `docs.defaultName: 'Overview'`). URL: `https://design.synerise.com/storybook-static/?path=/docs/<id>--overview`. Examples: `Components/Modal` → `components-modal--overview`; `Components/TableNew/Expandable rows` → `components-tablenew-expandable-rows--overview`; `Components/Alert/SectionMessage` → `components-alert-sectionmessage--overview`. Verify ids against the `entries` keys in `…/storybook-static/index.json` if unsure.

**11b — Per-package version summary.** New versions from the publish commit body (`git log <newer> -1 --format=%b` → `@synerise/ds-<name>@<new>`); old versions from `git show <newer>^:<pkg>/package.json` vs `:<pkg>/package.json` (map name→dir via each `package.json` `name`). Most bumps in a release are dependency-driven — separate the **functional** changes (packages with real commits in the range) from the cascade bumps, and flag any **major** bump for a breaking-changes callout.

**11c — Two-audience changelog.** From 11a/11b + the MR/Jira data: a **Summary** for product owners (one plain-language, impact-first bullet per changed package; skip pure dependency bumps) and **Change details** for FE devs (per package, an Accent sub-header `@synerise/ds-<name> · <old> → <new> · 🐛 fix` / `✨ feat`, then bullets with a one-line note, the `synerise-design!NNNN` MR ref, the Jira link, and any 11a doc link).

**11d — Storybook freshness gate.** The public Storybook refreshes only after the **manual** `k8s-prod-gitops` (g001-misc1) job runs on the publish pipeline — until then doc links are stale. Ask the user whether it has been played: if yes, post normally; if not, still post but add a caveat line under the meta (`⚠️ Storybook links go live once the prod gitops deploy is played.`) and re-post later.

**11e — Render + post the card.** Layout (mark detail containers `"_truncatable": true` so the script can shrink a card over Teams' ~28KB limit — it drops them bottom-up and appends a Jira link-out):

1. **Header band** — `Container` `style: accent`, `bleed: true`: `🚀 Design System Release` (ExtraLarge Bolder) + a `DD-MM-YYYY` line.
2. **Meta** — `TextBlock` (`isSubtle`): `N packages · M MRs · ✅ all patch-level, no breaking changes · [Full notes in Jira](<task url>)` (swap the ✅ note for `⚠️ contains breaking changes` if any major bump; add the 11d caveat here).
3. **Buttons** — `ActionSet` right after the meta (card-level `actions` render at the very bottom in Teams, so use an in-body ActionSet): Jira release task, GitLab release (Step 10), Public Storybook, Compare on GitHub.
4. **📝 Summary** — `Container` `style: good`, `separator: true`, `spacing: ExtraLarge`, header `size: Large`.
5. **🔧 Change details** — `Container` `separator: true`, `spacing: ExtraLarge`, `_truncatable: true`, header `Large`.
6. **📖 Documentation added / updated** — `Container` `separator`, `spacing: ExtraLarge`, `_truncatable`, header `Large`; the 11a links (`🆕 …(new)` / `(updated)`).
7. **📦 Version changes** — `Container` `style: emphasis`, `separator`, `spacing: ExtraLarge`, header `Large`: a `FactSet` for the functional bumps, then the dependency bumps collapsed into one `fontType: Monospace`, `isSubtle` line.

Teams `TextBlock` markdown supports only `**bold**`, `*italic*`, `[text](url)`, `- ` bullets and `\n` — no tables (hence the FactSet) and no backtick code (use **bold** for prop names). Abbreviated body shape:

```json
[
  { "type": "Container", "style": "accent", "bleed": true, "items": [
    { "type": "TextBlock", "size": "ExtraLarge", "weight": "Bolder", "text": "🚀 Design System Release", "wrap": true },
    { "type": "TextBlock", "spacing": "None", "weight": "Bolder", "text": "03-06-2026", "wrap": true } ] },
  { "type": "TextBlock", "spacing": "Small", "isSubtle": true, "wrap": true,
    "text": "16 packages · 2 MRs · ✅ all patch-level, no breaking changes · [Full notes in Jira](https://hgintelligence.atlassian.net/browse/STOR-XXXX)" },
  { "type": "ActionSet", "spacing": "Medium", "actions": [
    { "type": "Action.OpenUrl", "title": "Jira release task", "url": "https://hgintelligence.atlassian.net/browse/STOR-XXXX" },
    { "type": "Action.OpenUrl", "title": "GitLab release", "url": "<release url>" },
    { "type": "Action.OpenUrl", "title": "Public Storybook", "url": "https://design.synerise.com/storybook-static/" },
    { "type": "Action.OpenUrl", "title": "Compare on GitHub", "url": "<meta-package compare URL>" } ] },
  { "type": "Container", "style": "good", "separator": true, "spacing": "ExtraLarge", "items": [
    { "type": "TextBlock", "weight": "Bolder", "size": "Large", "text": "📝 Summary", "wrap": true },
    { "type": "TextBlock", "wrap": true, "text": "- **Modal** — accessibility fixes; backward-compatible, no app changes needed." } ] },
  { "type": "Container", "separator": true, "spacing": "ExtraLarge", "_truncatable": true, "items": [
    { "type": "TextBlock", "weight": "Bolder", "size": "Large", "text": "🔧 Change details", "wrap": true },
    { "type": "TextBlock", "color": "Accent", "weight": "Bolder", "text": "@synerise/ds-modal · 1.5.1 → 1.5.2 · 🐛 fix", "wrap": true },
    { "type": "TextBlock", "spacing": "None", "wrap": true, "text": "- a11y fixes + afterClose correction; new **ariaLabel**, **closeButtonAriaLabel** props.\n- MR [synerise-design!3713](<mr url>) · Docs: [Modal overview](https://design.synerise.com/storybook-static/?path=/docs/components-modal--overview)" } ] },
  { "type": "Container", "style": "emphasis", "separator": true, "spacing": "ExtraLarge", "items": [
    { "type": "TextBlock", "weight": "Bolder", "size": "Large", "text": "📦 Version changes", "wrap": true },
    { "type": "FactSet", "facts": [ { "title": "@synerise/ds-modal", "value": "1.5.1 → 1.5.2" } ] },
    { "type": "TextBlock", "spacing": "Small", "isSubtle": true, "weight": "Bolder", "text": "Dependency bumps (14)", "wrap": true },
    { "type": "TextBlock", "spacing": "None", "isSubtle": true, "fontType": "Monospace", "wrap": true, "text": "ds-core 1.12.1→1.12.2, …" } ] }
]
```

Post (preview with `--dry-run` first — prints the payload + byte size, no send):

```
source ~/.zshrc 2>/dev/null && bash scripts/notify-teams.sh \
  --webhook-env TEAMS_RELEASES_WEBHOOK \
  --status Accent \
  --card-file /tmp/ds-release-card-<DD-MM-YYYY>.json
```

Buttons live in the in-body ActionSet (no `--button` flags). The meta line's inline Jira link is the fallback the script uses if the card is auto-truncated. Confirm the dry-run with the user before sending.

---

## Phase 3 — (Optional) Update consumers

Updates the consumer repos (portal-ui-bridge "puib" and portal-next) to the freshly published DS version. This phase is **entirely opt-in** — driven by the two questions in Step 12.

### Step 12 — Ask the user what to do

Ask two questions (use `AskUserQuestion`):

1. **Which consumer repos should get a DS-upgrade test branch?** Options: `portal-ui-bridge (puib)`, `portal-next`, (allow selecting both), `none`. Use multi-select.
2. **Are implementation changes required before updating?** i.e. does the new DS version contain breaking changes the consumer must adapt to first. `Yes` / `No`. This decides how Step 15 ends.

If the user picks **none**, skip the rest of Phase 3 and go to Step 16.

### Step 13 — Wait for the publish to land in the registry

Before touching any consumer, confirm the new DS version is actually installable.

1. **Wait for the DS publish pipeline on `master` to finish.** The pipeline lookup needs the **full** commit SHA:

   ```
   FULL=$(git -C <synerise-design-clone> rev-parse <publish-commit>)
   GET https://gitlab.synerise.com/api/v4/projects/1171/pipelines?ref=master&sha=$FULL
   ```

   Poll until the pipeline is no longer `running`/`pending`. (lerna also pushes tags, so other pipelines may appear for the same SHA; the publish job runs as part of CI.) If it finishes `failed`, stop and report — do not install.

2. **Confirm the version resolves in Nexus** (the definitive gate — this is the registry the consumers install from):

   ```
   npm view @synerise/design-system@<version> version --registry https://nexus.snrinternal.com/repository/npm-release
   ```

   A `404` / non-zero exit means it is not available yet — keep polling (Nexus can lag behind the npm publish). Only once `@synerise/design-system@<version>` resolves is it safe to upgrade.

### Step 14 — Update each selected consumer repo

For **each** selected repo, in its local clone:

1. **Fresh branch from up-to-date master:**

   ```
   git checkout master
   git pull --ff-only
   git checkout -b chore/ds-release-<YYYY-MM-DD>
   ```

   Use the publish date (or today), e.g. `chore/ds-release-2026-06-03`. If the tree is dirty or the pull is not a clean fast-forward, stop and report for that repo.

2. **Upgrade the DS packages:**

   ```
   yarn upgrade:ds
   ```

   - **puib:** `upgrade:ds` already runs `ncu`, then `yarn install`, then `yarn-deduplicate --scopes @synerise --strategy highest yarn.lock`, then `yarn install` again — no extra dedupe needed.
   - **portal-next:** `upgrade:ds` only runs `ncu -f "@synerise/ds-*" -u` (it bumps `package.json` but does **not** install or dedupe). After it, replicate puib's behaviour:

     ```
     yarn install
     npx --yes yarn-deduplicate --scopes @synerise --strategy highest yarn.lock
     yarn install
     ```

3. Confirm the install succeeded (no resolution errors) and that `package.json`/lockfile now reference the new versions.

### Step 15 — Finalize per the "changes required" answer

- **If NO implementation changes are required:** for each updated repo, commit, push, and open an MR.

  ```
  git add package.json yarn.lock        # only the upgrade outputs — NOT `git add -A`
  git commit -m "chore: ds release <YYYY-MM-DD>"
  git push -u origin chore/ds-release-<YYYY-MM-DD>
  ```

  ⚠️ **Never `git add -A` here** — consumer repos often carry untracked scratch files (e.g. `DO-NOT-COMMIT.md`). Stage only what `yarn upgrade:ds` changed: the root `package.json` and `yarn.lock`, plus any workspace `package.json` files it touched (`git status --short` to confirm). Verify the staged diff contains nothing but DS version bumps and lockfile changes before committing.

  Create the MR via the GitLab API using **`GITLAB_PERSONAL_TOKEN`** (the user's personal `api`-scoped PAT). ⚠️ The other tokens do NOT work here: `GITLAB_WRITE_TOKEN` and `GITLAB_API_TOKEN` are `project_1171_bot` (synerise-design) project access tokens and return `403` on other projects, and `GITLAB_TOKEN` is `read_api` (read-only). Like the other vars, `GITLAB_PERSONAL_TOKEN` may not be auto-loaded — source the shell profile in the same command first (see Prerequisites). If it is unset, skip the API call and give the user the manual MR URL printed by `git push` (`…/merge_requests/new?merge_request[source_branch]=…`).

  ```
  POST https://gitlab.synerise.com/api/v4/projects/<project-id>/merge_requests
  Body: {
    "source_branch": "chore/ds-release-<YYYY-MM-DD>",
    "target_branch": "master",
    "title": "chore: ds release <YYYY-MM-DD>",
    "description": "<release notes (Markdown) + link to the DS GitLab release + link to the Jira task>"
  }
  ```

  The MR description should reuse the Step 7 changelog (Markdown), plus a link to the GitLab release from Step 10 and the Jira release task from Step 8 (`https://hgintelligence.atlassian.net/browse/STOR-XXXX`).

  **Then trigger a build pipeline for QA** (puib only — see the `deploy-branch` skill). puib's `workflow:rules` run trigger-/API-sourced pipelines, so use the project **pipeline trigger token** endpoint (a `glptt-…` token, distinct from the PAT):

  ```
  POST https://gitlab.synerise.com/api/v4/projects/1098/trigger/pipeline
  Form: token=<pipeline-trigger-token>  ref=chore/ds-release-<YYYY-MM-DD>  variables[PORTAL_UI_TRIGGER]=<comma-separated app list>
  ```

  - Source the trigger token from `GITLAB_PIPELINE_TRIGGER_TOKEN` (a `glptt-…` pipeline-trigger token); if it is not set, ask the user for it. Never echo the token in output.
  - **For a DS release, always build all bridge apps** — pass them as a single comma-separated `PORTAL_UI_TRIGGER` value (no need to ask):

    ```
    snrs-react-ai-bridge,snrs-react-analytics-bridge,snrs-react-analytics-bridge-v2,snrs-react-assets-bridge,snrs-react-automations-bridge,snrs-react-campaigns-bridge,snrs-react-communications-bridge,snrs-react-crm-bridge,snrs-react-dashboards-bridge,snrs-react-schemas-bridge,snrs-react-settings-bridge
    ```

  - Branch names must be lowercase (Artifactory limitation); `chore/ds-release-<YYYY-MM-DD>` is safe. Report the triggered pipeline's `web_url`.
  - portal-next has no trigger step here — its MR/branch pipeline runs per its own CI rules.

- **If implementation changes ARE required:** stop after the install in Step 14 — do **not** commit, push, open an MR, or trigger a pipeline. Notify the user that branch `chore/ds-release-<YYYY-MM-DD>` is ready in each selected repo with the new DS versions installed, so they can make the necessary changes before committing.

### Step 16 — Report

Output:
- The published `@synerise/design-system` version and the publish commit SHA
- The Jira task key and URL
- The sprint it was added to
- The GitLab release name and URL (or a note that it was skipped / already existed)
- Whether the Teams release card was posted (and whether it carried the stale-Storybook caveat)
- A brief summary of the changelog (number of fixes, features)
- **Phase 3 (if run):** for each consumer repo — the branch name, and either the MR URL (no changes needed) or a "branch ready for changes" note (changes required); or note that Phase 3 was skipped
