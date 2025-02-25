import { FormatDateOptions, FormatNumberOptions } from 'react-intl';
import { DateTargetFormat, NamingConvention, Delimiter, DateConstantsTargetFormat, NumberTargetFormat } from '../types';

export const DEFAULT_FORMAT_NUMBER_OPTIONS: FormatNumberOptions = {
  maximumFractionDigits: 2,
  useGrouping: true,
};

export const DEFAULT_FORMAT_DATE_OPTIONS: FormatDateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const DEFAULT_FORMAT_TIME_OPTIONS: FormatDateOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

export const DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS: FormatDateOptions = {
  weekday: 'long',
};

export const DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS: FormatDateOptions = {
  weekday: 'short',
};

export const DEFAULT_FORMAT_MONTH_LONG_OPTIONS: FormatDateOptions = {
  month: 'long',
};

export const DEFAULT_FORMAT_MONTH_SHORT_OPTIONS: FormatDateOptions = {
  month: 'short',
};

export const DATE: DateTargetFormat = 'date';
export const TIME: DateTargetFormat = 'time';
export const DATETIME: DateTargetFormat = 'datetime';
export const RELATIVE_FROM: DateTargetFormat = 'relative-from';
export const RELATIVE_TO: DateTargetFormat = 'relative-to';
export const RELATIVE_FROM_WITHOUT_SUFFIX: DateTargetFormat = 'relative-from-without-suffix';
export const RELATIVE_TO_WITHOUT_SUFFIX: DateTargetFormat = 'relative-to-without-suffix';
export const WEEKDAY_LONG: DateTargetFormat = 'weekday-long';
export const WEEKDAY_SHORT: DateTargetFormat = 'weekday-short';
export const MONTH_LONG: DateTargetFormat = 'month-long';
export const MONTH_SHORT: DateTargetFormat = 'month-short';

export const COMPACT_LARGER_NUMBER: NumberTargetFormat = 'compact-larger-number';
export const COMPACT_DECIMAL_LARGER_NUMBER: NumberTargetFormat = 'compact-decimal-larger-number';

export const LARGER_NUMBER_LIMIT = 999;

export const UPPER_CASE: NamingConvention = 'upperCase';
export const UPPER_FIRST: NamingConvention = 'upperFirst';
export const LOWER_CASE: NamingConvention = 'lowerCase';
export const LOWER_FIRST: NamingConvention = 'lowerFirst';

export const US_THOUSAND_DELIMITER: Delimiter = ',';
export const US_DECIMAL_DELIMITER: Delimiter = '.';
export const EU_THOUSAND_DELIMITER: Delimiter = ' ';
export const EU_DECIMAL_DELIMITER: Delimiter = ',';

export const DATE_CONSTANTS_TARGET_FORMATS = [
  'months-long',
  'months-short',
  'weekdays-long',
  'weekdays-short',
] as const;
export const MONTHS_LONG: DateConstantsTargetFormat = 'months-long';
export const MONTHS_SHORT: DateConstantsTargetFormat = 'months-short';
export const WEEKDAYS_LONG: DateConstantsTargetFormat = 'weekdays-long';
export const WEEKDAYS_SHORT: DateConstantsTargetFormat = 'weekdays-short';
