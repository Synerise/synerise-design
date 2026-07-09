import { type RefObject, useCallback } from 'react';

import { useResizeToFit } from '@synerise/ds-utils';

export type UseStretchToFitParams = {
  /** When false the observer is disconnected and no max-width is applied. */
  enabled: boolean;
  /** Element whose `max-width` is clamped to the available width. */
  targetRef: RefObject<HTMLElement | null>;
  /**
   * Maps the measured available width to the max-width to apply. Defaults to
   * identity; consumers tweak it for their own padding/affordances
   * (e.g. `(w) => w - paddingDiff` for Input, `(w) => w + 1` for Autocomplete).
   */
  getMaxWidth?: (availableWidth: number) => number;
  /** Runs before the max-width is applied (e.g. capture scroll position). */
  onBeforeResize?: () => void;
  /** Runs after the max-width is applied (e.g. restore scroll position). */
  onAfterResize?: () => void;
};

/**
 * Centralises the (previously triplicated) "stretch the autosize input to fill
 * its container" behaviour. Attach the returned `outerRef` to the bounding
 * element; its width is observed via `useResizeToFit` (no state churn) and the
 * `targetRef` element's `max-width` is updated on resize.
 */
export const useStretchToFit = <T extends HTMLElement = HTMLDivElement>({
  enabled,
  targetRef,
  getMaxWidth = (availableWidth) => availableWidth,
  onBeforeResize,
  onAfterResize,
}: UseStretchToFitParams) => {
  const handleResize = useCallback(
    (availableWidth: number) => {
      const target = targetRef.current;
      if (!enabled || !target) {
        return;
      }
      onBeforeResize && onBeforeResize();
      target.style.maxWidth = `${getMaxWidth(availableWidth)}px`;
      onAfterResize && onAfterResize();
    },
    [enabled, targetRef, getMaxWidth, onBeforeResize, onAfterResize],
  );

  const { elementRef: outerRef } = useResizeToFit<T>({
    onResize: handleResize,
    autoObserve: enabled,
  });

  return { outerRef };
};
