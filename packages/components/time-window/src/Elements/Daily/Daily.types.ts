import { DateLimitMode } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { DayOptions } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/TimeWindow.types';

export type DailySchedule = DayOptions & {
  mode: DateLimitMode;
};
export type DailyProps = {
  valueSelectionMode: DateLimitMode[];
  schedule: DailySchedule[];
};
