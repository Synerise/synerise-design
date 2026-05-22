import React from 'react';

import { setPortalContent } from '@synerise/ds-core';

import Modal from './Modal';
import { type ModalHandle, type ModalProps } from './Modal.types';

let modalInstanceId = 0;

export const showModal = ({
  afterClose,
  ...initial
}: ModalProps): ModalHandle => {
  const cleanup = () => {
    setPortalContent(null);
  };

  modalInstanceId += 1;
  setPortalContent(
    <Modal
      key={modalInstanceId}
      {...initial}
      open
      afterClose={() => {
        afterClose?.();
        cleanup();
      }}
    />,
  );

  return {
    destroy: cleanup,
  };
};
