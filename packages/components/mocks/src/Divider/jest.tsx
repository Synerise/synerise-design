import React from 'react';

type MockDividerProps = {
  className?: string;
  dashed?: boolean;
  'data-testid'?: string;
};

export const mockDivider = () => {
  jest.mock('@synerise/ds-divider', () => ({
    __esModule: true,
    default: jest.fn(
      ({ className, dashed, 'data-testid': dataTestId }: MockDividerProps) => (
        <hr
          className={`ds-divider ${className || ''}`}
          data-testid={dataTestId || 'ds-divider'}
          data-dashed={dashed}
        />
      ),
    ),
  }));
};

export const mockDividerMinimal = () => {
  jest.mock('@synerise/ds-divider', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
