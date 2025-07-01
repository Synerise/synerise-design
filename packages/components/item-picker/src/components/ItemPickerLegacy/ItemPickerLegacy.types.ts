import type { ReactNode } from 'react';
import type { IntlShape } from 'react-intl';

import type { DropdownProps } from '@synerise/ds-dropdown';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import type { InformationCardTooltipProps } from '@synerise/ds-information-card';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';
import type { SearchBarProps } from '@synerise/ds-search-bar';

export type ItemPickerSize = 'small' | 'large';

export type ItemPickerProps<ItemType extends ListItemProps = ListItemProps> = {
  dataSource: ItemType[];
  intl?: IntlShape;
  onChange: (item: ItemType) => void;
  onClear?: () => void;
  placeholder: ReactNode;
  changeButtonLabel?: ReactNode;
  clear?: ReactNode;
  clearConfirmTitle?: string;
  closeOnBottomAction?: boolean;
  disabled?: boolean;
  dropdownBottomAction?: ReactNode;
  dropdownProps?: Partial<DropdownProps>;
  dropdownRowHeight?: number;
  dropdownVisibleRows?: number;
  error?: boolean;
  errorMessage?: FormFieldCommonProps['errorText'];
  onBlur?: () => void;
  onFocus?: () => void;
  noResults?: string;
  noText?: string;
  placeholderIcon?: ReactNode;
  searchPlaceholder?: string;
  searchBarProps?: Partial<SearchBarProps>;
  selectedItem?: ItemType | undefined;
  hideSearchBar?: boolean;
  size?: ItemPickerSize;
  informationCardTooltipProps?: Omit<InformationCardTooltipProps, 'children'>;
  withClearConfirmation?: boolean;
  yesText?: string;
  scrollbarProps?: ScrollbarAdditionalProps;
} & Omit<FormFieldCommonProps, 'errorText'>;
