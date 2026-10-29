import { describe, expect, it } from 'vitest';

import {
  buildNamesManifest,
  collectPaths,
  countLeaves,
  cssVarsBody,
  customSemanticTier,
  droppedPaths,
  dsKebabName,
  dropUnresolvable,
  extractRefs,
  filterByType,
  isLeaf,
  namespaceCustomColorFamilies,
  namespaceOrderedSlots,
  orderedSemanticTier,
  pruneUnresolvable,
  stripDescriptions,
  toTokenMap,
  unsafeDeclarations,
  unsafeTokenValues,
} from '../token-transforms.mjs';

// Every fixture is synthetic: these specs pin the transforms, not the token data.
const color = (value) => ({ $type: 'color', $value: value });
const paths = (doc) => {
  const set = new Set();
  collectPaths(doc, [], set);
  return [...set].sort();
};

describe('dsKebabName', () => {
  it('prefixes ds- and joins the path in kebab case', () => {
    expect(dsKebabName(['section-message', 'variant', 'success', 'bg'])).toBe(
      'ds-section-message-variant-success-bg',
    );
  });

  it('lowercases segments and turns whitespace runs into a dash', () => {
    expect(dsKebabName(['Color', 'Text  Base', 'Default'])).toBe(
      'ds-color-text-base-default',
    );
  });
});

describe('isLeaf', () => {
  it('treats a node with $value as a leaf', () => {
    expect(isLeaf(color('#000'))).toBe(true);
  });

  it('does not treat a child token literally named "value" as a leaf marker', () => {
    expect(isLeaf({ value: color('#000') })).toBe(false);
  });

  it('rejects non-objects', () => {
    expect(isLeaf(null)).toBe(false);
    expect(isLeaf('#000')).toBe(false);
  });
});

describe('filterByType', () => {
  it('keeps the included types and drops the rest', () => {
    const doc = {
      a: color('#000'),
      b: { $type: 'dimension', $value: '4px' },
      c: { $type: 'opacity', $value: '0.4' },
      d: { $type: 'boxShadow', $value: { x: 0 } },
      e: { $type: 'shadow', $value: { x: 0 } },
    };

    expect(Object.keys(filterByType(doc))).toEqual(['a', 'c', 'd', 'e']);
  });

  it('keeps group metadata and prunes groups left empty', () => {
    const doc = {
      $description: 'root',
      kept: { $type: 'group', x: color('#000') },
      emptied: { y: { $type: 'typography', $value: {} } },
    };

    expect(filterByType(doc)).toEqual({
      $description: 'root',
      kept: { $type: 'group', x: color('#000') },
    });
  });

  it('keeps a child token named "value" under its group', () => {
    expect(filterByType({ header: { value: color('#000') } })).toEqual({
      header: { value: color('#000') },
    });
  });

  it('returns undefined when nothing is kept', () => {
    expect(filterByType({ a: { $type: 'dimension', $value: '1px' } })).toBeUndefined();
    expect(filterByType({})).toBeUndefined();
  });
});

describe('collectPaths / countLeaves', () => {
  it('lists every leaf as a dot-joined path, skipping $ keys', () => {
    const doc = { $themes: [], a: { b: color('#000'), c: { d: color('#111') } } };

    expect(paths(doc)).toEqual(['a.b', 'a.c.d']);
    expect(countLeaves(doc)).toBe(2);
  });

  it('counts nothing in an empty or non-object document', () => {
    expect(countLeaves({})).toBe(0);
    expect(countLeaves(undefined)).toBe(0);
  });
});

describe('extractRefs', () => {
  it('reads every reference in a string', () => {
    expect(extractRefs('{a.b} {c.d}')).toEqual(['a.b', 'c.d']);
  });

  it('reads references inside composite and array values', () => {
    const shadow = [
      { color: '{color.shadow}', x: 0, blur: '{size.blur}' },
      { color: 'rgba(0,0,0,0.1)' },
    ];

    expect(extractRefs(shadow)).toEqual(['color.shadow', 'size.blur']);
  });

  it('returns nothing for a literal or non-string value', () => {
    expect(extractRefs('#384350')).toEqual([]);
    expect(extractRefs(4)).toEqual([]);
    expect(extractRefs(null)).toEqual([]);
  });
});

describe('dropUnresolvable', () => {
  it('drops leaves with a missing reference and prunes emptied groups', () => {
    const doc = {
      ok: color('{base.a}'),
      literal: color('#000'),
      broken: { only: color('{missing.path}') },
    };

    expect(dropUnresolvable(doc, new Set(['base.a']))).toEqual({
      ok: color('{base.a}'),
      literal: color('#000'),
    });
  });

  it('drops a leaf when any one of several references is missing', () => {
    expect(
      dropUnresolvable({ x: color('{a} {b}') }, new Set(['a'])),
    ).toBeUndefined();
  });
});

