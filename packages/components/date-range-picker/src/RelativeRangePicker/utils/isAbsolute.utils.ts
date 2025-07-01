import { ABSOLUTE } from '../../constants';
import { type DateRange } from '../../date.types';

export const isAbsolute = (value: DateRange): boolean =>
  value.type === ABSOLUTE && !value.from && !value.to;
