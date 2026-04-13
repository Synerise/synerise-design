import React from 'react';

import type { FooterProps } from '@synerise/ds-footer';

export type MockFooterProps = FooterProps & {
  'data-testid'?: string;
};

export const mockFooter = () => {
  jest.mock('@synerise/ds-footer', () => ({
    __esModule: true,
    default: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockFooterProps) => (
        <div
          className={`ds-footer ${className || ''}`}
          data-testid={dataTestId || 'ds-footer'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockFooterMinimal = () => {
  jest.mock('@synerise/ds-footer', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
