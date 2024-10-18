import React, { MouseEvent, ReactNode } from 'react';
import { PopconfirmProps as AntdPopConfirmProps } from 'antd/lib/popconfirm';
import { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmProps = Omit<AntdPopConfirmProps, 'okType' | 'title'> & {
  description?: ReactNode;
  title?: ReactNode;
  images?: string[];
  imagesAutoplay?: boolean;
  imagesAutoplaySpeed?: number;
  onClick?: (event: MouseEvent<HTMLElement, MouseEvent>) => void;
  withLink?: ReactNode;
  closeIcon?: ReactNode;
  titlePadding?: boolean;
  hideButtons?: ReactNode;
  buttonsAlign?: 'left' | 'right';
  okType?: AntdPopConfirmProps['okType'] | string;
};

export type PopconfirmType = React.FC<PopconfirmProps> & {
  ConfirmMessage: React.FC<ConfirmMessageProps>;
};
