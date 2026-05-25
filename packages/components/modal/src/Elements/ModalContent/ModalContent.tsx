import React, {
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { useFocusTrap } from '@synerise/ds-utils';

import { SIZE_MAP } from '../../Modal.const';
import { type ModalContentProps, type ModalRef } from '../../Modal.types';
import { ModalFooter } from '../ModalFooter';
import { ModalTitle } from '../ModalTitle';
import * as S from './ModalContent.styles';

export const ModalContent = forwardRef<ModalRef, ModalContentProps>(
  (
    {
      children,
      size = 'small',
      afterClose,
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
      closable = true,
      maskClosable = true,
      centered,
      hidden,
      ...rest
    },
    modalRef,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const DEFAULT_VIEWPORT_HEIGHT = 80;

    const isFullscreen = size === 'fullScreen';
    const maxHeight = useMemo(() => {
      if (maxViewportHeight !== undefined) {
        if (typeof maxViewportHeight === 'number') {
          return maxViewportHeight;
        }
        return DEFAULT_VIEWPORT_HEIGHT;
      }
      return undefined;
    }, [maxViewportHeight]);

    useEffect(() => {
      return () => {
        afterClose?.();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
      closeModal();
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
    useFocusTrap(containerRef, !hidden);

    return (
      <S.ModalRoot
        data-testid="ds-modal"
        {...rest}
        $hidden={hidden}
        data-visible={!hidden}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        ref={containerRef}
      >
        <S.ModalMask />
        <S.ModalScrollWrap ref={scrollRef} onClick={handleMaskClick}>
          <S.ModalContainer
            onClick={cancelClick}
            role="dialog"
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
              description={description}
              headerTabProps={headerTabProps}
              headerBottomBar={headerBottomBar}
            />
            <S.ModalBody
              greyBackground={bodyBackground === 'grey'}
              bodyFullWidth={bodyFullWidth}
              style={bodyStyle}
            >
              {maxHeight && !disableScrollbar ? (
                <S.ModalWrapper>
                  <S.Scrollbar absolute>{children}</S.Scrollbar>
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
    );
  },
);
