import * as React from 'react';

export type CollectorProps = {
  error?: boolean;
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  selected: string[];
  suggestions: string[];
  disabled?: boolean;
  onConfirm: (values: string[]) => void;
  onCancel?: () => void;
  fixedHeight?: boolean;
  texts: CollectorTexts;
}
export type CollectorTexts = {
  cancel: string | React.ReactNode;
  add: string | React.ReactNode;
  placeholder: string;
}