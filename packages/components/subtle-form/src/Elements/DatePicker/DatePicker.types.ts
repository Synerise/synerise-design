import type { ReactNode } from 'react';

import type { DatePickerProps as DsDatePickerProps } from '@synerise/ds-date-picker';

import type { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleDatePickerProps = {
  activeProp?: boolean;
  placeholder?: string;
  children?: ReactNode;
  /**
   * `ds-date-picker` also accepts an ISO string here, but this component formats the value
   * itself for its inactive view, so it takes a `Date` only.
   */
  value?: Date;
} & SubtleFieldProps &
  Omit<DsDatePickerProps, 'value'>;
