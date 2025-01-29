import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import { renderHook } from '@testing-library/react';

import { DSProvider } from '@synerise/ds-core';
import { useDataFormat, DataFormatNotationType } from '@synerise/ds-data-format';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const MOMENT_TO_FORMAT = moment(DATE_TO_FORMAT);
const DAYJS_TO_FORMAT = dayjs(DATE_TO_FORMAT);
const SHORT_NUMBER_TO_FORMAT = 1234;
const INT_NUMBER_TO_FORMAT = 1234567;
const LONG_NUMBER_TO_FORMAT = 1234567890;
const FLOAT_NUMBER_TO_FORMAT = 1234567.89;

const US_NOTATION: DataFormatNotationType = 'US';
const US_FIRST_DAY_OF_WEEK = 0;
const US_FORMATTED_DATE = '6/25/2023';
const US_FORMATTED_LONG_DATE = 'June 25, 2023';
const US_FORMATTED_SHORT_DATE = 'Jun 25, 2023';
const US_FORMATTED_TIME = '3:40 PM';
const US_FORMATTED_TIME_WITH_SECONDS = '3:40:00 PM';
const US_FORMATTED_INT_NUMBER = '1,234,567';
const US_FORMATTED_FLOAT_NUMBER = '1,234,567.89';

const EU_NOTATION: DataFormatNotationType = 'EU';
const EU_FIRST_DAY_OF_WEEK = 1;
const EU_FORMATTED_DATE = '25.06.2023';
const EU_FORMATTED_LONG_DATE = '25 June 2023';
const EU_FORMATTED_TIME = '15:40';
const EU_FORMATTED_INT_NUMBER = '1 234 567';
const EU_FORMATTED_FLOAT_NUMBER = '1 234 567,89';

