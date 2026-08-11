import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { type RawValueType } from '../Select.types';

/** Gap between chips — keep in sync with `MultiValueArea`'s `gap`. */
const CHIP_GAP = 4;
/** Caret room kept free at the end of the row so typing stays visible. */
const INPUT_RESERVE = 30;

// Layout effect on the client (measure before paint, so no over-wide flash),
// plain effect on the server where it would only log a warning.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

type UseResponsiveTagCountParams = {
  /** `maxTagCount === 'responsive'` in a multi-value mode. */
  enabled: boolean;
  /** Every selected value, in render order — one ghost chip each. */
  items: RawValueType[];
  /** Keep room for the search caret (skipped when disabled / readOnly). */
  reserveInput: boolean;
};

type UseResponsiveTagCountResult = {
  /** Attach to the chip row — its width is the space chips must fit into. */
  areaRef: RefObject<HTMLDivElement>;
  /** Attach to the off-flow row holding one ghost chip per value + the overflow chip. */
  measureRef: RefObject<HTMLDivElement>;
  /** Chips that fit on one line; `null` while unmeasured (SSR, hidden, zero-width) — render all. */
  visibleCount: number | null;
};

/**
 * Fit-to-width chip count for `maxTagCount="responsive"` (antd / rc-overflow parity).
 *
 * Widths come from an off-flow ghost row rather than the visible chips: hiding a
 * chip would zero its width, and the ghost's own size never depends on the count
 * we derive from it — so the ResizeObserver can't feed itself.
 */
export const useResponsiveTagCount = ({
  enabled,
  items,
  reserveInput,
}: UseResponsiveTagCountParams): UseResponsiveTagCountResult => {
  const areaRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  const itemCount = items.length;
  // Swapping a value keeps the count but replaces a ghost — re-measure on either.
  const itemsKey = items.join('\u0000');

  const measure = useCallback((): void => {
    const area = areaRef.current;
    const row = measureRef.current;
    if (!enabled || !area || !row) {
      return;
    }

    // Unmeasurable — hydration, a `display: none` ancestor, jsdom. Show everything.
    const areaWidth = area.clientWidth;
    if (areaWidth <= 0) {
      setVisibleCount(null);
      return;
    }

    // The ghost row is `itemCount` chips followed by the overflow chip.
    const ghosts = Array.from(row.children) as HTMLElement[];
    const widths = ghosts.slice(0, itemCount).map((chip) => chip.offsetWidth);
    const overflowWidth = ghosts[itemCount]?.offsetWidth ?? 0;

    const available = areaWidth - (reserveInput ? INPUT_RESERVE : 0);
    const totalWidth = widths.reduce(
      (sum, width, index) => sum + width + (index > 0 ? CHIP_GAP : 0),
      0,
    );
    if (totalWidth <= available) {
      setVisibleCount(itemCount);
      return;
    }

    // Something will be omitted, so every candidate has to leave room for the +N chip.
    let used = 0;
    let count = 0;
    for (let index = 0; index < widths.length; index += 1) {
      const next = used + widths[index] + (count > 0 ? CHIP_GAP : 0);
      if (next + CHIP_GAP + overflowWidth > available) {
        break;
      }
      used = next;
      count += 1;
    }

    // A lone chip never collapses into a pointless "+ 1" — it ellipsis-clips instead.
    setVisibleCount(count === 0 && itemCount === 1 ? 1 : count);
  }, [enabled, itemCount, reserveInput]);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      setVisibleCount(null);
      return undefined;
    }

    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(() => measure());
    if (areaRef.current) {
      observer.observe(areaRef.current);
    }
    // Also watch the ghosts so a label / font-load width change re-fits.
    Array.from(measureRef.current?.children ?? []).forEach((ghost) =>
      observer.observe(ghost),
    );
    return () => observer.disconnect();
    // `itemsKey`: re-measure and re-observe when the ghost row's contents change.
  }, [enabled, measure, itemsKey]);

  return { areaRef, measureRef, visibleCount };
};
