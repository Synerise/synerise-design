import React from 'react';

export type MockCompletedWithinProps = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  className?: string;
  'data-testid'?: string;
};

export const mockCompletedWithin = () => {
  jest.mock('@synerise/ds-completed-within', () => ({
    __esModule: true,
    default: jest.fn(
      ({ className, 'data-testid': dataTestId }: MockCompletedWithinProps) => (
        <div
          className={`ds-completed-within ${className || ''}`}
          data-testid={dataTestId || 'ds-completed-within'}
        />
      ),
    ),
  }));
};

export const mockCompletedWithinMinimal = () => {
  jest.mock('@synerise/ds-completed-within', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
