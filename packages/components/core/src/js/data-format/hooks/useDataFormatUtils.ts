import dayjs, { type Dayjs } from 'dayjs';
import moment, { type Moment } from 'moment';
import { useCallback } from 'react';
import { type IntlShape, useIntl } from 'react-intl';

import {
  DATE,
  DATETIME,
  EU_DECIMAL_DELIMITER,
  EU_NOTATION,
  EU_THOUSAND_DELIMITER,
  MONTH_LONG,
  MONTH_SHORT,
  RELATIVE_FROM,
  RELATIVE_FROM_WITHOUT_SUFFIX,
  RELATIVE_TO,
  RELATIVE_TO_WITHOUT_SUFFIX,
  TIME,
  US_DECIMAL_DELIMITER,
  US_NOTATION,
  US_THOUSAND_DELIMITER,
  WEEKDAY_LONG,
  WEEKDAY_SHORT,
} from '../constants';
import {
  type CommonFormatOptions,
  type DataFormatNotationType,
  type DateToFormatOptions,
  type Delimiter,
  type NumberToFormatOptions,
} from '../types';
import {
  addPrefix,
  addSuffix,
  changeNamingConvention,
  convertDateToDateString,
  convertDateToDateTimeString,
  convertDateToMonthLongString,
  convertDateToMonthShortString,
  convertDateToRelativeFromString,
  convertDateToRelativeToString,
  convertDateToTimeString,
  convertDateToWeekdayLongString,
  convertDateToWeekdayShortString,
  convertNumberString,
} from '../utils';
import { getLocalDateInTimeZone } from '../utils/timeZone.utils';
import { useDataFormatConfig } from './useDataFormatConfig';

