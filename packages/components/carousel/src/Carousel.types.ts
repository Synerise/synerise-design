import { type CSSProperties, type ReactNode } from 'react';

export type CarouselEffect = 'scrollx' | 'fade';

/**
 * Imperative handle exposed via `ref` — the same surface antd's `CarouselRef` gave consumers.
 */
export type CarouselRef = {
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

export type CarouselProps = {
  /** Slides — one child per slide. */
  children?: ReactNode;
  /**
   * Transition between slides.
   * @default 'scrollx'
   */
  effect?: CarouselEffect;
  /**
   * Number of slides visible at once. Applies to the `scrollx` effect only.
   * @default 1
   */
  slidesToShow?: number;
  /**
   * Number of slides advanced per `next()` / `prev()` / dot.
   * @default 1
   */
  slidesToScroll?: number;
  /**
   * Loop around at the ends. When `false`, navigation clamps to the first/last view.
   * @default true
   */
  infinite?: boolean;
  /**
   * Auto-advance the slides.
   * @default false
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in milliseconds.
   * @default 3000
   */
  autoplaySpeed?: number;
  /**
   * Render the built-in dot navigation.
   * @default true
   */
  dots?: boolean;
  /** Called before a slide transition starts, with the current and target indices. */
  beforeChange?: (from: number, to: number) => void;
  /** Called after a slide transition completes, with the new index. */
  afterChange?: (current: number) => void;
  className?: string;
  style?: CSSProperties;
};
