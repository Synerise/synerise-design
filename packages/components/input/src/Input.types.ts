import * as React from 'react';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';
import { TooltipProps } from 'antd/lib/tooltip';

export interface Props {
  error?: boolean;
  className?: string;
  tooltip?: React.ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  counterLimit?: number;
  icon1?: React.ReactElement;
  icon1Tooltip?: React.ReactElement;
  icon2?: React.ReactElement;
  icon2Tooltip?: React.ReactElement;
  resetMargin?: boolean;
  handleInputRef?: (ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>) => void;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
}

export type EnhancedProps = Props & (InputProps | TextAreaProps | MaskedInputProps);
