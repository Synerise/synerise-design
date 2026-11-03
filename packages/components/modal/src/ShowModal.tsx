import React, { type MouseEvent, useState } from 'react';

import { setPortalContent } from '@synerise/ds-core';

import Modal from './Modal';
import type { ModalHandle, ModalProps } from './Modal.types';

let modalInstanceId = 0;

const isThenable = (value: unknown): value is Promise<unknown> =>
  !!value && typeof (value as { then?: unknown }).then === 'function';

// An imperative modal has no consumer holding its visibility, and `Modal` leaves
// closing to `onCancel` as soon as `open` is passed. This stands in for that
// consumer: it opens on mount and flips itself closed once `onCancel` resolves.
const ImperativeModal = ({ onCancel, ...props }: ModalProps) => {
  const [open, setOpen] = useState(true);

  const handleCancel = async (event: MouseEvent<HTMLElement>) => {
    const result = onCancel?.(event);
    if (isThenable(result)) {
      await result;
    }
    setOpen(false);
  };

  return (
    <Modal
      {...props}
      open={open}
      onCancel={onCancel ? handleCancel : undefined}
    />
  );
};

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
    <ImperativeModal
      key={modalInstanceId}
      {...initial}
      onOk={onOk ? handleOk : undefined}
      afterClose={() => {
        afterClose?.();
        cleanup();
      }}
    />,
  );

  return handle;
};
