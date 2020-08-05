// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import isEqual from 'lodash/isEqual';
import { RELATIVE_PRESETS, RELATIVE, ABSOLUTE } from '../constants';
import { DateRange } from '../date.types';

const getValueForRelativeRange = (range: DateRange): DateRange => {
  const relativeResult =
    range.type === RELATIVE &&
    RELATIVE_PRESETS.find(item => isEqual(item.offset, range.offset) && isEqual(item.duration, range.duration) && range.key === item.key);
  const absoluteResult =
    range.type === ABSOLUTE && !range.from && !range.to && RELATIVE_PRESETS.find(item => item.key === 'TODAY');

  return (relativeResult || absoluteResult || range) as DateRange;
};
export default getValueForRelativeRange;
