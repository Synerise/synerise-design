import React, { FC } from 'react';
import Button, { ButtonProps } from '@synerise/ds-button';

import type { ButtonType } from 'antd/lib/button/button';
import { ModalProps } from '../../Modal.types';
import * as S from './ModalFooter.styles';

export type ModalFooterProps = Pick<
  ModalProps,
  | 'prefix'
  | 'infix'
  | 'suffix'
  | 'okButton'
  | 'cancelButton'
  | 'DSButton'
  | 'CustomFooterButton'
  | 'texts'
  | 'onOk'
  | 'onCancel'
  | 'cancelText'
  | 'okText'
  | 'cancelButtonProps'
  | 'okType'
  | 'okButtonProps'
>;

export const ModalFooter = ({
  DSButton = Button as unknown as FC<ButtonProps>,
  CustomFooterButton = Button as unknown as FC<ButtonProps>,
  prefix,
  infix,
  suffix,
  ...antModalProps
}: ModalFooterProps) => {
  const {
    onOk,
    onCancel,
    texts = {
      okButton: 'Apply',
      cancelButton: 'Cancel',
    },
  } = antModalProps;

  const CustomButton = CustomFooterButton || DSButton;
  return (
    <S.FooterContainer data-testid="modal-footer">
      {prefix}
      {antModalProps.cancelButton || (
        <CustomButton type="ghost" onClick={onCancel} disabled={!onCancel} {...antModalProps.cancelButtonProps}>
          {antModalProps.cancelText || texts?.cancelButton}
        </CustomButton>
      )}
      {infix}
      {antModalProps.okButton || (
        <CustomButton
          type={(antModalProps.okType as ButtonType) || 'primary'}
          onClick={onOk}
          disabled={!onOk}
          {...antModalProps.okButtonProps}
        >
          {antModalProps.okText || texts?.okButton}
        </CustomButton>
      )}
      {suffix}
    </S.FooterContainer>
  );
};
