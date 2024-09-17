import React from 'react';
import { InputProps } from '@synerise/ds-input';

export interface SearchBarProps extends Pick<InputProps, 'handleInputRef'> {
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  placeholder: string;
  className?: string;
  clearTooltip?: string | React.ReactNode;
  value: string;
  iconLeft?: React.ReactNode;
  autofocus?: boolean;
  autofocusDelay?: number;
  disabled?: boolean;
  borderRadius?: boolean | undefined;
}
