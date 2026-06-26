import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import * as S from './Carousel.styles';
import { type CarouselProps, type CarouselRef } from './Carousel.types';

const TRANSITION_MS = 500;
const DEFAULT_AUTOPLAY_SPEED = 3000;

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * DS-native, antd-free carousel. Emits `ds-carousel-*` DOM class hooks (root `ds-carousel`, plus
 * `ds-carousel-list` / `-track` / `-slide` / `-slide-active` / `-dots` / `-dot` / `-dot-active`) for
 * styling and tests. Supports `scrollx`/`fade`, multi-slide views (`slidesToShow`/`slidesToScroll`),
 * looping vs clamped (`infinite`), autoplay, built-in dots, and an imperative `goTo/next/prev`
 * ref — the surface antd's `CarouselRef` provided.
 */
const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      effect = 'scrollx',
      slidesToShow = 1,
      slidesToScroll = 1,
      infinite = true,
      autoplay = false,
      autoplaySpeed = DEFAULT_AUTOPLAY_SPEED,
      dots = true,
      beforeChange,
      afterChange,
      className,
      style,
    },
    ref,
  ) => {
    const slides = Children.toArray(children);
    const count = slides.length;
    // `fade` is inherently single-slide.
    const visible = effect === 'fade' ? 1 : Math.max(1, slidesToShow);
    const step = Math.max(1, slidesToScroll);
    // Last valid left-edge index: clamp so the final view isn't scrolled past the last slide.
    const maxIndex = infinite ? count - 1 : Math.max(0, count - visible);

    const [index, setIndex] = useState(0);
    const afterChangeTimer = useRef<ReturnType<typeof setTimeout>>();

    const goTo = useCallback(
      (next: number): void => {
        if (count === 0) {
          return;
        }
        const target = infinite
          ? ((next % count) + count) % count
          : clamp(next, 0, Math.max(0, count - visible));
        setIndex((from) => {
          if (target === from) {
            return from;
          }
          beforeChange?.(from, target);
          if (afterChangeTimer.current) {
            clearTimeout(afterChangeTimer.current);
          }
          afterChangeTimer.current = setTimeout(
            () => afterChange?.(target),
            TRANSITION_MS,
          );
          return target;
        });
      },
      [count, visible, infinite, beforeChange, afterChange],
    );

    const next = useCallback(
      (): void => goTo(index + step),
      [goTo, index, step],
    );
    const prev = useCallback(
      (): void => goTo(index - step),
      [goTo, index, step],
    );

    useImperativeHandle(ref, () => ({ goTo, next, prev }), [goTo, next, prev]);

    useEffect(() => {
      if (!autoplay || count <= visible) {
        return undefined;
      }
      const id = setInterval(() => goTo(index + step), autoplaySpeed);
      return () => clearInterval(id);
    }, [autoplay, autoplaySpeed, count, visible, step, index, goTo]);

    // Clamp the active index if the slide count shrinks.
    useEffect(() => {
      if (index > maxIndex) {
        setIndex(maxIndex < 0 ? 0 : maxIndex);
      }
    }, [index, maxIndex]);

    useEffect(
      () => (): void => {
        if (afterChangeTimer.current) {
          clearTimeout(afterChangeTimer.current);
        }
      },
      [],
    );

    const pageCount = Math.max(
      1,
      infinite
        ? Math.ceil(count / step)
        : Math.ceil(Math.max(0, count - visible) / step) + 1,
    );
    const activePage = clamp(Math.round(index / step), 0, pageCount - 1);
    const showDots = dots && count > visible;

    return (
      <S.Root className={cx('ds-carousel', className)} style={style}>
        <S.List className="ds-carousel-list">
          <S.Track
            className="ds-carousel-track"
            $effect={effect}
            $index={index}
            $slidesToShow={visible}
          >
            {slides.map((child, i) => {
              const isActive = i >= index && i < index + visible;
              return (
                <S.Slide
                  key={i}
                  className={cx(
                    'ds-carousel-slide',
                    isActive && 'ds-carousel-slide-active',
                  )}
                  $effect={effect}
                  $active={i === index}
                  $slidesToShow={visible}
                  aria-hidden={!isActive}
                >
                  {child}
                </S.Slide>
              );
            })}
          </S.Track>
        </S.List>
        {showDots && (
          <S.Dots className="ds-carousel-dots">
            {Array.from({ length: pageCount }, (_, page) => (
              <S.Dot
                key={page}
                className={cx(
                  'ds-carousel-dot',
                  page === activePage && 'ds-carousel-dot-active',
                )}
                $active={page === activePage}
              >
                <button
                  type="button"
                  aria-label={`Go to slide ${page * step + 1}`}
                  onClick={(): void => goTo(page * step)}
                />
              </S.Dot>
            ))}
          </S.Dots>
        )}
      </S.Root>
    );
  },
);

Carousel.displayName = 'Carousel';

export default Carousel;
