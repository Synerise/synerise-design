import { type ModalProps as AntdModalProps } from 'antd/lib/modal';
import type { CSSProperties, ComponentType, ReactNode } from 'react';

import { type ButtonProps } from '@synerise/ds-button';

/*
 * @deprecated use `ModalProps`
 */
export type Props = ModalProps;

export type ModalProps = {
  description?: ReactNode;
  headerBottomBar?: ReactNode;
  headerActions?: ReactNode;
  size?:
    | 'small'
    | 'medium'
    | 'large'
    | 'extraLarge'
    | 'fullSize'
    | 'fullScreen';
  bodyBackground?: 'white' | 'grey';
  blank?: boolean;
  titleContainerStyle?: CSSProperties;
  texts?: {
    okButton?: ReactNode;
    cancelButton?: ReactNode;
  };
  children?: ReactNode;
  maxViewportHeight?: true | number;
} & AntdModalProps &
  ModalFooterBuilder;

/*
 * @deprecated use `ModalProps`
 */
export type ModalFooterBuilder = {
  prefix?: ReactNode;
  infix?: ReactNode;
  suffix?: ReactNode;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  /*
   * @deprecated use `CustomFooterButton`
   */
  DSButton?: ComponentType<ButtonProps>;
  CustomFooterButton?: ComponentType<ButtonProps>;
};
