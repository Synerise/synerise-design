import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { VirtualTable } from '../VirtualTable';
import { COLUMNS, DATA, SORTABLE_COLUMNS } from './data';

describe('VirtualTable', () => {
  it('should render correctly', () => {
    renderWithProvider(<VirtualTable data={DATA} columns={COLUMNS} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  it('should render with selection enabled', () => {
    const selectionConfig = {
      onChange: vi.fn(),
    };
    renderWithProvider(
      <VirtualTable
        data={DATA}
        columns={COLUMNS}
        selectionConfig={selectionConfig}
        selectedRowKeys={[]}
      />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('should render empty table', () => {
    renderWithProvider(<VirtualTable data={[]} columns={COLUMNS} />);

    // Column headers are hidden when table is empty
    const container = screen.getByTestId('ds-table-container');
    expect(container).toBeInTheDocument();
    expect(screen.queryByText('Mike')).not.toBeInTheDocument();
  });

  it('should render skeleton columns when loading with no columns', () => {
    renderWithProvider(<VirtualTable data={[]} columns={[]} isLoading />);

    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(2)
  });

  it('should render with stickyHeader', () => {
    renderWithProvider(
      <VirtualTable data={DATA} columns={COLUMNS} stickyHeader />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  describe('sorting', () => {
    it('should render sort buttons for sortable columns', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={SORTABLE_COLUMNS}
          onSort={vi.fn()}
        />,
      );

      const sortButtons = screen.getAllByTestId('table-common-sorter-button');
      expect(sortButtons).toHaveLength(2);
    });
  });

  describe('selection', () => {
    it('should call onChange when a row checkbox is clicked', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={[]}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      expect(onChange).toHaveBeenCalled();
      const [selectedKeys] = onChange.mock.calls[0];
      expect(selectedKeys).toContain('1');
    });

    it('should call onChange with all keys when select-all is clicked', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={[]}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);

      expect(onChange).toHaveBeenCalled();
      const [selectedKeys] = onChange.mock.calls[0];
      expect(selectedKeys).toHaveLength(DATA.length);
    });

    it('should render correct number of checkboxes with pre-selected rows', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange }}
          selectedRowKeys={['1', '2']}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // 1 select-all + row checkboxes
      expect(checkboxes.length).toBeGreaterThan(1);
    });
  });

  describe('onRowClick', () => {
    it('should call onRowClick when a row is clicked', () => {
      const onRowClick = vi.fn();
      renderWithProvider(
        <VirtualTable data={DATA} columns={COLUMNS} onRowClick={onRowClick} />,
      );

      const rows = screen.getAllByRole('row');
      // Find the first data row (skip header row)
      const dataRow = rows.find(
        (row) => row.getAttribute('data-row-index') !== null,
      );
      if (dataRow) {
        fireEvent.click(dataRow);
        expect(onRowClick).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('infinite scroll', () => {
    it('should render with infinite scroll configuration', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          infiniteScroll={{
            hasMore: true,
            hasError: false,
            isLoading: false,
            nextPage: { hasMore: true, hasError: false, isLoading: false },
            onScrollEndReach: vi.fn(),
          }}
        />,
      );

      expect(screen.getByTestId('ds-table-container')).toBeInTheDocument();
    });

    it('should render with prevPage infinite scroll', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          infiniteScroll={{
            hasMore: true,
            hasError: false,
            isLoading: false,
            prevPage: { hasMore: true, hasError: false, isLoading: false },
            onScrollTopReach: vi.fn(),
          }}
        />,
      );

      expect(screen.getByTestId('ds-table-container')).toBeInTheDocument();
    });
  });
});
