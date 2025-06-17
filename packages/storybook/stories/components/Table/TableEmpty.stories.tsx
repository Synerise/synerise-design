import React from 'react';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddL, AddM } from '@synerise/ds-icon';
import EmptyStates, { EmptyStatesSize } from '@synerise/ds-empty-states';

import { renderWithIconInHeaders, TableMeta } from './Table.utils';
import { COLUMNS_WITH_AVATARS } from './AllCellTypes/AllCellTypes.data';

const EMPTY_DATA_SOURCE: Array<{ id: string; title: string }> = [];

type RowType = typeof EMPTY_DATA_SOURCE[number];
type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData?: Array<any>;
};

const STORY_ARG_TYPE = { table: { category: 'Story options' } };

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['randomiseSelectionColumn'],
    }
  },
  title: 'Components/Table/EmptyTable',
  render: ({ showIconsInHeader, showHeaderButton, columnsData, ...args }) => {
    const columns = columnsData !== undefined ? renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader) : undefined;
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return <Table {...args} columns={columns} headerButton={headerButton} />;
  },
  argTypes: {
    ...TableMeta.argTypes
  },
  args: {
    ...TableMeta.args,
    dataSource: EMPTY_DATA_SOURCE,
    columnsData: COLUMNS_WITH_AVATARS,
  },
  component: Table,
} as Meta<StoryType>;

export const EmptyTableDefault: Story = {
  args: {},
};

export const EmptyTableCustom: Story = {
  args: {
    emptyDataComponent: (
      <EmptyStates
        text="Create first profile"
        label="Lorem ipsum dolor sit amet"
        button={
          <Button mode="label" type="primary">
            New profile
          </Button>
        }
        labelPosition="bottom"
        customIcon={<AddL />}
        size={EmptyStatesSize.SMALL}
      />
    ),
  },
};

export const Skeleton: Story = {
  args: {
    loading: true,
  },
};

export const SkeletonUnknownColumns: Story = {
  args: {
    loading: true,
    columnsData: undefined
  },
};
