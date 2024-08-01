import { FormatDateOptions, IntlShape } from 'react-intl';
import { format, getTimezoneOffset } from 'date-fns-tz';
import {
  DEFAULT_FORMAT_DATE_OPTIONS,
  DEFAULT_FORMAT_TIME_OPTIONS,
  DEFAULT_FORMAT_MONTH_LONG_OPTIONS,
  DEFAULT_FORMAT_MONTH_SHORT_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_LONG_OPTIONS,
  DEFAULT_FORMAT_WEEKDAY_SHORT_OPTIONS,
  MONTH,
  MONTH_LONG,
  MONTH_SHORT,
  WEEKDAY,
  WEEKDAY_LONG,
  WEEKDAY_SHORT,
  LONG,
  SHORT,
  TIMEZONE_OFFSET_REGEX,
} from '../constants';
import { DateToFormatOptions, Delimiter } from '../types';

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getValueWithTimezone = (value: Date, intlObject: IntlShape) => {
  return format(value, "yyyy-MM-dd'T'HH:mm:ssxxx", { timeZone: intlObject?.timeZone || defaultTimezone });
};

export const removeTimeZoneOffset = (dateString: string | Date) => {
  const date = dateString.toString();
  const finalDate = date.replace(TIMEZONE_OFFSET_REGEX, '');

  return finalDate;
};

export const extractTimeZoneOffset = (datestring: string) => {
  const date = datestring.toString();

  const found = date.match(TIMEZONE_OFFSET_REGEX);
  return found && found[0];
};

export const getLocalDateInTimeZone = (dateIsoString: string, timezone: string) => {
  // dateIsoString 2024-01-02T12:00:00-04:00
  // timezone Europe/Warsaw +02:00
  const dateTZOffset = extractTimeZoneOffset(dateIsoString); // -04:00
  const dateWithoutOffset = removeTimeZoneOffset(dateIsoString); // 2024-01-02T12:00:00

  const localDate = new Date(dateWithoutOffset);
  const localTimezoneOffset = getTimezoneOffset(timezone, localDate); // +2
  const dateTimezoneOffset = dateTZOffset ? getTimezoneOffset(dateTZOffset, localDate) : 0; // -4

  const offsetDiff = localTimezoneOffset - dateTimezoneOffset;
  localDate.setMilliseconds(localDate.getMilliseconds() + offsetDiff);

  return localDate;
};

export const getDateParts = (
  value: Date,
  dateFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  dateFormatIntl.formatDateToParts(getValueWithTimezone(value, dateFormatIntl), {
    ...DEFAULT_FORMAT_DATE_OPTIONS,
    ...option,
  });

export const getTimeParts = (
  value: Date,
  timeFormatIntl: IntlShape,
  option?: FormatDateOptions
): Intl.DateTimeFormatPart[] =>
  timeFormatIntl.formatDateToParts(getValueWithTimezone(value, timeFormatIntl), {
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
  thousandDelimiter: Delimiter,
  decimalDelimiter: Delimiter
): string => {
  const numberPartsWithReplacedDelimiters = numberParts.map(numberPart => {
    const numberPartWithReplacedDelimiters = numberPart;
    if (numberPartWithReplacedDelimiters.type === 'group') {
      numberPartWithReplacedDelimiters.value = thousandDelimiter;
    }

    if (numberPartWithReplacedDelimiters.type === 'decimal') {
      numberPartWithReplacedDelimiters.value = decimalDelimiter;
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
  options?: DateToFormatOptions
): Intl.DateTimeFormatPart[] => {
  const replacementDateTimeFormatPartTypes: Intl.DateTimeFormatPartTypes[] = [];

  if (options?.targetFormat === WEEKDAY_LONG || options?.targetFormat === WEEKDAY_SHORT)
    replacementDateTimeFormatPartTypes.push(WEEKDAY);

  if (options?.targetFormat === MONTH_LONG || options?.targetFormat === MONTH_SHORT)
    replacementDateTimeFormatPartTypes.push(MONTH);

  if (options?.dateOptions?.month === LONG || options?.dateOptions?.month === SHORT)
    replacementDateTimeFormatPartTypes.push(MONTH);

  if (options?.month === LONG || options?.month === SHORT) replacementDateTimeFormatPartTypes.push(MONTH);

  return replaceDateTimeParts(dateTimeParts, dateTimePartsFromLanguageIntl, replacementDateTimeFormatPartTypes);
};
