export const SECONDS = 'SECONDS';
export const MINUTES = 'MINUTES';
export const HOURS = 'HOURS';
export const DAYS = 'DAYS';
export const WEEKS = 'WEEKS';
export const MONTHS = 'MONTHS';
export const YEARS = 'YEARS';
export const ABSOLUTE = 'ABSOLUTE';
export const RELATIVE = 'RELATIVE';
export const RELATIVE_OFFSET_MAX = 999999;
export const RELATIVE_DURATION_MAX = 999999;
export const RELATIVE_TYPES = [SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS];
export const ALL_TIME_DURATION = { type: YEARS, value: 1000 };

export const range = (start: number, end: number): number[] => {
  if (end <= start) {
    return [];
  }
  const size = end - start;
  return [...Array(size).keys()].map(i => i + start);
};

export const DURATION_MODIFIERS = {
  LAST: 'TIMESTAMP_LAST',
  NEXT: 'TIMESTAMP_NEXT',
};
export const RELATIVE_PRESETS = [
  {
    key: 'TODAY',
    translationKey: 'DS.DATE-RANGE-PICKER.TODAY',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'YESTERDAY',
    translationKey: 'DS.DATE-RANGE-PICKER.YESTERDAY',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'LAST_7_DAYS',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_7_DAYS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: DAYS, value: 0 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'THIS_WEEK',
    translationKey: 'DS.DATE-RANGE-PICKER.THIS_WEEK',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 0 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'LAST_WEEK',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_WEEK',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: WEEKS, value: 1 },
    duration: { type: WEEKS, value: 1 },
  },
  {
    key: 'THIS_MONTH',
    translationKey: 'DS.DATE-RANGE-PICKER.THIS_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 0 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'LAST_MONTH',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'LAST_3_MONTHS',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_3_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'LAST_6_MONTHS',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_6_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'LAST_YEAR',
    translationKey: 'DS.DATE-RANGE-PICKER.LAST_YEAR',
    type: RELATIVE,
    from: null,
    to: null,
    future: false,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
  {
    key: 'ALL_TIME',
    translationKey: 'DS.DATE-RANGE-PICKER.ALL_TIME',
    type: ABSOLUTE,
  },
  {
    key: 'TOMORROW',
    translationKey: 'DS.DATE-RANGE-PICKER.TOMORROW',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 1 },
  },
  {
    key: 'NEXT_7_DAYS',
    translationKey: 'DS.DATE-RANGE-PICKER.NEXT_7_DAYS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: DAYS, value: 1 },
    duration: { type: DAYS, value: 7 },
  },
  {
    key: 'NEXT_MONTH',
    translationKey: 'DS.DATE-RANGE-PICKER.NEXT_MONTH',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 1 },
  },
  {
    key: 'NEXT_3_MONTHS',
    translationKey: 'DS.DATE-RANGE-PICKER.NEXT_3_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 3 },
  },
  {
    key: 'NEXT_6_MONTHS',
    translationKey: 'DS.DATE-RANGE-PICKER.NEXT_6_MONTHS',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: MONTHS, value: 1 },
    duration: { type: MONTHS, value: 6 },
  },
  {
    key: 'NEXT_YEAR',
    translationKey: 'DS.DATE-RANGE-PICKER.NEXT_YEAR',
    type: RELATIVE,
    from: null,
    to: null,
    future: true,
    offset: { type: YEARS, value: 1 },
    duration: { type: YEARS, value: 1 },
  },
];

export const TIME_OPTIONS = {
  HOURS: range(0, 24),
  MINUTES: range(0, 60),
  SECONDS: range(0, 60),
};
