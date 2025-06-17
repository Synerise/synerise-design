import React from 'react';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import { ResizeProperty } from 'csstype';

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
