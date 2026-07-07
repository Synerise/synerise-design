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

/** Longest zoom animation the round-trip must outlast before reading the level. */
const ZOOM_SETTLE_MS = 300;

/** Numeric zoom percentage currently shown in the toolbar (e.g. `100` for "100%"). */
const readZoomLevel = (): number =>
  Number.parseInt(
    screen.getByTestId('image-preview-zoom-level').textContent ?? '',
    10,
  );

/**
 * Click a zoom control and resolve with the *settled* level. Zoom is animated
 * (react-zoom-pan-pinch `centerView`, ~200ms) and the percentage ramps frame by
 * frame via `onTransformed`, so acting on the first changed frame reads a
 * mid-animation value — and the next click then derives its grid step from the
 * live in-between scale. That race is what made this story flaky in CI/VR. Wait
 * for the level to both change (animation started) and then hold steady longer
 * than the animation (finished) before continuing.
 */
const clickZoomAndSettle = async (testId: string): Promise<number> => {
  const before = readZoomLevel();
  await userEvent.click(screen.getByTestId(testId));
  await waitFor(
    () => expect(readZoomLevel()).not.toBe(before),
    WAIT_FOR_OPTIONS,
  );
  let last = Number.NaN;
  let lastChangedAt = Date.now();
  await waitFor(() => {
    const current = readZoomLevel();
    if (current !== last) {
      last = current;
      lastChangedAt = Date.now();
    }
    expect(Date.now() - lastChangedAt).toBeGreaterThanOrEqual(ZOOM_SETTLE_MS);
  }, WAIT_FOR_OPTIONS);
  return last;
};

/**
 * Zooming in then out returns to the exact same level — guards the stable
 * multiplicative zoom grid (zoom-in/out must round-trip). The round-trip runs
 * between two *settled grid* levels above the fitted view: the fitted scale is
 * generally NOT on the multiplicative grid, so a fit -> in -> out round-trip is
 * only exact for some image/working-area ratios (and thus viewport-dependent),
 * whereas two adjacent grid levels always round-trip exactly, at any viewport.
 */
export const ZoomInThenOutRoundTrips: Story = {
  ...controlled,
  play: async () => {
    // The zoom toolbar only mounts once the loaded image has been measured
    // (maxScale > fit), so waiting for it also means the initial fit has settled.
    await waitFor(
      () => expect(screen.getByTestId('image-preview-zoom-in')).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );

    // Move onto the grid: the first settled zoom step above the fitted view.
    const baselineLevel = await clickZoomAndSettle('image-preview-zoom-in');
    expect(screen.getByTestId('image-preview-zoom-out')).not.toBeDisabled();

    // One more step in must increase the level...
    const zoomedInLevel = await clickZoomAndSettle('image-preview-zoom-in');
    expect(zoomedInLevel).toBeGreaterThan(baselineLevel);

    // ...and one step back out returns to the exact baseline grid level.
    const roundTripLevel = await clickZoomAndSettle('image-preview-zoom-out');
    expect(roundTripLevel).toBe(baselineLevel);
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
