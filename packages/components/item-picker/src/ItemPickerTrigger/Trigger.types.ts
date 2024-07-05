import { ReactNode } from 'react';
import { ListItemProps } from '@synerise/ds-list-item';
import { ItemPickerSize } from '../ItemPicker.types';

export type ItemPickerTriggerProps = {
  openDropdown: () => void;
  closeDropdown: () => void;
  size: ItemPickerSize;
  clear: ReactNode;
  onClear?: () => void;
  opened: boolean;
  placeholder: ReactNode;
  placeholderIcon?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  selected?: ListItemProps;
  changeButtonLabel?: ReactNode;
  withChangeButton?: boolean;
  clearConfirmTitle: string;
  yesText: string;
  noText: string;
  withClearConfirmation: boolean;
};

// @deprecated
export type Props = ItemPickerTriggerProps;
