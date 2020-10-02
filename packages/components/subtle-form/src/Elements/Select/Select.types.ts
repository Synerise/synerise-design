import * as React from 'react';

export type SubtleSelectProps = {
  minRows?: number;
  maxRows?: number;
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  label?: React.ReactNode | string;
  labelTooltip?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  suffixTooltip?: React.ReactNode | string;
};

