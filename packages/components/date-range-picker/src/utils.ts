import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import { legacyParse } from '@date-fns/upgrade/v2';
import * as utcPlugin from 'dayjs/plugin/utc';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
import { DateRange } from './date.types';
import { ABSOLUTE, RELATIVE } from './constants';
import ADD from './dateUtils/add';
import START_OF from './dateUtils/startOf';
import END_OF from './dateUtils/endOf';

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: undefined, to: undefined };
  }
  if (range.type === RELATIVE) {
    const { future, offset, duration } = range;
    const now = new Date();
    let left;
    let right;

    if (future) {
      left = ADD[offset.type](START_OF[offset.type](now), offset.value);
      right = ADD[duration.type](END_OF[duration.type](left), duration.value - 1);
    } else {
      right = ADD[offset.type](END_OF[offset.type](now), -offset.value);
      left = ADD[duration.type](START_OF[duration.type](right), 1 - duration.value);
    }

    const from = fnsMin([legacyParse(left), right]);
    const to = fnsMax([legacyParse(left), right]);
    return { ...range, type: RELATIVE, from, to, offset, duration, future };
  }
  const from = range.from ? legacyParse(range.from) : undefined;
  const to = range.to ? legacyParse(range.to) : undefined;
  return { ...range, type: ABSOLUTE, from, to };
};

export const formatTime = (seconds: number, formatString = 'HH:mm:ss'): string => {
  return dayjs
    .extend(utcPlugin)
    .utc(seconds * 1000)
    .format(formatString);
};
