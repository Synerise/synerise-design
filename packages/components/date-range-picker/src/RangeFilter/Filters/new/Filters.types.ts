import type { DateToFormatOptions } from '@synerise/ds-core';
import type { TimePickerProps } from '@synerise/ds-time-picker';

import type { DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { DayKey } from '../../Shared/TimeWindow/TimeWindow.types';

// The grid and the range form pass days as `DayKey`; the schedulers index their rows by it.
export type ScheduleRows<T> = Record<string, Record<DayKey, T>>;

export type FilterBaseProps = {
  maxEntries?: number;
  valueSelectionMode?: DateLimitMode[];
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  timePickerProps?: Partial<TimePickerProps>;
  valueFormatOptions?: DateToFormatOptions;
};
