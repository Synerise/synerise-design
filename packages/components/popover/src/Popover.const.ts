import { type Placement } from '@floating-ui/react';

import { type LegacyPlacement } from './Popover.types';

export const HOVER_OPEN_DELAY = 100;
export const HOVER_CLOSE_DELAY = 100;

export const PLACEMENT_MAP: Record<LegacyPlacement, Placement> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  leftTop: 'left-start',
  leftBottom: 'left-end',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  topRight: 'top-end',
  topLeft: 'top-start',
  topCenter: 'top',
  bottomCenter: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
};
