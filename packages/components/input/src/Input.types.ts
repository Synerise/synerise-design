import type {
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MutableRefObject,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import type { FormFieldCommonProps } from '@synerise/ds-form-field';

import type { AutosizeInputProps } from './AutosizeInput/AutosizeInput.types';

export type AutoResizeProp =
  | boolean
  | { minWidth: string; maxWidth?: string; stretchToFit?: boolean };

export type InputSize = 'small' | 'middle' | 'large';

/**
 * Native `<input>` props, preserving the subset of the antd `Input` surface that
 * the design system actually forwards. `size`/`prefix` are redefined (the native
 * HTML attrs have different meanings).
 */
export type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> & {
  size?: InputSize;
  allowClear?: boolean;
  bordered?: boolean;
  /** Inline node rendered inside the input on the left, before the value. */
  innerPrefix?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
};

export type BaseProps<
  RefElementType extends HTMLTextAreaElement | HTMLInputElement =
    HTMLInputElement,
> = {
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
    Pick<
      AutosizeInputProps,
      | 'placeholderIsMinWidth'
      | 'wrapperClassName'
      | 'wrapperStyle'
      | 'extraWidth'
    >
  >;
  expandable?: boolean;
  expandableTooltip?: ReactNode;
} & FormFieldCommonProps;

export type InputProps = BaseProps & NativeInputProps;

/**
 * @deprecated use `InputProps`, `TextareaProps` instead
 */
export type Props = BaseProps<HTMLInputElement | HTMLTextAreaElement>;

/**
 * @deprecated use `InputProps`, `TextareaProps` instead
 */
export type EnhancedProps = InputProps;

export type StyledInput<CustomProps extends object = object> = StyledComponent<
  ForwardRefExoticComponent<InputProps & RefAttributes<HTMLDivElement>>,
  object,
  CustomProps,
  never
>;
