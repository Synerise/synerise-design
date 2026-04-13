import React from 'react';

type MockListProps = {
  children?: React.ReactNode;
  className?: string;
  dataSource?: unknown[];
  'data-testid'?: string;
};

type MockListItemProps = {
  children?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockListItemWrapperProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockListDividerProps = {
  'data-testid'?: string;
};

export const mockList = () => {
  jest.mock('@synerise/ds-list', () => {
    const Item = jest.fn(
      ({
        children,
        text,
        icon,
        onClick,
        disabled,
        'data-testid': dataTestId,
      }: MockListItemProps) => {
        const testId = dataTestId || 'ds-list-item';
        return (
          <div
            data-testid={testId}
            data-disabled={disabled}
            onClick={disabled ? undefined : onClick}
            className="ds-list-item"
          >
            {icon && <span data-testid={`${testId}-icon`}>{icon}</span>}
            {text && <span data-testid={`${testId}-text`}>{text}</span>}
            {children}
          </div>
        );
      },
    );

    const ItemWrapper = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockListItemWrapperProps) => (
        <div data-testid={dataTestId || 'ds-list-item-wrapper'}>{children}</div>
      ),
    );

    const Divider = jest.fn(
      ({ 'data-testid': dataTestId }: MockListDividerProps) => (
        <hr data-testid={dataTestId || 'ds-list-divider'} />
      ),
    );

    const List = Object.assign(
      jest.fn(
        ({
          children,
          className,
          dataSource: _dataSource,
          'data-testid': dataTestId,
        }: MockListProps) => {
          const testId = dataTestId || 'ds-list';
          return (
            <div data-testid={testId} className={`ds-list ${className || ''}`}>
              {children}
            </div>
          );
        },
      ),
      { Item, ItemWrapper, Divider },
    );

    return {
      __esModule: true,
      default: List,
    };
  });
};

export const mockListMinimal = () => {
  jest.mock('@synerise/ds-list', () => {
    const List = Object.assign(
      jest.fn(() => null),
      {
        Item: jest.fn(() => null),
        ItemWrapper: jest.fn(() => null),
        Divider: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: List,
    };
  });
};
