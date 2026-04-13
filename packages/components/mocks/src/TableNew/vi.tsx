import React, { type ReactNode } from 'react';

export type MockTableNewProps = {
  children?: ReactNode;
  data?: unknown[];
  columns?: unknown[];
  className?: string;
  'data-testid'?: string;
};

export const tableNewMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockTableNewProps) => (
      <div
        className={`ds-table-new ${className || ''}`}
        data-testid={dataTestId || 'ds-table-new'}
      >
        {children}
      </div>
    ),
  ),
  VirtualTable: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockTableNewProps) => (
      <div
        className={`ds-virtual-table ${className || ''}`}
        data-testid={dataTestId || 'ds-virtual-table'}
      >
        {children}
      </div>
    ),
  ),
  TableCell: {},
});

export const tableNewMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  VirtualTable: vi.fn(() => null),
  TableCell: {},
});
