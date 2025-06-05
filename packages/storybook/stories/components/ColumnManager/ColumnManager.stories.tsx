import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ColumnManager, { ColumnManagerProps } from '@synerise/ds-column-manager';
import Button from '@synerise/ds-button';
import { fn } from '@storybook/test';

import { fixedWrapper300 } from '../../utils';
import { useColumnManager } from './useColumnManager';
import { StoryColumn } from './ColumnManager.data';

export default {
  component: ColumnManager,
  title: 'Components/Table/ColumnManager',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: ({ onApply, ...args }) => {
    const {
      setColumnManagerVisible,
      columnManagerVisible,
      columns,
      setColumns
    } = useColumnManager(args.visible);

    const handleApply = (updatedColumns) => {
      onApply(updatedColumns);
      setColumns(updatedColumns);
      setColumnManagerVisible(false);
    }
    return (
      <>
        <Button type="primary" mode="simple" onClick={() => setColumnManagerVisible(true)}>
          Show column manager
        </Button>
        <ColumnManager
          {...args}
          hide={() => setColumnManagerVisible(false)}
          visible={columnManagerVisible}
          columns={columns}
          onApply={handleApply}
        />
      </>
    );
  },
  argTypes: {},
  args: {
    onApply: fn()
  },
} as Meta<ColumnManagerProps<StoryColumn>>;

type Story = StoryObj<ColumnManagerProps<StoryColumn>>;

export const Default: Story = {};
export const Open: Story = {
  args: {
    visible: true
  }
};
