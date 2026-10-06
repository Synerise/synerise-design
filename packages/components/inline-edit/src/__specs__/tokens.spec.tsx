import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { IconWrapper } from '../InlineEdit.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n')
    .replace(/\s+/g, '');

describe('InlineEdit icon button tokens', () => {
  it('uses the active background token', () => {
    renderWithProvider(<IconWrapper size="normal" />);
    expect(getCss()).toContain(
      'background-color:var(--ds-inline-edit-icon-btn-bg-active)',
    );
  });
});
