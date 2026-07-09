import type { CSSProperties, ReactNode } from 'react';

import { type FormFieldCommonProps } from '@synerise/ds-form-field';

export type InputGroupSize = 'large' | 'default' | 'small';

export type Props = {
  compact?: boolean;
  size?: InputGroupSize;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * Which group item stretches to fill the row (the others keep their natural
   * width). Defaults to `'last'` — the trailing control grows, so a fixed-width
   * leading control (e.g. a Select) sits left and the input fills the rest. Use
   * `'first'` for the flipped layout: the leading control stretches while a
   * fixed-width trailing control (e.g. a ColorPicker) stays compact on the right.
   */
  growItem?: 'first' | 'last';
  /**
   * @deprecated Use `errorText` (from `FormFieldCommonProps`) instead. This
   * antd-proprietary array of error strings is kept only for backward
   * compatibility and is ignored when `errorText` is provided.
   */
  errors?: string[];
  resetMargin?: boolean;
} & FormFieldCommonProps;
