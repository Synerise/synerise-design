import React from 'react';

import type { ActionAreaProps } from '@synerise/ds-action-area';

export type MockActionAreaProps = ActionAreaProps & {
  'data-testid'?: string;
};

export const actionAreaMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockActionAreaProps) => (
      <div
        className={`ds-action-area ${className || ''}`}
        data-testid={dataTestId || 'ds-action-area'}
      >
        {children}
      </div>
    ),
  ),
});

export const actionAreaMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
