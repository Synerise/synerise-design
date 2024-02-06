import { IntlShape } from 'react-intl';

import type { TimePickerProps } from '@synerise/ds-time-picker';

import { RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import { DenormalizedFilter, FilterDefinition, MonthlySelectValue, WithDisabledProp } from '../../RangeFilter.types';
import { WithTranslations } from '../../../DateRangePicker.types';
import { RangeDisplayMode, DateLimitMode } from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { COUNTED_FROM_ENUM, DAYS_OF_PERIOD_ENUM } from '../../constants';

export type MonthlyFilterProps = {
  maxEntries?: number;
  value: Month[];
  onChange: (definition: Month[]) => void;
  intl: IntlShape;
  renderRangeFormSuffix?: () => React.ReactNode;
  daysOfPeriods?: MonthlySelectValue<DAYS_OF_PERIOD_ENUM>[];
  countedFromPeriods?: MonthlySelectValue<COUNTED_FROM_ENUM>[];
  timePickerProps?: Partial<TimePickerProps>;
  rangeClipboard?: Partial<FilterDefinition>;
  valueSelectionModes?: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
} & WithDisabledProp &
  Partial<RangeActions> &
  Partial<WithTranslations>;

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
    [guid: string]: boolean;
  };
};
