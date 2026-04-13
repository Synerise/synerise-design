import React from 'react';

type MockEmptyStatesProps = {
  children?: React.ReactNode;
  className?: string;
  text?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  'data-testid'?: string;
};

export const mockEmptyStates = () => {
  jest.mock('@synerise/ds-empty-states', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        text,
        label,
        icon,
        button,
        'data-testid': dataTestId,
      }: MockEmptyStatesProps) => {
        const testId = dataTestId || 'ds-empty-states';
        return (
          <div
            className={`ds-empty-states ${className || ''}`}
            data-testid={testId}
          >
            {icon && <div data-testid={`${testId}-icon`}>{icon}</div>}
            {label && <div data-testid={`${testId}-label`}>{label}</div>}
            {text && <div data-testid={`${testId}-text`}>{text}</div>}
            {button && <div data-testid={`${testId}-button`}>{button}</div>}
            {children}
          </div>
        );
      },
    ),
  }));
};

export const mockEmptyStatesMinimal = () => {
  jest.mock('@synerise/ds-empty-states', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
