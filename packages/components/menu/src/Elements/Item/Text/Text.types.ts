import type { MenuProps } from 'antd/lib/menu';
import type { CSSProperties, ReactNode } from 'react';

import type { MenuItemProps } from '../../../Menu.types';

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
  highlight?: string;
  style?: CSSProperties;
  suffixVisibilityTrigger?: MenuItemProps['suffixVisibilityTrigger'];
  prefixVisibilityTrigger?: MenuItemProps['prefixVisibilityTrigger'];
  indentLevel?: number;
  ordered?: boolean;
  key?: string | number;
  checked?: boolean;
  size?: 'default' | 'large';
  hoverTooltipProps?: MenuItemProps['hoverTooltipProps'];
  renderHoverTooltip?: MenuItemProps['renderHoverTooltip'];
} & Pick<
  MenuItemProps,
  | 'copyHint'
  | 'copyValue'
  | 'copyTooltip'
  | 'copyable'
  | 'timeToHideTooltip'
  | 'tooltipProps'
>;
