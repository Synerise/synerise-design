// @flow
import ADD from './add';
import START_OF from './startOf';
import END_OF from './endOf';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';

export type Relative = 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface Datefilter {
  type: 'ABSOLUTE' | 'RELATIVE';
  from?: string | Date;
  to?: string | Date;
  duration?: {
    type: Relative,
    value: number,
  };
  offset?: {
    type: Relative,
    value: number,
  };
}

const relativeToAbsolute = (range: Object): Datefilter => {
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

  const from = fnsMin(left, right);
  const to = fnsMax(left, right);
  return {
    from,
    to,
    type: 'ABSOLUTE',
  };
};

export default relativeToAbsolute;
