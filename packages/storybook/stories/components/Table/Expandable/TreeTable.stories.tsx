import React from 'react';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { TreeTable } from '@synerise/ds-table';
import { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { DATA_SOURCE } from './TreeTable.data';
import { useTreeTableData } from './useTreeTableData';
import { fixedWrapper1000 } from '../../../utils';

type RowType = typeof DATA_SOURCE[number];
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
};
type Story = StoryObj<StoryType>;

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['randomiseSelectionColumn']
    }
  },
  title: 'Components/Table/ExpandableRows',
  decorators: [fixedWrapper1000],
  render: ({ showIconsInHeader, showHeaderButton, ...args }) => {
    const { columnsData, handleExpandRow, dataSource } = useTreeTableData();

    const columns = renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader);
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return (
      <TreeTable
        {...args}
        dataSource={dataSource}
        columns={columns}
        headerButton={headerButton}
        onRow={record => ({
          onClick: () => handleExpandRow(record.key),
        })}
      />
    );
  },
  argTypes: {
    ...TableMeta.argTypes,
  },
  args: {
    ...TableMeta.args,
    defaultExpandAllRows: true,
  },
  component: TreeTable,
} as Meta<StoryType>;

export const TreeTableStory: Story = {
  name: 'TreeTable',
};
