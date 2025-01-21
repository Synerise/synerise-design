import React, { ReactNode } from 'react';

export type InputProps = {
  name?: string;
  value: string | number;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  readOnly?: boolean;
};

export interface InlineEditProps {
  size?: 'large' | 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: InputProps;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  customIcon?: ReactNode;
}
