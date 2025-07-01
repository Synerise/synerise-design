import { type Texts } from '../../../../DateRangePicker.types';
import { type WithDisabledProp } from '../../../RangeFilter.types';
import { type DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { type FilterErrorType } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { type DayOptions } from '../../../Shared/TimeWindow/TimeWindow.types';
import { type FilterBaseProps } from '../Filters.types';

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
