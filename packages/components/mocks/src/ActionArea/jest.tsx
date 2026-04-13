import React from 'react';

import type { ActionAreaProps } from '@synerise/ds-action-area';

export type MockActionAreaProps = ActionAreaProps & {
  'data-testid'?: string;
};

export const mockActionArea = () => {
  jest.mock('@synerise/ds-action-area', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockActionAreaMinimal = () => {
  jest.mock('@synerise/ds-action-area', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
