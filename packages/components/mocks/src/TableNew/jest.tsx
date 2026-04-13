import React, { type ReactNode } from 'react';

export type MockTableNewProps = {
  children?: ReactNode;
  data?: unknown[];
  columns?: unknown[];
  className?: string;
  'data-testid'?: string;
};

export const mockTableNew = () => {
  jest.mock('@synerise/ds-table-new', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockTableNewProps) => (
        <div
          className={`ds-table-new ${className || ''}`}
          data-testid={dataTestId || 'ds-table-new'}
        >
          {children}
        </div>
      ),
    ),
    VirtualTable: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockTableNewProps) => (
        <div
          className={`ds-virtual-table ${className || ''}`}
          data-testid={dataTestId || 'ds-virtual-table'}
        >
          {children}
        </div>
      ),
    ),
    TableCell: {},
  }));
};

export const mockTableNewMinimal = () => {
  jest.mock('@synerise/ds-table-new', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    VirtualTable: jest.fn(() => null),
    TableCell: {},
  }));
};
