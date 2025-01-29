import type { ReactNode, ChangeEvent, CSSProperties, FocusEventHandler, InputHTMLAttributes, KeyboardEventHandler } from 'react';

export type InputProps = {
  name?: string;
  value: string | number;
  disabled?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onEnterPress?: KeyboardEventHandler<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
};

export interface InlineEditProps {
  size?: 'large' | 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: InputProps;
  style?: CSSProperties;
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  customIcon?: ReactNode;
}
