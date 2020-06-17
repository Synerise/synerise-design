import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './CardBadge.styles';

export type BadgeStatus = 'checked' | 'warning' | 'error' | 'default';

type CardBadgeProps = {
  icon: React.ReactNode;
  status: BadgeStatus;
};

const CardBadge: React.FC<CardBadgeProps> = ({ icon, status = 'default' }) => {
  return (
    <S.CardBadge status={status}>
      <Icon component={icon} />
    </S.CardBadge>
  );
};

export default CardBadge;
