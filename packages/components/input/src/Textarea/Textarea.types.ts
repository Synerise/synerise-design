import * as React from 'react';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';

export type TextAreaProps = AntdTextAreaProps & {
  error?: boolean;
  errorText?: string | React.ReactNode;
  wrapperStyle?: React.CSSProperties;
};
