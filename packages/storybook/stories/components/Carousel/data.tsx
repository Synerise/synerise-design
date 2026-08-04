import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import Button from '@synerise/ds-button';
import Carousel from '@synerise/ds-carousel';
import type { CarouselProps, CarouselRef } from '@synerise/ds-carousel';
import { theme } from '@synerise/ds-core';

/** A colourful demo panel — one per slide. */
export const Slide = styled.div<{ $bg: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  color: ${theme.palette.white};
  font-size: 32px;
  font-weight: 600;
  user-select: none;
`;

const SLIDE_COLORS = [
  theme.palette['blue-600'],
  theme.palette['green-600'],
  theme.palette['orange-600'],
  theme.palette['purple-600'],
  theme.palette['cyan-600'],
];

/**
 * `count` colourful slides (`1`-based labels). Kept as a helper so every story and
 * test renders the same slide content — the differences are all in the props.
 */
export const colorfulSlides = (count = 5): React.ReactNode[] =>
  Array.from({ length: count }, (_, i) => (
    <Slide key={i} $bg={SLIDE_COLORS[i % SLIDE_COLORS.length]}>
      Slide {i + 1}
    </Slide>
  ));

/** A compact product tile for the multi-slide (`slidesToShow`) strip demo. */
export const ProductCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  margin: 0 8px;
  border-radius: 8px;
  background: ${theme.palette['grey-050']};
  border: 1px solid ${theme.palette['grey-200']};
  color: ${theme.palette['grey-700']};
  font-weight: 600;
`;

export const productSlides = (count = 8): React.ReactNode[] =>
  Array.from({ length: count }, (_, i) => (
    <div key={i}>
      <ProductCard>Product {i + 1}</ProductCard>
    </div>
  ));

/**
 * Renders the carousel with the standard colourful slides so the stories stay
 * driven purely by `args` (children can't be an arg control).
 */
export const CarouselWithSlides = ({
  slideCount = 5,
  ...args
}: CarouselProps & { slideCount?: number }) => (
  <Carousel {...args}>{colorfulSlides(slideCount)}</Carousel>
);

/**
 * Drives the carousel through its imperative `ref` (`goTo` / `next` / `prev`) with
 * external buttons, and shows the current index reported by `afterChange` — the
 * shape consumers like puib `CardWithSlider` use.
 */
export const CarouselWithControls = (args: CarouselProps) => {
  const ref = useRef<CarouselRef>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Carousel
        {...args}
        ref={ref}
        afterChange={(index) => {
          args.afterChange?.(index);
          setCurrent(index);
        }}
      >
        {colorfulSlides(5)}
      </Carousel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button onClick={() => ref.current?.prev()}>Prev</Button>
        <Button onClick={() => ref.current?.next()}>Next</Button>
        <Button type="primary" onClick={() => ref.current?.goTo(0)}>
          Go to first
        </Button>
        <span style={{ marginLeft: 'auto', color: theme.palette['grey-600'] }}>
          Current index (afterChange): {current}
        </span>
      </div>
    </div>
  );
};