describe('pruneUnresolvable', () => {
  it('leaves an internally consistent set unchanged', () => {
    const docs = [{ base: { a: color('#000') } }, { semantic: color('{base.a}') }];

    expect(pruneUnresolvable(docs)).toEqual(docs);
  });

  it('resolves references across documents', () => {
    const [, semantic] = pruneUnresolvable([
      { base: { a: color('#000') } },
      { semantic: color('{base.a}') },
    ]);

    expect(paths(semantic)).toEqual(['semantic']);
  });

  it('drops a cascade of tokens that end in a missing reference', () => {
    const docs = [
      { primitive: color('{outline.missing}') },
      { semantic: color('{primitive}'), other: color('#fff') },
      { module: color('{semantic}') },
    ];

    const pruned = pruneUnresolvable(docs);

    expect(pruned.map(paths)).toEqual([[], ['other'], []]);
    expect(droppedPaths(docs, pruned).sort()).toEqual([
      'module',
      'primitive',
      'semantic',
    ]);
  });

  it('keeps one entry per input document, empty when it lost everything', () => {
    const pruned = pruneUnresolvable([{ a: color('{nope}') }, { b: color('#000') }]);

    expect(pruned).toHaveLength(2);
    expect(pruned[0]).toEqual({});
  });
});

describe('stripDescriptions', () => {
  it('removes nested $description fields, including inside arrays', () => {
    const doc = {
      $description: 'uses ${customColor}-600',
      a: { ...color('#000'), $description: '{not.a.ref}' },
      list: [{ $description: 'x', keep: 1 }],
    };

    expect(stripDescriptions(doc)).toEqual({
      a: color('#000'),
      list: [{ keep: 1 }],
    });
  });

  it('does not mutate its input', () => {
    const doc = { a: { $description: 'x', ...color('#000') } };

    stripDescriptions(doc);

    expect(doc.a.$description).toBe('x');
  });
});

describe('custom colour families', () => {
  const family = (light, dark) => ({
    color: { custom: light },
    ...(dark ? { 'color-dark': { custom: dark } } : {}),
  });

  it('namespaces each family by name, in name order, for both themes', () => {
    const { doc, families, shades } = namespaceCustomColorFamilies({
      red: family({ 600: color('#r6') }, { 600: color('#R6') }),
      blue: family({ 50: color('#b0'), 600: color('#b6') }, { 50: color('#B0') }),
    });

    expect(families).toEqual(['blue', 'red']);
    expect(shades).toEqual(['50', '600']);
    expect(doc.color['custom-light'].red['600']).toEqual(color('#r6'));
    expect(doc.color['custom-dark'].blue['50']).toEqual(color('#B0'));
  });

  it('gives a family without a dark ramp an empty dark group', () => {
    const { doc } = namespaceCustomColorFamilies({ grey: family({ 50: color('#g') }) });

    expect(doc.color['custom-dark'].grey).toEqual({});
  });

  it('builds a semantic tier that references the theme ramp', () => {
    const light = customSemanticTier(['blue'], ['600'], 'light');
    const dark = customSemanticTier(['blue'], ['600'], 'dark');

    expect(light.color.custom.blue['600'].$value).toBe('{color.custom-light.blue.600}');
    expect(dark.color.custom.blue['600'].$value).toBe('{color.custom-dark.blue.600}');
  });

  it('builds a semantic tier that resolves against the namespaced ramps', () => {
    const { doc, families, shades } = namespaceCustomColorFamilies({
      blue: family({ 600: color('#b6') }, { 600: color('#B6') }),
    });

    for (const theme of ['light', 'dark']) {
      const tier = customSemanticTier(families, shades, theme);
      const [, pruned] = pruneUnresolvable([doc, tier]);
      expect(paths(pruned)).toEqual(['color.custom.blue.600']);
    }
  });
});

describe('ordered slots', () => {
  const slot = (base, hover) => ({
    color: { ordered: { base: color(base), hover: color(hover) } },
    'color-dark': { ordered: { base: color(base.toUpperCase()), hover: color(hover.toUpperCase()) } },
  });

  it('sorts slots numerically, not as strings', () => {
    const { slots } = namespaceOrderedSlots({ 10: slot('#a', '#b'), 2: slot('#c', '#d'), 1: slot('#e', '#f') });

    expect(slots).toEqual([1, 2, 10]);
  });

  it('emits the lowest slot as the singular default for both themes', () => {
    const { doc } = namespaceOrderedSlots({ 3: slot('#c', '#d'), 2: slot('#a', '#b') });

    expect(doc.color.ordered.base).toEqual(color('#a'));
    expect(doc.color.ordered.hover).toEqual(color('#b'));
    expect(doc['color-dark'].ordered.base).toEqual(color('#A'));
  });

  it('emits no singular default without slots', () => {
    const { doc, slots } = namespaceOrderedSlots({});

    expect(slots).toEqual([]);
    expect(doc.color.ordered).toEqual({});
  });

  it('builds a semantic tier that resolves against the namespaced slots', () => {
    const { doc, slots } = namespaceOrderedSlots({ 1: slot('#a', '#b'), 2: slot('#c', '#d') });

    for (const theme of ['light', 'dark']) {
      const tier = orderedSemanticTier(slots, theme);
      const group = theme === 'dark' ? 'ordered-dark' : 'ordered-light';
      expect(tier.color.ordered[2].hover.$value).toBe(`{color.${group}.2.hover}`);
      const [, pruned] = pruneUnresolvable([doc, tier]);
      expect(countLeaves(pruned)).toBe(4);
    }
  });
});

