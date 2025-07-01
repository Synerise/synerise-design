import { isEqual } from 'lodash';

import { RELATIVE, RELATIVE_PRESETS } from '../constants';
import { type DateRange } from '../date.types';

const getRelativePresetForRange = (range: DateRange): DateRange => {
  let relativeResult;
  if (range?.type === RELATIVE) {
    relativeResult =
      range.type === RELATIVE &&
      RELATIVE_PRESETS.find(
        (item) =>
          isEqual(item.offset, range.offset) &&
          isEqual(item.duration, range.duration) &&
          range.key === item.key,
      );
  }
  return (relativeResult || range) as DateRange;
};
export default getRelativePresetForRange;
