import type { CSSProperties } from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import { InputProps } from '../InlineEdit.types';

export type InlineSelectProps = {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: Partial<Omit<InputProps, 'placeholder'>>;
  style?: CSSProperties;
  dropdownOverlayStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  dropdownProps?: Partial<DropdownProps>;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  expanded?: boolean;
  initialValue?: string;
  placeholder?: string;
  dataSource: MenuItemProps[];
};
