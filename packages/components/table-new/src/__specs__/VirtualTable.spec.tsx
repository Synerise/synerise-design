import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen, within } from '@testing-library/react';

import { DEFAULT_CELL_HEIGHT } from '../Table.const';
import { VirtualTable } from '../VirtualTable';
import { COLUMNS, DATA, type DataType, SORTABLE_COLUMNS } from './data';

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

    describe('scroll retention when data changes', () => {
      const INFINITE_SCROLL_WITH_PREV_PAGE = {
        hasMore: true,
        hasError: false,
        isLoading: false,
        prevPage: { hasMore: false, hasError: false, isLoading: false },
        onScrollTopReach: vi.fn(),
      };
      const rows = (keys: string[]): DataType[] =>
        keys.map((key) => ({
          key,
          name: `Name ${key}`,
          age: 30,
          address: `Address ${key}`,
        }));

      const originalScrollTo = Element.prototype.scrollTo;
      const scrollTo = vi.fn();

      beforeEach(() => {
        Element.prototype.scrollTo = scrollTo;
      });
      afterEach(() => {
        Element.prototype.scrollTo = originalScrollTo;
        scrollTo.mockReset();
      });

      const renderWithData = (initialData: DataType[]) => {
        const { rerender } = renderWithProvider(
          <VirtualTable
            data={initialData}
            columns={COLUMNS}
            rowKey="key"
            stickyHeader
            infiniteScroll={INFINITE_SCROLL_WITH_PREV_PAGE}
          />,
        );
        scrollTo.mockClear();

        return (nextData: DataType[]) =>
          rerender(
            <VirtualTable
              data={nextData}
              columns={COLUMNS}
              rowKey="key"
              stickyHeader
              infiniteScroll={INFINITE_SCROLL_WITH_PREV_PAGE}
            />,
          );
      };

      it('scrolls back to the previously first row when a previous page is prepended', () => {
        const setData = renderWithData(rows(['3', '4', '5', '6']));

        setData(rows(['1', '2', '3', '4', '5', '6']));

        expect(scrollTo).toHaveBeenCalledWith(
          expect.objectContaining({ top: 2 * (DEFAULT_CELL_HEIGHT + 1) }),
        );
      });

      it('does not scroll when the same rows are re-sorted', () => {
        // Z-A -> A-Z: the old first row lands at index 3, which the prepend restore used to
        // treat as "3 rows were loaded above" and jump to
        const setData = renderWithData(rows(['4', '5', '6', '1', '2', '3']));

        setData(rows(['1', '2', '3', '4', '5', '6']));

        expect(scrollTo).not.toHaveBeenCalled();
      });

      it('does not scroll when a search or filter replaces the rows', () => {
        const setData = renderWithData(rows(['4', '5', '6']));

        setData(rows(['1', '2', '4', '7']));

        expect(scrollTo).not.toHaveBeenCalled();
      });

      it('does not scroll when the old first row sits after new rows but the tail changed', () => {
        const setData = renderWithData(rows(['3', '4', '5']));

        setData(rows(['1', '2', '3', '9', '8']));

        expect(scrollTo).not.toHaveBeenCalled();
      });
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

  describe('expandedRowRender', () => {
    const ROW_HEIGHT = 50;
    const CONTENT_HEIGHT = 120;

    const VIEWPORT_HEIGHT = 600;

    const getRow = (index: number) =>
      document.querySelector<HTMLElement>(`tr[data-row-index="${index}"]`);

    // jsdom has no layout, so without a viewport height the virtualizer yields no items and
    // VirtualTable falls back to the non-virtual body.
    const mockHeights = (contentHeight: number) =>
      function (this: HTMLElement) {
        if (this.dataset.rowExpandedContent === 'true') {
          return contentHeight;
        }
        return this.dataset.rowIndex !== undefined
          ? ROW_HEIGHT
          : VIEWPORT_HEIGHT;
      };

    let offsetHeight: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      offsetHeight = vi
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockImplementation(mockHeights(CONTENT_HEIGHT));
    });

    afterEach(() => {
      offsetHeight.mockRestore();
    });

    it('renders expanded content row below an expanded parent', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: ['1'],
            expandedRowRender: (record) => (
              <div data-testid="expanded-detail">Detail: {record.name}</div>
            ),
          }}
        />,
      );

      expect(getRow(0)?.style.position).toBe('absolute');
      expect(screen.getByTestId('expanded-detail')).toHaveTextContent(
        'Detail: Mike',
      );
      expect(
        screen
          .getByTestId('expanded-detail')
          .closest('[data-row-expanded-content="true"]'),
      ).toHaveAttribute('data-key', '1-expanded');
    });

    it('does not render expanded content for non-expanded rows', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: [],
            expandedRowRender: () => <div data-testid="expanded-detail" />,
          }}
        />,
      );

      expect(screen.queryByTestId('expanded-detail')).not.toBeInTheDocument();
    });

    it('expanded content cell spans every visible column', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: ['1'],
            expandedRowRender: () => <div>detail</div>,
          }}
        />,
      );

      const cell = document.querySelector(
        '[data-row-expanded-content="true"] td',
      );
      expect(cell).toHaveAttribute('colspan', String(COLUMNS.length));
    });

    it('suppresses expanded content when rowExpandable returns false', () => {
      renderWithProvider(
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys: ['1'],
            expandedRowRender: () => <div data-testid="detail">detail</div>,
            rowExpandable: (record) => record.key !== '1',
          }}
        />,
      );

      expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
    });

    describe('row measurement', () => {
      const renderTable = (expandedRowKeys: string[]) => (
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          expandable={{
            expandedRowKeys,
            expandedRowRender: () => <div>detail</div>,
          }}
        />
      );

      it('places the content row directly below its parent row', () => {
        renderWithProvider(renderTable(['1']));

        const content = document.querySelector<HTMLElement>(
          '[data-row-expanded-content="true"]',
        );
        expect(content?.style.top).toBe(`${ROW_HEIGHT}px`);
      });

      it('pushes the following rows down by the content height', () => {
        renderWithProvider(renderTable(['1']));

        expect(getRow(1)?.style.top).toBe(`${ROW_HEIGHT + CONTENT_HEIGHT}px`);
        expect(getRow(2)?.style.top).toBe(
          `${2 * ROW_HEIGHT + CONTENT_HEIGHT}px`,
        );
      });

      it('restores the row height when the row collapses', () => {
        const { rerender } = renderWithProvider(renderTable(['1']));

        rerender(renderTable([]));

        expect(getRow(1)?.style.top).toBe(`${ROW_HEIGHT}px`);
      });

      it('re-measures when the expanded content resizes', () => {
        const observers: Array<{
          callback: ResizeObserverCallback;
          targets: Element[];
        }> = [];
        const original = window.ResizeObserver;
        window.ResizeObserver = class {
          private entry: { callback: ResizeObserverCallback; targets: Element[] };
          constructor(callback: ResizeObserverCallback) {
            this.entry = { callback, targets: [] };
            observers.push(this.entry);
          }
          observe(target: Element) {
            this.entry.targets.push(target);
          }
          unobserve() {}
          disconnect() {
            this.entry.targets = [];
          }
        } as unknown as typeof ResizeObserver;

        try {
          renderWithProvider(renderTable(['1']));
          const content = document.querySelector<HTMLElement>(
            '[data-row-expanded-content="true"]',
          );
          const observer = observers.find((entry) =>
            entry.targets.includes(content as Element),
          );
          expect(observer).toBeDefined();

          offsetHeight.mockImplementation(mockHeights(CONTENT_HEIGHT * 2));
          act(() => {
            observer?.callback([], {} as ResizeObserver);
          });

          expect(getRow(1)?.style.top).toBe(
            `${ROW_HEIGHT + CONTENT_HEIGHT * 2}px`,
          );
        } finally {
          window.ResizeObserver = original;
        }
      });
    });

    describe('toggling', () => {
      it('expandRowByClick toggles the content row without expandedRowKeys', () => {
        const onExpand = vi.fn();
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={COLUMNS}
            expandable={{
              expandRowByClick: true,
              onExpand,
              expandedRowRender: (record) => (
                <div data-testid="detail">{record.name}</div>
              ),
            }}
          />,
        );

        fireEvent.click(getRow(0) as HTMLElement);

        expect(screen.getByTestId('detail')).toHaveTextContent('Mike');
        expect(onExpand).toHaveBeenLastCalledWith(true, DATA[0]);
        expect(getRow(1)?.style.top).toBe(`${ROW_HEIGHT + CONTENT_HEIGHT}px`);

        fireEvent.click(getRow(0) as HTMLElement);

        expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
        expect(onExpand).toHaveBeenLastCalledWith(false, DATA[0]);
        expect(getRow(1)?.style.top).toBe(`${ROW_HEIGHT}px`);
      });

      it('expandRowByClick does nothing for a row rowExpandable rejects', () => {
        const onExpand = vi.fn();
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={COLUMNS}
            expandable={{
              expandRowByClick: true,
              onExpand,
              rowExpandable: (record) => record.key !== '1',
              expandedRowRender: () => <div data-testid="detail" />,
            }}
          />,
        );

        fireEvent.click(getRow(0) as HTMLElement);

        expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
        expect(onExpand).not.toHaveBeenCalled();
      });

      it('a cell calling row.toggleExpanded() reveals the content row', () => {
        const columns: typeof COLUMNS = [
          ...COLUMNS,
          {
            id: 'expander',
            header: '',
            cell: ({ row }) => (
              <button type="button" onClick={() => row.toggleExpanded()}>
                toggle {row.original.key}
              </button>
            ),
          },
        ];
        renderWithProvider(
          <VirtualTable
            data={DATA}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <div data-testid="detail">{record.name}</div>
              ),
            }}
          />,
        );

        fireEvent.click(screen.getByRole('button', { name: 'toggle 2' }));

        expect(screen.getByTestId('detail')).toHaveTextContent('John');
        expect(getRow(2)?.style.top).toBe(
          `${2 * ROW_HEIGHT + CONTENT_HEIGHT}px`,
        );
      });
    });

    describe('scroll compensation when a row resizes', () => {
      // Past row 1's body-relative start, so the virtualizer's default check would treat row 1
      // as above the viewport wherever the body actually sits.
      const SCROLL_TOP = 2 * ROW_HEIGHT;
      // Where the body sits relative to the top of the scroll viewport. Negative means it has
      // been scrolled past; row 1 starts ROW_HEIGHT below the body's top.
      let bodyTop: number;
      let scrollTo: ReturnType<typeof vi.fn>;
      let originalScrollTo: typeof HTMLElement.prototype.scrollTo;
      let boundingRect: ReturnType<typeof vi.spyOn>;
      let scrollTop: ReturnType<typeof vi.spyOn>;

      beforeEach(() => {
        bodyTop = 0;
        originalScrollTo = HTMLElement.prototype.scrollTo;
        scrollTo = vi.fn();
        HTMLElement.prototype.scrollTo =
          scrollTo as unknown as typeof HTMLElement.prototype.scrollTo;
        boundingRect = vi
          .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
          .mockImplementation(function (this: HTMLElement) {
            const top = this.classList.contains('ds-table-body') ? bodyTop : 0;
            return { top, bottom: top, left: 0, right: 0, width: 0, height: 0 } as DOMRect;
          });
        scrollTop = vi
          .spyOn(Element.prototype, 'scrollTop', 'get')
          .mockReturnValue(SCROLL_TOP);
      });

      afterEach(() => {
        HTMLElement.prototype.scrollTo = originalScrollTo;
        boundingRect.mockRestore();
        scrollTop.mockRestore();
      });

      const renderTable = (
        expandedRowKeys: string[],
        infiniteScroll?: React.ComponentProps<typeof VirtualTable>['infiniteScroll'],
      ) => (
        <VirtualTable
          data={DATA}
          columns={COLUMNS}
          infiniteScroll={infiniteScroll}
          expandable={{
            expandedRowKeys,
            expandedRowRender: () => <div>detail</div>,
          }}
        />
      );

      // Mounts with the body at the viewport top, so the rows' first measurements cause no
      // compensation, then moves the body and expands row 1.
      const expandRowOne = (
        bodyTopOnExpand: number,
        infiniteScroll?: React.ComponentProps<typeof VirtualTable>['infiniteScroll'],
      ) => {
        const { rerender } = renderWithProvider(renderTable([], infiniteScroll));
        scrollTo.mockClear();
        bodyTop = bodyTopOnExpand;
        rerender(renderTable(['2'], infiniteScroll));
      };

      it('scrolls by the size change when the row starts above the viewport', () => {
        expandRowOne(-(ROW_HEIGHT + 10));

        expect(scrollTo).toHaveBeenCalledWith(
          expect.objectContaining({ top: SCROLL_TOP + CONTENT_HEIGHT }),
        );
      });

      it('keeps the scroll position when the row is visible below the content preceding the body', () => {
        expandRowOne(-(ROW_HEIGHT - 10));

        expect(scrollTo).not.toHaveBeenCalled();
      });

      it('counts the top infinite-loader row in the row position', () => {
        expandRowOne(-(ROW_HEIGHT + 10), {
          hasMore: true,
          hasError: false,
          isLoading: false,
          prevPage: { hasMore: true, hasError: false, isLoading: false },
          onScrollTopReach: vi.fn(),
        });

        expect(scrollTo).not.toHaveBeenCalled();
      });

      it('never scrolls when the table body cannot be found', () => {
        const originalQuerySelector = Element.prototype.querySelector;
        const querySelector = vi
          .spyOn(Element.prototype, 'querySelector')
          .mockImplementation(function (this: Element, selector: string) {
            return selector === '.ds-table-body'
              ? null
              : originalQuerySelector.call(this, selector);
          });

        try {
          expandRowOne(-(ROW_HEIGHT + 10));

          expect(scrollTo).not.toHaveBeenCalled();
        } finally {
          querySelector.mockRestore();
        }
      });
    });
  });
});
