import { type ReactNode } from 'react';

export type InputMultivalueProps = {
  error?: boolean;
  className?: string;
  errorText?: ReactNode | string;
  label?: ReactNode | string;
  description?: ReactNode | string;
  values: string[];
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (values: string[]) => void;
  maxLength?: number;
};
