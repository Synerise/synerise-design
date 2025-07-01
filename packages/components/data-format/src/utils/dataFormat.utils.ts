import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import { type IntlShape } from 'react-intl';

import {
  COMPACT_DECIMAL_LARGER_NUMBER,
  COMPACT_LARGER_NUMBER,
  DATE,
  DATETIME,
  DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
  DEFAULT_FORMAT_NUMBER_OPTIONS,
  LARGER_NUMBER_LIMIT,
  LOWER_CASE,
  LOWER_FIRST,
  UPPER_CASE,
  UPPER_FIRST,
} from '../constants';
import {
  type CommonFormatOptions,
  type DateToFormatOptions,
  type Delimiter,
  type NumberToFormatOptions,
} from '../types';
import {
  dateTimePartsToString,
  getDateParts,
  getDateTimePartsSubset,
  getMonthLongDateParts,
  getMonthShortDateParts,
  getTimeParts,
  getWeekdayLongDateParts,
  getWeekdayShortDateParts,
  numberPartsToString,
  translateDateTimeParts,
} from './dateTimeParts.utils';

dayjs.extend(relativeTimePlugin);

export const convertNumberString = (
  value: number,
  numberFormatIntl: IntlShape,
  languageIntl: IntlShape,
  thousandDelimiter: Delimiter,
  decimalDelimiter: Delimiter,
  numberOptions?: NumberToFormatOptions,
): string => {
  const updatedNumberOptions = numberOptions;

  if (updatedNumberOptions?.pluralOptions) {
    return numberFormatIntl.formatPlural(value, updatedNumberOptions);
  }

  if (
    updatedNumberOptions?.targetFormat === COMPACT_LARGER_NUMBER &&
    value > LARGER_NUMBER_LIMIT
  ) {
    if (!updatedNumberOptions.notation) {
      updatedNumberOptions.notation = 'compact';
    }
  }

  if (
    updatedNumberOptions?.targetFormat === COMPACT_DECIMAL_LARGER_NUMBER &&
    value > LARGER_NUMBER_LIMIT
  ) {
    if (!updatedNumberOptions.notation) {
      updatedNumberOptions.notation = 'compact';
    }
    if (
      !updatedNumberOptions.minimumFractionDigits &&
      updatedNumberOptions.minimumFractionDigits !== 0
    ) {
      updatedNumberOptions.minimumFractionDigits = 1;
    }
  }

  const numberParts: Intl.NumberFormatPart[] = languageIntl.formatNumberToParts(
    value,
    {
      ...DEFAULT_FORMAT_NUMBER_OPTIONS,
      ...updatedNumberOptions,
    },
  );
  return numberPartsToString(numberParts, thousandDelimiter, decimalDelimiter);
};

export const convertDateToDateTimeString = (
  value: Date,
  dateFormatIntl: IntlShape,
  timeFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const dateParts: Intl.DateTimeFormatPart[] = getDateParts(
    value,
    dateFormatIntl,
    options?.dateOptions,
  );
  const datePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getDateParts(
    value,
    languageIntl,
    options?.dateOptions,
  );
  const translatedDateParts = translateDateTimeParts(
    dateParts,
    datePartsByLanguageIntl,
    options,
  );
  const date = dateTimePartsToString(translatedDateParts);
  const time = dateTimePartsToString(
    getTimeParts(value, timeFormatIntl, options?.timeOptions),
  );
  return `${date}, ${time}`;
};

export const convertDateToRelativeToString = (
  value: Date,
  withoutSuffix?: boolean,
): string => {
  return dayjs().to(dayjs(value), withoutSuffix);
};

export const convertDateToRelativeFromString = (
  value: Date,
  withoutSuffix?: boolean,
): string => {
  return dayjs().from(dayjs(value), withoutSuffix);
};

export const convertDateToTimeString = (
  value: Date,
  timeFormatIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  return dateTimePartsToString(getTimeParts(value, timeFormatIntl, options));
};

export const convertDateToDateString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const dateParts: Intl.DateTimeFormatPart[] = getDateParts(
    value,
    dateFormatIntl,
    options,
  );
  const datePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getDateParts(
    value,
    languageIntl,
    options,
  );
  const translatedDateParts = translateDateTimeParts(
    dateParts,
    datePartsByLanguageIntl,
    options,
  );
  return dateTimePartsToString(translatedDateParts);
};

export const convertDateToWeekdayLongString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const weekdayLongDateParts: Intl.DateTimeFormatPart[] =
    getWeekdayLongDateParts(value, dateFormatIntl, options);
  const weekdayLongDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] =
    getWeekdayLongDateParts(value, languageIntl, options);
  const translatedDateTimeParts = translateDateTimeParts(
    weekdayLongDateParts,
    weekdayLongDatePartsByLanguageIntl,
    options,
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, [
    'weekday',
  ]);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToWeekdayShortString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const weekdayShortDateParts: Intl.DateTimeFormatPart[] =
    getWeekdayShortDateParts(value, dateFormatIntl, options);
  const weekdayShortDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] =
    getWeekdayShortDateParts(value, languageIntl, options);
  const translatedDateTimeParts = translateDateTimeParts(
    weekdayShortDateParts,
    weekdayShortDatePartsByLanguageIntl,
    options,
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, [
    'weekday',
  ]);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToMonthLongString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const monthLongDateParts: Intl.DateTimeFormatPart[] = getMonthLongDateParts(
    value,
    dateFormatIntl,
    options,
  );
  const monthLongDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] =
    getMonthLongDateParts(value, languageIntl, options);
  const translatedDateTimeParts = translateDateTimeParts(
    monthLongDateParts,
    monthLongDatePartsByLanguageIntl,
    options,
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, [
    'month',
  ]);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToMonthShortString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: DateToFormatOptions,
): string => {
  const monthShortDateParts: Intl.DateTimeFormatPart[] = getMonthShortDateParts(
    value,
    dateFormatIntl,
    options,
  );
  const monthShortDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] =
    getMonthShortDateParts(value, languageIntl, options);
  const translatedDateTimeParts = translateDateTimeParts(
    monthShortDateParts,
    monthShortDatePartsByLanguageIntl,
    options,
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, [
    'month',
  ]);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const addPrefix = (
  value: string,
  options?: CommonFormatOptions,
): string => {
  let result = value;
  if (options?.prefix) {
    result = options?.prefix + result;
  }
  return result;
};

export const addSuffix = (
  value: string,
  options?: CommonFormatOptions,
): string => {
  let result = value;
  if (options?.suffix) {
    result += options?.suffix;
  }
  return result;
};

export const changeNamingConvention = (
  value: string,
  options?: CommonFormatOptions,
): string => {
  let result = value;
  switch (options?.namingConvention) {
    case UPPER_CASE:
      result = result.toUpperCase();
      break;
    case UPPER_FIRST:
      result = result.charAt(0).toUpperCase() + result.slice(1);
      break;
    case LOWER_CASE:
      result = result.toLowerCase();
      break;
    case LOWER_FIRST:
      result = result.charAt(0).toLowerCase() + result.slice(1);
      break;
    default:
      break;
  }
  return result;
};

export const getDefaultDataTimeOptions = (
  showTime?: boolean,
): DateToFormatOptions => ({
  targetFormat: showTime ? DATETIME : DATE,
  dateOptions: DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
  namingConvention: UPPER_FIRST,
});
