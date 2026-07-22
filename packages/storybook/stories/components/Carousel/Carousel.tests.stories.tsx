import React, { type ReactNode } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Carousel from '@synerise/ds-carousel';

import { CarouselWithControls, colorfulSlides, productSlides } from './data';

/**
 * Visual-regression + interaction stories for ds-carousel. The `States` story stacks
 * the effects / layouts so scrollx / fade / multi-slide / no-dots chrome can be
 * compared; the `play`-driven stories exercise the dot navigation and the imperative
 * `next` / `prev` / `goTo` ref end-to-end. Hidden from the standard sidebar
 * (`visualtests`).
 */
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel Tests',
  component: Carousel,
  tags: ['visualtests'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const WAIT_FOR_OPTIONS = { timeout: 2000 };

const Panel = ({ children }: { children: ReactNode }) => (
  <div style={{ width: 480, marginBottom: 32 }}>{children}</div>
);

/** Grab the text of the (single) active slide — the reliable interaction signal. */
const activeSlideText = (root: HTMLElement): string | null | undefined =>
  root.querySelector('.ds-carousel-slide-active')?.textContent;

// ── Visual-regression: every layout stacked, initial frame (index 0) ──────────────

export const States: Story = {
  render: () => (
    <div style={{ width: 520 }}>
      <Panel>
        <Carousel effect="scrollx">{colorfulSlides(4)}</Carousel>
      </Panel>
      <Panel>
        <Carousel effect="fade">{colorfulSlides(4)}</Carousel>
      </Panel>
      <Panel>
        <Carousel
          slidesToShow={3}
          slidesToScroll={1}
          infinite={false}
          dots={false}
        >
          {productSlides(8)}
        </Carousel>
      </Panel>
      <Panel>
        <Carousel dots={false}>{colorfulSlides(4)}</Carousel>
      </Panel>
    </div>
  ),
};

// ── Interaction: clicking a dot navigates to that slide ───────────────────────────

export const DotNavigation: Story = {
  render: () => <Carousel>{colorfulSlides(4)}</Carousel>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Starts on the first slide.
    expect(activeSlideText(canvasElement)).toBe('Slide 1');

    // Click the third dot → third slide becomes active, third dot marked active.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Go to slide 3' }),
    );
    await waitFor(
      () => expect(activeSlideText(canvasElement)).toBe('Slide 3'),
      WAIT_FOR_OPTIONS,
    );
    const dots = canvasElement.querySelectorAll('.ds-carousel-dot');
    expect(dots[2].classList.contains('ds-carousel-dot-active')).toBe(true);
  },
};

// ── Interaction: the imperative ref (next / prev / goTo) + afterChange ─────────────

export const ImperativeNavigation: Story = {
  render: () => <CarouselWithControls dots={false} afterChange={fn()} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(activeSlideText(canvasElement)).toBe('Slide 1');

    // next() advances one slide; afterChange reports the new index after ~500ms.
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await waitFor(
      () => expect(activeSlideText(canvasElement)).toBe('Slide 2'),
      WAIT_FOR_OPTIONS,
    );
    await waitFor(
      () =>
        expect(
          canvas.getByText('Current index (afterChange): 1'),
        ).toBeVisible(),
      WAIT_FOR_OPTIONS,
    );

    // prev() steps back.
    await userEvent.click(canvas.getByRole('button', { name: 'Prev' }));
    await waitFor(
      () => expect(activeSlideText(canvasElement)).toBe('Slide 1'),
      WAIT_FOR_OPTIONS,
    );

    // prev() from the first slide wraps to the last (infinite defaults to true).
    await userEvent.click(canvas.getByRole('button', { name: 'Prev' }));
    await waitFor(
      () => expect(activeSlideText(canvasElement)).toBe('Slide 5'),
      WAIT_FOR_OPTIONS,
    );
  },
};

// ── Interaction: a single slide renders no dot navigation ─────────────────────────

export const SingleSlideHasNoDots: Story = {
  render: () => <Carousel>{colorfulSlides(1)}</Carousel>,
  play: async ({ canvasElement }) => {
    expect(canvasElement.querySelector('.ds-carousel-dots')).toBeNull();
    expect(activeSlideText(canvasElement)).toBe('Slide 1');
  },
};
