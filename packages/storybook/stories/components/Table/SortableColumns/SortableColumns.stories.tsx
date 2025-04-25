import React from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { DATA_SOURCE, COLUMNS } from './SortableColumns.data';

type RowType = typeof DATA_SOURCE[number];
type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
  sortRenderType: {
    name: string;
    company: string;
    transactionValue: string;
    transactionType: string;
  };
  multipleSortOrder: {
    name: number;
    company: number;
    transactionValue: number;
    transactionType: number;
  };
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['randomiseSelectionColumn']
    }
  },
  title: 'Components/Table/SortableTable',
  render: ({ showIconsInHeader, multipleSortOrder, sortRenderType, showHeaderButton, columnsData, ...args }) => {
    const columns = renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader).map(col => ({
      ...col,
      sorter: {
        ...(col.sorter as object),
        multiple: multipleSortOrder[col.dataIndex as string],
      },
      sortRender: sortRenderType[col.dataIndex as string],
    }));

    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return <Table {...args} columns={columns} headerButton={headerButton} />;
  },
  argTypes: {
    ...TableMeta.argTypes,
    sortRenderType: {
      table: { category: 'Story options' },
    },
    multipleSortOrder: {
      table: { category: 'Story options' },
    },
  },
  args: {
    ...TableMeta.args,
    dataSource: DATA_SOURCE,
  },
  component: Table,
} as Meta<StoryType>;

export const SortableTable: Story = {
  args: {
    columnsData: COLUMNS,
    multipleSortOrder: {
      name: 1,
      company: 2,
      transactionValue: 3,
      transactionType: 4,
    },
    sortRenderType: {
      name: 'string',
      company: 'string',
      transactionValue: 'string',
      transactionType: 'string',
    },
  },
};
