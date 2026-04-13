import React, { type ReactNode } from 'react';

export type MockFactorsProps = {
  children?: ReactNode;
  className?: string;
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  'data-testid'?: string;
};

export const mockFactors = () => {
  jest.mock('@synerise/ds-factors', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockFactorsProps) => (
        <div
          className={`ds-factors ${className || ''}`}
          data-testid={dataTestId || 'ds-factors'}
        >
          {children}
        </div>
      ),
    ),
    factorTypes: {},
    ALL_FACTOR_TYPES: [],
  }));
};

export const mockFactorsMinimal = () => {
  jest.mock('@synerise/ds-factors', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    factorTypes: {},
    ALL_FACTOR_TYPES: [],
  }));
};
