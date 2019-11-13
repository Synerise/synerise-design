import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import './style/index.less';
import AntdPopconfirm from './Popconfirm.styles';

const Popconfirm: React.FC<PopconfirmProps> = ({ ...antdProps }) => {
  return (
    <AntdPopconfirm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdProps}
    />
  );
};

export default Popconfirm;
