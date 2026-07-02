import React, { useState } from 'react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { ImagePreview, type ImagePreviewProps } from '@synerise/ds-image';

import StoriesMeta, { SingleImage } from './ImagePreview.stories';

const WAIT_FOR_OPTIONS = { timeout: 3000 };

/**
 * Renders the preview open and controlled, tracking `index`/`open` locally while
 * forwarding the spies from args so tests can assert callbacks AND see the DOM
 * react (counter updates, viewer hides on close).
 */
const ControlledPreview = (args: ImagePreviewProps): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(args.index ?? 0);
  return (
    <ImagePreview
      {...args}
      open={open}
      index={index}
      onIndexChange={(next): void => {
        args.onIndexChange(next);
        setIndex(next);
      }}
      onClose={(): void => {
        args.onClose();
        setOpen(false);
      }}
    />
  );
};

export default {
  ...StoriesMeta,
  title: 'Components/Image/Preview/Tests',
  tags: ['visualtests'],
} as Meta<ImagePreviewProps>;

type Story = StoryObj<ImagePreviewProps>;

const controlled: Pick<Story, 'render'> = {
  render: (args) => <ControlledPreview {...args} />,
};

/** Clicking the demo trigger opens the portal and shows the first image. */
export const OpensFromTrigger: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: /open preview/i }),
    );

    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    expect(screen.getByTestId('image-preview-image')).toBeInTheDocument();
    expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
      '1 of 3',
    );
  },
};

/** Next advances the index, fires onIndexChange, and updates the counter. */
export const NavigatesToNextImage: Story = {
  ...controlled,
  args: { onIndexChange: fn() },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview-next')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview-next'));

    expect(args.onIndexChange).toHaveBeenCalledWith(1);
    await waitFor(
      () =>
        expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
          '2 of 3',
        ),
      WAIT_FOR_OPTIONS,
    );
  },
};

/** Previous from the first image wraps around to the last. */
export const NavigatesPreviousWithWrap: Story = {
  ...controlled,
  args: { onIndexChange: fn() },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview-prev')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview-prev'));

    expect(args.onIndexChange).toHaveBeenCalledWith(2);
    await waitFor(
      () =>
        expect(screen.getByTestId('image-preview-counter')).toHaveTextContent(
          '3 of 3',
        ),
      WAIT_FOR_OPTIONS,
    );
  },
};

/** A single-image preview hides the navigation controls. */
export const SingleImageHidesNavigation: Story = {
  ...controlled,
  args: { ...SingleImage.args },
  play: async () => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    expect(screen.queryByTestId('image-preview-prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('image-preview-next')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('image-preview-counter'),
    ).not.toBeInTheDocument();
  },
};

/**
 * Zooming in then out returns to the exact starting level — guards the stable
 * multiplicative zoom grid (zoom-in/out must round-trip).
 */
export const ZoomInThenOutRoundTrips: Story = {
  ...controlled,
  play: async () => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview-zoom-in')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    // Fitted view: zoom-out is disabled until the user zooms in.
    expect(screen.getByTestId('image-preview-zoom-out')).toBeDisabled();
    const initialLevel = screen.getByTestId(
      'image-preview-zoom-level',
    ).textContent;

    await userEvent.click(screen.getByTestId('image-preview-zoom-in'));
    await waitFor(
      () =>
        expect(
          screen.getByTestId('image-preview-zoom-level').textContent,
        ).not.toBe(initialLevel),
      WAIT_FOR_OPTIONS,
    );
    expect(screen.getByTestId('image-preview-zoom-out')).not.toBeDisabled();

    await userEvent.click(screen.getByTestId('image-preview-zoom-out'));
    await waitFor(
      () =>
        expect(screen.getByTestId('image-preview-zoom-level').textContent).toBe(
          initialLevel,
        ),
      WAIT_FOR_OPTIONS,
    );
  },
};

/** The close button calls onClose and hides the viewer. */
export const ClosesWithCloseButton: Story = {
  ...controlled,
  args: { onClose: fn() },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview-close')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview-close'));

    expect(args.onClose).toHaveBeenCalledTimes(1);
    await waitFor(
      () => expect(screen.getByTestId('image-preview')).not.toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
  },
};

/** Escape closes the viewer. */
export const ClosesWithEscapeKey: Story = {
  ...controlled,
  args: { onClose: fn() },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.keyboard('{Escape}');

    expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

/** Clicking the dimmed backdrop closes the viewer. */
export const ClosesOnBackdropClick: Story = {
  ...controlled,
  args: { onClose: fn() },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview'));

    expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

/** With maskClosable=false a backdrop click does not close. */
export const KeepsOpenWhenMaskClosableFalse: Story = {
  ...controlled,
  args: { onClose: fn(), maskClosable: false },
  play: async ({ args }) => {
    await waitFor(
      () => expect(screen.getByTestId('image-preview')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );
    await userEvent.click(screen.getByTestId('image-preview'));

    expect(args.onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('image-preview')).toBeVisible();
  },
};
