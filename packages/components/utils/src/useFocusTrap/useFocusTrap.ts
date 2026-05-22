import { type RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
): void => {
  useEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable =
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.focus();
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
  }, [containerRef, active]);
};