export const useDataFormatUtils = (): {
  getLocaleFromNotation: (notation?: DataFormatNotationType) => string;
  getFirstDayOfWeekFromNotation: (notation?: DataFormatNotationType) => number;
  getIs12HoursClockFromNotation: (notation?: DataFormatNotationType) => boolean;
  getFormattedNumber: (
    value: number,
    numberFormatIntl: IntlShape,
    options?: NumberToFormatOptions,
  ) => string;
  getFormattedDate: (
    value: Date,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: DateToFormatOptions,
  ) => string;
  getFormattedDateFromMoment: (
    value: Moment,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: DateToFormatOptions,
  ) => string;
  getFormattedDateFromDayjs: (
    value: Dayjs,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: DateToFormatOptions,
  ) => string;
  getFormattedValueUsingCommonOptions: (
    value: string,
    options?: CommonFormatOptions,
  ) => string;
  getThousandDelimiterFromNotation: (
    notation?: DataFormatNotationType,
  ) => Delimiter;
  getDecimalDelimiterFromNotation: (
    notation?: DataFormatNotationType,
  ) => Delimiter;
} => {
  const languageIntl = useIntl();
  const { numberFormatNotation, applyTimeZoneOffset } = useDataFormatConfig();

  const getLocaleFromNotation = useCallback(
    (notation?: DataFormatNotationType): string => {
      switch (notation) {
        case EU_NOTATION:
          return 'pl';
        case US_NOTATION:
          return 'en-US';
        default:
          return 'pl';
      }
    },
    [],
  );

  const getFirstDayOfWeekFromNotation = useCallback(
    (notation?: DataFormatNotationType): number => {
      switch (notation) {
        case EU_NOTATION:
          return 1;
        case US_NOTATION:
          return 0;
        default:
          return 1;
      }
    },
    [],
  );

  const getThousandDelimiterFromNotation = useCallback(
    (notation?: DataFormatNotationType): Delimiter =>
      notation === US_NOTATION ? US_THOUSAND_DELIMITER : EU_THOUSAND_DELIMITER,
    [],
  );

  const getDecimalDelimiterFromNotation = useCallback(
    (notation?: DataFormatNotationType): Delimiter =>
      notation === US_NOTATION ? US_DECIMAL_DELIMITER : EU_DECIMAL_DELIMITER,
    [],
  );

  const getIs12HoursClockFromNotation = useCallback(
    (notation?: DataFormatNotationType): boolean => notation === US_NOTATION,
    [],
  );

  const getFormattedNumber = useCallback(
    (
      value: number,
      numberFormatIntl: IntlShape,
      options?: NumberToFormatOptions,
    ): string => {
      const thousandDelimiter =
        getThousandDelimiterFromNotation(numberFormatNotation);
      const decimalDelimiter =
        getDecimalDelimiterFromNotation(numberFormatNotation);
      return convertNumberString(
        value,
        numberFormatIntl,
        languageIntl,
        thousandDelimiter,
        decimalDelimiter,
        options,
      );
    },
    [
      languageIntl,
      numberFormatNotation,
      getThousandDelimiterFromNotation,
      getDecimalDelimiterFromNotation,
    ],
  );

  const { timeZone: globalTimeZone } = useIntl();

  const getFormattedDate = useCallback(
    (
      value: Date,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: DateToFormatOptions,
    ): string => {
      const valueInTimezone =
        globalTimeZone && applyTimeZoneOffset
          ? getLocalDateInTimeZone(value.toISOString(), globalTimeZone)
          : value;

      if (options?.targetFormat === DATETIME) {
        return convertDateToDateTimeString(
          valueInTimezone,
          dateFormatIntl,
          timeFormatIntl,
          languageIntl,
          options,
        );
      }

      if (options?.targetFormat === TIME) {
        return convertDateToTimeString(
          valueInTimezone,
          timeFormatIntl,
          options,
        );
      }

      if (options?.targetFormat === RELATIVE_TO) {
        return convertDateToRelativeToString(value);
      }

      if (options?.targetFormat === RELATIVE_TO_WITHOUT_SUFFIX) {
        return convertDateToRelativeToString(value, true);
      }

      if (options?.targetFormat === RELATIVE_FROM) {
        return convertDateToRelativeFromString(value);
      }

      if (options?.targetFormat === RELATIVE_FROM_WITHOUT_SUFFIX) {
        return convertDateToRelativeFromString(value, true);
      }

      if (options?.targetFormat === WEEKDAY_LONG) {
        return convertDateToWeekdayLongString(
          valueInTimezone,
          dateFormatIntl,
          languageIntl,
          options,
        );
      }

      if (options?.targetFormat === WEEKDAY_SHORT) {
        return convertDateToWeekdayShortString(
          valueInTimezone,
          dateFormatIntl,
          languageIntl,
          options,
        );
      }

      if (options?.targetFormat === MONTH_LONG) {
        return convertDateToMonthLongString(
          valueInTimezone,
          dateFormatIntl,
          languageIntl,
          options,
        );
      }

      if (options?.targetFormat === MONTH_SHORT) {
        return convertDateToMonthShortString(
          valueInTimezone,
          dateFormatIntl,
          languageIntl,
          options,
        );
      }

      if (options?.targetFormat === DATE || !options?.targetFormat) {
        return convertDateToDateString(
          valueInTimezone,
          dateFormatIntl,
          languageIntl,
          options,
        );
      }

      return value?.toString() ?? '';
    },
    [globalTimeZone, applyTimeZoneOffset, languageIntl],
  );

  const getFormattedDateFromMoment = useCallback(
    (
      value: Moment,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: DateToFormatOptions,
    ): string => {
      return getFormattedDate(
        moment(value).toDate(),
        dateFormatIntl,
        timeFormatIntl,
        options,
      );
    },
    [getFormattedDate],
  );

  const getFormattedDateFromDayjs = useCallback(
    (
      value: Dayjs,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: DateToFormatOptions,
    ): string => {
      return getFormattedDate(
        dayjs(value).toDate(),
        dateFormatIntl,
        timeFormatIntl,
        options,
      );
    },
    [getFormattedDate],
  );

  const getFormattedValueUsingCommonOptions = useCallback(
    (value: string, options?: CommonFormatOptions): string => {
      let result = value;
      result = addPrefix(result, options);
      result = addSuffix(result, options);
      result = changeNamingConvention(result, options);
      return result;
    },
    [],
  );

  return {
    getLocaleFromNotation,
    getFirstDayOfWeekFromNotation,
    getIs12HoursClockFromNotation,
    getFormattedNumber,
    getFormattedDate,
    getFormattedDateFromMoment,
    getFormattedDateFromDayjs,
    getFormattedValueUsingCommonOptions,
    getThousandDelimiterFromNotation,
    getDecimalDelimiterFromNotation,
  };
};
