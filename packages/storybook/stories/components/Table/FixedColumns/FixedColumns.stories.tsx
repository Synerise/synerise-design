import React from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { COLUMNS, COLUMNS_WITH_FIXED_ACTION, DATA_SOURCE } from './FixedColumns.data';
import { fixedWrapper1000 } from '../../../utils';


type RowType = typeof DATA_SOURCE[number];
type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['decoratorProps', 'randomiseSelectionColumn'],
    },
  },
  title: 'Components/Table/FixedColumns',
  decorators: [fixedWrapper1000],
  render: ({ showIconsInHeader, showHeaderButton, columnsData, ...args }) => {
    const columns = renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader);
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
  },
  args: {
    ...TableMeta.args,
    dataSource: DATA_SOURCE,
  },
  component: Table,
} as Meta<StoryType>;

export const FixedColumns: Story = {
  args: {
    columnsData: COLUMNS,
  }
}

export const FixedActionColumn: Story = {
  args: {
    columnsData: COLUMNS_WITH_FIXED_ACTION,
  }
}