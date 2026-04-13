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

export const mockCodeSnippet = () => {
  jest.mock('@synerise/ds-code-snippet', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockCodeSnippetMinimal = () => {
  jest.mock('@synerise/ds-code-snippet', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    CodeSnippetType,
  }));
};
