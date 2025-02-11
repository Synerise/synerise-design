import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, expect, waitFor } from '@storybook/test';

import Dropdown from '@synerise/ds-dropdown';
import type { DropdownProps } from '@synerise/ds-dropdown';

import DropdownMeta, { Copyable, withSearch } from './Dropdown.stories';
import { centeredPaddedWrapper } from '../../utils';
import { ReactNode } from 'react';

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
    ...Copyable,
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      await userEvent.click(canvas.getByRole('button'));
      await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());
      await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeInTheDocument());
      await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeVisible());
    },
  };

  
  export const CloseOnClickOutside: Story = {
    ...Copyable,
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      await userEvent.click(canvas.getByRole('button'));
      await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());
      await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeInTheDocument());
      await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeVisible());
      await userEvent.click(canvasElement.parentElement!);
      await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalledTimes(2));
    },
  };
  
  export const ArrowKeys: Story = {
    ...withSearch,
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      await userEvent.click(canvas.getByRole('button'));
      
      await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());
      await waitFor(() => expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument());
      await waitFor(() => expect(canvas.getByPlaceholderText('Search')).not.toHaveStyle({pointerEvents: 'none'}));
      
      await userEvent.click(canvas.getByPlaceholderText('Search'));
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await waitFor(() => expect(document.activeElement).toHaveTextContent('Edit'));

      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await waitFor(() => expect(document.activeElement).toBe(canvas.getByPlaceholderText('Search')));
    },
  };
  
//   uncomment after R18 is merged

//   export const CloseOnMenuClick: Story = {
//     ...Copyable,
//     args: {
//         ...Copyable.args,
//         hideOnMenuItemClick: true
//     },
//     play: async ({ canvasElement, args }) => {
//       const canvas = within(canvasElement.parentElement!);
//       await userEvent.click(canvas.getByRole('button'));
//       await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());
//       await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeInTheDocument());
//       await waitFor(async () => expect(await canvas.findByText('Attributes')).toBeVisible());
//       await userEvent.click(canvasElement.parentElement!);
//       await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalledTimes(2));
//     },
//   };
  
