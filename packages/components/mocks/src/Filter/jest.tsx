import React, { type ReactNode } from 'react';

export type MockFilterProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mockFilter = () => {
  jest.mock('@synerise/ds-filter', () => ({
    __esModule: true,
    default: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockFilterProps) => (
        <div
          className={`ds-filter ${className || ''}`}
          data-testid={dataTestId || 'ds-filter'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockFilterMinimal = () => {
  jest.mock('@synerise/ds-filter', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
