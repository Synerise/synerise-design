import React from 'react';

import type { StatusProps } from '@synerise/ds-status';

export type MockStatusProps = StatusProps & {
  'data-testid'?: string;
};

export const statusMockFactory = () => ({
  default: vi.fn(
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
});

export const statusMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
