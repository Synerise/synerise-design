import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { type FormatDateOptions, type IntlShape } from 'react-intl';

import {
  DEFAULT_FORMAT_DATE_OPTIONS,
  DEFAULT_FORMAT_MONTH_LONG_OPTIONS,
  DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
  DEFAULT_FORMAT_TIME_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS,
  LONG,
  MONTH,
  MONTH_LONG,
  MONTH_SHORT,
  SHORT,
  WEEKDAY,
  WEEKDAY_LONG,
  WEEKDAY_SHORT,
} from '../constants';
import { type DateToFormatOptions, type Delimiter } from '../types';

dayjs.extend(utc);
dayjs.extend(timezone);
const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const getValueWithTimezone = (value: Date, intlObject: IntlShape) => {
  return dayjs(value)
    .tz(intlObject?.timeZone || defaultTimezone, true)
    .format();
};

export const getDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(
    getValueWithTimezone(value, dateFormatIntl),
    {
      ...DEFAULT_FORMAT_DATE_OPTIONS,
      ...option,
    },
  );

export const getTimeParts = (
  value: Date,
  timeFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  timeFormatIntl.formatDateToParts(
    getValueWithTimezone(value, timeFormatIntl),
    {
      ...DEFAULT_FORMAT_TIME_OPTIONS,
      ...option,
    },
  );

export const getWeekdayLongDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS,
    ...option,
  });

export const getWeekdayShortDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS,
    ...option,
  });

export const getMonthLongDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_MONTH_LONG_OPTIONS,
    ...option,
  });

export const getMonthShortDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions,
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(value, {
    ...DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
    ...option,
  });

export const getDateTimePartsSubset = (
  dateTimeParts: Intl.DateTimeFormatPart[],
  subsetTypes: Intl.DateTimeFormatPartTypes[],
): Intl.DateTimeFormatPart[] => {
  const resultDateTimeParts: Intl.DateTimeFormatPart[] = [];

  dateTimeParts.forEach((dateTimePart) => {
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
  thousandDelimiter: Delimiter,
  decimalDelimiter: Delimiter,
): string => {
  const numberPartsWithReplacedDelimiters = numberParts.map((numberPart) => {
    const numberPartWithReplacedDelimiters = numberPart;
    if (numberPartWithReplacedDelimiters.type === 'group') {
      numberPartWithReplacedDelimiters.value = thousandDelimiter;
    }

    if (numberPartWithReplacedDelimiters.type === 'decimal') {
      numberPartWithReplacedDelimiters.value = decimalDelimiter;
    }

    return numberPartWithReplacedDelimiters;
  });

  const joinedNumberParts = numberPartsWithReplacedDelimiters
    .map((numberPart) => numberPart.value)
    .join('');
  return nbspToSpace(joinedNumberParts);
};

export const dateTimePartsToString = (
  dateTimeParts: Intl.DateTimeFormatPart[],
): string => {
  const joinedDateTimeParts = dateTimeParts
    .map((dateTimePart) => dateTimePart.value)
    .join('');
  return nbspToSpace(joinedDateTimeParts);
};

export const replaceDateTimeParts = (
  dateTimeParts: Intl.DateTimeFormatPart[],
  replacementDateTimeParts: Intl.DateTimeFormatPart[],
  replacementDateTimeFormatPartTypes: Intl.DateTimeFormatPartTypes[],
): Intl.DateTimeFormatPart[] => {
  return dateTimeParts.map((dateTimePart) => {
    const dateTimePartToReplace = dateTimePart;

    if (
      replacementDateTimeFormatPartTypes?.includes(dateTimePartToReplace.type)
    ) {
      const foundedReplacementDateTimePart = replacementDateTimeParts?.find(
        (replacementDateTimePart) =>
          replacementDateTimePart.type === dateTimePartToReplace.type,
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
  options?: DateToFormatOptions,
): Intl.DateTimeFormatPart[] => {
  const replacementDateTimeFormatPartTypes: Intl.DateTimeFormatPartTypes[] = [];

  if (
    options?.targetFormat === WEEKDAY_LONG ||
    options?.targetFormat === WEEKDAY_SHORT
  ) {
    replacementDateTimeFormatPartTypes.push(WEEKDAY);
  }

  if (
    options?.targetFormat === MONTH_LONG ||
    options?.targetFormat === MONTH_SHORT
  ) {
    replacementDateTimeFormatPartTypes.push(MONTH);
  }

  if (
    options?.dateOptions?.month === LONG ||
    options?.dateOptions?.month === SHORT
  ) {
    replacementDateTimeFormatPartTypes.push(MONTH);
  }

  if (options?.month === LONG || options?.month === SHORT) {
    replacementDateTimeFormatPartTypes.push(MONTH);
  }

  return replaceDateTimeParts(
    dateTimeParts,
    dateTimePartsFromLanguageIntl,
    replacementDateTimeFormatPartTypes,
  );
};
