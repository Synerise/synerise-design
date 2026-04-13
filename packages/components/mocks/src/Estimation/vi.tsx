import React from 'react';

import type { EstimationProps } from '@synerise/ds-estimation';

export type MockEstimationProps = EstimationProps & {
  'data-testid'?: string;
};

export const estimationMockFactory = () => ({
  default: vi.fn(
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
});

export const estimationMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
