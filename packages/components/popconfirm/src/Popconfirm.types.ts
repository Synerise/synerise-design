import * as React from 'react';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmType = React.FC<
  PopconfirmProps & {
  description?: string | React.ReactNode;
  images?: string[];
  imagesAutoplay?: boolean;
  imagesAutoplaySpeed?: number;
}
  > & {
  ConfirmMessage: React.FC<ConfirmMessageProps>;
};
