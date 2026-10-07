import { readdirSync, readFileSync, statSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Every `var(--ds-*)` used in a component's source must resolve to a custom property that exists,
 * otherwise the declaration silently computes to "unset" (the colour just does not apply) and no
 * test notices: jsdom cannot resolve var(), and a spec that restates the token name from the
 * implementation passes on a typo. This checks the names against the generated token CSS, so it
 * has to run after `pnpm build` (the tokens package emits packages/tokens/dist/css).
 *
 * - A reference followed by `${` is a runtime-built name (`var(--ds-toast-variant-${type}-bg)`); only
 *   its static prefix is checked, i.e. at least one defined token must start with it.
 * - A name the components set themselves (`--ds-x: …` in CSS-in-JS, `'--ds-x':` object keys,
 *   `setProperty('--ds-x', …)`) counts as defined, e.g. a duration a hook writes onto a row.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokensCssDir = join(repoRoot, 'packages', 'tokens', 'dist', 'css');
const componentsDir = join(repoRoot, 'packages', 'components');

const SOURCE_FILE = /\.(ts|tsx|less|css)$/;
const SKIP_FILE = /\.(spec|test|stories|figma|d)\.[cm]?[jt]sx?$|\.d\.ts$/;
const SKIP_DIR = new Set(['node_modules', 'dist', '__specs__', '__spec__']);

const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIR.has(entry)) {
        walk(full, files);
      }
    } else if (SOURCE_FILE.test(entry) && !SKIP_FILE.test(entry)) {
      files.push(full);
    }
  }
  return files;
};

let tokenCss;
try {
  tokenCss = readdirSync(tokensCssDir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => readFileSync(join(tokensCssDir, file), 'utf8'))
    .join('\n');
} catch {
  console.error(
    `Token CSS not found in ${relative(repoRoot, tokensCssDir)}. Build the tokens package first (pnpm build).`,
  );
  process.exit(2);
}

const defined = new Set(tokenCss.match(/--ds-[\w-]+(?=\s*:)/g));
const assigned = new Set();
const references = [];

const ASSIGNMENT = /(?:^|[\s{;'"`(,])(--ds-[\w-]+)['"`]?\s*[:,]/g;
const COMMENT_LINE = /^\s*(\/\/|\/\*|\*)/;
const REFERENCE = /var\(\s*(--ds-[\w-]*)(\$\{)?/g;

for (const file of walk(componentsDir)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    if (COMMENT_LINE.test(line)) {
      return;
    }
    for (const match of line.matchAll(REFERENCE)) {
      references.push({
        name: match[1],
        dynamic: Boolean(match[2]),
        where: `${relative(repoRoot, file)}:${index + 1}`,
      });
    }
    const withoutReferences = line.replace(REFERENCE, '');
    for (const match of withoutReferences.matchAll(ASSIGNMENT)) {
      assigned.add(match[1]);
    }
    for (const match of line.matchAll(/setProperty\(\s*['"`](--ds-[\w-]+)/g)) {
      assigned.add(match[1]);
    }
  });
}

const definedNames = [...defined];
const missing = references.filter(({ name, dynamic }) => {
  if (dynamic) {
    return !definedNames.some((token) => token.startsWith(name));
  }
  return !defined.has(name) && !assigned.has(name);
});

if (missing.length > 0) {
  console.error(
    `${missing.length} var(--ds-*) reference(s) point at a custom property that is not defined by the tokens (or set by the component):\n`,
  );
  for (const { name, dynamic, where } of missing) {
    console.error(`  ${name}${dynamic ? '${…}' : ''}  ${where}`);
  }
  console.error(
    '\nA misspelt or renamed token silently drops the colour. Fix the name, or define the token in packages/tokens.',
  );
  process.exit(1);
}

console.log(
  `check-token-references: ${references.length} references checked, all resolve.`,
);
