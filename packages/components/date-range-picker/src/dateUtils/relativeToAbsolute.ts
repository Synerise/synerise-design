import type {
  AbsoluteDateRange,
  RelativeDateRange,
  SinceDateRange,
} from '../date.types';
import { normalizeRange } from '../utils';

/**
 * The bounds `forceAbsolute` emits, which must be the range the panel showed — so they come from
 * `normalizeRange` rather than a second implementation of the arithmetic. `timeZone` is the
 * clock "now" is read from, as in `normalizeRange`'s relative branch.
 */
const relativeToAbsolute = (
  range: RelativeDateRange | SinceDateRange,
  timeZone?: string,
): AbsoluteDateRange => {
  const { from, to } = normalizeRange(range, timeZone);

  return {
    from,
    to,
    type: 'ABSOLUTE',
  };
};

export default relativeToAbsolute;
