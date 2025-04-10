import React from 'react';
import { FormFieldCommonProps } from '@synerise/ds-form-field';
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
  labelTooltip?: FormFieldCommonProps['tooltip'];
  suffix?: React.ReactNode | string;
  suffixTooltip?: React.ReactNode | string;
  activeElement?: () => React.ReactElement;
  inactiveElement?: () => React.ReactElement;
  mask?: string;
  maskVisible?: boolean;
} & Pick<FormFieldCommonProps, 'label' | 'errorText'>;
