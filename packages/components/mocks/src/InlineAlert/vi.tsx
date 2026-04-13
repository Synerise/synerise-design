import React from 'react';

import type { InlineAlertProps } from '@synerise/ds-inline-alert';

export type MockInlineAlertProps = InlineAlertProps & {
  'data-testid'?: string;
};

export const inlineAlertMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      type,
      message,
      'data-testid': dataTestId,
    }: MockInlineAlertProps) => (
      <div
        className={`ds-inline-alert ${className || ''}`}
        data-testid={dataTestId || 'ds-inline-alert'}
        data-type={type}
      >
        {message}
        {children}
      </div>
    ),
  ),
});

export const inlineAlertMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
