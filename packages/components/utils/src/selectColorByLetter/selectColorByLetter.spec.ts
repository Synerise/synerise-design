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
  });
});
