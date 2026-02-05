import React from 'react';

import { ArrowLeftM, ArrowRightM, SinceArrowRightM } from '@synerise/ds-icon';
import {
  type FlipConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '@synerise/ds-popover';

import {
  type AbsoluteDateRangePreset,
  type RangeKey,
  type RelativeDateRangePreset,
  type RelativeUnits,
} from './date.types';

export const SECONDS = 'SECONDS';
export const MINUTES = 'MINUTES';
export const HOURS = 'HOURS';
export const DAYS = 'DAYS' as RelativeUnits;
export const WEEKS = 'WEEKS';
export const MONTHS = 'MONTHS';
export const YEARS = 'YEARS';
export const ABSOLUTE = 'ABSOLUTE';
export const RELATIVE = 'RELATIVE';
export const RELATIVE_OFFSET_MAX = 999999;
export const RELATIVE_DURATION_MAX = 999999;
export const RELATIVE_UNITS: RelativeUnits[] = [
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
];
export const ALL_TIME: RangeKey = 'ALL_TIME';

export const RANGES_MODE = {
  PAST: 'PAST',
  FUTURE: 'FUTURE',
  SINCE: 'SINCE',
};

export const RANGES_ICON = {
  PAST: <ArrowLeftM />,
  FUTURE: <ArrowRightM />,
  SINCE: <SinceArrowRightM />,
};

export const range = (start: number, end: number): number[] => {
  if (end <= start) {
    return [];
  }
  const size = end - start;
  return Array.from(Array(size).keys()).map((i) => i + start);
};
export const CUSTOM_RANGE_KEY = 'custom';
export const DURATION_MODIFIERS = {
  LAST: 'timestampLast',
  NEXT: 'timestampNext',
} as const;

export const RELATIVE_PRESETS: RelativeDateRangePreset[] = [
  {
    key: 'TODAY',
    translationKey: 'today',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'YESTERDAY',
    translationKey: 'yesterday',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'TOMORROW',
    translationKey: 'tomorrow',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'LAST_WEEK',
    translationKey: 'lastWeek',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 1 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'THIS_WEEK',
    translationKey: 'thisWeek',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 0 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'NEXT_WEEK',
    translationKey: 'nextWeek',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: WEEKS, value: 1 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'LAST_7_DAYS',
    translationKey: 'last7Days',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'NEXT_7_DAYS',
    translationKey: 'next7Days',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'LAST_MONTH',
    translationKey: 'lastMonth',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'THIS_MONTH',
    translationKey: 'thisMonth',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 0 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'NEXT_MONTH',
    translationKey: 'nextMonth',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'LAST_3_MONTHS',
    translationKey: 'last3Months',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'NEXT_3_MONTHS',
    translationKey: 'next3Months',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'LAST_6_MONTHS',
    translationKey: 'last6Months',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'NEXT_6_MONTHS',
    translationKey: 'next6Months',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'LAST_YEAR',
    translationKey: 'lastYear',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
  {
    key: 'NEXT_YEAR',
    translationKey: 'nextYear',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
];

export const RELATIVE_SECTION_BUTTON_KEYS_ORDER = [
  CUSTOM_RANGE_KEY,
  ALL_TIME,
  'TODAY',
  'YESTERDAY',
  'LAST_WEEK',
  'LAST_MONTH',
  'LAST_YEAR',
  'THIS_WEEK',
  'THIS_MONTH',
  'LAST_7_DAYS',
  'LAST_3_MONTHS',
  'LAST_6_MONTHS',
];

export const ABSOLUTE_PRESETS: AbsoluteDateRangePreset[] = [
  {
    key: ALL_TIME,
    translationKey: 'allTime',
    type: ABSOLUTE,
    future: false,
  },
];

export const TIME_OPTIONS = {
  HOURS: range(0, 24),
  MINUTES: range(0, 60),
  SECONDS: range(0, 60),
};

export const MODES = {
  DATE: 'date',
  TIME: 'time',
  FILTER: 'filter',
};
const LEFT = 'left' as const;
const RIGHT = 'right' as const;
export const COLUMNS = {
  LEFT,
  RIGHT,
};

export const POPOVER_OFFSET_CONFIG: OffsetConfig = {
  mainAxis: 8,
};
export const POPOVER_FLIP_CONFIG: FlipConfig = {
  crossAxis: true,
  mainAxis: true,
};
export const POPOVER_SHIFT_CONFIG: ShiftConfig = {
  crossAxis: true,
  mainAxis: true,
};
