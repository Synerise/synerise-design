import React, { forwardRef, useEffect, useRef, useState } from 'react';
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
    // Tracks `open` across renders so afterClose fires only on true → false,
    // matching antd. Initialised to match `open` so the initial render is a no-op.
    const prevOpenRef = useRef(open);

    useEffect(() => {
      setIsOpen(open);
      if (open) {
        setHasBeenOpened(true);
      } else if (prevOpenRef.current) {
        afterClose?.();
      }
      prevOpenRef.current = open;
    }, [open, afterClose]);

    const closeModal = () => {
      setIsOpen((prev) => {
        if (prev) {
          afterClose?.();
        }
        return false;
      });
    };

    const shouldRender = destroyOnClose ? isOpen : isOpen || hasBeenOpened;

    if (!shouldRender) {
      return null;
    }

    return createPortal(
      <ModalContent
        {...props}
        ref={ref}
        hidden={!isOpen}
        closeModal={closeModal}
      />,
      getContainer?.() || document.body,
    );
  },
);

export default Modal;
