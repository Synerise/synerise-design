import type { CSSProperties } from 'react';

import type { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import type { ListItemProps } from '@synerise/ds-list-item';

import type { InputProps } from '../InlineEdit.types';

export type InlineSelectProps<ItemType extends ListItemProps = ListItemProps> =
  {
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
    onValueChange?: (item: ItemType) => void;
    placeholder?: string;
    dataSource: ItemType[];
  };
