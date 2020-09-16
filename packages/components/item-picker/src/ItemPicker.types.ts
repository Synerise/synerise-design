import { IntlShape } from 'react-intl';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import * as React from 'react';

export type ItemPickerSize = 'small' | 'large';

export type ItemPickerProps = {
  intl: IntlShape;
  dataSource: MenuItemProps[];
  placeholder: string | React.ReactNode;
  onClear: () => void;
  onChange: (item: MenuItemProps) => void;
  selectedItem?: MenuItemProps | undefined;
  clear?: string | React.ReactNode;
  searchPlaceholder?: string;
  size?: ItemPickerSize;
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  disabled?: boolean;
  changeButtonLabel?: string | React.ReactNode;
  withClearConfirmation?: boolean;
  clearConfirmTitle?: string;
  yesText?: string;
  noText?: string;
  noResults?: string;
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
};
