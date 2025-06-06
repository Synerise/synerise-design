import React, { useRef } from 'react';
import classnames from 'classnames';

import '@synerise/ds-core/dist/js/style';
import { Modal as AntModal } from 'antd';
import Scrollbar from '@synerise/ds-scrollbar';

import { useResizeObserver } from '@synerise/ds-utils';
import { ModalFooter, ModalFooterProps } from './Elements/ModalFooter';
import { ModalTitle } from './Elements/ModalTitle';
import type { ModalProps } from './Modal.types';
import './style/index.less';
import * as S from './Modal.styles';

const mapSizeToWidth = {
  small: 520,
  medium: 792,
  large: 1044,
  extraLarge: 1280,
  fullSize: '100%',
  fullScreen: '100%',
};

/** @deprecated */
export const buildModalFooter = (props: ModalFooterProps) => <ModalFooter {...props} />;

export const Modal = (props: ModalProps) => {
  const {
    texts,
    bodyBackground = 'white',
    headerActions,
    title,
    description,
    size,
    blank,
    settingButtonText,
    titleContainerStyle,
    maxViewportHeight,
    children,
    ...antModalProps
  } = props;

  const className = classnames(
    `bodybg-${bodyBackground}`,
    antModalProps.className,
    { 'modal-blank': Boolean(blank) },
    { 'with-description': Boolean(description) }
  );

  const mainSlideRef = useRef<HTMLDivElement>(null);
  const { height } = useResizeObserver(mainSlideRef);
  const DEFAULT_HEIGHT = 999999;
  const DEFAULT_VIEWPORT_HEIGHT = 80;

  const maxHeight = () => {
    if (maxViewportHeight !== undefined) {
      if (typeof maxViewportHeight === 'number') {
        return maxViewportHeight;
      }
      return DEFAULT_VIEWPORT_HEIGHT;
    }
    return undefined;
  };

  const isFullscreen = size === 'fullScreen';

  return (
    <S.AntdModal
      {...antModalProps}
      maxHeight={maxHeight()}
      className={className}
      isFullscreen={isFullscreen}
      width={size && mapSizeToWidth[size]}
      closable={false}
      title={(title || description || blank) && <ModalTitle {...props} />}
      footer={antModalProps.footer !== null ? antModalProps.footer || <ModalFooter {...props} /> : null}
    >
      {maxHeight() ? (
        <S.ModalWrapper ref={mainSlideRef}>
          <Scrollbar maxHeight={height || DEFAULT_HEIGHT}>{children}</Scrollbar>
        </S.ModalWrapper>
      ) : (
        children
      )}
    </S.AntdModal>
  );
};

Modal.info = AntModal.info;
Modal.success = AntModal.success;
Modal.error = AntModal.error;
Modal.warning = AntModal.warning;
Modal.confirm = AntModal.confirm;

export default Modal;
