import * as React from 'react';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';

export type SubtleFormProps = {
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

export type SubtleFormSubComponents ={
  TextArea: React.ElementType<SubtleTextAreaProps>;
}