import React from 'react';

import type { PanelsResizerProps } from '@synerise/ds-panels-resizer';

export type MockPanelsResizerProps = PanelsResizerProps & {
  'data-testid'?: string;
};

export const panelsResizerMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockPanelsResizerProps) => (
      <div
        className={`ds-panels-resizer ${className || ''}`}
        data-testid={dataTestId || 'ds-panels-resizer'}
      >
        {children}
      </div>
    ),
  ),
});

export const panelsResizerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
