import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import selectColorByLetter from './selectColorByLetter';

describe('selectColorByLetter', () => {
  it('shoud return correct color for the given letter', () => {
    expect(selectColorByLetter()).toBe(theme.palette['orange-700']);
    expect(selectColorByLetter('*')).toBe(theme.palette['orange-700']);

    expect(selectColorByLetter('A')).toBe(theme.palette['pink-700']);
    expect(selectColorByLetter('B')).toBe(theme.palette['pink-600']);
    expect(selectColorByLetter('C')).toBe(theme.palette['violet-600']);
    expect(selectColorByLetter('D')).toBe(theme.palette['violet-500']);
    expect(selectColorByLetter('E')).toBe(theme.palette['blue-700']);
    expect(selectColorByLetter('F')).toBe(theme.palette['blue-600']);
    expect(selectColorByLetter('G')).toBe(theme.palette['blue-400']);
    expect(selectColorByLetter('H')).toBe(theme.palette['blue-300']);
    expect(selectColorByLetter('I')).toBe(theme.palette['cyan-700']);
    expect(selectColorByLetter('J')).toBe(theme.palette['fern-600']);
    expect(selectColorByLetter('K')).toBe(theme.palette['fern-500']);
    expect(selectColorByLetter('L')).toBe(theme.palette['yellow-600']);
    expect(selectColorByLetter('M')).toBe(theme.palette['orange-400']);
    expect(selectColorByLetter('N')).toBe(theme.palette['yellow-500']);
    expect(selectColorByLetter('O')).toBe(theme.palette['orange-600']);
    expect(selectColorByLetter('P')).toBe(theme.palette['red-800']);
    expect(selectColorByLetter('R')).toBe(theme.palette['grey-600']);
    expect(selectColorByLetter('S')).toBe(theme.palette['grey-700']);
    expect(selectColorByLetter('T')).toBe(theme.palette['pink-400']);
    expect(selectColorByLetter('U')).toBe(theme.palette['fern-400']);
    expect(selectColorByLetter('V')).toBe(theme.palette['blue-400']);
    expect(selectColorByLetter('W')).toBe(theme.palette['pink-500']);
    expect(selectColorByLetter('X')).toBe(theme.palette['orange-300']);
    expect(selectColorByLetter('Y')).toBe(theme.palette['fern-200']);
    expect(selectColorByLetter('*')).toBe(theme.palette['orange-700']);
  });

  it('shoud return correct object with color and hue', () => {
    expect(selectColorByLetter(undefined, true)).toStrictEqual({color: 'orange', hue: '700'});
    expect(selectColorByLetter('*', true)).toStrictEqual({color: 'orange', hue: '700'});

    expect(selectColorByLetter('A', true)).toStrictEqual({color: 'pink', hue: '700'});
    expect(selectColorByLetter('B', true)).toStrictEqual({color: 'pink', hue: '600'});
    expect(selectColorByLetter('C', true)).toStrictEqual({color: 'violet', hue: '600'});
    expect(selectColorByLetter('D', true)).toStrictEqual({color: 'violet', hue: '500'});
    expect(selectColorByLetter('E', true)).toStrictEqual({color: 'blue', hue: '700'});
    expect(selectColorByLetter('F', true)).toStrictEqual({color: 'blue', hue: '600'});
    expect(selectColorByLetter('G', true)).toStrictEqual({color: 'blue', hue: '400'});
    expect(selectColorByLetter('H', true)).toStrictEqual({color: 'blue', hue: '300'});
    expect(selectColorByLetter('I', true)).toStrictEqual({color: 'cyan', hue: '700'});
    expect(selectColorByLetter('J', true)).toStrictEqual({color: 'fern', hue: '600'});
    expect(selectColorByLetter('K', true)).toStrictEqual({color: 'fern', hue: '500'});
    expect(selectColorByLetter('L', true)).toStrictEqual({color: 'yellow', hue: '600'});
    expect(selectColorByLetter('M', true)).toStrictEqual({color: 'orange', hue: '400'});
    expect(selectColorByLetter('N', true)).toStrictEqual({color: 'yellow', hue: '500'});
    expect(selectColorByLetter('O', true)).toStrictEqual({color: 'orange', hue: '600'});
    expect(selectColorByLetter('P', true)).toStrictEqual({color: 'red', hue: '800'});
    expect(selectColorByLetter('R', true)).toStrictEqual({color: 'grey', hue: '600'});
    expect(selectColorByLetter('S', true)).toStrictEqual({color: 'grey', hue: '700'});
    expect(selectColorByLetter('T', true)).toStrictEqual({color: 'pink', hue: '400'});
    expect(selectColorByLetter('U', true)).toStrictEqual({color: 'fern', hue: '400'});
    expect(selectColorByLetter('V', true)).toStrictEqual({color: 'blue', hue: '400'});
    expect(selectColorByLetter('W', true)).toStrictEqual({color: 'pink', hue: '500'});
    expect(selectColorByLetter('X', true)).toStrictEqual({color: 'orange', hue: '300'});
    expect(selectColorByLetter('Y', true)).toStrictEqual({color: 'fern', hue: '200'});
    expect(selectColorByLetter('*', true)).toStrictEqual({color: 'orange', hue: '700'});
  });
});
