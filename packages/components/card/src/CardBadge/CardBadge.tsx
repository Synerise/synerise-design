import React from 'react';

import Icon from '@synerise/ds-icon';

import * as S from './CardBadge.styles';
import { CardBadgeProps } from './CardBadge.types';

const CardBadge: React.FC<CardBadgeProps> = ({ icon, status = 'default', ...props }) => (
  <S.CardBadge
    status={status}
    /** Necessary for passing down data-* attributes */
    {...props}
  >
    <Icon component={icon} />
  </S.CardBadge>
);

export default CardBadge;
