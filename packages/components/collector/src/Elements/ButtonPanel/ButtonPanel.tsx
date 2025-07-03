import React, { type FocusEvent } from 'react';

import Button from '@synerise/ds-button';

import * as S from './ButtonPanel.styles';
import { type ButtonPanelProps } from './ButtonPanel.types';

const ButtonPanel = ({
  onConfirm,
  onCancel,
  disabled,
  showCancel,
  texts,
  addButtonProps,
  cancelButtonProps,
  buttonPanelPrefix,
}: ButtonPanelProps) => {
  return (
    <>
      {buttonPanelPrefix && (
        <S.ButtonPanelPrefix
          onFocus={(event: FocusEvent) => event.stopPropagation()}
        >
          {buttonPanelPrefix}
        </S.ButtonPanelPrefix>
      )}
      {showCancel && (
        <Button
          type="ghost"
          disabled={disabled}
          onClick={onCancel}
          onFocus={(e): void => e.stopPropagation()}
          {...cancelButtonProps}
        >
          {texts?.cancel}
        </Button>
      )}
      <Button
        type="primary"
        disabled={disabled}
        onClick={onConfirm}
        onFocus={(e): void => e.stopPropagation()}
        {...addButtonProps}
      >
        {texts?.add}
      </Button>
    </>
  );
};

export default ButtonPanel;
