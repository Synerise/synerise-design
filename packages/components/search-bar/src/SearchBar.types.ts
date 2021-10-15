import * as React from 'react';

export interface SearchBarProps {
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
  handleInputRef?: (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>) => void;
}
