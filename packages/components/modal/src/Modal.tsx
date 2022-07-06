import * as React from 'react';

import Modal from 'antd/lib/modal';
import Icon, { CloseM } from '@synerise/ds-icon';
import type { ButtonProps } from 'antd/lib/button';
import type { ButtonType } from 'antd/lib/button/button';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import classnames from 'classnames';
import * as S from './Modal.styles';
import { Props } from './Modal.types';

const mapSizeToWidth = {
  small: 520,
  medium: 792,
  large: 1044,
  extraLarge: 1280,
  fullSize: '100%',
};

export type ModalFooterBuilder = {
  prefix?: React.ReactNode;
  infix?: React.ReactNode;
  suffix?: React.ReactNode;
  okButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
  DSButton?: React.FC<ButtonProps>;
};

export function buildModalFooter({
  DSButton = Button as unknown as React.FC<ButtonProps>,
  prefix,
  infix,
  suffix,
  ...antModalProps
}: Props & ModalFooterBuilder): React.ReactNode {
  const { onOk, onCancel, texts } = antModalProps;
  return (
    <S.FooterContainer>
      {prefix}
      {antModalProps.cancelButton || (
        <DSButton type="ghost" onClick={onCancel} disabled={!onCancel} {...antModalProps.cancelButtonProps}>
          {antModalProps.cancelText || texts?.cancelButton}
        </DSButton>
      )}
      {infix}
      {antModalProps.okButton || (
        <DSButton
          type={(antModalProps.okType as ButtonType) || 'primary'}
          onClick={onOk}
          disabled={!onOk}
          {...antModalProps.okButtonProps}
        >
          {antModalProps.okText || texts?.okButton}
        </DSButton>
      )}
      {suffix}
    </S.FooterContainer>
  );
}

class ModalProxy extends React.Component<Props> {
  static defaultProps = {
    closable: true,
    bodyBackground: 'white',
    texts: {
      okButton: 'Apply',
      cancelButton: 'Cancel',
    },
  };

  static info = Modal.info;
  static success = Modal.success;
  static error = Modal.error;
  static warning = Modal.warning;
  static confirm = Modal.confirm;

  render(): React.ReactNode {
    const {
      texts,
      bodyBackground,
      closable,
      headerActions,
      title,
      description,
      size,
      blank,
      settingButtonText,
      titleContainerStyle,
      ...antModalProps
    } = this.props;
    const handleOnClose = antModalProps.onCancel;
    const className = classnames(
      `bodybg-${bodyBackground}`,
      antModalProps.className,
      { 'modal-blank': Boolean(blank) },
      { 'with-description': Boolean(description) }
    );

    const titleContainer = (
      <>
        {blank && closable && (
          <Button
            mode="single-icon"
            data-testid="modal-close"
            className="close-modal"
            type="ghost"
            onClick={handleOnClose}
          >
            <Icon component={<CloseM />} />
          </Button>
        )}
        {title && (
          <S.TitleContainer style={titleContainerStyle}>
            <S.Title level={3}>{title}</S.Title>
            <S.ActionButtons>
              {headerActions}
              {closable && (
                <Button
                  mode="single-icon"
                  data-testid="modal-close"
                  className="close-modal"
                  type="ghost"
                  onClick={handleOnClose}
                >
                  <Icon component={<CloseM />} />
                </Button>
              )}
            </S.ActionButtons>
          </S.TitleContainer>
        )}

        {description && <S.Description>{description}</S.Description>}
      </>
    );
    const footerContainer = antModalProps.footer || buildModalFooter(this.props);

    return (
      <S.AntdModal
        {...antModalProps}
        className={className}
        width={!size ? undefined : mapSizeToWidth[size]}
        closable={false}
        title={(title || description || blank) && titleContainer}
        footer={antModalProps.footer !== null ? footerContainer : null}
      />
    );
  }
}

export default ModalProxy;
