import React, { type ReactNode } from 'react';

export type MockItemFilterProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mockItemFilter = () => {
  jest.mock('@synerise/ds-item-filter', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockItemFilterProps) => (
        <div
          className={`ds-item-filter ${className || ''}`}
          data-testid={dataTestId || 'ds-item-filter'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockItemFilterMinimal = () => {
  jest.mock('@synerise/ds-item-filter', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
