import React from 'react';
import { expect, screen, waitFor } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { DSTableProps } from '@synerise/ds-table';

import { centeredPaddedWrapper, sleep } from '../../utils';
import { COLUMNS_WITH_AVATARS } from './AllCellTypes/AllCellTypes.data';
import { TableMeta } from './Table.utils';
import StoriesMeta, { EmptyTableCustom } from './TableEmpty.stories';

const EMPTY_DATA_SOURCE: Array<{ id: string; title: string }> = [];

type RowType = (typeof EMPTY_DATA_SOURCE)[number];
type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData?: Array<any>;
};

export default {
  ...StoriesMeta,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  title: 'Components/Table/EmptyTable/Tests',
  args: {
    ...TableMeta.args,
    dataSource: EMPTY_DATA_SOURCE,
    columnsData: COLUMNS_WITH_AVATARS,
    locale: { emptyText: 'Empty Text' },
  },
  tags: ['visualtests'],
} as Meta<StoryType>;

export const EmptyTableDefaultTest: Story = {
  args: {},
  play: async () => {
    await waitFor(() => expect(screen.getByText('Empty Text')).toBeTruthy());
    await waitFor(() =>
      expect(
        screen.getByTestId('ds-icon-information-no-search-result-l'),
      ).toBeTruthy(),
    );
  },
};

export const EmptyTableCustomTest: Story = {
  ...EmptyTableCustom,
  play: async () => {
    await waitFor(() => expect(screen.getByText('New profile')).toBeTruthy());
  },
};
