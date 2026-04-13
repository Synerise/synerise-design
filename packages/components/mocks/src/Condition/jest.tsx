import React from 'react';

import type { ConditionProps } from '@synerise/ds-condition';

export type MockConditionProps = ConditionProps & {
  'data-testid'?: string;
};

export const mockCondition = () => {
  jest.mock('@synerise/ds-condition', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockConditionProps) => (
        <div
          className={`ds-condition ${className || ''}`}
          data-testid={dataTestId || 'ds-condition'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockConditionMinimal = () => {
  jest.mock('@synerise/ds-condition', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
