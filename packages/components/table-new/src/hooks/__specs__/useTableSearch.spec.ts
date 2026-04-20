import { renderHook, act } from '@testing-library/react';

import { useTableSearch } from '../useTableSearch';

type Item = { id: string; name: string };

const DATA: Item[] = [
  { id: '1', name: 'Alpha' },
  { id: '2', name: 'Beta' },
  { id: '3', name: 'Gamma' },
  { id: '4', name: 'Alpha Beta' },
];

describe('useTableSearch', () => {
  describe('matchesSearchQuery', () => {
    const matchesSearchQuery = (query: string, row: Item) =>
      row.name.toLowerCase().includes(query.toLowerCase());

    it('returns all data when query is empty', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery })
      );

      expect(result.current.displayData).toEqual(DATA);
      expect(result.current.hasBuiltInSearch).toBe(true);
    });

    it('filters data when query is set', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery })
      );

      act(() => {
        result.current.setSearchQuery('alpha');
      });

      expect(result.current.displayData).toHaveLength(2);
      expect(result.current.displayData.map((d) => d.id)).toEqual(['1', '4']);
    });

    it('returns empty array when nothing matches', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery })
      );

      act(() => {
        result.current.setSearchQuery('nonexistent');
      });

      expect(result.current.displayData).toHaveLength(0);
    });

    it('clears query on handleClear', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery })
      );

      act(() => {
        result.current.setSearchQuery('alpha');
      });
      expect(result.current.displayData).toHaveLength(2);

      act(() => {
        result.current.handleClear();
      });
      expect(result.current.displayData).toEqual(DATA);
      expect(result.current.searchQuery).toBe('');
    });

    it('calls onSearchQueryChange when query changes', () => {
      const onSearchQueryChange = vi.fn();
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery, onSearchQueryChange })
      );

      act(() => {
        result.current.setSearchQuery('beta');
      });

      expect(onSearchQueryChange).toHaveBeenCalledWith('beta');
    });

    it('calls onSearchQueryChange with empty string on clear', () => {
      const onSearchQueryChange = vi.fn();
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery, onSearchQueryChange })
      );

      act(() => {
        result.current.setSearchQuery('test');
      });
      act(() => {
        result.current.handleClear();
      });

      expect(onSearchQueryChange).toHaveBeenLastCalledWith('');
    });
  });

  describe('filterData', () => {
    it('filters data using filterData predicate', () => {
      const filterData = (row: Item) => row.name.startsWith('A');

      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, filterData })
      );

      expect(result.current.displayData).toHaveLength(2);
      expect(result.current.displayData.map((d) => d.id)).toEqual(['1', '4']);
      expect(result.current.hasBuiltInSearch).toBe(false);
    });

    it('returns all data when filterData is undefined', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, filterData: undefined })
      );

      expect(result.current.displayData).toEqual(DATA);
    });
  });

  describe('precedence', () => {
    it('matchesSearchQuery takes precedence over filterData when query is set', () => {
      const matchesSearchQuery = (query: string, row: Item) =>
        row.name.toLowerCase().includes(query.toLowerCase());
      const filterData = () => false;

      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery, filterData })
      );

      act(() => {
        result.current.setSearchQuery('gamma');
      });

      // matchesSearchQuery should filter, filterData should be ignored
      expect(result.current.displayData).toHaveLength(1);
      expect(result.current.displayData[0].name).toBe('Gamma');
    });

    it('hasBuiltInSearch is true when matchesSearchQuery is provided regardless of filterData', () => {
      const matchesSearchQuery = (query: string, row: Item) =>
        row.name.toLowerCase().includes(query.toLowerCase());
      const filterData = () => false;

      const { result } = renderHook(() =>
        useTableSearch({ data: DATA, matchesSearchQuery, filterData })
      );

      expect(result.current.hasBuiltInSearch).toBe(true);
    });
  });

  describe('no search', () => {
    it('returns data as-is when no search props provided', () => {
      const { result } = renderHook(() =>
        useTableSearch({ data: DATA })
      );

      expect(result.current.displayData).toEqual(DATA);
      expect(result.current.hasBuiltInSearch).toBe(false);
      expect(result.current.searchQuery).toBe('');
    });
  });
});
