import type { ReactNode } from 'react';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { ItemPickerSize, ItemPickerProps } from '../ItemPicker.types';

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
} & Pick<ItemPickerProps, 'informationCardTooltipProps'>;

// @deprecated
export type Props = ItemPickerTriggerProps;
