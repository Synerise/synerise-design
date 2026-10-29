// Pure token-document transforms used by build-tokens.mjs. No file system access and no Style
// Dictionary, so each step can be tested on its own.

// 'boxShadow' is the Token Studio type; 'shadow' is what sd-transforms normalizes it to
export const INCLUDED_TYPES = new Set([
  'color',
  'boxShadow',
  'shadow',
  'opacity',
]);

// Custom name transform: "section-message.variant.success.bg" → "ds-section-message-variant-success-bg"
export const dsKebabName = (path) =>
  `ds-${path.map((s) => s.replace(/\s+/g, '-').toLowerCase()).join('-')}`;

// DTCG leaf tokens are marked by a `$value` key. (A `value` key without `$` is a child
// token literally named "value", e.g. progressbar.header.value — not a leaf marker.)
export const isLeaf = (node) =>
  node != null && typeof node === 'object' && '$value' in node;

// Keep only leaf tokens whose $type is in INCLUDED_TYPES; preserve group metadata
// ($-prefixed keys) and prune empty groups.
export function filterByType(node) {
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
export function collectPaths(node, prefix, set) {
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
export function extractRefs(value) {
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
export function dropUnresolvable(node, defined) {
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

export const countLeaves = (node) => {
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
export const stripDescriptions = (node) => {
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
export function pruneUnresolvable(docs) {
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

// Leaf paths present in `before` but not in `after`, for the pruning warning.
export const droppedPaths = (before, after) => {
  const kept = new Set();
  for (const doc of after) {
    collectPaths(doc, [], kept);
  }
  const all = new Set();
  for (const doc of before) {
    collectPaths(doc, [], all);
  }
  return [...all].filter((path) => !kept.has(path));
};

// Namespace every custom-color/<family>.json source by family name:
//   color.custom.<shade>      → color.custom.<family>.<shade>
//   color-dark.custom.<shade> → color-dark.custom.<family>.<shade>
// producing per-family SET tokens for all families in one theme-independent doc. `sources` maps
// a family name to its parsed file. The shade list is taken from the first family that has one.
export function namespaceCustomColorFamilies(sources) {
  const families = Object.keys(sources).sort();
  const doc = { color: { 'custom-light': {}, 'custom-dark': {} } };
  let shades = [];
  for (const family of families) {
    const src = sources[family];
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
export function customSemanticTier(families, shades, themeName) {
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

// Namespace every ordered/order-<N>.json source by slot number N:
//   color.ordered.base|hover      → color.ordered.<N>.base|hover
//   color-dark.ordered.base|hover → color-dark.ordered.<N>.base|hover
// producing per-slot SET tokens for all slots in one theme-independent doc. `sources` maps a slot
// number to its parsed file. Slots are numeric-sorted (order-1 … order-21) so the manifest index
// maps directly to the slot. A singular default (the first slot) is also emitted at
// color.ordered.base|hover so the upstream singular semantic tokens (color.background.ordered.*,
// color.text.ordered.base) — and the card-tabs module tokens that chain through them — resolve
// instead of being pruned.
export function namespaceOrderedSlots(sources) {
  const slots = Object.keys(sources)
    .map(Number)
    .sort((a, b) => a - b);
  const doc = {
    color: { 'ordered-light': {}, 'ordered-dark': {}, ordered: {} },
    'color-dark': { ordered: {} },
  };
  for (const n of slots) {
    const src = sources[n];
    doc.color['ordered-light'][n] = src.color?.ordered ?? {};
    doc.color['ordered-dark'][n] = src['color-dark']?.ordered ?? {};
  }
  if (slots.length) {
    const first = slots[0];
    // Singular default kept at the un-suffixed name so the upstream Light/Dark semantic refs
    // {color.ordered.base} / {color-dark.ordered.base} still resolve.
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
export function orderedSemanticTier(slots, themeName) {
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

// The `--ds-*: value;` declarations inside a css/variables file's single selector block.
export const cssVarsBody = (css) =>
  css.match(/\{([\s\S]*)\}/)?.[1].trim() ?? '';

// Flat, fully-resolved token map keyed by the full CSS var name (with `--`), e.g.
// { '--ds-color-text-base-default': '#384350' }, from the json/flat output (names are `ds-…`).
export const toTokenMap = (flat) =>
  Object.fromEntries(
    Object.entries(flat).map(([name, value]) => [`--${name}`, value]),
  );

// Token values come from design-tokens, reviewed as a JSON diff, and reach every consuming app as
// CSS. A value must not be able to end its declaration, open a rule or comment, escape a character,
// raise its priority, load a resource, or close the <style> element it is injected into.
const UNSAFE_CSS_VALUE =
  /[;{}<>\\!@]|\p{Cc}|\/\*|\*\/|\b(?:url|image|image-set|cross-fade|element|expression|src)\s*\(/iu;
const CSS_VAR_NAME = /^--ds-[a-z0-9-]+$/;

const isSafeCssValue = (value) => {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value !== 'string' || UNSAFE_CSS_VALUE.test(value)) {
    return false;
  }
  return value.split('"').length % 2 === 1 && value.split("'").length % 2 === 1;
};

// Lines of a cssVarsBody result that are not a single safe `--ds-*: value;` declaration.
export const unsafeDeclarations = (body) =>
  body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => {
      const match = line.match(/^([^:]+):\s*(.*);$/);
      return (
        !match || !CSS_VAR_NAME.test(match[1]) || !isSafeCssValue(match[2])
      );
    });

// Names in a toTokenMap result whose name or resolved value is unsafe.
export const unsafeTokenValues = (tokens) =>
  Object.entries(tokens)
    .filter(
      ([name, value]) => !CSS_VAR_NAME.test(name) || !isSafeCssValue(value),
    )
    .map(([name]) => name);

// Names manifest (theme-independent): the catalogue + var() refs components index. Values are
// the FLIPPING semantic-tier vars, so a single manifest works in both themes. orderedBase[i] is
// slot i+1; consumers (card-tabs, slider) index these directly.
export const buildNamesManifest = ({ families, shades, slots }) => ({
  customColorNames: families,
  customColors: Object.fromEntries(
    families.map((family) => [
      family,
      Object.fromEntries(
        shades.map((shade) => [
          shade,
          `var(--ds-color-custom-${family}-${shade})`,
        ]),
      ),
    ]),
  ),
  orderedBase: slots.map((n) => `var(--ds-color-ordered-${n}-base)`),
  orderedHover: slots.map((n) => `var(--ds-color-ordered-${n}-hover)`),
});
