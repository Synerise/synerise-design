import React from 'react';

import type { ItemsRollProps } from '@synerise/ds-items-roll';

export type MockItemsRollProps = ItemsRollProps & {
  'data-testid'?: string;
};

export const itemsRollMockFactory = () => ({
  default: vi.fn(
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
});

export const itemsRollMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
