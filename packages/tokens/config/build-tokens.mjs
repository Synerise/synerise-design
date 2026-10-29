import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { outputReferencesTransformed } from 'style-dictionary/utils';

import {
  buildNamesManifest,
  countLeaves,
  cssVarsBody,
  customSemanticTier,
  droppedPaths,
  dsKebabName,
  filterByType,
  INCLUDED_TYPES,
  namespaceCustomColorFamilies,
  namespaceOrderedSlots,
  orderedSemanticTier,
  pruneUnresolvable,
  stripDescriptions,
  toTokenMap,
  unsafeDeclarations,
  unsafeTokenValues,
} from './token-transforms.mjs';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Register Token Studio transforms
register(StyleDictionary);

StyleDictionary.registerTransform({
  name: 'name/ds-kebab',
  type: 'name',
  transform: (token) => dsKebabName(token.path),
});

StyleDictionary.registerFilter({
  name: 'includedTypes',
  filter: (token) =>
    INCLUDED_TYPES.has(token.$type) || INCLUDED_TYPES.has(token.type),
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

// Shared base token sets that all themes need for reference resolution.
// Phase-2 files (dimensions, spacing) live in this repo but not yet upstream — skip them
// if absent so a partial token sync never hard-fails the build.
const candidateBaseSources = [
  'tokens/primitives/core.json',
  'tokens/semantic/custom-color/blue.json',
  'tokens/semantic/dimensions.json',
  'tokens/semantic/spacing.json',
];
const baseSources = candidateBaseSources.filter((p) =>
  existsSync(resolve(ROOT, p)),
);

const moduleBase = readJson('tokens/modules/base.json');

// ──────────────────────────────────────────────────────────────────────────────
// Categorical colour sets (custom-color families + `ordered` slots).
// Each set is emitted in two tiers, one build transform per theme:
//   SET      --ds-color-custom-light-<family>-<shade>  (+ --ds-color-custom-dark-<family>-<shade>)
//            --ds-color-ordered-light-<N>-base|hover   (+ --ds-color-ordered-dark-<N>-base|hover)
//   SEMANTIC --ds-color-custom-<family>-<shade>           — FLIPS, role-neutral (light→custom-light, dark→custom-dark)
//            --ds-color-ordered-<N>-base|hover            — FLIPS, role-neutral
// Manifest + components reference the SEMANTIC tier (so dark flips); the SET tier is the ramp.
// The existing single-active color.custom.* (from the hand-wired blue.json) is left untouched —
// distinct paths, distinct var names.
// ──────────────────────────────────────────────────────────────────────────────

const CUSTOM_COLOR_DIR = 'tokens/semantic/custom-color';
const ORDERED_DIR = 'tokens/semantic/ordered';

// Read every custom-color/<family>.json, keyed by family (file name), and namespace it.
function loadCustomColorFamilies() {
  const dir = resolve(ROOT, CUSTOM_COLOR_DIR);
  if (!existsSync(dir)) {
    return { doc: {}, families: [], shades: [] };
  }
  const sources = Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [
        f.replace(/\.json$/, ''),
        readJson(`${CUSTOM_COLOR_DIR}/${f}`),
      ]),
  );
  return namespaceCustomColorFamilies(sources);
}

// Read every ordered/order-<N>.json, keyed by slot number, and namespace it.
function loadOrderedSlots() {
  const dir = resolve(ROOT, ORDERED_DIR);
  if (!existsSync(dir)) {
    return { doc: {}, slots: [] };
  }
  const sources = Object.fromEntries(
    readdirSync(dir)
      .filter((f) => /^order-\d+\.json$/.test(f))
      .map((f) => [
        parseInt(f.match(/\d+/)[0], 10),
        readJson(`${ORDERED_DIR}/${f}`),
      ]),
  );
  return namespaceOrderedSlots(sources);
}

const {
  doc: customSetDoc,
  families: customFamilies,
  shades: customShades,
} = loadCustomColorFamilies();
const { doc: orderedSetDoc, slots: orderedSlots } = loadOrderedSlots();

const themes = {
  light: { semantic: 'tokens/semantic/Light.json', selector: ':root' },
  dark: {
    semantic: 'tokens/semantic/Dark.json',
    selector: '[data-ds-theme="dark"]',
  },
};

// Staging dir for the derived color-only module sets. Outside dist/, which is published.
const TMP = resolve(ROOT, 'node_modules/.cache/ds-tokens');
mkdirSync(TMP, { recursive: true });

