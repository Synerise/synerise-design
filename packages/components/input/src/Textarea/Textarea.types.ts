import { type TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import { type ResizeProperty } from 'csstype';
import type React from 'react';

/**
 * @deprecated Use RawTextAreaProps instead.
 */
export type TextAreaProps = RawTextAreaProps;

export type RawTextAreaProps = AntdTextAreaProps & {
  error?: boolean;
  errorText?: string | React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  resize?: ResizeProperty;
};
