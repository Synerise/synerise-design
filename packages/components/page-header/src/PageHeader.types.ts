import {
  type ChangeEvent,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type ReactNode,
} from 'react';

import { type TooltipProps } from '@synerise/ds-tooltip';

export type PageHeaderProps = {
  className?: string;
  rightSide?: ReactNode;
  children?: ReactNode;
  bar?: ReactNode;
  tabs?: ReactNode;
  avatar?: ReactNode;
  title?: ReactNode | string;
  description?: ReactNode | string;
  more?: ReactNode;
  onGoBack?: () => void;
  goBackIcon?: ReactNode;
  onClose?: () => void;
  isolated?: boolean;
  tooltip?: TooltipProps;
  tooltipIcon?: ReactNode;
  handleTooltipClick?: () => void;
  inlineEdit?: {
    name?: string;
    value: string | number;
    maxLength?: number;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur?: FocusEventHandler<HTMLInputElement>;
    handleOnEnterPress?: KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    size: 'small' | 'normal';
    style?: {
      [key: string]: string | number;
    };
    error?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
    customIcon?: ReactNode;
  };
};
