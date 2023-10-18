import { RelativeDateRange } from '../../date.types';
import { RELATIVE, RANGES_MODE } from '../../constants';

export const getDefaultCustomRange = (currentGroup: string | null): RelativeDateRange => ({
  type: RELATIVE,
  from: undefined,
  to: undefined,
  future: currentGroup === RANGES_MODE.FUTURE,
  offset: { type: 'DAYS', value: 0 },
  duration: { type: 'DAYS', value: 30 },
});
