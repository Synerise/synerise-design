import { Props as DsDatePickerProps } from '@synerise/ds-date-picker/dist/DatePicker.types';
import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleDatePickerProps = {
  activeProp?: boolean;
  placeholder?: string;
  format?: string;
} & SubtleFieldProps &
  DsDatePickerProps;
