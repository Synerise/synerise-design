import { IntlShape } from 'react-intl';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import { RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import { DenormalizedFilter, FilterDefinition, MonthlySelectValue } from '../../RangeFilter.types';
import { WithTranslations } from '../../../DateRangePicker.types';
import { DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { COUNTED_FROM_ENUM, DAYS_OF_PERIOD_ENUM } from '../../constants';

export type MonthlyFilterProps = {
  value: Month[];
  onChange: (definition: Month[]) => void;
  intl: IntlShape;
  renderRangeFormSuffix?: () => React.ReactNode;
  daysOfPeriods?: MonthlySelectValue<DAYS_OF_PERIOD_ENUM>[];
  countedFromPeriods?: MonthlySelectValue<COUNTED_FROM_ENUM>[];
  timePickerProps?: Partial<TimePickerProps>;
  rangeClipboard?: Partial<FilterDefinition>;
  valueSelectionModes?: DateLimitMode[];
} & Partial<RangeActions> &
  WithTranslations;

export type Month<T = DenormalizedFilter> = {
  id: string | number;
  period: string;
  periodType?: string;
  definition: {
    [day: number]: T;
  };
};

export type MonthlyFilterState = {
  visible: {
    [guid: string]: boolean
  }
}
