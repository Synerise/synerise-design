import { ABSOLUTE } from '../../constants';
import { DateRange } from '../../date.types';

export const isAbsolute = (value: DateRange): boolean => value.type === ABSOLUTE && !value.from && !value.to;
