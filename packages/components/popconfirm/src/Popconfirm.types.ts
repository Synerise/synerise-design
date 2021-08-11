import * as React from 'react';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmType = React.FC<
  PopconfirmProps & {
  description?: string | React.ReactNode;
  withLink?: React.ReactNode;
  closeIcon?: React.ReactNode;
  images?: string[];
  imagesAutoplay?: boolean;
  imagesAutoplaySpeed?: number;
  text?: ButtonTexts;
  buttons?: React.ReactNode;
  typeButton?: string;
}
  > & {
  ConfirmMessage: React.FC<ConfirmMessageProps>;
};
export type ButtonTexts = Partial<{
  cancelButton: string;
  applyButton: string;
}>;
