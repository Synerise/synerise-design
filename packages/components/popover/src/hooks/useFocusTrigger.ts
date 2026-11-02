import type { ElementProps, FloatingContext } from '@floating-ui/react';
import { type FocusEvent, useEffect, useMemo, useRef } from 'react';

import type { FocusConfig } from '../Popover.types';

type UseFocusTriggerOptions = FocusConfig & {
  enabled: boolean;
};

// Not floating-ui's `useFocus`: that opens at once, so arrowing through a list would open
// every row's popover. This waits `delay` and drops the open if the focus moves on.
export const useFocusTrigger = (
  context: FloatingContext,
  { enabled, delay = 0, visibleOnly = true }: UseFocusTriggerOptions,
): ElementProps => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const pointerFocusRef = useRef(false);
  const { open, onOpenChange, elements } = context;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useMemo(() => {
    if (!enabled) {
      return {};
    }
    const isWithin = (node: EventTarget | null) => {
      if (!(node instanceof Node)) {
        return false;
      }
      const reference = elements.domReference;
      return Boolean(
        elements.floating?.contains(node) ||
          (reference instanceof Element && reference.contains(node)),
      );
    };
    const handleBlur = (event: FocusEvent) => {
      clearTimeout(timeoutRef.current);
      if (!open || isWithin(event.relatedTarget)) {
        return;
      }
      onOpenChange(false, event.nativeEvent, 'focus');
    };
    return {
      reference: {
        onPointerDown: () => {
          pointerFocusRef.current = true;
        },
        onFocus: (event: FocusEvent) => {
          const isPointerFocus = pointerFocusRef.current;
          pointerFocusRef.current = false;
          if (visibleOnly && isPointerFocus) {
            return;
          }
          clearTimeout(timeoutRef.current);
          const { nativeEvent } = event;
          timeoutRef.current = setTimeout(
            () => onOpenChange(true, nativeEvent, 'focus'),
            delay,
          );
        },
        onBlur: (event: FocusEvent) => {
          pointerFocusRef.current = false;
          handleBlur(event);
        },
      },
      floating: {
        onBlur: handleBlur,
      },
    };
  }, [enabled, delay, visibleOnly, open, onOpenChange, elements]);
};
