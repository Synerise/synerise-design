import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, userEvent, expect, fn, waitFor } from 'storybook/test';

import { VirtualTableProps } from '@synerise/ds-table';

import StoriesMeta from './VirtualTable.stories';
import { DATA_SOURCE } from './VirtualTable.data';
import { centeredPaddedWrapper, sleep } from '../../../utils';

type RowType = typeof DATA_SOURCE[number];
type VirtualTableType = VirtualTableProps<RowType>;
type Story = StoryObj<VirtualTableType>;

export default {
  ...StoriesMeta,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  title: 'Components/Table/VirtualTable/Tests',
  tags: ['visualtests'],
} as Meta<VirtualTableType>;

export const ShowSortOptions: Story = {
  args: {
    onSort: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await sleep(1000);
    const titleElement = await canvas.findByText('User name');
    const th = titleElement.closest('th') as HTMLElement;
    expect(th instanceof HTMLElement).toBe(true);

    await userEvent.click(th);
    await sleep(500);
    await userEvent.click(within(th).getByTestId('table-string-sorter-button'));
  },
};


export const SortByColumn: Story = {
  args: {
    onSort: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await sleep(1000);
    const titleElement = await canvas.findByText('User name');
    const th = titleElement.closest('th') as HTMLElement;
    expect(th instanceof HTMLElement).toBe(true);

    await userEvent.click(th);
    await sleep(500);
    await userEvent.click(within(th).getByTestId('table-string-sorter-button'));
    await canvas.findByText('Sort z-a');
    await sleep(500);
    await userEvent.click(await canvas.findByText('Sort z-a'))
    await waitFor(async () => {
      expect((await canvas.findByText('User name')).closest('.ant-table-column-sort')).toBeInTheDocument()
    })
    expect(args.onSort).toHaveBeenCalled();
  },
};
