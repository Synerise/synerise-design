import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { describe, expect, it } from 'vitest';

import { AiGradientLabel, EditorWrapper } from '../RichText.styles';

const getCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('\n')
    .replace(/\s+/g, '');

describe('RichText tokens', () => {
  it('paints the AI label with the module gradient token', () => {
    renderWithProvider(<AiGradientLabel>AI</AiGradientLabel>);
    expect(getCss()).toContain('background:var(--ds-rich-text-ai-label-text)');
  });

  it('uses the hover background token in subtle preview', () => {
    renderWithProvider(<EditorWrapper $subtlePreview />);
    expect(getCss()).toContain('background:var(--ds-rich-text-bg-hover)');
  });
});
