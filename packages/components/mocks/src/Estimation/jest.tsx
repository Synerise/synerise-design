import React from 'react';

import type { EstimationProps } from '@synerise/ds-estimation';

export type MockEstimationProps = EstimationProps & {
  'data-testid'?: string;
};

export const mockEstimation = () => {
  jest.mock('@synerise/ds-estimation', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockEstimationProps) => (
        <div
          className={`ds-estimation ${className || ''}`}
          data-testid={dataTestId || 'ds-estimation'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockEstimationMinimal = () => {
  jest.mock('@synerise/ds-estimation', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
