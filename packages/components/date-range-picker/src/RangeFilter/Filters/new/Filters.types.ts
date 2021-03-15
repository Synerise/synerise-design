import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import { DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type FilterBaseProps = {
  valueSelectionMode?: DateLimitMode[];
  timeFormat?: string;
  timePickerProps?: Partial<TimePickerProps>;
};
