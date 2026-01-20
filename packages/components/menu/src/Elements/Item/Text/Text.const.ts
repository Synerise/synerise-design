import {
  type FlipConfig,
  type HoverConfig,
  type OffsetConfig,
  type ShiftConfig,
} from '@synerise/ds-popover';

export const TRANSITION_DURATION = 150;
export const OFFSET_CONFIG: OffsetConfig = {
  mainAxis: 8,
};
export const FLIP_CONFIG: FlipConfig = {};
export const HOVER_CONFIG: HoverConfig = {
  delay: {
    open: 100,
    close: 400,
  },
};
export const SHIFT_CONFIG: ShiftConfig = {
  crossAxis: true,
};
