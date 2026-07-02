import { expect, fn, userEvent, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type ThumbnailProps } from '@synerise/ds-image';

import StoriesMeta, { Deletable } from './ImageThumbnail.stories';

export default {
  ...StoriesMeta,
  title: 'Components/Image/Thumbnail/Tests',
  tags: ['visualtests'],
} as Meta<ThumbnailProps>;

type Story = StoryObj<ThumbnailProps>;

/** An interactive tile invokes onClick when clicked. */
export const ClickInvokesOnClick: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('image-thumbnail'));

    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Enter activates a focused tile (it behaves like a button). */
export const ActivatesWithEnterKey: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tile = canvas.getByTestId('image-thumbnail');
    tile.focus();
    await userEvent.keyboard('{Enter}');

    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Space activates a focused tile. */
export const ActivatesWithSpaceKey: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const tile = canvas.getByTestId('image-thumbnail');
    tile.focus();
    await userEvent.keyboard(' ');

    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** The delete affordance fires onDelete and does not trigger the tile click. */
export const DeleteStopsPropagation: Story = {
  ...Deletable,
  args: { ...Deletable.args, onClick: fn(), onDelete: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('image-thumbnail-delete'));

    expect(args.onDelete).toHaveBeenCalledTimes(1);
    expect(args.onClick).not.toHaveBeenCalled();
  },
};
