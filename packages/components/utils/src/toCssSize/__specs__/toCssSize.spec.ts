import { toCssSize } from '../toCssSize';

describe('toCssSize', () => {
  it.each([
    [0, '0px'],
    [12, '12px'],
    [-4, '-4px'],
    [1.5, '1.5px'],
  ])('treats the number %p as px', (input, expected) => {
    expect(toCssSize(input)).toBe(expected);
  });

  it.each(['12px', '7rem', '50%', 'auto', 'calc(100% - 16px)'])(
    'passes the CSS length %s through unchanged',
    (input) => {
      expect(toCssSize(input)).toBe(input);
    },
  );
});
