import { ReactNode, MutableRefObject } from 'react';
import { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import Select from 'antd/lib/select';

export type OverrideProps = {
  className?: string;
  errorText?: ReactNode | string;
  label?: ReactNode | string;
  description?: ReactNode | string;
  error?: boolean;
  handleInputRef?: (ref: MutableRefObject<Select | undefined>) => void;
  autoResize?: boolean | { minWidth: string; maxWidth: string };
};

export type AutocompleteProps = OverrideProps & OriginalProps;
