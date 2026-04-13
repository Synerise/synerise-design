import React from 'react';

import type { BroadcastBarProps } from '@synerise/ds-broadcast-bar';

export type MockBroadcastBarProps = BroadcastBarProps & {
  'data-testid'?: string;
};

export const broadcastBarMockFactory = () => ({
  default: vi.fn(
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
});

export const broadcastBarMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
