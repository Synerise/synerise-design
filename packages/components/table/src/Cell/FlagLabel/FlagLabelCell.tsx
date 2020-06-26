import DSFlag from '@synerise/ds-flag';
import * as React from 'react';
import { CountryCode } from '@synerise/ds-flag/dist/Flag.types';
import * as S from './FlagLabelCell.styles';

interface Props {
  countryCode: CountryCode;
  label: string;
}

const FlagLabelCell: React.FC<Props> = ({ countryCode, label }: Props) => {
  return (
    <S.FlagLabel>
      <DSFlag country={countryCode} size={20} />
      <span>{label}</span>
    </S.FlagLabel>
  );
};

export default FlagLabelCell;
