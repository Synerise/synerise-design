import type { Texts } from '../../../../DateRangePicker.types';
import type {
  COUNTED_FROM_ENUM,
  DAYS_OF_PERIOD_ENUM,
} from '../../../constants';
import type { WithDisabledProp } from '../../../RangeFilter.types';
import type { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import type { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import type { FilterBaseProps } from '../Filters.types';

export type MonthlyScheduleDayValue = Omit<DayOptions, 'start' | 'stop'> & {
  /** `undefined` once the time is cleared in the form */
  start?: string;
  stop?: string;
  mode: DateLimitMode;
};
export type MonthlySchedule = {
  [guid: string]: Partial<Record<DayOfMonthIndex, MonthlyScheduleDayValue>>;
};
/** 0–30 by day of the month; with the WEEK period, 0–34 (week × 7 + weekday) */
export type DayOfMonthIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34;
export type MonthlyProps = {
  value: MonthlySchedule;
  /** Per range (`guid`), the errors of each day's time inputs */
  errorTexts?: {
    [guid: string]: Partial<Record<DayOfMonthIndex, FilterErrorType>>;
  };
  periodType: DAYS_OF_PERIOD_ENUM;
  countedFrom: COUNTED_FROM_ENUM;
  onChange: (value: MonthlyProps['value']) => void;
  texts?: Partial<Texts>;
} & FilterBaseProps &
  WithDisabledProp;
