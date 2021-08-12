import { calculatePixels } from '../utils/calculatePixels';

describe('calculatePixels', () => {
  it('should convert falsy values to 0', () => {
    expect(calculatePixels(undefined)).toBe(0);
    expect(calculatePixels(null)).toBe(0);
    expect(calculatePixels('')).toBe(0);
  });
  it('should convert whitespace string to 0', () => {
    expect(calculatePixels('')).toBe(0);
    expect(calculatePixels(' ')).toBe(0);
    expect(calculatePixels('   ')).toBe(0);
  });
  it('should convert stringified numbers to pixels', () => {
    expect(calculatePixels('100')).toBe(100);
    expect(calculatePixels('0')).toBe(0);
    expect(calculatePixels('23.4')).toBe(23.4);
  });
  it('should convert css units to numbers', () => {
    expect(typeof calculatePixels('100vw')).toBe('number');
    expect(typeof calculatePixels('2em')).toBe('number');
    expect(typeof calculatePixels('3vh')).toBe('number');
  });
  it('should convert css pixel units to numbers', () => {
    expect(calculatePixels('100px')).toBe(100);
    expect(calculatePixels('3.5px')).toBe(3.5);
    expect(calculatePixels('0px')).toBe(0);
  });
  it('should accept numbers', () => {
    expect(calculatePixels(100)).toBe(100);
    expect(calculatePixels(3.5)).toBe(3.5);
    expect(calculatePixels(0)).toBe(0);
  });
});
