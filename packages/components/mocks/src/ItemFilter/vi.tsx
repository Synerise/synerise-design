import React, { type ReactNode } from 'react';

export type MockItemFilterProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const itemFilterMockFactory = () => ({
  default: vi.fn(
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
});

export const itemFilterMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
