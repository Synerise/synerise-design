import type React from 'react';
import { type IntlShape } from 'react-intl';

import {
  type DateRangePickerProps,
  type Texts,
} from '../DateRangePicker.types';
import { type SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import {
  type DateLimitMode,
  type RangeDisplayMode,
} from './Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import {
  type COUNTED_FROM_ENUM,
  type DAYS_OF_PERIOD_ENUM,
  type RangeFilterType,
} from './constants';

export type FilterValue<T = FilterDefinition> = {
  definition?: Partial<T>;
  type: string;
};
export type RangeFilterProps = {
  value: FilterValue | undefined;
  onApply?: (filter: FilterValue) => void;
  onChange?: (filter: FilterValue) => void;
  hideFooter?: boolean;
  onCancel: () => void;
  intl: IntlShape;
  savedFilters?: SavedFilter[];
  onFilterSave?: (filters: SavedFilter[]) => void;
  texts?: Partial<Texts>;
  allowedFilterTypes?: RangeFilterType[];
  valueSelectionModes?: DateLimitMode[];
  rangeDisplayMode?: RangeDisplayMode;
  rangeUnits?: Pick<DateRangePickerProps, 'rangeUnits'>;
};

export type RangeFilterState = {
  previousFilter?: FilterValue;
  [filterType: string]:
    | FilterValue
    | Partial<FilterDefinition>
    | string
    | undefined;
  activeType: RangeFilterType;
  rangeClipboard?: Partial<FilterDefinition>;
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

export type DenormalizedFilter = {
  start: string;
  stop: string;
  day?: React.ReactText;
  restricted?: boolean;
};
export type NormalizedFilter = NormalizedFilterBase & {
  from: string;
  to: string;
  day?: React.ReactText;
  week?: React.ReactText;
};
export type NormalizedFilterBase = {
  type?: string;
  nestingType?: string;
};
export type WeekFilter = {
  week: number;
};
export type WithDisabledProp = {
  disabled?: boolean;
};
export type WeeklyFilterDefinition = {
  [key: string]: FilterDefinition;
};

export type MonthlyFilterDefinition = {
  definition: {
    [key: string]: FilterDefinition;
  };
  id: number;
  period: DAYS_OF_PERIOD_ENUM;
  periodType: COUNTED_FROM_ENUM;
};

export type ValueSelectionModes = ['Range', 'Hour'];
