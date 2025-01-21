import React, { ReactNode } from 'react';
import { TooltipProps } from '@synerise/ds-tooltip/dist/Tooltip.types';

export type PageHeaderProps = {
  className?: string;
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  bar?: React.ReactNode;
  tabs?: React.ReactNode;
  avatar?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  more?: React.ReactNode;
  onGoBack?: () => void;
  goBackIcon?: React.ReactNode;
  onClose?: () => void;
  isolated?: boolean;
  tooltip?: TooltipProps;
  tooltipIcon?: React.ReactNode;
  handleTooltipClick?: () => void;
  inlineEdit?: {
    name?: string;
    value: string | number;
    maxLength?: number;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur?: React.FocusEventHandler<HTMLInputElement>;
    handleOnEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
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
