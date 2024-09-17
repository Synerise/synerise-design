import React from 'react';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';
import { SubtleDatePickerProps } from './Elements/DatePicker/DatePicker.types';
import { SubtleInputProps } from './Elements/Input/Input.types';

export type SubtleFormSubComponents = {
  TextArea: React.ElementType<SubtleTextAreaProps>;
  Select: React.ElementType<SubtleSelectProps>;
  DatePicker: React.ElementType<SubtleDatePickerProps>;
  Field: React.ElementType<SubtleFieldProps>;
  Input: React.ElementType<SubtleInputProps>;
};
export type SubtleFieldProps = {
  active?: boolean;
  disabled?: boolean;
  label?: React.ReactNode | string;
  labelTooltip?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  suffixTooltip?: React.ReactNode | string;
  activeElement?: () => React.ReactElement;
  inactiveElement?: () => React.ReactElement;
  mask?: string;
  maskVisible?: boolean;
};
