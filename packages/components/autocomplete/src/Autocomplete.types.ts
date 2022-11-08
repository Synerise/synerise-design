import * as React from 'react';
import AntdAutoComplete, { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import Select from 'antd/lib/select';

export type OverrideProps = {
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  error?: boolean;
  handleInputRef?: (ref: React.MutableRefObject<Select | undefined>) => void;
  autoResize?: boolean | { minWidth: string; maxWidth: string };
};

export interface StaticComponents {
  Option: typeof AntdAutoComplete.Option;
}

export type AutocompleteProps = OverrideProps & OriginalProps;
