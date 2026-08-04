import { describe, expect, it } from 'vitest';

import { computeVisibleCount } from '../utils/computeVisibleCount';

describe('computeVisibleCount', () => {
  it('shows all items when they fit', () => {
    expect(computeVisibleCount([50, 50, 50], 200, 40)).toBe(3);
    expect(computeVisibleCount([50, 50, 50], 150, 40)).toBe(3);
  });

  it('reserves space for the more button when overflowing', () => {
    // total 300 > 200; with 40 reserved: 40+50+50 = 140, +50 = 190, +50 = 240 > 200
    expect(computeVisibleCount([50, 50, 50, 50, 50, 50], 200, 40)).toBe(3);
  });

  it('collapses everything when nothing fits', () => {
    expect(computeVisibleCount([100, 100], 50, 40)).toBe(0);
  });

  it('handles empty item lists', () => {
    expect(computeVisibleCount([], 100, 40)).toBe(0);
  });

  it('is exact at the fitting boundary', () => {
    // total 120 > 100; reserved 40: 40+30+30 = 100 fits, next 30 → 130 > 100
    expect(computeVisibleCount([30, 30, 30, 30], 100, 40)).toBe(2);
  });
});
