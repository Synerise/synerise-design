import React from 'react';

import DSFlag from '@synerise/ds-flag';

import * as S from './FlagLabelCell.styles';
import { type FlagLabelProps } from './FlagLabelCell.types';

const FlagLabelCell = ({
  countryCode,
  label,
  ...htmlAttributes
}: FlagLabelProps) => {
  return (
    <S.FlagLabel {...htmlAttributes}>
      <DSFlag country={countryCode} size={20} />
      <span>{label}</span>
    </S.FlagLabel>
  );
};

export default FlagLabelCell;
