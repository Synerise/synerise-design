import * as React from 'react';

export type CollectorProps = {
  error?: boolean;
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  selected: React.ReactText[];
  suggestions: React.ReactText[];
  disabled?: boolean;
  onConfirm: (values: React.ReactText[]) => void;
}