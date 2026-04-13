import React from 'react';

import type { BadgeProps } from '@synerise/ds-badge';

export type MockBadgeProps = BadgeProps & {
  'data-testid'?: string;
};

export const badgeMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      count,
      status,
      'data-testid': dataTestId,
    }: MockBadgeProps) => (
      <div
        className={`ds-badge ${className || ''}`}
        data-testid={dataTestId || 'ds-badge'}
        data-count={count}
        data-status={status}
      >
        {children}
      </div>
    ),
  ),
});

export const badgeMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
