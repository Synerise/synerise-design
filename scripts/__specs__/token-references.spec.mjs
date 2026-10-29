import { describe, expect, it } from 'vitest';

import {
  collectDeclarations,
  findProblems,
  namespaceOf,
  scanSource,
  stripComments,
} from '../token-references.mjs';

// Synthetic sources and token sets: these specs pin the check's rules, not the token data.
const names = (source) => scanSource(source).references.map(({ name }) => name);

describe('stripComments', () => {
  it('blanks block and HTML comments but keeps their line breaks', () => {
    const stripped = stripComments('a /* x\ny */ b <!-- z\n--> c');

    expect(stripped.split('\n')).toHaveLength(3);
    expect(stripped).not.toMatch(/[xyz]/);
  });

  it('removes line comments at the start of a line or after whitespace', () => {
    expect(stripComments('// all\ncode(); // tail')).toBe('\ncode(); ');
  });

  it('keeps a // inside a URL', () => {
    expect(stripComments("const url = 'https://example.com';")).toBe(
      "const url = 'https://example.com';",
    );
  });
});

describe('scanSource references', () => {
  it('reads a var() reference with its 1-based line', () => {
    const { references } = scanSource('\n\ncolor: var(--ds-color-text-base-default);');

    expect(references).toEqual([
      { name: '--ds-color-text-base-default', hasFallback: false, line: 3 },
    ]);
  });

  it('reports the right line after a multi-line comment', () => {
    const { references } = scanSource('/* a\nb\nc */ var(--ds-a-b)');

    expect(references[0].line).toBe(3);
  });

  it('ignores references inside comments', () => {
    expect(names('// var(--ds-a-b)\n/* var(--ds-c-d) */')).toEqual([]);
  });

  it('notes a fallback', () => {
    const [reference] = scanSource('var(--ds-highlight-color , red)').references;

    expect(reference.hasFallback).toBe(true);
  });

  it('turns each interpolation of a runtime-built name into a wildcard segment', () => {
    const [reference] = scanSource(
      'var(--ds-color-custom-${fn({ a: 1 })}-${shade})',
    ).references;

    expect(reference.name).toBe('--ds-color-custom-${…}-${…}');
    expect(reference.pattern.test('--ds-color-custom-blue-600')).toBe(true);
    expect(reference.pattern.test('--ds-color-custom--600')).toBe(false);
    expect(reference.pattern.test('--ds-color-other-blue-600')).toBe(false);
  });

  it('reads a fully interpolated name after the --ds- prefix', () => {
    expect(names('var(--ds-${name})')).toEqual(['--ds-${…}']);
  });

  it('skips a bare --ds- prefix without an interpolation', () => {
    expect(names('var(--ds-)')).toEqual([]);
  });

  it('reads theme.tokens lookups as token-only references', () => {
    const { references } = scanSource(
      "theme.tokens['--ds-a-b']; tokens?.[\"--ds-c-d\"]; tokens[`--ds-e-f`]",
    );

    expect(references.map(({ name, tokenOnly }) => [name, tokenOnly])).toEqual([
      ['--ds-a-b', true],
      ['--ds-c-d', true],
      ['--ds-e-f', true],
    ]);
  });
});

describe('scanSource declarations', () => {
  it('reads CSS, style-key and setProperty declarations', () => {
    const { local } = scanSource(
      [
        '.x { --ds-css-prop: 1px; }',
        "const style = { '--ds-style-key': value };",
        "el.style.setProperty('--ds-set-prop', value);",
      ].join('\n'),
    );

    expect([...local].sort()).toEqual([
      '--ds-css-prop',
      '--ds-set-prop',
      '--ds-style-key',
    ]);
  });

  it('does not treat a reference or a listed name as a declaration', () => {
    const { local } = scanSource(
      "color: var(--ds-used); const list = ['--ds-listed', '--ds-other'];",
    );

    expect([...local]).toEqual([]);
  });
});

