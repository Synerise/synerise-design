import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { TextareaWrapper } from '@synerise/ds-input/dist/Textarea/Textarea.styles';
import { describe, expect, it } from 'vitest';

import { Subtle } from '../SubtleForm.styles';

describe('SubtleForm focus / error background', () => {
  const renderField = (hasError?: boolean) => {
    const { getByTestId } = renderWithProvider(
      <Subtle data-testid="subtle" hasError={hasError}>
        <TextareaWrapper data-testid="textarea" />
      </Subtle>,
    );
    const textarea = getByTestId('textarea');
    const within = getByTestId('subtle');
    return {
      focused: declarationsFor(textarea, { state: ':focus-within', within }),
      resting: declarationsFor(textarea, { within }),
    };
  };

  it('uses the focus token on the focused textarea by default', () => {
    const { focused, resting } = renderField();

    expect(focused).toContain('background-color:var(--ds-subtle-form-bg-focus)');
    expect(focused).not.toContain('var(--ds-subtle-form-bg-error)');
    expect(resting).not.toContain('--ds-subtle-form-bg-');
  });

  it('uses the error token on the focused textarea when hasError', () => {
    const { focused } = renderField(true);

    expect(focused).toContain('background-color:var(--ds-subtle-form-bg-error)');
    expect(focused).not.toContain('var(--ds-subtle-form-bg-focus)');
  });
});
