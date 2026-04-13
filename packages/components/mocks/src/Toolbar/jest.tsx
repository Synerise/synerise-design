import React from 'react';

type MockToolbarProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockToolbarGroupProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockToolbarButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockToolbarLabelProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockToolbarDividerProps = {
  'data-testid'?: string;
};

export const mockToolbar = () => {
  jest.mock('@synerise/ds-toolbar', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockToolbarProps) => {
        const testId = dataTestId || 'ds-toolbar';
        return (
          <div data-testid={testId} className={`ds-toolbar ${className || ''}`}>
            {children}
          </div>
        );
      },
    ),
    ToolbarGroup: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockToolbarGroupProps) => (
        <div data-testid={dataTestId || 'ds-toolbar-group'}>{children}</div>
      ),
    ),
    ToolbarButton: jest.fn(
      ({
        children,
        onClick,
        disabled,
        'data-testid': dataTestId,
      }: MockToolbarButtonProps) => (
        <button
          data-testid={dataTestId || 'ds-toolbar-button'}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
        >
          {children}
        </button>
      ),
    ),
    ToolbarLabel: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockToolbarLabelProps) => (
        <span data-testid={dataTestId || 'ds-toolbar-label'}>{children}</span>
      ),
    ),
    ToolbarDivider: jest.fn(
      ({ 'data-testid': dataTestId }: MockToolbarDividerProps) => (
        <hr data-testid={dataTestId || 'ds-toolbar-divider'} />
      ),
    ),
  }));
};

export const mockToolbarMinimal = () => {
  jest.mock('@synerise/ds-toolbar', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    ToolbarGroup: jest.fn(() => null),
    ToolbarButton: jest.fn(() => null),
    ToolbarLabel: jest.fn(() => null),
    ToolbarDivider: jest.fn(() => null),
  }));
};
