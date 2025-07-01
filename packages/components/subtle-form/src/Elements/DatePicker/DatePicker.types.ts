import type { ReactNode } from 'react';

import { type DatePickerProps as DsDatePickerProps } from '@synerise/ds-date-picker';

import { type SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleDatePickerProps = {
  activeProp?: boolean;
  placeholder?: string;
  children?: ReactNode;
  format?: string;
} & SubtleFieldProps &
  DsDatePickerProps;
