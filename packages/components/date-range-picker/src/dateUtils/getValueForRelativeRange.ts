import isEqual from 'lodash/isEqual';
import { RELATIVE_PRESETS, RELATIVE, ABSOLUTE } from '../constants';

const getValueForRelativeRange = range => {
  const relativeResult =
    range.type === RELATIVE &&
    RELATIVE_PRESETS.find(item => isEqual(item.offset, range.offset) && isEqual(item.duration, range.duration));
  const absoluteResult =
    range.type === ABSOLUTE && !range.from && !range.to && RELATIVE_PRESETS.find(item => item.key === 'ALL_TIME');

  return relativeResult || absoluteResult || range;
};
export default getValueForRelativeRange;
