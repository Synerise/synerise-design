// The parsing and resolution behind check-token-references.mjs, without file system access, so
// every rule the check enforces can be tested on a source string.

// Blank out comments but keep line breaks, so reported line numbers stay right. A `//` only starts a
// comment at the start of a line or after whitespace, so `https://…` inside a string survives.
export const stripComments = (source) =>
  source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/(^|\s)\/\/.*$/gm, '$1');

const REFERENCE_START = /var\(\s*(--ds-[\w-]*)/g;
const DECLARATION = /(?:^|[\s{;'"`([])(--ds-[\w-]+)['"`]?\]?\s*:(?!:)/g;
const SET_PROPERTY = /setProperty\(\s*['"`](--ds-[\w-]+)['"`]/g;
const TOKEN_LOOKUP = /tokens\??\.?\[\s*['"`](--ds-[\w-]+)['"`]\s*\]/g;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Read the rest of a `var(--ds-…${…}…)` name from `start`: static name characters are kept, each
// balanced `${…}` interpolation becomes a wildcard segment.
const readDynamicName = (text, start) => {
  const parts = [];
  let index = start;
  while (text.startsWith('${', index)) {
    let depth = 0;
    let end = index + 1;
    for (; end < text.length; end += 1) {
      if (text[end] === '{') {
        depth += 1;
      } else if (text[end] === '}') {
        depth -= 1;
        if (depth === 0) {
          break;
        }
      }
    }
    const tail = /^[\w-]*/.exec(text.slice(end + 1))[0];
    parts.push(tail);
    index = end + 1 + tail.length;
  }
  return parts;
};

// The `--ds-<segment>-` prefix a name shares with its token family.
export const namespaceOf = (name) => /^--ds-[^-]+-/.exec(name)?.[0];

// Every `--ds-*` reference a source makes, and the custom properties it declares itself. Comments
// are stripped first; `line` is 1-based.
export const scanSource = (rawSource) => {
  const source = stripComments(rawSource);
  const lineOf = (offset) => source.slice(0, offset).split('\n').length;
  const references = [];
  for (const match of source.matchAll(REFERENCE_START)) {
    const after = match.index + match[0].length;
    if (match[1] === '--ds-' && !source.startsWith('${', after)) {
      continue;
    }
    if (source.startsWith('${', after)) {
      const tails = readDynamicName(source, after);
      const pattern = new RegExp(`^${[match[1], ...tails].map(escapeRegExp).join('[\\w-]+')}$`);
      references.push({ name: `${match[1]}\${…}${tails.join('${…}')}`, pattern, line: lineOf(match.index) });
    } else {
      const hasFallback = /^\s*,/.test(source.slice(after));
      references.push({ name: match[1], hasFallback, line: lineOf(match.index) });
    }
  }
  for (const match of source.matchAll(TOKEN_LOOKUP)) {
    references.push({ name: match[1], tokenOnly: true, line: lineOf(match.index) });
  }
  const local = new Set();
  const withoutReferences = source.replace(/var\(\s*--ds-[\w-]*/g, '');
  for (const match of [...withoutReferences.matchAll(DECLARATION), ...source.matchAll(SET_PROPERTY)]) {
    local.add(match[1]);
  }
  return { references, local };
};

// Which files declare each custom property, from scanned `{ file, local }` entries.
export const collectDeclarations = (scanned) => {
  const declaredIn = new Map();
  for (const { file, local } of scanned) {
    for (const name of local) {
      declaredIn.set(name, [...(declaredIn.get(name) ?? []), file]);
    }
  }
  return declaredIn;
};

// Every reference that does not resolve, as `{ name, file, line, reason }`.
// - `themes`: `{ name, tokens: Set }` per theme CSS file.
// - `scanned`: `{ file, references, local }` per source file (see scanSource).
// - `declaredIn`: see collectDeclarations.
// - `isDeclaredFor(name, file)`: whether a declaration of `name` is visible to `file` — from its
//   own package or a workspace package it depends on.
// - `displayPath(file)`: how a declaring file is named in a reason.
export const findProblems = ({ themes, scanned, declaredIn, isDeclaredFor, displayPath = (file) => file }) => {
  const allTokens = [...new Set(themes.flatMap(({ tokens }) => [...tokens]))];
  const tokenNamespaces = new Set(allTokens.map(namespaceOf));
  const missingThemes = (name) =>
    themes.filter(({ tokens }) => !tokens.has(name)).map(({ name: theme }) => theme);

  const problems = [];
  for (const { file, references, local } of scanned) {
    for (const { name, pattern, tokenOnly, hasFallback, line } of references) {
      const report = (reason) => problems.push({ name, file, line, reason });
      if (pattern) {
        const matching = allTokens.filter((token) => pattern.test(token));
        if (matching.length === 0) {
          report('no token matches this runtime-built name');
        } else {
          const gaps = themes
            .filter(({ tokens }) => !matching.some((token) => tokens.has(token)))
            .map(({ name: theme }) => theme);
          if (gaps.length > 0) {
            report(`no matching token in ${gaps.join(', ')}`);
          }
        }
        continue;
      }
      if (!tokenOnly && (local.has(name) || isDeclaredFor(name, file))) {
        continue;
      }
      const gaps = missingThemes(name);
      if (gaps.length === 0) {
        continue;
      }
      if (gaps.length < themes.length) {
        report(`missing from ${gaps.join(', ')}`);
      } else if (hasFallback && !tokenNamespaces.has(namespaceOf(name))) {
        continue;
      } else if (!tokenOnly && declaredIn.has(name)) {
        report(`not a token; declared only in unrelated ${declaredIn.get(name).map(displayPath).join(', ')}`);
      } else {
        report(tokenOnly ? 'theme.tokens lookup of an undefined token' : 'undefined');
      }
    }
  }
  return problems;
};
