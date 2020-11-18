import * as React from 'react';
import { TagShape } from '@synerise/ds-tags';
import * as S from './Status.styles';
import { StatusProps } from './Status.types';

const Status: React.FC<StatusProps> = ({ type, onClick, className, label,color, }) => {
  return (
    <S.StatusTag
      onClick={onClick}
      className={`ds-status ${className || ''}`}
      shape={TagShape.STATUS_NEUTRAL}
      type={type}
      name={label}
      color={color}
    />
  );
};

Status.defaultProps = {
  type: 'primary',
};

export default Status;
