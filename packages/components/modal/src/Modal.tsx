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
}

const sizeMap = {
  [ModalSize.SMALL]: 520,
  [ModalSize.MEDIUM]: 792,
  [ModalSize.LARGE]: 1044,
  [ModalSize.EXTRA_LARGE]: 1280,
};

const ModalProxy = (props: Props) => {
  const { closable, headerActions, title, description, afterClose, size } = props;

  const onClose = () => afterClose && afterClose();

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
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
    />
  );
};

ModalProxy.defaultProps = {
  closable: true,
};

export default ModalProxy;