for (const [themeName, cfg] of Object.entries(themes)) {
  // Load every doc this theme needs: base sources (for reference resolution) + the theme's
  // semantic layer + the color-typed module subset. Prune unresolvable leaves across the
  // whole set, then stage the pruned docs for Style Dictionary.
  const baseDocs = baseSources.map((p) => readJson(p));
  const semanticDoc = readJson(cfg.semantic);
  const semanticCustom = customSemanticTier(
    customFamilies,
    customShades,
    themeName,
  );
  const semanticOrdered = orderedSemanticTier(orderedSlots, themeName);
  const moduleColor = filterByType(moduleBase) ?? {};

  // Order: base sources… , custom SET + ordered SET (→ include), theme semantic (→ source),
  // custom + ordered semantic tiers (→ source), module colour subset (→ source).
  const inputDocs = [
    ...baseDocs,
    customSetDoc,
    orderedSetDoc,
    semanticDoc,
    semanticCustom,
    semanticOrdered,
    moduleColor,
  ];
  const pruned = pruneUnresolvable(inputDocs);
  const nBase = baseDocs.length;
  const prunedBase = pruned.slice(0, nBase);
  const prunedCustomSet = pruned[nBase];
  const prunedOrderedSet = pruned[nBase + 1];
  const prunedSemantic = pruned[nBase + 2];
  const prunedCustomSemantic = pruned[nBase + 3];
  const prunedOrderedSemantic = pruned[nBase + 4];
  const prunedModules = pruned[nBase + 5];

  // Surface (never silently swallow) any tokens dropped for unresolvable references.
  const droppedCount =
    inputDocs.reduce((n, doc) => n + countLeaves(doc), 0) -
    pruned.reduce((n, doc) => n + countLeaves(doc), 0);
  if (droppedCount > 0) {
    const dropped = droppedPaths(inputDocs, pruned);
    const shown = dropped.slice(0, 20).join(', ');
    const more = dropped.length > 20 ? `, … +${dropped.length - 20} more` : '';
    // biome-ignore lint/suspicious/noConsole: a build script has to report tokens that will be absent from the output
    console.warn(
      `  ⚠ pruned ${droppedCount} token(s) with unresolvable references (will be absent from ${themeName}.css): ${shown}${more}`,
    );
  }

  const stage = (obj, name) => {
    const p = resolve(TMP, `${name}.${themeName}.json`);
    writeFileSync(p, JSON.stringify(stripDescriptions(obj), null, 2));
    return p;
  };
  const includePaths = [
    ...prunedBase.map((doc, i) => stage(doc, `base-${i}`)),
    stage(prunedCustomSet, 'custom-set'),
    stage(prunedOrderedSet, 'ordered-set'),
  ];
  const semanticPath = stage(prunedSemantic, 'semantic');
  const customSemanticPath = stage(prunedCustomSemantic, 'custom-semantic');
  const orderedSemanticPath = stage(prunedOrderedSemantic, 'ordered-semantic');
  const modulesPath = stage(prunedModules, 'modules-color');

  const sd = new StyleDictionary({
    include: includePaths,
    source: [
      semanticPath,
      customSemanticPath,
      orderedSemanticPath,
      modulesPath,
    ],
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
              // Keep the var() chain for pass-through references, but inline tokens whose value was
              // transformed (e.g. Token Studio `modify: alpha`) — `outputReferences: true` would emit
              // the base var() and silently drop the alpha. See button translucent bg + translucent.*.
              outputReferences: outputReferencesTransformed,
            },
          },
        ],
      },
      // Flat JSON with references RESOLVED (no outputReferences) — the source for the
      // JS token map. A semantic/module token resolves to its final value (e.g.
      // ds-color-text-base-default → #384350), which is what JS consumers want.
      json: {
        transformGroup: 'tokens-studio',
        transforms: ['name/ds-kebab'],
        buildPath: 'dist/json/',
        files: [
          {
            destination: `${themeName}.json`,
            format: 'json/flat',
            filter: 'includedTypes',
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

  const varsOnly = cssVarsBody(css);

  // Mirrors cssText as a queryable, fully-resolved object (source: the json/flat output above).
  const tokens = toTokenMap(readJson(`dist/json/${themeName}.json`));

  const unsafe = [
    ...unsafeDeclarations(varsOnly),
    ...unsafeTokenValues(tokens),
  ];
  if (unsafe.length > 0) {
    throw new Error(
      `Token build produced ${unsafe.length} unsafe CSS value(s) in ${themeName} — aborting:\n  ` +
        unsafe.slice(0, 20).join('\n  '),
    );
  }

  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.js`),
    `export const cssText = ${JSON.stringify(varsOnly)};\n` +
      `export const tokens = ${JSON.stringify(tokens, null, 2)};\n`,
  );
  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.d.ts`),
    `export declare const cssText: string;\n` +
      `export declare const tokens: Record<string, string>;\n`,
  );
}

writeFileSync(
  resolve(ROOT, 'dist/js/index.js'),
  `export { cssText, tokens } from './light.js';\n`,
);
writeFileSync(
  resolve(ROOT, 'dist/js/index.d.ts'),
  `export { cssText, tokens } from './light.js';\n`,
);

const { customColorNames, customColors, orderedBase, orderedHover } =
  buildNamesManifest({
    families: customFamilies,
    shades: customShades,
    slots: orderedSlots,
  });

writeFileSync(
  resolve(ROOT, 'dist/js/names.js'),
  `export const customColorNames = ${JSON.stringify(customColorNames)};\n` +
    `export const customColors = ${JSON.stringify(customColors, null, 2)};\n` +
    `export const orderedBase = ${JSON.stringify(orderedBase)};\n` +
    `export const orderedHover = ${JSON.stringify(orderedHover)};\n`,
);
writeFileSync(
  resolve(ROOT, 'dist/js/names.d.ts'),
  `export declare const customColorNames: string[];\n` +
    `export declare const customColors: Record<string, Record<string, string>>;\n` +
    `export declare const orderedBase: string[];\n` +
    `export declare const orderedHover: string[];\n`,
);
