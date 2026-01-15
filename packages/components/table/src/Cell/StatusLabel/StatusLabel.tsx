import React from 'react';

import Badge from '@synerise/ds-badge';

import * as S from './StatusLabel.styles';
import type { StatusLabelProps } from './StatusLabel.types';

const StatusLabelCell = ({
  status,
  label,
  customColor,
  disabled,
  ...htmlAttributes
}: StatusLabelProps) => {
  return (
    <S.StatusLabel isDisabled={disabled} {...htmlAttributes}>
      <Badge customColor={customColor} status={status} />
      <S.Label>{label}</S.Label>
    </S.StatusLabel>
  );
};

export default StatusLabelCell;
