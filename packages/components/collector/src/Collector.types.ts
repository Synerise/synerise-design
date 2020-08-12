import * as React from 'react';

export type CollectorProps = {
  className?: string;
  description?: React.ReactNode | string;
  disabled?: boolean;
  error?: boolean;
  errorText?: React.ReactNode | string;
  fixedHeight?: boolean;
  label?: React.ReactNode | string;
  onConfirm: (values: string[]) => void;
  onCancel?: () => void;
  selected: string[];
  suggestions: string[];
  texts: CollectorTexts;
}
export type CollectorTexts = {
  add: string | React.ReactNode;
  cancel: string | React.ReactNode;
  placeholder: string;
}