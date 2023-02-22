import { FormatDateOptions, IntlShape } from 'react-intl';

import { DEFAULT_FORMAT_DATE_OPTIONS, DEFAULT_FORMAT_TIME_OPTIONS } from '../constants';
import {
  DEFAULT_FORMAT_MONTH_LONG_OPTIONS,
  DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS,
} from '../constants/dataFormat.constants';
import { DataFormatNotationType, DateTimeToFormatOptions, ValueToFormatOptions } from '../types';

export const getDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_DATE_OPTIONS,
    ...option,
  });

export const getTimeParts = (
  value: Date,
  timeFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  timeFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_TIME_OPTIONS,
    ...option,
  });

export const getWeekdayLongDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS,
    ...option,
  });

export const getWeekdayShortDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS,
    ...option,
  });

export const getMonthLongDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_MONTH_LONG_OPTIONS,
    ...option,
  });

export const getMonthShortDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
    ...option,
  });

export const getDateTimePartsSubset = (
  dateTimeParts: Intl.DateTimeFormatPart[],
  subsetTypes: Intl.DateTimeFormatPartTypes[]
): Intl.DateTimeFormatPart[] => {
  const resultDateTimeParts: Intl.DateTimeFormatPart[] = [];

  dateTimeParts.forEach(dateTimePart => {
    if (subsetTypes.includes(dateTimePart.type)) {
      resultDateTimeParts.push(dateTimePart);
    }
  });

  return resultDateTimeParts;
};

export const nbspToSpace = (text: string): string => {
  return text.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
};

export const numberPartsToString = (
  numberParts: Intl.NumberFormatPart[],
  notation?: DataFormatNotationType
): string => {
  const numberPartsWithReplacedDelimiters = numberParts.map(numberPart => {
    const numberPartWithReplacedDelimiters = numberPart;
    if (numberPartWithReplacedDelimiters.type === 'group') {
      numberPartWithReplacedDelimiters.value = notation === 'US' ? ',' : ' ';
    }

    if (numberPartWithReplacedDelimiters.type === 'decimal') {
      numberPartWithReplacedDelimiters.value = notation === 'US' ? '.' : ',';
    }

    return numberPartWithReplacedDelimiters;
  });

  const joinedNumberParts = numberPartsWithReplacedDelimiters.map(numberPart => numberPart.value).join('');
  return nbspToSpace(joinedNumberParts);
};

export const dateTimePartsToString = (dateTimeParts: Intl.DateTimeFormatPart[]): string => {
  const joinedDateTimeParts = dateTimeParts.map(dateTimePart => dateTimePart.value).join('');
  return nbspToSpace(joinedDateTimeParts);
};

export const replaceDateTimeParts = (
  dateTimeParts: Intl.DateTimeFormatPart[],
  replacementDateTimeParts: Intl.DateTimeFormatPart[],
  replacementDateTimeFormatPartTypes: Intl.DateTimeFormatPartTypes[]
): Intl.DateTimeFormatPart[] => {
  return dateTimeParts.map(dateTimePart => {
    const dateTimePartToReplace = dateTimePart;

    if (replacementDateTimeFormatPartTypes?.includes(dateTimePartToReplace.type)) {
      const foundedReplacementDateTimePart = replacementDateTimeParts?.find(
        replacementDateTimePart => replacementDateTimePart.type === dateTimePartToReplace.type
      );

      if (foundedReplacementDateTimePart) {
        dateTimePartToReplace.value = foundedReplacementDateTimePart.value;
      }
    }

    return dateTimePartToReplace;
  });
};

export const translateDateTimeParts = (
  dateTimeParts: Intl.DateTimeFormatPart[],
  dateTimePartsFromLanguageIntl: Intl.DateTimeFormatPart[],
  options?: ValueToFormatOptions
): Intl.DateTimeFormatPart[] => {
  const replacementDateTimeFormatPartTypes: Intl.DateTimeFormatPartTypes[] = [];

  if (options?.targetFormat === 'weekday-long' || options?.targetFormat === 'weekday-short')
    replacementDateTimeFormatPartTypes.push('weekday');

  if (options?.targetFormat === 'month-long' || options?.targetFormat === 'month-short')
    replacementDateTimeFormatPartTypes.push('month');

  const dateTimeOptions = options as DateTimeToFormatOptions;
  if (dateTimeOptions?.dateOptions?.month === 'long' || dateTimeOptions?.dateOptions?.month === 'short')
    replacementDateTimeFormatPartTypes.push('month');

  const dateOptions = options as FormatDateOptions;
  if (dateOptions?.month === 'long' || dateOptions?.month === 'short') replacementDateTimeFormatPartTypes.push('month');

  return replaceDateTimeParts(dateTimeParts, dateTimePartsFromLanguageIntl, replacementDateTimeFormatPartTypes);
};
