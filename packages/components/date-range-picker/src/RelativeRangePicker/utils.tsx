import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { ArrowRightM, ArrowLeftM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import { DateRange, RelativeDateRange } from '../date.types';
import * as CONST from '../constants';

export const setOffsetValue = (value: number | string, currentRange: RelativeDateRange): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['offset', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 0 ? Math.round(updatedValue) : 0,
    currentRange
  );
};
export const setDurationValue = (value: number | string, currentRange: RelativeDateRange): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['duration', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 1 ? Math.round(updatedValue) : 1,
    currentRange
  );
};
export const setFuture = set(lensPath(['future']));

export const GROUPS = {
  PAST: 'PAST',
  FUTURE: 'FUTURE',
};
export const RANGES_MODE = {
  PAST: 'PAST',
  FUTURE: 'FUTURE',
  SINCE: 'SINCE',
};
export const TIMESTAMP_MODE = {
  LAST: 'TIMESTAMP_LAST',
  NEXT: 'TIMESTAMP_NEXT',
};
export const RANGES_ICON = {
  PAST: <ArrowLeftM />,
  FUTURE: <ArrowRightM />,
  SINCE: <ArrowRightM />,
};
export const getDefaultCustomRange = (currentGroup: string | null): RelativeDateRange => ({
  type: CONST.RELATIVE,
  from: undefined,
  to: undefined,
  future: currentGroup === GROUPS.FUTURE,
  offset: { type: 'DAYS', value: 0 },
  duration: { type: 'DAYS', value: 0 },
});

export const isAbsolute = (value: DateRange): boolean => value.type === CONST.ABSOLUTE && !value.from && !value.to;

export function getCurrentGroupFromProps({ future, past }: { future: boolean; past: boolean }): string | null {
  if (past) {
    return GROUPS.PAST;
  }
  if (future) {
    return GROUPS.FUTURE;
  }
  return null;
}
