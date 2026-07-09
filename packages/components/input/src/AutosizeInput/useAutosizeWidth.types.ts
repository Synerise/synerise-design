import type { RefObject } from 'react';

export type UseAutosizeWidthParams = {
  /** Current input value — drives the measured content width. */
  value?: string | number;
  /** Placeholder text — used as the measured width when there is no value. */
  placeholder?: string;
  /** Lower bound (px) applied to the computed content width. */
  minWidth?: number | string;
  /** Extra px added to the computed width (padding / affordances / icons). */
  extraWidth?: number | string;
  /** When true, the placeholder width is used as a minimum width. */
  placeholderIsMinWidth?: boolean;
  /**
   * Optional ref to the styled input. When provided, its resolved font is
   * copied to the hidden sizer once on mount so measurement matches exactly,
   * even when the font is declared on the input rather than an ancestor.
   */
  inputRef?: RefObject<HTMLElement | null>;
  /** Fired with the computed content width (excl. extraWidth) whenever it changes. */
  onAutosize?: (width: number) => void;
};

export type UseAutosizeWidthResult<C extends HTMLElement = HTMLDivElement> = {
  /** Attach to a single hidden, empty `<span>` styled with `SIZER_STYLE`. */
  sizerRef: RefObject<HTMLSpanElement>;
  /** Attach to the inline-block wrapper whose width the hook sets imperatively. */
  containerRef: RefObject<C>;
  /** Force a re-measure (e.g. after a web font loads or layout changes). */
  recalculate: () => void;
};
