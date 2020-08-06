import * as React from 'react';

export type CollectorProps = {
  error?: boolean;
  className?: string;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  values: React.ReactText[];
  disabled?: boolean;
}