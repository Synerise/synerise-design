import React from 'react';

export type MockCompletedWithinProps = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  className?: string;
  'data-testid'?: string;
};

export const completedWithinMockFactory = () => ({
  default: vi.fn(
    ({ className, 'data-testid': dataTestId }: MockCompletedWithinProps) => (
      <div
        className={`ds-completed-within ${className || ''}`}
        data-testid={dataTestId || 'ds-completed-within'}
      />
    ),
  ),
});

export const completedWithinMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
