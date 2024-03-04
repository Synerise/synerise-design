import { ReactNode, MutableRefObject } from 'react';
import { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import Select from 'antd/lib/select';
import type { AutoResizeProp } from '@synerise/ds-input';

export type OverrideProps = {
  className?: string;
  errorText?: ReactNode | string;
  label?: ReactNode | string;
  description?: ReactNode | string;
  error?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  readOnly?: boolean;
  handleInputRef?: (ref: MutableRefObject<Select | undefined>) => void;
  autoResize?: AutoResizeProp;
};

export type AutocompleteProps = OverrideProps & OriginalProps;
