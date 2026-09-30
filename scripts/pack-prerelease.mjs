import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Packs the packages Chromatic ships under a pre-release version, then restores every package.json.
 *
 * `pnpm pack` stamps a tarball with the version on disk — the last released one — so without this
 * a tarball built from merge request code claims to be the published package it differs from.
 *
 * Only the packages the merge request changed are bumped and packed, so the packed set is exactly
 * what a consumer pins. Every version is bumped before anything is packed, because `pnpm pack`
 * resolves each `workspace:^` from the sibling's package.json at pack time: a changed sibling becomes
 * a pre-release range, anything else stays a released range the registry can serve. Bumping
 * dependents too would make a changed package that reaches another changed one through an unchanged
 * dependent ask for that dependent's pre-release, which nobody pins.
 */
const FILTER = ['--since', 'origin/master', '--exclude-dependents'];

const run = (cmd, args, options = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', ...options });

// A short SHA made only of digits with a leading zero is not a valid semver identifier, hence the
// `g` prefix (as in `git describe`).
const sha =
  process.env.CI_COMMIT_SHORT_SHA ??
  run('git', ['rev-parse', '--short=8', 'HEAD']).trim();
const mergeRequest = process.env.CI_MERGE_REQUEST_IID;
const preid = mergeRequest ? `mr${mergeRequest}.g${sha}` : `local.g${sha}`;

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

const packages = JSON.parse(
  run('pnpm', ['exec', 'lerna', 'ls', ...FILTER, '--json'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  }),
);

if (packages.length === 0) {
  console.log('No packages changed since origin/master, nothing to pack.');
  process.exit(0);
}

const originals = new Map();

// Let a Ctrl+C or a cancelled job stop the pack child without killing this process before the
// `finally` below has restored the manifests.
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
    writeFileSync(
      manifestPath,
      `${JSON.stringify({ ...manifest, version }, null, 2)}\n`,
    );
  }

  run('pnpm', ['exec', 'lerna', 'run', 'pack:ci', ...FILTER], {
    stdio: 'inherit',
  });
} finally {
  for (const [manifestPath, source] of originals) {
    writeFileSync(manifestPath, source);
  }
  console.log(`Restored ${originals.size} package.json files.`);
}
