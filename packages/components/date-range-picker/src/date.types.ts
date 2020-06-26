export type Relative = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface DateFilter {}

interface DateRangeBase {
  key?: string;
  future?: boolean;
  filter?: DateFilter;
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

export type DateRange = AbsoluteDateRange | RelativeDateRange;