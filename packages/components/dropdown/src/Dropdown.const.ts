import { type Placement } from '@floating-ui/react';
import { type ListItemProps } from '@synerise/ds-list-item';
import {
  type FlipConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '@synerise/ds-popover';

import { type DropdownPlacement } from './Dropdown.types';

export const PLACEMENT_MAP: Record<DropdownPlacement, Placement> = {
  topRight: 'top-end',
  topLeft: 'top-start',
  top: 'top',
  topCenter: 'top',
  bottom: 'bottom',
  bottomCenter: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
};

export const COPYABLE_CLOSE_DELAY = 500;

export const DEFAULT_MATCHING_FUNCTION = (item: ListItemProps, query: string) =>
  !!(
    item.text &&
    (item.text as string).toLocaleLowerCase().match(query.toLocaleLowerCase())
  );

export const DROPDOWN_MAX_HEIGHT = 400;
export const MAX_VISIBLE_ITEMS = 7;

export const SCROLLBAR_OFFSET = 11;

export const POPOVER_TRANSITION_DURATION = 150;
export const POPOVER_OFFSET_CONFIG: OffsetConfig = {
  mainAxis: 8,
};
export const POPOVER_FLIP_CONFIG: FlipConfig = {};
export const POPOVER_SHIFT_CONFIG: ShiftConfig = {
  crossAxis: true,
};
