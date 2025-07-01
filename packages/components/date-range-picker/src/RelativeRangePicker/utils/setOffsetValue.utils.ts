import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';

import { type RelativeDateRange } from '../../date.types';

export const setOffsetValue = (
  value: number | string,
  currentRange: RelativeDateRange,
): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['offset', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 0
      ? Math.round(updatedValue)
      : 0,
    currentRange,
  );
};
