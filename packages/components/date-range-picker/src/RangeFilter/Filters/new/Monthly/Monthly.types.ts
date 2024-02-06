import { DAYS_OF_PERIOD_ENUM, COUNTED_FROM_ENUM } from '../../../constants';
import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { FilterBaseProps } from '../Filters.types';
import { WithDisabledProp } from '../../../RangeFilter.types';
import { FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { Texts } from '../../../../DateRangePicker.types';

export type MonthlyScheduleDayValue = DayOptions & {
  mode: DateLimitMode;
};
export type MonthlySchedule = {
  [guid: string]: Record<DayOfMonthIndex, MonthlyScheduleDayValue>;
};
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
  | 31;
export type MonthlyProps = {
  value: MonthlySchedule;
  errorTexts?: {
    [guid: string]: FilterErrorType[];
  };
  periodType: DAYS_OF_PERIOD_ENUM;
  countedFrom: COUNTED_FROM_ENUM;
  onChange: (value: MonthlyProps['value']) => void;
  texts?: Partial<Texts>;
} & FilterBaseProps &
  WithDisabledProp;
