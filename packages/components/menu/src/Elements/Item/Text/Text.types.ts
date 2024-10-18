import type { CSSProperties, ReactNode, ReactText } from 'react';
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
  copyHint?: string | ReactNode;
  copyValue?: string;
  copyTooltip?: ReactNode;
  highlight?: string;
  style?: CSSProperties;
  onItemHover?: (event: MouseEvent) => void;
  suffixVisibilityTrigger?: MenuItemProps['suffixVisibilityTrigger'];
  prefixVisibilityTrigger?: MenuItemProps['prefixVisibilityTrigger'];
  indentLevel?: number;
  ordered?: boolean;
  key?: ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
  timeToHideTooltip?: number;
  tooltipProps?: MenuItemProps['tooltipProps'];
  hoverTooltipProps?: MenuItemProps['hoverTooltipProps'];
  renderHoverTooltip?: MenuItemProps['renderHoverTooltip'];
}
