import type dayjs from 'dayjs';

import { type ClockModes } from '../types/TimePicker.types';

export const HOUR: dayjs.UnitType = 'hour';
export const MINUTE: dayjs.UnitType = 'minute';
export const SECOND: dayjs.UnitType = 'second';

export const CLOCK_MODES = ['AM', 'PM'] as const;

export const PM: ClockModes = 'PM';
export const AM: ClockModes = 'AM';

export const HOUR_12 = 12;
export const DISABLE_CLOCK_MODE_HOUR = -1;

export const MAP_12_AM_TO_24_HOUR = {
  0: 12,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 0,
  13: 1,
  14: 2,
  15: 3,
  16: 4,
  17: 5,
  18: 6,
  19: 7,
  20: 8,
  21: 9,
  22: 10,
  23: 11,
  24: 0,
};

export const MAP_12_PM_TO_24_HOUR = {
  0: 12,
  1: 13,
  2: 14,
  3: 15,
  4: 16,
  5: 17,
  6: 18,
  7: 19,
  8: 20,
  9: 21,
  10: 22,
  11: 23,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
};

export const MAP_24_HOUR_TO_12 = {
  0: 12,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 1,
  14: 2,
  15: 3,
  16: 4,
  17: 5,
  18: 6,
  19: 7,
  20: 8,
  21: 9,
  22: 10,
  23: 11,
  24: 12,
};
