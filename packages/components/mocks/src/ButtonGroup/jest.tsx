import React from 'react';

type MockButtonGroupProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockButtonDividerProps = {
  'data-testid'?: string;
};

export const mockButtonGroup = () => {
  jest.mock('@synerise/ds-button-group', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockButtonGroupProps) => (
        <div
          data-testid={dataTestId || 'ds-button-group'}
          className={className}
        >
          {children}
        </div>
      ),
    ),
    ButtonDivider: jest.fn(
      ({ 'data-testid': dataTestId }: MockButtonDividerProps) => (
        <hr data-testid={dataTestId || 'ds-button-divider'} />
      ),
    ),
  }));
};

export const mockButtonGroupMinimal = () => {
  jest.mock('@synerise/ds-button-group', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    ButtonDivider: jest.fn(() => null),
  }));
};
