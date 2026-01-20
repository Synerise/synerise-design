import {
  type CSSProperties,
  type ForwardRefExoticComponent,
  type MouseEvent,
  type ReactNode,
  type RefAttributes,
} from 'react';

import { type ButtonProps } from '@synerise/ds-button';
import {
  type LegacyPopconfirmPlacement,
  type PopoverOptions,
} from '@synerise/ds-popover';

import { type ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmTexts = Pick<
  PopconfirmProps,
  'okText' | 'description' | 'title' | 'cancelText'
>;

export type PopconfirmProps = {
  description?: ReactNode;
  title?: ReactNode;

  overlayStyle?: CSSProperties;
  overlayClassName?: string;

  onConfirm?: (event?: MouseEvent<HTMLElement>) => void;
  onCancel?: (event?: MouseEvent<HTMLElement>) => void;

  cancelButtonProps?: ButtonProps;
  cancelText?: ReactNode;

  okButtonProps?: ButtonProps;
  okText?: ReactNode;
  okType?: ButtonProps['type'];

  images?: string[];
  imagesAutoplay?: boolean;
  imagesAutoplaySpeed?: number;

  withLink?: ReactNode;
  closeIcon?: ReactNode;
  titlePadding?: boolean;
  hideButtons?: ReactNode;
  buttonsAlign?: 'left' | 'right';
  disabled?: boolean;

  children?: ReactNode;
  staticVisible?: boolean;
  asChild?: boolean;
  placement?: LegacyPopconfirmPlacement;
  /**
   * defaults to theme.variables['zindex-popconfirm'],
   */
  zIndex?: number;
  icon?: ReactNode;
} & Partial<
  Pick<
    PopoverOptions,
    | 'open'
    | 'onOpenChange'
    | 'trigger'
    | 'getPopupContainer'
    | 'offsetConfig'
    | 'flipConfig'
    | 'shiftConfig'
  >
>;

export type PopconfirmType = ForwardRefExoticComponent<
  PopconfirmProps & RefAttributes<HTMLElement>
> & {
  ConfirmMessage: (props: ConfirmMessageProps) => JSX.Element;
};
