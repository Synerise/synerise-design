import React from 'react';
import Modal from '@synerise/ds-modal';

import { ArrayModalProps } from '../Array.types';

export const ArrayModal = ({ value, visible, texts, hideModal }: ArrayModalProps) => {
  return (
    <Modal visible={visible} size="small" title={texts.modalTitle} closable onCancel={hideModal}>
      {value.map(item => (
        <>{item}</>
      ))}
    </Modal>
  );
};
