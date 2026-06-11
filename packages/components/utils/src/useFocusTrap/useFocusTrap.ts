import { type RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Where focus should land when the trap activates.
 *
 * - a `RefObject` — focus that element (falls back to first focusable → container
 *   when the ref is not yet resolved);
 * - `'container'` — focus the container element itself;
 * - `'first'` (default) — focus the first focusable descendant, falling back to
 *   the container when there are none.
 */
type InitialFocus = RefObject<HTMLElement | null> | 'first' | 'container';

type UseFocusTrapOptions = {
  /** @defaultValue `'first'` */
  initialFocus?: InitialFocus;
};

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  options?: UseFocusTrapOptions,
): void => {
  const initialFocus = options?.initialFocus ?? 'first';

  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirstOrContainer = () => {
      const focusable =
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        container.focus();
      }
    };

    if (typeof initialFocus !== 'string') {
      if (initialFocus.current) {
        initialFocus.current.focus();
      } else {
        focusFirstOrContainer();
      }
    } else if (initialFocus === 'container') {
      container.focus();
    } else {
      focusFirstOrContainer();
    }

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      const currentFocusable =
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (currentFocusable.length === 0) {
        return;
      }

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTabTrap);

    return () => {
      document.removeEventListener('keydown', handleTabTrap);
      previouslyFocused?.focus();
    };
  }, [containerRef, active, initialFocus]);
};
