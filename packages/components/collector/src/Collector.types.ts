import * as React from 'react';

export type CollectorProps = {
  allowCustomValue?: boolean;
  allowMultipleValues?: boolean;
  className?: string;
  description?: React.ReactNode | string;
  disabled?: boolean;
  disableSearch?: boolean;
  dropdownContent?: React.ReactNode;
  error?: boolean;
  errorText?: React.ReactNode | string;
  fixedHeight?: boolean;
  label?: React.ReactNode | string;
  lookupConfig?: LookupConfig;
  onSearchValueChange?: (value: string) => void;
  onConfirm: (values: CollectorValue[]) => void;
  onCancel?: () => void;
  onDeselect?: (item: CollectorValue) => void;
  onItemAdd?: (itemName: React.ReactText) => CollectorValue;
  onSelect: (item: CollectorValue) => void;
  showNavigationHints?: boolean;
  searchValue?: string;
  selected: CollectorValue[];
  suggestions: CollectorValue[];
  texts: CollectorTexts;
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
