import React, { forwardRef } from 'react';

import { TagShape } from '@synerise/ds-tag';

import * as S from './Status.styles';
import { type StatusProps } from './Status.types';

const Status = forwardRef<HTMLDivElement, StatusProps>(
  (
    {
      type = 'primary',
      className,
      onClick,
      label,
      color,
      dashed,
      ...htmlAttributes
    },
    ref,
  ) => {
    return (
      <S.StatusTag
        ref={ref}
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
  },
);

export default Status;
