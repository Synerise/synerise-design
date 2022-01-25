import * as React from 'react';
import { MenuProps } from 'antd/lib/menu';
import { MenuItemProps } from '../MenuItem.types';

export type AddonRenderer = (hovered: boolean) => React.ReactNode;

export interface BasicItemProps {
  className?: string;
  parent?: boolean;
  disabled?: boolean;
  prefixel?: React.ReactNode | AddonRenderer;
  suffixel?: React.ReactNode | AddonRenderer;
  danger?: boolean;
  actions?: React.ReactNode;
  onClick?: MenuProps['onClick'];
  description?: string | React.ReactNode;
  copyable?: boolean;
  copyHint?: string | React.ReactNode;
  copyValue?: string;
  copyTooltip?: string | React.ReactNode;
  highlight?: string;
  style?: React.CSSProperties;
  onItemHover?: (e: MouseEvent) => void;
  suffixVisibilityTrigger?: MenuItemProps['suffixVisibilityTrigger'];
  prefixVisibilityTrigger?: MenuItemProps['prefixVisibilityTrigger'];
  indentLevel?: number;
  ordered?: boolean;
  key?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
  timeToHideTooltip?: number;
  tooltipProps?: MenuItemProps['tooltipProps'];
  hoverTooltipProps?: MenuItemProps['hoverTooltipProps'];
  renderHoverTooltip?: MenuItemProps['renderHoverTooltip'];
}
