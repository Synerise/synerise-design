import { getIsRevealed } from '../getIsRevealed';

describe('getIsRevealed', () => {
  it('should return true when scrolling backward with data', () => {
    expect(getIsRevealed({ hasData: true, scrollDirection: 'backward' })).toBe(true);
  });

  it('should return false when scrolling forward with data', () => {
    expect(getIsRevealed({ hasData: true, scrollDirection: 'forward' })).toBe(false);
  });

  it('should return false when scrolling backward without data', () => {
    expect(getIsRevealed({ hasData: false, scrollDirection: 'backward' })).toBe(false);
  });

  it('should return false when scrollDirection is null', () => {
    expect(getIsRevealed({ hasData: true, scrollDirection: null })).toBe(false);
  });
});
