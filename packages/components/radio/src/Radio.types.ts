import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

import { type DataAttributes } from '@synerise/ds-utils';

export type RadioValueType = string | number | boolean;

/** antd-compatible radio change event. */
export type RadioChangeEventTarget = {
  value?: RadioValueType;
  checked: boolean;
  name?: string;
  [key: string]: unknown;
};

export type RadioChangeEvent = {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: Event;
};

export type RadioProps = {
  value?: RadioValueType;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  onChange?: (event: RadioChangeEvent) => void;
  /** Label text (rendered via `FormFieldLabel`). Takes precedence over `children`. */
  label?: ReactNode;
  /** Helper text rendered below the radio. */
  description?: ReactNode;
  /** @deprecated use `label` instead */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement>;
} & DataAttributes;

/** @deprecated use `RadioProps` instead */
export type Props = RadioProps;

export type RadioOptionType = {
  label: ReactNode;
  value: RadioValueType;
  disabled?: boolean;
};

export type RadioGroupProps = {
  value?: RadioValueType;
  defaultValue?: RadioValueType;
  onChange?: (event: RadioChangeEvent) => void;
  options?: (RadioValueType | RadioOptionType)[];
  optionType?: 'default' | 'button';
  buttonStyle?: 'outline' | 'solid';
  /** Segmented-button height: `small` 24px · `middle` (default) 32px · `large` 40px. */
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  name?: string;
  /** Group laid out full-width with equal-flex buttons. */
  fullWidth?: boolean;
  /** With `fullWidth`, taller (48px) buttons. */
  big?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & DataAttributes;

export type RadioButtonProps = {
  value?: RadioValueType;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  /** Override the group-derived checked state (e.g. when used standalone). */
  checked?: boolean;
  /** Fired on selection, in addition to the group's `onChange`. */
  onChange?: (event: RadioChangeEvent) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: CSSProperties;
} & DataAttributes;
