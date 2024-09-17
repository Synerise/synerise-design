import React from 'react';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import { ResizeProperty } from 'csstype';

export type TextAreaProps = AntdTextAreaProps & {
  error?: boolean;
  errorText?: string | React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  resize?: ResizeProperty;
};
