import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { ItemPickerSize } from '../ItemPicker.types';

export interface Props {
  openDropdown: () => void;
  closeDropdown: () => void;
  size: ItemPickerSize;
  clear: string | React.ReactNode;
  onClear: () => void;
  opened: boolean;
  placeholder: string | React.ReactNode;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  selected?: MenuItemProps;
  changeButtonLabel?: string | React.ReactNode;
  withChangeButton?: boolean;
  clearConfirmTitle: string;
  yesText: string;
  noText: string;
  withClearConfirmation: boolean;
}
