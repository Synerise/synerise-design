import * as React from 'react';
import Button from '@synerise/ds-button';
import { ButtonPanelProps } from './ButtonPanel.types';

const ButtonPanel: React.FC<ButtonPanelProps> = ({ onConfirm, onCancel, disabled, showCancel, texts }) => {
  return (
    <>
      {showCancel && (
        <Button type="ghost" disabled={disabled} onClick={onCancel}>
          {texts?.cancel}
        </Button>
      )}
      <Button type="primary" disabled={disabled} onClick={onConfirm}>
        {texts?.add}
      </Button>
    </>
  );
};

export default ButtonPanel;
