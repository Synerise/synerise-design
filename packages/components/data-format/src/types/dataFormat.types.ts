import { FormatDateOptions, FormatNumberOptions, FormatPluralOptions } from 'react-intl';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';

const TargetFormats = [
  'date',
  'datetime',
  'time',
  'weekday-long',
  'weekday-short',
  'month-long',
  'month-short',
] as const;

export type TargetFormat = typeof TargetFormats[number];

export type CommonFormatOptions = {
  prefix?: string;
  suffix?: string;
};

export type NumberToFormatOptions = FormatNumberOptions &
  CommonFormatOptions & {
    pluralOptions?: FormatPluralOptions;
  };

export type DateToFormatOptions = FormatDateOptions & CommonFormatOptions;

export type DateTimeToFormatOptions = {
  dateOptions?: FormatDateOptions;
  timeOptions?: FormatDateOptions;
};

export type ValueToFormatOptions = (NumberToFormatOptions | DateToFormatOptions | DateTimeToFormatOptions) & {
  targetFormat?: TargetFormat;
};

export type ValueToFormat = number | string | undefined | Date | Moment | Dayjs;
