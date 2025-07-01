import React from 'react';

import * as S from '../Operators.style';

const OperatorsDropdownGroupName = ({ name }: { name: string }) => {
  return <S.Title data-testid="operator-group-title">{name}</S.Title>;
};

export default OperatorsDropdownGroupName;
