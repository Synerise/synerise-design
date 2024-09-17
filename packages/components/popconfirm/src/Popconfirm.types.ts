import React from 'react';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmType = React.FC<
  Omit<PopconfirmProps, 'okType'> & {
    description?: string | React.ReactNode;
    images?: string[];
    imagesAutoplay?: boolean;
    imagesAutoplaySpeed?: number;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    withLink?: React.ReactNode;
    closeIcon?: React.ReactNode;
    titlePadding?: boolean;
    hideButtons?: React.ReactNode;
    buttonsAlign?: 'left' | 'right';
    okType?: PopconfirmProps['okType'] | string;
  }
> & {
  ConfirmMessage: React.FC<ConfirmMessageProps>;
};
