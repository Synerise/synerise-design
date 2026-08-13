import { readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Test configuration lives in the `test` block of the root vite.config.base.ts, which every
 * package picks up through its own vite.config.ts. A private per-package config replaces those
 * base blocks instead of merging with them, so it silently drops setupFiles, the jsdom
 * environment and the source-resolution plugins — a run that looks green while testing
 * something else. Only vite.config.ts is allowed under packages/components.
 *
 * Scoped to packages/components on purpose: packages/storybook/vitest.config.ts is a real
 * browser-mode Storybook config.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(repoRoot, 'packages', 'components');
const CONFIG_PATTERN = /^vite(st)?\b.*config\.[cm]?[jt]s$/;
const ALLOWED = 'vite.config.ts';

const offenders = [];

for (const pkg of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!pkg.isDirectory() || pkg.name === 'node_modules') {
    continue;
  }
  for (const entry of readdirSync(join(componentsDir, pkg.name), {
    withFileTypes: true,
  })) {
    if (
      entry.isFile() &&
      entry.name !== ALLOWED &&
      CONFIG_PATTERN.test(entry.name)
    ) {
      offenders.push(`packages/components/${pkg.name}/${entry.name}`);
    }
  }
}

if (offenders.length > 0) {
  console.error(
    [
      '',
      'Per-package Vite/Vitest configs are not allowed (STOR-2362):',
      '',
      ...offenders.map((file) => `    ${file}`),
      '',
      'Test configuration belongs in the `test` block of the root vite.config.base.ts.',
      'Each package may only have a vite.config.ts calling createViteConfig().',
      '',
    ].join('\n'),
  );
  process.exit(1);
}
