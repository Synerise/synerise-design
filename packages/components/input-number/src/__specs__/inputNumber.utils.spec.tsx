import React from 'react';
import { renderHook } from '@testing-library/react';
import { type DataFormatNotationType, useDataFormat } from '@synerise/ds-data-format';
import { DSProvider } from '@synerise/ds-core';
import { formatNumber, parseFormattedNumber } from '../utils/inputNumber.utils';

const parserTestCases = [
  {
    euInputValue: '1',
    usInputValue: '1',
    expectedResult: '1',
  },
  {
    euInputValue: '1234',
    usInputValue: '1234',
    expectedResult: '1234',
  },
  {
    euInputValue: '1 2345',
    usInputValue: '1,2345',
    expectedResult: '12345',
  },
  {
    euInputValue: '1 234 567',
    usInputValue: '1,234,567',
    expectedResult: '1234567',
  },
  {
    euInputValue: '1 234 567,',
    usInputValue: '1,234,567.',
    expectedResult: '1234567.',
  },
  {
    euInputValue: '1 234 567,1',
    usInputValue: '1,234,567.1',
    expectedResult: '1234567.1',
  },
  {
    euInputValue: '1 234 567,1234567',
    usInputValue: '1,234,567.1234567',
    expectedResult: '1234567.1234567',
  },
  {
    euInputValue: '1 234 567,0',
    usInputValue: '1,234,567.0',
    expectedResult: '1234567.0',
  },
  {
    euInputValue: '1 234 567,00',
    usInputValue: '1,234,567.00',
    expectedResult: '1234567.00',
  },
  {
    euInputValue: '1 234 567,010',
    usInputValue: '1,234,567.010',
    expectedResult: '1234567.010',
  },
  {
    euInputValue: '999 999 999 999 9999',
    usInputValue: '999,999,999,999,9999',
    expectedResult: '999999999999999',
  },
  {
    euInputValue: '999 999 999 999 999 999 999',
    usInputValue: '999,999,999,999,999,999,999',
    expectedResult: '999999999999999',
  },
  {
    euInputValue: '9.99999999999999',
    usInputValue: '9.99999999999999',
    expectedResult: '9.9999999999999',
  },
  {
    euInputValue: '9.9999999999999999999',
    usInputValue: '9.9999999999999999999',
    expectedResult: '9.9999999999999',
  },
];

const formatterTestCases = [
  {
    inputValue: '1',
    euExpectedResult: '1',
    usExpectedResult: '1',
  },
  {
    inputValue: '1234',
    euExpectedResult: '1 234',
    usExpectedResult: '1,234',
  },
  {
    inputValue: '12345',
    euExpectedResult: '12 345',
    usExpectedResult: '12,345',
  },
  {
    inputValue: '1234567',
    euExpectedResult: '1 234 567',
    usExpectedResult: '1,234,567',
  },
  {
    inputValue: '1234567.',
    euExpectedResult: '1 234 567,',
    usExpectedResult: '1,234,567.',
  },
  {
    inputValue: '1234567.1',
    euExpectedResult: '1 234 567,1',
    usExpectedResult: '1,234,567.1',
  },
  {
    inputValue: '1234567.1234567',
    euExpectedResult: '1 234 567,1234567',
    usExpectedResult: '1,234,567.1234567',
  },
  {
    inputValue: '1234567.0',
    euExpectedResult: '1 234 567.0',
    usExpectedResult: '1,234,567.0',
  },
  {
    inputValue: '1234567.00',
    euExpectedResult: '1 234 567.00',
    usExpectedResult: '1,234,567.00',
  },
  {
    inputValue: '1234567.010',
    euExpectedResult: '1 234 567,010',
    usExpectedResult: '1,234,567.010',
  },
  {
    inputValue: '999999999999999',
    euExpectedResult: '999 999 999 999 999',
    usExpectedResult: '999,999,999,999,999',
  },
  {
    inputValue: '9.999999999999',
    euExpectedResult: '9,999999999999',
    usExpectedResult: '9.999999999999',
  },
  {
    inputValue: '-',
    euExpectedResult: '-',
    usExpectedResult: '-',
  },
  {
    inputValue: '',
    euExpectedResult: '',
    usExpectedResult: '',
  },
  {
    inputValue: null,
    euExpectedResult: '',
    usExpectedResult: '',
  },
  {
    inputValue: undefined,
    euExpectedResult: '',
    usExpectedResult: '',
  },
];

describe('InputNumber utils', () => {
  const setup = ({ notation = 'EU' }: { notation: DataFormatNotationType }) => {
    const { result } = renderHook(() => useDataFormat(), {
      wrapper: ({ children }) => (
        <DSProvider
          dataFormatConfig={{
            startWeekDayNotation: notation,
            dateFormatNotation: notation,
            timeFormatNotation: notation,
            numberFormatNotation: notation,
          }}
        >
          {children}
        </DSProvider>
      ),
    });
    return { ...result.current };
  };

  it('parser should pass all parserTestCases', () => {
    const {
      formatValue: euFormatValue,
      thousandDelimiter: euThousandDelimiter,
      decimalDelimiter: euDecimalDelimiter,
    } = setup({ notation: 'EU' });
    const {
      formatValue: usFormatValue,
      thousandDelimiter: usThousandDelimiter,
      decimalDelimiter: usDecimalDelimiter,
    } = setup({ notation: 'US' });

    for (const testCase of parserTestCases) {
      expect(parseFormattedNumber(testCase.euInputValue, euFormatValue, euThousandDelimiter, euDecimalDelimiter)).toBe(
        testCase.expectedResult
      );
      expect(parseFormattedNumber(testCase.usInputValue, usFormatValue, usThousandDelimiter, usDecimalDelimiter)).toBe(
        testCase.expectedResult
      );
    }
  });

  it('formatter should pass all formatterTestCases', () => {
    const {
      formatValue: euFormatValue,
      thousandDelimiter: euThousandDelimiter,
      decimalDelimiter: euDecimalDelimiter,
    } = setup({ notation: 'EU' });
    const {
      formatValue: usFormatValue,
      thousandDelimiter: usThousandDelimiter,
      decimalDelimiter: usDecimalDelimiter,
    } = setup({ notation: 'US' });

    for (const testCase of formatterTestCases) {
      expect(formatNumber(testCase.inputValue, euFormatValue, euThousandDelimiter, euDecimalDelimiter)).toBe(
        testCase.euExpectedResult
      );
      expect(formatNumber(testCase.inputValue, usFormatValue, usThousandDelimiter, usDecimalDelimiter)).toBe(
        testCase.usExpectedResult
      );
    }
  });
});
