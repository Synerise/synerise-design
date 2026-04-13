import React from 'react';

import type { StatusProps } from '@synerise/ds-status';

export type MockStatusProps = StatusProps & {
  'data-testid'?: string;
};

export const mockStatus = () => {
  jest.mock('@synerise/ds-status', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        type,
        label,
        children,
        className,
        'data-testid': dataTestId,
      }: MockStatusProps) => (
        <div
          className={`ds-status ${className || ''}`}
          data-testid={dataTestId || 'ds-status'}
          data-type={type}
        >
          {label || children}
        </div>
      ),
    ),
  }));
};

export const mockStatusMinimal = () => {
  jest.mock('@synerise/ds-status', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
