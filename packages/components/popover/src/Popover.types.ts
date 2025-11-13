import { type ReactNode } from 'react';

import {
  type AutoUpdateOptions,
  type FlipOptions,
  type OffsetOptions,
  type OpenChangeReason,
  type Placement,
  type ShiftOptions,
  type UseDismissProps,
  type UseListNavigationProps,
  type UseTransitionStylesProps,
} from '@floating-ui/react';

export type PopoverProps = {
  children: ReactNode;
} & PopoverOptions;

export type PopoverTriggerType = 'click' | 'hover';

type SharedMiddlewareConfig = {
  enabled?: boolean;
};
export type OffsetConfig = SharedMiddlewareConfig &
  Exclude<OffsetOptions, number>;
export type FlipConfig = SharedMiddlewareConfig & FlipOptions;
export type ShiftConfig = SharedMiddlewareConfig & ShiftOptions;

export type PopoverOptions = {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  testId?: string;
  componentId?: string;
  autoUpdate?: boolean | AutoUpdateOptions;
  open?: boolean;
  /**
   * @default true
   * set to false in order to prevent returning focus to the trigger element after popover closes
   */
  returnFocus?: boolean;
  offsetConfig?: OffsetConfig;
  flipConfig?: FlipConfig;
  shiftConfig?: ShiftConfig;
  dismissConfig?: UseDismissProps;
  listNavigationConfig?: UseListNavigationProps;
  trigger?: PopoverTriggerType | PopoverTriggerType[];
  /**
   * defaults to theme.variables['zindex-dropdown'],
   */
  zIndex?: number;
  onOpenChange?: (
    open: boolean,
    event?: Event,
    reason?: OpenChangeReason,
  ) => void;
  onDismiss?: (event?: Event, reason?: OpenChangeReason) => void;
  getPopupContainer?: (element: HTMLElement) => HTMLElement;
  transitionDuration?: number;
  getTransitionConfig?: ({
    placement,
  }: {
    placement: Placement;
  }) => Partial<UseTransitionStylesProps>;
};
