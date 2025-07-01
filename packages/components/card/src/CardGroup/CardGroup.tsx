import React from 'react';

import * as S from './CardGroup.styles';
import { type CardGroupProps } from './CardGroup.types';

const CardGroup = ({ className, children, columns }: CardGroupProps) => {
  return (
    <S.Container className={className} items={columns}>
      {children}
    </S.Container>
  );
};

export default CardGroup;
