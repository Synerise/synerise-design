import { ReactNode, ReactElement, MutableRefObject } from 'react';
import { InputProps as AntdInputProps, TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';

import { TooltipProps } from '@synerise/ds-tooltip';

export type AutoResizeProp = boolean | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };
export type Props = BaseProps<HTMLInputElement | HTMLTextAreaElement>;
export type BaseProps<RefElementType extends HTMLTextAreaElement | HTMLInputElement = HTMLInputElement> = {
  error?: boolean;
  className?: string;
  tooltip?: ReactNode;
  tooltipConfig?: TooltipProps;
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
 * @deprecated use `InputProps`, `TextareaProps` instead
 */
export type EnhancedProps = BaseProps<HTMLInputElement | HTMLTextAreaElement> & (AntdInputProps | AntdTextAreaProps);

export type InputProps = BaseProps & AntdInputProps;
