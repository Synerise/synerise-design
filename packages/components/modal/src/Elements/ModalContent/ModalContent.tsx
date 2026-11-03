import React, {
  forwardRef,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  createOverlayCloseEvent,
  OverlayZIndexProvider,
  registerOverlay,
  useResolvedOverlayZIndex,
} from '@synerise/ds-core';
import { useFocusTrap, useLatestRef } from '@synerise/ds-utils';

import { SIZE_MAP } from '../../Modal.const';
import type { ModalContentProps, ModalRef } from '../../Modal.types';
import { ModalFooter } from '../ModalFooter';
import { ModalTitle } from '../ModalTitle';
import * as S from './ModalContent.styles';

export const ModalContent = forwardRef<ModalRef, ModalContentProps>(
  (
    {
      children,
      size = 'small',
      maxViewportHeight,
      headerActions,
      blank,
      titleContainerStyle,
      title,
      closeModal,
      description,
      headerTabProps,
      headerBottomBar,
      CustomFooterButton,
      prefix,
      infix,
      suffix,
      onOk,
      onCancel,
      texts,
      okButton,
      okButtonProps,
      cancelButton,
      cancelButtonProps,
      cancelText,
      okText,
      okType,
      bodyBackground,
      bodyFullWidth,
      footer,
      bodyStyle,
      disableScrollbar,
      bodyScrollRef,
      closable = true,
      maskClosable = true,
      centered,
      hidden,
      ariaLabel,
      closeButtonAriaLabel,
      initialFocusRef,
      zIndex,
      className,
      ...rest
    },
    modalRef,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [cancelAttempts, setCancelAttempts] = useState(0);
    // One step above the enclosing overlay when the consumer gave no explicit
    // `zIndex`, so a modal opened from inside another modal stacks above it.
    const resolvedZIndex = useResolvedOverlayZIndex(zIndex);
    const titleId = useId();
    const descriptionId = useId();
    const DEFAULT_VIEWPORT_HEIGHT = 80;

    const isFullscreen = size === 'fullScreen';
    const rootClassName = [
      'ds-modal',
      isFullscreen && 'ds-modal-fullscreen',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const maxHeight = useMemo(() => {
      if (maxViewportHeight !== undefined) {
        if (typeof maxViewportHeight === 'number') {
          return maxViewportHeight;
        }
        return DEFAULT_VIEWPORT_HEIGHT;
      }
      return undefined;
    }, [maxViewportHeight]);

    // Whether the custom scrollbar wraps the body — mirrors the render branch below.
    // Drives where bodyScrollRef is attached: the scrollbar's scroll node when active,
    // otherwise the body element itself.
    const useScrollbar = !!maxHeight && !disableScrollbar;

    const scrollToTop = useCallback(() => {
      scrollRef.current?.scrollTo(0, 0);
    }, []);
    const scrollToBottom = useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
      }
    }, []);

    useImperativeHandle(modalRef, () => ({
      scrollToTop,
      scrollToBottom,
    }));

    const handleCancel = async (event: MouseEvent<HTMLElement>) => {
      if (!onCancel) {
        closeModal();
        return;
      }
      const onCancelResult = onCancel(event);
      if (onCancelResult?.then !== undefined) {
        await onCancelResult;
      }
      // Visibility belongs to `open`, so the cancel ends here. Hiding the modal
      // from the inside would leave the consumer holding `open: true` with no
      // prop change to come — and a consumer that refuses the close (an
      // unsaved-changes prompt, say) could never show the modal again.
      setCancelAttempts((attempts) => attempts + 1);
    };

    const handleOk = (event: MouseEvent<HTMLElement>) => {
      onOk?.(event);
    };

    const cancelClick = (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    };

    const handleMaskClick = (event: MouseEvent<HTMLElement>) => {
      if (maskClosable) {
        handleCancel(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && onCancel && closable) {
        event.stopPropagation();
        handleCancel(event as unknown as MouseEvent<HTMLElement>);
      }
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    // Join the overlay registry while visible, so `closeAllOverlays()` runs the
    // same path as the close button: `onCancel`, awaited when async, and the
    // close itself left to the consumer. Focus restore comes from the focus
    // trap's cleanup below.
    //
    // The registry retires an entry as soon as it has swept it, counting on the
    // overlay to unregister and come back when it reopens. A modal whose consumer
    // refuses the close never hides, so it would stay retired and no later sweep
    // could reach it; re-registering on each refused attempt restores it.
    const handleCancelRef = useLatestRef(handleCancel);
    // biome-ignore lint/correctness/useExhaustiveDependencies: cancelAttempts is the re-registration trigger, not a value the effect reads
    useEffect(() => {
      if (hidden) {
        return undefined;
      }
      return registerOverlay({
        kind: 'modal',
        close: () =>
          handleCancelRef.current(
            createOverlayCloseEvent<MouseEvent<HTMLElement>>(
              containerRef.current,
            ),
          ),
      });
    }, [hidden, cancelAttempts, handleCancelRef]);

    // By default focus the dialog container itself (announced by screen readers
    // via its accessible name) instead of the first focusable field. Consumers
    // can opt into focusing a specific control via `initialFocusRef`.
    useFocusTrap(containerRef, !hidden, {
      initialFocus: initialFocusRef ?? dialogRef,
    });

    return (
      <OverlayZIndexProvider value={resolvedZIndex}>
        <S.ModalRoot
          data-testid="ds-modal"
          {...rest}
          className={rootClassName}
          zIndex={resolvedZIndex}
          $hidden={hidden}
          data-visible={!hidden}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          ref={containerRef}
        >
          <S.ModalMask className="ds-modal-mask" />
          <S.ModalScrollWrap
            className="ds-modal-wrap"
            ref={scrollRef}
            onClick={handleMaskClick}
          >
            <S.ModalContainer
              className="ds-modal-dialog"
              ref={dialogRef}
              tabIndex={-1}
              onClick={cancelClick}
              role="dialog"
              aria-modal
              aria-labelledby={title ? titleId : undefined}
              aria-label={!title ? ariaLabel : undefined}
              aria-describedby={description ? descriptionId : undefined}
              isFullscreen={isFullscreen}
              $width={size && SIZE_MAP[size]}
              maxHeight={maxHeight}
              centered={centered}
            >
              <ModalTitle
                headerActions={headerActions}
                blank={blank}
                titleContainerStyle={titleContainerStyle}
                onCancel={closable && onCancel ? handleCancel : undefined}
                title={title}
                titleId={titleId}
                description={description}
                descriptionId={descriptionId}
                headerTabProps={headerTabProps}
                headerBottomBar={headerBottomBar}
                closeButtonAriaLabel={closeButtonAriaLabel}
              />
              <S.ModalBody
                ref={useScrollbar ? undefined : bodyScrollRef}
                greyBackground={bodyBackground === 'grey'}
                bodyFullWidth={bodyFullWidth}
                style={bodyStyle}
              >
                {useScrollbar ? (
                  <S.ModalWrapper>
                    <S.Scrollbar
                      scrollbarOptions={{ suppressScrollX: true }}
                      absolute
                      classes="ds-modal-body-scrollbar"
                      ref={bodyScrollRef}
                    >
                      {children}
                    </S.Scrollbar>
                  </S.ModalWrapper>
                ) : (
                  children
                )}
              </S.ModalBody>

              <ModalFooter
                CustomFooterButton={CustomFooterButton}
                prefix={prefix}
                infix={infix}
                suffix={suffix}
                onOk={onOk ? handleOk : undefined}
                onCancel={onCancel ? handleCancel : undefined}
                texts={texts}
                okButton={okButton}
                okButtonProps={okButtonProps}
                cancelButton={cancelButton}
                cancelButtonProps={cancelButtonProps}
                cancelText={cancelText}
                okText={okText}
                okType={okType}
                footer={footer}
              />
            </S.ModalContainer>
          </S.ModalScrollWrap>
        </S.ModalRoot>
      </OverlayZIndexProvider>
    );
  },
);
