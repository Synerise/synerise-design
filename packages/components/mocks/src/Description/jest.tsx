import React from 'react';

type MockDescriptionProps = {
  children?: React.ReactNode;
  rows?: unknown[];
  className?: string;
  'data-testid'?: string;
};

type MockDescriptionRowProps = {
  children?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
  'data-testid'?: string;
};

type MockDescriptionCopyableProps = {
  children?: React.ReactNode;
  value?: React.ReactNode;
  'data-testid'?: string;
};

export const mockDescription = () => {
  jest.mock('@synerise/ds-description', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        rows: _rows,
        className,
        'data-testid': dataTestId,
      }: MockDescriptionProps) => (
        <div
          data-testid={dataTestId || 'ds-description-component'}
          className={className}
        >
          {children}
        </div>
      ),
    ),
    DescriptionRow: jest.fn(
      ({
        children,
        label,
        value,
        'data-testid': dataTestId,
      }: MockDescriptionRowProps) => (
        <div data-testid={dataTestId || 'ds-description-row'}>
          {label && (
            <span data-testid={`${dataTestId || 'ds-description-row'}-label`}>
              {label}
            </span>
          )}
          {value && (
            <span data-testid={`${dataTestId || 'ds-description-row'}-value`}>
              {value}
            </span>
          )}
          {children}
        </div>
      ),
    ),
    DescriptionCopyable: jest.fn(
      ({
        children,
        value,
        'data-testid': dataTestId,
      }: MockDescriptionCopyableProps) => (
        <div data-testid={dataTestId || 'ds-description-copyable'}>
          {value && <span>{value}</span>}
          {children}
        </div>
      ),
    ),
  }));
};

export const mockDescriptionMinimal = () => {
  jest.mock('@synerise/ds-description', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    DescriptionRow: jest.fn(() => null),
    DescriptionCopyable: jest.fn(() => null),
  }));
};
