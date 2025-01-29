import type { ReactNode, MutableRefObject } from 'react';
import type { AutoCompleteProps as OriginalProps } from 'antd/lib/auto-complete';
import type { RefSelectProps } from 'antd/lib/select';
import type { AutoResizeProp } from '@synerise/ds-input';

export type OverrideProps = {
  className?: string;
  errorText?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  readOnly?: boolean;
  handleInputRef?: (ref: MutableRefObject<RefSelectProps | null>) => void;
  autoResize?: AutoResizeProp;
  placeholder?: ReactNode;
};

export type AutocompleteProps = OverrideProps & OriginalProps;
