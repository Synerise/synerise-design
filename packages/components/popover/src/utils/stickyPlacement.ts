import {
  type AutoUpdateOptions,
  autoUpdate,
  type FloatingElement,
  type Middleware,
  type Placement,
  type ReferenceElement,
} from '@floating-ui/react';
import type { MutableRefObject } from 'react';

export type LockedPlacementRef = MutableRefObject<Placement | null>;

/**
 * `autoUpdate`, except that a change in the overlay's own size repositions it without letting it
 * choose a side again. Everything else — scroll, viewport resize, the anchor moving or resizing —
 * releases the side first.
 *
 * The anchor releases it only when its size differs from the last one observed: every observed
 * element gets an initial notification, and a page that is not rendering can deliver it late, after
 * the overlay has already resized.
 */
export const autoUpdateWithStickyPlacement = (
  reference: ReferenceElement,
  floating: FloatingElement,
  update: () => void,
  options: AutoUpdateOptions,
  lockedPlacement: LockedPlacementRef,
) => {
  const reposition = () => {
    lockedPlacement.current = null;
    update();
  };
  const cleanupAutoUpdate = autoUpdate(reference, floating, reposition, {
    ...options,
    elementResize: false,
  });

  const observesResize =
    options.elementResize !== false && typeof ResizeObserver === 'function';
  let referenceSize: string | undefined;
  const resizeObserver = observesResize
    ? new ResizeObserver((entries) => {
        const referenceEntry = entries.find(
          ({ target }) => target !== floating,
        );
        const previousSize = referenceSize;
        if (referenceEntry) {
          const { width, height } = referenceEntry.contentRect;
          referenceSize = `${width}x${height}`;
        }
        previousSize !== undefined && previousSize !== referenceSize
          ? reposition()
          : update();
      })
    : null;
  const referenceElement =
    reference instanceof Element ? reference : reference.contextElement;
  referenceElement &&
    !options.animationFrame &&
    resizeObserver?.observe(referenceElement);
  resizeObserver?.observe(floating);

  return () => {
    cleanupAutoUpdate();
    resizeObserver?.disconnect();
  };
};

export const restoreLockedPlacement = (
  lockedPlacement: LockedPlacementRef,
): Middleware => ({
  name: 'restoreLockedPlacement',
  fn: ({ placement }) => {
    const locked = lockedPlacement.current;
    return locked && locked !== placement
      ? { reset: { placement: locked } }
      : {};
  },
});

export const skipWhileLocked = (
  middleware: Middleware,
  lockedPlacement: LockedPlacementRef,
): Middleware => ({
  ...middleware,
  fn: (state) => (lockedPlacement.current ? {} : middleware.fn(state)),
});

export const lockPlacement = (
  lockedPlacement: LockedPlacementRef,
): Middleware => ({
  name: 'lockPlacement',
  fn: ({ placement }) => {
    lockedPlacement.current = placement;
    return {};
  },
});
