import { type MutableRefObject } from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import { act, renderHook } from '@testing-library/react';

import { useTable } from '../useTable';

type Row = { key: string; name: string; age: number };

const DATA: Row[] = [
  { key: '1', name: 'Alice', age: 30 },
  { key: '2', name: 'Bob', age: 25 },
  { key: '3', name: 'Charlie', age: 35 },
  { key: '4', name: 'Alice Jr', age: 10 },
];

const COLUMNS: ColumnDef<Row>[] = [
  { header: 'Name', accessorKey: 'name', id: 'name' },
  { header: 'Age', accessorKey: 'age', id: 'age' },
];

const createWrapperRef = (): MutableRefObject<HTMLDivElement | null> => ({
  current: null,
});

const defaultProps = {
  data: DATA,
  columns: COLUMNS,
  wrapperRef: createWrapperRef(),
  requireColumnSizing: false,
};

describe('useTable', () => {
  describe('table instance', () => {
    it('returns a TanStack table instance with correct row count', () => {
      const { result } = renderHook(() => useTable(defaultProps));

      expect(result.current.table.getRowModel().rows).toHaveLength(DATA.length);
    });

    it('returns rows matching the data', () => {
      const { result } = renderHook(() => useTable(defaultProps));

      const names = result.current.table
        .getRowModel()
        .rows.map((r) => r.original.name);
      expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'Alice Jr']);
    });
  });

  describe('pagination', () => {
    it('hasPagination is true by default (pagination undefined is not false)', () => {
      const { result } = renderHook(() => useTable(defaultProps));

      expect(result.current.hasPagination).toBe(true);
    });

    it('hasPagination is true when pagination is provided', () => {
      const { result } = renderHook(() =>
        useTable({ ...defaultProps, pagination: { pageSize: 2 } })
      );

      expect(result.current.hasPagination).toBe(true);
    });

    it('hasPagination is false when pagination is false', () => {
      const { result } = renderHook(() =>
        useTable({ ...defaultProps, pagination: false })
      );

      expect(result.current.hasPagination).toBe(false);
    });

    it('hasPagination is false when infiniteScroll is provided', () => {
      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          pagination: { pageSize: 10 },
          infiniteScroll: {
            hasMore: true,
            isLoading: false,
            hasError: false,
          },
        })
      );

      expect(result.current.hasPagination).toBe(false);
    });

    it('limits visible rows when paginated', () => {
      const { result } = renderHook(() =>
        useTable({ ...defaultProps, pagination: { pageSize: 2 } })
      );

      expect(result.current.table.getRowModel().rows).toHaveLength(2);
    });
  });

  describe('selection', () => {
    it('syncs selectedRowKeys to internal row selection', () => {
      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          selectionConfig: { onChange: vi.fn() },
          selectedRowKeys: ['1', '3'],
        })
      );

      const selectedRows = result.current.table.getSelectedRowModel().rows;
      expect(selectedRows).toHaveLength(2);
      expect(selectedRows.map((r) => r.original.key)).toEqual(['1', '3']);
    });

    it('updates selection when selectedRowKeys prop changes', () => {
      const onChange = vi.fn();
      const { result, rerender } = renderHook(
        ({ selectedRowKeys }) =>
          useTable({
            ...defaultProps,
            selectionConfig: { onChange },
            selectedRowKeys,
          }),
        { initialProps: { selectedRowKeys: ['1'] } }
      );

      expect(result.current.table.getSelectedRowModel().rows).toHaveLength(1);

      rerender({ selectedRowKeys: ['1', '2', '3'] });

      expect(result.current.table.getSelectedRowModel().rows).toHaveLength(3);
    });

    it('calls selectionConfig.onChange with keys from full data when selection changes', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          selectionConfig: { onChange },
          selectedRowKeys: [],
          rowKey: 'key' as keyof Row,
        })
      );

      // Simulate selecting a row via TanStack API
      act(() => {
        result.current.table.setRowSelection({ '1': true, '2': true });
      });

      expect(onChange).toHaveBeenCalled();
      const [keys, items] = onChange.mock.calls[0];
      expect(keys).toContain('1');
      expect(keys).toContain('2');
      expect(items).toHaveLength(2);
      expect(items.map((i: Row) => i.name)).toEqual(
        expect.arrayContaining(['Alice', 'Bob'])
      );
    });

    it('selection onChange returns items from full data, not filtered displayData', () => {
      const onChange = vi.fn();
      const matchesSearchQuery = (query: string, row: Row) =>
        row.name.toLowerCase().includes(query.toLowerCase());

      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          selectionConfig: { onChange },
          selectedRowKeys: ['1', '2'],
          matchesSearchQuery,
          rowKey: 'key' as keyof Row,
        })
      );

      // Set search to filter out Bob (key=2)
      act(() => {
        result.current.setSearchQuery('Alice');
      });

      // Only Alice rows visible
      expect(result.current.table.getRowModel().rows).toHaveLength(2); // Alice + Alice Jr

      // Trigger selection change
      act(() => {
        result.current.table.setRowSelection({ '1': true });
      });

      expect(onChange).toHaveBeenCalled();
      const [keys, items] = onChange.mock.calls[0];
      // Key '1' selected, items resolved from full data
      expect(keys).toContain('1');
      expect(items.find((i: Row) => i.key === '1')).toBeDefined();
    });
  });

  describe('search integration', () => {
    it('exposes hasBuiltInSearch as true when matchesSearchQuery is provided', () => {
      const matchesSearchQuery = (query: string, row: Row) =>
        row.name.includes(query);

      const { result } = renderHook(() =>
        useTable({ ...defaultProps, matchesSearchQuery })
      );

      expect(result.current.hasBuiltInSearch).toBe(true);
    });

    it('exposes hasBuiltInSearch as false when no search props', () => {
      const { result } = renderHook(() => useTable(defaultProps));

      expect(result.current.hasBuiltInSearch).toBe(false);
    });

    it('filters table rows when searchQuery is set via setSearchQuery', () => {
      const matchesSearchQuery = (query: string, row: Row) =>
        row.name.toLowerCase().includes(query.toLowerCase());

      const { result } = renderHook(() =>
        useTable({ ...defaultProps, matchesSearchQuery })
      );

      expect(result.current.table.getRowModel().rows).toHaveLength(4);

      act(() => {
        result.current.setSearchQuery('bob');
      });

      expect(result.current.table.getRowModel().rows).toHaveLength(1);
      expect(result.current.table.getRowModel().rows[0].original.name).toBe(
        'Bob'
      );
    });

    it('restores all rows when search is cleared', () => {
      const matchesSearchQuery = (query: string, row: Row) =>
        row.name.toLowerCase().includes(query.toLowerCase());

      const { result } = renderHook(() =>
        useTable({ ...defaultProps, matchesSearchQuery })
      );

      act(() => {
        result.current.setSearchQuery('bob');
      });
      expect(result.current.table.getRowModel().rows).toHaveLength(1);

      act(() => {
        result.current.handleSearchClear();
      });
      expect(result.current.table.getRowModel().rows).toHaveLength(4);
    });

    it('filters rows with filterData prop', () => {
      const filterData = (row: Row) => row.age >= 30;

      const { result } = renderHook(() =>
        useTable({ ...defaultProps, filterData })
      );

      expect(result.current.table.getRowModel().rows).toHaveLength(2);
      const names = result.current.table
        .getRowModel()
        .rows.map((r) => r.original.name);
      expect(names).toEqual(['Alice', 'Charlie']);
    });
  });

  describe('sorting', () => {
    const SORTABLE_COLUMNS: ColumnDef<Row>[] = [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        enableSorting: true,
      },
      {
        header: 'Age',
        accessorKey: 'age',
        id: 'age',
        enableSorting: true,
      },
    ];

    it('calls onSort when sorting changes', () => {
      const onSort = vi.fn();
      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          columns: SORTABLE_COLUMNS,
          onSort,
        })
      );

      act(() => {
        result.current.table.getColumn('name')?.toggleSorting(false);
      });

      expect(onSort).toHaveBeenCalled();
      const [singleSort, sortState] = onSort.mock.calls[0];
      expect(singleSort.columnKey).toBe('name');
      expect(singleSort.order).toBe('ascend');
      expect(sortState).toHaveProperty('name');
    });

    it('calls onSort with descend order', () => {
      const onSort = vi.fn();
      const { result } = renderHook(() =>
        useTable({
          ...defaultProps,
          columns: SORTABLE_COLUMNS,
          onSort,
        })
      );

      act(() => {
        result.current.table.getColumn('age')?.toggleSorting(true);
      });

      expect(onSort).toHaveBeenCalled();
      const [singleSort] = onSort.mock.calls[0];
      expect(singleSort.columnKey).toBe('age');
      expect(singleSort.order).toBe('descend');
    });
  });

  describe('column pinning', () => {
    it('pins columns based on meta.fixed', () => {
      const pinnedColumns: ColumnDef<Row>[] = [
        {
          header: 'Name',
          accessorKey: 'name',
          id: 'name',
          meta: { fixed: 'left' },
        },
        {
          header: 'Age',
          accessorKey: 'age',
          id: 'age',
          meta: { fixed: 'right' },
        },
      ];

      const { result } = renderHook(() =>
        useTable({ ...defaultProps, columns: pinnedColumns })
      );

      const pinning = result.current.table.getState().columnPinning;
      expect(pinning.left).toContain('name');
      expect(pinning.right).toContain('age');
    });
  });
});
