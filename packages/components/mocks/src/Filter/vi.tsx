import React, { type ReactNode } from 'react';

export type MockFilterProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const filterMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockFilterProps) => (
      <div
        className={`ds-filter ${className || ''}`}
        data-testid={dataTestId || 'ds-filter'}
      >
        {children}
      </div>
    ),
  ),
});

export const filterMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
