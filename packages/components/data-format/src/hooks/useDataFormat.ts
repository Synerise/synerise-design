import { isDayjs } from 'dayjs';
import moment, { type Moment } from 'moment';
import { useCallback, useMemo } from 'react';

import { DATE_CONSTANTS_TARGET_FORMATS } from '../constants';
import {
  type Delimiter,
  type OverloadFormatMultipleValues,
  type OverloadFormatValue,
  type OverloadGetConstants,
} from '../types';
import { getConstantDatesAndFormattingOptions } from '../utils';
import { useDataFormatConfig } from './useDataFormatConfig';
import { useDataFormatIntls } from './useDataFormatIntls';
import { useDataFormatUtils } from './useDataFormatUtils';

export type UseDataFormatProps = {
  firstDayOfWeek: number;
  isSundayFirstWeekDay: boolean;
  is12HoursClock: boolean;
  formatValue: OverloadFormatValue;
  formatMultipleValues: OverloadFormatMultipleValues;
  getConstants: OverloadGetConstants;
  thousandDelimiter: Delimiter;
  decimalDelimiter: Delimiter;
};

export const useDataFormat = (): UseDataFormatProps => {
  const { numberFormatIntl, timeFormatIntl, dateFormatIntl } =
    useDataFormatIntls();
  const { startWeekDayNotation, timeFormatNotation, numberFormatNotation } =
    useDataFormatConfig();
  const {
    getFirstDayOfWeekFromNotation,
    getIs12HoursClockFromNotation,
    getFormattedNumber,
    getFormattedDate,
    getFormattedDateFromMoment,
    getFormattedDateFromDayjs,
    getFormattedValueUsingCommonOptions,
    getThousandDelimiterFromNotation,
    getDecimalDelimiterFromNotation,
  } = useDataFormatUtils();

  const firstDayOfWeek = useMemo(
    () => getFirstDayOfWeekFromNotation(startWeekDayNotation),
    [startWeekDayNotation, getFirstDayOfWeekFromNotation],
  );

  const isSundayFirstWeekDay = useMemo(
    () => firstDayOfWeek === 0,
    [firstDayOfWeek],
  );

  const is12HoursClock = useMemo(
    () => getIs12HoursClockFromNotation(timeFormatNotation),
    [timeFormatNotation, getIs12HoursClockFromNotation],
  );

  const formatValue = useCallback<OverloadFormatValue>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, options?: any) => {
      let result = '';

      if (value instanceof moment) {
        result = getFormattedDateFromMoment(
          value as Moment,
          dateFormatIntl,
          timeFormatIntl,
          options,
        );
      }

      if (isDayjs(value)) {
        result = getFormattedDateFromDayjs(
          value,
          dateFormatIntl,
          timeFormatIntl,
          options,
        );
      }

      if (value instanceof Date) {
        result = getFormattedDate(
          value,
          dateFormatIntl,
          timeFormatIntl,
          options,
        );
      }

      if (typeof value === 'number') {
        result = getFormattedNumber(value, numberFormatIntl, options);
      }

      if (typeof value === 'string') {
        result = value;
      }

      return getFormattedValueUsingCommonOptions(result, options);
    },
    [
      numberFormatIntl,
      dateFormatIntl,
      timeFormatIntl,
      getFormattedDate,
      getFormattedDateFromMoment,
      getFormattedNumber,
      getFormattedDateFromDayjs,
      getFormattedValueUsingCommonOptions,
    ],
  );

  const formatMultipleValues = useCallback<OverloadFormatMultipleValues>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (values: any[], options?: any) => {
      return values.map((value) => formatValue(value, options));
    },
    [formatValue],
  );

  const getConstants = useCallback<OverloadGetConstants>(
    (targetFormat, options, customStartDate, customEndDate, interval) => {
      if (DATE_CONSTANTS_TARGET_FORMATS.includes(targetFormat)) {
        const { constantDates, defaultOptions } =
          getConstantDatesAndFormattingOptions(
            targetFormat,
            isSundayFirstWeekDay,
            customStartDate,
            customEndDate,
            interval,
          );
        return formatMultipleValues(constantDates, {
          ...defaultOptions,
          ...options,
        });
      }
      return undefined;
    },
    [formatMultipleValues, isSundayFirstWeekDay],
  );

  const thousandDelimiter: Delimiter = useMemo(
    () => getThousandDelimiterFromNotation(numberFormatNotation),
    [numberFormatNotation, getThousandDelimiterFromNotation],
  );

  const decimalDelimiter: Delimiter = useMemo(
    () => getDecimalDelimiterFromNotation(numberFormatNotation),
    [numberFormatNotation, getDecimalDelimiterFromNotation],
  );

  return {
    firstDayOfWeek,
    isSundayFirstWeekDay,
    is12HoursClock,
    formatValue,
    formatMultipleValues,
    getConstants,
    thousandDelimiter,
    decimalDelimiter,
  };
};
