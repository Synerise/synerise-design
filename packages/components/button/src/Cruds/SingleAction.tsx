import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon';
import * as S from './Cruds.styles';
import { SingleActionProps } from './SingleAction.types';

const SingleAction: React.FC<SingleActionProps> = ({ title, className, onClick, icon, iconSize }) => {
  return (
    <Tooltip title={title}>
      <S.IconWrapper
        className={className}
        onClick={(e): void => {
          !!e && e.stopPropagation();
          onClick && onClick();
        }}
      >
        <Icon component={icon} size={iconSize || 24} />
      </S.IconWrapper>
    </Tooltip>
  );
};
export default SingleAction;
