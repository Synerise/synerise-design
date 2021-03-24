import { FilterBaseProps } from '../Filters.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { WithDisabledProp } from '../../../RangeFilter.types';

export type DailySchedule = DayOptions & {
  mode: DateLimitMode;
};
export type DailyProps = {
  value: DailySchedule[];
  onChange: (value: DailyProps['value']) => void;
} & FilterBaseProps & WithDisabledProp;
