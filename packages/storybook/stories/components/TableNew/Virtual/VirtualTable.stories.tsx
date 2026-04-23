import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Expander } from '@synerise/ds-button';
import {
  SELECTION_ALL,
  SELECTION_INVERT,
  TableCell,
  VirtualTable,
  type VirtualTableProps,
} from '@synerise/ds-table-new';
import { type ColumnDef } from '@tanstack/react-table';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../../utils';
import { COLUMNS_ALL, RESPONSIVE_COLUMNS } from '../data/columns';
import { type DataSourceItem, TOOLTIP_COLUMNS } from '../data/columns.tooltips';
import { DATA_SOURCE, DATA_SOURCE_FULL } from '../data/tableData';
import { EXPANDABLE_DATA_SOURCE } from '../data/tableData.expandable';
import { useExpandableData } from '../hooks/useExpandableData';
import { ListLayout } from '../shared/ListLayout';
import { chromaticCellRender } from '../utils';

export default {
  component: VirtualTable,
  title: 'Components/TableNew/Examples/Virtual',
  tags: ['autodocs', 'new'],
  parameters: {
    layout: 'padded',
  },

  args: {
    onItemsRendered: fn(),
    onBackToTop: undefined,
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    texts: { control: false },
    expandable: { control: false },

    className: CLASSNAME_ARG_CONTROL,

    showBackToTopButton: BOOLEAN_CONTROL,
    headerWithBorderTop: BOOLEAN_CONTROL,
    hideColumnNames: BOOLEAN_CONTROL,
    hideTitleBar: BOOLEAN_CONTROL,

    hideTitlePart: BOOLEAN_CONTROL,
    stickyHeader: BOOLEAN_CONTROL,
    cardStyles: BOOLEAN_CONTROL,
    isCounterLoading: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    disableColumnNamesLineBreak: BOOLEAN_CONTROL,

    cellHeight: NUMBER_CONTROL,
    dataSourceTotalCount: NUMBER_CONTROL,

    emptyDataComponent: REACT_NODE_AS_STRING,
    itemsMenu: REACT_NODE_AS_STRING,
    headerButton: REACT_NODE_AS_STRING,
    title: REACT_NODE_AS_STRING,
    filterComponent: REACT_NODE_AS_STRING,
    searchComponent: REACT_NODE_AS_STRING,
  },
} as Meta<VirtualTableProps>;

export const Default: StoryObj<VirtualTableProps> = {
  args: {
    data: DATA_SOURCE_FULL,
    columns: COLUMNS_ALL,
  },
};

export const LoadingConfig: StoryObj<VirtualTableProps> = {
  ...Default,
  args: {
    ...Default.args,
    columns: [],
    data: [],
    isLoading: true,
  },
};

export const LoadingData: StoryObj<VirtualTableProps> = {
  ...Default,
  args: {
    ...Default.args,
    data: [],
    isLoading: true,
  },
};

export const InfiniteScroll: StoryObj<VirtualTableProps> = {
  render: (args) => {
    return <ListLayout {...args} />;
  },
  args: {
    showBackToTopButton: true,
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
    cardStyles: true,
    data: DATA_SOURCE_FULL,
    stickyHeader: true,
    infiniteScroll: {
      hasError: false,
      isLoading: true,
      hasMore: false,
      prevPage: {
        isLoading: false,
        hasError: false,
        hasMore: false,
      },
      nextPage: {
        isLoading: true,
        hasError: false,
        hasMore: true,
      },
      onScrollEndReach: fn(),
      onScrollTopReach: fn(),
      onRetryButtonClick: fn(),
    },
    columns: COLUMNS_ALL,
  },
};

export const ExpandableRows: StoryObj<VirtualTableProps> = {
  ...InfiniteScroll,
  render: ({ ...args }) => {
    const { expandedRows, handleExpandRow } = useExpandableData();
    const columns = [
      {
        accessorKey: 'name',
        id: 'name',
        header: 'Name',
        minSize: 400,
        cell: (info) => chromaticCellRender(info.getValue()),
      },
      {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        size: 100,
        cell: (info) => chromaticCellRender(info.getValue()),
      },
      {
        id: 'expander',
        header: '',
        size: 72,
        cell: (info) => {
          const record = info.row.original;
          const hasChildren = record.children?.length > 0;
          if (hasChildren) {
            return (
              <TableCell.ActionCell>
                <Expander
                  expanded={expandedRows.indexOf(record.key) >= 0}
                  onClick={() => handleExpandRow(record.key)}
                />
              </TableCell.ActionCell>
            );
          }
          return null;
        },
      },
    ];

    return (
      <ListLayout
        {...args}
        columns={columns}
        expandable={{
          expandedRowKeys: expandedRows,
          childrenColumnName: 'children',
        }}
      />
    );
  },
  args: {
    ...InfiniteScroll.args,
    data: EXPANDABLE_DATA_SOURCE,
  },
};

export const WithTooltips: StoryObj<
  VirtualTableProps<DataSourceItem, unknown>
> = {
  args: {
    data: DATA_SOURCE,
    columns: TOOLTIP_COLUMNS,
    title: 'Tooltips demo',
    getRowTooltipProps: (row: DataSourceItem) =>
      row.disabled ? { title: `Row ${row.name} is disabled` } : false,
    selectionConfig: {
      onChange: (...rest: unknown[]) => {
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

type FixedColumnsRow = (typeof DATA_SOURCE_FULL)[number];

const FIXED_COLUMNS: ColumnDef<FixedColumnsRow, unknown>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    size: 220,
    meta: { fixed: 'left' },
  },
  { accessorKey: 'city', id: 'city', header: 'City', size: 220 },
  { accessorKey: 'address', id: 'address', header: 'Address', size: 320 },
  {
    accessorKey: 'transactionType',
    id: 'transactionType',
    header: 'Type',
    size: 200,
  },
  { accessorKey: 'number', id: 'number', header: 'Amount', size: 200 },
  {
    accessorKey: 'disabled',
    id: 'disabled',
    header: 'Disabled',
    size: 160,
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'unavailable',
    id: 'unavailable',
    header: 'Status',
    size: 160,
    cell: (info) => (info.getValue() ? 'Unavailable' : 'Available'),
    meta: { fixed: 'right' },
  },
];

export const FixedColumnsNoStickyHeader: StoryObj<VirtualTableProps> = {
  args: {
    data: DATA_SOURCE_FULL,
    columns: FIXED_COLUMNS,
    hideTitleBar: true,
    cellHeight: 56,
    maxHeight: 400,
  },
};

export const WithBuiltInSearch: StoryObj<VirtualTableProps> = {
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
    selectionConfig: {
      onChange: (...rest) => {
        console.log('sel', rest);
      },
      selections: [SELECTION_ALL, SELECTION_INVERT],
    },
  },
};
