import { type MenuProps } from 'antd/lib/menu';
import type { TriggerProps } from 'rc-trigger';
import type { Component, LegacyRef, ReactElement, ReactNode } from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';

export type MenuTexts = {
  showLess: ReactNode;
  showMore: ReactNode;
};

export type AntdMenuProps = Omit<MenuProps, 'dataSource' | 'footer'> & {
  dataSource?: MenuItemProps[];
  ordered?: boolean;
  asDropdownMenu?: boolean;
  showTextTooltip?: boolean;
  asInfoCardContainer?: boolean;
  maxToShowItems?: number;
  texts?: Partial<MenuTexts>;
};

export type MenuDividerProps = {
  higher?: boolean;
  level?: number;
};

export enum VisibilityTrigger {
  DEFAULT = 'default',
  HOVER = 'hover',
}

export type SubMenuProps = Omit<MenuProps, 'dataSource' | 'footer'> & {
  key?: string | number;
  danger?: boolean;
  disabled?: boolean;
  parent?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  text?: ReactNode;
  description?: ReactNode;
  ordered?: boolean | undefined;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: ReactNode;
  copyValue?: string;
  childrenCollapsed?: boolean;
  onTitleClick?: () => void;
  checked?: boolean;
  size?: 'default' | 'large';
  ItemComponent: (
    props: SubMenuProps & MenuItemProps & MenuDividerProps,
  ) => ReactElement;
};
export type SubMenuState = {
  uuidKey: string;
};
export type SubMenuItemProps = SubMenuProps &
  MenuItemProps & { onClick?: (item: SubMenuProps) => void };

export enum ItemType {
  DEFAULT = 'default',
  SELECT = 'select',
  DANGER = 'danger',
  DIVIDER = 'divider',
}

export enum ItemSize {
  DEFAULT = 'default',
  LARGE = 'large',
}

export type TriggerHandle = Component<TriggerProps> & {
  getPopupDomNode: () => HTMLElement;
};

export type MenuItemProps = Omit<MenuProps, 'dataSource' | 'footer'> & {
  key?: string | number;
  text?: ReactNode;
  parent?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  disabled?: boolean;
  ordered?: boolean | undefined;
  description?: ReactNode;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: ReactNode;
  copyValue?: string;
  copyTooltip?: ReactNode;
  timeToHideTooltip?: number;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger | string;
  prefixVisibilityTrigger?: VisibilityTrigger | string;

  children?: ReactNode;
  type?: ItemType | string;
  indentLevel?: number;
  menuItemKey?: string | number;
  checked?: boolean;
  size?: 'default' | 'large';
  tooltipProps?: TooltipProps;
  hoverTooltipProps?: TriggerProps & { ref?: LegacyRef<TriggerHandle> };
  renderHoverTooltip?: () => JSX.Element;
};
