import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { CloseM } from '@synerise/ds-icon';

import { ModalProps } from '../../Modal.types';
import * as S from './ModalTitle.styles';

type ModalTitleProps = Pick<
  ModalProps,
  'headerActions' | 'onCancel' | 'titleContainerStyle' | 'blank' | 'description' | 'title' | 'headerBottomBar'
>;

export const ModalTitle = ({
  headerActions,
  blank,
  titleContainerStyle,
  onCancel,
  title,
  description,
  headerBottomBar,
}: ModalTitleProps) => {
  return (
    <>
      {blank && onCancel && (
        <Button mode="single-icon" data-testid="modal-close" className="close-modal" type="ghost" onClick={onCancel}>
          <Icon component={<CloseM />} />
        </Button>
      )}
      {(title || description) && (
        <S.ModalTitleWrapper withDescription={!!description}>
          {title && (
            <S.TitleContainer style={titleContainerStyle} data-testid="modal-title">
              <S.Title level={3}>{title}</S.Title>
              <S.ActionButtons>
                {headerActions}
                {onCancel && (
                  <Button
                    mode="single-icon"
                    data-testid="modal-close"
                    className="close-modal"
                    type="ghost"
                    onClick={onCancel}
                  >
                    <Icon component={<CloseM />} />
                  </Button>
                )}
              </S.ActionButtons>
            </S.TitleContainer>
          )}

          {description && <S.Description>{description}</S.Description>}
        </S.ModalTitleWrapper>
      )}
      {headerBottomBar && <S.BottomBar>{headerBottomBar}</S.BottomBar>}
    </>
  );
};
