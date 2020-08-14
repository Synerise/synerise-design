import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { ArrowRightM, ArrowLeftM, SinceArrowRightM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import { DateRange, RelativeDateRange } from '../date.types';
import * as CONST from '../constants';
import { Props } from './RelativeRangePicker.types';

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
export const getDefaultCustomRange = (currentGroup: string | null): RelativeDateRange => ({
  type: CONST.RELATIVE,
  from: undefined,
  to: undefined,
  future: currentGroup === RANGES_MODE.FUTURE,
  offset: { type: 'DAYS', value: 0 },
  duration: { type: 'DAYS', value: 0 },
});

export const isAbsolute = (value: DateRange): boolean => value.type === CONST.ABSOLUTE && !value.from && !value.to;

export function getCurrentGroupFromProps({ relativeModes }: Props): string | null {
  if (!!relativeModes && relativeModes?.length > 0) {
    return relativeModes[0];
  }

  return null;
}
