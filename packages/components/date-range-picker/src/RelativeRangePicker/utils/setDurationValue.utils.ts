import lensPath from 'ramda/src/lensPath.js';
import set from 'ramda/src/set.js';

import type { RelativeDateRange } from '../../date.types';

export const setDurationValue = (
  value: number | string,
  currentRange: RelativeDateRange,
): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['duration', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 1
      ? Math.round(updatedValue)
      : 1,
    currentRange,
  );
};