describe('namespaceOf / collectDeclarations', () => {
  it('reads the first name segment as the namespace', () => {
    expect(namespaceOf('--ds-color-text-base')).toBe('--ds-color-');
    expect(namespaceOf('--ds-x')).toBeUndefined();
  });

  it('maps each declared name to the files declaring it', () => {
    const declaredIn = collectDeclarations([
      { file: 'a.ts', local: new Set(['--ds-x', '--ds-y']) },
      { file: 'b.ts', local: new Set(['--ds-x']) },
    ]);

    expect(declaredIn.get('--ds-x')).toEqual(['a.ts', 'b.ts']);
    expect(declaredIn.get('--ds-y')).toEqual(['a.ts']);
  });
});

describe('findProblems', () => {
  const THEMES = [
    { name: 'light', tokens: new Set(['--ds-color-a', '--ds-color-b', '--ds-color-custom-blue-600', '--ds-color-light-only']) },
    { name: 'dark', tokens: new Set(['--ds-color-a', '--ds-color-b', '--ds-color-custom-blue-600']) },
  ];

  const check = (source, { declaredIn = new Map(), isDeclaredFor = () => false } = {}) =>
    findProblems({
      themes: THEMES,
      scanned: [{ file: 'src/X.ts', ...scanSource(source) }],
      declaredIn,
      isDeclaredFor,
    }).map(({ name, reason }) => `${name}: ${reason}`);

  it('accepts a token defined in every theme', () => {
    expect(check('var(--ds-color-a); var(--ds-color-b, red)')).toEqual([]);
  });

  it('reports a token missing from one theme', () => {
    expect(check('var(--ds-color-light-only)')).toEqual([
      '--ds-color-light-only: missing from dark',
    ]);
  });

  it('reports an undefined name, even with a fallback inside a token namespace', () => {
    expect(check('var(--ds-color-typo); var(--ds-color-nope, red)')).toEqual([
      '--ds-color-typo: undefined',
      '--ds-color-nope: undefined',
    ]);
  });

  it('treats a fallback outside every token namespace as a consumer hook', () => {
    expect(check('var(--ds-highlight-color, red)')).toEqual([]);
    expect(check('var(--ds-highlight-color)')).toEqual(['--ds-highlight-color: undefined']);
  });

  it('accepts a name the file declares itself', () => {
    expect(check('.x { --ds-own-prop: 1px; color: var(--ds-own-prop); }')).toEqual([]);
  });

  it('accepts a name declared by a package the file can see', () => {
    const declaredIn = new Map([['--ds-shared-prop', ['dep/Y.ts']]]);

    expect(check('var(--ds-shared-prop)', { declaredIn, isDeclaredFor: () => true })).toEqual([]);
  });

  it('names the unrelated file that declares a name the file cannot see', () => {
    const declaredIn = new Map([['--ds-shared-prop', ['other/Y.ts']]]);

    expect(check('var(--ds-shared-prop)', { declaredIn })).toEqual([
      '--ds-shared-prop: not a token; declared only in unrelated other/Y.ts',
    ]);
  });

  it('never excuses a theme.tokens lookup by a local declaration', () => {
    expect(check("--ds-made-up: 1px; theme.tokens['--ds-made-up']")).toEqual([
      '--ds-made-up: theme.tokens lookup of an undefined token',
    ]);
  });

  it('accepts a runtime-built name some token matches in every theme', () => {
    expect(check('var(--ds-color-custom-${hue}-600)')).toEqual([]);
  });

  it('reports a runtime-built name no token matches', () => {
    expect(check('var(--ds-color-custom-${hue}-650)')).toEqual([
      '--ds-color-custom-${…}-650: no token matches this runtime-built name',
    ]);
  });

  it('reports a runtime-built name matched in only one theme', () => {
    expect(check('var(--ds-color-${part}-only)')).toEqual([
      '--ds-color-${…}-only: no matching token in dark',
    ]);
  });

  it('reports the file and line of each problem', () => {
    const [problem] = findProblems({
      themes: THEMES,
      scanned: [{ file: 'src/X.ts', ...scanSource('\nvar(--ds-color-typo)') }],
      declaredIn: new Map(),
      isDeclaredFor: () => false,
    });

    expect(problem).toEqual({
      name: '--ds-color-typo',
      file: 'src/X.ts',
      line: 2,
      reason: 'undefined',
    });
  });
});
