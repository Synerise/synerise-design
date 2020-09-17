import * as React from 'react';

import * as S from './CardSelectGroup.styles';
import { CardSelectGroupProps } from './CardSelectGroup.types';

const CardSelectGroup: React.FC<CardSelectGroupProps> = ({ className, children, width = 'large', columns = 2 }) => {
  return (
    <S.CardGroup className={className} width={width} columns={columns}>
      {children}
    </S.CardGroup>
  );
};

export default CardSelectGroup;
