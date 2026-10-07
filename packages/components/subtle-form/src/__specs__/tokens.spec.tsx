import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { Subtle } from '../SubtleForm.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n')
    .replace(/\s+/g, '');

describe('SubtleForm focus / error background', () => {
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
