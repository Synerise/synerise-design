import * as React from 'react';
import { IntlShape } from 'react-intl';
import { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import { DateLimitMode } from './Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import { Props as DateRangePickerProps, Texts } from '../DateRangePicker.types';
import { COUNTED_FROM_ENUM, DAYS_OF_PERIOD_ENUM } from './constants';

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
  texts?: Texts;
  allowedFilterTypes?: string[];
  valueSelectionModes?: DateLimitMode[];
  rangeUnits?: Pick<DateRangePickerProps, 'rangeUnits'>;
};

export type RangeFilterState = {
  previousFilter?: FilterValue;
  [filterType: string]: FilterValue | Partial<FilterDefinition> | string | undefined;
  activeType: string;
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
