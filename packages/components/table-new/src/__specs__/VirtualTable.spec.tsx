import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, within } from '@testing-library/react';

import { VirtualTable } from '../VirtualTable';
import { COLUMNS, DATA, SORTABLE_COLUMNS } from './data';

describe('VirtualTable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

  describe('selection limit', () => {
    it('renders the select-all checkbox and caps it at the limit', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange, limit: 2 }}
          selectedRowKeys={[]}
        />,
      );

      fireEvent.click(screen.getByTestId('ds-table-batch-selection-button'));

      const [selectedKeys] = onChange.mock.calls[0];
      expect(selectedKeys).toEqual(['1', '2']);
    });

    it('disables the unselected row checkboxes once the cap is reached', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          selectionConfig={{ onChange: vi.fn(), limit: 2 }}
        />,
      );

      fireEvent.click(screen.getByTestId('ds-table-batch-selection-button'));

      // Only assert over the rows the virtualizer actually rendered
      const rowCheckboxes = screen.getAllByTestId('ds-table-selection-button');
      const unselected = rowCheckboxes.filter(
        (checkbox) => checkbox.getAttribute('aria-checked') === 'false',
      );
      expect(unselected.length).toBeGreaterThan(0);
      unselected.forEach((checkbox) => {
        expect(checkbox).toBeDisabled();
      });
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
    // @tanstack/react-virtual arms a debounced `isScrollingResetDelay` (150ms)
    // timer on every scroll, and its unmount cleanup does NOT clear it. With real
    // timers the callback fires after jsdom teardown, hits `window` while it's
    // gone, and throws an unhandled ReferenceError. Fake timers (advancing with
    // real time so RTL still works) let us drop the pending timer on teardown.
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });
    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    });

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

  describe('subHeaderComponent', () => {
    const BAR = <div data-testid="test-filter-bar">filter bar</div>;

    it('should not render anything when the prop is omitted', () => {
      renderWithProvider(<VirtualTable data={DATA} columns={COLUMNS} />);

      expect(screen.queryByTestId('ds-table-subheader')).not.toBeInTheDocument();
    });

    it('should render between the title bar and the column header row', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={COLUMNS} subHeaderComponent={BAR} />,
      );

      const header = screen.getByTestId('ds-table-header');
      const subHeader = screen.getByTestId('ds-table-subheader');
      const columns = screen.getByTestId('ds-table-columns');

      expect(within(subHeader).getByTestId('test-filter-bar')).toBeInTheDocument();
      // Assert position, not mere presence: presence alone still passes when
      // the node is wrongly nested inside filterComponent.
      const headerToSub = header.compareDocumentPosition(subHeader);
      const subToColumns = subHeader.compareDocumentPosition(columns);
      expect(headerToSub & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(subToColumns & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('should render outside the filter wrapper', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          filterComponent={<div data-testid="test-filter-trigger">trigger</div>}
          subHeaderComponent={BAR}
        />,
      );

      const filterWrapper = screen.getByTestId('ds-table-filter-wrapper');

      expect(
        within(filterWrapper).getByTestId('test-filter-trigger'),
      ).toBeInTheDocument();
      expect(
        within(filterWrapper).queryByTestId('ds-table-subheader'),
      ).not.toBeInTheDocument();
    });

    it('should render with hideTitleBar, independently of the title bar', () => {
      renderWithProvider(
        <VirtualTable data={DATA} columns={COLUMNS} hideTitleBar subHeaderComponent={BAR} />,
      );

      expect(screen.queryByTestId('ds-table-header')).not.toBeInTheDocument();
      expect(screen.getByTestId('ds-table-subheader')).toBeInTheDocument();
    });

    it('should render alongside stickyHeader', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          stickyHeader
          subHeaderComponent={BAR}
        />,
      );

      expect(screen.getByTestId('ds-table-subheader')).toBeInTheDocument();
      expect(screen.getByTestId('ds-table-columns')).toBeInTheDocument();
    });

    describe('revealing with the title bar', () => {
      // jsdom reports every height as 0 and never runs the ResizeObserver callback, so the pixel
      // offsets cannot be asserted here — the Chromatic stories in packages/storybook carry that.
      // What is provable is the mechanism: the band is sticky, it animates the same property on the
      // same timing as the title bar, it is opaque, and it sits in the right layer of the stack.

      it('is sticky and animates `top`, so it moves with the title bar rather than jumping', () => {
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={COLUMNS}
            stickyHeader
            subHeaderComponent={BAR}
          />,
        );

        const subHeader = getComputedStyle(
          screen.getByTestId('ds-table-subheader'),
        );

        expect(subHeader.position).toBe('sticky');
        // jsdom does not expand the `transition` shorthand into longhands, so read it as written.
        expect(subHeader.transition).toContain('top');
      });

      it('is opaque, so rows cannot show through it while it is parked', () => {
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={COLUMNS}
            stickyHeader
            subHeaderComponent={BAR}
          />,
        );

        const { backgroundColor } = getComputedStyle(
          screen.getByTestId('ds-table-subheader'),
        );

        // The transparent-colour comparison is the one that discriminates: jsdom reports an unstyled
        // element as `rgba(0, 0, 0, 0)`, not as an empty string, so `not.toBe('')` would pass for a
        // plain div.
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      });

      it('layers below the title bar and above the column header row', () => {
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={COLUMNS}
            stickyHeader
            subHeaderComponent={BAR}
          />,
        );

        const zIndexOf = (testId: string) =>
          Number(getComputedStyle(screen.getByTestId(testId)).zIndex);

        // The title bar has to cover the band sliding out from under it, and the band has to cover
        // the column header row sliding up beneath it. Equal values would leave the order to DOM
        // sequence, which is exactly backwards here.
        expect(zIndexOf('ds-table-header')).toBeGreaterThan(
          zIndexOf('ds-table-subheader'),
        );
        expect(zIndexOf('ds-table-subheader')).toBeGreaterThan(
          zIndexOf('ds-table-columns'),
        );
      });

      it('is not sticky without stickyHeader', () => {
        renderWithProvider(
          <VirtualTable data={DATA} columns={COLUMNS} subHeaderComponent={BAR} />,
        );

        expect(
          getComputedStyle(screen.getByTestId('ds-table-subheader')).position,
        ).not.toBe('sticky');
      });

      it('observes a band that mounts after the table, which is the normal case', () => {
        // A filter bar is revealed by a control in the title bar, so `subHeaderComponent` is
        // usually absent on the table's first render and appears on a click. Measuring only on
        // mount leaves subHeaderHeight at 0, and a hidden band whose height reads 0 parks at
        // exactly the column header row's pinned offset — where its higher z-index makes it cover
        // the column headers instead of the other way round.
        const observed: Element[] = [];
        const original = window.ResizeObserver;
        window.ResizeObserver = class {
          observe = (element: Element) => observed.push(element);
          unobserve = vi.fn();
          disconnect = vi.fn();
        } as unknown as typeof ResizeObserver;

        try {
          const { rerender } = renderWithProvider(
            <VirtualTable data={DATA} columns={COLUMNS} stickyHeader />,
          );

          rerender(
            <VirtualTable
              data={DATA}
              columns={COLUMNS}
              stickyHeader
              subHeaderComponent={BAR}
            />,
          );

          expect(observed).toContain(screen.getByTestId('ds-table-subheader'));
        } finally {
          window.ResizeObserver = original;
        }
      });

      it('observes the band so a wrapping filter bar re-reports its height', () => {
        const observe = vi.fn();
        const original = window.ResizeObserver;
        window.ResizeObserver = class {
          observe = observe;
          unobserve = vi.fn();
          disconnect = vi.fn();
        } as unknown as typeof ResizeObserver;

        try {
          renderWithProvider(
            <VirtualTable
              data={DATA}
              columns={COLUMNS}
              stickyHeader
              subHeaderComponent={BAR}
            />,
          );

          expect(observe).toHaveBeenCalledWith(
            screen.getByTestId('ds-table-subheader'),
          );
        } finally {
          window.ResizeObserver = original;
        }
      });
    });
  });
});
