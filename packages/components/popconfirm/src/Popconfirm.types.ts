import { type PopconfirmProps as AntdPopconfirmProps } from 'antd/lib/popconfirm';
import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

import { type ConfirmMessageProps } from './ConfirmMessage/ConfirmMessage.types';

export type PopconfirmTexts = Pick<
  PopconfirmProps,
  'okText' | 'description' | 'title' | 'cancelText'
>;

export type PopconfirmProps = Omit<AntdPopconfirmProps, 'okType'> & {
  description?: ReactNode;
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
  staticVisible?: boolean;
};

export type PopconfirmType = {
  (props: PopconfirmProps): JSX.Element;
  ConfirmMessage: (props: ConfirmMessageProps) => JSX.Element;
};
