import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { FilterBaseProps } from '../Filters.types';
import { WithDisabledProp } from '../../../RangeFilter.types';
import { FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';

export type WeeklyScheduleDayValue = DayOptions & {
  mode: DateLimitMode;
};
export type WeeklySchedule = {
  [guid: string]: Record<DayOfWeekIndex, WeeklyScheduleDayValue>;
};
export type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeeklyProps = {
  value: WeeklySchedule;
  errorTexts?: {
    [guid: string]: FilterErrorType[];
  };
  onChange: (value: WeeklyProps['value']) => void;
} & FilterBaseProps &
  WithDisabledProp;
