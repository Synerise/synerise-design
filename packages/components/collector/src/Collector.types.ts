import type { ReactNode } from 'react';

import type { ButtonProps } from '@synerise/ds-button';
import type { ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';
import type { DataAttributes } from '@synerise/ds-utils';

export type CollectorProps = {
  addButtonProps?: Partial<ButtonProps & DataAttributes>;
  buttonPanelPrefix?: ReactNode;
  allowCustomValue?: boolean;
  allowMultipleValues?: boolean;
  cancelButtonProps?: Partial<ButtonProps & DataAttributes>;
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  disableSearch?: boolean;
  disableButtonPanel?: boolean;
  dropdownContent?: ReactNode;
  error?: boolean;
  errorText?: ReactNode;
  fixedHeight?: boolean;
  keepSearchQueryOnSelect?: boolean;
  label?: ReactNode;
  lookupConfig?: LookupConfig;
  onSearchValueChange?: (value: string) => void;
  onConfirm?: (values: CollectorValue[]) => void;
  onCancel?: () => void;
  onItemDeselect?: (item: CollectorValue) => void;
  onItemAdd?: (itemName: string | number) => CollectorValue;
  onItemSelect: (item: CollectorValue) => void;
  onMultipleItemsSelect?: (items: CollectorValue[]) => void;
  renderItem?: (value: CollectorValue) => JSX.Element;
  showNavigationHints?: boolean;
  searchValue?: string;
  selected: CollectorValue[];
  suggestions: CollectorValue[];
  texts?: Partial<CollectorTexts>;
  dropdownItemHeight?: 'large';
  enableCustomFilteringSuggestions?: boolean;
  scrollbarProps?: ScrollbarAdditionalProps;
  allowPaste?: boolean;
  showCount?: boolean;
  valuesSeparator?: CollectorValuesSeparator;
  listHeader?: ReactNode;
  hideDropdownOnClickOutside?: boolean;
};
export type CollectorValuesSeparator = ';' | ',' | '|';
export type CollectorTexts = {
  add: ReactNode;
  cancel: ReactNode;
  placeholder: string;
  toNavigate: ReactNode;
  toSelect: ReactNode;
};

export type LookupConfig = {
  filter: string;
  display: string;
};
export type CollectorValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
