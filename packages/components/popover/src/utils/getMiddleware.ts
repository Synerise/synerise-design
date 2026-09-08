import {
  type ArrowOptions,
  type Middleware,
  arrow,
  flip,
  hide,
  offset,
  shift,
} from '@floating-ui/react';

import {
  type FlipConfig,
  type HideConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '../Popover.types';

type GetMiddleware = {
  offsetConfig: OffsetConfig;
  flipConfig: FlipConfig;
  shiftConfig: ShiftConfig;
  hideConfig?: HideConfig;
  arrowConfig?: ArrowOptions;
};

export const getMiddleware = ({
  offsetConfig,
  flipConfig,
  shiftConfig,
  hideConfig,
  arrowConfig,
}: GetMiddleware) => {
  const middleware: Middleware[] = [];

  const { enabled: offsetEnabled = true, ...offsetOptions } =
    offsetConfig || {};
  const { enabled: flipEnabled = true, ...flipOptions } = flipConfig || {};
  const { enabled: shiftEnabled = true, ...shiftOptions } = shiftConfig || {};
  const { enabled: hideEnabled = true, ...hideOptions } = hideConfig || {};

  if (offsetEnabled) {
    middleware.push(offset(offsetOptions));
  }
  if (flipEnabled) {
    middleware.push(flip(flipOptions));
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

  return middleware;
};
