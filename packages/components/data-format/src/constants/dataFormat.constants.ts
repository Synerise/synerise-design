import { FormatDateOptions } from 'react-intl';
import { TargetFormat, NamingConvention, Delimiter, DateConstantsTargetFormat } from '../types';

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

export const DATE: TargetFormat = 'date';
export const TIME: TargetFormat = 'time';
export const DATETIME: TargetFormat = 'datetime';
export const WEEKDAY_LONG: TargetFormat = 'weekday-long';
export const WEEKDAY_SHORT: TargetFormat = 'weekday-short';
export const MONTH_LONG: TargetFormat = 'month-long';
export const MONTH_SHORT: TargetFormat = 'month-short';

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
