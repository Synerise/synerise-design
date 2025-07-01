import React from 'react';

import '@synerise/ds-core/dist/js/style';

import StyledBadge from './Badge.styles';
import { type BadgeProps } from './Badge.types';
import './style/index.less';

const Badge = ({ dot, ...props }: BadgeProps) => {
  const { status } = props;
  const isDot = dot !== undefined ? dot : status !== undefined;
  return <StyledBadge {...props} dot={isDot} />;
};

export default Badge;
