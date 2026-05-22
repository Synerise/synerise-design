import React from 'react';

import Button from '@synerise/ds-button';

import { type ModalFooterProps } from '../../Modal.types';
import * as S from './ModalFooter.styles';

export const ModalFooter = ({
  CustomFooterButton = Button,
  prefix,
  infix,
  suffix,
  onOk,
  onCancel,
  texts = {
    okButton: 'Apply',
    cancelButton: 'Cancel',
  },
  okButton,
  okButtonProps,
  cancelButton,
  cancelButtonProps,
  cancelText,
  okText,
  okType,
  footer,
}: Partial<ModalFooterProps>) => {
  return footer !== null ? (
    <S.FooterContainer>
      {footer || (
        <S.FooterWrapper data-testid="modal-footer">
          {prefix}
          {cancelButton || (
            <CustomFooterButton
              type="ghost"
              onClick={onCancel}
              disabled={!onCancel}
              {...cancelButtonProps}
            >
              {cancelText || texts?.cancelButton}
            </CustomFooterButton>
          )}
          {infix}
          {okButton || (
            <CustomFooterButton
              type={okType || 'primary'}
              onClick={onOk}
              disabled={!onOk}
              {...okButtonProps}
            >
              {okText || texts?.okButton}
            </CustomFooterButton>
          )}
          {suffix}
        </S.FooterWrapper>
      )}
    </S.FooterContainer>
  ) : null;
};
