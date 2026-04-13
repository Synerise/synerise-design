import React from 'react';

import type { CodeSnippetProps } from '@synerise/ds-code-snippet';

export type MockCodeSnippetProps = CodeSnippetProps & {
  'data-testid'?: string;
};

export const CodeSnippetType = {
  INLINE: 'inline',
  SINGLE: 'single',
  MULTI: 'multi',
} as const;

export const codeSnippetMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      type,
      'data-testid': dataTestId,
    }: MockCodeSnippetProps) => (
      <div
        className={`ds-code-snippet ${className || ''}`}
        data-testid={dataTestId || 'ds-code-snippet'}
        data-type={type}
      >
        {children}
      </div>
    ),
  ),
  CodeSnippetType,
});

export const codeSnippetMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  CodeSnippetType,
});
