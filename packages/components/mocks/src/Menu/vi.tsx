import React from 'react';

type MockMenuProps = {
  children?: React.ReactNode;
  className?: string;
  dataSource?: Array<{
    text?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: string;
    [key: string]: unknown;
  }>;
  ordered?: boolean;
  asDropdownMenu?: boolean;
  'data-testid'?: string;
};

type MockMenuItemProps = {
  children?: React.ReactNode;
  text?: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  checked?: boolean;
  highlight?: string;
  'data-testid'?: string;
};

type MockMenuSubProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for Menu mock.
 * Mocks the entire @synerise/ds-menu package including Menu and its sub-components.
 *
 * @example
 * ```typescript
 * import { menuMockFactory } from '@synerise/ds-mocks/Menu/vi';
 *
 * vi.mock('@synerise/ds-menu', menuMockFactory);
 * ```
 */
export const menuMockFactory = () => {
  const Item = vi.fn(
    ({
      children,
      text,
      description,
      onClick,
      disabled,
      type,
      prefixel,
      suffixel,
      checked,
      'data-testid': dataTestId,
    }: MockMenuItemProps) => {
      const testId = dataTestId || 'ds-menu-item';
      return (
        <div
          data-testid={testId}
          data-type={type}
          data-disabled={disabled}
          data-checked={checked}
          onClick={disabled ? undefined : onClick}
          className="ds-menu-item"
        >
          {prefixel && <span data-testid={`${testId}-prefix`}>{prefixel}</span>}
          <span data-testid={`${testId}-text`}>{text || children}</span>
          {description && (
            <span data-testid={`${testId}-description`}>{description}</span>
          )}
          {suffixel && <span data-testid={`${testId}-suffix`}>{suffixel}</span>}
        </div>
      );
    },
  );

  const Breadcrumb = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
      <div data-testid={dataTestId || 'ds-menu-breadcrumb'}>{children}</div>
    ),
  );

  const Header = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
      <div data-testid={dataTestId || 'ds-menu-header'}>{children}</div>
    ),
  );

  const Divider = vi.fn(({ 'data-testid': dataTestId }: MockMenuSubProps) => (
    <hr data-testid={dataTestId || 'ds-menu-divider'} />
  ));

  const SubMenu = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
      <div data-testid={dataTestId || 'ds-menu-submenu'}>{children}</div>
    ),
  );

  const ItemGroup = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
      <div data-testid={dataTestId || 'ds-menu-item-group'}>{children}</div>
    ),
  );

  const Menu = Object.assign(
    vi.fn(
      ({
        children,
        className,
        dataSource,
        ordered,
        asDropdownMenu,
        'data-testid': dataTestId,
      }: MockMenuProps) => {
        const testId = dataTestId || 'ds-menu';
        return (
          <div
            className={`ds-menu ${className || ''}`}
            data-testid={testId}
            data-ordered={ordered}
            data-as-dropdown={asDropdownMenu}
          >
            {dataSource
              ? dataSource.map((item, i) => (
                  <Item key={i} {...item} data-testid={`${testId}-item-${i}`} />
                ))
              : children}
          </div>
        );
      },
    ),
    { Item, Breadcrumb, Header, Divider, SubMenu, ItemGroup },
  );

  return {
    default: Menu,
    MenuStyles: {},
    VisibilityTrigger: {},
    ItemType: {},
    ItemSize: {},
  };
};

/**
 * Factory function for minimal Menu mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-menu', menuMinimalMockFactory);
 * ```
 */
export const menuMinimalMockFactory = () => {
  const Menu = Object.assign(
    vi.fn(() => null),
    {
      Item: vi.fn(() => null),
      Breadcrumb: vi.fn(() => null),
      Header: vi.fn(() => null),
      Divider: vi.fn(() => null),
      SubMenu: vi.fn(() => null),
      ItemGroup: vi.fn(() => null),
    },
  );

  return {
    default: Menu,
    MenuStyles: {},
    VisibilityTrigger: {},
    ItemType: {},
    ItemSize: {},
  };
};
