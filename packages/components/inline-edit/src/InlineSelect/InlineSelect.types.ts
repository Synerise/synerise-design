import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { InputProps } from '../InlineEdit.types';

export interface InlineSelectProps {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: Partial<InputProps>;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  expanded: boolean;
  placeholder?: string;
  dataSource: MenuItemProps[];
}
