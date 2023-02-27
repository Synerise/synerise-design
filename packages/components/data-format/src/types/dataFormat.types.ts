import { FormatDateOptions, FormatNumberOptions, FormatPluralOptions } from 'react-intl';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

const TARGET_FORMATS = [
  'date',
  'datetime',
  'time',
  'weekday-long',
  'weekday-short',
  'month-long',
  'month-short',
] as const;
export type TargetFormat = typeof TARGET_FORMATS[number];

const NAMING_CONVENTIONS = ['upperCase', 'upperFirst', 'lowerCase', 'lowerFirst'] as const;
export type NamingConvention = typeof NAMING_CONVENTIONS[number];

export type DateToFormat = Date | Moment | Dayjs;

export type CommonFormatOptions = {
  prefix?: string;
  suffix?: string;
  namingConvention?: NamingConvention;
};

export type NumberToFormatOptions = FormatNumberOptions &
  CommonFormatOptions & {
    pluralOptions?: FormatPluralOptions;
  };

export type DateToFormatOptions = FormatDateOptions &
  CommonFormatOptions & {
    dateOptions?: FormatDateOptions;
    timeOptions?: FormatDateOptions;
    targetFormat?: TargetFormat;
  };

export type OverloadFormatValue = {
  (value: number, options?: NumberToFormatOptions): string;
  (value: Date, options?: DateToFormatOptions): string;
  (value: Moment, options?: DateToFormatOptions): string;
  (value: Dayjs, options?: DateToFormatOptions): string;
};
