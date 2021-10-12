import * as React from 'react';
import { MenuProps } from 'antd/lib/menu';

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
  hideAfterClick?: number;
  highlight?: string;
  style?: React.CSSProperties;
  onItemHover?: (e: MouseEvent) => void;
  suffixVisibilityTrigger?: 'default' | 'hover';
  prefixVisibilityTrigger?: 'default' | 'hover';
  indentLevel?: number;
  ordered?: boolean;
  key?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
}
