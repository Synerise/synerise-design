import type { DateRange, SinceDateRange } from '../date.types';

/** A SINCE range shares `type: 'RELATIVE'` with a relative one, so `type` cannot narrow it. */
export const isSinceRange = (range: DateRange): range is SinceDateRange =>
  range.type === 'RELATIVE' && range.offset?.type === 'SINCE';
