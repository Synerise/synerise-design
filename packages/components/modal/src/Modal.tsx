import * as React from 'react';

import Modal, { ModalProps } from 'antd/lib/modal';
import Icon from '@synerise/ds-icon';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import * as S from './Modal.styles';

interface Props extends ModalProps {
  description?: string;
  headerActions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extra_large';
  bodyBackground?: 'white' | 'grey';
  texts?: {
    okButton?: string;
    cancelButton?: string;
  };
}

const mapSizeToWidth = {
  small: 472,
  medium: 588,
  large: 996,
  extraLarge: 1232,
};

const ModalProxy: React.FC<Props> = ({
  texts,
  bodyBackground,
  closable,
  headerActions,
  title,
  description,
  size,
  ...antModalProps
}) => {
  const onClose = (): void => antModalProps.afterClose && antModalProps.afterClose();
  const className = `bodybg-${bodyBackground} ${antModalProps.className || ''}`;

  const titleContainer = (
    <>
      {title && (
        <S.TitleContainer>
          <S.Title level={3}>{title}</S.Title>
          <S.ActionButtons>
            {headerActions}
            {closable && (
              <Button className="close-modal" type="ghost" onClick={onClose}>
                <Icon component={<CloseM />} />
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
      className={className}
      width={!size ? undefined : mapSizeToWidth[size]}
      closable={false}
      title={titleContainer}
      footer={antModalProps.footer !== null ? footerContainer : null}
    />
  );
};

ModalProxy.defaultProps = {
  closable: true,
  bodyBackground: 'white',
  texts: {
    okButton: 'Apply',
    cancelButton: 'Cancel',
  },
};

export default ModalProxy;