describe('build outputs', () => {
  it('reads the declarations inside the selector block', () => {
    const css = ':root {\n  --ds-a: #000;\n  --ds-b: var(--ds-a);\n}\n';

    expect(cssVarsBody(css)).toBe('--ds-a: #000;\n  --ds-b: var(--ds-a);');
    expect(cssVarsBody('')).toBe('');
  });

  it('keys the resolved token map by full CSS var name', () => {
    expect(toTokenMap({ 'ds-color-a': '#000' })).toEqual({ '--ds-color-a': '#000' });
  });

  it('builds a names manifest whose vars match the build naming of the semantic tiers', () => {
    const manifest = buildNamesManifest({
      families: ['blue', 'grey'],
      shades: ['50', '600'],
      slots: [1, 2],
    });
    const varOf = (...path) => `var(--${dsKebabName(path)})`;

    expect(manifest.customColorNames).toEqual(['blue', 'grey']);
    expect(manifest.customColors.grey['50']).toBe(varOf('color', 'custom', 'grey', '50'));
    expect(manifest.orderedBase).toEqual([
      varOf('color', 'ordered', '1', 'base'),
      varOf('color', 'ordered', '2', 'base'),
    ]);
    expect(manifest.orderedHover[1]).toBe(varOf('color', 'ordered', '2', 'hover'));
  });

  it('builds an empty manifest without families or slots', () => {
    expect(buildNamesManifest({ families: [], shades: [], slots: [] })).toEqual({
      customColorNames: [],
      customColors: {},
      orderedBase: [],
      orderedHover: [],
    });
  });
});

describe('output safety', () => {
  const declarations = (entries) =>
    entries.map(([name, value]) => `${name}: ${value};`).join('\n  ');

  it.each([
    ['hex', '#2329361a'],
    ['reference', 'var(--ds-color-blue-600)'],
    ['relative colour', 'rgb(21.961% 26.275% 31.373% / 0.9)'],
    ['shadow', '0 16px 32px 0 #2329361a'],
    ['opacity', '0.4'],
    ['font family', '"Graphik LCG Web", \'Helvetica\', sans-serif'],
  ])('accepts a %s value', (_, value) => {
    expect(unsafeDeclarations(declarations([['--ds-a', value]]))).toEqual([]);
    expect(unsafeTokenValues({ '--ds-a': value })).toEqual([]);
  });

  it.each([
    ['ends the declaration', '#fff; background: red'],
    ['closes the rule', '#fff} body { background: red'],
    ['fetches a resource', 'url(https://example.invalid/x)'],
    ['fetches through image-set', '-webkit-image-set(\'x.png\' 1x)'],
    ['imports a stylesheet', '@import "x.css"'],
    ['opens a comment', '#fff /* x'],
    ['escapes a character', '#fff\\3b'],
    ['raises priority', '#fff !important'],
    ['breaks out of a style element', '</style><script>'],
    ['leaves a string open', '"Graphik, sans-serif'],
    ['spans lines', '#fff\n  body { color: red }'],
  ])('rejects a value that %s', (_, value) => {
    expect(unsafeDeclarations(declarations([['--ds-a', value]]))).not.toEqual([]);
    expect(unsafeTokenValues({ '--ds-a': value })).toEqual(['--ds-a']);
  });

  it('rejects a name outside the --ds-* kebab-case set', () => {
    expect(unsafeDeclarations('--ds-a{}: #fff;')).toEqual(['--ds-a{}: #fff;']);
    expect(unsafeTokenValues({ '--Other': '#fff', '--ds-ok': '#fff' })).toEqual([
      '--Other',
    ]);
  });

  it('rejects a line that is not a single declaration', () => {
    expect(unsafeDeclarations('--ds-a: #fff;\n  body { color: red }')).toEqual([
      'body { color: red }',
    ]);
  });

  it('accepts a numeric resolved value and nothing else that is not a string', () => {
    expect(unsafeTokenValues({ '--ds-a': 0.4, '--ds-b': null })).toEqual(['--ds-b']);
  });
});
