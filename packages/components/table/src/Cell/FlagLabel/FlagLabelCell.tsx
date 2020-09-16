import DSFlag from '@synerise/ds-flag';
import * as React from 'react';
import * as S from './FlagLabelCell.styles';
import { Props } from './FlagLabelCell.types';

const FlagLabelCell: React.FC<Props> = ({ countryCode, label }: Props) => {
  return (
    <S.FlagLabel>
      <DSFlag country={countryCode} size={20} />
      <span>{label}</span>
    </S.FlagLabel>
  );
};

export default FlagLabelCell;
