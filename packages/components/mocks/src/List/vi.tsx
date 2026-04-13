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

/**
 * Factory function for List mock.
 * Mocks the entire @synerise/ds-list package including List, List.Item, List.ItemWrapper, and List.Divider.
 *
 * @example
 * ```typescript
 * import { listMockFactory } from '@synerise/ds-mocks/List/vi';
 *
 * vi.mock('@synerise/ds-list', listMockFactory);
 * ```
 */
export const listMockFactory = () => {
  const Item = vi.fn(
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

  const ItemWrapper = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockListItemWrapperProps) => (
      <div data-testid={dataTestId || 'ds-list-item-wrapper'}>{children}</div>
    ),
  );

  const Divider = vi.fn(
    ({ 'data-testid': dataTestId }: MockListDividerProps) => (
      <hr data-testid={dataTestId || 'ds-list-divider'} />
    ),
  );

  const List = Object.assign(
    vi.fn(
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
    default: List,
  };
};

/**
 * Factory function for minimal List mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-list', listMinimalMockFactory);
 * ```
 */
export const listMinimalMockFactory = () => {
  const List = Object.assign(
    vi.fn(() => null),
    {
      Item: vi.fn(() => null),
      ItemWrapper: vi.fn(() => null),
      Divider: vi.fn(() => null),
    },
  );

  return {
    default: List,
  };
};
