import React from 'react';

import type { BroadcastBarProps } from '@synerise/ds-broadcast-bar';

export type MockBroadcastBarProps = BroadcastBarProps & {
  'data-testid'?: string;
};

export const mockBroadcastBar = () => {
  jest.mock('@synerise/ds-broadcast-bar', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        type,
        children,
        className,
        'data-testid': dataTestId,
      }: MockBroadcastBarProps) => (
        <div
          className={`ds-broadcast-bar ${className || ''}`}
          data-testid={dataTestId || 'ds-broadcast-bar'}
          data-type={type}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockBroadcastBarMinimal = () => {
  jest.mock('@synerise/ds-broadcast-bar', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
