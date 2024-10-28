import { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { PopconfirmProps as AntdPopconfirmProps } from 'antd/lib/popconfirm';
import { ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmProps = Omit<AntdPopconfirmProps, 'okType'> & {
  description?: string | ReactNode;
  images?: string[];
  imagesAutoplay?: boolean;
  imagesAutoplaySpeed?: number;
  onClick?: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
  withLink?: ReactNode;
  closeIcon?: ReactNode;
  titlePadding?: boolean;
  hideButtons?: ReactNode;
  buttonsAlign?: 'left' | 'right';
  okType?: AntdPopconfirmProps['okType'] | string;
  children?: ReactNode;
};

export type PopconfirmType = {
  (props: PopconfirmProps): JSX.Element;
  ConfirmMessage: (props: ConfirmMessageProps) => JSX.Element;
};
