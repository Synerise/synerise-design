import { isEqual } from 'lodash';
import { RELATIVE_PRESETS, RELATIVE } from '../constants';
import { DateRange } from '../date.types';

const getRelativePresetForRange = (range: DateRange): DateRange => {
  let relativeResult;
  if (range?.type === RELATIVE) {
    relativeResult =
      range.type === RELATIVE &&
      RELATIVE_PRESETS.find(
        item => isEqual(item.offset, range.offset) && isEqual(item.duration, range.duration) && range.key === item.key
      );
  }
  return (relativeResult || range) as DateRange;
};
export default getRelativePresetForRange;
