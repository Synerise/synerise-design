import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type GalleryProps } from '@synerise/ds-image';

import StoriesMeta, { Deletable } from './ImageGallery.stories';

const WAIT_FOR_OPTIONS = { timeout: 3000 };

export default {
  ...StoriesMeta,
  title: 'Components/Image/Gallery/Tests',
  tags: ['visualtests'],
} as Meta<GalleryProps>;

type Story = StoryObj<GalleryProps>;

/** Clicking a thumbnail opens the preview at that image's index. */
export const OpensPreviewAtClickedIndex: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByTestId('image-thumbnail')[2]);

    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
      '3 of 5',
    );
  },
};

/** After opening from a thumbnail, the preview navigation still works. */
export const NavigatesAfterOpening: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByTestId('image-thumbnail')[0]);

    await waitFor(
      () => expect(screen.getByTestId('image-preview-next')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview-next'));

    await waitFor(
      () =>
        expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
          '2 of 5',
        ),
      WAIT_FOR_OPTIONS,
    );
  },
};

/** Deleting a thumbnail fires onDelete with its index and does not open the preview. */
export const DeleteThumbnailDoesNotOpenPreview: Story = {
  ...Deletable,
  args: { ...Deletable.args, onDelete: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByTestId('image-thumbnail-delete')[0]);

    expect(args.onDelete).toHaveBeenCalledWith(0);
    expect(screen.getByTestId('image-preview')).not.toBeVisible();
  },
};
