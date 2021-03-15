import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import selectColorByLetter, { palette } from './selectColorByLetter';

describe('selectColorByLetter', () => {
  it('should return correct color for the given letter', () => {
    expect(selectColorByLetter()).toBe(theme.palette['orange-500']);
    expect(selectColorByLetter('*')).toBe(theme.palette['orange-500']);

    for(let i = 0; i<=25; i += 1) {
      expect(selectColorByLetter(String.fromCharCode(i+65))).toBe(theme.palette[`${palette[i % palette.length]}-500`])
    }
  });

  it('should return correct object with color and hue', () => {
    expect(selectColorByLetter(undefined, true)).toStrictEqual({color: 'orange', hue: '500'});
    expect(selectColorByLetter('*', true)).toStrictEqual({color: 'orange', hue: '500'});

    for(let i = 0; i<=25; i += 1) {
      expect(selectColorByLetter(String.fromCharCode(i+65), true)).toStrictEqual({color: palette[i % palette.length], hue: '500'});
    }
  });

});
