import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useLatestRef } from '@synerise/ds-utils';

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
    // Held in a ref so an inline `afterClose` (new identity every render) cannot
    // re-run the sync effect and re-open a modal that was just closed internally.
    const afterCloseRef = useLatestRef(afterClose);

    useEffect(() => {
      setIsOpen(open);
      if (open) {
        setHasBeenOpened(true);
      } else if (prevOpenRef.current) {
        afterCloseRef.current?.();
      }
      prevOpenRef.current = open;
    }, [open, afterCloseRef]);

    const closeModal = () => {
      setIsOpen((prev) => {
        if (prev) {
          afterCloseRef.current?.();
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
