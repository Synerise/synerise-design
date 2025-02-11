import React from 'react';
import AntdDivider from 'antd/lib/divider';
import { DividerProps } from '../Divider.types';

export const Line = ({ marginBottom, marginTop, style, ...antdDividerProps }: DividerProps) => {
  return (
    <AntdDivider
      {...antdDividerProps}
      style={{
        marginBottom,
        marginTop,
        ...style,
      }}
    />
  );
};
