import { type IntlShape } from 'react-intl';

import type { TimePickerProps } from '@synerise/ds-time-picker';

import { type WithTranslations } from '../../../DateRangePicker.types';
import {
  type DenormalizedFilter,
  type FilterDefinition,
  type MonthlySelectValue,
  type WithDisabledProp,
} from '../../RangeFilter.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from '../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { type RangeActions } from '../../Shared/TimeWindow/TimeWindow.types';
import {
  type COUNTED_FROM_ENUM,
  type DAYS_OF_PERIOD_ENUM,
} from '../../constants';

export type MonthlyFilterProps = {
  maxEntries?: number;
  value: Month[];
  onChange: (definition: Month[]) => void;
  intl: IntlShape;
  renderRangeFormSuffix?: () => React.ReactNode;
  daysOfPeriods?: MonthlySelectValue<DAYS_OF_PERIOD_ENUM>[];
  countedFromPeriods?: MonthlySelectValue<COUNTED_FROM_ENUM>[];
  timePickerProps?: Partial<TimePickerProps>;
  rangeClipboard?: Partial<FilterDefinition> | undefined;
  valueSelectionModes?: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
} & WithDisabledProp &
  Partial<RangeActions> &
  Partial<WithTranslations>;

export type Month<T = DenormalizedFilter> = {
  id: string | number;
  period: DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH | DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK;
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
