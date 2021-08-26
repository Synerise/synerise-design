import * as React from 'react';
import { Props as DsButtonProps } from '@synerise/ds-button/dist/Button.types';

export type CollectorProps = {
  addButtonProps?: Partial<DsButtonProps>;
  allowCustomValue?: boolean;
  allowMultipleValues?: boolean;
  cancelButtonProps?: Partial<DsButtonProps>;
  className?: string;
  description?: React.ReactNode | string;
  disabled?: boolean;
  disableSearch?: boolean;
  disableButtonPanel?: boolean;
  dropdownContent?: React.ReactNode;
  error?: boolean;
  errorText?: React.ReactNode | string;
  fixedHeight?: boolean;
  keepSearchQueryOnSelect?: boolean;
  label?: React.ReactNode | string;
  lookupConfig?: LookupConfig;
  onSearchValueChange?: (value: string) => void;
  onConfirm?: (values: CollectorValue[]) => void;
  onCancel?: () => void;
  onItemDeselect?: (item: CollectorValue) => void;
  onItemAdd?: (itemName: React.ReactText) => CollectorValue;
  onItemSelect: (item: CollectorValue) => void;
  renderItem?: (value: CollectorValue) => JSX.Element;
  showNavigationHints?: boolean;
  searchValue?: string;
  selected: CollectorValue[];
  suggestions: CollectorValue[];
  texts: CollectorTexts;
  dropdownItemHeight?: 'large';
  enableCustomFilteringSuggestions?: boolean;
};
export type CollectorTexts = {
  add: string | React.ReactNode;
  cancel: string | React.ReactNode;
  placeholder: string;
  toNavigate: string | React.ReactNode;
  toSelect: string | React.ReactNode;
};

export type LookupConfig = {
  filter: string;
  display: string;
};
export type CollectorValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
