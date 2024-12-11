import { ReactNode, ReactElement, MutableRefObject } from 'react';
import { InputProps as AntdInputProps, TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import { MaskedInputProps as AntdMaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';

import { TooltipProps } from 'antd/lib/tooltip';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export type AutoResizeProp = boolean | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };
export type Props = BaseProps<HTMLInputElement | HTMLTextAreaElement>;
export type BaseProps<RefElementType extends HTMLTextAreaElement | HTMLInputElement = HTMLInputElement> = {
  error?: boolean;
  className?: string;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipExtendedProps & TooltipProps;
  errorText?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  counterLimit?: number;
  renderCustomCounter?: (count?: number) => ReactNode;
  icon1?: ReactElement;
  icon1Tooltip?: ReactElement;
  icon2?: ReactElement;
  icon2Tooltip?: ReactElement;
  resetMargin?: boolean;
  handleInputRef?: (ref: MutableRefObject<RefElementType | null>) => void;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  autoResize?: AutoResizeProp;
  expandable?: boolean;
  expandableTooltip?: ReactNode;
};
/**
 * @deprecated use `InputProps`, `TextareaProps` or `MaskedInputProps` instead
 */
export type EnhancedProps = BaseProps<HTMLInputElement | HTMLTextAreaElement> &
  (AntdInputProps | AntdTextAreaProps | AntdMaskedInputProps);

export type InputProps = BaseProps & AntdInputProps;

/**
 * @deprecated MaskedInput component will no longer receive any updates
 */
export type MaskedInputProps = BaseProps & AntdMaskedInputProps;
