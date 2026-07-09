import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { SearchInput } from '@synerise/ds-search';
import { Table } from '@synerise/ds-table-new';
import { type ColumnDef } from '@tanstack/react-table';

import StoriesMeta from './Table.stories';

/**
 * Interaction tests for the table-new sorting / searching / pagination / expanding behaviors and
 * their combinations. Hidden from the default Storybook sidebar via the `visualtests` tag
 * (configured `defaultFilterSelection: 'exclude'` in .storybook/main.ts).
 */

type TestRow = {
  key: string;
  name: string;
  score: number;
  children?: TestRow[];
};

const ROWS: TestRow[] = [
  { key: '1', name: 'Alice', score: 30 },
  { key: '2', name: 'Bob', score: 10 },
  { key: '3', name: 'Charlie', score: 50 },
  { key: '4', name: 'Diana', score: 20 },
  { key: '5', name: 'Evan', score: 40 },
  { key: '6', name: 'Fiona', score: 60 },
];

const COLUMNS: ColumnDef<TestRow>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name', enableSorting: true },
  { id: 'score', accessorKey: 'score', header: 'Score', enableSorting: true },
];

const EXPANDABLE_ROWS: TestRow[] = [
  {
    key: '1',
    name: 'Parent A',
    score: 1,
    children: [{ key: '1-1', name: 'Child A1', score: 11 }],
  },
  { key: '2', name: 'Parent B', score: 2 },
];

const matchesName = (query: string, row: TestRow) =>
  row.name.toLowerCase().includes(query.toLowerCase());

const PAGINATION_TESTID = 'ds-table-pagination';

export default {
  ...StoriesMeta,
  title: 'Components/TableNew/Tests',
  component: Table,
  tags: ['visualtests'],
};

type Story = {
  args?: Record<string, unknown>;
  render?: (args: Record<string, unknown>) => React.ReactElement;
  play?: (context: { canvasElement: HTMLElement }) => Promise<void>;
};

const firstBodyRowText = (canvas: ReturnType<typeof within>) => {
  // rows[0] is the header row; rows[1] is the first data row.
  const rows = canvas.getAllByRole('row');
  return rows[1].textContent ?? '';
};

// The column sorter is a dropdown menu (Ascending / Descending / Clear) rendered in a portal —
// open it, then pick the direction.
const sortColumnAscending = async (
  canvasElement: HTMLElement,
  columnIndex: number,
) => {
  const canvas = within(canvasElement);
  const sorters = await canvas.findAllByTestId('table-common-sorter-button');
  await userEvent.click(sorters[columnIndex]);
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(await body.findByText('Sort ascending'));
};

// Unique, common-prefixed rows for the page-reset combination: a query that matches them all keeps
// the order, so the row that was on page 2 stays off page 1 (proving the reset, not the filter).
const USERS: TestRow[] = Array.from({ length: 6 }, (_, i) => ({
  key: String(i + 1),
  name: `User${i + 1}`,
  score: (i + 1) * 10,
}));

// --- Internal sorting -------------------------------------------------------

export const InternalSorting: Story = {
  args: { data: ROWS, columns: COLUMNS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Sort ascending by Score (second column) → lowest score (Bob, 10) first.
    await sortColumnAscending(canvasElement, 1);
    await waitFor(() => expect(firstBodyRowText(canvas)).toContain('Bob'));
  },
};

// --- Internal (built-in) search --------------------------------------------

export const InternalSearch: Story = {
  args: {
    data: ROWS,
    columns: COLUMNS,
    matchesSearchQuery: matchesName,
    searchProps: { placeholder: 'Search' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'Charlie');
    await waitFor(() => {
      expect(canvas.getByText('Charlie')).toBeInTheDocument();
      expect(canvas.queryByText('Alice')).not.toBeInTheDocument();
    });
  },
};

// --- External (consumer-controlled) search ---------------------------------

export const ExternalSearch: Story = {
  render: () => {
    const ExternalSearchExample = () => {
      const [query, setQuery] = useState('');
      return (
        <Table
          data={ROWS}
          columns={COLUMNS}
          filterData={query ? (row) => matchesName(query, row) : undefined}
          searchComponent={
            <SearchInput
              placeholder="Custom search"
              clearTooltip="Clear"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
            />
          }
        />
      );
    };
    return <ExternalSearchExample />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'Diana');
    await waitFor(() => {
      expect(canvas.getByText('Diana')).toBeInTheDocument();
      expect(canvas.queryByText('Alice')).not.toBeInTheDocument();
    });
  },
};

// --- Internal pagination ----------------------------------------------------

export const InternalPagination: Story = {
  args: { data: ROWS, columns: COLUMNS, pagination: { pageSize: 2 } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // page 1 → Alice, Bob
    expect(canvas.getByText('Alice')).toBeInTheDocument();
    expect(canvas.queryByText('Charlie')).not.toBeInTheDocument();
    // go to page 2 → Charlie, Diana
    const pager = within(canvas.getByTestId(PAGINATION_TESTID));
    await userEvent.click(pager.getByText('2'));
    await waitFor(() => {
      expect(canvas.getByText('Charlie')).toBeInTheDocument();
      expect(canvas.queryByText('Alice')).not.toBeInTheDocument();
    });
  },
};

