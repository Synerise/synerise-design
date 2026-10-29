import selectColorByLetter from './selectColorByLetter';

// The letter → family mapping consumers see (avatar initials). Pinned so a change to the
// custom-colour family list or its order shows up as a failing spec, not a silent recolour.
const FAMILY_BY_LETTER: Record<string, string> = {
  A: 'blue',
  B: 'cyan',
  C: 'fern',
  D: 'green',
  E: 'grey',
  F: 'mars',
  G: 'orange',
  H: 'pink',
  I: 'purple',
  J: 'red',
  K: 'violet',
  L: 'yellow',
  M: 'blue',
  N: 'cyan',
  O: 'fern',
  P: 'green',
  Q: 'grey',
  R: 'mars',
  S: 'orange',
  T: 'pink',
  U: 'purple',
  V: 'red',
  W: 'violet',
  X: 'yellow',
  Y: 'blue',
  Z: 'cyan',
};

describe('selectColorByLetter', () => {
  it('falls back to orange without a letter', () => {
    expect(selectColorByLetter()).toBe('var(--ds-color-custom-orange-500)');
    expect(selectColorByLetter('*')).toBe('var(--ds-color-custom-orange-500)');
    expect(selectColorByLetter(undefined, true)).toStrictEqual({ color: 'orange', hue: '500' });
  });

  it.each(Object.entries(FAMILY_BY_LETTER))('maps %s to %s', (letter, family) => {
    expect(selectColorByLetter(letter)).toBe(`var(--ds-color-custom-${family}-500)`);
    expect(selectColorByLetter(letter.toLowerCase(), true)).toStrictEqual({
      color: family,
      hue: '500',
    });
  });
});
