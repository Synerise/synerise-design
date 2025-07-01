import React from 'react';

import Button from '@synerise/ds-button';

import { type ButtonPanelProps } from './ButtonPanel.types';

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  onConfirm,
  onCancel,
  disabled,
  showCancel,
  texts,
  addButtonProps,
  cancelButtonProps,
}) => {
  return (
    <>
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
