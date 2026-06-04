import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Register Token Studio transforms
register(StyleDictionary);

// Custom name transform: "section-message.variant.success.bg" → "ds-section-message-variant-success-bg"
StyleDictionary.registerTransform({
  name: 'name/ds-kebab',
  type: 'name',
  transform: (token) =>
    `ds-${token.path.map((s) => s.replace(/\s+/g, '-').toLowerCase()).join('-')}`,
});

// 'boxShadow' is the Token Studio type; 'shadow' is what sd-transforms normalizes it to
const INCLUDED_TYPES = new Set(['color', 'boxShadow', 'shadow', 'opacity']);

StyleDictionary.registerFilter({
  name: 'includedTypes',
  filter: (token) => INCLUDED_TYPES.has(token.$type) || INCLUDED_TYPES.has(token.type),
});

// ──────────────────────────────────────────────────────────────────────────────
// Derive the color-only module subset from modules/base.json at build time.
//
// modules/base.json holds the full component token set (color, dimension, typography,
// shadow…). Many non-color tokens — and a handful of color/shadow tokens — reference
// primitives that do not exist yet (e.g. outline.*, shadow.level.*), which makes Style
// Dictionary throw "reference could not be found". We therefore feed Style Dictionary
// only the color/boxShadow/shadow/opacity tokens whose references actually resolve.
//
// This replaces the previously hand-maintained modules/colors-only.json: the subset is
// now computed from base.json on every build, so a token sync needs no manual extraction,
// and tokens whose reference targets (outline.*, shadow.level.*, …) appear upstream later
// are picked up automatically.
// ──────────────────────────────────────────────────────────────────────────────

const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf-8'));

// DTCG leaf tokens are marked by a `$value` key. (A `value` key without `$` is a child
// token literally named "value", e.g. progressbar.header.value — not a leaf marker.)
const isLeaf = (node) => node != null && typeof node === 'object' && '$value' in node;

// Keep only leaf tokens whose $type is in INCLUDED_TYPES; preserve group metadata
// ($-prefixed keys) and prune empty groups.
function filterByType(node) {
  if (isLeaf(node)) {
    return INCLUDED_TYPES.has(node.$type) ? node : undefined;
  }
  if (node != null && typeof node === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        out[key] = value;
        continue;
      }
      const kept = filterByType(value);
      if (kept !== undefined && !(typeof kept === 'object' && Object.keys(kept).length === 0)) {
        out[key] = kept;
      }
    }
    return Object.keys(out).length ? out : undefined;
  }
  return undefined;
}

// Collect every defined leaf token path (dot-joined) from a token document.
function collectPaths(node, prefix, set) {
  if (isLeaf(node)) {
    set.add(prefix.join('.'));
    return;
  }
  if (node != null && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (!key.startsWith('$')) collectPaths(value, [...prefix, key], set);
    }
  }
}

// Extract {a.b.c} references from a token value (string, composite object, or array).
function extractRefs(value) {
  const refs = [];
  const scan = (v) => {
    if (typeof v === 'string') {
      const matches = v.match(/\{([^}]+)\}/g);
      if (matches) refs.push(...matches.map((s) => s.slice(1, -1)));
    } else if (Array.isArray(v)) {
      v.forEach(scan);
    } else if (v != null && typeof v === 'object') {
      Object.values(v).forEach(scan);
    }
  };
  scan(value);
  return refs;
}

// Drop leaf tokens whose references point to paths not present in `defined`; prune empties.
function dropUnresolvable(node, defined) {
  if (isLeaf(node)) {
    return extractRefs(node.$value).every((ref) => defined.has(ref)) ? node : undefined;
  }
  if (node != null && typeof node === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        out[key] = value;
        continue;
      }
      const kept = dropUnresolvable(value, defined);
      if (kept !== undefined && !(typeof kept === 'object' && Object.keys(kept).length === 0)) {
        out[key] = kept;
      }
    }
    return Object.keys(out).length ? out : undefined;
  }
  return undefined;
}

const countLeaves = (node) => {
  let n = 0;
  const walk = (x) => {
    if (isLeaf(x)) {
      n += 1;
      return;
    }
    if (x != null && typeof x === 'object') {
      for (const key of Object.keys(x)) if (!key.startsWith('$')) walk(x[key]);
    }
  };
  walk(node);
  return n;
};

// Iteratively drop unresolvable leaves from a set of token documents until the combined
// set is stable. The universe of resolvable paths shrinks as leaves drop, so a token that
// referenced a now-dropped token is dropped on the next pass (handles cascades).
//
// On internally-consistent tokens this is a no-op (nothing is unresolvable). On a partial
// sync — e.g. color-only primitives without the spacing primitives that the local phase-2
// dimensions/spacing files reference — it drops exactly the broken tokens so the build
// never hard-fails. Broken non-output tokens (dimension/typography) are filtered out at
// output anyway; broken color/shadow tokens (outline.*, shadow.level.*) surface as absent
// vars in the Chromatic diff rather than a failed pipeline.
function pruneUnresolvable(docs) {
  let current = docs;
  for (;;) {
    const defined = new Set();
    for (const doc of current) collectPaths(doc, [], defined);
    const next = current.map((doc) => dropUnresolvable(doc, defined) ?? {});
    const changed = next.some((doc, i) => countLeaves(doc) !== countLeaves(current[i]));
    current = next;
    if (!changed) return current;
  }
}

