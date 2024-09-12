import React from 'react';
import Modal from '@synerise/ds-modal';

import { ArrayModalProps } from '../Array.types';

export const ArrayModal = ({ value }: ArrayModalProps) => {
  return (
    <Modal>
      {value.map(item => (
        <>{item}</>
      ))}
    </Modal>
  );
};
