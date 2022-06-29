import * as React from 'react';

export type RelativeUnits = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export type RangeKey =
  | 'TODAY'
  | 'YESTERDAY'
  | 'TOMORROW'
  | 'LAST_WEEK'
  | 'THIS_WEEK'
  | 'NEXT_WEEK'
  | 'LAST_7_DAYS'
  | 'NEXT_7_DAYS'
  | 'LAST_MONTH'
  | 'THIS_MONTH'
  | 'NEXT_MONTH'
  | 'LAST_3_MONTHS'
  | 'NEXT_3_MONTHS'
  | 'LAST_6_MONTHS'
  | 'NEXT_6_MONTHS'
  | 'LAST_YEAR'
  | 'NEXT_YEAR'
  | 'ALL_TIME';

export type NullableDateLimit = null | string | Date;

export interface DateFilter {
  key?: string;
  type: 'ABSOLUTE' | 'RELATIVE' | 'SINCE';
  from?: NullableDateLimit;
  to?: NullableDateLimit;
  duration?: {
    type: RelativeUnits;
    value: number;
  };
  offset?: {
    type: RelativeUnits;
    value: number;
  };
}

export interface DateRangeBase {
  key?: RangeKey | string;
  future?: boolean;
  filter?: DateFilter;
  translationKey?: string;
  id?: React.ReactText;
  timestamp?: Date;
}

export interface AbsoluteDateRange extends DateRangeBase {
  from?: NullableDateLimit;
  to?: NullableDateLimit;
  type: 'ABSOLUTE';
}

export interface Duration {
  type: RelativeUnits;
  value: number;
}

export interface RelativeDateRange extends DateRangeBase {
  type: 'RELATIVE' | 'SINCE';
  offset: {
    type: RelativeUnits;
    value: number;
  };
  duration: Duration;
  from?: NullableDateLimit;
  to?: NullableDateLimit;
}

export type Days = { [key: string]: object };

export type DateRange = AbsoluteDateRange | RelativeDateRange;
