import React, { useMemo } from 'react';

import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal';

import { BUTTON_TYPE_MAPPING } from '../Confirmation.const';
import * as S from '../Confirmation.styles';
import type { PromptProps } from '../Confirmation.types';
import { useDefaultTexts } from '../hooks/useDefaultTexts';

export const Prompt = ({
  type,
  texts,
  onCancel,
  onOk,
  mainButtonProps,
  secondaryButtonProps,
  content,
  ...modalProps
}: PromptProps) => {
  const allTexts = useDefaultTexts(texts);
  const buttonType = BUTTON_TYPE_MAPPING[type];
  const modalFooter = useMemo(() => {
    return (
      <S.Footer>
        <S.FooterRight>
          <Button type="secondary" onClick={onCancel} {...secondaryButtonProps}>
            {allTexts.secondaryButtonLabel}
          </Button>
          <Button type={buttonType} onClick={onOk} {...mainButtonProps}>
            {allTexts.mainButtonLabel}
          </Button>
        </S.FooterRight>
      </S.Footer>
    );
  }, [
    buttonType,
    onCancel,
    onOk,
    mainButtonProps,
    allTexts.mainButtonLabel,
    allTexts.secondaryButtonLabel,
    secondaryButtonProps,
  ]);
  return (
    <Modal
      {...modalProps}
      onCancel={onCancel}
      size="small"
      footer={modalFooter}
      bodyFullWidth
    >
      <S.PromptContent>{content}</S.PromptContent>
    </Modal>
  );
};
