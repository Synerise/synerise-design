import { type MenuProps } from 'antd/lib/menu';
import type { ReactElement, ReactNode } from 'react';

import {
  type DelayConfig,
  type LegacyPlacement,
  type PopoverOptions,
} from '@synerise/ds-popover';
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
  popoverDelay?: DelayConfig;
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
/**
 * @deprecated
 * provide Copyable type instead
 */
type CopyableBoolean = boolean;
export type Copyable = {
  timeToReset?: number;
  copyValue: string;
  copiedLabel?: ReactNode;
  delayClickEvent?: number | false;
};

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
  copyable?: CopyableBoolean | Copyable;
  /**
   * @deprecated. Provide copyable: Copyable instead
   */
  copyValue?: string;
  /**
   * @deprecated - there's no hint on hover anymore
   */
  copyHint?: ReactNode;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  copyTooltip?: ReactNode;
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
  copyable?: CopyableBoolean | Copyable;
  /**
   * @deprecated. Provide copyable: Copyable instead
   */
  copyValue?: string;
  /**
   * @deprecated - there's no hint on hover anymore
   */
  copyHint?: ReactNode;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  copyTooltip?: ReactNode;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  timeToHideTooltip?: number;
  /**
   * @deprecated - there's no tooltip after copying anymore
   */
  tooltipProps?: TooltipProps;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger | string;
  prefixVisibilityTrigger?: VisibilityTrigger | string;

  children?: ReactNode;
  type?: ItemType | string;
  indentLevel?: number;
  menuItemKey?: string | number;
  checked?: boolean;
  size?: 'default' | 'large';
  popoverProps?: Pick<
    PopoverOptions,
    | 'getPopupContainer'
    | 'offsetConfig'
    | 'flipConfig'
    | 'shiftConfig'
    | 'initialOpen'
  > & {
    placement?: LegacyPlacement;
  };
  renderHoverTooltip?: () => JSX.Element;
};
