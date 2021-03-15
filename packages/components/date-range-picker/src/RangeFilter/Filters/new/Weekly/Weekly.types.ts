import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { FilterBaseProps } from '../Filters.types';

export type WeeklyScheduleDayValue = DayOptions & {
  mode: DateLimitMode;
};
export type WeeklySchedule = {
  [guid: string]: Record<DayOfWeekIndex, WeeklyScheduleDayValue>;
};
export type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeeklyProps = {
  value: WeeklySchedule;
  onChange: (value: WeeklyProps['value']) => void;
} & FilterBaseProps;
