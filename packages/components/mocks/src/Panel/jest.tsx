import React from 'react';

import type { PanelProps } from '@synerise/ds-panel';

export type MockPanelProps = PanelProps & {
  'data-testid'?: string;
};

export const mockPanel = () => {
  jest.mock('@synerise/ds-panel', () => ({
    __esModule: true,
    default: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockPanelProps) => (
        <div
          className={`ds-panel ${className || ''}`}
          data-testid={dataTestId || 'ds-panel'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockPanelMinimal = () => {
  jest.mock('@synerise/ds-panel', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
