import React from 'react';

import * as S from './CardGroup.styles';
import { type CardGroupProps } from './CardGroup.types';

const CardGroup = ({
  children,
  columns,
  ...htmlAttributes
}: CardGroupProps) => {
  return (
    <S.Container items={columns} {...htmlAttributes}>
      {children}
    </S.Container>
  );
};

export default CardGroup;
