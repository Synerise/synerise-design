import * as React from 'react';

export type Relative = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface DateFilter {
  type: 'ABSOLUTE' | 'RELATIVE';
  from?: string | Date;
  to?: string | Date;
  duration?: {
    type: Relative;
    value: number;
  };
  offset?: {
    type: Relative;
    value: number;
  };
}
interface DateRangeBase {
  key?: string;
  future?: boolean;
  filter?: DateFilter;
  translationKey?: string;
  id?: React.ReactText;
}

export interface AbsoluteDateRange extends DateRangeBase {
  from?: string | Date;
  to?: string | Date;
  type: 'ABSOLUTE';
}

export interface RelativeDateRange extends DateRangeBase {
  type: 'RELATIVE';
  offset: {
    type: Relative;
    value: number;
  };
  duration: {
    type: Relative;
    value: number;
  };
  from?: string | Date;
  to?: string | Date;
}

export type Days = { [key: string]: object };

export type DateRange = AbsoluteDateRange | RelativeDateRange;
