import React from 'react';

import Icon from '@synerise/ds-icon';

import * as S from './CardBadge.styles';
import { CardBadgeProps } from './CardBadge.types';

const CardBadge = ({ icon, status = 'default', ...props }: CardBadgeProps) => (
  <S.CardBadge status={status} {...props}>
    <Icon component={icon} />
  </S.CardBadge>
);

export default CardBadge;
