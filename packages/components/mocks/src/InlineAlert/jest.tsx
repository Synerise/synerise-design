import React from 'react';

import type { InlineAlertProps } from '@synerise/ds-inline-alert';

export type MockInlineAlertProps = InlineAlertProps & {
  'data-testid'?: string;
};

export const mockInlineAlert = () => {
  jest.mock('@synerise/ds-inline-alert', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockInlineAlertMinimal = () => {
  jest.mock('@synerise/ds-inline-alert', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
