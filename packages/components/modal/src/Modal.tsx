import React, { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ModalContent } from './Elements/ModalContent/ModalContent';
import type { ModalProps, ModalRef } from './Modal.types';

export const Modal = forwardRef<ModalRef, ModalProps>(
  (
    { open, afterClose, getContainer, destroyOnClose = false, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(open);
    const [hasBeenOpened, setHasBeenOpened] = useState(open);

    useEffect(() => {
      setIsOpen(open);
      if (open) {
        setHasBeenOpened(true);
      }
    }, [open]);

    const shouldRender = destroyOnClose ? isOpen : isOpen || hasBeenOpened;

    if (!shouldRender) {
      return null;
    }

    return createPortal(
      <ModalContent
        {...props}
        afterClose={afterClose}
        ref={ref}
        hidden={!isOpen}
        closeModal={() => setIsOpen(false)}
      />,
      getContainer?.() || document.body,
    );
  },
);

export default Modal;
