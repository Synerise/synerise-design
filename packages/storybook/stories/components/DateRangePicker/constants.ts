import { TimePickerProps } from '@synerise/ds-time-picker';

import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
} from '@synerise/ds-date-range-picker';
import type { DateRangePickerProps, AbsoluteDateRange, RelativeDateRange } from '@synerise/ds-date-range-picker';

type DateLimitMode = Required<DateRangePickerProps>['filterValueSelectionModes'][number];

export { DEFAULT_RANGE_END, DEFAULT_RANGE_START };

export const TEXTS = {
  after: 'after',
  allTime: 'Lifetime',
  apply: 'Apply',
  before: 'before',
  clear: 'Clear',
  clearRange: ' Clear range',
  copyRange: 'Copy range',
  custom: 'Custom range',
  days: 'Days',
  emptyDateError: 'Date cannot be empty',
  endDate: 'End date',
  endDatePlaceholder: 'End date',
  filter: 'Date filter',
  hours: 'Hours',
  lifetime: 'Lifetime',
  last3Months: 'Last 3 months',
  last6Months: 'Last 6 months',
  last7Days: 'Last 7 days',
  last: 'Last',
  lastMonth: 'Last month',
  lastWeek: 'Last week',
  lastYear: 'Last year',
  minutes: 'Minutes',
  months: 'Months',
  more: 'More',
  next3Months: 'Next 3 months',
  next6Months: 'Next 6 months',
  next7Days: 'Next 7 days',
  next: 'Next',
  nextMonth: 'Next month',
  nextWeek: 'Next week',
  nextYear: 'Next year',
  now: 'Now',
  pasteRange: 'Paste range',
  relativeDateRange: 'Relative date range',
  remove: 'Remove',
  savedFiltersTrigger: 'Saved filters',
  seconds: 'Seconds',
  selectDate: 'Select date',
  selectTime: 'Select time',
  since: 'Since',
  startDate: 'Start date',
  startDatePlaceholder: 'Start date',
  thisMonth: 'This month',
  thisWeek: 'This week',
  timestampLast: 'Last',
  timestampNext: 'Next',
  timestampTill: 'till',
  today: 'Today',
  tomorrow: 'Tomorrow',
  weeks: 'Weeks',
  years: 'Years',
  yesterday: 'Yesterday',
  addTime: 'Add time',
};

const DAILY_FILTER_VALUE = {
  display: false,
  inverted: false,
  restricted: false,
  start: DEFAULT_RANGE_START,
  stop: DEFAULT_RANGE_END,
};

export const DAILY_FILTER_VALUE_HOUR = {
  ...DAILY_FILTER_VALUE,
  mode: 'Hour' as DateLimitMode,
};

export const DAILY_FILTER_VALUE_RANGE = {
  ...DAILY_FILTER_VALUE,
  mode: 'Range' as DateLimitMode,
};

export const RANGE_WITH_START_DATE: AbsoluteDateRange = {
  filter: undefined,
  from: '2020-08-18T22:00:00.000Z',
  to: undefined,
  type: 'ABSOLUTE',
};

export const ABSOLUTE_RANGE: AbsoluteDateRange = {
  filter: undefined,
  from: '2020-08-18T22:00:00.000Z',
  to: '2020-08-28T22:00:00.000Z',
  type: 'ABSOLUTE',
};

export const LIFETIME_VALUE: AbsoluteDateRange = {
  type: 'ABSOLUTE',
  translationKey: 'allTime',
};
export const DEFAULT_CUSTOM_RANGE: RelativeDateRange = {
  duration: {
    type: 'DAYS',
    value: 30,
  },
  future: false,
  offset: {
    type: 'DAYS',
    value: 0,
  },
  translationKey: 'custom',
  type: 'RELATIVE',
};

export const TIME_PICKER_PROPS: Partial<TimePickerProps> = {
  containerStyle: { width: '268px', maxWidth: 'none' },
  units: ['hour', 'minute'],
  valueFormatOptions: { second: undefined },
};
