import React from 'react';

import Icon from '@synerise/ds-icon';

import * as S from './BottomAction.styles';
import { type BottomActionProps } from './BottomAction.types';

export const BottomAction = ({
  onClickAction,
  children,
  icon,
  ...rest
}: BottomActionProps) => (
  <S.BottomAction onClick={onClickAction} {...rest}>
    {icon && (
      <S.IconWrapper>
        <Icon component={icon} />
      </S.IconWrapper>
    )}
    <S.TextWrapper>{children}</S.TextWrapper>
  </S.BottomAction>
);
