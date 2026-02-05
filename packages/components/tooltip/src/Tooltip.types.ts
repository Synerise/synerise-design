import { type CSSProperties, type ReactNode } from 'react';

import {
  type LegacyTooltipPlacement,
  type PopoverOptions,
  type PopoverTriggerType,
} from '@synerise/ds-popover';

export type TooltipContentProps = Pick<
  TooltipProps,
  | 'title'
  | 'description'
  | 'image'
  | 'icon'
  | 'shortCuts'
  | 'button'
  | 'status'
  | 'overlayStyle'
> &
  Required<Pick<TooltipProps, 'type'>>;

export type TooltipTypes = 'default' | 'largeSimple' | 'largeScrollable';

export type TooltipProps = {
  type?: TooltipTypes;
  icon?: ReactNode;
  status?: ReactNode;
  title?: ReactNode;
  shortCuts?: ReactNode | ReactNode[];
  image?: ReactNode;
  description?: ReactNode;
  timeToHideAfterClick?: number;
  offset?: 'default' | 'small';
  button?: ReactNode;
  children?: ReactNode;
  render?: () => ReactNode;
  disabled?: boolean;
  placement?: LegacyTooltipPlacement;
  trigger?: PopoverTriggerType | PopoverTriggerType[];
  zIndex?: number;
  overlayStyle?: CSSProperties;
  popoverProps?: Omit<PopoverOptions, 'zIndex' | 'getPopupContainer'>;
  getPopupContainer?: PopoverOptions['getPopupContainer'];

  open?: boolean;
  onOpenChange?: (newOpen: boolean) => void;
};
