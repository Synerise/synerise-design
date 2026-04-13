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

/**
 * Factory function for ListItem mock.
 * Mocks the entire @synerise/ds-list-item package including ListItem, HoverTooltip,
 * GroupItem, ListWrapper, useListContext, and ListContextProvider.
 *
 * @example
 * ```typescript
 * import { listItemMockFactory } from '@synerise/ds-mocks/ListItem/vi';
 *
 * vi.mock('@synerise/ds-list-item', listItemMockFactory);
 * ```
 */
export const listItemMockFactory = () => ({
  default: vi.fn(
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
  HoverTooltip: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockHoverTooltipProps) => (
      <div data-testid={dataTestId || 'ds-hover-tooltip'}>{children}</div>
    ),
  ),
  GroupItem: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockGroupItemProps) => (
      <div data-testid={dataTestId || 'ds-group-item'}>{children}</div>
    ),
  ),
  ListWrapper: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockListWrapperProps) => (
      <div data-testid={dataTestId || 'ds-list-wrapper'}>{children}</div>
    ),
  ),
  useListContext: vi.fn(() => ({})),
  ListContextProvider: vi.fn(({ children }: MockListContextProviderProps) => (
    <>{children}</>
  )),
});

/**
 * Factory function for minimal ListItem mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-list-item', listItemMinimalMockFactory);
 * ```
 */
export const listItemMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  HoverTooltip: vi.fn(() => null),
  GroupItem: vi.fn(() => null),
  ListWrapper: vi.fn(() => null),
  useListContext: vi.fn(() => ({})),
  ListContextProvider: vi.fn(({ children }: MockListContextProviderProps) => (
    <>{children}</>
  )),
});
