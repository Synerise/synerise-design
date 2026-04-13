import React, { type ReactNode } from 'react';

export type MockMappingProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mockMapping = () => {
  jest.mock('@synerise/ds-mapping', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockMappingProps) => (
        <div
          className={`ds-mapping ${className || ''}`}
          data-testid={dataTestId || 'ds-mapping'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockMappingMinimal = () => {
  jest.mock('@synerise/ds-mapping', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
