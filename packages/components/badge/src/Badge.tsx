import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps } from './Badge.types';
import StyledBadge from './Badge.styles';

const Badge = ({ dot, ...props }: BadgeProps) => {
  const { status } = props;
  const isDot = dot !== undefined ? dot : status !== undefined;
  return <StyledBadge {...props} dot={isDot} />;
};

export default Badge;
