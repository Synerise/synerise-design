import type { CSSProperties, FC, ReactNode } from 'react';
import { ButtonProps } from '@synerise/ds-button';
import { ModalProps as AntdModalProps } from 'antd/lib/modal';

export type ModalProps = {
  description?: string;
  headerActions?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extraLarge' | 'fullSize';
  bodyBackground?: 'white' | 'grey';
  blank?: boolean;
  titleContainerStyle?: CSSProperties;
  settingButtonText?: string;
  texts?: {
    okButton?: string;
    cancelButton?: string;
  };
} & Omit<AntdModalProps, 'closable'> &
  ModalFooterBuilder;

export type ModalFooterBuilder = {
  prefix?: ReactNode;
  infix?: ReactNode;
  suffix?: ReactNode;
  okButton?: ReactNode;
  cancelButton?: ReactNode;
  DSButton?: FC<ButtonProps>;
};
