import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import type { ListItemProps } from '@synerise/ds-list-item';

import ListItemMeta, {
  LabelOnly,
  PrefixAndSuffixOnHover,
  WithHoverTooltip,
  WithoutHover,
  WithStar,
} from './ListItem.stories';

export default {
  ...ListItemMeta,
  title: 'Components/ListItem/Tests',
  tags: ['visualtests'],
} as Meta<ListItemProps>;

type Story = StoryObj<ListItemProps>;

export const ShowHoverTooltip: Story = {
  ...WithHoverTooltip,
  parameters: {
    ...WithHoverTooltip.parameters,
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText(args.children as string));
  },
};

export const Focused: Story = {
  ...LabelOnly,
  parameters: {
    ...LabelOnly.parameters,
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(args.children as string));
  },
};

export const NoHoverFocused: Story = {
  ...WithoutHover,
  parameters: {
    ...WithoutHover.parameters,
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(args.children as string));
  },
};

export const NoHoverHovered: Story = {
  ...WithoutHover,
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText(args.children as string));
  },
};

export const DisplayPrefixAndSuffixOnHover: typeof PrefixAndSuffixOnHover = {
  ...PrefixAndSuffixOnHover,
  parameters: {
    ...PrefixAndSuffixOnHover.parameters,
    chromatic: { disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId('list-item-prefix')).not.toBeVisible();
    expect(canvas.getByTestId('list-item-suffix')).not.toBeVisible();

    await userEvent.hover(canvas.getByText('List Item'));

    await waitFor(() => {
      expect(canvas.getByTestId('list-item-prefix')).toBeVisible();
      expect(canvas.getByTestId('list-item-suffix')).toBeVisible();
    });
  },
};

export const WithStarActive: typeof WithStar = {
  ...WithStar,
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByText('List Item'));
    await userEvent.click(canvas.getByTestId('star-icon'), {
      pointerEventsCheck: 0,
    });
  },
};
