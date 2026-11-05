import type { Texts } from '../../../../DateRangePicker.types';
import type { WithDisabledProp } from '../../../RangeFilter.types';
import type { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import type { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import type { FilterBaseProps } from '../Filters.types';

export type WeeklyScheduleDayValue = Omit<DayOptions, 'start' | 'stop'> & {
  /** `undefined` once the time is cleared in the form */
  start?: string;
  stop?: string;
  mode: DateLimitMode;
};
export type WeeklySchedule = {
  [guid: string]: Partial<Record<DayOfWeekIndex, WeeklyScheduleDayValue>>;
};
export type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeeklyProps = {
  value: WeeklySchedule;
  /** Per range (`guid`), the errors of each day's time inputs */
  errorTexts?: {
    [guid: string]: Partial<Record<DayOfWeekIndex, FilterErrorType>>;
  };
  onChange: (value: WeeklyProps['value']) => void;
  texts?: Partial<Texts>;
} & FilterBaseProps &
  WithDisabledProp;
