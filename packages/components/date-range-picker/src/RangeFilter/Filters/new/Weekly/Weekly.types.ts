import { type Texts } from '../../../../DateRangePicker.types';
import { type WithDisabledProp } from '../../../RangeFilter.types';
import { type DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { type FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { type DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { type FilterBaseProps } from '../Filters.types';

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
  texts?: Partial<Texts>;
} & FilterBaseProps &
  WithDisabledProp;
