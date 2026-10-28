import {
  type ArrowOptions,
  arrow,
  flip,
  hide,
  type Middleware,
  offset,
  shift,
} from '@floating-ui/react';

import type {
  FlipConfig,
  HideConfig,
  OffsetConfig,
  ShiftConfig,
} from '../Popover.types';
import {
  type LockedPlacementRef,
  lockPlacement,
  restoreLockedPlacement,
  skipWhileLocked,
} from './stickyPlacement';

type GetMiddleware = {
  offsetConfig: OffsetConfig;
  flipConfig: FlipConfig;
  shiftConfig: ShiftConfig;
  hideConfig?: HideConfig;
  arrowConfig?: ArrowOptions;
  lockedPlacement?: LockedPlacementRef;
};

export const getMiddleware = ({
  offsetConfig,
  flipConfig,
  shiftConfig,
  hideConfig,
  arrowConfig,
  lockedPlacement,
}: GetMiddleware) => {
  const middleware: Middleware[] = [];

  const { enabled: offsetEnabled = true, ...offsetOptions } =
    offsetConfig || {};
  const { enabled: flipEnabled = true, ...flipOptions } = flipConfig || {};
  const { enabled: shiftEnabled = true, ...shiftOptions } = shiftConfig || {};
  const { enabled: hideEnabled = true, ...hideOptions } = hideConfig || {};

  if (lockedPlacement) {
    middleware.push(restoreLockedPlacement(lockedPlacement));
  }
  if (offsetEnabled) {
    middleware.push(offset(offsetOptions));
  }
  if (flipEnabled) {
    const flipMiddleware = flip(flipOptions);
    middleware.push(
      lockedPlacement
        ? skipWhileLocked(flipMiddleware, lockedPlacement)
        : flipMiddleware,
    );
  }
  if (shiftEnabled) {
    middleware.push(shift(shiftOptions));
  }
  if (arrowConfig?.element) {
    middleware.push(arrow(arrowConfig));
  }
  // Last on purpose: `hide` reports on the position the middleware before it settled on, so running
  // it earlier would test a position that flip/shift then moved.
  if (hideEnabled) {
    middleware.push(hide(hideOptions));
  }
  if (lockedPlacement) {
    middleware.push(lockPlacement(lockedPlacement));
  }

  return middleware;
};
