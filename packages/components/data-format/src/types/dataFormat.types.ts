import { FormatDateOptions, FormatNumberOptions, FormatPluralOptions } from 'react-intl';
import { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_CONSTANTS_TARGET_FORMATS } from '../constants';

const DATE_TARGET_FORMATS = [
  'date',
  'datetime',
  'relative-from',
  'relative-to',
  'relative-from-without-suffix',
  'relative-to-without-suffix',
  'time',
  'weekday-long',
  'weekday-short',
  'month-long',
  'month-short',
] as const;
export type DateTargetFormat = typeof DATE_TARGET_FORMATS[number];

const NUMBER_TARGET_FORMATS = ['compact-larger-number', 'compact-decimal-larger-number'] as const;
export type NumberTargetFormat = typeof NUMBER_TARGET_FORMATS[number];

const NAMING_CONVENTIONS = ['upperCase', 'upperFirst', 'lowerCase', 'lowerFirst'] as const;
export type NamingConvention = typeof NAMING_CONVENTIONS[number];

export type DateConstantsTargetFormat = typeof DATE_CONSTANTS_TARGET_FORMATS[number];

export type DateToFormat = Date | Moment | Dayjs;

export type CommonFormatOptions = {
  prefix?: string;
  suffix?: string;
  namingConvention?: NamingConvention;
};

export type NumberToFormatOptions = FormatNumberOptions &
  CommonFormatOptions & {
    pluralOptions?: FormatPluralOptions;
    targetFormat?: NumberTargetFormat;
  };

export type DateToFormatOptions = FormatDateOptions &
  CommonFormatOptions & {
    dateOptions?: FormatDateOptions;
    timeOptions?: FormatDateOptions;
    targetFormat?: DateTargetFormat;
  };

export type OverloadFormatValue = {
  (value: number, options?: NumberToFormatOptions): string;
  (value: Date | Moment | Dayjs, options?: DateToFormatOptions): string;
  (value: string, options?: CommonFormatOptions): string;
};

export type OverloadFormatMultipleValues = {
  (values: number[], options?: NumberToFormatOptions): string[];
  (values: Date[] | Moment[] | Dayjs[], options?: DateToFormatOptions): string[];
  (values: string[], options?: CommonFormatOptions): string[];
};

export type OverloadGetConstants = {
  (
    targetFormat: DateConstantsTargetFormat,
    options?: DateToFormatOptions,
    customStartDate?: Date,
    customEndDate?: Date,
    customInterval?: dayjs.UnitType
  ): string[] | undefined;
};

const DELIMITERS = [',', '.', ' '] as const;
export type Delimiter = typeof DELIMITERS[number];
