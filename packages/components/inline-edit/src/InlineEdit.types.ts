import * as React from 'react';

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
};

export interface InlineEditProps {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: InputProps;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;

}