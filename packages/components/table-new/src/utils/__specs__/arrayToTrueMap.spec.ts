import { arrayToTrueMap } from '../arrayToTrueMap';

describe('arrayToTrueMap', () => {
  it('should return empty object for empty array', () => {
    expect(arrayToTrueMap([])).toEqual({});
  });

  it('should map string items to true', () => {
    expect(arrayToTrueMap(['a', 'b', 'c'])).toEqual({
      a: true,
      b: true,
      c: true,
    });
  });

  it('should map number items to true', () => {
    expect(arrayToTrueMap([1, 2, 3])).toEqual({
      1: true,
      2: true,
      3: true,
    });
  });

  it('should handle single item array', () => {
    expect(arrayToTrueMap(['only'])).toEqual({ only: true });
  });
});
