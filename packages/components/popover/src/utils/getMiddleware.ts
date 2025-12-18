import {
  type ArrowOptions,
  type Middleware,
  arrow,
  flip,
  offset,
  shift,
} from '@floating-ui/react';

import {
  type FlipConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '../Popover.types';

type GetMiddleware = {
  offsetConfig: OffsetConfig;
  flipConfig: FlipConfig;
  shiftConfig: ShiftConfig;
  arrowConfig?: ArrowOptions;
};

export const getMiddleware = ({
  offsetConfig,
  flipConfig,
  shiftConfig,
  arrowConfig,
}: GetMiddleware) => {
  const middleware: Middleware[] = [];

  const { enabled: offsetEnabled = true, ...offsetOptions } =
    offsetConfig || {};
  const { enabled: flipEnabled = true, ...flipOptions } = flipConfig || {};
  const { enabled: shiftEnabled = true, ...shiftOptions } = shiftConfig || {};

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

  return middleware;
};
