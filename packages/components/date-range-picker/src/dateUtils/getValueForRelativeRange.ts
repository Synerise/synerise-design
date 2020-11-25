import { isEqual } from 'lodash';
import { RELATIVE_PRESETS, RELATIVE, ABSOLUTE } from '../constants';
import { DateRange } from '../date.types';

const getValueForRelativeRange = (range: DateRange): DateRange => {
  let relativeResult, fallbackAbsoluteValue;
  if (range?.type === 'RELATIVE') {
    relativeResult =
      range.type === RELATIVE &&
      RELATIVE_PRESETS.find(
        item => isEqual(item.offset, range.offset) && isEqual(item.duration, range.duration) && range.key === item.key
      );
  } else {
    fallbackAbsoluteValue =
      range.type === ABSOLUTE && !range.from && !range.to && RELATIVE_PRESETS.find(item => item.key === 'TODAY');
  }

  return (relativeResult || fallbackAbsoluteValue || range) as DateRange;
};
export default getValueForRelativeRange;
