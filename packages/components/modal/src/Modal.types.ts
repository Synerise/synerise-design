import { type ModalProps as AntdModalProps } from 'antd/lib/modal';
import type { CSSProperties, ComponentType, ReactNode } from 'react';

import { type ButtonProps } from '@synerise/ds-button';
import { type TabsProps } from '@synerise/ds-tabs';

/*
 * @deprecated use `ModalProps`
 */
export type Props = ModalProps;

export type ModalProps = {
  /**
   * @deprecated - this prop will be removed soon
   */
  description?: ReactNode;
  headerBottomBar?: ReactNode;
  headerActions?: ReactNode;
  headerTabProps?: TabsProps;
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
