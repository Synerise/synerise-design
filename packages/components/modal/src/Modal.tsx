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
  texts?: {
    okButton: string;
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

  const titleContainer = (
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
  );

  const footerContainer = antModalProps.footer || (
    <S.FooterContainer>
      {/* eslint-disable-next-line */}
      <Button type="ghost" onClick={antModalProps.onCancel} {...antModalProps.cancelButtonProps}>
        {texts.cancelButton}
      </Button>

      {/* eslint-disable-next-line */}
      <Button type={antModalProps.okType || 'primary'} onClick={antModalProps.onOk} {...antModalProps.okButtonProps}>
        {texts.okButton}
      </Button>
    </S.FooterContainer>
  );

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antModalProps}
      width={!size ? undefined : sizeMap[size]}
      closable={false}
      title={titleContainer}
      footer={antModalProps.footer !== null ? footerContainer : null}
    />
  );
};

ModalProxy.defaultProps = {
  closable: true,
  texts: {
    okButton: 'Apply',
    cancelButton: 'Cancel',
  },
};

export default ModalProxy;
