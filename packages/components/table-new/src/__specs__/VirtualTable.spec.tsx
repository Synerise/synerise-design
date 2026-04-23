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

    // Without stickyHeader, columns and body render in a single unified table
    const tables = screen.getAllByRole('table');
    expect(tables).toHaveLength(1)
  });

  it('should render with stickyHeader', () => {
    renderWithProvider(
      <VirtualTable data={DATA} columns={COLUMNS} stickyHeader />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  describe('fixed columns without stickyHeader', () => {
    const FIXED_COLUMNS = [
      { header: 'Name', accessorKey: 'name', id: 'name', meta: { fixed: 'left' } },
      { header: 'Age', accessorKey: 'age', id: 'age' },
      { header: 'Address', accessorKey: 'address', id: 'address', meta: { fixed: 'right' } },
    ] as typeof COLUMNS;

    it('does not apply display:block / overflow to tbody (would break sticky cells)', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={FIXED_COLUMNS} maxHeight={200} />,
      );

      const tbody = screen.getByTestId('ds-table-body');
      expect(tbody.style.display).not.toBe('block');
      expect(tbody.style.overflowY).not.toBe('scroll');
    });

    it('moves vertical scroll to a wrapper div so sticky cells can pin', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={FIXED_COLUMNS} maxHeight={200} />,
      );

      const tbody = screen.getByTestId('ds-table-body');
      const scrollWrapper = tbody.closest('div[style*="overflow"]') as HTMLElement | null
        ?? Array.from(document.querySelectorAll('div')).find(
          (el) => getComputedStyle(el).overflowY === 'scroll',
        );

      expect(scrollWrapper).toBeTruthy();
    });
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

  describe('back to top button', () => {
    const simulateScroll = (scrollTop: number) => {
      const container = screen.getByTestId('ds-table-container');
      Object.defineProperty(container, 'scrollTop', {
        configurable: true,
        value: scrollTop,
      });
      fireEvent.scroll(container);
    };

    it('should not render the button when showBackToTopButton is falsy', () => {
      renderWithProvider(<VirtualTable data={DATA} columns={COLUMNS} stickyHeader />);

      expect(
        screen.queryByRole('button', { name: /back to top/i }),
      ).not.toBeInTheDocument();
    });

    it('should not render the button before the user scrolls', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          stickyHeader
          showBackToTopButton
          onBackToTop={vi.fn()}
        />,
      );

      expect(
        screen.queryByRole('button', { name: /back to top/i }),
      ).not.toBeInTheDocument();
    });

    it('should render the button once scrolled past the threshold', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          stickyHeader
          showBackToTopButton
          onBackToTop={vi.fn()}
        />,
      );

      simulateScroll(2000);

      expect(
        screen.getByRole('button', { name: /back to top/i }),
      ).toBeInTheDocument();
    });

    it('should render the button without an infiniteScroll config', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={COLUMNS} stickyHeader showBackToTopButton />,
      );

      simulateScroll(2000);

      expect(
        screen.getByRole('button', { name: /back to top/i }),
      ).toBeInTheDocument();
    });

    it('should call onBackToTop when clicked', () => {
      const onBackToTop = vi.fn();
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          stickyHeader
          showBackToTopButton
          onBackToTop={onBackToTop}
        />,
      );

      simulateScroll(2000);
      fireEvent.click(screen.getByRole('button', { name: /back to top/i }));
      expect(onBackToTop).toHaveBeenCalledTimes(1);
    });

    it('should fall back to internal scrollToTop when onBackToTop is omitted', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={COLUMNS} stickyHeader showBackToTopButton />,
      );

      simulateScroll(2000);
      expect(() =>
        fireEvent.click(screen.getByRole('button', { name: /back to top/i })),
      ).not.toThrow();
    });
  });
});
