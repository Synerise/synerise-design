import React from 'react';

import type { PanelsResizerProps } from '@synerise/ds-panels-resizer';

export type MockPanelsResizerProps = PanelsResizerProps & {
  'data-testid'?: string;
};

export const mockPanelsResizer = () => {
  jest.mock('@synerise/ds-panels-resizer', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockPanelsResizerMinimal = () => {
  jest.mock('@synerise/ds-panels-resizer', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
