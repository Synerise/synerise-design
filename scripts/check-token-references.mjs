import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { basename, dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

import { collectDeclarations, findProblems, scanSource } from './token-references.mjs';

/**
 * Every `var(--ds-*)` used in a component's (or a story's) source must resolve to a custom property
 * that exists, otherwise the declaration silently computes to "unset" (the colour just does not
 * apply) and no test notices: jsdom cannot resolve var(), and a spec that restates the token name
 * from the implementation passes on a typo. This checks the names against the generated token CSS,
 * so it has to run after `pnpm build` (the tokens package emits packages/tokens/dist/css).
 *
 * - A token must exist in every theme file (light and dark); one missing from a theme is reported.
 * - A reference with `${…}` in it is a runtime-built name (`var(--ds-color-custom-${hue}-600)`); each
 *   interpolation matches any name segment, and at least one defined token must match the result.
 * - A name the file declares itself (`--ds-x: …` in CSS / CSS-in-JS, a `'--ds-x': …` style key,
 *   `setProperty('--ds-x', …)`) counts as defined. So does one declared by another file of the same
 *   package or of a workspace package it depends on (ButtonGroup reads the separator Button
 *   publishes). Merely listing a name (`['--ds-x', …]`) declares nothing.
 * - `var(--ds-x, <fallback>)` where no token shares the `--ds-<segment>-` namespace of `--ds-x` is a
 *   consumer override hook (`--ds-highlight-color`); only its fallback is checked. Inside a token
 *   namespace a fallback does not excuse a misspelt name.
 * - `theme.tokens['--ds-x']` lookups read the token map, so they must name a token.
 */
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokensCssDir = join(repoRoot, 'packages', 'tokens', 'dist', 'css');
const storybookDir = join(repoRoot, 'packages', 'storybook');

const SKIP_DIR = new Set(['node_modules', 'dist', 'storybook-static', '__specs__', '__spec__']);
const COMPONENT_SKIP_FILE = /\.(spec|test|stories|figma|d)\.[cm]?[jt]sx?$|\.d\.ts$/;
const SCAN_ROOTS = [
  { dir: join(repoRoot, 'packages', 'components'), include: /\.(ts|tsx|less|css)$/, skip: COMPONENT_SKIP_FILE },
  { dir: join(storybookDir, 'stories'), include: /\.(ts|tsx|js|jsx|mdx|less|css)$/, skip: /\.d\.ts$/ },
  { dir: join(storybookDir, 'public'), include: /\.css$/, skip: null },
  { dir: join(storybookDir, '.storybook'), include: /\.(ts|tsx|js|jsx|mdx|css|html)$/, skip: /\.d\.ts$/ },
];

const walk = (dir, include, skip, files = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIR.has(entry)) {
        walk(full, include, skip, files);
      }
    } else if (include.test(entry) && !(skip && skip.test(entry))) {
      files.push(full);
    }
  }
  return files;
};

const themeFiles = existsSync(tokensCssDir) ? readdirSync(tokensCssDir).filter((file) => file.endsWith('.css')) : [];
if (themeFiles.length === 0) {
  console.error(
    `Token CSS not found in ${relative(repoRoot, tokensCssDir)}. Build the tokens package first (pnpm build).`,
  );
  process.exit(2);
}
const themes = themeFiles.map((file) => ({
  name: basename(file, '.css'),
  tokens: new Set(readFileSync(join(tokensCssDir, file), 'utf8').match(/--ds-[\w-]+(?=\s*:)/g)),
}));

// The workspace package a file belongs to, and the workspace packages each package depends on.
const packageDirOf = (file) => {
  let dir = dirname(file);
  while (dir.startsWith(join(repoRoot, 'packages')) && !existsSync(join(dir, 'package.json'))) {
    dir = dirname(dir);
  }
  return dir;
};
const manifests = new Map();
const manifestOf = (dir) => {
  if (!manifests.has(dir)) {
    const path = join(dir, 'package.json');
    manifests.set(dir, existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {});
  }
  return manifests.get(dir);
};
const dependsOn = (dir, otherDir) => {
  const manifest = manifestOf(dir);
  const name = manifestOf(otherDir).name;
  return Boolean(
    name &&
      [manifest.dependencies, manifest.peerDependencies, manifest.devDependencies].some((deps) => deps?.[name]),
  );
};

const files = SCAN_ROOTS.filter(({ dir }) => existsSync(dir)).flatMap(({ dir, include, skip }) =>
  walk(dir, include, skip),
);

const scanned = files.map((file) => ({ file, ...scanSource(readFileSync(file, 'utf8')) }));
const declaredIn = collectDeclarations(scanned);

const isDeclaredFor = (name, file) => {
  const packageDir = packageDirOf(file);
  return (declaredIn.get(name) ?? []).some((declaringFile) => {
    const declaringDir = packageDirOf(declaringFile);
    return declaringDir === packageDir || dependsOn(packageDir, declaringDir);
  });
};

const displayPath = (file) => relative(repoRoot, file);
const problems = findProblems({ themes, scanned, declaredIn, isDeclaredFor, displayPath });
const referenceCount = scanned.reduce((n, { references }) => n + references.length, 0);

if (problems.length > 0) {
  console.error(
    `${problems.length} --ds-* reference(s) do not resolve to a token in every theme (or a property the file sets itself):\n`,
  );
  for (const { name, file, line, reason } of problems) {
    console.error(`  ${name}  ${displayPath(file)}:${line}  (${reason})`);
  }
  console.error(
    '\nA misspelt or renamed token silently drops the colour. Fix the name, or define the token in packages/tokens.',
  );
  process.exit(1);
}

console.log(`check-token-references: ${referenceCount} references checked in ${files.length} files, all resolve.`);
