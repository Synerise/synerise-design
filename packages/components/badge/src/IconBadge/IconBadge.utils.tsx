import React from 'react';

import { STATUS_ICONS } from './IconBadge.constants';
import * as S from './IconBadge.styles';
import type {
  CustomIconBadgeProps,
  StatusIconBadgeProps,
} from './IconBadge.types';

export const hasCustomIcon = (
  props: CustomIconBadgeProps | StatusIconBadgeProps,
): props is CustomIconBadgeProps => {
  return 'icon' in props;
};

export const renderStatusIcon = (status: StatusIconBadgeProps['status']) => {
  return STATUS_ICONS[status] ? (
    <S.Icon status={status} {...STATUS_ICONS[status]} />
  ) : null;
};
