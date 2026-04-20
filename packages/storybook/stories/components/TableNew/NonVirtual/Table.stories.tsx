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
};

export const RawTable: StoryObj<typeof Table> = {
  args: {
    data: DATA_SOURCE,
    columns: RAW_TABLE_COLUMNS,
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
