import { useCallback, useMemo } from 'react';
import { isDayjs } from 'dayjs';
import { isMoment } from 'moment';

import { OverloadFormatValue, Delimiter } from '../types';
import { useDataFormatConfig } from './useDataFormatConfig';
import { useDataFormatUtils } from './useDataFormatUtils';
import { useDataFormatIntls } from './useDataFormatIntls';

export const useDataFormat = (): {
  firstDayOfWeek: number;
  is12HoursClock: boolean;
  formatValue: OverloadFormatValue;
  thousandDelimiter: Delimiter;
  decimalDelimiter: Delimiter;
} => {
  const { numberFormatIntl, timeFormatIntl, dateFormatIntl } = useDataFormatIntls();
  const { startWeekDayNotation, timeFormatNotation, numberFormatNotation } = useDataFormatConfig();
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
    [startWeekDayNotation, getFirstDayOfWeekFromNotation]
  );

  const is12HoursClock = useMemo(
    () => getIs12HoursClockFromNotation(timeFormatNotation),
    [timeFormatNotation, getIs12HoursClockFromNotation]
  );

  const formatValue = useCallback<OverloadFormatValue>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, options?: any) => {
      let result = '';

      if (isMoment(value)) {
        result = getFormattedDateFromMoment(value, dateFormatIntl, timeFormatIntl, options);
      }

      if (isDayjs(value)) {
        result = getFormattedDateFromDayjs(value, dateFormatIntl, timeFormatIntl, options);
      }

      if (value instanceof Date) {
        result = getFormattedDate(value, dateFormatIntl, timeFormatIntl, options);
      }

      if (typeof value === 'number') {
        result = getFormattedNumber(value, numberFormatIntl, options);
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
    ]
  );

  const thousandDelimiter: Delimiter = useMemo(
    () => getThousandDelimiterFromNotation(numberFormatNotation),
    [numberFormatNotation, getThousandDelimiterFromNotation]
  );

  const decimalDelimiter: Delimiter = useMemo(
    () => getDecimalDelimiterFromNotation(numberFormatNotation),
    [numberFormatNotation, getDecimalDelimiterFromNotation]
  );

  return { firstDayOfWeek, is12HoursClock, formatValue, thousandDelimiter, decimalDelimiter };
};
