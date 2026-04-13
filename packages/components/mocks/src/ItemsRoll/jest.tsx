import React from 'react';

import type { ItemsRollProps } from '@synerise/ds-items-roll';

export type MockItemsRollProps = ItemsRollProps & {
  'data-testid'?: string;
};

export const mockItemsRoll = () => {
  jest.mock('@synerise/ds-items-roll', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockItemsRollProps) => (
        <div
          className={`ds-items-roll ${className || ''}`}
          data-testid={dataTestId || 'ds-items-roll'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockItemsRollMinimal = () => {
  jest.mock('@synerise/ds-items-roll', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