describe('useDataFormat', () => {
  it('Examples', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: US_NOTATION,
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT

    // firstDayOfWeek returns 0 for Sunday or 1 for Monday
    expect(result.current.firstDayOfWeek).toBe(US_FIRST_DAY_OF_WEEK);

    // isSundayFirstWeekDay returns true for Sunday or false for Monday
    expect(result.current.isSundayFirstWeekDay).toBe(true);

    // new Date('2023-06-25T15:40:00') > 6/25/2023
    expect(result.current.formatValue(DATE_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);

    // moment('2023-06-25T15:40:00') > 3:40 PM
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);

    // dayjs('2023-06-25T15:40:00') > 6/25/2023, 3:40 PM
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    // new Date('2023-06-25T15:40:00') > June 25, 2023, 3:40:00 PM
    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`);

    // new Date('2023-06-25T15:40:00') > Jun 25, 2023, 3:40:00 PM
    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        dateOptions: { month: 'short' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`${US_FORMATTED_SHORT_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`);

    // 1234567 > 1,234,567
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_INT_NUMBER);

    // 1234567 > 1,234,567.00
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2 })).toBe(
      `${US_FORMATTED_INT_NUMBER}.00`
    );

    //1234567.89 > 1,234,567.9
    expect(result.current.formatValue(FLOAT_NUMBER_TO_FORMAT, { maximumFractionDigits: 1 })).toBe(
      `${US_FORMATTED_FLOAT_NUMBER.substring(0, US_FORMATTED_FLOAT_NUMBER.length - 2)}9`
    );

    // 1234567.89 > Salary: $1,234,567.89 per month
    expect(
      result.current.formatValue(FLOAT_NUMBER_TO_FORMAT, {
        style: 'currency',
        currency: 'USD',
        prefix: 'Salary: ',
        suffix: ' per month',
      })
    ).toBe(`Salary: $${US_FORMATTED_FLOAT_NUMBER} per month`);

    // 1234567890 > 1.235b
    expect(
      result.current.formatValue(LONG_NUMBER_TO_FORMAT, {
        minimumFractionDigits: 1,
        notation: 'compact',
        namingConvention: 'lowerCase',
      })
    ).toBe(`1.23b`);
  });

  it('Should return correct formatted values with US notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: US_NOTATION,
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.firstDayOfWeek).toBe(US_FIRST_DAY_OF_WEEK);

    expect(result.current.isSundayFirstWeekDay).toBe(true);

    expect(result.current.formatValue('string')).toBe('string');
    expect(result.current.formatValue(DATE_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(MOMENT_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(DAYJS_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_INT_NUMBER);
    expect(result.current.formatValue(FLOAT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_FLOAT_NUMBER);
  });

  it('Should return empty string when value is null or undefined', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: US_NOTATION,
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(null)).toBe('');
    expect(result.current.formatValue(undefined)).toBe('');
  });

  it('Should return correct formatted values with EU notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: EU_NOTATION,
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.firstDayOfWeek).toBe(EU_FIRST_DAY_OF_WEEK);

    expect(result.current.isSundayFirstWeekDay).toBe(false);

    expect(result.current.formatValue(DATE_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(MOMENT_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(DAYJS_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
    expect(result.current.formatValue(FLOAT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_FLOAT_NUMBER);
  });

  it('Should return correct EU notation formatted values when there is no dataFormatConfig object for DSProvider', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => <DSProvider>{children}</DSProvider>,
    });

    // ASSERT
    expect(result.current.firstDayOfWeek).toBe(EU_FIRST_DAY_OF_WEEK);

    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );
    expect(result.current.formatValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );
    expect(result.current.formatValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
    expect(result.current.formatValue(FLOAT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_FLOAT_NUMBER);
  });

  it('Should return correct formatted values combined US with EU notations', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: US_NOTATION,
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.firstDayOfWeek).toBe(US_FIRST_DAY_OF_WEEK);

    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
  });

  it('Should return correct formatted values with react-intl options', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'date',
        month: 'long',
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'time',
        second: 'numeric',
      })
    ).toBe(`${US_FORMATTED_TIME_WITH_SECONDS}`);

    expect(
      result.current.formatValue(FLOAT_NUMBER_TO_FORMAT, {
        style: 'currency',
        currency: 'USD',
        prefix: 'Salary: ',
        suffix: ' per month',
      })
    ).toBe(`Salary: $${US_FORMATTED_FLOAT_NUMBER} per month`);
  });

  it('Should return correct compact values (number format base on EU notation, abbreviation base on user language intl)', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23K`);
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23M`);
    expect(result.current.formatValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23B`);
    expect(result.current.formatValue(0, { notation: 'compact', minimumFractionDigits: 1 })).toBe(`0,0`);
    expect(
      result.current.formatValue(LONG_NUMBER_TO_FORMAT, {
        minimumFractionDigits: 1,
        notation: 'compact',
      })
    ).toBe(`1,23B`);

    expect(
      result.current.formatValue(13000, {
        minimumFractionDigits: 1,
        notation: 'compact',
      })
    ).toBe(`13,0K`);

    expect(result.current.formatValue(1, { targetFormat: 'compact-larger-number' })).toBe(`1`);
    expect(result.current.formatValue(13, { targetFormat: 'compact-larger-number' })).toBe(`13`);
    expect(result.current.formatValue(1300, { targetFormat: 'compact-larger-number' })).toBe(`1,3K`);
    expect(result.current.formatValue(13000, { targetFormat: 'compact-larger-number' })).toBe(`13K`);

    expect(result.current.formatValue(1, { targetFormat: 'compact-decimal-larger-number' })).toBe(`1`);
    expect(result.current.formatValue(13, { targetFormat: 'compact-decimal-larger-number' })).toBe(`13`);
    expect(result.current.formatValue(1300, { targetFormat: 'compact-decimal-larger-number' })).toBe(`1,3K`);
    expect(result.current.formatValue(13000, { targetFormat: 'compact-decimal-larger-number' })).toBe(`13,0K`);
  });

  it('Should return correct compact values (number format base on US notation, abbreviation base on user language intl)', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23K`);
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23M`);
    expect(result.current.formatValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23B`);
    expect(result.current.formatValue(0, { notation: 'compact', minimumFractionDigits: 1 })).toBe(`0.0`);
    expect(
      result.current.formatValue(LONG_NUMBER_TO_FORMAT, {
        minimumFractionDigits: 1,
        notation: 'compact',
      })
    ).toBe(`1.23B`);

    expect(
      result.current.formatValue(13000, {
        minimumFractionDigits: 1,
        notation: 'compact',
      })
    ).toBe(`13.0K`);
  });

  it('Should return correct compact values (number format base on EU notation, abbreviation base on PL language)', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          locale="pl"
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23 tys.`);
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23 mln`);
    expect(result.current.formatValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,23 mld`);
  });

  it('Should return correct compact values (number format base on US notation, abbreviation base on PL language)', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          locale="pl"
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23 tys.`);
    expect(result.current.formatValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23 mln`);
    expect(result.current.formatValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.23 mld`);
  });

  it('Should return correct formatted plural values', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      result.current.formatValue(1, {
        pluralOptions: { type: 'ordinal' },
      })
    ).toBe('one');
  });

  it('Should return correct formatted weekday and month values with EN locale and US notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
          locale="en"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('Sunday');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('Sun');

    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('June');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('Jun');
  });

  it('Should return correct formatted weekday and month values with EN locale and EU notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
          locale="en"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('Sunday');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('Sun');

    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('June');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('Jun');
  });

  it('Should return correct formatted weekday and month values with PL locale and EU notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('niedziela');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('niedz.');

    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('czerwiec');
    expect(result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('cze');
  });

  it('Should return correct formatted datetime EN locale and US notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
          locale="en"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'datetime', dateOptions: { month: 'long' } })
    ).toBe(`${EU_FORMATTED_LONG_DATE}, ${EU_FORMATTED_TIME}`);
  });

  it('Should return correct formatted values with naming convention and EU notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'upperFirst' })
    ).toBe(`Cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'upperCase' })
    ).toBe(`CZE`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'lowerCase' })
    ).toBe(`cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'lowerFirst' })
    ).toBe(`cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        namingConvention: 'lowerCase',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`25 czerwca 2023, 15:40:00`);

    expect(
      result.current.formatValue(LONG_NUMBER_TO_FORMAT, {
        minimumFractionDigits: 1,
        notation: 'compact',
        namingConvention: 'lowerCase',
      })
    ).toBe(`1,23 mld`);

    expect(
      result.current.formatValue(13000, {
        minimumFractionDigits: 1,
        notation: 'compact',
        namingConvention: 'lowerCase',
      })
    ).toBe(`13,0 tys.`);
  });

  it('Should return correct formatted values with naming convention and US notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'upperFirst' })
    ).toBe(`Cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'upperCase' })
    ).toBe(`CZE`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'lowerCase' })
    ).toBe(`cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, { targetFormat: 'month-short', namingConvention: 'lowerFirst' })
    ).toBe(`cze`);

    expect(
      result.current.formatValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        namingConvention: 'upperFirst',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`Czerwca 25, 2023, 3:40:00 PM`);

    expect(
      result.current.formatValue(LONG_NUMBER_TO_FORMAT, {
        minimumFractionDigits: 1,
        notation: 'compact',
        namingConvention: 'lowerCase',
      })
    ).toBe(`1.23 mld`);

    expect(
      result.current.formatValue(13000, {
        minimumFractionDigits: 1,
        notation: 'compact',
        namingConvention: 'lowerCase',
      })
    ).toBe(`13.0 tys.`);
  });

  it('Should return correct thousandDelimiter and decimalDelimiter for EU notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.thousandDelimiter).toBe(` `);
    expect(result.current.decimalDelimiter).toBe(`,`);
  });

  it('Should return correct thousandDelimiter and decimalDelimiter for US notation', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.thousandDelimiter).toBe(`,`);
    expect(result.current.decimalDelimiter).toBe(`.`);
  });

  it('Should return correct getConstants for PL language', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
          locale="pl"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(JSON.stringify(result.current.getConstants('months-long'))).toBe(
      JSON.stringify([
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
      ])
    );
    expect(JSON.stringify(result.current.getConstants('months-short'))).toBe(
      JSON.stringify(['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'])
    );
    expect(JSON.stringify(result.current.getConstants('weekdays-long'))).toBe(
      JSON.stringify(['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'])
    );
    expect(JSON.stringify(result.current.getConstants('weekdays-short'))).toBe(
      JSON.stringify(['Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.', 'Niedz.'])
    );
  });

  it('Should return correct getConstants for US notation and EN language', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
            startWeekDayNotation: US_NOTATION,
          }}
          locale="en"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(JSON.stringify(result.current.getConstants('months-long'))).toBe(
      JSON.stringify([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ])
    );
    expect(JSON.stringify(result.current.getConstants('months-short'))).toBe(
      JSON.stringify(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
    );
    expect(JSON.stringify(result.current.getConstants('weekdays-long'))).toBe(
      JSON.stringify(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    );
    expect(JSON.stringify(result.current.getConstants('weekdays-short'))).toBe(
      JSON.stringify(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    );
  });

  it('Should return correct getConstants with customStartData, customEndData and  interval', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: US_NOTATION,
            timeFormatNotation: US_NOTATION,
            numberFormatNotation: US_NOTATION,
            startWeekDayNotation: US_NOTATION,
          }}
          locale="en"
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(
      JSON.stringify(
        result.current.getConstants(
          'months-long',
          { namingConvention: 'lowerCase' },
          new Date(2022, 10),
          new Date(2023, 2),
          'month'
        )
      )
    ).toBe(JSON.stringify(['november', 'december', 'january', 'february', 'march']));

    expect(
      JSON.stringify(
        result.current.getConstants('weekdays-long', undefined, new Date(2022, 12, 28), new Date(2023, 1, 2), 'day')
      )
    ).toBe(JSON.stringify(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']));
  });

  it('Should return correct values for formatMultipleValues function', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            dateFormatNotation: EU_NOTATION,
            timeFormatNotation: EU_NOTATION,
            numberFormatNotation: EU_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(JSON.stringify(result.current.formatMultipleValues([INT_NUMBER_TO_FORMAT, INT_NUMBER_TO_FORMAT]))).toBe(
      JSON.stringify([EU_FORMATTED_INT_NUMBER, EU_FORMATTED_INT_NUMBER])
    );
    expect(JSON.stringify(result.current.formatMultipleValues([DATE_TO_FORMAT, DATE_TO_FORMAT]))).toBe(
      JSON.stringify([EU_FORMATTED_DATE, EU_FORMATTED_DATE])
    );
    expect(JSON.stringify(result.current.formatMultipleValues([]))).toBe(JSON.stringify([]));
    expect(JSON.stringify(result.current.formatMultipleValues([US_NOTATION, EU_NOTATION]))).toBe(
      JSON.stringify([US_NOTATION, EU_NOTATION])
    );
  });

  it('Should return correct number values for default number options', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            numberFormatNotation: US_NOTATION,
          }}
        >
          {children}
        </DSProvider>
      ),
    });

    // ASSERT
    expect(result.current.formatValue(9999.1234567)).toBe('9,999.12');
    expect(result.current.formatValue(9999.1234567, { maximumFractionDigits: 3 })).toBe('9,999.123');
  });
});
