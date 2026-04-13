import React, { type ReactNode } from 'react';

export type MockOperatorsProps = {
  children?: ReactNode;
  className?: string;
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  groups?: unknown[];
  'data-testid'?: string;
};

export const operatorsMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockOperatorsProps) => (
      <div
        className={`ds-operators ${className || ''}`}
        data-testid={dataTestId || 'ds-operators'}
      >
        {children}
      </div>
    ),
  ),
});

export const operatorsMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
