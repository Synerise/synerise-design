// @ts-ignore
import numeral from 'numeral';
import { range } from 'lodash';
import { IntlShape } from 'react-intl';
import { CurrencyType, FormattingDataFormat, FormattingValue } from '../FomartPicker.types';
import { ValueFormatterProps } from './valueFormatter.types';

const CONTAINS_LETTERS = /[^0-9,.]/;
const DIGITS = /[0-9,.]+/;
const ptConfig = {
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal(): string {
    return 'º';
  },
  currency: {
    symbol: '€',
  },
};
if (numeral.locales.pl === undefined) {
  numeral.register('locale', 'pl', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: ' tys',
      million: ' mln',
      billion: ' mld',
      trillion: ' bln',
    },
    ordinal(number: number) {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: '$',
    },
  });
}
if (numeral.locales.es === undefined) {
  numeral.register('locale', 'es', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'k',
      million: 'mm',
      billion: 'b',
      trillion: 't',
    },
    ordinal(number: number) {
      const b = number % 10;
      const result = ['mo', 'er', 'do', 'er', 'to', 'to', 'to', 'mo', 'mo', 'no'];
      return result[b];
    },
    currency: {
      symbol: '$',
    },
  });
}
if (numeral.locales.fr === undefined) {
  numeral.register('locale', 'fr', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'k',
      million: 'mm',
      billion: 'b',
      trillion: 't',
    },
    ordinal(number: number) {
      return number === 1 ? 'er' : 'e';
    },
    currency: {
      symbol: '$',
    },
  });
}
if (numeral.locales.pt === undefined) {
  numeral.register('locale', 'pt', ptConfig);
}
if (numeral.locales['pt-pt'] === undefined) {
  numeral.register('locale', 'pt-pt', ptConfig);
}
if (numeral.locales['en-gb'] === undefined) {
  numeral.register('locale', 'en-gb', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't',
    },
    ordinal(number: number) {
      const b = number % 10;
      if (Math.floor((number % 100) / 10) === 1) {
        return 'th';
      }
      if (b === 1) return 'st';
      if (b === 2) return 'nd';
      if (b === 3) return 'rd';
      return 'th';
    },
    currency: {
      symbol: '£',
    },
  });
}
if (numeral.locales['en-us'] === undefined) {
  numeral.register('locale', 'en-us', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't',
    },
    ordinal(number: number) {
      const b = number % 10;
      if (Math.floor((number % 100) / 10) === 1) {
        return 'th';
      }
      if (b === 1) return 'st';
      if (b === 2) return 'nd';
      if (b === 3) return 'rd';
      return 'th';
    },
    currency: {
      symbol: '$',
    },
  });
}
export const appendZeros = (fixedLength: number): string => {
  if (!fixedLength) {
    return '';
  }
  return `.${range(0, fixedLength, 0).join('')}`;
};
export const chooseSuffix = (compactNumbers: boolean): string => {
  return compactNumbers ? 'a' : '';
};
export const choosePrefix = (useSeparator: boolean): string => {
  return useSeparator ? '0,0' : '0';
};
export const getFormattingFormula = (formatting: FormattingValue): string => {
  return `${choosePrefix(formatting.useSeparator)}${appendZeros(formatting.fixedLength)}${chooseSuffix(
    formatting.compactNumbers
  )}`;
};
export const appendSign = (
  input: string,
  intl: IntlShape,
  format: FormattingDataFormat,
  currency: CurrencyType
): string => {
  switch (format) {
    case 'cash': {
      if (!currency) {
        return input;
      }
      const currencyFormat = intl.formatNumber(1, { style: 'currency', currencyDisplay: 'symbol', currency });
      return CONTAINS_LETTERS.test(input)
        ? currencyFormat.replace(DIGITS, `${input} `)
        : currencyFormat.replace(DIGITS, input);
    }
    case 'percent':
      return CONTAINS_LETTERS.test(input) ? `${input} %` : `${input}%`;
    case 'numeric':
    default:
      return input;
  }
};
export const valueFormatter = (props: ValueFormatterProps): string => {
  numeral.locale(props.intl.locale.toLowerCase());
  const formattedValue = numeral(props.value.toFixed(props.formatting.fixedLength)).format(
    getFormattingFormula(props.formatting)
  );
  const result = appendSign(formattedValue, props.intl, props.formatting.dataFormat, props.formatting.currency);
  return result;
};
