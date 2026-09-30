import { execFileSync } from 'child_process';
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

/**
 * Packs the packages Chromatic ships under a pre-release version, then restores every package.json.
 *
 * `pnpm pack` stamps a tarball with the version on disk — the last released one — so without this
 * a tarball built from merge request code claims to be the published package it differs from.
 *
 * Only the packages the merge request changed are bumped and packed, so the packed set is exactly
 * what a consumer pins. Every version is bumped before anything is packed, because `pnpm pack`
 * resolves each `workspace:` spec from the sibling's package.json at pack time. A changed sibling
 * is also switched to `workspace:*`, so it is asked for by its exact pre-release version: as a
 * caret range, `^2.1.4-mr3982.gAAA` would also accept another merge request's `2.1.4-mr4000.gBBB`,
 * or a later commit of this one whose SHA sorts higher, and resolvers pick the highest match.
 * Anything unchanged stays a released range the registry can serve. Bumping dependents too would
 * make a changed package that reaches another changed one through an unchanged dependent ask for
 * that dependent's pre-release, which nobody pins.
 *
 * With `--publish` the same pre-releases go to the registry in `NEXUS_PRERELEASE_REGISTRY` (the
 * Nexus hosted repo) instead of into Storybook. Consumers install from the Nexus group, which
 * serves those pre-releases next to the released versions it proxies from npmjs, so a pre-release
 * is pinned by version rather than by tarball URL. `--dry-run` is passed through to `npm publish`.
 */
const publishing = process.argv.includes('--publish');
const dryRun = process.argv.includes('--dry-run');
const registry = process.env.NEXUS_PRERELEASE_REGISTRY;

