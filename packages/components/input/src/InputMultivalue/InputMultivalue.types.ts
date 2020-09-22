import * as React from 'react';

export interface Props {
  error?: boolean;
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  values: React.ReactText[];
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  maxLength?: number;
}