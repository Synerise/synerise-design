import { FilterBaseProps } from '../Filters.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { WithDisabledProp } from '../../../RangeFilter.types';
import { FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { Texts } from '../../../../DateRangePicker.types';

export type DailySchedule = DayOptions & {
  mode: DateLimitMode;
};

export type DailyProps = {
  value: DailySchedule[];
  errorTexts?: FilterErrorType[];
  texts?: Partial<Texts>;
  onChange: (value: DailyProps['value']) => void;
} & FilterBaseProps &
  WithDisabledProp;