const run = (cmd, args, options = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', ...options });

// Changes are counted from the merge base, not from origin/master itself: `lerna --since <ref>`
// diffs against the ref as is, so once master moves past the branch point every package master
// changed since then would count as changed too, and be packed or published from this branch's
// older code.
let mergeBase;
try {
  mergeBase = run('git', ['merge-base', 'origin/master', 'HEAD'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
} catch {
  console.error(
    'No merge base between origin/master and HEAD. In a shallow clone the branch point may be deeper than the fetched history; raise GIT_DEPTH.',
  );
  process.exit(1);
}
const FILTER = ['--since', mergeBase, '--exclude-dependents'];

// A short SHA made only of digits with a leading zero is not a valid semver identifier, hence the
// `g` prefix (as in `git describe`).
const sha =
  process.env.CI_COMMIT_SHORT_SHA ??
  run('git', ['rev-parse', '--short=8', 'HEAD']).trim();
const mergeRequest = process.env.CI_MERGE_REQUEST_IID;
const preid = mergeRequest ? `mr${mergeRequest}.g${sha}` : `local.g${sha}`;

if (publishing && !mergeRequest) {
  console.error(
    '--publish runs only in a merge request pipeline: a local.g<sha> pre-release on a shared registry has no merge request to trace it back to.',
  );
  process.exit(1);
}
if (publishing && !registry) {
  console.error(
    '--publish needs NEXUS_PRERELEASE_REGISTRY, the registry to publish to.',
  );
  process.exit(1);
}
// Released versions reach npmjs only through `publish_packages`; a pre-release must never.
if (publishing && new URL(registry).hostname === 'registry.npmjs.org') {
  console.error(`--publish refuses to publish pre-releases to ${registry}.`);
  process.exit(1);
}

// Next patch, so the pre-release sorts above the release it was built from: `2.1.3-x` would sort
// below 2.1.3. A version that is already a pre-release keeps its patch.
const toPrerelease = (version) => {
  const match = /^(\d+)\.(\d+)\.(\d+)(-.+)?$/.exec(version);
  if (!match) {
    throw new Error(`Unsupported version: ${version}`);
  }
  const [, major, minor, patch, prerelease] = match;
  const nextPatch = prerelease ? Number(patch) : Number(patch) + 1;
  return `${major}.${minor}.${nextPatch}-${preid}`;
};

// Dependencies first, so a published dependent never asks for a pre-release the registry lacks yet.
const packages = JSON.parse(
  run('pnpm', ['exec', 'lerna', 'ls', ...FILTER, '--toposort', '--json'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  }),
);

if (packages.length === 0) {
  console.log(`No packages changed since ${mergeBase}, nothing to do.`);
  process.exit(0);
}

const isPublished = (name, version) => {
  try {
    const found = run(
      'npm',
      ['view', `${name}@${version}`, 'version', '--registry', registry],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    return found.trim() !== '';
  } catch (error) {
    // npm answers E404 both for a package the registry has never seen and for a missing version
    // of one it has. Anything else (auth, network) must not be mistaken for "not published".
    if (/E404/.test(error.stderr)) {
      return false;
    }
    throw error;
  }
};

// Publishes the output of `pnpm pack` rather than the package directory: that is the same artefact
// Chromatic ships, and publishing a tarball runs no lifecycle scripts, so the packages'
// `prepublish` does not rebuild what `build_packages` already built. The version is fixed per merge
// request and commit, so a re-run skips whatever an earlier run already published.
// Lists what went out, in lerna's `Successfully published:` format, so the versions to pin can be
// copied from the end of the job log. Printed from `finally`, so a failed publish still shows what
// had already reached the registry.
const printSummary = (published, skipped) => {
  const list = (items) => items.map((id) => ` - ${id}`).join('\n');
  if (published.length > 0) {
    const heading = dryRun
      ? 'Dry run, would have published:'
      : 'Successfully published:';
    console.log(`\n${heading}\n${list(published)}`);
  }
  if (skipped.length > 0) {
    console.log(`\nAlready on ${registry}, skipped:\n${list(skipped)}`);
  }
  const verb = dryRun ? 'Would have published' : 'Published';
  console.log(`\n${verb} ${published.length}, skipped ${skipped.length}.`);
};

const publish = (bumped) => {
  const packRoot = mkdtempSync(join(tmpdir(), 'ds-prerelease-'));
  const published = [];
  const skipped = [];
  try {
    for (const { name, location, version } of bumped) {
      if (isPublished(name, version)) {
        console.log(`${name}@${version} is already on ${registry}, skipping.`);
        skipped.push(`${name}@${version}`);
        continue;
      }
      const packDir = mkdtempSync(join(packRoot, 'pkg-'));
      run('pnpm', ['pack', '--pack-destination', packDir], {
        cwd: location,
        stdio: ['ignore', 'ignore', 'inherit'],
      });
      const [tarball] = readdirSync(packDir);
      run(
        'npm',
        [
          'publish',
          join(packDir, tarball),
          // Required: since npm 11 (what Node 24 ships) a pre-release cannot take the implicit
          // `latest`. It also keeps `latest` off every version this job publishes.
          '--tag',
          'pre',
          '--registry',
          registry,
          ...(dryRun ? ['--dry-run'] : []),
        ],
        { stdio: 'inherit' },
      );
      published.push(`${name}@${version}`);
    }
  } finally {
    rmSync(packRoot, { recursive: true, force: true });
    printSummary(published, skipped);
  }
};

const originals = new Map();
const bumped = [];
const changed = new Set(packages.map(({ name }) => name));
const DEPENDENCY_FIELDS = [
  'dependencies',
  'optionalDependencies',
  'peerDependencies',
];

const pinChangedSiblings = (manifest) => {
  const pinned = { ...manifest };
  for (const field of DEPENDENCY_FIELDS) {
    if (!manifest[field]) {
      continue;
    }
    pinned[field] = Object.fromEntries(
      Object.entries(manifest[field]).map(([dependency, spec]) =>
        changed.has(dependency) && spec.startsWith('workspace:')
          ? [dependency, 'workspace:*']
          : [dependency, spec],
      ),
    );
  }
  return pinned;
};

// Let a Ctrl+C or a cancelled job stop the pack or publish child without killing this process
// before the `finally` below has restored the manifests.
const ignoreSignal = () => {};
process.on('SIGINT', ignoreSignal);
process.on('SIGTERM', ignoreSignal);

try {
  for (const { name, location } of packages) {
    const manifestPath = join(location, 'package.json');
    const source = readFileSync(manifestPath, 'utf8');
    originals.set(manifestPath, source);

    const manifest = JSON.parse(source);
    const version = toPrerelease(manifest.version);
    console.log(`${name}: ${manifest.version} -> ${version}`);
    const prerelease = { ...pinChangedSiblings(manifest), version };
    writeFileSync(manifestPath, `${JSON.stringify(prerelease, null, 2)}\n`);
    bumped.push({ name, location, version });
  }

  if (publishing) {
    publish(bumped);
  } else {
    run('pnpm', ['exec', 'lerna', 'run', 'pack:ci', ...FILTER], {
      stdio: 'inherit',
    });
  }
} finally {
  for (const [manifestPath, source] of originals) {
    writeFileSync(manifestPath, source);
  }
  console.log(`Restored ${originals.size} package.json files.`);
}
