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
  return (
    <Modal
      {...props}
      closable={false}
      title={
        <>
          {props.title && (
            <S.TitleContainer>
              <S.Title>{props.title}</S.Title>
              <S.ActionButtons>
                {props.headerActions}
                {props.closable && (
                  <Button className="close-modal" type="ghost">
                    <Icon type="close" />
                  </Button>
                )}
              </S.ActionButtons>
            </S.TitleContainer>
          )}

          {props.description && <S.Description>{props.description}</S.Description>}
        </>
      }
    />
  );
};

ModalProxy.defaultProps = {
  closable: true,
};

export default ModalProxy;
