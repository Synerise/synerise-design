import React from 'react';

import type { ConditionProps } from '@synerise/ds-condition';

export type MockConditionProps = ConditionProps & {
  'data-testid'?: string;
};

export const conditionMockFactory = () => ({
  default: vi.fn(
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
});

export const conditionMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
