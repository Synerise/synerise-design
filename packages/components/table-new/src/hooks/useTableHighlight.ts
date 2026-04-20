import { type MutableRefObject, useCallback } from 'react';

import { type HighlightOptions } from '../Table.types';

const HIGHLIGHT_CLASS = 'ds-table-row-highlight';
const DEFAULT_HIGHLIGHT_DURATION = 600;

export const useTableHighlight = (
  containerRef: MutableRefObject<HTMLElement | null>,
) => {
  const highlightRow = useCallback(
    (rowKey: string, options?: HighlightOptions) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const escapedKey = CSS.escape(rowKey);
      const row = container.querySelector(
        `tr[data-key="${escapedKey}"], tr[data-row-key="${escapedKey}"]`,
      );
      if (!row) {
        return;
      }

      const duration = options?.duration ?? DEFAULT_HIGHLIGHT_DURATION;
      const el = row as HTMLElement;

      // Remove existing animation to allow re-trigger
      el.classList.remove(HIGHLIGHT_CLASS);
      // Force reflow so re-adding the class restarts the animation
      void el.offsetHeight;

      el.style.setProperty('--ds-highlight-duration', `${duration}ms`);
      el.classList.add(HIGHLIGHT_CLASS);

      const onEnd = () => {
        el.classList.remove(HIGHLIGHT_CLASS);
        el.removeEventListener('animationend', onEnd);
      };
      el.addEventListener('animationend', onEnd);
    },
    [containerRef],
  );

  return { highlightRow };
};
