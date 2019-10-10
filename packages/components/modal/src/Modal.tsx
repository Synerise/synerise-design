import * as React from 'react';

import Modal, { ModalProps } from 'antd/lib/modal';
import Icon from 'antd/lib/icon';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import * as S from './Modal.styles';

enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

interface Props extends ModalProps {
  description?: string;
  headerActions?: React.ReactNode;
  size?: ModalSize;
  texts: {
    applyButton: string;
    cancelButton: string;
  };
}

const sizeMap = {
  [ModalSize.SMALL]: 520,
  [ModalSize.MEDIUM]: 792,
  [ModalSize.LARGE]: 1044,
  [ModalSize.EXTRA_LARGE]: 1280,
};

const ModalProxy: React.FC<Props> = ({
  texts,
  closable,
  headerActions,
  title,
  description,
  size,
  ...antModalProps
}) => {
  const onClose = (): void => antModalProps.afterClose && antModalProps.afterClose();

  const footer = (
    <S.FooterContainer>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Button type="ghost" onClick={antModalProps.onCancel}>
        {texts.cancelButton}
      </Button>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Button type="primary" onClick={antModalProps.onOk}>
        {texts.applyButton}
      </Button>
    </S.FooterContainer>
  );

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antModalProps}
      width={!size ? undefined : sizeMap[size]}
      closable={false}
      title={
        <>
          {title && (
            <S.TitleContainer>
              <S.Title>{title}</S.Title>
              <S.ActionButtons>
                {headerActions}
                {closable && (
                  <Button className="close-modal" type="ghost" onClick={onClose}>
                    <Icon type="close" />
                  </Button>
                )}
              </S.ActionButtons>
            </S.TitleContainer>
          )}

          {description && <S.Description>{description}</S.Description>}
        </>
      }
      footer={antModalProps.footer || footer}
    />
  );
};

ModalProxy.defaultProps = {
  closable: true,
  texts: {
    applyButton: 'Apply',
    cancelButton: 'Cancel',
  },
};

export default ModalProxy;