// --- External (server-side) pagination: data sliced outside the table -------

export const ServerSidePagination: Story = {
  render: () => {
    const ServerSideExample = () => {
      const pageSize = 2;
      const [page, setPage] = useState(1);
      const onChange = fn(); // spy so the test can assert the refetch handler fired
      const pageRows = ROWS.slice((page - 1) * pageSize, page * pageSize);
      return (
        <Table
          data={pageRows}
          columns={COLUMNS}
          pagination={{
            current: page,
            pageSize,
            total: ROWS.length,
            onChange: (nextPage: number) => {
              onChange(nextPage);
              setPage(nextPage);
            },
          }}
        />
      );
    };
    return <ServerSideExample />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // page 1 page-slice → Alice, Bob; page count derives from the server total (6/2 = 3 pages)
    expect(canvas.getByText('Alice')).toBeInTheDocument();
    const pager = within(canvas.getByTestId(PAGINATION_TESTID));
    expect(pager.getByText('3')).toBeInTheDocument();
    // navigating refetches (consumer re-slices) → page 2 shows Charlie/Diana
    await userEvent.click(pager.getByText('2'));
    await waitFor(() => {
      expect(canvas.getByText('Charlie')).toBeInTheDocument();
      expect(canvas.queryByText('Alice')).not.toBeInTheDocument();
    });
  },
};

// --- Expanding --------------------------------------------------------------

export const Expanding: Story = {
  args: {
    data: EXPANDABLE_ROWS,
    columns: COLUMNS,
    expandable: { childrenColumnName: 'children', expandRowByClick: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByText('Child A1')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByText('Parent A'));
    // getAllByText: the expanded child row can be rendered in more than one layer (e.g. a
    // measurement copy), so assert at least one is present rather than exactly one.
    await waitFor(() =>
      expect(canvas.getAllByText('Child A1').length).toBeGreaterThan(0),
    );
  },
};

// --- Combination: change page → search → resets to first page ---------------

export const PageThenSearchResetsToFirstPage: Story = {
  args: {
    data: USERS,
    columns: COLUMNS,
    pagination: { pageSize: 2 },
    matchesSearchQuery: matchesName,
    searchProps: { placeholder: 'Search' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // go to page 2 (User3/User4)
    const pager = within(canvas.getByTestId(PAGINATION_TESTID));
    await userEvent.click(pager.getByText('2'));
    await waitFor(() =>
      expect(canvas.queryByText('User1')).not.toBeInTheDocument(),
    );
    // 'User' matches every row, so order is preserved — page must reset to 1 (User1 back, the
    // page-2 row User3 gone). This isolates the page reset from the filtering itself.
    await userEvent.type(canvas.getByRole('textbox'), 'User');
    await waitFor(() => {
      expect(canvas.getByText('User1')).toBeInTheDocument();
      expect(canvas.queryByText('User3')).not.toBeInTheDocument();
    });
  },
};

// --- Combination: sort → paginate keeps the sort applied --------------------

export const SortThenPaginateKeepsOrder: Story = {
  args: { data: ROWS, columns: COLUMNS, pagination: { pageSize: 2 } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // sort ascending by Score → Bob(10), Diana(20) | Alice(30)...
    await sortColumnAscending(canvasElement, 1);
    await waitFor(() => expect(firstBodyRowText(canvas)).toContain('Bob'));
    // page 2 of the sorted set → Alice(30), Evan(40)
    const pager = within(canvas.getByTestId(PAGINATION_TESTID));
    await userEvent.click(pager.getByText('2'));
    await waitFor(() => {
      expect(canvas.getByText('Alice')).toBeInTheDocument();
      expect(canvas.queryByText('Bob')).not.toBeInTheDocument();
    });
  },
};

// --- No results: the pagination footer is not rendered ----------------------

// Empty dataSource → nothing to page through, so the pagination footer must be absent even though
// pagination is enabled.
export const EmptyDataNoPagination: Story = {
  args: { data: [], columns: COLUMNS, pagination: { pageSize: 2 } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByTestId(PAGINATION_TESTID)).not.toBeInTheDocument();
  },
};

// Searching to zero matches → the pagination footer disappears, then returns once the query is
// cleared and rows come back.
export const SearchToZeroHidesPagination: Story = {
  args: {
    data: ROWS,
    columns: COLUMNS,
    pagination: { pageSize: 2 },
    matchesSearchQuery: matchesName,
    searchProps: { placeholder: 'Search', clearTooltip: 'Clear' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Pagination is present with results.
    expect(canvas.getByTestId(PAGINATION_TESTID)).toBeInTheDocument();
    // A query that matches no row leaves zero results → pagination is removed.
    const searchBox = canvas.getByRole('textbox');
    await userEvent.type(searchBox, 'zzzznomatch');
    await waitFor(() => {
      expect(canvas.queryByText('Alice')).not.toBeInTheDocument();
      expect(canvas.queryByTestId(PAGINATION_TESTID)).not.toBeInTheDocument();
    });
    // Clearing the query restores rows → pagination comes back.
    await userEvent.clear(searchBox);
    await waitFor(() => {
      expect(canvas.getByTestId(PAGINATION_TESTID)).toBeInTheDocument();
    });
  },
};
