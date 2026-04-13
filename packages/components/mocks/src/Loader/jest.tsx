import React from 'react';

import type { LoaderProps } from '@synerise/ds-loader';

export type MockLoaderProps = LoaderProps & {
  'data-testid'?: string;
};

export const mockLoader = () => {
  jest.mock('@synerise/ds-loader', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        size,
        'data-testid': dataTestId,
      }: MockLoaderProps) => (
        <div
          className={`ds-loader ${className || ''}`}
          data-testid={dataTestId || 'ds-loader'}
          data-size={size}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockLoaderMinimal = () => {
  jest.mock('@synerise/ds-loader', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
