import React from 'react';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Expander } from '@synerise/ds-button';
// import { InfoFillS, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import {
  SELECTION_ALL,
  SELECTION_INVERT,
  TableCell,
  VirtualTable,
  type VirtualTableProps,
} from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../../utils';
import {
  COLUMNS_ALL,
  COLUMNS_MULTIPLE_SORT,
  RESPONSIVE_COLUMNS,
} from '../data/columns';
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
  },
  argTypes: {
    columns: { control: false },
    data: { control: false },
    texts: { control: false },
    expandable: { control: false },

    className: CLASSNAME_ARG_CONTROL,

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
      onScrollEndReach: action('onScrollEndReach'),
      onScrollTopReach: action('onScrollTopReach'),
      onBackToTop: action('onBackToTop'),
      onRetryButtonClick: action('onRetryButtonClick'),
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
        size: 500,
        cell: (info) => chromaticCellRender(info.getValue()),
      },
      {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        cell: (info) => chromaticCellRender(info.getValue()),
      },
      {
        accessorKey: 'children',
        id: 'children',
        header: '',
        size: 72,
        cell: (info) => {
          const children = info.getValue();
          const record = info.row.original;
          if (children !== undefined) {
            return (
              <TableCell.ActionCell
                className="chromatic-ignore"
                key={record.key}
              >
                <Expander
                  expanded={expandedRows.indexOf(record.key) >= 0}
                  onClick={() => {
                    console.log('toggle', record.key);
                    handleExpandRow(record.key);
                  }}
                />
              </TableCell.ActionCell>
            );
          }
        },
      },
    ];
    console.log('expandedRows', expandedRows);

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
