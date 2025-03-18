import type { ReactNode } from 'react';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { ItemPickerProps, ItemPickerSize } from '../ItemPickerLegacy/ItemPickerLegacy.types';

export type ItemPickerTriggerTexts = {
  yes: string;
  no: string;
  clear: ReactNode;
  clearConfirmTitle: string;
  changeButtonLabel: ReactNode;
};

export type ItemPickerTriggerProps = {
  openDropdown: () => void;
  closeDropdown: () => void;
  size: ItemPickerSize;
  /**
   * @deprecated
   */
  clear?: ReactNode;
  onClear?: () => void;
  opened: boolean;
  placeholder: ReactNode;
  placeholderIcon?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  selected?: ListItemProps;
  /**
   * @deprecated
   */
  changeButtonLabel?: ReactNode;
  withChangeButton?: boolean;
  /**
   * @deprecated
   */
  clearConfirmTitle?: string;
  /**
   * @deprecated
   */
  yesText?: string;
  /**
   * @deprecated
   */
  noText?: string;
  withClearConfirmation?: boolean;
  texts?: Partial<ItemPickerTriggerTexts>;
} & Pick<ItemPickerProps, 'informationCardTooltipProps'>;

/**
 * @deprecated use ItemPickerTriggerProps instead
 */
export type Props = ItemPickerTriggerProps;
