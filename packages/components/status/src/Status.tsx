import React from 'react';
import { TagShape } from '@synerise/ds-tag';
import * as S from './Status.styles';
import { StatusProps } from './Status.types';

const Status = ({ type = 'primary', onClick, className, label, color, dashed, ...htmlAttributes }: StatusProps) => {
  return (
    <S.StatusTag
      {...htmlAttributes}
      onClick={onClick}
      className={`ds-status ${className || ''}`}
      shape={TagShape.STATUS_NEUTRAL}
      type={type}
      name={label}
      color={color}
      dashed={dashed}
      asPill
    />
  );
};

export default Status;
