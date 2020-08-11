import * as React from 'react';
import Button from '@synerise/ds-button';
import { ButtonPanelProps } from './ButtonPanel.types';

const ButtonPanel: React.FC<ButtonPanelProps> = ({ onConfirm, onCancel, disabled, showCancel }) => {
  return (
    <>
      {showCancel && (
        <Button type="ghost" disabled={disabled} onClick={onCancel}>
          Cancel
        </Button>
      )}
      <Button type="primary" disabled={disabled} onClick={onConfirm}>
        Siema
      </Button>
    </>
  );
};

export default ButtonPanel;
