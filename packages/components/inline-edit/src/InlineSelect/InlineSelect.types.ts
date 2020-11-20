import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import { InputProps } from '../InlineEdit.types';

export interface InlineSelectProps {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: Partial<InputProps>;
  style?: React.CSSProperties;
  dropdownOverlayStyle?: React.CSSProperties;
  dropdownProps?: Partial<DropdownProps>;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  expanded: boolean;
  placeholder?: string;
  dataSource: MenuItemProps[];
}
