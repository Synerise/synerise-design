import type { Component, LegacyRef, ReactNode } from 'react';
import { MenuProps } from 'antd/lib/menu';
import type { TriggerProps } from 'rc-trigger';
import { TooltipProps } from '@synerise/ds-tooltip/dist/Tooltip.types';
import { VisibilityTrigger } from '../../Menu.types';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

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

export type TriggerHandle = Component<TriggerProps> & { getPopupDomNode: () => HTMLElement };

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
}
