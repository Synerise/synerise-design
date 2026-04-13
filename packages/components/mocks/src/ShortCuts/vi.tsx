import React from 'react';

import type { ShortCutsProps } from '@synerise/ds-short-cuts';

export type MockShortCutsProps = ShortCutsProps & {
  'data-testid'?: string;
};

export const shortCutsMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockShortCutsProps) => (
      <div
        className={`ds-short-cuts ${className || ''}`}
        data-testid={dataTestId || 'ds-short-cuts'}
      >
        {children}
      </div>
    ),
  ),
});

export const shortCutsMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
