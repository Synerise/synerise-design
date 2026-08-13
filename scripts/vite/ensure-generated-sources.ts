import { existsSync } from 'fs';
import { resolve } from 'path';

interface GeneratedSource {
  path: string;
  label: string;
  command: string;
}

/**
 * Sources generated into a package's src/ tree, all gitignored and therefore absent from a
 * checkout that never ran an install. Each one sits on its package's main entry path, so a
 * missing one breaks every spec that imports that package.
 */
const GENERATED_SOURCES: GeneratedSource[] = [
  {
    path: 'packages/components/core/src/js/DSProvider/ThemeProvider/variables.ts',
    label: '@synerise/ds-core theme variables',
    command: 'pnpm generate:vars',
  },
  {
    path: 'packages/components/icon/src/icons',
    label: '@synerise/ds-icon icon components',
    command: 'pnpm --filter @synerise/ds-icon run build:svgr',
  },
  {
    path: 'packages/components/flag/src/icons',
    label: '@synerise/ds-flag flag components',
    command: 'pnpm --filter @synerise/ds-flag run build:svgr',
  },
  {
    path: 'packages/components/avatar/src/defaultAvatars',
    label: '@synerise/ds-avatar default avatars',
    command: 'pnpm --filter @synerise/ds-avatar run build:svgr',
  },
];

let alreadyChecked = false;

/**
 * Fails a test run that cannot possibly resolve @synerise/* imports from source, with the
 * command that fixes it. Without this the run dies on an opaque "Failed to resolve import
 * ./variables" deep inside another package.
 *
 * Generation is deliberately not attempted here: `lerna run test --concurrency 3` would have
 * three processes writing the same files at once.
 */
export function ensureGeneratedSources(repoRoot: string): void {
  if (alreadyChecked) {
    return;
  }
  alreadyChecked = true;

  const missing = GENERATED_SOURCES.filter(
    (source) => !existsSync(resolve(repoRoot, source.path)),
  );
  if (missing.length === 0) {
    return;
  }

  const message = [
    '',
    "Tests resolve @synerise/* imports from each package's src/, but these generated",
    'sources are missing from this checkout:',
    '',
    ...missing.map(
      (source) =>
        `  missing  ${source.path}\n           ${source.label}\n           generate with:  ${source.command}`,
    ),
    '',
    'Generate all of them at once, from the repo root:',
    '',
    '    pnpm run generate',
    '',
    'This normally runs for you as the root postinstall script, so a checkout without it is',
    'usually a fresh git worktree, an install with --ignore-scripts, or a `git clean -fdX`.',
    'These files are gitignored — git will not bring them back.',
    '',
  ].join('\n');

  // Printed rather than thrown: Vitest renders a thrown message as one blob, which mangles the
  // layout that makes this readable.
  console.error(message);
  throw new Error(
    'Missing generated sources — run `pnpm run generate` (details above).',
  );
}

export default ensureGeneratedSources;
