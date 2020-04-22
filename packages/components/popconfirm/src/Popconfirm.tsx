import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import './style/index.less';
import AntdPopconfirm from './Popconfirm.styles';
import ConfirmMessage, { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage';

type PopconfirmType = React.FC<PopconfirmProps> & {
  ConfirmMessage: React.FC<ConfirmMessageProps>;
};

const Popconfirm: PopconfirmType = ({ ...antdProps }) => {
  return (
    <AntdPopconfirm
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdProps}
    />
  );
};

Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
