import { ReactNode, ReactElement, MutableRefObject } from 'react';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { TooltipProps } from 'antd/lib/tooltip';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export type AutoResizeProp = boolean | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };

export interface Props {
  error?: boolean;
  className?: string;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  errorText?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  counterLimit?: number;
  icon1?: ReactElement;
  icon1Tooltip?: ReactElement;
  icon2?: ReactElement;
  icon2Tooltip?: ReactElement;
  resetMargin?: boolean;
  handleInputRef?: (ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>) => void;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  autoResize?: AutoResizeProp;
}

export type EnhancedProps = Props & (InputProps | TextAreaProps | MaskedInputProps);
