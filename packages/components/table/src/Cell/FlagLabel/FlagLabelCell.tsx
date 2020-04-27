// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Flag from 'react-flagkit';
import * as React from 'react';
import * as S from './FlagLabelCell.styles';

interface Props {
  countryCode: string;
  label: string;
}

const FlagLabelCell: React.FC<Props> = ({ countryCode, label }: Props) => {
  return (
    <S.FlagLabel>
      <Flag country={countryCode.toUpperCase()} size={20} />
      <span>{label}</span>
    </S.FlagLabel>
  );
};

export default FlagLabelCell;
