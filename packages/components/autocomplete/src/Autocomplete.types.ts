import * as React from 'react';
import { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';

export type OverrideProps = {
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  error?: boolean;
};

export type AutocompleteProps = OverrideProps & OriginalProps;
