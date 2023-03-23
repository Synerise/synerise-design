import type { TimePickerProps } from '@synerise/ds-time-picker';

import { DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

export type FilterBaseProps = {
  maxEntries?: number;
  valueSelectionMode?: DateLimitMode[];
  timeFormat?: string;
  timePickerProps?: Partial<TimePickerProps>;
};
