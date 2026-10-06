import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { Inactive, Subtle } from '../SubtleForm.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n')
    .replace(/\s+/g, '');

describe('SubtleForm translucent background tokens', () => {
  it('uses the hover token on the inactive area', () => {
    renderWithProvider(<Inactive $blurred $disabled={false} />);
    expect(getCss()).toContain('var(--ds-subtle-form-bg-hover)');
  });

  it('uses the focus token by default', () => {
    renderWithProvider(<Subtle />);
    const css = getCss();
    expect(css).toContain('background-color:var(--ds-subtle-form-bg-focus)');
    expect(css).not.toContain('var(--ds-subtle-form-bg-error)');
  });

  it('uses the error token when hasError', () => {
    renderWithProvider(<Subtle hasError />);
    expect(getCss()).toContain('background-color:var(--ds-subtle-form-bg-error)');
  });
});
