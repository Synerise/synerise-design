import React from 'react';

import Textarea from '@synerise/ds-input/dist/Textarea/Textarea';
import ModalProxy from '@synerise/ds-modal';

import { type TextModalProps } from '../../Factors.types';

const TextModal: React.FC<TextModalProps> = ({
  value,
  onApply,
  onCancel,
  visible,
  texts,
}) => {
  // const [expandValue, setExpandValue] = React.useState('' || value); // TESTME
  const [expandValue, setExpandValue] = React.useState(value);

  React.useEffect(() => {
    setExpandValue(value);
  }, [value]);

  const handleCancel = React.useCallback(() => {
    setExpandValue(value);
    onCancel();
  }, [onCancel, setExpandValue, value]);

  const handleOk = React.useCallback(() => {
    onApply(expandValue);
  }, [onApply, expandValue]);

  return (
    <ModalProxy
      size="medium"
      title={texts.modalTitle}
      closable
      onOk={handleOk}
      onCancel={handleCancel}
      visible={visible}
      okText={texts.modalApply}
      cancelText={texts.modalCancel}
    >
      <Textarea
        rows={7}
        value={expandValue}
        onChange={(event): void => setExpandValue(event.target.value)}
      />
    </ModalProxy>
  );
};

export default TextModal;
