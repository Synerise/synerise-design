import * as React from 'react';

export type Props = {
  autoFocus?: boolean;
  size?: 'large' | 'default' | 'small';
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Date | string;
  onChange?: (dateValue: Date | undefined | null, stringifiedDate: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  clearTooltip?: string | React.ReactNode;
  highlight?: boolean;
  error?: boolean;
  errorText?: string | React.ReactNode;
};
