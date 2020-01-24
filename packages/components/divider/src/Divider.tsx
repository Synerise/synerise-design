import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdDivider, { DividerProps as AntDividerProps } from 'antd/lib/divider';

export interface DividerProps extends AntDividerProps {
  marginTop?: number;
  marginBottom?: number;
}

const Divider: React.FC<DividerProps> = ({ marginBottom, marginTop, style, ...antdDividerProps }) => {
  return (
    <AntdDivider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdDividerProps}
      style={{
        marginBottom,
        marginTop,
        ...style,
      }}
    />
  );
};

export default Divider;
