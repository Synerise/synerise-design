import { FilterBaseProps } from '../Filters.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';

export type DailySchedule = DayOptions & {
  mode: DateLimitMode;
};
export type DailyProps = {
  schedule: DailySchedule[];
} & FilterBaseProps;
