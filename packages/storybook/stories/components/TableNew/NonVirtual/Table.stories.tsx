import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import { Box, Flex } from '@synerise/ds-flex-box';
import { SearchInput } from '@synerise/ds-search';
import {
  SELECTION_ALL,
  SELECTION_INVERT,
  Table,
  type TableRef,
} from '@synerise/ds-table-new';

import { BOOLEAN_CONTROL, REACT_NODE_AS_STRING } from '../../../utils';
import {
  COLUMNS_ALL,
  COLUMNS_MULTIPLE_SORT,
  RAW_TABLE_COLUMNS,
  RESPONSIVE_COLUMNS,
} from '../data/columns';
import { type DataSourceItem, TOOLTIP_COLUMNS } from '../data/columns.tooltips';
import { DATA_SOURCE, DATA_SOURCE_FULL } from '../data/tableData';

export default {
  component: Table,
  title: 'Components/TableNew/Examples/NonVirtual',
  tags: ['autodocs', 'new'],
  parameters: {
    layout: 'padded',
  },
  args: {},
  argTypes: {
    columns: { control: false },
    data: { control: false },
    texts: { control: false },

    enableVirtualization: BOOLEAN_CONTROL,
    headerWithBorderTop: BOOLEAN_CONTROL,
    hideColumnNames: BOOLEAN_CONTROL,
    hideTitleBar: BOOLEAN_CONTROL,
    hideTitlePart: BOOLEAN_CONTROL,
    isCounterLoading: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,

    itemsMenu: REACT_NODE_AS_STRING,
    headerButton: REACT_NODE_AS_STRING,
    title: REACT_NODE_AS_STRING,
    filterComponent: REACT_NODE_AS_STRING,
    searchComponent: REACT_NODE_AS_STRING,
  },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE_FULL,
    columns: COLUMNS_ALL,
  },
  parameters: {
    docs: {
      source: {
        code: `<Table data={data} columns={columns} />`,
      },
    },
  },
};

export const WithServerSidePagination: StoryObj<typeof Table> = {
  render: () => {
    const PAGE_SIZE = 10;
    const ServerSideExample = () => {
      const [page, setPage] = useState(1);
      const [pageSize, setPageSize] = useState(PAGE_SIZE);
      // Emulates server-side paging: only the current page is handed to the table, along with the
      // grand `total`. In a real app these rows come from an API keyed by page/pageSize.
      const pageRows = DATA_SOURCE.slice(
        (page - 1) * pageSize,
        page * pageSize,
      );
      return (
        <Table
          data={pageRows}
          columns={RESPONSIVE_COLUMNS}
          title="Users"
          pagination={{
            current: page,
            pageSize,
            total: DATA_SOURCE.length,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (nextPage: number, nextPageSize: number) => {
              setPage(nextPage);
              setPageSize(nextPageSize);
            },
          }}
        />
      );
    };
    return <ServerSideExample />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Server-side pagination: the consumer fetches one page at a time and passes that page as `data` plus the server `total`. The table pages against `total` (not the local rows) and calls `onChange` to fetch the next page / size.',
      },
    },
  },
};

