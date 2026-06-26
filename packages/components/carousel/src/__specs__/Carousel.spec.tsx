import React, { createRef } from 'react';
import { act, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-core';

import Carousel from '../index';
import { type CarouselRef } from '../Carousel.types';

const activeText = (container: HTMLElement): string | null | undefined =>
  container.querySelector('.ds-carousel-slide-active')?.textContent;

describe('Carousel', () => {
  it('should render every slide with the ds-carousel class hooks', () => {
    const { container } = renderWithProvider(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>,
    );

    expect(container.querySelector('.ds-carousel')).toBeTruthy();
    expect(container.querySelectorAll('.ds-carousel-slide')).toHaveLength(2);
    expect(activeText(container)).toBe('A');
  });

  it('should navigate via the imperative ref (goTo / next / prev, wrapping)', () => {
    const ref = createRef<CarouselRef>();
    const { container } = renderWithProvider(
      <Carousel ref={ref} dots={false}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Carousel>,
    );

    act(() => ref.current?.goTo(2));
    expect(activeText(container)).toBe('C');

    act(() => ref.current?.next());
    expect(activeText(container)).toBe('A');

    act(() => ref.current?.prev());
    expect(activeText(container)).toBe('C');
  });

  it('should render dots and change slide on dot click', () => {
    const { container } = renderWithProvider(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>,
    );

    const dotButtons = container.querySelectorAll('.ds-carousel-dots button');
    expect(dotButtons).toHaveLength(2);

    fireEvent.click(dotButtons[1]);
    expect(activeText(container)).toBe('B');
  });

  it('should call beforeChange and afterChange around a transition', () => {
    vi.useFakeTimers();
    const beforeChange = vi.fn();
    const afterChange = vi.fn();
    const ref = createRef<CarouselRef>();

    renderWithProvider(
      <Carousel ref={ref} dots={false} beforeChange={beforeChange} afterChange={afterChange}>
        <div>A</div>
        <div>B</div>
      </Carousel>,
    );

    act(() => ref.current?.goTo(1));
    expect(beforeChange).toHaveBeenCalledWith(0, 1);
    expect(afterChange).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(afterChange).toHaveBeenCalledWith(1);

    vi.useRealTimers();
  });

  it('should support a multi-slide, non-infinite view (the CardWithSlider case)', () => {
    vi.useFakeTimers();
    const afterChange = vi.fn();
    const ref = createRef<CarouselRef>();
    const { container } = renderWithProvider(
      <Carousel
        ref={ref}
        effect="scrollx"
        slidesToShow={4}
        slidesToScroll={1}
        infinite={false}
        dots={false}
        afterChange={afterChange}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </Carousel>,
    );

    const activeTexts = (): (string | null)[] =>
      Array.from(container.querySelectorAll('.ds-carousel-slide-active')).map(
        (el) => el.textContent,
      );

    // 4 slides visible from the start
    expect(activeTexts()).toEqual(['1', '2', '3', '4']);

    // prev() at the start clamps — no transition
    act(() => ref.current?.prev());
    act(() => vi.advanceTimersByTime(500));
    expect(afterChange).not.toHaveBeenCalled();

    // next() advances one slide
    act(() => ref.current?.next());
    act(() => vi.advanceTimersByTime(500));
    expect(afterChange).toHaveBeenLastCalledWith(1);

    // max start index = count(6) - slidesToShow(4) = 2; further next() clamps
    act(() => ref.current?.next());
    act(() => vi.advanceTimersByTime(500));
    expect(afterChange).toHaveBeenLastCalledWith(2);
    expect(activeTexts()).toEqual(['3', '4', '5', '6']);

    afterChange.mockClear();
    act(() => ref.current?.next());
    act(() => vi.advanceTimersByTime(500));
    expect(afterChange).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should not render dots for a single slide', () => {
    const { container } = renderWithProvider(
      <Carousel>
        <div>Only</div>
      </Carousel>,
    );

    expect(container.querySelector('.ds-carousel-dots')).toBeNull();
  });
});
