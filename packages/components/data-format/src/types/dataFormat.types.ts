import { type Dayjs, type default as dayjs } from 'dayjs';
import { type Moment } from 'moment';
import {
  type FormatDateOptions,
  type FormatNumberOptions,
  type FormatPluralOptions,
} from 'react-intl';

import { type DATE_CONSTANTS_TARGET_FORMATS } from '../constants';

const _DATE_TARGET_FORMATS = [
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
export type DateTargetFormat = (typeof _DATE_TARGET_FORMATS)[number];

const _NUMBER_TARGET_FORMATS = [
  'compact-larger-number',
  'compact-decimal-larger-number',
] as const;
export type NumberTargetFormat = (typeof _NUMBER_TARGET_FORMATS)[number];

const _NAMING_CONVENTIONS = [
  'upperCase',
  'upperFirst',
  'lowerCase',
  'lowerFirst',
] as const;
export type NamingConvention = (typeof _NAMING_CONVENTIONS)[number];

export type DateConstantsTargetFormat =
  (typeof DATE_CONSTANTS_TARGET_FORMATS)[number];

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
    applyTimeZoneOffset?: boolean;
  };

export type OverloadFormatValue = {
  (value: number, options?: NumberToFormatOptions): string;
  (value: Date | Moment | Dayjs, options?: DateToFormatOptions): string;
  (value: string, options?: CommonFormatOptions): string;
};

export type OverloadFormatMultipleValues = {
  (values: number[], options?: NumberToFormatOptions): string[];
  (
    values: Date[] | Moment[] | Dayjs[],
    options?: DateToFormatOptions,
  ): string[];
  (values: string[], options?: CommonFormatOptions): string[];
};

export type OverloadGetConstants = {
  (
    targetFormat: DateConstantsTargetFormat,
    options?: DateToFormatOptions,
    customStartDate?: Date,
    customEndDate?: Date,
    customInterval?: dayjs.UnitType,
  ): string[] | undefined;
};

const _DELIMITERS = [',', '.', ' '] as const;
export type Delimiter = (typeof _DELIMITERS)[number];
