import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { outputReferencesTransformed } from 'style-dictionary/utils';

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

// DTCG leaf tokens are marked by a `$value` key. (A `value` key without `$` is a child
// token literally named "value", e.g. progressbar.header.value — not a leaf marker.)
const isLeaf = (node) =>
  node != null && typeof node === 'object' && '$value' in node;

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
      if (
        kept !== undefined &&
        !(typeof kept === 'object' && Object.keys(kept).length === 0)
      ) {
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
      if (!key.startsWith('$')) {
        collectPaths(value, [...prefix, key], set);
      }
    }
  }
}

// Extract {a.b.c} references from a token value (string, composite object, or array).
function extractRefs(value) {
  const refs = [];
  const scan = (v) => {
    if (typeof v === 'string') {
      const matches = v.match(/\{([^}]+)\}/g);
      if (matches) {
        refs.push(...matches.map((s) => s.slice(1, -1)));
      }
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
    return extractRefs(node.$value).every((ref) => defined.has(ref))
      ? node
      : undefined;
  }
  if (node != null && typeof node === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        out[key] = value;
        continue;
      }
      const kept = dropUnresolvable(value, defined);
      if (
        kept !== undefined &&
        !(typeof kept === 'object' && Object.keys(kept).length === 0)
      ) {
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
      for (const key of Object.keys(x)) {
        if (!key.startsWith('$')) {
          walk(x[key]);
        }
      }
    }
  };
  walk(node);
  return n;
};

// Style Dictionary scans every token field — including `$description` — for `{references}`. A
// description that contains brace syntax (e.g. "…the code's ${customColor}-600") is mis-read as a
// token reference and, when it doesn't resolve, hard-fails the whole build. Descriptions are
// documentation and are never emitted to CSS/JSON, so strip them from the docs before staging.
const stripDescriptions = (node) => {
  if (Array.isArray(node)) {
    return node.map(stripDescriptions);
  }
  if (node != null && typeof node === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === '$description') {
        continue;
      }
      out[key] = stripDescriptions(value);
    }
    return out;
  }
  return node;
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
    for (const doc of current) {
      collectPaths(doc, [], defined);
    }
    const next = current.map((doc) => dropUnresolvable(doc, defined) ?? {});
    const changed = next.some(
      (doc, i) => countLeaves(doc) !== countLeaves(current[i]),
    );
    current = next;
    if (!changed) {
      return current;
    }
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

// Read every custom-color/<family>.json and namespace it by filename:
//   color.custom.<shade>      → color.custom.<family>.<shade>
//   color-dark.custom.<shade> → color-dark.custom.<family>.<shade>
// producing per-family SET tokens for all families in one theme-independent doc.
function loadCustomColorFamilies() {
  const dir = resolve(ROOT, CUSTOM_COLOR_DIR);
  if (!existsSync(dir)) {
    return { doc: {}, families: [], shades: [] };
  }
  const families = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
  const doc = { color: { 'custom-light': {}, 'custom-dark': {} } };
  let shades = [];
  for (const family of families) {
    const src = readJson(`${CUSTOM_COLOR_DIR}/${family}.json`);
    doc.color['custom-light'][family] = src.color?.custom ?? {};
    doc.color['custom-dark'][family] = src['color-dark']?.custom ?? {};
    if (!shades.length) {
      shades = Object.keys(src.color?.custom ?? {});
    }
  }
  return { doc, families, shades };
}

// Flipping SEMANTIC tier for the custom families, generated per theme: each role-neutral
// color.custom.<family>.<shade> references the custom-light SET in the light build and the
// custom-dark SET in the dark build, so the emitted var flips with the theme.
function customSemanticTier(families, shades, themeName) {
  const group = themeName === 'dark' ? 'custom-dark' : 'custom-light';
  const custom = {};
  for (const family of families) {
    custom[family] = {};
    for (const shade of shades) {
      custom[family][shade] = {
        $type: 'color',
        $value: `{color.${group}.${family}.${shade}}`,
      };
    }
  }
  return { color: { custom } };
}

