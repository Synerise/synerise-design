import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdDivider from 'antd/lib/divider';
import { DividerProps } from './Divider.types';

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
