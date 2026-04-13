import React from 'react';

type MockListItemProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockHoverTooltipProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockGroupItemProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockListWrapperProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockListContextProviderProps = {
  children?: React.ReactNode;
};

export const mockListItem = () => {
  jest.mock('@synerise/ds-list-item', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        onClick,
        disabled,
        'data-testid': dataTestId,
      }: MockListItemProps) => (
        <div
          data-testid={dataTestId || 'ds-list-item-component'}
          className={className}
          data-disabled={disabled}
          onClick={disabled ? undefined : onClick}
        >
          {children}
        </div>
      ),
    ),
    HoverTooltip: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockHoverTooltipProps) => (
        <div data-testid={dataTestId || 'ds-hover-tooltip'}>{children}</div>
      ),
    ),
    GroupItem: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockGroupItemProps) => (
        <div data-testid={dataTestId || 'ds-group-item'}>{children}</div>
      ),
    ),
    ListWrapper: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockListWrapperProps) => (
        <div data-testid={dataTestId || 'ds-list-wrapper'}>{children}</div>
      ),
    ),
    useListContext: jest.fn(() => ({})),
    ListContextProvider: jest.fn(
      ({ children }: MockListContextProviderProps) => <>{children}</>,
    ),
  }));
};

export const mockListItemMinimal = () => {
  jest.mock('@synerise/ds-list-item', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    HoverTooltip: jest.fn(() => null),
    GroupItem: jest.fn(() => null),
    ListWrapper: jest.fn(() => null),
    useListContext: jest.fn(() => ({})),
    ListContextProvider: jest.fn(
      ({ children }: MockListContextProviderProps) => <>{children}</>,
    ),
  }));
};
