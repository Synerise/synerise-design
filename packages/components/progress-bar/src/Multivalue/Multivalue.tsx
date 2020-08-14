import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { MultivalueProps } from './Multivalue.types';
import * as S from './Mutlivalue.styles';

const normalizePercent = (value: number): number => {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

const Multivalue: React.FC<MultivalueProps> = (props: MultivalueProps) => {
  const { values } = props;
  const sortedByPercent = values.sort((a, b) => {
    return b.percent - a.percent;
  });
  return (
    <S.Container>
      {sortedByPercent.map(val => (
        <S.Multivalue key={uuid()} color={val.color} percent={normalizePercent(val.percent)} />
      ))}
    </S.Container>
  );
};

export default Multivalue;
