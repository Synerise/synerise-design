import type { ReactNode } from 'react';
import type { InputProps } from '@synerise/ds-input';

export type SearchBarProps = Pick<InputProps, 'handleInputRef'> & {
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  placeholder: string;
  className?: string;
  clearTooltip?: ReactNode;
  value: string;
  iconLeft?: ReactNode;
  autofocus?: boolean;
  autofocusDelay?: number;
  disabled?: boolean;
  borderRadius?: boolean;
}
