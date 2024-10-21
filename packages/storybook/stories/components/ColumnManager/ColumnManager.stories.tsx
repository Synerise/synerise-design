import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ColumnManager, { ColumnManagerProps } from '@synerise/ds-column-manager';
import Button from '@synerise/ds-button';

import { fixedWrapper300 } from '../../utils';
import { useColumnManager } from './useColumnManager';
import { action } from '@storybook/addon-actions';

export default {
  component: ColumnManager,
  title: 'Components/Table/ColumnManager',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    const {
      editItem,
      removeItem,
      saveFilter,
      setColumnManagerVisible,
      columnManagerVisible,
      columns,
      categories,
      groupSettings,
      setSelectedItem,
      selectedItemId,
    } = useColumnManager(args.visible);
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
          onSave={saveFilter}
          groupSettings={groupSettings}
          itemFilterConfig={{
            fetchData: () => {},
            removeItem,
            editItem,
            selectItem: setSelectedItem,
            duplicateItem: action('duplicate item'),
            selectedItemId: selectedItemId,
            categories: categories,
          }}
        />
      </>
    );
  },
  argTypes: {},
  args: {
  },
} as Meta<ColumnManagerProps>;

type Story = StoryObj<ColumnManagerProps>;

export const Default: Story = {};
export const Open: Story = {
  args: {
    visible: true
  }
};
