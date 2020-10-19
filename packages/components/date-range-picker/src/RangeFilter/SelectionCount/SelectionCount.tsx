import * as React from 'react';
import * as S from './SelectionCount.styles';
import { SelectionCountProps } from './SelectionCount.types';

const SelectionCount: React.FC<SelectionCountProps> = ({
  label,
  selectedDayCount,
}: SelectionCountProps) => {
  return (
    <S.Container>
      <span>{label}:</span>
      <S.Count>{selectedDayCount}</S.Count>
    </S.Container>
  );
};

export default SelectionCount;
