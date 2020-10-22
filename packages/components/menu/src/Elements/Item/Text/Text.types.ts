import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';

export interface BasicItemProps {
  className?: string;
  parent?: boolean;
  disabled?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  danger?: boolean;
  actions?: React.ReactNode;
  onClick?: (props: ClickParam) => void;
  description?: string | React.ReactNode;
  copyable?: boolean;
  copyHint?: string | React.ReactNode;
  copyValue?: string;
  copyTooltip?: string | React.ReactNode;
  highlight?: string;
  style?: React.CSSProperties;
  onItemHover?: (e: MouseEvent) => void;
  suffixVisibilityTrigger?: string;
  prefixVisibilityTrigger?: string;
  indentLevel?: number;
  ordered?: boolean;
  key?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
}