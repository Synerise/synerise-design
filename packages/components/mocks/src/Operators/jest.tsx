import React, { type ReactNode } from 'react';

export type MockOperatorsProps = {
  children?: ReactNode;
  className?: string;
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  groups?: unknown[];
  'data-testid'?: string;
};

export const mockOperators = () => {
  jest.mock('@synerise/ds-operators', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockOperatorsMinimal = () => {
  jest.mock('@synerise/ds-operators', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
