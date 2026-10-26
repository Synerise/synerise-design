import { max as fnsMax, min as fnsMin } from 'date-fns';

import { currentTimeInTimezone } from '@synerise/ds-core';

import type { DateFilter, RelativeDateRange } from '../date.types';
import ADD from './add';
import END_OF from './endOf';
import START_OF from './startOf';
import { toDateValue } from './toDateValue';

export type Relative =
  | 'SECONDS'
  | 'MINUTES'
  | 'HOURS'
  | 'DAYS'
  | 'WEEKS'
  | 'MONTHS'
  | 'YEARS';

const relativeToAbsolute = (
  range: RelativeDateRange,
  timeZone?: string,
): DateFilter => {
  const { future, offset, duration } = range;
  // Resolved against the provider's clock when there is one, so the bounds land on the
  // provider's day. `currentTimeInTimezone` returns it as a wall-clock date, the convention
  // the START_OF / END_OF arithmetic below works in.
  const now = timeZone ? currentTimeInTimezone(timeZone) : new Date();
  let left;
  let right;

  if (future) {
    left = toDateValue(
      // @ts-expect-error - requires type refactor
      ADD[offset.type](START_OF[offset.type](now), offset.value),
    );
    right = toDateValue(
      // @ts-expect-error - requires type refactor
      ADD[duration.type](END_OF[duration.type](left), duration.value - 1),
    );
  } else {
    right = toDateValue(
      // @ts-expect-error - requires type refactor
      ADD[offset.type](END_OF[offset.type](now), -offset.value),
    );
    left = toDateValue(
      // @ts-expect-error - requires type refactor
      ADD[duration.type](START_OF[duration.type](right), 1 - duration.value),
    );
  }

  const from = fnsMin([left, right]);
  const to = fnsMax([left, right]);
  return {
    from,
    to,
    type: 'ABSOLUTE',
  };
};

export default relativeToAbsolute;
