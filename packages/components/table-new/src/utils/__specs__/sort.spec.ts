import { type Column } from '@tanstack/react-table';

import { getSortOrder, isSorted } from '../sort';

const createMockColumn = (overrides: {
  getIsSorted?: () => false | 'asc' | 'desc';
  meta?: { sortOrder?: 'ascend' | 'descend' | null };
}) =>
  ({
    getIsSorted: overrides.getIsSorted ?? (() => false),
    columnDef: {
      meta: overrides.meta,
    },
  }) as unknown as Column<unknown>;

describe('isSorted', () => {
  it('should return true when column is sorted (not reading meta)', () => {
    const column = createMockColumn({ getIsSorted: () => 'asc' });
    expect(isSorted(column, false)).toBe(true);
  });

  it('should return false when column is not sorted (not reading meta)', () => {
    const column = createMockColumn({ getIsSorted: () => false });
    expect(isSorted(column, false)).toBe(false);
  });

  it('should return true when meta has sortOrder (reading meta)', () => {
    const column = createMockColumn({ meta: { sortOrder: 'ascend' } });
    expect(isSorted(column, true)).toBe(true);
  });

  it('should return false when meta has no sortOrder (reading meta)', () => {
    const column = createMockColumn({ meta: {} });
    expect(isSorted(column, true)).toBe(false);
  });
});

describe('getSortOrder', () => {
  it('should return "asc" when column is sorted asc (not reading meta)', () => {
    const column = createMockColumn({ getIsSorted: () => 'asc' });
    expect(getSortOrder(column, false)).toBe('asc');
  });

  it('should return "desc" when column is sorted desc (not reading meta)', () => {
    const column = createMockColumn({ getIsSorted: () => 'desc' });
    expect(getSortOrder(column, false)).toBe('desc');
  });

  it('should return false when column is not sorted (not reading meta)', () => {
    const column = createMockColumn({ getIsSorted: () => false });
    expect(getSortOrder(column, false)).toBe(false);
  });

  it('should return "asc" when meta sortOrder is ascend (reading meta)', () => {
    const column = createMockColumn({ meta: { sortOrder: 'ascend' } });
    expect(getSortOrder(column, true)).toBe('asc');
  });

  it('should return "desc" when meta sortOrder is descend (reading meta)', () => {
    const column = createMockColumn({ meta: { sortOrder: 'descend' } });
    expect(getSortOrder(column, true)).toBe('desc');
  });

  it('should return false when meta has no sortOrder (reading meta)', () => {
    const column = createMockColumn({ meta: {} });
    expect(getSortOrder(column, true)).toBe(false);
  });
});
