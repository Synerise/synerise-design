import { DateFilter, DateRange } from 'date.types';
import * as React from 'react';
import { FilterDefinition } from './RangeFilter/RangeFilter.types';
import { SavedFilter } from './RangeFilter/FilterDropdown/FilterDropdown.types';

export interface Props {
  disabledDate?: (date?: Date) => boolean;
  format?: string;
  forceAdjacentMonths?: boolean;
  forceAbsolute?: boolean;
  onValueChange?: (value: Partial<DateFilter> | undefined) => void;
  onApply: (value: Partial<DateFilter> | undefined) => void;
  onFilterSave?: (filters: SavedFilter[]) => void;
  popoverPlacement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  popoverTrigger?: React.ReactNode;
  ranges?: DateRange[];
  relativeFuture?: boolean;
  relativePast?: boolean;
  relativeModes?: RelativeMode[];
  savedFilters?: SavedFilter[];
  showRelativePicker?: boolean;
  showFilter?: boolean;
  showTime?: boolean;
  texts: Texts;
  validate?: (value: DateRange) => { valid: boolean; message?: string };
  value: DateRange;
}
export type RelativeMode = 'PAST' | 'FUTURE' | 'SINCE';
export interface State {
  mode: string;
  value: DateRange;
  changed: boolean;
  filter?: FilterDefinition;
}
export type Texts = {
  [k in Translations]: string | React.ReactNode;
} &
  {
    [k in TranslationsPlaceholders]: string;
  };

export type TranslationsPlaceholders = 'endDatePlaceholder' | 'startDatePlaceholder' | 'selectDate' | 'selectTime';
export type Translations =
  | 'custom'
  | 'today'
  | 'yesterday'
  | 'apply'
  | 'clear'
  | 'now'
  | 'emptyDateError'
  | 'last7Days'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last3Months'
  | 'last6Months'
  | 'lastYear'
  | 'allTime'
  | 'tomorrow'
  | 'next7Days'
  | 'nextWeek'
  | 'nextMonth'
  | 'next3Months'
  | 'next6Months'
  | 'nextYear'
  | 'more'
  | 'relativeDateRange'
  | 'last'
  | 'before'
  | 'after'
  | 'since'
  | 'next'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'
  | 'timestampLast'
  | 'timestampNext'
  | 'timestampTill'
  | 'filter'
  | 'startDate'
  | 'endDate';
