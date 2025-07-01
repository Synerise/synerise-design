import React from 'react';

import { omitKeys } from '@synerise/ds-utils';

import * as S from './IconBadge.styles';
import type { IconBadgeProps } from './IconBadge.types';
import { hasCustomIcon, renderStatusIcon } from './IconBadge.utils';

export const IconBadge = ({ children, ...props }: IconBadgeProps) => {
  const iconComponent = hasCustomIcon(props)
    ? props.icon
    : renderStatusIcon(props.status);
  const rest = omitKeys(['icon', 'status'], props);
  return (
    <S.IconBadgeWrapper data-testid="ds-badge-icon-badge" {...rest}>
      {children}
      <S.IconBadgeIcon className="ds-icon-badge">
        {iconComponent}
      </S.IconBadgeIcon>
    </S.IconBadgeWrapper>
  );
};
