import type { ReactNode } from 'react';
import type { Props as DsDatePickerProps } from '@synerise/ds-date-picker/dist/DatePicker.types';
import type { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleDatePickerProps = {
  activeProp?: boolean;
  placeholder?: string;
  format?: string;
  children?: ReactNode;
} & SubtleFieldProps &
  DsDatePickerProps;
