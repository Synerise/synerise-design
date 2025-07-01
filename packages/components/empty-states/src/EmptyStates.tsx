import React from 'react';

import Icon from '@synerise/ds-icon';

import * as S from './EmptyStates.styles';
import { type EmptyStatesProps, EmptyStatesSize } from './EmptyStates.types';

const mapSizeToPx = {
  [EmptyStatesSize.SMALL]: 48,
  [EmptyStatesSize.MEDIUM]: 96,
};

const EmptyStates = ({
  size = EmptyStatesSize.SMALL,
  label,
  text,
  button,
  fontSize,
  customIcon,
  className,
  mode,
  iconPosition = 'top',
  textAlign = 'center',
}: EmptyStatesProps) => {
  return (
    <S.EmptyStatesWrapper
      iconPosition={iconPosition}
      mode={mode}
      className={`ds-empty-states ${className}`}
    >
      {customIcon && (
        <S.EmptyStatesIconContainer>
          <Icon
            data-testid="empty-states-custom-icon"
            component={customIcon}
            size={mapSizeToPx[size]}
          />
        </S.EmptyStatesIconContainer>
      )}
      <S.EmptyStatesContent textAlign={textAlign}>
        {text && (
          <S.HeaderWrapper
            hasIcon={Boolean(customIcon)}
            data-testid="empty-states-header"
            size={size}
            fontSize={fontSize}
          >
            {text}
          </S.HeaderWrapper>
        )}
        {label && (
          <S.TextWrapper data-testid="empty-states-label">
            {label}
          </S.TextWrapper>
        )}
        {button && <S.ButtonWrapper>{button}</S.ButtonWrapper>}
      </S.EmptyStatesContent>
    </S.EmptyStatesWrapper>
  );
};
export default EmptyStates;
