import React from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';

import {
  COLUMNS_ALL,
  COLUMNS_WITH_AVATARS,
  COLUMNS_WITH_AVATARS_LINK,
  COLUMNS_WITH_ICONS,
  COLUMNS_WITH_LABELS,
  COLUMNS_WITH_PROGRESS_BAR,
  COLUMNS_WITH_STATUSES,
  COLUMNS_WITH_TRIGGERS,
  DATA_SOURCE_FULL,
  RowTypeFull,
} from './AllCellTypes.data';
import { renderWithIconInHeaders, TableMeta } from '../Table.utils';

type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowTypeFull> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['randomiseSelectionColumn'],
    }
  },
  title: 'Components/Table/AllCellTypes',
  render: ({ showIconsInHeader, showHeaderButton, columnsData, ...args }) => {
    const columns = renderWithIconInHeaders<RowTypeFull>(columnsData, showIconsInHeader);
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
    dataSource: DATA_SOURCE_FULL,
  },
  component: Table,
} as Meta<StoryType>;

export const Default: Story = {
  args: {
    columnsData: COLUMNS_ALL,
  },
};

export const WithAvatars: Story = {
  args: {
    columnsData: COLUMNS_WITH_AVATARS,
  },
};

export const WithAvatarLink: Story = {
  args: {
    columnsData: COLUMNS_WITH_AVATARS_LINK,
  },
};

export const WithLabels: Story = {
  args: {
    columnsData: COLUMNS_WITH_LABELS,
  },
};

export const withIcons: Story = {
  args: {
    columnsData: COLUMNS_WITH_ICONS,
  },
};

export const WithStatuses: Story = {
  args: {
    columnsData: [...COLUMNS_WITH_STATUSES, ...COLUMNS_WITH_PROGRESS_BAR],
  },
};

export const WithTriggers: Story = {
  args: {
    columnsData: COLUMNS_WITH_TRIGGERS,
  },
};
