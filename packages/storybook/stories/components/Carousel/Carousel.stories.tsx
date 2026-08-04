import React from 'react';
import { fn } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Carousel from '@synerise/ds-carousel';
import type { CarouselProps } from '@synerise/ds-carousel';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STYLE_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper588,
} from '../../utils';
import {
  CarouselWithControls,
  CarouselWithSlides,
  productSlides,
} from './data';

const meta: Meta<CarouselProps> = {
  title: 'Components/Carousel',
  component: Carousel,
  // No `autodocs` tag: Carousel.mdx is the attached docs (Overview) page. Having
  // both a custom `<Meta of>` MDX and the autodocs tag makes Storybook fail to start.
  decorators: [fixedWrapper588],
  render: (args) => <CarouselWithSlides {...args} />,
  argTypes: {
    effect: controlFromOptionsArray('inline-radio', ['scrollx', 'fade']),
    slidesToShow: NUMBER_CONTROL,
    slidesToScroll: NUMBER_CONTROL,
    infinite: BOOLEAN_CONTROL,
    autoplay: BOOLEAN_CONTROL,
    autoplaySpeed: NUMBER_CONTROL,
    dots: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    // Slides / handlers have no control widget.
    children: { control: false },
    beforeChange: { control: false },
    afterChange: { control: false },
  },
  args: {
    effect: 'scrollx',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: true,
    beforeChange: fn(),
    afterChange: fn(),
  },
};

export default meta;

type Story = StoryObj<CarouselProps>;

/** Default `scrollx` carousel with the built-in dot navigation. */
export const Default: Story = {};

/** `effect="fade"` cross-fades slides in place instead of sliding them. */
export const Fade: Story = {
  args: { effect: 'fade' },
};

/**
 * `slidesToShow` shows several slides at once (a product strip); `slidesToScroll`
 * controls how many advance per step. Matches the puib `CardWithSlider` shape.
 */
export const MultipleSlides: Story = {
  args: {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
  },
  render: (args) => <Carousel {...args}>{productSlides(8)}</Carousel>,
};

/**
 * `infinite={false}` clamps navigation to the first / last view instead of
 * wrapping around at the ends.
 */
export const NonInfinite: Story = {
  args: { infinite: false },
};

/**
 * `autoplay` auto-advances on an `autoplaySpeed` (ms) interval. Snapshot disabled
 * in Chromatic — the moving track would make diffs non-deterministic.
 */
export const Autoplay: Story = {
  args: { autoplay: true, autoplaySpeed: 2000 },
  parameters: { chromatic: { disableSnapshot: true } },
};

/** `dots={false}` hides the built-in navigation (drive it via the ref instead). */
export const WithoutDots: Story = {
  args: { dots: false },
};

/**
 * Driving the carousel through its imperative `ref` — `next()` / `prev()` / `goTo()` —
 * with external buttons, and reading the current index from `afterChange`.
 */
export const ImperativeControls: Story = {
  args: { dots: false },
  render: (args) => <CarouselWithControls {...args} />,
};

/** A single slide renders no dots (there is nothing to navigate). */
export const SingleSlide: Story = {
  render: (args) => <CarouselWithSlides {...args} slideCount={1} />,
};
