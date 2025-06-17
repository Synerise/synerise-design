import { Meta, StoryObj } from '@storybook/react-webpack5';
import { waitFor, userEvent, within, expect } from 'storybook/test';

import InlineSelect from '@synerise/ds-inline-edit';
import type { InlineSelectProps } from '@synerise/ds-inline-edit';

import InlineSelectMeta from './InlineSelect.stories';
import { DATA_SOURCE } from './InlineSelect.data';

export default {
  title: 'Components/InlineEdit/Tests',
  component: InlineSelect,
  tags: ['visualtests'],
  ...InlineSelectMeta,
} as Meta<InlineSelectProps>;

type Story = StoryObj<InlineSelectProps>;

export const InlineSelectOpened: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);

    await userEvent.click(canvas.getByText(args.placeholder!));
    await waitFor(() => {
      expect(canvas.getAllByRole('menuitem')).toHaveLength(DATA_SOURCE.length);
    });
  },
};

export const InlineSelectSelected: Story = {
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true
    }
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);

    await userEvent.click(canvas.getByText(args.placeholder!));
    await waitFor(() => {
      expect(canvas.getAllByRole('menuitem')).toHaveLength(DATA_SOURCE.length);
      expect(canvas.getByText(DATA_SOURCE[1].text as string)).not.toHaveStyle({ pointerEvents: 'none' });
    });

    await userEvent.click(canvas.getByText(DATA_SOURCE[1].text as string));
    await waitFor(() => expect(canvas.queryAllByRole('menuitem')).toHaveLength(0));
    await waitFor(() => expect(DATA_SOURCE[1].onClick).toHaveBeenCalled());
    await waitFor(() => expect(args.onValueChange!).toHaveBeenCalled());
  },
};
