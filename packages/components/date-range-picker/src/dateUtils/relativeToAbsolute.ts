import fnsMax from 'date-fns/max';
import fnsMin from 'date-fns/min';

import { legacyParse } from '@date-fns/upgrade/v2';

import { type DateFilter, type RelativeDateRange } from '../date.types';
import ADD from './add';
import END_OF from './endOf';
import START_OF from './startOf';

export type Relative =
  | 'SECONDS'
  | 'MINUTES'
  | 'HOURS'
  | 'DAYS'
  | 'WEEKS'
  | 'MONTHS'
  | 'YEARS';

const relativeToAbsolute = (range: RelativeDateRange): DateFilter => {
  const { future, offset, duration } = range;
  const now = new Date();
  let left;
  let right;

  if (future) {
    left = legacyParse(
      // @ts-expect-error - requires type refactor
      ADD[offset.type](START_OF[offset.type](now), offset.value),
    );
    right = legacyParse(
      // @ts-expect-error - requires type refactor
      ADD[duration.type](END_OF[duration.type](left), duration.value - 1),
    );
  } else {
    right = legacyParse(
      // @ts-expect-error - requires type refactor
      ADD[offset.type](END_OF[offset.type](now), -offset.value),
    );
    left = legacyParse(
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
