import * as React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import { renderHook } from '@testing-library/react-hooks';

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

    // For date options are compatible with CommonFormatOptions & https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    // new Date('2023-06-25T15:40:00') > 6/25/2023
    expect(result.current.formattedValue(DATE_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);

    // moment('2023-06-25T15:40:00') > 3:40 PM
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);

    // For datetime options are compatible with CommonFormatOptions & DateTimeToFormatOptions
    // dayjs('2023-06-25T15:40:00') > 6/25/2023, 3:40 PM
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    // new Date('2023-06-25T15:40:00') > June 25, 2023, 3:40:00 PM
    expect(
      result.current.formattedValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`);

    // For numbers options are compatible with CommonFormatOptions & https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    // 1234567 > 1,234,567
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_INT_NUMBER);

    // 1234567 > 1,234,567.00
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2 })).toBe(
      `${US_FORMATTED_INT_NUMBER}.00`
    );

    //1234567.89 > 1,234,567.9
    expect(result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT, { maximumFractionDigits: 1 })).toBe(
      `${US_FORMATTED_FLOAT_NUMBER.substring(0, US_FORMATTED_FLOAT_NUMBER.length - 2)}9`
    );

    // 1234567.89 > Salary: $1,234,567.89 per month
    expect(
      result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT, {
        style: 'currency',
        currency: 'USD',
        prefix: 'Salary: ',
        suffix: ' per month',
      })
    ).toBe(`Salary: $${US_FORMATTED_FLOAT_NUMBER} per month`);
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

    expect(result.current.formattedValue(DATE_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(MOMENT_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(DAYJS_TO_FORMAT)).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'date' })).toBe(US_FORMATTED_DATE);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'time' })).toBe(US_FORMATTED_TIME);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_INT_NUMBER);
    expect(result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT)).toBe(US_FORMATTED_FLOAT_NUMBER);
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

    expect(result.current.formattedValue(DATE_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(MOMENT_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(DAYJS_TO_FORMAT)).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'date' })).toBe(EU_FORMATTED_DATE);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'time' })).toBe(EU_FORMATTED_TIME);
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
    expect(result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_FLOAT_NUMBER);
  });

  it('Should return correct EU notation formatted values when there is no dataFormatConfig object for DSProvider', () => {
    // ARRANGE
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => <DSProvider>{children}</DSProvider>,
    });

    // ASSERT
    expect(result.current.firstDayOfWeek).toBe(EU_FIRST_DAY_OF_WEEK);

    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );
    expect(result.current.formattedValue(MOMENT_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );
    expect(result.current.formattedValue(DAYJS_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
    expect(result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_FLOAT_NUMBER);
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

    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'datetime' })).toBe(
      `${US_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`
    );

    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT)).toBe(EU_FORMATTED_INT_NUMBER);
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
      result.current.formattedValue(DATE_TO_FORMAT, {
        targetFormat: 'datetime',
        dateOptions: { month: 'long' },
        timeOptions: { second: 'numeric' },
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`);

    expect(
      result.current.formattedValue(DATE_TO_FORMAT, {
        targetFormat: 'date',
        month: 'long',
      })
    ).toBe(`${US_FORMATTED_LONG_DATE}`);

    expect(
      result.current.formattedValue(DATE_TO_FORMAT, {
        targetFormat: 'time',
        second: 'numeric',
      })
    ).toBe(`${US_FORMATTED_TIME_WITH_SECONDS}`);

    expect(
      result.current.formattedValue(FLOAT_NUMBER_TO_FORMAT, {
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
    expect(result.current.formattedValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2K`);
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2M`);
    expect(result.current.formattedValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2B`);
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
    expect(result.current.formattedValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2K`);
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2M`);
    expect(result.current.formattedValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2B`);
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
    expect(result.current.formattedValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2 tys.`);
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2 mln`);
    expect(result.current.formattedValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1,2 mld`);
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
    expect(result.current.formattedValue(SHORT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2 tys.`);
    expect(result.current.formattedValue(INT_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2 mln`);
    expect(result.current.formattedValue(LONG_NUMBER_TO_FORMAT, { notation: 'compact' })).toBe(`1.2 mld`);
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
      result.current.formattedValue(1, {
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
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('Sunday');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('Sun');

    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('June');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('Jun');
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
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('Sunday');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('Sun');

    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('June');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('Jun');
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
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-long' })).toBe('niedziela');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'weekday-short' })).toBe('niedz.');

    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-long' })).toBe('czerwiec');
    expect(result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'month-short' })).toBe('cze');
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
      result.current.formattedValue(DATE_TO_FORMAT, { targetFormat: 'datetime', dateOptions: { month: 'long' } })
    ).toBe(`${EU_FORMATTED_LONG_DATE}, ${EU_FORMATTED_TIME}`);
  });
});
