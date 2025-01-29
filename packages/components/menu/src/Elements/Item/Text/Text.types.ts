import type { CSSProperties, ReactNode } from 'react';
import type { MenuProps } from 'antd/lib/menu';
import type { MenuItemProps } from '../MenuItem.types';

export type AddonRenderer = (hovered: boolean) => ReactNode;

export type BasicItemProps = {
  className?: string;
  parent?: boolean;
  disabled?: boolean;
  prefixel?: ReactNode | AddonRenderer;
  suffixel?: ReactNode | AddonRenderer;
  danger?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
  onClick?: MenuProps['onClick'];
  description?: ReactNode;
  copyable?: boolean;
  copyHint?: ReactNode;
  copyValue?: string;
  copyTooltip?: ReactNode;
  highlight?: string;
  style?: CSSProperties;
  suffixVisibilityTrigger?: MenuItemProps['suffixVisibilityTrigger'];
  prefixVisibilityTrigger?: MenuItemProps['prefixVisibilityTrigger'];
  indentLevel?: number;
  ordered?: boolean;
  key?: string | number;
  checked?: boolean;
  size?: 'default' | 'large';
  timeToHideTooltip?: number;
  tooltipProps?: MenuItemProps['tooltipProps'];
  hoverTooltipProps?: MenuItemProps['hoverTooltipProps'];
  renderHoverTooltip?: MenuItemProps['renderHoverTooltip'];
};
