import React from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import ListItem, {
  ListWrapper,
  ListWrapperProps,
} from '@synerise/ds-list-item';

import { fixedWrapper300 } from '../../utils';

export default {
  component: ListWrapper,
  title: 'Components/ListItem/ListWrapper/Tests',
  tags: ['visualtests'],
  decorators: [fixedWrapper300],
} as Meta<ListWrapperProps>;

type Story = StoryObj<ListWrapperProps>;

const ITEMS = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

export const ShowMoreLessToggle: Story = {
  args: {
    maxToShowItems: 3,
    onClick: fn(),
  },
  render: (args) => (
    <ListWrapper {...args}>
      {ITEMS.map((label) => (
        <ListItem key={label} itemKey={label}>
          {label}
        </ListItem>
      ))}
    </ListWrapper>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'collapses to maxToShowItems and shows a "Show more" toggle',
      async () => {
        expect(canvas.getByText('Option A')).toBeInTheDocument();
        expect(canvas.getByText('Option C')).toBeInTheDocument();
        // items beyond the limit are not rendered while collapsed
        expect(canvas.queryByText('Option D')).not.toBeInTheDocument();
        expect(canvas.queryByText('Option E')).not.toBeInTheDocument();
        const toggle = canvas.getByRole('button', { name: /show more/i });
        expect(toggle).toBeInTheDocument();
        // collapsed state is announced to assistive tech
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
      },
    );

    await step('clicking "Show more" reveals the remaining items', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /show more/i }));
      await waitFor(() => {
        expect(canvas.getByText('Option D')).toBeInTheDocument();
        expect(canvas.getByText('Option E')).toBeInTheDocument();
      });
      // the toggle now offers to collapse the list again
      const toggle = canvas.getByRole('button', { name: /show less/i });
      expect(toggle).toBeInTheDocument();
      // expanded state is announced to assistive tech
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(
        canvas.queryByRole('button', { name: /show more/i }),
      ).not.toBeInTheDocument();
    });

    await step('clicking "Show less" collapses the list again', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /show less/i }));
      await waitFor(() => {
        expect(canvas.queryByText('Option D')).not.toBeInTheDocument();
        expect(canvas.queryByText('Option E')).not.toBeInTheDocument();
      });
      expect(
        canvas.getByRole('button', { name: /show more/i }),
      ).toBeInTheDocument();
    });
  },
};
