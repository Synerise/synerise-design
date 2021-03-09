import { DateLimitMode } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { DayKey, DayOptions } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/TimeWindow.types';

export type WeeklySchedule = DayOptions & {
  mode: DateLimitMode;
};
export type DayOfWeekIndex = [0, 1, 2, 3, 4, 5, 6];
export type DailyProps = {
  valueSelectionMode: DateLimitMode[];
  schedule: {
    [id: string]: Record<keyof DayOfWeekIndex, WeeklySchedule>;
  };
};
