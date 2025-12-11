import { type Middleware, flip, offset, shift } from '@floating-ui/react';

import {
  type FlipConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '../Popover.types';

type GetMiddleware = {
  offsetConfig: OffsetConfig;
  flipConfig: FlipConfig;
  shiftConfig: ShiftConfig;
};

export const getMiddleware = ({
  offsetConfig,
  flipConfig,
  shiftConfig,
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
  return middleware;
};
