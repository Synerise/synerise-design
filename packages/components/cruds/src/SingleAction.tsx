import React from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

import * as S from './Cruds.styles';
import { type SingleActionProps } from './SingleAction.types';

const SingleAction = ({
  title,
  inactive,
  className,
  onClick,
  icon,
  iconSize,
  ...htmlProps
}: SingleActionProps) => {
  return (
    <Tooltip title={title}>
      <S.IconWrapper
        inactive={inactive}
        className={className}
        onClick={(event) => {
          event.stopPropagation();
          onClick && onClick();
        }}
        {...htmlProps}
      >
        <Icon component={icon} size={iconSize || 24} />
      </S.IconWrapper>
    </Tooltip>
  );
};
export default SingleAction;
