import React, { type ReactNode } from 'react';

export type MockMappingProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mappingMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockMappingProps) => (
      <div
        className={`ds-mapping ${className || ''}`}
        data-testid={dataTestId || 'ds-mapping'}
      >
        {children}
      </div>
    ),
  ),
});

export const mappingMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
