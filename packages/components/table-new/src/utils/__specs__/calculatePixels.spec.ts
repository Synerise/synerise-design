import { calculatePixels } from '../calculatePixels';

vi.mock('unit-to-px', () => ({
  default: vi.fn((value: string) => {
    if (value === '10rem') return 160;
    if (value === '100px') return 100;
    return 0;
  }),
}));

describe('calculatePixels', () => {
  it('should return number as-is', () => {
    expect(calculatePixels(42)).toBe(42);
    expect(calculatePixels(0)).toBe(0);
  });

  it('should return 0 for undefined', () => {
    expect(calculatePixels(undefined)).toBe(0);
  });

  it('should return 0 for empty string', () => {
    expect(calculatePixels('')).toBe(0);
  });

  it('should return 0 for whitespace string', () => {
    expect(calculatePixels('   ')).toBe(0);
  });

  it('should parse numeric string to number', () => {
    expect(calculatePixels('42')).toBe(42);
    expect(calculatePixels('100')).toBe(100);
  });

  it('should use unit-to-px for CSS unit strings', () => {
    expect(calculatePixels('10rem')).toBe(160);
    expect(calculatePixels('100px')).toBe(100);
  });
});
