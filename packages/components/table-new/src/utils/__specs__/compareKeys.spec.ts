import { compareKeys } from '../compareKeys';

describe('compareKeys', () => {
  it('should return true for identical arrays', () => {
    expect(compareKeys(['a', 'b'], ['a', 'b'])).toBe(true);
  });

  it('should return true for same content in different order', () => {
    expect(compareKeys(['a', 'b', 'c'], ['c', 'a', 'b'])).toBe(true);
  });

  it('should return false for different lengths', () => {
    expect(compareKeys(['a', 'b'], ['a'])).toBe(false);
  });

  it('should return false for same length but different content', () => {
    expect(compareKeys(['a', 'b'], ['a', 'c'])).toBe(false);
  });

  it('should return true for two empty arrays', () => {
    expect(compareKeys([], [])).toBe(true);
  });

  it('should handle duplicates via Set deduplication', () => {
    // ['a', 'a'] becomes Set{'a'} (size 1) vs ['a'] Set{'a'} (size 1)
    expect(compareKeys(['a', 'a'], ['a'])).toBe(true);
  });
});
