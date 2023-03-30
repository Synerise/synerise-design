import { ReactText } from 'react';

import { NumberToFormatOptions, Delimiter } from '@synerise/ds-data-format';

import { MAXIMUM_FRACTION_DIGITS, NUMBER_DELIMITER } from '../constants/inputNumber.constants';

// input 1: not formatted number string (on input change)
// input 2: not formatted number (on blur)
// output: formatted number string with decimal char
export const formatNumber = (
  value: string | number | undefined,
  formatValue: (value: number, options: NumberToFormatOptions) => string,
  thousandDelimiter: Delimiter,
  decimalDelimiter: Delimiter,
  valueFormatOptions?: NumberToFormatOptions
): string => {
  if (value === undefined || value === '') return '';

  const formatOptions = { maximumFractionDigits: MAXIMUM_FRACTION_DIGITS, ...valueFormatOptions };

  let notationDecimalChar = '';
  let result = '';

  if (typeof value === 'number') {
    result = formatValue(value, formatOptions);
  } else {
    const lastChar = value?.slice(-1);
    if (lastChar === NUMBER_DELIMITER) {
      notationDecimalChar = decimalDelimiter;
    }

    const numberResult = Number(value);
    if (Number.isNaN(numberResult)) {
      return '';
    }

    result = formatValue(numberResult, formatOptions);
    result = `${result}${notationDecimalChar}`;
  }
  return result;
};

// input: formatted number string
// output: not formatted number string with decimal char
export const parseFormattedNumber = (
  value: string | undefined,
  formatValue: (value: number, options: NumberToFormatOptions) => string,
  thousandDelimiter: Delimiter,
  decimalDelimiter: Delimiter
): ReactText => {
  if (value === undefined || value === '') {
    return '';
  }

  let result = value.split(thousandDelimiter).join('');

  if (decimalDelimiter !== NUMBER_DELIMITER) {
    result = result.replace(decimalDelimiter, NUMBER_DELIMITER);
  }

  if ((result.match(new RegExp(`\\${NUMBER_DELIMITER}`, 'g')) || []).length > 1) {
    const lastDecimalDelimiterIndex = result.lastIndexOf(NUMBER_DELIMITER);
    result = result.slice(0, lastDecimalDelimiterIndex);
  }
  return result;
};