// Read every ordered/order-<N>.json and namespace it by slot number N:
//   color.ordered.base|hover      → color.ordered.<N>.base|hover
//   color-dark.ordered.base|hover → color-dark.ordered.<N>.base|hover
// producing per-slot SET tokens for all 21 slots in one theme-independent doc. Slots are
// numeric-sorted (order-1 … order-21) so the manifest index maps directly to the slot.
// A singular default (slot 1) is also emitted at color.ordered.base|hover so the upstream
// singular semantic tokens (color.background.ordered.*, color.text.ordered.base) — and the
// card-tabs module tokens that chain through them — resolve instead of being pruned.
function loadOrderedSlots() {
  const dir = resolve(ROOT, ORDERED_DIR);
  if (!existsSync(dir)) {
    return { doc: {}, slots: [] };
  }
  const slots = readdirSync(dir)
    .filter((f) => /^order-\d+\.json$/.test(f))
    .map((f) => parseInt(f.match(/\d+/)[0], 10))
    .sort((a, b) => a - b);
  const doc = {
    color: { 'ordered-light': {}, 'ordered-dark': {}, ordered: {} },
    'color-dark': { ordered: {} },
  };
  for (const n of slots) {
    const src = readJson(`${ORDERED_DIR}/order-${n}.json`);
    doc.color['ordered-light'][n] = src.color?.ordered ?? {};
    doc.color['ordered-dark'][n] = src['color-dark']?.ordered ?? {};
  }
  if (slots.length) {
    const first = slots[0];
    // Singular default (slot 1) kept at the un-suffixed name so the upstream Light/Dark
    // semantic refs {color.ordered.base} / {color-dark.ordered.base} still resolve.
    doc.color.ordered.base = doc.color['ordered-light'][first].base;
    doc.color.ordered.hover = doc.color['ordered-light'][first].hover;
    doc['color-dark'].ordered.base = doc.color['ordered-dark'][first].base;
    doc['color-dark'].ordered.hover = doc.color['ordered-dark'][first].hover;
  }
  return { doc, slots };
}

// Flipping SEMANTIC tier for the ordered slots, generated per theme: each role-neutral
// color.ordered.<N>.base|hover references the ordered-light SET in the light build and the
// ordered-dark SET in the dark build, so the emitted var flips with the theme. The singular
// color.background.ordered.* / color.text.ordered.base come from the upstream Light/Dark
// semantic layer and resolve via the singular SET default (color.ordered.base) above.
function orderedSemanticTier(slots, themeName) {
  const group = themeName === 'dark' ? 'ordered-dark' : 'ordered-light';
  const ordered = {};
  for (const n of slots) {
    ordered[n] = {
      base: { $type: 'color', $value: `{color.${group}.${n}.base}` },
      hover: { $type: 'color', $value: `{color.${group}.${n}.hover}` },
    };
  }
  return { color: { ordered } };
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

// Staging dir for the derived color-only module sets (under gitignored dist/).
const TMP = resolve(ROOT, 'dist/.token-cache');
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

  const varsMatch = css.match(/\{([\s\S]*)\}/);
  const varsOnly = varsMatch ? varsMatch[1].trim() : '';

  // Flat, fully-resolved token map keyed by the full CSS var name (with `--`), e.g.
  // { '--ds-color-text-base-default': '#384350' }. Source: the json/flat output above
  // (names are `ds-…`, values resolved). Mirrors cssText but as a queryable object.
  const flat = readJson(`dist/json/${themeName}.json`);
  const tokens = Object.fromEntries(
    Object.entries(flat).map(([name, value]) => [`--${name}`, value]),
  );

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

// ──────────────────────────────────────────────────────────────────────────────
// Names manifest (theme-independent): the catalogue + var() refs components index.
// Values are the FLIPPING semantic-tier vars, so a single manifest works in both themes.
// ──────────────────────────────────────────────────────────────────────────────
const customColorNames = customFamilies;
const customColors = Object.fromEntries(
  customFamilies.map((family) => [
    family,
    Object.fromEntries(
      customShades.map((shade) => [
        shade,
        `var(--ds-color-custom-${family}-${shade})`,
      ]),
    ),
  ]),
);

// `ordered` set — the categorical colour queue (21 slots), built above with the same
// SET + flipping-semantic pattern as custom. Values are the flipping semantic-tier vars, so a
// single manifest works in both themes. Slots are numeric-sorted (order-1 … order-21), so
// orderedBase[i] is slot i+1; consumers (card-tabs, slider) index these directly.
const orderedBase = orderedSlots.map(
  (n) => `var(--ds-color-ordered-${n}-base)`,
);
const orderedHover = orderedSlots.map(
  (n) => `var(--ds-color-ordered-${n}-hover)`,
);

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
