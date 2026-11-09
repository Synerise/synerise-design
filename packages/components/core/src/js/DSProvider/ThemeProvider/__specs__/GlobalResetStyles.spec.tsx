import React, { type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import ThemeProvider from '../ThemeProvider';

vi.mock('@synerise/ds-tokens/light', () => ({ cssText: '', tokens: {} }));
vi.mock('@synerise/ds-tokens/dark', () => ({ cssText: '', tokens: {} }));

// Universal and pseudo-element-only selectors, which match no element type.
const TYPELESS_SELECTOR = /^(\*|::)/;
const STYLED_COMPONENTS_METADATA = 'data-styled.';

const injectedCss = (tree: ReactNode): string => {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(sheet.collectStyles(tree));
    return sheet
      .getStyleTags()
      .replace(/<\/?style[^>]*>/g, '')
      .replace(/\/\*!sc\*\//g, '');
  } finally {
    sheet.seal();
  }
};

const splitSelectorList = (selectorList: string): string[] => {
  const selectors: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of selectorList) {
    if (char === ',' && depth === 0) {
      selectors.push(current.trim());
      current = '';
      continue;
    }
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    current += char;
  }
  return [...selectors, current.trim()];
};

const ruleSelectors = (css: string): string[] =>
  Array.from(css.matchAll(/([^{}]+)\{[^{}]*\}/g))
    .map(([, selectorList]) => selectorList.trim())
    .filter((selectorList) => !selectorList.startsWith(STYLED_COMPONENTS_METADATA))
    .flatMap(splitSelectorList);

const resetCss = (): string =>
  injectedCss(
    <ThemeProvider>
      <div />
    </ThemeProvider>,
  );

describe('GlobalResetStyles', () => {
  it('wraps every element rule in :where() so component rules always win', () => {
    const unwrapped = ruleSelectors(resetCss()).filter(
      (selector) =>
        !selector.startsWith(':where(') &&
        !selector.startsWith('.snrs-body-portal') &&
        !TYPELESS_SELECTOR.test(selector),
    );

    expect(unwrapped).toEqual([]);
  });

  it('takes every colour from a design token', () => {
    expect(resetCss()).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
  });

  it('colours a hovered link with the brand hover token', () => {
    expect(resetCss()).toContain(
      ':where(a:hover){color:var(--ds-color-text-brand-defaulthover);}',
    );
  });

  it('injects the reset once for nested providers', () => {
    const css = injectedCss(
      <ThemeProvider>
        <ThemeProvider>
          <div />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(css.match(/caption-side/g)).toHaveLength(1);
  });
});
