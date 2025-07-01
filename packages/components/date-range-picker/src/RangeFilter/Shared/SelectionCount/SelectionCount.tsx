import React from 'react';

import * as S from './SelectionCount.styles';
import { type SelectionCountProps } from './SelectionCount.types';

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
export default React.memo(SelectionCount);
