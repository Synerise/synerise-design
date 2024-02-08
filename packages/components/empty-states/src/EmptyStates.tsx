import React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './EmptyStates.styles';
import { EmptyStatesProps, EmptyStatesSize } from './EmptyStates.types';

const mapSizeToPx = {
  [EmptyStatesSize.SMALL]: 48,
  [EmptyStatesSize.MEDIUM]: 96,
};

const EmptyStates = ({
  size = EmptyStatesSize.SMALL,
  label,
  labelPosition = 'right',
  text,
  button,
  fontSize,
  customIcon,
  className,
  mode,
}: EmptyStatesProps) => {
  return (
    <S.EmptyStatesWrapper mode={mode} className={`ds-empty-states ${className}`} labelPosition={labelPosition}>
      {customIcon && (
        <S.EmptyStatesIconContainer size={size}>
          <S.StatusIconContainer>
            <Icon data-testid="empty-states-custom-icon" component={customIcon} size={mapSizeToPx[size]} />
          </S.StatusIconContainer>
        </S.EmptyStatesIconContainer>
      )}
      {text && (
        <S.HeaderWrapper data-testid="empty-states-header" size={size} fontSize={fontSize}>
          {text}
        </S.HeaderWrapper>
      )}
      {label && (
        <S.TextWrapper data-testid="empty-states-label" labelPosition={labelPosition}>
          {label}
        </S.TextWrapper>
      )}
      {button && <S.ButtonWrapper>{button}</S.ButtonWrapper>}
    </S.EmptyStatesWrapper>
  );
};
export default EmptyStates;
