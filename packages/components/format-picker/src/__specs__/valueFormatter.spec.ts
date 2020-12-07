import {
  appendSign,
  appendZeros,
  choosePrefix,
  chooseSuffix,
  getFormattingFormula,
  valueFormatter,
} from './../utils/valueFormatter';
import { FormattingValue } from '../FomartPicker.types';

const intlFactory = (locale: string) => ({
  locale,
  formatNumber(value: { toString: () => any }, config: { currency: any }) {
    return config && config.currency ? `${value}${config.currency}` : value.toString();
  },
});

describe('appendZeros', () => {
  it('return empty string if passed 0', () => {
    expect(appendZeros(0)).toBe('');
  });

  it('return string with . and amount of zeros equal to number passed', () => {
    expect(appendZeros(3)).toBe('.000');
    expect(appendZeros(7)).toBe('.0000000');
  });
});

describe('chooseSuffix', () => {
  it('return empty string if passed false', () => {
    expect(chooseSuffix(false)).toBe('');
  });

  it('return "a" if passed true', () => {
    expect(chooseSuffix(true)).toBe('a');
  });
});

describe('choosePrefix', () => {
  it('return "0" if passed false', () => {
    expect(choosePrefix(false)).toBe('0');
  });

  it('return "0,0" if passed true', () => {
    expect(choosePrefix(true)).toBe('0,0');
  });
});

describe('getFormattingFormula', () => {
  it('return proper value based on passed props', () => {
    const makeConfig = (useSeparator: boolean, fixedLength: number, compactNumbers: boolean): FormattingValue => ({
      useSeparator,
      fixedLength,
      compactNumbers,
      currency: 'USD',
      dataFormat: 'cash',
    });
    expect(getFormattingFormula(makeConfig(true, 3, true))).toBe('0,0.000a');
    expect(getFormattingFormula(makeConfig(false, 0, false))).toBe('0');
  });
});

describe('appendSign', () => {
  it('returns passed string if type is numeric', () => {
    const intl = intlFactory('pl');
    // @ts-ignore
    expect(appendSign('123', intl, 'numeric', '')).toBe('123');
  });

  it('appends % to passed string if type is percent', () => {
    const intl = intlFactory('pl');
    // @ts-ignore
    expect(appendSign('123', intl, 'percent', '')).toBe('123%');
  });

  it('appends space and % to passed string if type is percent but string contains non digits', () => {
    const intl = intlFactory('pl');
    // @ts-ignore
    expect(appendSign('123k', intl, 'percent', '')).toBe('123k %');
  });

  it('appends passed currency to passed string if type is cash', () => {
    const intl = intlFactory('pl');
    // @ts-ignore
    expect(appendSign('123', intl, 'cash', 'USD')).toBe('123USD');
  });

  it('appends space and passed currency to passed string if type is cash but string contains non digits', () => {
    const intl = intlFactory('pl');
    // @ts-ignore
    expect(appendSign('123k', intl, 'cash', 'USD')).toBe('123k USD');
  });
});

describe('valueFormatter', () => {
  it('returns properly parsed string based on locale', () => {
    const formatting = {
      useSeparator: true,
      fixedLength: 4,
      compactNumbers: false,
      dataFormat: 'cash',
      currency: '$',
    };
    const intl = intlFactory('pl');

    const props = {
      intl,
      formatting,
      value: 1337,
    };
    // @ts-ignore
    expect(valueFormatter(props)).toBe('1,337.0000$');
  });

  it('returns properly parsed string based on en-GB', () => {
    const formatting = {
      useSeparator: true,
      fixedLength: 4,
      compactNumbers: false,
      dataFormat: 'cash',
      currency: '$',
    };
    const intl = intlFactory('en-GB');

    const props = {
      intl,
      formatting,
      value: 1337,
    };
    // @ts-ignore
    expect(valueFormatter(props)).toBe('1,337.0000$');
  });

  it('returns properly parsed string based on en-GB', () => {
    const formatting = {
      useSeparator: true,
      fixedLength: 4,
      compactNumbers: false,
      dataFormat: 'cash',
      currency: '$',
    };
    const intl = intlFactory('en-US');

    const props = {
      intl,
      formatting,
      value: 1337,
    };
    // @ts-ignore
    expect(valueFormatter(props)).toBe('1,337.0000$');
  });
});
