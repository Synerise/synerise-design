import React from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { CloseM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';

import { type ModalTitleProps } from '../../Modal.types';
import * as S from './ModalTitle.styles';

export const ModalTitle = ({
  headerActions,
  blank,
  titleContainerStyle,
  onCancel,
  title,
  titleId,
  description,
  descriptionId,
  headerTabProps,
  headerBottomBar,
  closeButtonAriaLabel,
}: ModalTitleProps) => {
  const { formatMessage } = useIntl();
  const closeLabel =
    closeButtonAriaLabel ??
    formatMessage({ id: 'DS.MODAL.CLOSE', defaultMessage: 'Close' });
  return (
    <>
      {blank && onCancel && (
        <S.CloseButton
          mode="single-icon"
          data-testid="modal-close"
          className="close-modal"
          type="ghost"
          aria-label={closeLabel}
          onClick={onCancel}
        >
          <Icon component={<CloseM />} />
        </S.CloseButton>
      )}
      {(title || description || headerTabProps) && (
        <S.ModalHeaderTop>
          <S.ModalTitleWrapper
            withDescription={!!description}
            withTabs={!!headerTabProps}
          >
            {title && (
              <S.TitleContainer
                style={titleContainerStyle}
                data-testid="modal-title"
              >
                <S.Title level={3} id={titleId}>
                  {title}
                </S.Title>
                <S.ActionButtons>
                  {headerActions}
                  {onCancel && (
                    <Button
                      mode="single-icon"
                      data-testid="modal-close"
                      className="close-modal"
                      type="ghost"
                      aria-label={closeLabel}
                      onClick={onCancel}
                    >
                      <Icon component={<CloseM />} />
                    </Button>
                  )}
                </S.ActionButtons>
              </S.TitleContainer>
            )}

            {description && (
              <S.Description id={descriptionId}>{description}</S.Description>
            )}
          </S.ModalTitleWrapper>
          {headerTabProps && (
            <S.TabsWrapper>
              <Tabs topPadding={0} {...headerTabProps} />
            </S.TabsWrapper>
          )}
        </S.ModalHeaderTop>
      )}
      {headerBottomBar && <S.BottomBar>{headerBottomBar}</S.BottomBar>}
    </>
  );
};
