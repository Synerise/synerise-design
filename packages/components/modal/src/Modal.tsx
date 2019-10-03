import * as React from 'react';

import Modal, { ModalProps } from 'antd/lib/modal';
import Icon from 'antd/lib/icon';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import * as S from './Modal.styles';

interface Props extends ModalProps {
  description?: string;
  headerActions?: React.ReactNode;
}

const ModalProxy = (props: Props) => {
  const { closable, headerActions, title, description } = props;

  return (
    <Modal
      {...props}
      closable={false}
      title={
        <>
          {title && (
            <S.TitleContainer>
              <S.Title>{title}</S.Title>
              <S.ActionButtons>
                {headerActions}
                {closable && (
                  <Button className="close-modal" type="ghost">
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
