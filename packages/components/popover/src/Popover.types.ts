import {
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';

import {
  type ArrowOptions,
  type AutoUpdateOptions,
  type Delay,
  type FlipOptions,
  type OffsetOptions,
  type OpenChangeReason,
  type Placement,
  type ShiftOptions,
  type UseDismissProps,
  type UseFloatingReturn,
  type UseHoverProps,
  type UseInteractionsReturn,
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
export type HoverConfig = Omit<UseHoverProps, 'enabled'>;
export type DelayConfig = Delay;

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
  hoverConfig?: HoverConfig;
  arrowConfig?: Omit<ArrowOptions, 'element'>;
  dismissConfig?: UseDismissProps;
  listNavigationConfig?: UseListNavigationProps;
  trigger?: PopoverTriggerType | PopoverTriggerType[];
  /**
   * defaults to theme.variables['zindex-dropdown'],
   */
  zIndex?: number;
  onOpenChange?: OpenChangeFn;
  onDismiss?: (event?: Event, reason?: OpenChangeReason) => void;
  getPopupContainer?: (element: HTMLElement) => HTMLElement;
  transitionDuration?: number;
  getTransitionConfig?: ({
    placement,
  }: {
    placement: Placement;
  }) => Partial<UseTransitionStylesProps>;
};

type OpenChangeFn = (
  open: boolean,
  event?: Event,
  reason?: OpenChangeReason,
) => void;

// Or if you want an explicit interface:
export type UsePopoverReturn = Omit<UseFloatingReturn, 'open'> &
  UseInteractionsReturn & {
    open: boolean;
    setOpen: OpenChangeFn;
    transitionStyles: CSSProperties | undefined;
    modal: boolean | undefined;
    labelId: string | undefined;
    descriptionId: string | undefined;
    setLabelId: Dispatch<SetStateAction<string | undefined>>;
    setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    getPopupContainer?: (element: HTMLElement) => HTMLElement;
    testId: string;
    zIndex?: number;
    returnFocus?: boolean;
    componentId?: string;
    arrowRef: RefObject<HTMLElement>;
  };

export type LegacyDropdownPlacement = Exclude<
  LegacyPlacement,
  'right' | 'left' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
>;

export type LegacyPopconfirmPlacement = LegacyPlacement;

export type LegacyPlacement =
  | 'topLeft'
  | 'top'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomCenter'
  | 'bottomRight'
  | 'right'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';