// Shared base token sets that all themes need for reference resolution.
// Phase-2 files (dimensions, spacing) live in this repo but not yet upstream — skip them
// if absent so a partial token sync never hard-fails the build.
const candidateBaseSources = [
  'tokens/primitives/core.json',
  'tokens/semantic/custom-color/blue.json',
  'tokens/semantic/dimensions.json',
  'tokens/semantic/spacing.json',
];
const baseSources = candidateBaseSources.filter((p) => existsSync(resolve(ROOT, p)));

const moduleBase = readJson('tokens/modules/base.json');

const themes = {
  light: { semantic: 'tokens/semantic/Light.json', selector: ':root' },
  dark: { semantic: 'tokens/semantic/Dark.json', selector: '[data-ds-theme="dark"]' },
};

// Staging dir for the derived color-only module sets (under gitignored dist/).
const TMP = resolve(ROOT, 'dist/.token-cache');
mkdirSync(TMP, { recursive: true });

for (const [themeName, cfg] of Object.entries(themes)) {
  console.log(`\nBuilding theme: ${themeName}`);

  // Load every doc this theme needs: base sources (for reference resolution) + the theme's
  // semantic layer + the color-typed module subset. Prune unresolvable leaves across the
  // whole set, then stage the pruned docs for Style Dictionary.
  const baseDocs = baseSources.map((p) => readJson(p));
  const semanticDoc = readJson(cfg.semantic);
  const moduleColor = filterByType(moduleBase) ?? {};

  const inputDocs = [...baseDocs, semanticDoc, moduleColor];
  const pruned = pruneUnresolvable(inputDocs);
  const prunedBase = pruned.slice(0, baseDocs.length);
  const prunedSemantic = pruned[baseDocs.length];
  const prunedModules = pruned[baseDocs.length + 1];

  // Surface (never silently swallow) any tokens dropped for unresolvable references.
  const droppedCount =
    inputDocs.reduce((n, doc) => n + countLeaves(doc), 0) -
    pruned.reduce((n, doc) => n + countLeaves(doc), 0);
  if (droppedCount > 0) {
    console.warn(
      `  ⚠ pruned ${droppedCount} token(s) with unresolvable references (will be absent from ${themeName}.css)`,
    );
  }

  const stage = (obj, name) => {
    const p = resolve(TMP, `${name}.${themeName}.json`);
    writeFileSync(p, JSON.stringify(obj, null, 2));
    return p;
  };
  const includePaths = prunedBase.map((doc, i) => stage(doc, `base-${i}`));
  const semanticPath = stage(prunedSemantic, 'semantic');
  const modulesPath = stage(prunedModules, 'modules-color');

  const sd = new StyleDictionary({
    include: includePaths,
    source: [semanticPath, modulesPath],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/ds-kebab'],
        buildPath: 'dist/css/',
        files: [
          {
            destination: `${themeName}.css`,
            format: 'css/variables',
            filter: 'includedTypes',
            options: {
              selector: cfg.selector,
              outputReferences: true,
            },
          },
        ],
      },
    },
    log: {
      verbosity: 'default',
      warnings: 'disabled',
    },
  });

  await sd.buildAllPlatforms();
}

// Generate JS modules that export the CSS as a string constant.
// ds-core imports these and injects via createGlobalStyle.
mkdirSync(resolve(ROOT, 'dist/js'), { recursive: true });

for (const themeName of Object.keys(themes)) {
  const css = readFileSync(resolve(ROOT, `dist/css/${themeName}.css`), 'utf-8');

  // Sanity guard: a silently-empty build must not reach Chromatic/consumers.
  if (!css.includes('--ds-color-')) {
    throw new Error(
      `Token build produced no "--ds-color-" custom properties in ${themeName}.css — aborting.`,
    );
  }

  const varsMatch = css.match(/\{([\s\S]*)\}/);
  const varsOnly = varsMatch ? varsMatch[1].trim() : '';

  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.js`),
    `export const cssText = ${JSON.stringify(varsOnly)};\n`,
  );
  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.d.ts`),
    `export declare const cssText: string;\n`,
  );
}

writeFileSync(
  resolve(ROOT, 'dist/js/index.js'),
  `export { cssText } from './light.js';\n`,
);
writeFileSync(
  resolve(ROOT, 'dist/js/index.d.ts'),
  `export { cssText } from './light.js';\n`,
);

console.log('✓ Token build complete.');
