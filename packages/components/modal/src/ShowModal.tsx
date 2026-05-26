import React, { type MouseEvent } from 'react';

import { setPortalContent } from '@synerise/ds-core';

import Modal from './Modal';
import { type ModalHandle, type ModalProps } from './Modal.types';

let modalInstanceId = 0;

const isThenable = (value: unknown): value is Promise<unknown> =>
  !!value && typeof (value as { then?: unknown }).then === 'function';

export const showModal = ({
  onOk,
  afterClose,
  ...initial
}: ModalProps): ModalHandle => {
  const cleanup = () => {
    setPortalContent(null);
  };

  const handle: ModalHandle = { destroy: cleanup };

  const handleOk = async (event: MouseEvent<HTMLElement>) => {
    const result = onOk?.(event);
    if (isThenable(result)) {
      await result;
      handle.destroy();
    }
  };

  modalInstanceId += 1;
  setPortalContent(
    <Modal
      key={modalInstanceId}
      {...initial}
      open
      onOk={onOk ? handleOk : undefined}
      afterClose={() => {
        afterClose?.();
        cleanup();
      }}
    />,
  );

  return handle;
};
