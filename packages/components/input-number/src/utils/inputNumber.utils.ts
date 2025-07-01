import { type ReactText } from 'react';

import {
  type Delimiter,
  type NumberToFormatOptions,
} from '@synerise/ds-data-format';

import {
  MAXIMUM_FRACTION_DIGITS,
  MAXIMUM_NUMBER_DIGITS,
  NUMBER_DELIMITER,
} from '../constants/inputNumber.constants';

// input case 1: not formatted number string (on input change)
// input case 2: not formatted number (on blur)
// output: formatted number string with decimal char
export const formatNumber = (
  /** Important: value can be null when input string is '' */
  value: string | number | undefined | null,
  formatValue: (value: number, options: NumberToFormatOptions) => string,
  notationThousandDelimiter: Delimiter,
  notationDecimalDelimiter: Delimiter,
  valueFormatOptions?: NumberToFormatOptions,
): string => {
  if (value === undefined || value === '' || value === null) {
    return '';
  }

  if (value === '-') {
    return '-';
  }

  const formatOptions = {
    maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
    ...valueFormatOptions,
  };

  if (typeof value === 'number') {
    return formatValue(value, formatOptions);
  }

  let result = '';
  const lastChar = value?.slice(-1);
  const numberResult = parseFloat(value);
  const notationDecimalChar =
    lastChar === NUMBER_DELIMITER ? notationDecimalDelimiter : '';
  const zerosAtTheEnd = value.match(new RegExp('0+$'))?.[0];
  const zerosWithDecimalDelimiterAtTheEnd = value.match(
    new RegExp(`\\${NUMBER_DELIMITER}0+$`),
  )?.[0];
  const numberDelimiterExists = new RegExp(`\\${NUMBER_DELIMITER}`).test(value);

  if (Number.isNaN(numberResult)) {
    return '';
  }

  result = formatValue(numberResult, formatOptions);
  result = `${result}${notationDecimalChar}`;

  if (zerosWithDecimalDelimiterAtTheEnd) {
    result = `${result}${zerosWithDecimalDelimiterAtTheEnd}`;
  } else if (zerosAtTheEnd && numberDelimiterExists) {
    result = `${result}${zerosAtTheEnd}`;
  }

  return result;
};

// input: formatted number string
// output: not formatted number string with decimal char
export const parseFormattedNumber = (
  value: string | undefined,
  formatValue: (value: number, options: NumberToFormatOptions) => string,
  notationThousandDelimiter: Delimiter,
  notationDecimalDelimiter: Delimiter,
): ReactText => {
  if (value === undefined || value === '') {
    return '';
  }

  let result = value;

  result = result.split(notationThousandDelimiter).join('');

  if (result.length > MAXIMUM_NUMBER_DIGITS) {
    result = result.slice(0, MAXIMUM_NUMBER_DIGITS);
  }

  if (notationDecimalDelimiter !== NUMBER_DELIMITER) {
    result = result.replace(notationDecimalDelimiter, NUMBER_DELIMITER);
  }

  if (
    (result.match(new RegExp(`\\${NUMBER_DELIMITER}`, 'g')) || []).length > 1
  ) {
    const lastDecimalDelimiterIndex = result.lastIndexOf(NUMBER_DELIMITER);
    result = result.slice(0, lastDecimalDelimiterIndex);
  }

  return result;
};
