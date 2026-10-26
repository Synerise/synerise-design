import { execFileSync } from 'child_process';
import {
  cpSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Tests the GritQL plugins in config/biome/plugins against the fixtures in
 * config/biome/__fixtures__: every file in `invalid/` must raise exactly one
 * plugin diagnostic, every file in `valid/` none.
 *
 * Biome refuses a second root config inside the repo and does not print lint
 * diagnostics for stdin, so the fixtures are linted from a temp directory with
 * a config that loads only the plugins. The root biome.json is checked
 * separately to prove `pnpm lint:ci` actually loads them.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pluginsDir = join(repoRoot, 'config', 'biome', 'plugins');
const fixturesDir = join(repoRoot, 'config', 'biome', '__fixtures__');
const biomeBin = join(repoRoot, 'node_modules', '.bin', 'biome');

const plugins = readdirSync(pluginsDir).filter((file) =>
  file.endsWith('.grit'),
);
const failures = [];

const rootConfig = JSON.parse(readFileSync(join(repoRoot, 'biome.json'), 'utf8'));
for (const plugin of plugins) {
  if (!rootConfig.plugins?.includes(`./config/biome/plugins/${plugin}`)) {
    failures.push(`biome.json does not register ${plugin} in "plugins"`);
  }
}

const workDir = mkdtempSync(join(tmpdir(), 'ds-biome-plugins-'));
try {
  cpSync(fixturesDir, workDir, { recursive: true });
  writeFileSync(
    join(workDir, 'biome.json'),
    JSON.stringify({
      root: true,
      vcs: { enabled: false },
      plugins: plugins.map((plugin) => join(pluginsDir, plugin)),
    }),
  );

  let output;
  try {
    output = execFileSync(
      biomeBin,
      ['lint', '--colors=off', '--reporter=json', '--max-diagnostics=none', '.'],
      { cwd: workDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
  } catch (error) {
    // biome exits non-zero whenever it reports an error, which invalid/ is meant to trigger.
    output = error.stdout;
  }

  const counts = new Map();
  for (const diagnostic of JSON.parse(output).diagnostics) {
    if (diagnostic.category === 'plugin') {
      const path = diagnostic.location.path;
      counts.set(path, (counts.get(path) ?? 0) + 1);
    }
  }

  for (const [group, expected] of [
    ['invalid', 1],
    ['valid', 0],
  ]) {
    for (const file of readdirSync(join(fixturesDir, group))) {
      const path = `${group}/${file}`;
      const actual = counts.get(path) ?? 0;
      if (actual !== expected) {
        failures.push(
          `${path}: expected ${expected} plugin diagnostic(s), got ${actual}`,
        );
      }
    }
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(
    [
      '',
      'Biome plugin check failed:',
      '',
      ...failures.map((failure) => `    ${failure}`),
      '',
    ].join('\n'),
  );
  process.exit(1);
}
