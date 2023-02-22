import { useCallback, useMemo } from 'react';
import { isDayjs } from 'dayjs';
import { isMoment } from 'moment';

import { ValueToFormat, ValueToFormatOptions } from '../types';
import { useDataFormatConfig } from './useDataFormatConfig';
import { useDataFormatUtils } from './useDataFormatUtils';
import { useDataFormatIntls } from './useDataFormatIntls';

export const useDataFormat = (): {
  firstDayOfWeek: number;
  is12HoursClock: boolean;
  formattedValue: (value: ValueToFormat, options?: ValueToFormatOptions) => string;
} => {
  const { numberFormatIntl, timeFormatIntl, dateFormatIntl } = useDataFormatIntls();
  const { startWeekDayNotation, timeFormatNotation } = useDataFormatConfig();
  const {
    getFirstDayOfWeekFromNotation,
    getIs12HoursClockFromNotation,
    getFormattedNumber,
    getFormattedDate,
    getFormattedDateFromMoment,
    getFormattedDateFromDayjs,
    getFormattedValueUsingCommonOptions,
  } = useDataFormatUtils();

  const firstDayOfWeek = useMemo(
    () => getFirstDayOfWeekFromNotation(startWeekDayNotation),
    [startWeekDayNotation, getFirstDayOfWeekFromNotation]
  );

  const is12HoursClock = useMemo(
    () => getIs12HoursClockFromNotation(timeFormatNotation),
    [timeFormatNotation, getIs12HoursClockFromNotation]
  );

  const formattedValue = useCallback(
    (value: ValueToFormat, options?: ValueToFormatOptions): string => {
      let result = value;

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

  return { firstDayOfWeek, is12HoursClock, formattedValue };
};
