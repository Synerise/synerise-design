import { ReactNode } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DropdownProps } from '@synerise/ds-dropdown';

import { centeredPaddedWrapper } from '../../utils';
import DropdownMeta, {
  Default,
  resizableContent,
  resizableContentListItems,
} from './Dropdown.stories';

export default {
  ...DropdownMeta,
  title: 'Components/Dropdown/Tests',
  tags: ['visualtests'],
  decorators: [centeredPaddedWrapper],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof DropdownMeta>;

type Story = StoryObj<DropdownProps & { children: ReactNode }>;

export const OpenDropdown: Story = {
  ...resizableContent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(true));
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeInTheDocument(),
    );
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeVisible(),
    );
  },
};

export const CloseOnClickOutside: Story = {
  ...resizableContent,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(true));
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeInTheDocument(),
    );
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeVisible(),
    );
    await userEvent.click(canvasElement.parentElement!);
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(false));
  },
};

export const ArrowKeys: Story = {
  ...resizableContentListItems,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(true));

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    await waitFor(() =>
      expect(document.activeElement).toHaveTextContent('Item 4'),
    );

    await userEvent.keyboard('{Enter}');
  },
};

export const CloseOnMenuClick: Story = {
  ...resizableContent,
  args: {
    ...resizableContent.args,
    hideOnItemClick: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalled());
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeInTheDocument(),
    );
    await waitFor(async () =>
      expect(await canvas.findByText('Item 3')).toBeVisible(),
    );
    await userEvent.click(canvasElement.parentElement!);
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledTimes(2));
  },
};