export const WithSelection: StoryObj<typeof Table> = {
  args: {
    ...Default.args,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={data}
  columns={columns}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const WithLimitedSelection: StoryObj<typeof Table> = {
  args: {
    ...Default.args,
    selectionConfig: {
      limit: 5,
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={data}
  columns={columns}
  selectionConfig={{
    limit: 5,
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const WithGlobalSelection: StoryObj<typeof Table> = {
  render: ({ selectionConfig, ...args }) => {
    const [globalAllSelected, setGlobalAllSelected] = useState(
      !!selectionConfig?.globalSelected,
    );
    const handleGlobalSelectionChange = useCallback((newState: boolean) => {
      selectionConfig?.globalSelectionOnChange?.(newState);
      setGlobalAllSelected(newState);
    }, []);
    const selectionConfigMemoised = useMemo(
      () => ({
        ...selectionConfig,
        globalSelected: globalAllSelected,
        globalSelectionOnChange: handleGlobalSelectionChange,
      }),
      [globalAllSelected, handleGlobalSelectionChange],
    );
    return <Table selectionConfig={selectionConfigMemoised} {...args} />;
  },
  args: {
    ...Default.args,
    selectionConfig: {
      globalSelectionOnChange: (...rest) => {
        console.log('sel', rest);
      },
      globalSelected: false,
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `const MyList = () => {
  const [globalAllSelected, setGlobalAllSelected] = useState(false);

  return (
    <Table
      data={data}
      columns={columns}
      selectionConfig={{
        globalSelected: globalAllSelected,
        globalSelectionOnChange: setGlobalAllSelected,
        onChange: (selectedRowKeys, selectedRows) =>
          console.log('sel', selectedRowKeys, selectedRows),
        selections: [],
      }}
    />
  );
};`,
      },
    },
  },
};

export const MultipleColumnSort: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: COLUMNS_MULTIPLE_SORT,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `// Multi-column sort: column meta.enableMultiSort must be true.
// Hold Shift while clicking sorters to add a secondary / tertiary sort.
<Table
  data={data}
  columns={columns}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const ResponsiveColumns: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `// Columns are sized via meta.minWidth / meta.maxWidth, letting the table
// distribute remaining space across columns as the viewport changes.
<Table
  data={data}
  columns={columns}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const Empty: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: RESPONSIVE_COLUMNS,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={[]}
  columns={columns}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const EmptyCustom: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: RESPONSIVE_COLUMNS,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={[]}
  columns={columns}
  emptyDataComponent={<p>Empty custom</p>}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const LoadingData: StoryObj<typeof Table> = {
  args: {
    data: [],
    isLoading: true,
    columns: RESPONSIVE_COLUMNS,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `// data is empty but columns are known -> skeleton rows are rendered
// using the real column layout while isLoading is true.
<Table
  data={[]}
  isLoading
  columns={columns}
  emptyDataComponent={<p>Empty custom</p>}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};
export const LoadingConfig: StoryObj<typeof Table> = {
  args: {
    data: [],
    columns: [],
    isLoading: true,
    emptyDataComponent: <p>Empty custom</p>,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `// Both data and columns are still loading -> Table falls back to a
// default skeleton-column layout so the body has shape while loading.
<Table
  data={[]}
  columns={[]}
  isLoading
  emptyDataComponent={<p>Empty custom</p>}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const RawTable: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RAW_TABLE_COLUMNS,
  },
  parameters: {
    docs: {
      source: {
        code: `// Minimal Table with raw, unstyled columns — no selection, no title bar
// customizations. Useful as a baseline for column-config experiments.
<Table data={data} columns={columns} />`,
      },
    },
  },
};

export const WithMaxHeight: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RAW_TABLE_COLUMNS,
    maxHeight: 400,
  },
  parameters: {
    docs: {
      source: {
        code: `// Minimal Table with raw, unstyled columns — no selection, no title bar
// and body section scroll
<Table data={data} columns={columns} maxHeight={400} />`,
      },
    },
  },
};

export const WithTooltips: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: TOOLTIP_COLUMNS,
    title: 'Tooltips demo',
    getRowTooltipProps: (row: DataSourceItem) =>
      row.disabled ? { title: `Row ${row.name} is disabled` } : false,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
      getSelectionTooltipProps: (row: DataSourceItem) =>
        row.unavailable
          ? { title: `Cannot select ${row.name} — unavailable` }
          : false,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={data}
  columns={columns}
  title="Tooltips demo"
  getRowTooltipProps={(row) =>
    row.disabled ? { title: \`Row \${row.name} is disabled\` } : false
  }
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
    getSelectionTooltipProps: (row) =>
      row.unavailable
        ? { title: \`Cannot select \${row.name} — unavailable\` }
        : false,
  }}
/>`,
      },
    },
  },
};

export const WithBuiltInSearch: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    title: 'Users',
    matchesSearchQuery: (query, row) =>
      row.name.toLowerCase().includes(query.toLowerCase()) ||
      row.city.toLowerCase().includes(query.toLowerCase()),
    searchProps: {
      placeholder: 'Search by name or city...',
      clearTooltip: 'Clear search',
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  data={data}
  columns={columns}
  title="Users"
  matchesSearchQuery={(query, row) =>
    row.name.toLowerCase().includes(query.toLowerCase()) ||
    row.city.toLowerCase().includes(query.toLowerCase())
  }
  searchProps={{
    placeholder: 'Search by name or city...',
    clearTooltip: 'Clear search',
  }}
/>`,
      },
    },
  },
};

export const WithBuiltInSearchAndSelection: StoryObj<typeof Table> = {
  args: {
    ...WithBuiltInSearch.args,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `// Selection operates on the full \`data\` array — rows that are hidden
// by the search query stay selected and are restored when the query clears.
<Table
  data={data}
  columns={columns}
  title="Users"
  matchesSearchQuery={(query, row) =>
    row.name.toLowerCase().includes(query.toLowerCase()) ||
    row.city.toLowerCase().includes(query.toLowerCase())
  }
  searchProps={{
    placeholder: 'Search by name or city...',
    clearTooltip: 'Clear search',
  }}
  selectionConfig={{
    onChange: (selectedRowKeys, selectedRows) =>
      console.log('sel', selectedRowKeys, selectedRows),
    selections: [SELECTION_ALL, SELECTION_INVERT],
  }}
/>`,
      },
    },
  },
};

export const WithCustomSearch: StoryObj<typeof Table> = {
  render: (args) => {
    const [query, setQuery] = useState('');
    return (
      <Table
        {...args}
        filterData={
          query
            ? (row) => row.name.toLowerCase().includes(query.toLowerCase())
            : undefined
        }
        searchComponent={
          <SearchInput
            placeholder="Custom search..."
            clearTooltip="Clear"
            onChange={setQuery}
            value={query}
            onClear={() => setQuery('')}
            closeOnClickOutside
          />
        }
      />
    );
  },
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    title: 'Custom search',
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `const MyList = () => {
  const [query, setQuery] = useState('');

  return (
    <Table
      data={data}
      columns={columns}
      title="Custom search"
      filterData={
        query
          ? (row) => row.name.toLowerCase().includes(query.toLowerCase())
          : undefined
      }
      searchComponent={
        <SearchInput
          placeholder="Custom search..."
          clearTooltip="Clear"
          onChange={setQuery}
          value={query}
          onClear={() => setQuery('')}
          closeOnClickOutside
        />
      }
      selectionConfig={{
        onChange: (selectedRowKeys, selectedRows) =>
          console.log('sel', selectedRowKeys, selectedRows),
        selections: [SELECTION_ALL, SELECTION_INVERT],
      }}
    />
  );
};`,
      },
    },
  },
};

export const WithRowHighlight: StoryObj<typeof Table> = {
  render: (args) => {
    const tableRef = useRef<TableRef>(null);

    return (
      <Flex flexDirection="column">
        <Box mb={16}>
          <Flex>
            <Box mr={8}>
              <Button onClick={() => tableRef.current?.highlightRow('1')}>
                Highlight row 1
              </Button>
            </Box>
            <Box mr={8}>
              <Button onClick={() => tableRef.current?.highlightRow('3')}>
                Highlight row 3
              </Button>
            </Box>
            <Box mr={8}>
              <Button
                onClick={() => {
                  tableRef.current?.highlightRow('1');
                  tableRef.current?.highlightRow('2');
                  tableRef.current?.highlightRow('3');
                }}
              >
                Highlight 1, 2, 3
              </Button>
            </Box>
            <Box mr={8}>
              <Button
                onClick={() =>
                  tableRef.current?.highlightRow('5', { duration: 2000 })
                }
              >
                Highlight row 5 (2s)
              </Button>
            </Box>
          </Flex>
        </Box>
        <Table {...args} tableRef={tableRef} />
      </Flex>
    );
  },
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    title: 'Row highlight',
    rowKey: 'key',
  },
  parameters: {
    docs: {
      source: {
        code: `const MyList = () => {
  const tableRef = useRef<TableRef>(null);

  return (
    <>
      <Button onClick={() => tableRef.current?.highlightRow('1')}>
        Highlight row 1
      </Button>
      <Button onClick={() => {
        tableRef.current?.highlightRow('1');
        tableRef.current?.highlightRow('2');
        tableRef.current?.highlightRow('3');
      }}>
        Highlight multiple
      </Button>
      <Button onClick={() => tableRef.current?.highlightRow('5', { duration: 2000 })}>
        Highlight with custom duration
      </Button>
      <Table data={data} columns={columns} tableRef={tableRef} rowKey="key" />
    </>
  );
};`,
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Expandable rows
//
// Two patterns live on plain Table (vs. tree-child rows which work on
// VirtualTable + Table alike — see VirtualTable's `ExpandableRows` story
// and the dedicated TreeTable component). These stories demonstrate
// Table-only `expandedRowRender`:
//   - Click anywhere on a row to reveal a custom ReactNode below it.
//   - Gate which rows can expand with `rowExpandable`.
// ---------------------------------------------------------------------------

export const ExpandedRowRender: StoryObj<typeof Table> = {
  render: (args) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    return (
      <Table
        {...args}
        expandable={{
          expandRowByClick: true,
          expandedRowKeys,
          onExpand: (expanded, record) =>
            setExpandedRowKeys((prev) =>
              expanded
                ? [...prev, String((record as { key: string }).key)]
                : prev.filter(
                    (k) => k !== String((record as { key: string }).key),
                  ),
            ),
          expandedRowRender: (record) => (
            <Box p={16}>
              <Flex flexDirection="column">
                <strong>{(record as { name: string }).name}</strong>
                <span>City: {(record as { city: string }).city}</span>
                <span>Address: {(record as { address: string }).address}</span>
              </Flex>
            </Box>
          ),
        }}
      />
    );
  },
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    rowKey: 'key',
    title: 'Click any row to reveal details',
  },
  parameters: {
    docs: {
      source: {
        code: `const MyList = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  return (
    <Table
      data={data}
      columns={columns}
      rowKey="key"
      title="Click any row to reveal details"
      expandable={{
        expandRowByClick: true,
        expandedRowKeys,
        onExpand: (expanded, record) =>
          setExpandedRowKeys((prev) =>
            expanded ? [...prev, record.key] : prev.filter((k) => k !== record.key),
          ),
        expandedRowRender: (record) => (
          <Box p={16}>
            <Flex flexDirection="column">
              <strong>{record.name}</strong>
              <span>City: {record.city}</span>
              <span>Address: {record.address}</span>
            </Flex>
          </Box>
        ),
      }}
    />
  );
};`,
      },
    },
  },
};

export const ExpandedRowRenderWithRowExpandable: StoryObj<typeof Table> = {
  render: (args) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    return (
      <Table
        {...args}
        expandable={{
          expandRowByClick: true,
          // Rows flagged `disabled` cannot be expanded — the row click is a no-op
          // and `expandedRowRender` is skipped for those records.
          rowExpandable: (record) =>
            !(record as { disabled?: boolean }).disabled,
          expandedRowKeys,
          onExpand: (expanded, record) =>
            setExpandedRowKeys((prev) =>
              expanded
                ? [...prev, String((record as { key: string }).key)]
                : prev.filter(
                    (k) => k !== String((record as { key: string }).key),
                  ),
            ),
          expandedRowRender: (record) => (
            <Box p={16}>
              Details for <strong>{(record as { name: string }).name}</strong>
            </Box>
          ),
        }}
      />
    );
  },
  args: {
    data: DATA_SOURCE,
    columns: RESPONSIVE_COLUMNS,
    rowKey: 'key',
    title: 'Only non-disabled rows expand',
  },
  parameters: {
    docs: {
      source: {
        code: `const MyList = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  return (
    <Table
      data={data}
      columns={columns}
      rowKey="key"
      title="Only non-disabled rows expand"
      expandable={{
        expandRowByClick: true,
        // Rows flagged \`disabled\` cannot be expanded —
        // the row click is a no-op and expandedRowRender is skipped.
        rowExpandable: (record) => !record.disabled,
        expandedRowKeys,
        onExpand: (expanded, record) =>
          setExpandedRowKeys((prev) =>
            expanded ? [...prev, record.key] : prev.filter((k) => k !== record.key),
          ),
        expandedRowRender: (record) => (
          <Box p={16}>
            Details for <strong>{record.name}</strong>
          </Box>
        ),
      }}
    />
  );
};`,
      },
    },
  },
};
