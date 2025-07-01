import AntdDivider from 'antd/lib/divider';
import React from 'react';

import { type DividerProps } from '../Divider.types';

export const Line = ({
  marginBottom,
  marginTop,
  style,
  ...antdDividerProps
}: DividerProps) => {
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
