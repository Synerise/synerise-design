import React, {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type TransitionEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { createOverlayCloseEvent, registerOverlay } from '@synerise/ds-core';
import { useFocusTrap, useLatestRef } from '@synerise/ds-utils';

import {
  DrawerBody,
  DrawerBodyBox,
  DrawerContent,
  DrawerContentWrapper,
  DrawerHeader,
  DrawerHeaderBack,
  DrawerHeaderBar,
  DrawerHeaderWithoutPadding,
  DrawerMask,
  DrawerRoot,
} from './Drawer.styles';
import { type DrawerCloseTrigger, type DrawerProps } from './Drawer.types';

const DEFAULT_WIDTH = 256;

const buildRootClassName = (
  placement: string,
  open: boolean,
  className?: string,
): string =>
  [
    'ant-drawer',
    'ds-drawer',
    `ant-drawer-${placement}`,
    `ds-drawer-${placement}`,
    open && 'ant-drawer-open',
    open && 'ds-drawer-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

const Drawer = ({
  open,
  visible,
  placement = 'right',
  width = DEFAULT_WIDTH,
  height,
  mask = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = false,
  getContainer,
  zIndex,
  onClose,
  afterVisibleChange,
  className,
  style,
  // `title` is never rendered — it only feeds the dialog's fallback accessible
  // name (see `dialogLabel`). `closable` is a no-op kept for back-compat.
  title,
  closable: _closable,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  ...rest
}: DrawerProps): React.ReactElement | null => {
  const isOpen = open ?? visible ?? false;

  // `shouldRender` keeps the tree in the DOM; `entered` drives the slide/fade.
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [entered, setEntered] = useState(isOpen);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mount on open; the exit unmount (destroyOnClose) happens on transition end.
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  // Toggle the enter/exit transform once mounted. Deferring the enter by a frame
  // lets the element mount off-screen first so the slide actually animates.
  useEffect(() => {
    if (isOpen && shouldRender && !entered) {
      const raf = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf);
    }
    if (!isOpen && entered) {
      setEntered(false);
    }
    return undefined;
  }, [isOpen, shouldRender, entered]);

  // Focus-trap only when acting as a modal overlay (mask on). Inline drawers
  // (mask={false}) are non-modal panels and must not trap focus.
  useFocusTrap(containerRef, isOpen && mask, { initialFocus: panelRef });

  // Join the overlay registry while open, so `closeAllOverlays()` calls the same
  // `onClose` that Escape does. Drawer is fully controlled: it closes when its
  // owner reacts to `onClose` by flipping `open`.
  const onCloseRef = useLatestRef(onClose);
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    return registerOverlay({
      kind: 'drawer',
      close: () =>
        onCloseRef.current?.(
          createOverlayCloseEvent<DrawerCloseTrigger>(containerRef.current),
        ),
    });
  }, [isOpen, onCloseRef]);

  const handleTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ): void => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== 'transform'
    ) {
      return;
    }
    if (isOpen) {
      afterVisibleChange?.(true);
    } else {
      afterVisibleChange?.(false);
      if (destroyOnClose) {
        setShouldRender(false);
      }
    }
  };

  const handleMaskClick = (event: ReactMouseEvent<HTMLDivElement>): void => {
    if (maskClosable) {
      onClose?.(event);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    if (keyboard && event.key === 'Escape') {
      event.stopPropagation();
      onClose?.(event);
    }
  };

  if (!shouldRender) {
    return null;
  }

  const inline = getContainer === false;

  // The dialog must have an accessible name: prefer the labelling element, then
  // an explicit label, then the non-rendered `title`.
  const dialogLabel = ariaLabelledby ? undefined : (ariaLabel ?? title);

  const content = (
    <DrawerRoot
      {...rest}
      ref={containerRef}
      className={buildRootClassName(placement, entered, className)}
      style={style}
      $inline={inline}
      $zIndex={zIndex}
      data-visible={entered}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {mask && (
        <DrawerMask
          className="ant-drawer-mask ds-drawer-mask"
          $open={entered}
          onClick={handleMaskClick}
        />
      )}
      <DrawerContentWrapper
        ref={panelRef}
        className="ant-drawer-content-wrapper ds-drawer-content-wrapper"
        $placement={placement}
        $open={entered}
        $width={width}
        $height={height}
        role="dialog"
        aria-modal={mask ? true : undefined}
        aria-label={dialogLabel}
        aria-labelledby={ariaLabelledby}
        tabIndex={-1}
        onTransitionEnd={handleTransitionEnd}
      >
        <DrawerBodyBox className="ant-drawer-body ds-drawer-body">
          {children}
        </DrawerBodyBox>
      </DrawerContentWrapper>
    </DrawerRoot>
  );

  if (inline) {
    return content;
  }

  const container =
    (typeof getContainer === 'function' ? getContainer() : undefined) ??
    document.body;

  return createPortal(content, container);
};

Drawer.DrawerBody = DrawerBody;
Drawer.DrawerHeader = DrawerHeader;
Drawer.DrawerHeaderBar = DrawerHeaderBar;
Drawer.DrawerHeaderWithoutPadding = DrawerHeaderWithoutPadding;
Drawer.DrawerContent = DrawerContent;
Drawer.DrawerHeaderBack = DrawerHeaderBack;

export default Drawer;
