import { FormatDateOptions, IntlShape } from 'react-intl';

import { DataFormatNotationType, DateTimeToFormatOptions, NumberToFormatOptions, ValueToFormatOptions } from '../types';
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

export const convertNumberString = (
  value: number,
  numberFormatIntl: IntlShape,
  languageIntl: IntlShape,
  numberFormatNotation?: DataFormatNotationType,
  options?: ValueToFormatOptions
): string => {
  const numberOptions = options as NumberToFormatOptions;

  if (numberOptions?.pluralOptions) {
    return numberFormatIntl.formatPlural(value, numberOptions);
  }

  const numberParts: Intl.NumberFormatPart[] = languageIntl.formatNumberToParts(value, numberOptions);
  return numberPartsToString(numberParts, numberFormatNotation);
};

export const convertDateToDateTimeString = (
  value: Date,
  dateFormatIntl: IntlShape,
  timeFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateTimeOptions = options as DateTimeToFormatOptions;
  const dateParts: Intl.DateTimeFormatPart[] = getDateParts(value, dateFormatIntl, dateTimeOptions?.dateOptions);
  const datePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getDateParts(
    value,
    languageIntl,
    dateTimeOptions?.dateOptions
  );
  const translatedDateParts = translateDateTimeParts(dateParts, datePartsByLanguageIntl, options);
  const date = dateTimePartsToString(translatedDateParts);
  const time = dateTimePartsToString(getTimeParts(value, timeFormatIntl, dateTimeOptions?.timeOptions));
  return `${date}, ${time}`;
};

export const convertDateToTimeString = (
  value: Date,
  timeFormatIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const timeOptions = options as FormatDateOptions;
  return dateTimePartsToString(getTimeParts(value, timeFormatIntl, timeOptions));
};

export const convertDateToDateString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateOptions = options as FormatDateOptions;
  const dateParts: Intl.DateTimeFormatPart[] = getDateParts(value, dateFormatIntl, dateOptions);
  const datePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getDateParts(value, languageIntl, dateOptions);
  const translatedDateParts = translateDateTimeParts(dateParts, datePartsByLanguageIntl, options);
  return dateTimePartsToString(translatedDateParts);
};

export const convertDateToWeekdayLongString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateOptions = options as FormatDateOptions;
  const weekdayLongDateParts: Intl.DateTimeFormatPart[] = getWeekdayLongDateParts(value, dateFormatIntl, dateOptions);
  const weekdayLongDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getWeekdayLongDateParts(
    value,
    languageIntl,
    dateOptions
  );
  const translatedDateTimeParts = translateDateTimeParts(
    weekdayLongDateParts,
    weekdayLongDatePartsByLanguageIntl,
    options
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, ['weekday']);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToWeekdayShortString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateOptions = options as FormatDateOptions;
  const weekdayShortDateParts: Intl.DateTimeFormatPart[] = getWeekdayShortDateParts(value, dateFormatIntl, dateOptions);
  const weekdayShortDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getWeekdayShortDateParts(
    value,
    languageIntl,
    dateOptions
  );
  const translatedDateTimeParts = translateDateTimeParts(
    weekdayShortDateParts,
    weekdayShortDatePartsByLanguageIntl,
    options
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, ['weekday']);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToMonthLongString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateOptions = options as FormatDateOptions;
  const monthLongDateParts: Intl.DateTimeFormatPart[] = getMonthLongDateParts(value, dateFormatIntl, dateOptions);
  const monthLongDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getMonthLongDateParts(
    value,
    languageIntl,
    dateOptions
  );
  const translatedDateTimeParts = translateDateTimeParts(monthLongDateParts, monthLongDatePartsByLanguageIntl, options);
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, ['month']);
  return dateTimePartsToString(reducedDateTimeParts);
};

export const convertDateToMonthShortString = (
  value: Date,
  dateFormatIntl: IntlShape,
  languageIntl: IntlShape,
  options?: ValueToFormatOptions
): string => {
  const dateOptions = options as FormatDateOptions;
  const monthShortDateParts: Intl.DateTimeFormatPart[] = getMonthShortDateParts(value, dateFormatIntl, dateOptions);
  const monthShortDatePartsByLanguageIntl: Intl.DateTimeFormatPart[] = getMonthShortDateParts(
    value,
    languageIntl,
    dateOptions
  );
  const translatedDateTimeParts = translateDateTimeParts(
    monthShortDateParts,
    monthShortDatePartsByLanguageIntl,
    options
  );
  const reducedDateTimeParts = getDateTimePartsSubset(translatedDateTimeParts, ['month']);
  return dateTimePartsToString(reducedDateTimeParts);
};
