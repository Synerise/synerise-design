import React from 'react';

import Button, { type ButtonProps } from '@synerise/ds-button';

import { type ModalProps } from '../../Modal.types';
import * as S from './ModalFooter.styles';

export type ModalFooterProps = Pick<
  ModalProps,
  | 'prefix'
  | 'infix'
  | 'suffix'
  | 'okButton'
  | 'cancelButton'
  | 'CustomFooterButton'
  | 'DSButton'
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
  CustomFooterButton = Button,
  DSButton = Button,
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

  const CustomButton = (CustomFooterButton ||
    DSButton) as React.ComponentType<ButtonProps>;

  return (
    <S.FooterContainer data-testid="modal-footer">
      {prefix}
      {antModalProps.cancelButton || (
        <CustomButton
          type="ghost"
          disabled={!onCancel}
          onClick={onCancel}
          {...antModalProps.cancelButtonProps}
        >
          {antModalProps.cancelText || texts?.cancelButton}
        </CustomButton>
      )}
      {infix}
      {antModalProps.okButton || (
        <CustomButton
          type={antModalProps.okType || 'primary'}
          disabled={!onOk}
          onClick={onOk}
          {...antModalProps.okButtonProps}
        >
          {antModalProps.okText || texts?.okButton}
        </CustomButton>
      )}
      {suffix}
    </S.FooterContainer>
  );
};
