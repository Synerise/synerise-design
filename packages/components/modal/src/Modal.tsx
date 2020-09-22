import * as React from 'react';

import Modal from 'antd/lib/modal';
import Icon from '@synerise/ds-icon';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';

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
          <S.TitleContainer>
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

    const footerContainer = antModalProps.footer || (
      <S.FooterContainer>
        {/* eslint-disable-next-line */}
        <Button type="ghost" onClick={antModalProps.onCancel} {...antModalProps.cancelButtonProps}>
          {texts && texts.cancelButton}
        </Button>

        {/* eslint-disable-next-line */}
        <Button type={antModalProps.okType || 'primary'} onClick={antModalProps.onOk} {...antModalProps.okButtonProps}>
          {texts && texts.okButton}
        </Button>
      </S.FooterContainer>
    );

    return (
      <S.AntdModal
        // eslint-disable-next-line react/jsx-props-no-spreading
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
