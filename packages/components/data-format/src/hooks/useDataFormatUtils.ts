import { useCallback } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import moment from 'moment';
import dayjs from 'dayjs';

import { DataFormatNotationType, ValueToFormat, ValueToFormatOptions, CommonFormatOptions } from '../types';
import { useDataFormatConfig } from './useDataFormatConfig';
import {
  convertDateToDateTimeString,
  convertDateToTimeString,
  convertDateToDateString,
  convertDateToWeekdayLongString,
  convertNumberString,
  convertDateToWeekdayShortString,
  convertDateToMonthLongString,
  convertDateToMonthShortString,
} from '../utils';

export const useDataFormatUtils = (): {
  getLocaleFromNotation: (notation?: DataFormatNotationType) => string;
  getFirstDayOfWeekFromNotation: (notation?: DataFormatNotationType) => number;
  getIs12HoursClockFromNotation: (notation?: DataFormatNotationType) => boolean;
  getFormattedNumber: (value: ValueToFormat, numberFormatIntl: IntlShape, options?: ValueToFormatOptions) => string;
  getFormattedDate: (
    value: ValueToFormat,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: ValueToFormatOptions
  ) => string;
  getFormattedDateFromMoment: (
    value: ValueToFormat,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: ValueToFormatOptions
  ) => string;
  getFormattedDateFromDayjs: (
    value: ValueToFormat,
    dateFormatIntl: IntlShape,
    timeFormatIntl: IntlShape,
    options?: ValueToFormatOptions
  ) => string;
  getFormattedValueUsingCommonOptions: (value: ValueToFormat, options?: ValueToFormatOptions) => string;
} => {
  const languageIntl = useIntl();
  const { numberFormatNotation } = useDataFormatConfig();

  const getLocaleFromNotation = useCallback((notation?: DataFormatNotationType): string => {
    switch (notation) {
      case 'EU':
        return 'pl';
      case 'US':
        return 'en-US';
      default:
        return 'pl';
    }
  }, []);

  const getFirstDayOfWeekFromNotation = useCallback((notation?: DataFormatNotationType): number => {
    switch (notation) {
      case 'EU':
        return 1;
      case 'US':
        return 0;
      default:
        return 1;
    }
  }, []);

  const getIs12HoursClockFromNotation = useCallback(
    (notation?: DataFormatNotationType): boolean => notation === 'US',
    []
  );

  const getFormattedNumber = useCallback(
    (value: ValueToFormat, numberFormatIntl: IntlShape, options?: ValueToFormatOptions): string => {
      if (typeof value !== 'number') {
        return value?.toString() ?? '';
      }
      return convertNumberString(value, numberFormatIntl, languageIntl, numberFormatNotation, options);
    },
    [languageIntl, numberFormatNotation]
  );

  const getFormattedDate = useCallback(
    (
      value: ValueToFormat,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: ValueToFormatOptions
    ): string => {
      if (!(value instanceof Date)) {
        return value?.toString() ?? '';
      }

      if (options?.targetFormat === 'datetime') {
        return convertDateToDateTimeString(value, dateFormatIntl, timeFormatIntl, languageIntl, options);
      }

      if (options?.targetFormat === 'time') {
        return convertDateToTimeString(value, timeFormatIntl, options);
      }

      if (options?.targetFormat === 'weekday-long') {
        return convertDateToWeekdayLongString(value, dateFormatIntl, languageIntl, options);
      }

      if (options?.targetFormat === 'weekday-short') {
        return convertDateToWeekdayShortString(value, dateFormatIntl, languageIntl, options);
      }

      if (options?.targetFormat === 'month-long') {
        return convertDateToMonthLongString(value, dateFormatIntl, languageIntl, options);
      }

      if (options?.targetFormat === 'month-short') {
        return convertDateToMonthShortString(value, dateFormatIntl, languageIntl, options);
      }

      if (options?.targetFormat === 'date' || !options?.targetFormat) {
        return convertDateToDateString(value, dateFormatIntl, languageIntl, options);
      }

      return value?.toString() ?? '';
    },
    [languageIntl]
  );

  const getFormattedDateFromMoment = useCallback(
    (
      value: ValueToFormat,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: ValueToFormatOptions
    ): string => {
      if (!moment.isMoment(value)) {
        return value?.toString() ?? '';
      }

      return getFormattedDate(moment(value).toDate(), dateFormatIntl, timeFormatIntl, options);
    },
    [getFormattedDate]
  );

  const getFormattedDateFromDayjs = useCallback(
    (
      value: ValueToFormat,
      dateFormatIntl: IntlShape,
      timeFormatIntl: IntlShape,
      options?: ValueToFormatOptions
    ): string => {
      if (!dayjs.isDayjs(value)) {
        return value?.toString() ?? '';
      }

      return getFormattedDate(dayjs(value).toDate(), dateFormatIntl, timeFormatIntl, options);
    },
    [getFormattedDate]
  );

  const getFormattedValueUsingCommonOptions = useCallback(
    (value: ValueToFormat, options?: ValueToFormatOptions): string => {
      const commonOptions = options as CommonFormatOptions;
      let result = value?.toString() ?? '';

      if (commonOptions?.prefix) {
        result = commonOptions?.prefix + result;
      }

      if (commonOptions?.suffix) {
        result += commonOptions?.suffix;
      }

      return result;
    },
    []
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
  };
};
