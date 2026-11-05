import type { IntlShape } from 'react-intl';

import type { Texts } from '../DateRangePicker.types';
import type {
  COUNTED_FROM_ENUM,
  DAYS_OF_PERIOD_ENUM,
  RangeFilterType,
} from './constants';
import type { Month } from './Filters/MonthlyFilter/MonthlyFilter.types';
import type { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import type {
  DateLimitMode,
  RangeDisplayMode,
} from './Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

/** One day of a stored schedule. `day` is 1-based. */
export type RangeFilterDay = {
  day: number;
  from: string;
  to: string;
  inverted?: boolean;
  mode?: DateLimitMode;
};

export type RangeFilterDaily = {
  type: 'DAILY';
  nestingType: 'IN_PLACE';
  from: string;
  to: string;
  day?: number;
  inverted?: boolean;
  mode?: DateLimitMode;
  restricted?: boolean;
  display?: boolean;
};

export type RangeFilterWeekly = {
  type: 'WEEKLY';
  nestingType: 'IN_PLACE';
  days: RangeFilterDay[];
};

/** A monthly rule by day of the month (`day` 1–31). */
export type RangeFilterMonthRule = {
  type: 'MONTH';
  days: RangeFilterDay[];
  inverted: boolean;
};

/** A monthly rule by weekday (`day` 1–7) in a week of the month (`week` 1–5). */
export type RangeFilterWeekRule = {
  type: 'WEEK';
  weeks: {
    week: number;
    days: (RangeFilterDay & { type: 'MONTHLY' })[];
  }[];
  inverted: boolean;
};

export type RangeFilterMonthly = {
  type: 'MONTHLY';
  nestingType: 'IN_PLACE';
  rules: (RangeFilterMonthRule | RangeFilterWeekRule)[];
};

/** The schedule the filter addon emits and stores in `DateRange.filter`. */
export type RangeFilterValue =
  | RangeFilterDaily
  | RangeFilterWeekly
  | RangeFilterMonthly;

/** A day as the filter editors hold it: 0-based `day`, `start`/`stop` times. */
export type DenormalizedFilter = {
  start: string;
  stop: string;
  day?: string | number;
  restricted?: boolean;
};

export type FilterDay = DenormalizedFilter & {
  display?: boolean;
  inverted?: boolean;
  mode?: DateLimitMode;
  week?: number;
};

export type DailyFilterValue = {
  type: 'DAILY';
  definition: FilterDay;
};
export type WeeklyFilterValue = {
  type: 'WEEKLY';
  definition: Record<string, FilterDay>;
};
export type MonthlyFilterValue = {
  type: 'MONTHLY';
  definition: Month<FilterDay>[];
};

/** The editor state of one filter type; saved filters store this shape. */
export type FilterValue =
  | DailyFilterValue
  | WeeklyFilterValue
  | MonthlyFilterValue;

export type RangeFilterProps = {
  value?: RangeFilterValue;
  onApply?: (filter: RangeFilterValue) => void;
  hideFooter?: boolean;
  onCancel: () => void;
  intl: IntlShape;
  savedFilters?: SavedFilter[];
  onFilterSave?: (filters: SavedFilter[]) => void;
  texts?: Partial<Texts>;
  allowedFilterTypes?: RangeFilterType[];
  valueSelectionModes?: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
};

export type RangeFilterState = {
  activeType: RangeFilterType;
  rangeClipboard?: Partial<FilterDefinition>;
  DAILY?: DailyFilterValue;
  WEEKLY?: WeeklyFilterValue;
  MONTHLY?: MonthlyFilterValue;
};

export type FilterDefinition = {
  start?: string;
  stop?: string;
  inverted?: boolean;
  restricted?: boolean;
  period?: DAYS_OF_PERIOD_ENUM;
  type: string;
  display?: boolean;
  periodType?: COUNTED_FROM_ENUM;
  mode?: DateLimitMode;
};

export type MonthlySelectValue<T> = {
  translationKey?: string;
  value: T;
};

export type WithDisabledProp = {
  disabled?: boolean;
};

export type MonthlyDayRange = Month<FilterDay>['definition'];
