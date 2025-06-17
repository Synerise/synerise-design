import type { ReactNode, ReactElement, MutableRefObject } from 'react';
import type { InputProps as AntdInputProps, TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

import type { AutosizeInputProps } from './AutosizeInput/AutosizeInput.types';

export type AutoResizeProp = boolean | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };

/**
 * @deprecated use `InputProps`, `TextareaProps` instead
 */
export type Props = BaseProps<HTMLInputElement | HTMLTextAreaElement>;

export type BaseProps<RefElementType extends HTMLTextAreaElement | HTMLInputElement = HTMLInputElement> = {
  error?: boolean;
  className?: string;
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
  autoResizeProps?: Partial<
    Pick<AutosizeInputProps, 'placeholderIsMinWidth' | 'wrapperClassName' | 'wrapperStyle' | 'extraWidth'>
  >;
  expandable?: boolean;
  expandableTooltip?: ReactNode;
} & FormFieldCommonProps;

/**
 * @deprecated use `InputProps`, `TextareaProps` instead
 */
export type EnhancedProps = BaseProps<HTMLInputElement | HTMLTextAreaElement> & (AntdInputProps | AntdTextAreaProps);

export type InputProps = BaseProps & AntdInputProps;
