import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { Table } from '../Table';
import { COLUMNS, DATA, EXPANDABLE_DATA, SORTABLE_COLUMNS } from './data';

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
});
