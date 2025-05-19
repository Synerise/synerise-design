import type { CSSProperties, ComponentType, ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';
import { ModalProps as AntdModalProps } from 'antd/lib/modal';

/*
 * @deprecated use `ModalProps`
 */
export type Props = ModalProps;

export type ModalProps = {
  description?: string;
  headerActions?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extraLarge' | 'fullSize' | 'fullScreen';
  bodyBackground?: 'white' | 'grey';
  blank?: boolean;
  titleContainerStyle?: CSSProperties;
  settingButtonText?: string;
  texts?: {
    okButton?: string;
    cancelButton?: string;
  };
  children?: ReactNode;
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
