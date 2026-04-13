import React from 'react';

type MockContextSelectorProps = {
  children?: React.ReactNode;
  value?: unknown;
  onChange?: (value: unknown) => void;
  className?: string;
  'data-testid'?: string;
};

export const mockContextSelector = () => {
  jest.mock('@synerise/ds-context-selector', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        value: _value,
        onChange: _onChange,
        className,
        'data-testid': dataTestId,
      }: MockContextSelectorProps) => (
        <div
          data-testid={dataTestId || 'ds-context-selector'}
          className={className}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockContextSelectorMinimal = () => {
  jest.mock('@synerise/ds-context-selector', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
