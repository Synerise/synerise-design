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

export const mockMenu = () => {
  jest.mock('@synerise/ds-menu', () => {
    const Item = jest.fn(
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
            {prefixel && (
              <span data-testid={`${testId}-prefix`}>{prefixel}</span>
            )}
            <span data-testid={`${testId}-text`}>{text || children}</span>
            {description && (
              <span data-testid={`${testId}-description`}>{description}</span>
            )}
            {suffixel && (
              <span data-testid={`${testId}-suffix`}>{suffixel}</span>
            )}
          </div>
        );
      },
    );

    const Breadcrumb = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
        <div data-testid={dataTestId || 'ds-menu-breadcrumb'}>{children}</div>
      ),
    );

    const Header = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
        <div data-testid={dataTestId || 'ds-menu-header'}>{children}</div>
      ),
    );

    const Divider = jest.fn(
      ({ 'data-testid': dataTestId }: MockMenuSubProps) => (
        <hr data-testid={dataTestId || 'ds-menu-divider'} />
      ),
    );

    const SubMenu = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
        <div data-testid={dataTestId || 'ds-menu-submenu'}>{children}</div>
      ),
    );

    const ItemGroup = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockMenuSubProps) => (
        <div data-testid={dataTestId || 'ds-menu-item-group'}>{children}</div>
      ),
    );

    const Menu = Object.assign(
      jest.fn(
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
                    <Item
                      key={i}
                      {...item}
                      data-testid={`${testId}-item-${i}`}
                    />
                  ))
                : children}
            </div>
          );
        },
      ),
      { Item, Breadcrumb, Header, Divider, SubMenu, ItemGroup },
    );

    return {
      __esModule: true,
      default: Menu,
      MenuStyles: {},
      VisibilityTrigger: {},
      ItemType: {},
      ItemSize: {},
    };
  });
};

export const mockMenuMinimal = () => {
  jest.mock('@synerise/ds-menu', () => {
    const Menu = Object.assign(
      jest.fn(() => null),
      {
        Item: jest.fn(() => null),
        Breadcrumb: jest.fn(() => null),
        Header: jest.fn(() => null),
        Divider: jest.fn(() => null),
        SubMenu: jest.fn(() => null),
        ItemGroup: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Menu,
      MenuStyles: {},
      VisibilityTrigger: {},
      ItemType: {},
      ItemSize: {},
    };
  });
};
