---
name: pack-timezones
description: Publish fresh .tgz builds of the 4 timezone packages (date-picker, date-range-picker, time-picker, factors) for a consumer app — merge master, build, pack into the Storybook static dir, upload to Chromatic, and hand back the download URLs
---

## Overview

Hand-off flow for the `feature/timezones-clean` branch: turn the current branch state into four downloadable `.tgz` archives that a consumer repo (portal-ui-bridge) can install straight from a URL, without publishing anything to Nexus.

The trick is that Chromatic serves every file under `storybook-static/` as a static asset, so packing the tarballs *into* the Storybook build directory before uploading makes them downloadable from the published Storybook URL.

**The packed set is derived, not listed.** `pack:timezones` delegates to the root `pack:ci`
(`scripts/pack-prerelease.mjs`), which packs every package changed since the merge base with
`origin/master`, excluding dependents. Confirm what that resolves to before packing:

```bash
pnpm exec lerna ls --since $(git merge-base origin/master HEAD) --exclude-dependents --json \
  | python3 -c "import sys,json; [print(' ', p['name'], p['version']) for p in json.load(sys.stdin)]"
```

It is normally `ds-date-picker`, `ds-date-range-picker`, `ds-time-picker` and `ds-factors`, plus
anything else the branch has touched since — a run on 2026-10-19 also picked up `ds-subtle-form`,
which this flow's old hard-coded `--scope` list had been silently omitting. `ds-core` and `ds-utils`
are not changed here (core's timezone utilities already shipped to master), so the consumer takes
those from the registry.

> **Never commit the step 5 dependency strip.** It mutates the packed packages' `package.json`
> files on purpose, and step 9 reverts it. If the flow aborts in between, run step 9 before
> anything else. The version bump that used to sit alongside it is now `pack:ci`'s job and
> restores itself — see step 4.

## Prerequisites

- Run every command from the **repo root** of whichever checkout/worktree has `feature/timezones-clean` (or a branch off it) checked out. All paths below are repo-relative — do not hardcode a checkout path.
- Node + `pnpm` 10, and network access to Nexus and Chromatic.
- Chromatic token: the CI/CD variable **`CHROMATIC_PROJECT_TOKEN_SB7_STARTER`** (see step 7). Note this is a *different* project from the `CHROMATIC_PROJECT_TOKEN_SB7` used by the pipeline's own `chromatic_publish` job.

## Arguments

- `--strip-ds-deps` (default `true`) — strip `@synerise/ds-*` from `dependencies` before packing (step 5). Set `false` only when the tgz will be pinned in the consumer's **root** `package.json`, where every DS package resolves anyway.
- `--skip-merge` (default `false`) — master is already merged.
- `--skip-build` (default `false`) — `pnpm i && pnpm run build` already ran against the current tree.

## Workflow

### Step 1 — Merge master, verify the timezone tests on CI

Skip if `--skip-merge`.

```bash
git fetch origin
git merge origin/master
```

Resolve any conflicts, commit the merge, and push so the MR pipeline runs.

Three traps this merge has sprung before, none of which the conflict list points at:

- **rerere replays old resolutions silently.** Every file it reports as `Resolved … using previous
  resolution` is a resolution you have not read. One of them once kept both halves of an import and
  produced `Identifier 'DateRangePickerProps' has already been declared`, which failed the whole
  Storybook build. Check that the branch's invariants survived — the `resolvedTimeZone` /
  `encodeTimeZone` split, `rmvTZOffset` for the opt-out decode, and no `useIntl` in the DRP footer —
  rather than assuming.
- **Do not `git stash` mid-merge.** It clears `MERGE_HEAD`, and the commit you make afterwards has
  one parent instead of two: the history then claims master was never merged, and the next merge
  re-conflicts over everything.
- **`build_packages` runs `knip:ci`**, which fails the job on an unused dependency. Its output sits
  under ~1200 lines of `Cannot find name 'jest'` from `ds-mocks`, which are deliberate — that
  package's `types` script is a no-op printing "jest mock helpers use Jest globals intentionally".
  Read the *end* of the job log, not the first error in it.

Verification belongs to CI, not to a local full run: the MR pipeline's **`run_tests`** job (stage `test`) runs `pnpm test:ci`, and each package's `test` script is `vitest run && pnpm test:timezones` — so the timezone specs execute three times per package, under `TZ=UTC`, `TZ=America/New_York` and `TZ=Europe/Warsaw` (`vitest run -t TimezoneTesting`). Wait for that job to be green before handing tarballs to anyone.

Local subset, if you want it before pushing:

```bash
pnpm test:timezones
```

(Root script; scopes `core`, `date-picker`, `date-range-picker`, `time-picker`, `factors`. `core` is in scope as a regression guard — its timezone utilities live on master and are not modified here. `factors` has no `test:timezones` script, so lerna skips it; that is not a failure.)

### Step 2 — Install and build every package

Skip if `--skip-build`.

```bash
pnpm i && pnpm run build
```

Root `build` is `build:core` followed by `build:all`, so `ds-core` lands before its dependents. Takes minutes — let it finish.

### Step 3 — Build Storybook

```bash
pnpm build-storybook --stats-json
```

Produces `packages/storybook/storybook-static/`.

**Order matters:** this must run *before* step 6. Packing writes into `storybook-static/static/`, and a Storybook rebuild wipes that directory — rebuilding afterwards silently throws the tarballs away.

### Step 4 — Versions: nothing to do

Left here as a step because it used to be one. The root `pack:ci`
(`scripts/pack-prerelease.mjs`, on master since 2026-10) bumps each packed package to
`X.Y.<patch+1>-<preid>` before packing and restores every manifest in a `finally`, so the flow no
longer edits versions by hand. `<preid>` is `mr<iid>.g<sha>` in a merge request pipeline and
`local.g<sha>` outside one.

It also does something the manual bump never did: a changed sibling's `workspace:` spec is pinned
to `workspace:*`, so the packed tarball asks for that sibling's *exact* pre-release rather than a
caret range another merge request's pre-release could also satisfy.

**Why it has to be a pre-release, and must not be "tidied" into a plain version.** Two independent
reasons, both found the hard way:

- A tarball sharing a version with a published release is deduplicated against it by pnpm, which
  keys on version rather than origin. The install succeeds, the lockfile still shows the Chromatic
  URL, and the consumer silently runs registry code.
- A plain version *inside* the consumers' peer ranges is worse. puib sets `autoInstallPeers: true`,
  and `ds-mocks`, `rsql-filter` and `universal-ai-agent` declare these pickers as peers on
  `^2.1.0` / `^1 || ^2`. A plain bump sends pnpm to the registry for a version that is not
  published there and the install dies with `ERR_PNPM_NO_MATCHING_VERSION`. A pre-release sits
  outside every caret range, so those peers keep resolving to the real published package from the
  root — the arrangement puib already relies on, and why nests under `packages/apps/ai` are
  allowlisted in `check-ds-singletons.mjs`.

### Step 5 — Strip DS dependencies from the packed packages

Only when `--strip-ds-deps` is `true` (the default). Apply it **before** step 6: `pack:ci` reads
each manifest as it finds it, and restores it to that same stripped state afterwards, so the strip
survives the pack and step 9 reverts it.

Strip every package the step 4 query listed, not a fixed four.

Why: the consumer adds these tgz URLs to a *single app's* `package.json`, not its root. Any `@synerise/ds-*` entry still sitting in a tarball's `dependencies` gets resolved from Nexus for that app, so the app ends up running registry DS packages next to the tgz ones — mixed versions, confusing bugs. Stripping them makes the app resolve DS from its own dependency tree.

Rules:

- remove `@synerise/ds-*` from **`dependencies`** only
- leave `devDependencies` and `peerDependencies` exactly as they are
- leave every non-DS dependency (`date-fns`, `react-day-picker`, `lodash.*`, `classnames`, `@date-fns/upgrade`, …)
- do **not** commit the result

```bash
node -e "
const fs = require('fs');
const pkgs = [
  'packages/components/date-picker/package.json',
  'packages/components/date-range-picker/package.json',
  'packages/components/time-picker/package.json',
  'packages/components/factors/package.json',
];
for (const p of pkgs) {
  const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const dep of Object.keys(pkg.dependencies ?? {})) {
    if (dep.startsWith('@synerise/ds-')) delete pkg.dependencies[dep];
  }
  fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
}
console.log('Stripped @synerise/ds-* from dependencies in 4 packages.');
"
```

Then confirm what changed — and that nothing else did:

```bash
git diff --name-only
git diff -- packages/components/factors/package.json
```

If the `pack:timezones` scope in the root `package.json` ever grows, grow this list with it.

### Step 6 — Pack the tarballs into the Storybook build

```bash
pnpm pack:timezones
```

`pack:timezones` is `pnpm pack:ci && … ls > index.txt`: the root `pack:ci` bumps and packs (step 4),
each package's own `pack:ci` writes into `../../storybook/storybook-static/static`, and the `ls`
produces the listing step 8 consumes.

Clear any previous run's tarballs first. `pack:ci` writes new files but removes nothing, and
`index.txt` is a plain `ls`, so a repack at a different version leaves the old ones listed and
downloadable — a consumer pinning from a stale line gets the wrong build:

```bash
rm -f packages/storybook/storybook-static/static/*.tgz \
      packages/storybook/storybook-static/static/index.txt
pnpm pack:timezones
cat packages/storybook/storybook-static/static/index.txt
```

Expect one tarball per package from the step 4 query, plus `index.txt` itself, each at the
pre-release version `pack:ci` assigned:

```
index.txt
synerise-ds-date-picker-2.1.6-local.g148888b2.tgz
synerise-ds-date-range-picker-2.1.6-local.g148888b2.tgz
synerise-ds-factors-2.2.3-local.g148888b2.tgz
synerise-ds-subtle-form-2.1.6-local.g148888b2.tgz
synerise-ds-time-picker-2.0.9-local.g148888b2.tgz
```

Spot-check one before uploading — the version, that the strip held, and that the change you are
shipping is actually in the built `dist` rather than only in the source:

```bash
T=packages/storybook/storybook-static/static/synerise-ds-date-picker-<version>.tgz
tar xzOf "$T" package/package.json | python3 -c "import sys,json; d=json.load(sys.stdin); \
  print(d['name'], d['version'], 'ds-deps stripped:', \
  not any(k.startswith('@synerise/ds-') for k in (d.get('dependencies') or {})))"
tar xzOf "$T" package/dist/<file>.js | grep -c '<the change>'
```

### Step 7 — Upload the Storybook (with the tarballs) to Chromatic

Resolve the token in this order, and **never echo it** — keep it in an env var:

1. already exported as `$CHROMATIC_PROJECT_TOKEN_SB7_STARTER` → use it
2. otherwise read the CI/CD variable over the API (needs `GITLAB_PERSONAL_TOKEN`):

```bash
export CHROMATIC_PROJECT_TOKEN_SB7_STARTER=$(curl -s \
  --header "PRIVATE-TOKEN: $GITLAB_PERSONAL_TOKEN" \
  "https://gitlab.synerise.com/api/v4/projects/Frontend%2Fsynerise-design/variables/CHROMATIC_PROJECT_TOKEN_SB7_STARTER" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['value'])")
```

3. otherwise ask the user for it — do not fall back to the pipeline's `CHROMATIC_PROJECT_TOKEN_SB7`, that publishes to the wrong project.

Pass it through `CHROMATIC_PROJECT_TOKEN`, which the CLI reads, rather than `--project-token`: a
command-line argument is visible to `ps` for the life of the upload.

```bash
CHROMATIC_PROJECT_TOKEN="$CHROMATIC_PROJECT_TOKEN_SB7_STARTER" \
CHROMATIC_DISABLE_UPDATE_CHECK=1 npx chromatic@latest \
  --exit-once-uploaded \
  -d packages/storybook/storybook-static \
  --force-rebuild \
  --diagnostics-file
```

`--force-rebuild` stops Chromatic from short-circuiting an unchanged Storybook (the tarballs changed even when the stories did not). `--diagnostics-file` is what makes step 8 reliable.

Each upload gets its **own** host (`https://<project>-<build>.chromatic.com`), so republishing never
overwrites an earlier set — a consumer still pinned to the previous host keeps resolving the old
tarballs until it is repinned.

### Step 8 — Build the tgz download URLs

Take the published URL from the diagnostics file rather than scraping the log:

```bash
CHROMATIC_SB_URL=$(python3 -c "import json;print(json.load(open('chromatic-diagnostics.json'))['storybookUrl'])")
echo "$CHROMATIC_SB_URL"
```

(Fallback: the `View your Storybook at https://<hash>-<id>.chromatic.com` line in the upload output.)

`--diagnostics-file` writes `chromatic-diagnostics.json` to the **repo root**, not into
`packages/storybook/`.

**`pnpm tgz-package-json` cannot be used with these filenames.** Its filename pattern in
`scripts/tgz/index.cjs` matches plain semver only (`synerise-ds-<name>-<x.y.z>.tgz`), so every
suffixed tarball is skipped **silently** and it reports `Generated packages.json with 0 entries`.
Build the map directly instead:

```bash
python3 - <<'EOF'
import json, io, re
url = json.load(open('chromatic-diagnostics.json'))['storybookUrl']
if not url.endswith('/'):
    url += '/'
out = {}
for line in io.open('packages/storybook/storybook-static/static/index.txt', encoding='utf-8'):
    f = line.strip()
    m = re.match(r'^synerise-ds-(.+?)-(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)\.tgz$', f)
    if m:
        out[f'@synerise/ds-{m.group(1)}'] = f'{url}static/{f}'
io.open('packages.json', 'w', encoding='utf-8').write(json.dumps(out, indent=2) + '\n')
print(f'{len(out)} entries')
EOF
```

Assert four entries before handing anything over. The trailing-slash guard matters for either
route: URLs are built by plain concatenation (`${url}static/${file}`), so a missing `/` yields
`…chromatic.comstatic/…`.

Cross-check the listing in a browser at `${CHROMATIC_SB_URL}static/index.txt`, then hand the user `packages.json`:

```json
{
  "@synerise/ds-date-picker": "<url>static/synerise-ds-date-picker-X.Y.Z.tgz",
  "@synerise/ds-date-range-picker": "<url>static/synerise-ds-date-range-picker-X.Y.Z.tgz",
  "@synerise/ds-time-picker": "<url>static/synerise-ds-time-picker-X.Y.Z.tgz",
  "@synerise/ds-factors": "<url>static/synerise-ds-factors-X.Y.Z.tgz"
}
```

Where these go in puib, which is pnpm 10 and has no `resolutions`:

- **`pnpm-workspace.yaml` → `overrides`** is what actually decides the resolved version. pnpm 10.29
  reads overrides from there, not from the `pnpm` field in `package.json`. Editing only an app's
  dependency entry looks like it worked — `pnpm install` reports success — while
  `pnpm --filter ./packages/apps/<app> why @synerise/ds-date-range-picker` still shows the old
  version, because the override wins.
- the consuming app's own `dependencies`, kept in step with the override.

Then verify, rather than trusting the install:

```bash
pnpm --filter ./packages/apps/<app> why @synerise/ds-date-range-picker   # expect the suffixed version
node scripts/check-ds-singletons.mjs
pnpm install --frozen-lockfile
grep -c '<previous-chromatic-host>' pnpm-lock.yaml                        # expect 0
```

### Step 9 — Reset the local dependency edits

```bash
git restore packages/components/{date-picker,date-range-picker,time-picker,factors}/package.json
git status --short
```

Restore every package the step 4 query listed; they must all be gone from `git status`. `pack:ci`
already restored the versions it bumped, so this undoes only the step 5 strip. `packages.json` and
`chromatic-diagnostics.json` are byproducts of this flow — leave them uncommitted (or delete
them), and take care that a `git add -A` does not sweep them into a commit.

The published tarballs keep their pre-release versions regardless; those only ever have to exist on
disk long enough for `pack:ci` to read them.

## Errors

- **`pnpm run build` fails** — report the failing package and its first TypeScript error; do not continue, the tarballs would ship stale `dist`.
- **`pack:timezones` fails on a missing destination** — `storybook-static/static/` comes from step 3. If Storybook was never built, build it; `mkdir -p packages/storybook/storybook-static/static` only papers over a missing Storybook and yields an upload with no stories.
- **Chromatic rejects the token** — it belongs to the SB7_STARTER project; a `SB7` token authenticates but publishes to the wrong Storybook.
- **Chromatic URL 404s on `/static/...`** — the pack ran before the Storybook build (order of steps 3 and 6) so the rebuild wiped the tarballs. Re-run 3 → 6 → 7.
- **`git restore` refuses** — other edits are in the way; restore just the packed packages' paths as shown, never `git checkout -- .`.
- **`build_packages` fails right after a wall of `Cannot find name 'jest'`** — that is `ds-mocks` noise, not the failure. Scroll to the end: it is usually `knip:ci` on an unused dependency.
- **Storybook build fails with `Could not find or load CSF file`** — the `.mdx` is fine; the stories file it references failed to compile. The real reason is a line or two further down, often a duplicate identifier left by a merge resolution.
- **`packages.json` has 0 entries** — `pnpm tgz-package-json` cannot parse a pre-release filename. Use the inline script in step 8; do not "fix" it by removing the pre-release.
- **Consumer install dies with `ERR_PNPM_NO_MATCHING_VERSION`** — the suffix was dropped or replaced with a plain-semver marker, so a peer range now matches a version the registry does not have. See step 4.
- **Consumer installs cleanly but runs the published code** — the tarball and a release share a version, so pnpm deduplicated them. That is the whole reason for step 4; check with `pnpm --filter ./packages/apps/<app> why @synerise/ds-date-range-picker`.
- **Consumer shows duplicate DS copies outside `packages/apps/ai`** — `check-ds-singletons.mjs` allowlists nests under that app only. Copies under `ds-mocks`, `rsql-filter` or `universal-ai-agent` are peers resolving to the real published package from the root, which is expected alongside a suffixed tarball.
