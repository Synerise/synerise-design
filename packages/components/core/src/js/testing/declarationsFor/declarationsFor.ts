export type CssRule = {
  // One selector of the rule's selector list, e.g. `.sc-a:hover`.
  selector: string;
  // The rule body as stylis emits it, e.g. `color:var(--ds-x);opacity:0.4;`.
  declarations: string;
  // The enclosing at-rules, e.g. `@media (max-width:768px)`.
  condition?: string;
};

export type RuleFilter = {
  // Which state of the element to read. `'rest'` (the default) keeps the rules
  // whose subject has no state pseudo-class (`:hover`, `:disabled`, …) and no
  // pseudo-element; `'any'` keeps every rule; any other string keeps the rules
  // whose subject contains it, e.g. `':hover'` or `':hover:before'`.
  state?: string;
  // Keep only the rules that reach the element through this ancestor: one of
  // its classes must appear before the selector's subject. It also lets a bare
  // type subject directly under it match, like an Icon's `.icon svg` rule.
  within?: Element | null;
};

// Pseudo-classes that narrow which element matches rather than describing a
// state of it.
const STRUCTURAL = new Set([
  'not',
  'is',
  'where',
  'has',
  'first-child',
  'last-child',
  'only-child',
  'nth-child',
  'nth-last-child',
  'first-of-type',
  'last-of-type',
  'only-of-type',
  'nth-of-type',
  'nth-last-of-type',
  'empty',
  'root',
]);

const OPENING = '([';
const CLOSING = ')]';

// Index after the quoted string starting at `start`, honouring escapes.
const skipString = (text: string, start: number): number => {
  const quote = text[start];
  let index = start + 1;
  while (index < text.length && text[index] !== quote) {
    index += text[index] === '\\' ? 2 : 1;
  }
  return index + 1;
};

// Split on `separator` where it is outside parentheses, brackets and strings,
// so `:has(~ .a, ~ span > .a)` stays one selector.
const splitTopLevel = (text: string, separator: (char: string) => boolean) => {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  let index = 0;
  while (index < text.length) {
    const char = text[index];
    if (char === '"' || char === "'") {
      index = skipString(text, index);
      continue;
    }
    if (OPENING.includes(char)) {
      depth += 1;
    } else if (CLOSING.includes(char)) {
      depth -= 1;
    } else if (depth === 0 && separator(char)) {
      parts.push(text.slice(start, index));
      start = index + 1;
    }
    index += 1;
  }
  parts.push(text.slice(start));
  return parts.map((part) => part.trim()).filter(Boolean);
};

const parseRules = (css: string): CssRule[] => {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules: CssRule[] = [];
  const conditions: string[] = [];
  let start = 0;
  let index = 0;
  while (index < source.length) {
    const char = source[index];
    if (char === '"' || char === "'") {
      index = skipString(source, index);
      continue;
    }
    if (char === '}') {
      conditions.pop();
      start = index + 1;
    } else if (char === '{') {
      const prelude = source.slice(start, index).trim();
      if (prelude.startsWith('@')) {
        conditions.push(prelude);
        start = index + 1;
      } else {
        let end = index + 1;
        while (end < source.length && source[end] !== '}') {
          end =
            source[end] === '"' || source[end] === "'"
              ? skipString(source, end)
              : end + 1;
        }
        const declarations = source.slice(index + 1, end).trim();
        const condition = conditions.length ? conditions.join(' ') : undefined;
        for (const selector of splitTopLevel(prelude, (c) => c === ',')) {
          rules.push({ selector, declarations, condition });
        }
        index = end;
        start = end + 1;
      }
    }
    index += 1;
  }
  return rules;
};

// The selector's last compound (the element it styles) and what precedes it.
const splitSubject = (selector: string) => {
  const compounds = splitTopLevel(selector, (char) => /[\s>+~]/.test(char));
  const subject = compounds[compounds.length - 1] ?? '';
  return {
    subject,
    context: compounds.slice(0, -1).join(' '),
    parent: compounds[compounds.length - 2] ?? '',
  };
};

// Classes a compound requires of its own element — not those inside the
// arguments of :not() or :has().
const classesOf = (compound: string): string[] => {
  let bare = compound;
  while (/\([^()]*\)|\[[^[\]]*\]/.test(bare)) {
    bare = bare.replace(/\([^()]*\)|\[[^[\]]*\]/g, '');
  }
  return Array.from(bare.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g), ([, cls]) => cls);
};

const isRestingState = (subject: string): boolean => {
  const bare = subject.replace(/\([^()]*\)/g, '');
  return Array.from(bare.matchAll(/(::?)([\w-]+)/g)).every(
    ([, colons, name]) => colons === ':' && STRUCTURAL.has(name),
  );
};

const hasAny = (classes: string[], element: Element) =>
  classes.some((cls) => element.classList.contains(cls));

const typeOf = (compound: string) =>
  /^[a-zA-Z][\w-]*/.exec(compound)?.[0]?.toLowerCase();

// Whether `compound` matches an ancestor of `element`, up to `within`.
const isAncestorBelow = (
  compound: string,
  element: Element,
  within: Element,
) => {
  const classes = classesOf(compound);
  const type = typeOf(compound);
  for (let node = element.parentElement; node; node = node.parentElement) {
    if (
      classes.length
        ? hasAny(classes, node)
        : !!type && type === node.tagName.toLowerCase()
    ) {
      return true;
    }
    if (node === within) {
      return false;
    }
  }
  return false;
};

// A bare type subject (`svg`, `span`) names no class of the element, so it
// counts only through `within`, and only when the compound before it matches
// a real ancestor: `.ds-icon svg` styles an svg inside the icon, while
// `.alert > span` never styles the `.alert` span itself.
const isSubject = (
  { subject, parent }: { subject: string; parent: string },
  element: Element,
  within: Element | undefined,
) => {
  const classes = classesOf(subject);
  if (classes.length) {
    return hasAny(classes, element);
  }
  return (
    !!within &&
    typeOf(subject) === element.tagName.toLowerCase() &&
    isAncestorBelow(parent, element, within)
  );
};

// Scoped to the element because styled-components never removes rules, so a
// document-wide search passes on a rule left by another element or test. A rule
// counts only when the element is its subject: `.parent .el` does, `.el .child`
// does not.
export const rulesFor = (
  element: Element | null,
  { state = 'rest', within }: RuleFilter = {},
): CssRule[] => {
  if (!element) {
    throw new Error('declarationsFor: element not found');
  }
  if (within === null) {
    throw new Error('declarationsFor: `within` element not found');
  }
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent ?? '')
    .join('\n');
  return parseRules(css).filter(({ selector }) => {
    const parts = splitSubject(selector);
    const { subject, context } = parts;
    if (!isSubject(parts, element, within)) {
      return false;
    }
    if (within && !hasAny(classesOf(context), within)) {
      return false;
    }
    if (state === 'any') {
      return true;
    }
    return state === 'rest' ? isRestingState(subject) : subject.includes(state);
  });
};

// jsdom drops `var()` on numeric properties (e.g. `opacity`), which is why
// `toHaveStyle` cannot be used for those.
export const declarationsFor = (
  element: Element | null,
  filter?: RuleFilter,
): string =>
  rulesFor(element, filter)
    .map(({ declarations }) => declarations)
    .join(';');
