import React from 'react';
import { TagShape } from '@synerise/ds-tags';
import * as S from './Status.styles';
import { StatusProps } from './Status.types';

const Status = ({ type = 'primary', onClick, className, label, color }: StatusProps) => {
  return (
    <S.StatusTag
      onClick={onClick}
      className={`ds-status ${className || ''}`}
      shape={TagShape.STATUS_NEUTRAL}
      type={type}
      name={label}
      color={color}
      asPill
    />
  );
};

export default Status;
