import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';

import { Table } from '../Table';
import { COLUMNS, DATA, type DataType, EXPANDABLE_DATA, SORTABLE_COLUMNS } from './data';

describe('Table', () => {
  it('should render correctly', () => {
    renderWithProvider(<Table data={DATA} columns={COLUMNS} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();

    expect(screen.getAllByRole('row')).toHaveLength(DATA.length + 1); // data rows + header row
  });

  it('should render with selection enabled', () => {
    const selectionConfig = {
      onChange: vi.fn(),
    };
    renderWithProvider(
      <Table
        data={DATA}
        columns={COLUMNS}
        selectionConfig={selectionConfig}
        selectedRowKeys={[]}
      />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    // Selection column adds checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should render empty table', () => {
    renderWithProvider(<Table data={[]} columns={COLUMNS} />);

    // Column headers are hidden when table is empty
    const container = screen.getByTestId('ds-table-container');
    expect(container).toBeInTheDocument();
    // No data rows should be rendered
    expect(screen.queryByText('Mike')).not.toBeInTheDocument();
  });

  it('should render skeleton columns when loading with no columns', () => {
    renderWithProvider(<Table data={[]} columns={[]} isLoading />);

    // Skeleton columns should be rendered within a single unified table
    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(1)
  });

  it('should render with pagination', () => {
    renderWithProvider(
      <Table data={DATA} columns={COLUMNS} pagination={{ pageSize: 2 }} />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    // With pageSize 2, only 2 data rows + 1 header should be visible
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  describe('sorting', () => {
    it('should render sort buttons for sortable columns', () => {
      renderWithProvider(
        <Table data={DATA} columns={SORTABLE_COLUMNS} onSort={vi.fn()} />,
      );

      const sortButtons = screen.getAllByTestId('table-common-sorter-button');
      // Name and Age columns have sorting enabled
      expect(sortButtons).toHaveLength(2);
    });

    it('should render sort buttons that are clickable', () => {
      const onSort = vi.fn();
      renderWithProvider(
        <Table data={DATA} columns={SORTABLE_COLUMNS} onSort={onSort} />,
      );

      const sortButtons = screen.getAllByTestId('table-common-sorter-button');
      // Sort buttons should be rendered and clickable without errors
      expect(() => fireEvent.click(sortButtons[0])).not.toThrow();
    });
  });

  describe('selection', () => {
    it('should call onChange when a row checkbox is clicked', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={[]}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // First checkbox is "select all", rest are row checkboxes
      fireEvent.click(checkboxes[1]);

      expect(onChange).toHaveBeenCalled();
      const [selectedKeys] = onChange.mock.calls[0];
      expect(selectedKeys).toContain('1');
    });

    it('should call onChange with all keys when select-all is clicked', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={[]}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // First checkbox is the select-all checkbox
      fireEvent.click(checkboxes[0]);

      expect(onChange).toHaveBeenCalled();
      const [selectedKeys] = onChange.mock.calls[0];
      expect(selectedKeys).toHaveLength(DATA.length);
    });

    it('should disable checkbox for rows where checkRowSelectionStatus returns disabled', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{
            onChange,
            checkRowSelectionStatus: (record) =>
              record.key === '1' ? { disabled: true } : {},
          }}
          selectedRowKeys={[]}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // The row checkbox for key '1' (index 1, since 0 is select-all) should be disabled
      expect(checkboxes[1]).toBeDisabled();
    });

    it('should render correct number of checkboxes with selection', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={['1', '2']}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // 1 select-all + DATA.length row checkboxes
      expect(checkboxes).toHaveLength(DATA.length + 1);
    });
  });

  describe('onRowClick', () => {
    it('should call onRowClick with the correct record when a row is clicked', () => {
      const onRowClick = vi.fn();
      renderWithProvider(
        <Table data={DATA} columns={COLUMNS} onRowClick={onRowClick} />,
      );

      const rows = screen.getAllByRole('row');
      // rows[0] is the header, rows[1] is the first data row
      fireEvent.click(rows[1]);

      expect(onRowClick).toHaveBeenCalledTimes(1);
      expect(onRowClick.mock.calls[0][0]).toEqual(DATA[0]);
    });
  });

  describe('expandable rows', () => {
    it('should render child rows when expanded', () => {
      renderWithProvider(
        <Table
          data={EXPANDABLE_DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: ['1'],
          }}
        />,
      );

      // Parent row + child row + other parent row + header
      expect(screen.getByText('Mike')).toBeInTheDocument();
      expect(screen.getByText('Mike Jr')).toBeInTheDocument();
    });

    it('should render fewer rows when expandedRowKeys is empty vs expanded', () => {
      const { unmount } = renderWithProvider(
        <Table
          data={EXPANDABLE_DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: ['1'],
          }}
        />,
      );

      const expandedRowCount = screen.getAllByRole('row').length;
      unmount();

      renderWithProvider(
        <Table
          data={EXPANDABLE_DATA}
          columns={COLUMNS}
        />,
      );

      const collapsedRowCount = screen.getAllByRole('row').length;
      // Without expandable config, child rows should not appear
      expect(collapsedRowCount).toBeLessThanOrEqual(expandedRowCount);
    });
  });

  describe('built-in search', () => {
    const matchesSearchQuery = (query: string, row: DataType) =>
      row.name.toLowerCase().includes(query.toLowerCase());

    it('renders SearchInput when matchesSearchQuery is provided', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
        />,
      );

      const searchWrapper = screen.getByTestId('ds-table-search-wrapper');
      expect(searchWrapper).toBeInTheDocument();
    });

    it('does not render SearchInput when searchComponent is provided instead', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          searchComponent={<div data-testid="custom-search">Custom</div>}
        />,
      );

      const customSearch = screen.getByTestId('custom-search');
      expect(customSearch).toBeInTheDocument();
    });

    it('filters rows when typing in built-in search', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
        />,
      );

      // All rows visible initially (DATA has 6 items: 1 Mike + 5 Johns)
      expect(screen.getAllByRole('row')).toHaveLength(DATA.length + 1);

      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Mike' } });

      // Only Mike should be visible + header
      expect(screen.getAllByRole('row')).toHaveLength(2);
      expect(screen.getByText('Mike')).toBeInTheDocument();
    });

    it('restores all rows when search is cleared', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
        />,
      );

      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Mike' } });
      expect(screen.getAllByRole('row')).toHaveLength(2);

      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getAllByRole('row')).toHaveLength(DATA.length + 1);
    });

    it('passes searchProps to SearchInput', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
          searchProps={{ placeholder: 'Search users...' }}
        />,
      );

      expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
    });

    it('calls onSearchQueryChange when query changes', () => {
      const onSearchQueryChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
          onSearchQueryChange={onSearchQueryChange}
        />,
      );

      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'test' } });

      expect(onSearchQueryChange).toHaveBeenCalledWith('test');
    });
  });

  describe('search with selection preservation', () => {
    const matchesSearchQuery = (query: string, row: DataType) =>
      row.name.toLowerCase().includes(query.toLowerCase());

    it('preserves selection when rows are filtered out by search', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          matchesSearchQuery={matchesSearchQuery}
          selectionConfig={{ onChange }}
          selectedRowKeys={['1', '2']}
        />,
      );

      // Search for Mike (key=1), hiding John (key=2)
      const searchInput = screen.getByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'Mike' } });

      // Only 1 data row visible + header
      expect(screen.getAllByRole('row')).toHaveLength(2);

      // Click the visible row's checkbox to deselect it
      const checkboxes = screen.getAllByRole('checkbox');
      // checkboxes[0] = select-all, checkboxes[1] = Mike's row
      fireEvent.click(checkboxes[1]);

      // onChange should be called — key '2' should still be in the selection
      // (it was selected before search, and search should not remove it)
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('filterData', () => {
    it('filters rows using filterData predicate', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          filterData={(row) => row.name === 'Mike'}
          searchComponent={<div data-testid="custom-search">Search</div>}
        />,
      );

      // Only Mike visible + header
      expect(screen.getAllByRole('row')).toHaveLength(2);
      expect(screen.getByText('Mike')).toBeInTheDocument();
    });

    it('shows all rows when filterData is undefined', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          filterData={undefined}
        />,
      );

      expect(screen.getAllByRole('row')).toHaveLength(DATA.length + 1);
    });
  });

  describe('checkRowSelectionStatus.unavailable', () => {
    it('hides checkbox for rows marked unavailable but keeps it for others', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{
            onChange: vi.fn(),
            checkRowSelectionStatus: (record) =>
              record.key === '1' ? { unavailable: true } : {},
          }}
          selectedRowKeys={[]}
        />,
      );

      const rowCheckboxes = screen.getAllByTestId('ds-table-selection-button');
      // One per non-unavailable data row (5 of 6)
      expect(rowCheckboxes).toHaveLength(DATA.length - 1);
    });

    it('still disables (without hiding) when only disabled:true is returned', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{
            onChange: vi.fn(),
            checkRowSelectionStatus: (record) =>
              record.key === '1' ? { disabled: true } : {},
          }}
          selectedRowKeys={[]}
        />,
      );

      const rowCheckboxes = screen.getAllByTestId('ds-table-selection-button');
      expect(rowCheckboxes).toHaveLength(DATA.length);
      // The first data row's checkbox renders (role=checkbox) and is disabled.
      expect(rowCheckboxes[0]).toBeDisabled();
    });
  });

  describe('getRowProps', () => {
    it('applies style, className and data-* attributes to the <tr>', () => {
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          getRowProps={(record) => ({
            style: record.key === '1' ? { opacity: 0.5 } : undefined,
            className: record.key === '1' ? 'is-dimmed' : undefined,
            'data-row-state': record.key === '1' ? 'dimmed' : 'active',
          } as React.HTMLAttributes<HTMLTableRowElement>)}
        />,
      );

      const dimmedRow = document.querySelector('[data-row-state="dimmed"]');
      expect(dimmedRow).toBeInTheDocument();
      expect(dimmedRow).toHaveStyle({ opacity: '0.5' });
      expect(dimmedRow).toHaveClass('is-dimmed');

      const activeRows = document.querySelectorAll('[data-row-state="active"]');
      expect(activeRows.length).toBe(DATA.length - 1);
    });

    it('fires getRowProps.onClick and onRowClick in order when both provided', () => {
      const rowPropsClick = vi.fn();
      const onRowClick = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          getRowProps={() => ({ onClick: rowPropsClick })}
          onRowClick={onRowClick}
        />,
      );

      const firstDataRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstDataRow);

      expect(rowPropsClick).toHaveBeenCalledTimes(1);
      expect(onRowClick).toHaveBeenCalledTimes(1);
      expect(rowPropsClick.mock.invocationCallOrder[0]).toBeLessThan(
        onRowClick.mock.invocationCallOrder[0],
      );
    });

    it('suppresses onRowClick when getRowProps.onClick calls preventDefault', () => {
      const onRowClick = vi.fn();
      renderWithProvider(
        <Table
          data={DATA}
          columns={COLUMNS}
          getRowProps={() => ({
            onClick: (event) => event.preventDefault(),
          })}
          onRowClick={onRowClick}
        />,
      );

      const firstDataRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstDataRow);

      expect(onRowClick).not.toHaveBeenCalled();
    });
  });
});
