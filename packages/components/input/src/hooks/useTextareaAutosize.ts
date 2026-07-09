import { type RefObject, useCallback, useEffect, useLayoutEffect } from 'react';

type TextareaMetrics = {
  /** `scrollHeight` of the textarea (content + vertical padding, border excluded). */
  scrollHeight: number;
  verticalPadding: number;
  verticalBorder: number;
  isBorderBox: boolean;
  /** Floor for the textarea's own height (box px). */
  minHeightPx?: number;
  /** Cap for the scroll viewport (box px); the textarea itself is never capped. */
  maxHeightPx?: number;
};

/**
 * Pure height calculation extracted from the hook so the sizing logic is
 * unit-testable without a layout engine. Returns two heights:
 *
 * - `contentHeight` — the textarea's own height. It always tracks the full
 *   content (floored at `minHeightPx`) and is **never capped**, so the textarea
 *   never scrolls itself; the ds-Scrollbar wrapping it owns the scrolling.
 * - `viewportHeight` — the height for the scroll viewport (the wrapper). It
 *   tracks the content but is capped at `maxHeightPx`, so once the content
 *   exceeds the cap the textarea overflows the viewport and PerfectScrollbar
 *   takes over.
 */
export const computeTextareaHeight = ({
  scrollHeight,
  verticalPadding,
  verticalBorder,
  isBorderBox,
  minHeightPx,
  maxHeightPx,
}: TextareaMetrics): { contentHeight: number; viewportHeight: number } => {
  const naturalHeight = isBorderBox
    ? scrollHeight + verticalBorder
    : scrollHeight - verticalPadding;

  let contentHeight = naturalHeight;
  if (minHeightPx !== undefined) {
    contentHeight = Math.max(contentHeight, minHeightPx);
  }

  let viewportHeight = contentHeight;
  if (maxHeightPx !== undefined) {
    viewportHeight = Math.min(viewportHeight, maxHeightPx);
  }

  return {
    contentHeight: Math.round(contentHeight),
    viewportHeight: Math.round(viewportHeight),
  };
};

type UseTextareaAutosizeParams = {
  ref: RefObject<HTMLTextAreaElement | null>;
  /** Re-measure whenever this changes (typically the controlled value). */
  value?: unknown;
  minRows?: number;
  maxRows?: number;
  /** When false the textarea keeps its CSS height (no auto-sizing). */
  enabled?: boolean;
  /**
   * Reports the scroll viewport height (clamped by `minRows`/`maxRows`) so the
   * wrapper can be sized as a definite-height viewport for the ds-Scrollbar.
   */
  onViewportHeight?: (height: number) => void;
};

/**
 * Grows a `<textarea>` to fit its content between `minRows` and `maxRows`,
 * replacing antd's `autoSize={{ minRows, maxRows }}`. The textarea is sized to
 * its full content height with `overflow: hidden` (it never scrolls itself);
 * the clamped viewport height is reported via `onViewportHeight` so the wrapping
 * ds-Scrollbar handles the scrolling once the content exceeds `maxRows`.
 * Measures synchronously in `useLayoutEffect` (before paint) and re-measures on
 * window resize.
 */
export const useTextareaAutosize = ({
  ref,
  value,
  minRows,
  maxRows,
  enabled = true,
  onViewportHeight,
}: UseTextareaAutosizeParams) => {
  const resize = useCallback(() => {
    const element = ref.current;
    if (!element || !enabled) {
      return;
    }
    const style = window.getComputedStyle(element);
    const verticalPadding =
      (parseFloat(style.paddingTop) || 0) +
      (parseFloat(style.paddingBottom) || 0);
    const verticalBorder =
      (parseFloat(style.borderTopWidth) || 0) +
      (parseFloat(style.borderBottomWidth) || 0);
    let lineHeight = parseFloat(style.lineHeight);
    if (Number.isNaN(lineHeight)) {
      lineHeight = (parseFloat(style.fontSize) || 16) * 1.2;
    }
    const isBorderBox = style.boxSizing === 'border-box';
    const rowsToHeight = (rows: number) =>
      isBorderBox
        ? rows * lineHeight + verticalPadding + verticalBorder
        : rows * lineHeight;

    // Reset to measure the natural content height, then apply the sized value.
    const previousHeight = element.style.height;
    element.style.height = 'auto';
    const { scrollHeight } = element;
    element.style.height = previousHeight;

    const { contentHeight, viewportHeight } = computeTextareaHeight({
      scrollHeight,
      verticalPadding,
      verticalBorder,
      isBorderBox,
      minHeightPx: minRows !== undefined ? rowsToHeight(minRows) : undefined,
      maxHeightPx: maxRows !== undefined ? rowsToHeight(maxRows) : undefined,
    });

    // Grow the textarea to its full content height and never let it scroll
    // itself — the ds-Scrollbar wrapping it owns the scrolling.
    element.style.height = `${contentHeight}px`;
    element.style.overflowY = 'hidden';
    onViewportHeight && onViewportHeight(viewportHeight);
  }, [ref, minRows, maxRows, enabled, onViewportHeight]);

  useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize, enabled]);

  return resize;
};
